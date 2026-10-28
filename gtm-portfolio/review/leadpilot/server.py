#!/usr/bin/env python3
"""Lokale, schreibfreie Medienvorschau für die LeadPilot-Auswahl."""
from __future__ import annotations

import hashlib
import html
import io
import json
import mimetypes
import os
import re
import shutil
import subprocess
import tempfile
import threading
from datetime import datetime
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse
from zoneinfo import ZoneInfo

from candidates import CANDIDATES, SECTIONS

HERE = Path(__file__).resolve().parent
BY_ID = {row['id']: row for row in CANDIDATES}
PDF_CACHE = {}
PDF_LOCK = threading.Lock()

def convert_office(path):
    key = str(path)
    with PDF_LOCK:
        if key in PDF_CACHE:
            return PDF_CACHE[key]
        soffice = shutil.which('soffice')
        if not soffice:
            raise RuntimeError('LibreOffice ist für die Seitenvorschau nicht verfügbar.')
        with tempfile.TemporaryDirectory(prefix='leadpilot-review-') as tmp:
            profile = (Path(tmp) / 'profile').as_uri()
            result = subprocess.run([soffice, '-env:UserInstallation=' + profile, '--headless',
                                     '--convert-to', 'pdf', '--outdir', tmp, str(path)],
                                    capture_output=True, timeout=90)
            output = Path(tmp) / (path.stem + '.pdf')
            if result.returncode or not output.exists():
                raise RuntimeError('Die Dokumentvorschau konnte nicht erzeugt werden.')
            PDF_CACHE[key] = output.read_bytes()
            return PDF_CACHE[key]

def render_page(row, page):
    path = Path(row['path'])
    if path.suffix.lower() == '.pdf':
        source = path
        temp = None
    else:
        data = convert_office(path)
        temp = tempfile.NamedTemporaryFile(prefix='leadpilot-page-', suffix='.pdf')
        temp.write(data)
        temp.flush()
        source = Path(temp.name)
    try:
        result = subprocess.run(['pdftoppm','-f',str(page),'-l',str(page),'-singlefile',
                                 '-scale-to','1450','-png',str(source)],
                                capture_output=True, timeout=45)
        if result.returncode != 0 or not result.stdout.startswith(b'\x89PNG'):
            raise RuntimeError('Diese Seite ist nicht verfügbar.')
        return result.stdout
    finally:
        if temp:
            temp.close()

def excerpt(path):
    content = path.read_text(encoding='utf-8', errors='replace')
    if path.suffix.lower() == '.html':
        content = re.sub(r'<(script|style)\b[^>]*>.*?</\1>', ' ', content, flags=re.I|re.S)
        content = html.unescape(re.sub(r'<[^>]+>', ' ', content))
    return ' '.join(content.split())[:1200]

def video_poster(path):
    result = subprocess.run(['ffmpeg','-v','error','-ss','1','-i',str(path),'-frames:v','1',
                             '-vf','scale=800:-2','-f','image2pipe','-vcodec','mjpeg','pipe:1'],
                            capture_output=True, timeout=20)
    if result.returncode or not result.stdout.startswith(b'\xff\xd8'):
        raise RuntimeError('Kein Vorschaubild für dieses Video verfügbar.')
    return result.stdout

class Handler(BaseHTTPRequestHandler):
    server_version = 'LeadPilotReview/1.0'

    def common(self, content_type, size, extra=None):
        self.send_header('Content-Type', content_type)
        self.send_header('Content-Length', str(size))
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Referrer-Policy', 'no-referrer')
        for k, v in (extra or {}).items():
            self.send_header(k, v)
        self.end_headers()

    def send_bytes(self, payload, content_type, code=200):
        self.send_response(code)
        self.common(content_type, len(payload))
        self.wfile.write(payload)

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        try:
            if path == '/':
                return self.send_bytes((HERE/'index.html').read_bytes(), 'text/html; charset=utf-8')
            if path == '/gallery.css':
                return self.send_bytes((HERE/'gallery.css').read_bytes(), 'text/css; charset=utf-8')
            if path == '/gallery.js':
                return self.send_bytes((HERE/'gallery.js').read_bytes(), 'text/javascript; charset=utf-8')
            if path == '/api/material':
                records = []
                for row in CANDIDATES:
                    source = Path(row['path'])
                    st = source.stat()
                    public = {k:v for k,v in row.items() if k not in ('path','preview')}
                    public.update({'filename':source.name,'source_path':str(source),
                                   'modified':datetime.fromtimestamp(st.st_mtime,ZoneInfo('Europe/Berlin')).strftime('%d.%m.%Y'),
                                   'bytes':st.st_size,'sha256':hashlib.sha256(source.read_bytes()).hexdigest()})
                    if row['kind'] in ('md','css','html') and not row['preview']:
                        public['excerpt'] = excerpt(source)
                    records.append(public)
                return self.send_bytes(json.dumps({'sections':SECTIONS,'items':records},ensure_ascii=False).encode(), 'application/json; charset=utf-8')
            match = re.fullmatch(r'/(file|preview|poster)/(LP-\d\d-\d\d)', path)
            if not match or match.group(2) not in BY_ID:
                return self.send_bytes(b'Nicht gefunden', 'text/plain; charset=utf-8', 404)
            action, ident = match.groups()
            row = BY_ID[ident]
            source = Path(row['path'])
            if action == 'preview':
                page = int(parse_qs(parsed.query).get('page',['1'])[0])
                if page not in row['pages']:
                    return self.send_bytes(b'Seite nicht freigegeben', 'text/plain; charset=utf-8', 404)
                return self.send_bytes(render_page(row,page), 'image/png')
            if action == 'poster':
                if row['kind'] in ('mp4','webm'):
                    return self.send_bytes(video_poster(source), 'image/jpeg')
                if not row['preview']:
                    return self.send_bytes(b'Keine Vorschau', 'text/plain; charset=utf-8', 404)
                source = Path(row['preview'])
            ext = source.suffix.lower()
            mime = mimetypes.guess_type(str(source))[0] or 'application/octet-stream'
            if ext in ('.html','.md','.css'):
                mime = 'text/plain; charset=utf-8'
            size = source.stat().st_size
            start, end = 0, size - 1
            is_range = False
            header = self.headers.get('Range')
            if header:
                m = re.fullmatch(r'bytes=(\d+)-(\d*)', header)
                if not m:
                    self.send_response(416)
                    self.send_header('Content-Range', f'bytes */{size}')
                    self.end_headers()
                    return
                start = int(m.group(1))
                end = min(int(m.group(2)), end) if m.group(2) else end
                if start > end or start >= size:
                    self.send_response(416)
                    self.send_header('Content-Range', f'bytes */{size}')
                    self.end_headers()
                    return
                is_range = True
            self.send_response(206 if is_range else 200)
            extra = {'Accept-Ranges':'bytes'}
            if is_range:
                extra['Content-Range'] = f'bytes {start}-{end}/{size}'
            self.common(mime, end-start+1, extra)
            with source.open('rb') as f:
                f.seek(start)
                remaining = end-start+1
                while remaining:
                    block = f.read(min(256*1024,remaining))
                    if not block:
                        break
                    self.wfile.write(block)
                    remaining -= len(block)
        except (BrokenPipeError, ConnectionResetError):
            pass
        except Exception as exc:
            try:
                self.send_bytes(('Vorschau nicht verfügbar: '+str(exc)).encode(), 'text/plain; charset=utf-8', 500)
            except (BrokenPipeError, ConnectionResetError):
                pass

    def log_message(self, fmt, *args):
        pass

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(description='Lokale LeadPilot-Auswahlgalerie')
    parser.add_argument('--port', type=int, default=4327)
    args = parser.parse_args()
    server = ThreadingHTTPServer(('127.0.0.1', args.port), Handler)
    print(f'Auswahlgalerie: http://127.0.0.1:{args.port}/', flush=True)
    server.serve_forever()
