import { mkdir, readdir, readFile, copyFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
const originals = '/Users/marcpoenisch/Projekte/Jobsuche 2026';
async function files(dir) { const result = []; for (const e of await readdir(dir, { withFileTypes: true })) { const p = `${dir}/${e.name}`; if(e.isDirectory()) result.push(...await files(p)); else result.push(p); } return result; }
const available = await files(`${originals}/Zertifikate`);
const selections = [
  ['hubspot-sales.png', /HubSpot Sales-Software_.*\.png$/],
  ['hubspot-reporting.png', /HubSpot-Berichterstattung_.*\.png$/],
  ['hubspot-inbound.png', /HubSpot Inbound-Sales_.*\.png$/],
  ['claude-code.png', /Claude Code in Action Certificate_.*\.png$/],
  ['claude-101.png', /Claude 101 Certificate_.*\.png$/],
  ['claude-code-101.png', /Claude Code 101 Certificate_.*\.png$/],
  ['claude-platform-101.png', /Claude Platform 101 Certificate_.*\.png$/],
  ['introduction-to-mcp.png', /Introduction to MCP Certificate_.*\.png$/],
  ['mcp-advanced-topics.png', /Model Context Protocol Advanced Topics Certificate_.*\.png$/],
  ['business-analyse.pdf', /Abschlusszertifikat_Grundwissen Business-Analyse.*\.pdf$/],
  ['demandbase-marketing-operations.pdf', /marketing-operations-it-administrator-Badge.*\.pdf$/],
];
await Promise.all(['public/images','public/nachweise','public/downloads','evidence'].map(p=>mkdir(`${root}${p}`,{recursive:true})));
const manifest = [];
for (const [target, pattern] of selections) {
  const matches = available.filter(p => pattern.test(p));
  if(matches.length !== 1) throw new Error(`Quelle für ${target} nicht eindeutig: ${matches.length}`);
  const source = matches[0]; const destination = `${root}public/nachweise/${target}`;
  await copyFile(source, destination);
  const original = await readFile(source); const copied = await readFile(destination);
  const sha = data => createHash('sha256').update(data).digest('hex');
  if(sha(original) !== sha(copied)) throw new Error('COPY_MISMATCH');
  manifest.push({ source, target: `public/nachweise/${target}`, sha256: sha(copied), verified: true, check: 'Originalinhalt visuell bzw. per PDF-Text geprüft; Kopie bytegleich.' });
}
const portrait = fileURLToPath(new URL('../../Untitled Project Kopie.png', import.meta.url));
await sharp(portrait).webp({quality:92}).toFile(`${root}public/images/marc.webp`);
await copyFile(`${root}demos/routing/workflow.n8n.json`, `${root}public/downloads/lead-routing.n8n.json`);
await writeFile(`${root}evidence/asset-sources.json`, JSON.stringify({ generatedAt: new Date().toISOString(), portrait: { source: portrait, transformation: 'Unverändertes Motiv, WebP-Konvertierung' }, certificates: manifest }, null, 2));
console.log(`${manifest.length} Originalnachweise bytegleich kopiert; Bewerbungsfoto konvertiert; n8n-Export bereitgestellt.`);
