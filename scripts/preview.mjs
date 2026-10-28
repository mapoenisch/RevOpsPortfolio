import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('out');
const port = Number(process.env.PORT || 3100);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.txt':'text/plain; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.ico':'image/x-icon','.pdf':'application/pdf','.woff2':'font/woff2','.woff':'font/woff'};
try { await fs.access(path.join(root,'index.html')); } catch { console.error('Kein Export vorhanden. Zuerst npm run build ausführen.'); process.exit(1); }
http.createServer(async (req,res) => {
  try {
    let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let filename=path.resolve(root,'.'+pathname);
    if (filename!==root && !filename.startsWith(root+path.sep)) { res.writeHead(403);res.end();return; }
    try { if((await fs.stat(filename)).isDirectory()) filename=path.join(filename,'index.html'); }
    catch { res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await fs.readFile(path.join(root,'404.html')));return; }
    const bytes=await fs.readFile(filename);
    res.writeHead(200,{'Content-Type':types[path.extname(filename)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Cache-Control':'no-cache'});
    res.end(req.method==='HEAD'?undefined:bytes);
  } catch { res.writeHead(400);res.end('Ungültige Anfrage'); }
}).listen(port,'127.0.0.1',()=>console.log(`Portfolio-Vorschau: http://127.0.0.1:${port}`));
