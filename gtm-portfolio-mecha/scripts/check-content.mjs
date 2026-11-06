import { readFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
const sources=JSON.parse(await readFile('evidence/asset-sources.json','utf8'));
for(const item of sources.certificates){const bytes=await readFile(item.target);assert.equal(createHash('sha256').update(bytes).digest('hex'),item.sha256);}
const report=JSON.parse(await readFile('public/data/prospecting-report.json','utf8'));
assert.equal(report.results.length,50); assert.equal(report.results.every(r=>r.profile.synthetic),true);
assert.equal(report.stats.aiValid,report.results.filter(r=>r.ai).length);
assert.equal(report.stats.drafts,report.results.filter(r=>r.opener).length);
assert.equal(report.stats.aiErrors,report.results.filter(r=>r.aiStatus==='error').length);
assert.equal(report.results.filter(r=>r.opener).every(r=>r.score>=75&&r.ai?.relevant),true);
const routing=JSON.parse(await readFile('public/data/routing-report.json','utf8'));
assert.equal(routing.scope,'n8n-webhook-gateway-hubspot');assert.equal(routing.passed,true);
assert.equal(routing.cases.length,7);assert.ok(routing.cases.every(c=>c.passed));
assert.equal(routing.readbacks.length,2);assert.ok(routing.readbacks.every(r=>r.ownerMatches&&r.taskAssociated&&r.contactCount===1&&r.taskCount===1));
assert.ok(routing.n8n.integrationPassed&&routing.n8n.webhookRejectsUnauthorized&&routing.n8n.workflowDeactivated&&routing.n8n.serverStopped);
const media=JSON.parse(await readFile('public/data/media.json','utf8'));
for(const entry of Object.values(media)){for(const s of entry.screenshots)await access(`public${s.src}`);if(entry.diagram)await access(`public${entry.diagram.src}`);if(entry.video){for(const f of ['src','poster','subtitles'])await access(`public${entry.video[f]}`);}}
await access('public/downloads/Marc-Poenisch-Lebenslauf.pdf');
const html=await readFile('dist/index.html','utf8');assert.ok(html.includes('noindex, nofollow'));
assert.ok(!html.includes('google-analytics')&&!html.includes('fonts.googleapis'));
console.log(`${sources.certificates.length} Originalnachweise, 50 synthetische Profile, ${report.stats.aiValid} KI-Einschätzungen, bestandener n8n-/HubSpot-Bericht, alle eingetragenen Medien und Downloads geprüft.`);
