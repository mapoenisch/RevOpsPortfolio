import { chromium } from 'playwright';
import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';

await mkdir('public/media', {recursive:true}); await mkdir('evidence/captures',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const evidence=[]; const manifest=JSON.parse(await readFile('public/data/media.json','utf8'));
try {
  const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  for(const [slug,selector] of [['lead-routing','.routing-demo'],['ki-prospecting','.prospecting-demo']]) {
    await page.goto(`http://127.0.0.1:4317/cases/${slug}`); await page.locator(selector).waitFor(); await page.evaluate(()=>document.fonts.ready);
    if(slug==='lead-routing') await page.getByRole('button',{name:'Anfrage prüfen'}).click();
    else await page.locator('.ai-context').getByText('Ergänzende KI-Einschätzung').waitFor();
    const original=`evidence/captures/${slug}.png`;
    await page.locator(selector).screenshot({path:original});
    await sharp(original).webp({quality:90}).toFile(`public/media/${slug}.webp`);
    evidence.push({slug,source:'Neue lokale Portfolio-Demo, keine HubSpot-Oberfläche',url:`http://127.0.0.1:4317/cases/${slug}`,capturedAt:new Date().toISOString(),viewport:{width:1440,height:1000},original,sha256:createHash('sha256').update(await readFile(original)).digest('hex'),synthetic:true});
    manifest[slug].screenshots=[{src:`/media/${slug}.webp`,alt:slug==='lead-routing'?'Lokale Routing-Demo nach erfolgreicher Prüfung einer synthetischen Anfrage':'Lokale Scoring-Demo mit synthetischen Profilen und einzeln aufgeschlüsselten Kriterien',caption:slug==='lead-routing'?'Lokale Demo · ein Kontakt und eine Folgeaufgabe · synthetische Daten':'Lokale Demo · regelbasierte Bewertung und separat gekennzeichneter KI-Kontext'}];
  }
  await writeFile('public/data/media.json',JSON.stringify(manifest,null,2));
  await writeFile('evidence/captures.json',JSON.stringify(evidence,null,2));
  console.log('Zwei aktuelle Aufnahmen der eigenständigen Demos erfasst. Keine LeadPilot-Aufnahmen ersetzt.');
} finally { await browser.close(); }
