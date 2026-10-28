import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';

const root=path.resolve('out');
const routes=['index.html','projekte/leadpilot/index.html','projekte/jobscout/index.html','zertifikate/index.html','datenschutz/index.html','404.html'];
let checked=0;
for(const route of routes){
 const html=await fs.readFile(path.join(root,route),'utf8');
 assert.match(html,/<html[^>]+lang="de"/);
 assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,`${route}: exactly one h1`);
 assert.match(html,/id="inhalt"/);
 assert.doesNotMatch(html,/Wiebelstraße|72973954|VITE_SUPABASE|E2E_AUTH_PASSWORD|SUPABASE_ANON_KEY/);
 for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  const url=match[1].split('#')[0].split('?')[0];
  if(!url.startsWith('/')||url.startsWith('//')) continue;
  const candidate=path.join(root,decodeURIComponent(url));
  const stat=await fs.stat(candidate).catch(()=>null);
  assert.ok(stat,`${route}: missing asset ${url}`);
  if(stat.isDirectory()) await fs.access(path.join(candidate,'index.html'));
  checked++;
 }
}
const certificates=JSON.parse(await fs.readFile('src/content/certificates.json','utf8'));
assert.equal(new Set(certificates.map(c=>c.id)).size,certificates.length);
assert.equal(certificates.filter(c=>c.featured).length,6);
assert.ok(new Set(certificates.filter(c=>c.featured).map(c=>c.provider)).size>=5);
for(const certificate of certificates) await fs.access(path.join(root,certificate.file));
console.log(`PASS: ${routes.length} HTML-Seiten, ${checked} lokale Verweise, ${certificates.length} eindeutige Nachweise, 6 hervorgehobene Nachweise aus mindestens 5 Anbietergruppen.`);
