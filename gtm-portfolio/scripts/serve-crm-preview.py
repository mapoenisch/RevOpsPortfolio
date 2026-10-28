#!/usr/bin/env python3
"""Serve the existing CRM build locally, with an SPA fallback."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path('/Users/marcpoenisch/Projekte/LeadPilot Dashboard-CRM/dist').resolve()

class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        route = unquote(urlparse(self.path).path)
        target = (ROOT / route.lstrip('/')).resolve()
        if not target.is_relative_to(ROOT):
            self.send_error(403)
            return
        if not target.exists() and not Path(route).suffix:
            self.path = '/index.html'
        return super().do_GET()

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

if __name__ == '__main__':
    if not (ROOT / 'index.html').is_file():
        raise SystemExit('Vorhandener CRM-Build fehlt.')
    server = ThreadingHTTPServer(('127.0.0.1', 4175), partial(Handler, directory=str(ROOT)))
    print('CRM-Vorschau: http://127.0.0.1:4175/login', flush=True)
    server.serve_forever()
