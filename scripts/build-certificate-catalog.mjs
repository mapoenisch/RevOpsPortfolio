import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const source = '/Users/marcpoenisch/Projekte/Jobsuche 2026/Zertifikate';
const files = await fs.readdir(source, { recursive: true });
const normalize = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const result = [];
const evidence = [];
async function add({ id, title, issuer, provider, category, kind, date, validUntil, match, featured = false }) {
  const candidates = files.filter((f) => normalize(f).includes(normalize(match)));
  const candidate = candidates.find((f) => f.endsWith('.pdf')) ?? candidates.find((f) => f.endsWith('.png')) ?? candidates.find((f) => f.endsWith('.svg'));
  if (!candidate) throw new Error(`Missing certificate: ${match}`);
  const ext = path.extname(candidate).toLowerCase();
  const filename = `${id}${ext}`;
  await fs.copyFile(path.join(source, candidate), path.join(root, 'public/nachweise', filename));
  result.push({ id, title, issuer, provider, category, kind, date, ...(validUntil ? { validUntil } : {}), file: `/nachweise/${filename}`, ...(featured ? { featured: true } : {}) });
  evidence.push({ id, source: candidate, title, date, validUntil: validUntil ?? null, method: ext === '.png' ? 'macOS Vision OCR; hervorgehobene Nachweise zusätzlich visuell geprüft' : ext === '.pdf' ? 'PDF-Textextraktion; bildbasierte Nachweise visuell geprüft' : 'Vorhandenes Badge; keine Personalisierung und kein Datum ausgewiesen' });
}

const hs = [
 ['hubspot-sales', 'HubSpot Sales-Software', 'Sales-Software', 'CRM & Operations', '26.08.2026', '25.09.2027', true],
 ['hubspot-reporting', 'HubSpot-Berichterstattung', 'HubSpot-Berichterstattung', 'Daten & Analyse', '07.10.2026', '06.11.2027', false],
 ['hubspot-marketing', 'HubSpot Marketing-Software', 'Marketing-Software', 'Marketing', '07.09.2026', '07.10.2027', false],
 ['hubspot-inbound-sales', 'Inbound-Sales', 'Inbound-Sales', 'Vertrieb', '30.08.2026', '28.09.2028', false],
 ['hubspot-frictionless', 'Reibungsloser Vertrieb', 'Reibungsloser Vertrieb', 'Vertrieb', '02.09.2026', '01.10.2028', false],
 ['hubspot-service', 'HubSpot Service-Software', 'Service-Software', 'CRM & Operations', '08.09.2026', '08.10.2027', false],
 ['hubspot-inbound', 'Inbound', 'HubSpot Inbound_', 'Marketing', '05.09.2026', '04.10.2028', false],
 ['hubspot-inbound-marketing', 'Inbound-Marketing', 'HubSpot Inbound-Marketing_', 'Marketing', '08.09.2026', '07.10.2028', false],
 ['hubspot-optimization', 'Inbound-Marketing-Optimierung', 'Inbound-Marketing-Optimierung', 'Marketing', '12.09.2026', '12.10.2027', false],
 ['hubspot-email', 'E-Mail-Marketing', 'E-Mail-Marketing', 'Marketing', '07.10.2026', '05.11.2028', false],
 ['hubspot-cms', 'CMS Hub für Marketer', 'CMS Hub', 'Marketing', '13.09.2026', '13.10.2027', false],
 ['hubspot-aeo', 'AEO Fundamentals', 'AEO Fundamentals', 'Marketing', '14.09.2026', '13.10.2028', false],
];
for (const [id,title,match,category,date,validUntil,featured] of hs) await add({id,title,match,category,date,validUntil,featured,provider:'HubSpot',issuer:'HubSpot Academy',kind:'Zertifizierung'});
const anthropic = [
 ['anthropic-mcp', 'Introduction to Model Context Protocol', 'Introduction to MCP', true],
 ['anthropic-mcp-advanced', 'Model Context Protocol: Advanced Topics', 'Model Context Protocol Advanced', false],
 ['anthropic-code-action', 'Claude Code in Action', 'Claude Code in Action', false],
 ['anthropic-claude', 'Claude 101', 'Claude 101 Certificate', false],
 ['anthropic-code', 'Claude Code 101', 'Claude Code 101 Certificate', false],
 ['anthropic-platform', 'Claude Platform 101', 'Claude Platform 101 Certificate', false],
];
for (const [id,title,match,featured] of anthropic) await add({id,title,match,featured,category:'KI & Entwicklung',provider:'Anthropic',issuer:'Anthropic Academy',kind:'Lernnachweis',date:'Abschluss ohne Datumsangabe'});
for (const [id,title,match,featured] of [
 ['demandbase-operations','Marketing Operations / IT Administrator','MarketingOperations_ITAdministrator_',true],
 ['demandbase-ai','Demandbase AI Practitioner','DemandbaseAIPractitioner_',false],
 ['demandbase-sdr','Sales Development Representative','SalesDevelopmentRepresentative_',false],
]) await add({id,title,match,featured,provider:'Demandbase',issuer:'Demandbase Academy',kind:'Digitales Badge',category:id==='demandbase-sdr'?'Vertrieb':'CRM & Operations',date:'10.10.2026'});

const linkedin = [
 ['business-analysis','Grundwissen Business-Analyse','Abschlusszertifikat_Grundwissen Business-Analyse','Daten & Analyse','07.07.2026',true,true],
 ['project-management','Grundwissen Projektmanagement','Abschlusszertifikat_Grundwissen Projektmanagement','Projektmanagement','06.07.2026',true,false],
 ['copilot-excel','Copilot in Excel: KI-unterstützte Datenanalyse','Abschlusszertifikat_Copilot in Excel','Daten & Analyse','29.06.2026',false,true],
 ['azure-ai','Microsoft Azure KI Grundwissen mit Fachzertifikat','Fachzertifikat_Microsoft Azure','KI & Entwicklung','30.06.2026',true,false],
 ['azure-workloads','Microsoft Azure KI Grundwissen: Workloads und Machine Learning auf Azure','Abschlusszertifikat_Microsoft Azure','KI & Entwicklung','30.06.2026',false,false],
 ['copilot-productivity','Microsoft Copilot für Produktivität','Abschlusszertifikat_Copilot fur Produktivitaet','KI & Entwicklung','04.08.2026',true,false],
 ['copilot-365','Microsoft 365 Copilot kennenlernen','Abschlusszertifikat_Microsoft 365','KI & Entwicklung','27.06.2026',false,false],
 ['copilot-work','Ihre Arbeit optimieren mit Microsoft Copilot','Abschlusszertifikat_Ihre Arbeit','KI & Entwicklung','27.06.2026',false,false],
 ['generative-productivity','Erhöhen Sie Ihre Produktivität mit generativer KI','Abschlusszertifikat_Erhoehen','KI & Entwicklung','29.06.2026',true,false],
 ['generative-basics','Grundwissen Generative KI','Abschlusszertifikat_Grundwissen Generative','KI & Entwicklung','27.06.2026',true,false],
 ['claude-course','Claude AI Grundkurs','Abschlusszertifikat_Claude AI','KI & Entwicklung','02.07.2026',false,false],
 ['ai-basics','Künstliche Intelligenz (KI) – Grundlagen','Abschlusszertifikat_Kuenstliche','KI & Entwicklung','27.06.2026',false,false],
 ['generative-definition','Was ist generative KI?','Zertifikat_Was ist generative','KI & Entwicklung','26.06.2026',false,false],
 ['ai-ethics','Ethik im Zeitalter generativer KI','Abschlusszertifikat_Ethik','KI & Entwicklung','27.06.2026',false,false],
 ['generative-search','Generative KI: Die Entwicklung einer durchdachten Online-Suche','Abschlusszertifikat_Generative KI','KI & Entwicklung','26.06.2026',false,false],
 ['team-management','Projektmanagement: Team, Führung, Zusammenarbeit','Abschlusszertifikat_Projektmanagement Team','Projektmanagement','01.07.2026',false,false],
];
for (const [id,title,match,category,date,microsoft,featured] of linkedin) await add({id,title,match,category,date,featured,provider:microsoft?'Microsoft / LinkedIn':'LinkedIn',issuer:microsoft?'Microsoft und LinkedIn Learning':'LinkedIn Learning',kind:'Lernnachweis'});
await add({id:'b2b-workshop',title:'Kundenbedürfnisse verstehen und nutzen',match:'Kundenbedurfnisse',provider:'Rainer Mayer',issuer:'Rainer Mayer · Training, Coaching, Consulting',category:'Vertrieb',kind:'Teilnahmebestätigung',date:'28.09.2026',featured:true});
await add({id:'google-generative',title:'Introduction to Generative AI',match:'Introduction to Generative AI_',provider:'Google',issuer:'Google Cloud · Completion Badge',category:'KI & Entwicklung',kind:'Digitales Badge',date:'Badge ohne Datumsangabe'});
await add({id:'google-gemini',title:'Gemini Enterprise Agent Ready',match:'Gemini Enterprise Agent Ready.svg',provider:'Google',issuer:'Google Developer Program',category:'KI & Entwicklung',kind:'Digitales Badge',date:'Badge ohne Datumsangabe'});

const featuredOrder = ['hubspot-sales','demandbase-operations','anthropic-mcp','business-analysis','copilot-excel','b2b-workshop'];
result.sort((a,b) => {
  const ai=featuredOrder.indexOf(a.id), bi=featuredOrder.indexOf(b.id);
  if(ai>=0 || bi>=0) return (ai<0?100:ai)-(bi<0?100:bi);
  return a.provider.localeCompare(b.provider,'de') || a.title.localeCompare(b.title,'de');
});
await fs.writeFile('src/content/certificates.json',JSON.stringify(result,null,2)+'\n');
await fs.mkdir('docs/evidence',{recursive:true});
await fs.writeFile('docs/evidence/certificate-sources.json',JSON.stringify(evidence,null,2)+'\n');
console.log(JSON.stringify({total:result.length,featured:result.filter(x=>x.featured).map(x=>x.title),providers:[...new Set(result.map(x=>x.provider))]},null,2));
