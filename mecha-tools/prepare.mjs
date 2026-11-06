import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
const root = '/Users/marcpoenisch/Projekte/RevOpsPortfolio';
async function manifest(dir, prefix = '') {
  const result = {};
  for (const item of await fs.readdir(path.join(dir, prefix), {withFileTypes:true})) {
    const rel = path.join(prefix, item.name);
    if(item.isDirectory()) Object.assign(result, await manifest(dir,rel));
    else if(item.isFile()) result[rel]=crypto.createHash('sha256').update(await fs.readFile(path.join(dir,rel))).digest('hex');
  }
  return result;
}
if(process.argv[2]==='snapshot') {
  const files=await manifest(path.join(root,'gtm-portfolio'));
  await fs.writeFile(path.join(root,'mecha-tools/original-manifest.json'),JSON.stringify(files));
  console.log(`Original: ${Object.keys(files).length} Dateien mit SHA-256 erfasst.`);
} else if(process.argv[2]==='verify') {
  const before=JSON.parse(await fs.readFile(path.join(root,'mecha-tools/original-manifest.json'),'utf8'));
  const after=await manifest(path.join(root,'gtm-portfolio'));
  const changed=[...new Set([...Object.keys(before),...Object.keys(after)])].filter(p=>before[p]!==after[p]);
  console.log(JSON.stringify({originalFiles:Object.keys(after).length,changed}));
  if(changed.length) process.exitCode=1;
} else {
  const out=path.join(root,'mecha-nachbau');
  await fs.mkdir(path.join(out,'assets'),{recursive:true});
  const origin='https://mecha-xyz.webflow.io/';
  const html=await (await fetch(origin)).text();
  const queue=new Set(); const map=new Map(); const errors=[];
  const urls=text=>[...text.matchAll(/https:\/\/[^\s"'<>\\`]+/g)].map(m=>m[0].replace(/&amp;/g,'&').replace(/[);,]+$/g,'')).filter(u=>/cdn\.prod\.website-files\.com|cdn\.jsdelivr\.net|unpkg\.com|d3e54v103j8qbb\.cloudfront\.net|cdnjs\.cloudflare\.com/.test(u) && new URL(u).pathname!=='/');
  for(const url of urls(html)) queue.add(url);
  for(const url of queue) {
    try {
      const response=await fetch(url); if(!response.ok) throw new Error(String(response.status));
      const bytes=Buffer.from(await response.arrayBuffer());
      const name=crypto.createHash('sha256').update(url).digest('hex').slice(0,12)+'-'+decodeURIComponent(new URL(url).pathname.split('/').pop()).replace(/[^a-zA-Z0-9._-]/g,'_');
      map.set(url,'assets/'+name);
      await fs.writeFile(path.join(out,'assets',name),bytes);
      if(/\.(css|js|json)(\?|$)/.test(url)) for(const next of urls(bytes.toString())) if(!queue.has(next)) queue.add(next);
    } catch(e) { errors.push({url,error:String(e)}); }
    if(queue.size>250) break;
  }
  const replace=(text,base='')=>{for(const [url,file] of [...map].sort((a,b)=>b[0].length-a[0].length)) text=text.split(url).join(base+file).split(url.replaceAll('&','&amp;')).join(base+file);return text;};
  for(const file of await fs.readdir(path.join(out,'assets'))) if(/\.(css|js|json)$/.test(file)) {
    const p=path.join(out,'assets',file);await fs.writeFile(p,replace(await fs.readFile(p,'utf8'),'../'));
  }
  // Localized script/style bytes differ from upstream integrity values.
  let local=replace(html).replace(/ integrity="[^"]*"/g,'');
  local=local.replace(/<form\b/g,'<form data-local-reference="true"');
  local=local.replace('</body>','<script>document.addEventListener("submit",function(e){e.preventDefault();alert("Lokaler Referenznachbau – kein Versand.")},true)</script></body>');
  await fs.writeFile(path.join(out,'index.html'),local);
  await fs.writeFile(path.join(out,'asset-map.json'),JSON.stringify({origin,assets:Object.fromEntries(map),errors},null,2));
  console.log(JSON.stringify({downloaded:map.size,errors}));
}
