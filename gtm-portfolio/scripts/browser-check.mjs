import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('../', import.meta.url));
const base = 'http://127.0.0.1:4317';
await mkdir(`${root}evidence/browser`, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = []; const errors = []; const requests = new Set();
const pages = [['home','/'],['leadpilot','/cases/leadpilot'],['routing','/cases/lead-routing'],['prospecting','/cases/ki-prospecting'],['certificates','/nachweise'],['notes','/hinweise'],['404','/gibt-es-nicht']];
try {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  page.on('pageerror', e => errors.push(e.message));
  page.on('request', r => { if(!r.url().startsWith(base) && !r.url().startsWith('data:')) requests.add(new URL(r.url()).origin); });
  for(const width of [1440,768,375,320]) {
    await page.setViewportSize({ width, height: 1000 });
    for(const [name,path] of pages) {
      await page.goto(base+path); await page.locator('h1').waitFor(); await page.evaluate(()=>document.fonts.ready);
      for(const picture of await page.locator('img[loading="lazy"]').all()) { await picture.scrollIntoViewIfNeeded(); await picture.evaluate(img=>img.decode().catch(()=>undefined)); }
      await page.evaluate(()=>window.scrollTo(0,0));
      await page.locator('body').evaluate(async () => { await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))); });
      const metrics=await page.evaluate(()=>({ overflow:document.documentElement.scrollWidth>innerWidth, brokenImages:[...document.images].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src), h1:document.querySelectorAll('h1').length }));
      const axe = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
      const image=`evidence/browser/${name}-${width}.png`;
      await page.screenshot({path:root+image,fullPage:true});
      results.push({name,path,width,...metrics,violations:axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)})),screenshot:image});
    }
  }
  await writeFile(`${root}evidence/browser-results.json`,JSON.stringify({generatedAt:new Date().toISOString(),results,interactionTests:'running'},null,2));
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(base+'/cases/lead-routing');
  await page.getByRole('button',{name:'Anfrage prüfen'}).click();
  await page.getByText('Sauber übergeben',{exact:true}).waitFor();
  await page.getByLabel('Testfall',{exact:true}).selectOption('duplicate');
  await page.getByRole('button',{name:'Anfrage prüfen'}).click();
  await page.getByText('Dublette abgefangen',{exact:true}).waitFor();
  await page.getByLabel('Testfall',{exact:true}).selectOption('missing');
  await page.getByRole('button',{name:'Anfrage prüfen'}).click();
  await page.getByText('Manuelle Prüfung',{exact:true}).first().waitFor();
  await page.getByLabel('Testfall',{exact:true}).selectOption('error');
  await page.getByRole('button',{name:'Anfrage prüfen'}).click();
  await page.getByText('Zwischenstand gesichert',{exact:true}).waitFor();
  const media=JSON.parse(await readFile(`${root}public/data/media.json`,'utf8'));
  for(const slug of ['leadpilot','lead-routing','ki-prospecting']) {
    const diagram=media[slug].diagram;assert.ok(diagram,slug+': Diagramm vorhanden');
    await page.goto(base+`/cases/${slug}`);
    const trigger=page.locator('.diagram-trigger');await trigger.waitFor();
    await trigger.locator('img').evaluate(img=>img.decode());
    assert.equal(await page.getByText('Architekturdiagramm in Vorbereitung',{exact:true}).count(),0);
    const response=await page.request.get(base+diagram.src);assert.equal(response.status(),200);assert.ok(response.headers()['content-type'].includes('image/svg+xml'));
    await page.locator('.diagram-viewer').screenshot({path:root+`evidence/diagrams/${slug}-desktop.png`});
    await trigger.focus();await page.keyboard.press('Enter');
    const dialog=page.getByRole('dialog',{name:'Diagramm vergrößert'});assert.ok(await dialog.isVisible());
    await page.getByRole('button',{name:'Diagramm weiter vergrößern',exact:true}).click();
    assert.equal(await dialog.locator('output').textContent(),'150 %');
    await page.getByRole('button',{name:'Einpassen',exact:true}).click();assert.equal(await dialog.locator('output').textContent(),'100 %');
    await page.keyboard.press('Escape');assert.equal(await dialog.isVisible(),false);assert.ok(await trigger.evaluate(el=>el===document.activeElement));
    await page.locator('.diagram-description summary').click();assert.equal(await page.locator('.diagram-description li').count(),diagram.description.length);
    await page.setViewportSize({width:375,height:900});await trigger.click();
    assert.equal(await dialog.locator('output').textContent(),'250 %');
    assert.ok(await page.locator('.diagram-stage').evaluate(el=>el.scrollWidth>el.clientWidth));
    await dialog.screenshot({path:root+`evidence/diagrams/${slug}-mobile-zoom.png`});
    await page.getByRole('button',{name:'Diagrammansicht schließen',exact:true}).click();assert.equal(await dialog.isVisible(),false);
    await page.setViewportSize({width:1440,height:1000});
  }
  await page.goto(base+'/cases/ki-prospecting');
  await page.getByLabel('Profile filtern').selectOption('priority');
  assert.equal(await page.locator('.score-row').count(),25);
  await page.getByLabel('Testprofile durchsuchen').fill('Testunternehmen 01');
  assert.equal(await page.locator('.score-row').count(),1);
  await page.getByLabel('Testprofile durchsuchen').fill('nichtvorhanden');
  await page.getByText('Keine passenden Testprofile.').waitFor();
  await page.goto(base+'/nachweise');
  await page.getByRole('button',{name:'Reporting',exact:true}).click();
  assert.equal(await page.locator('.certificate-grid article').count(),1);
  await page.getByRole('button',{name:'Alle',exact:true}).click();
  const assetSources=JSON.parse(await readFile(`${root}evidence/asset-sources.json`,'utf8'));
  assert.equal(await page.locator('.certificate-grid article').count(),assetSources.certificates.length);
  await page.getByRole('button',{name:'KI & Umsetzung',exact:true}).click();
  assert.equal(await page.locator('.certificate-grid article').count(),6);
  assert.equal(await page.locator('.certificate-grid .certificate-provider').filter({hasText:/^Anthropic Academy$/}).count(),6);
  await page.getByRole('button',{name:'Alle',exact:true}).click();
  const links = await page.locator('.certificate-grid a').evaluateAll(items=>items.map(a=>a.getAttribute('href')));
  for(const link of [...links,'/downloads/Marc-Poenisch-Lebenslauf.pdf','/downloads/lead-routing.n8n.json','/data/prospecting-report.json','/data/routing-report.json']) {
    const response=await page.request.get(base+link); assert.equal(response.status(),200,link); assert.ok((await response.body()).length>20,link);
    if(link==='/data/routing-report.json'){const receipt=await response.json();assert.equal(receipt.passed,true);assert.equal(receipt.n8n.integrationPassed,true);}
  }
  await page.setViewportSize({width:375,height:900}); await page.goto(base+'/');
  await page.getByRole('button',{name:'Menü öffnen'}).click();
  assert.equal(await page.locator('#main-nav').isVisible(),true);
  await page.keyboard.press('Escape'); assert.equal(await page.locator('#main-nav').isVisible(),false);
  assert.equal(await page.getByRole('button',{name:'Menü öffnen'}).evaluate(el=>el===document.activeElement),true);
  const keyboardPage=await context.newPage();await keyboardPage.goto(base+'/');await keyboardPage.locator('h1').waitFor();await keyboardPage.keyboard.press('Tab');
  assert.equal(await keyboardPage.getByRole('link',{name:'Zum Inhalt'}).evaluate(el=>el===document.activeElement),true);await keyboardPage.close();
  for(const slug of ['leadpilot','lead-routing','ki-prospecting']) {
    if(!media[slug].video) continue;
    await page.goto(base+`/cases/${slug}`);
    const video=page.locator('video'); await video.waitFor();
    const playback=await video.evaluate(async el=>{el.muted=true;await el.play();await new Promise(resolve=>el.addEventListener('timeupdate',resolve,{once:true}));el.pause();return{duration:el.duration,time:el.currentTime,error:el.error?.code||null,tracks:el.textTracks.length};});
    assert.ok(Math.abs(playback.duration-90)<1);assert.ok(playback.time>0);assert.equal(playback.error,null);assert.equal(playback.tracks,1);
  }
  if(media['leadpilot'].screenshots.length) {
    await page.goto(base+'/cases/leadpilot');
    await page.locator('.screenshot-button').first().click(); assert.equal(await page.locator('.image-dialog').isVisible(),true); await page.keyboard.press('Escape'); assert.equal(await page.locator('.image-dialog').isVisible(),false);
  }
  assert.deepEqual(errors,[],'JavaScript-Fehler'); assert.deepEqual([...requests],[],'Unerwartete externe Netzwerkaufrufe');
  const failures=results.filter(r=>r.overflow||r.brokenImages.length||r.h1!==1||r.violations.length);
  await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/');await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:root+'evidence/browser/portfolio-desktop.png'});
  await page.setViewportSize({width:375,height:1000});await page.screenshot({path:root+'evidence/browser/portfolio-mobile.png'});
  await writeFile(`${root}evidence/browser-results.json`,JSON.stringify({generatedAt:new Date().toISOString(),results,interactionTests:['Routing: vier Fälle','Scoring: Filter, Suche, Leerzustand','Nachweise: Filter und alle Dateien','Diagramme: drei SVGs, Textfassung, Download, Zoom, Einpassen, Escape und Fokusrückgabe; mobile Vergrößerung','Mobiles Menü, Escape, Fokus','Sprunglink','Direkte Seitenaufrufe','MP4-Wiedergabe, Dauer, Untertitelspur','Keine externen Datenaufrufe'],errors,externalRequests:[...requests]},null,2));
  console.log(JSON.stringify({views:results.length,failures:failures.map(r=>({name:r.name,width:r.width,overflow:r.overflow,violations:r.violations})),errors,externalRequests:[...requests]},null,2));
  assert.equal(failures.length,0,'Darstellungs- oder Accessibility-Fehler');
} finally { await browser.close(); }
