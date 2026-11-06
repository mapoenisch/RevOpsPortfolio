import { readFile, mkdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire('/Users/marcpoenisch/Projekte/RevOpsPortfolio/gtm-portfolio/package.json');
const sharp = require('sharp'); const { chromium } = require('playwright');
const K = '/Users/marcpoenisch/Projekte/LeadPilot - Eine fiktive Geschäftsidee/LeadPilot - Unternehmensdaten-Projekt Kontext/';
const M = '/Users/marcpoenisch/Projekte/LeadPilot - Eine fiktive Geschäftsidee/Marketing/';
const out = '/Users/marcpoenisch/Projekte/RevOpsPortfolio/gtm-portfolio/public/leadpilot/assets/docs/';
const docs = [
  ['icp', K+'LeadPilot - ICP.pdf'], ['buyer-persona', K+'LeadPilot - Buyer Persona.md'],
  ['strategische-analyse', K+'LeadPilot - Strategische Analyse & Zielgruppenpriorisierung.md'],
  ['gf-vertrag', K+'LeadPilot - Geschäftsführeranstellungsvertrag.md'], ['gesellschafterliste', K+'LeadPilot - Gesellschafterliste.md'],
  ['mietvertrag', K+'LeadPilot - Mietvertrag Augustusplatz 9.md'], ['handelsregister', K+'LeadPilot - Anmeldung zum Handelsregister.md'],
  ['satzung', K+'LeadPilot - Satzung der LeadPilot GmbH.md'], ['checkup', K+'LeadPilot - Unternehmens-Check-up 2025.md'],
  ['geschaeftsbericht', K+'LeadPilot - Geschaeftsbericht2025.pdf'], ['unternehmensanalyse', K+'LeadPilot - Unternehmensanalyse1.pdf'],
  ['quartalsbericht-q1', K+'LeadPilot_Quartalsbericht_Q1_2026_v1.1.md'], ['quartalsbericht-q2', K+'LeadPilot_Quartalsbericht_Q2_2026_v1.1.md'],
  ['quartalsbericht-q3', K+'LeadPilot_Quartalsbericht_Q3_2026_v1.1.md'], ['marketingplanung', M+'LeadPilot - Marketingplanung H2-2026(Präsentation).pdf'],
  ['content-strategie', K+'LeadPilot - Content Strategie.md'],
];
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const inline = s => esc(s).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/\*(.+?)\*/g,'<i>$1</i>').replace(/`/g,'');
function md(src){
  src = src.replace(/\\([#*`_\-\[\].|>])/g,'$1').replace(/```/g,'');
  const lines = src.split('\n'); let h=''; let table=[];
  const flush=()=>{ if(table.length){ h+='<table>'+table.filter(r=>!/^\|?\s*:?-{2,}/.test(r)).map(r=>'<tr>'+r.replace(/^\||\|$/g,'').split('|').map(c=>`<td>${inline(c.trim())}</td>`).join('')+'</tr>').join('')+'</table>'; table=[]; } };
  for (let l of lines){ l=l.trim(); if(l.startsWith('|')){table.push(l);continue;} flush();
    if(!l) continue; let m;
    if((m=l.match(/^(?:\d+\.\s*)?(#{1,4})\s*(.*)$/))) h+=`<h${m[1].length}>${inline(m[2].replace(/\*\*/g,''))}</h${m[1].length}>`;
    else if(/^[-*•]\s/.test(l)) h+=`<li>${inline(l.slice(2))}</li>`;
    else if(/^-{3,}$/.test(l)) h+='<hr>'; else h+=`<p>${inline(l)}</p>`; }
  flush(); return h;
}
await mkdir(out,{recursive:true});
const browser = await chromium.launch({ channel:'chrome' }); const page = await browser.newPage({ viewport:{width:794,height:1123}, deviceScaleFactor:1 });
for (const [name, file] of docs){
  let png;
  if(file.endsWith('.pdf')){ execFileSync('pdftoppm',['-f','1','-l','1','-r','110','-png','-singlefile',file,'/tmp/_thumb']); png=await readFile('/tmp/_thumb.png'); }
  else { const body = md(await readFile(file,'utf8'));
    await page.setContent(`<html><body style="margin:0;background:#fff;font:13px/1.45 Helvetica,Arial,sans-serif;color:#1d2330;padding:64px 70px"><style>h1{font-size:24px;margin:0 0 14px}h2{font-size:18px;margin:18px 0 8px}h3,h4{font-size:15px;margin:14px 0 6px}p{margin:0 0 8px}li{margin:0 0 4px 18px}table{border-collapse:collapse;width:100%;margin:8px 0 12px;font-size:12px}td{border:1px solid #cfd5df;padding:5px 7px;vertical-align:top}hr{border:0;border-top:1px solid #ccd}</style>${body}</body></html>`);
    png = await page.screenshot({ clip:{x:0,y:0,width:794,height:1123} }); }
  const meta = await sharp(png).metadata();
  const h = Math.round(meta.width*1.414); // A4-Format, erste Seite
  await sharp(png).extract({left:0,top:0,width:meta.width,height:Math.min(h,meta.height)}).resize({width:640}).webp({quality:82}).toFile(out+name+'.webp');
  console.log(name, meta.width+'x'+meta.height);
}
await browser.close();
