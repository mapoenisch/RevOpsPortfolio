import { chromium } from 'playwright';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

await mkdir('.cache/video',{recursive:true}); await mkdir('public/media/videos',{recursive:true});
const requested=process.argv.slice(2);
const selected=requested.length?requested:['lead-routing','ki-prospecting'];
if(selected.some(slug=>!['lead-routing','ki-prospecting'].includes(slug)))throw new Error('Unbekannter Demo-Slug');
const browser=await chromium.launch({channel:'chrome',headless:true});
async function record(slug) {
  const context=await browser.newContext({viewport:{width:1280,height:720},recordVideo:{dir:'.cache/video',size:{width:1280,height:720}},reducedMotion:'reduce'});
  const page=await context.newPage(); const video=page.video(); const started=Date.now();
  const until=async seconds=>{const remaining=started+seconds*1000-Date.now();if(remaining>0)await page.waitForTimeout(remaining);};
  await page.goto(`http://127.0.0.1:4317/cases/${slug}`);await page.locator('h1').waitFor();await page.evaluate(()=>document.fonts.ready);
  if(slug==='lead-routing') {
    await until(10);await page.locator('.routing-demo').scrollIntoViewIfNeeded();await page.getByRole('button',{name:'Anfrage prüfen'}).click();
    await until(27);await page.getByLabel('Testfall',{exact:true}).selectOption('duplicate');await page.getByRole('button',{name:'Anfrage prüfen'}).click();
    await until(44);await page.getByLabel('Testfall',{exact:true}).selectOption('missing');await page.getByRole('button',{name:'Anfrage prüfen'}).click();
    await until(60);await page.getByLabel('Testfall',{exact:true}).selectOption('error');await page.getByRole('button',{name:'Anfrage prüfen'}).click();
    await until(76);await page.locator('#ergebnis').scrollIntoViewIfNeeded();
  } else {
    await until(10);await page.locator('.prospecting-demo').scrollIntoViewIfNeeded();
    await until(25);await page.getByLabel('Profile filtern').selectOption('priority');
    await until(38);await page.getByRole('button',{name:/Testunternehmen 02/}).click();
    await until(52);await page.getByLabel('Profile filtern').selectOption('excluded');await page.locator('.score-row').first().click();
    await until(66);await page.getByLabel('Profile filtern').selectOption('all');await page.getByRole('button',{name:/Testunternehmen 01/}).click();await page.locator('.ai-context').scrollIntoViewIfNeeded();
    await until(78);await page.locator('#ergebnis').scrollIntoViewIfNeeded();
  }
  await until(91);await context.close();
  const raw=await video.path();const target=`public/media/videos/${slug}.mp4`;
  const result=spawnSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-i',raw,'-t','90','-vf','scale=1280:720','-r','24','-c:v','libx264','-preset','fast','-crf','25','-pix_fmt','yuv420p','-movflags','+faststart','-an',target],{encoding:'utf8'});
  if(result.status!==0)throw new Error(result.stderr);
  const probe=JSON.parse(spawnSync('ffprobe',['-v','quiet','-show_format','-of','json',target],{encoding:'utf8'}).stdout);
  return {slug,duration:Number(probe.format.duration),bytes:Number(probe.format.size),source:'Bildschirmaufnahme der eigenständigen Portfolio-Demo; keine Aufnahme eines externen Systems.',recordedAt:new Date().toISOString()};
}
try {
  const results=await Promise.all(selected.map(record));
  const manifest=JSON.parse(await readFile('public/data/media.json','utf8'));
  const subtitles={
    'lead-routing':[['00:00.000','00:10.000','Eigenständige Routing-Demo für das fiktive LeadPilot-Szenario.'],['00:10.000','00:27.000','Eine vollständige Testanfrage wird normalisiert und Inside Sales zugeordnet.'],['00:27.000','00:44.000','Ein doppelter Eingang erzeugt keine zweite Folgeaufgabe.'],['00:44.000','01:00.000','Fehlende Pflichtangaben führen in die manuelle Prüfung.'],['01:00.000','01:16.000','Bei einem CRM-Fehler bleibt der Zwischenstand erhalten.'],['01:16.000','01:30.000','Diese Aufnahme zeigt die lokale Demo. Der separate n8n-/HubSpot-Test ist dokumentiert.']],
    'ki-prospecting':[['00:00.000','00:10.000','Ein nachvollziehbarer Prototyp mit 50 erfundenen B2B-Profilen.'],['00:10.000','00:25.000','Sechs offengelegte Kriterien ergeben die regelbasierte Punktzahl.'],['00:25.000','00:38.000','Ab 75 Punkten werden Profile zur vertieften Prüfung priorisiert.'],['00:38.000','00:52.000','Jeder Wert lässt sich auf die einzelnen Kriterien zurückführen.'],['00:52.000','01:06.000','Unpassende Märkte werden vor dem KI-Aufruf ausgesondert.'],['01:06.000','01:18.000','KI-Kontext und Kontaktentwurf werden separat gespeichert. Nichts wird versandt.'],['01:18.000','01:30.000','Die Ausgaben brauchen weiterhin fachliche Prüfung. Keine Prognose für Vertriebserfolg.']]
  };
  for(const result of results){const cues=subtitles[result.slug];await writeFile(`public/media/videos/${result.slug}.vtt`,'WEBVTT\n\n'+cues.map(([a,b,t])=>`${a} --> ${b}\n${t}`).join('\n\n')+'\n');manifest[result.slug].video={src:`/media/videos/${result.slug}.mp4`,poster:`/media/${result.slug}.webp`,subtitles:`/media/videos/${result.slug}.vtt`,duration:result.duration};}
  const previous=JSON.parse(await readFile('evidence/video-results.json','utf8').catch(()=>'[]'));
  const merged=[...new Map([...previous,...results].map(result=>[result.slug,result])).values()];
  await writeFile('public/data/media.json',JSON.stringify(manifest,null,2));await writeFile('evidence/video-results.json',JSON.stringify(merged,null,2));console.log(JSON.stringify(results,null,2));
} finally {await browser.close();}
