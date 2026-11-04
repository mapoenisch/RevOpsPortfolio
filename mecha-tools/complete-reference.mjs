import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
const root='/Users/marcpoenisch/Projekte/RevOpsPortfolio/mecha-nachbau';
let html=await fs.readFile(path.join(root,'index.html'),'utf8');
const visited=new Set();
async function moduleFile(url) {
  if(visited.has(url)) return; visited.add(url);
  const relative='three/'+url.split('/three@0.160.0/')[1];
  const destination=path.join(root,relative);
  const r=await fetch(url);if(!r.ok)throw new Error(`${r.status} ${url}`);
  const source=await r.text();
  await fs.mkdir(path.dirname(destination),{recursive:true});await fs.writeFile(destination,source);
  for(const match of source.matchAll(/(?:from\s*|import\s*\()\s*['"]([^'"]+)['"]/g)) if(match[1].startsWith('.')) await moduleFile(new URL(match[1],url).href);
}
await moduleFile('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
await moduleFile('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js');
let first=true;
html=html.replace(/<script type="importmap">[\s\S]*?<\/script>/g,()=>{
  if(!first)return '';first=false;
  return '<script type="importmap">{"imports":{"three":"/three/build/three.module.js","three/addons/":"/three/examples/jsm/"}}</script>';
});
const media=[...new Set([...html.matchAll(/https:\/\/[^\s"'<>`]+/g)].map(m=>m[0]).filter(u=>/digitaloceanspaces\.com|\.r2\.dev/.test(u)))];
const receipts=[];
for(const url of media) {
  const name=crypto.createHash('sha256').update(url).digest('hex').slice(0,12)+'-'+decodeURIComponent(new URL(url).pathname.split('/').pop()).replace(/[^a-zA-Z0-9._-]/g,'_');
  const r=await fetch(url);if(!r.ok)throw new Error(`${r.status} ${url}`);
  const bytes=Buffer.from(await r.arrayBuffer());await fs.writeFile(path.join(root,'assets',name),bytes);
  html=html.split(url).join('assets/'+name);receipts.push({url,file:'assets/'+name,bytes:bytes.length});
}
html=html.replace('</head>','<style>.w-webflow-badge{display:none!important}</style></head>');
html=html.replace('e.preventDefault();alert(', 'e.preventDefault();e.stopImmediatePropagation();alert(');
await fs.writeFile(path.join(root,'index.html'),html);
await fs.writeFile(path.join(root,'additional-assets.json'),JSON.stringify({modules:[...visited],media:receipts},null,2));
console.log(JSON.stringify({modules:visited.size,media:receipts.length,bytes:receipts.reduce((s,r)=>s+r.bytes,0)}));
