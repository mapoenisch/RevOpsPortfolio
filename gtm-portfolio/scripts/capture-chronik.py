#!/usr/bin/env python3
"""Local-only, one-session transfer of explicitly requested browser captures."""
import base64
import hashlib
import html
import json
import secrets
import time
from datetime import datetime
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from io import BytesIO
from pathlib import Path
from urllib.parse import parse_qs, urlparse
from zoneinfo import ZoneInfo
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
LEGACY = Path('/Users/marcpoenisch/Projekte/LeadPilot - Eine fiktive Geschäftsidee/LeadPilot - Unternehmensdaten-Projekt Kontext/LeadPilot_Unternehmens_Dashboard.html')
ASSETS = ROOT/'public/leadpilot/assets'
EVIDENCE = ROOT/'evidence/leadpilot'
TOKEN = secrets.token_urlsafe(32)
NAMES = {'location':'standort-v25','profile':'profil-v25','legacy_location':'standort-frueher','legacy_profile':'profil-frueher'}

class Handler(BaseHTTPRequestHandler):
    def send(self, data, content_type='text/html; charset=utf-8', status=200, csp=None):
        self.send_response(status)
        self.send_header('Content-Type',content_type)
        self.send_header('Content-Length',str(len(data)))
        self.send_header('Cache-Control','no-store')
        self.send_header('X-Content-Type-Options','nosniff')
        if csp:
            self.send_header('Content-Security-Policy',csp)
        self.end_headers()
        self.wfile.write(data)
    def do_GET(self):
        route = urlparse(self.path).path
        if route == '/legacy':
            return self.send(LEGACY.read_bytes(),csp="default-src 'none'; img-src data: blob:; script-src 'unsafe-inline'; style-src 'unsafe-inline'; font-src data:; frame-src data:")
        if route != '/capture':
            return self.send(b'Not found','text/plain',404)
        options=''.join(f'<option value="{key}">{html.escape(key)}</option>' for key in NAMES)
        page=f"""<!doctype html><html lang="de"><meta charset="utf-8"><title>Lokale Chronik-Aufnahme</title>
        <body><h1>Lokale Chronik-Aufnahme</h1><p>Überträgt die ausdrücklich beauftragte Browseraufnahme nur auf diesen Rechner.</p>
        <form method="post" action="/capture"><input type="hidden" name="token" value="{TOKEN}">
        <label>Ansicht <select name="kind">{options}</select></label><br>
        <label>Aufnahme <textarea name="capture" rows="4" cols="50" required></textarea></label><br>
        <button type="submit">Aufnahme lokal speichern</button></form></body></html>"""
        return self.send(page.encode())
    def do_POST(self):
        if urlparse(self.path).path != '/capture' or self.headers.get('Origin') != 'http://127.0.0.1:4176':
            return self.send(b'Forbidden','text/plain',403)
        length=int(self.headers.get('Content-Length','0'))
        if length <= 0 or length > 12_000_000:
            return self.send(b'Invalid size','text/plain',413)
        values=parse_qs(self.rfile.read(length).decode('utf-8'),max_num_fields=4)
        token=values.get('token',[''])[0]
        kind=values.get('kind',[''])[0]
        if not secrets.compare_digest(token,TOKEN) or kind not in NAMES:
            return self.send(b'Forbidden','text/plain',403)
        try:
            data=base64.b64decode(values.get('capture',[''])[0],validate=True)
            image=Image.open(BytesIO(data)).convert('RGB')
            if image.width < 700 or image.height < 400:
                raise ValueError('Aufnahme zu klein')
            # Crop navigation/account chrome; preserve the page content.
            x = round(image.width * .173)
            y = round(image.height * .165) if kind in ('location','profile') else round(image.height * .10)
            picture=image.crop((x,y,image.width,image.height))
            picture.thumbnail((1600,1200),Image.Resampling.LANCZOS)
            ASSETS.mkdir(parents=True,exist_ok=True)
            EVIDENCE.mkdir(parents=True,exist_ok=True)
            target=ASSETS/(NAMES[kind]+'.webp')
            picture.save(target,'WEBP',quality=87,method=5)
            record={'kind':kind,'time':datetime.now(ZoneInfo('Europe/Berlin')).isoformat(timespec='seconds'),
                    'original_sha256':hashlib.sha256(data).hexdigest(),'output_sha256':hashlib.sha256(target.read_bytes()).hexdigest(),
                    'viewport':[image.width,image.height],'crop':[x,y,image.width,image.height],
                    'source':'LeadPilot Dashboard-CRM v2.5.0; reguläre Viewer-Sitzung' if kind in ('location','profile') else 'Ursprüngliches Unternehmensdashboard; lokale HTML-Originaldatei',
                    'output':str(target.relative_to(ROOT))}
            (EVIDENCE/(NAMES[kind]+'.json')).write_text(json.dumps(record,ensure_ascii=False,indent=2)+'\n')
            return self.send(('<!doctype html><html lang="de"><meta charset="utf-8"><title>Aufnahme gespeichert</title><h1>Aufnahme gespeichert</h1><p>'+html.escape(kind)+'</p></html>').encode())
        except Exception:
            return self.send(b'Invalid image','text/plain',400)
    def log_message(self,fmt,*args):
        pass

if __name__ == '__main__':
    server=ThreadingHTTPServer(('127.0.0.1',4176),Handler)
    print('Chronik-Aufnahme lokal auf 127.0.0.1:4176',flush=True)
    server.serve_forever()
