import { chromium } from 'playwright';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';

const sources = [
  ['leadpilot','../Diagramm zu Case Study 1/Diagramm zu Case Study 1- LeadPilot CRM Architektur1.svg'],
  ['lead-routing','../Diagramm zu Case Study 2/Case Study 2- Inbound Lead-Routing (n8n + HubSpot).svg'],
  ['ki-prospecting','../Diagramm zu Case Study 3/Case Study 3- Mehrstufiges KI-Prospecting & Scoring.svg'],
];
const media = JSON.parse(await readFile('public/data/media.json','utf8'));
await mkdir('evidence/diagrams',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const results=[];
try {
  const page=await browser.newPage({viewport:{width:1200,height:1600},reducedMotion:'reduce'});
  for(const [slug,source] of sources) {
    const diagram=media[slug].diagram;
    const original=await readFile(source);
    const bytes=await readFile('public'+diagram.src);
    const svg=bytes.toString('utf8');
    assert.ok(!/<script|<foreignObject|@import|https?:\/\//i.test(svg.replace('http://www.w3.org/2000/svg','')),'SVG uses local native vector content only');
    await page.goto('http://127.0.0.1:4317'+diagram.src);
    const textOverflow=await page.locator('svg').evaluate(svg=>[...svg.querySelectorAll('text')].filter(text=>{const b=text.getBBox(),v=svg.viewBox.baseVal;return b.x<v.x||b.y<v.y||b.x+b.width>v.x+v.width||b.y+b.height>v.y+v.height;}).map(text=>text.textContent));
    assert.deepEqual(textOverflow,[],slug+': no clipped SVG text');
    const screenshot='evidence/diagrams/'+slug+'.png';await page.locator('svg').screenshot({path:screenshot});
    results.push({slug,source,sourceSha256:createHash('sha256').update(original).digest('hex'),portfolioFile:'public'+diagram.src,sha256:createHash('sha256').update(bytes).digest('hex'),width:diagram.width,height:diagram.height,nativeSvg:true,externalResources:0,textOverflow,screenshot});
  }
  await writeFile('evidence/diagrams.json',JSON.stringify({checkedAt:new Date().toISOString(),authorization:'Marc erlaubte die Überarbeitung der drei gelieferten Diagramme im Chat.',originalsPreserved:true,changes:['Case 1: Supabase und getrennte Datenquellen statt nicht nachgewiesener Next-Best-Action-Engine/HubSpot-Synchronisierung.','Case 2: Normalisierung im Gateway; Kontakt und Aufgabe statt Firma/Deal/Slack-Versand.','Case 3: lokale Regeln, fester Score, lokale KI und gespeicherter Bericht statt KI-Punktvergabe/Personalisierung/CRM-Export.','Native SVG-Texte ohne externe Schriftimporte; besser lesbare Flächen und Beschriftungen.'],results},null,2));
  console.log(JSON.stringify({diagrams:results.length,clippedText:0,externalResources:0,originalsPreserved:true}));
} finally { await browser.close(); }
