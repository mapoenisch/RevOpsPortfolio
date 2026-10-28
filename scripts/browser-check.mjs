import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';

const base='http://127.0.0.1:3100';
const root='docs/evidence/screenshots';
await fs.mkdir(root,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const results=[];
const errors=[];
const routes=[['home','/'],['leadpilot','/projekte/leadpilot/'],['jobscout','/projekte/jobscout/'],['certificates','/zertifikate/'],['privacy','/datenschutz/']];
try {
 for(const [device,width,height] of [['desktop',1440,1000],['mobile',390,844]]){
  const context=await browser.newContext({viewport:{width,height},reducedMotion:'reduce'});
  const page=await context.newPage();
  page.on('pageerror',e=>errors.push(e.message));
  for(const [name,route] of routes){
   const response=await page.goto(base+route,{waitUntil:'networkidle'});
   assert.equal(response.status(),200,route);
   await page.evaluate(()=>document.fonts.ready);
   // Load below-the-fold images before both screenshot and image validation.
   await page.evaluate(async()=>{
    const images=[...document.images];
    for(const image of images){image.loading='eager';}
    await Promise.all(images.map(image=>image.decode().catch(()=>{})));
   });
   const metrics=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,images:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)}));
   assert.ok(metrics.scroll<=width,`${name} ${device}: horizontal overflow ${metrics.scroll}>${width}`);
   assert.deepEqual(metrics.images,[],`${name} ${device}: broken images`);
   const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
   await page.screenshot({path:`${root}/${name}-${device}.png`,fullPage:true});
   assert.deepEqual(axe.violations.map(v=>({id:v.id,description:v.description,targets:v.nodes.map(n=>n.target)})),[],`${name} ${device}: accessibility`);
   results.push({page:name,device,width,status:response.status(),overflow:false,brokenImages:0,accessibilityViolations:axe.violations.length});
  }
  if(device==='mobile'){
   await page.goto(base,{waitUntil:'networkidle'});
   const menu=page.locator('.menu-toggle');
   await menu.click();
   assert.equal(await menu.getAttribute('aria-expanded'),'true');
   await page.keyboard.press('Escape');
   assert.equal(await menu.getAttribute('aria-expanded'),'false');
   assert.ok(await menu.evaluate(el=>el===document.activeElement));
   await menu.click();
   await page.getByRole('navigation',{name:'Hauptnavigation'}).getByRole('link',{name:'Zertifikate'}).click();
   await page.waitForURL('**/zertifikate/');
   assert.equal(await page.getByRole('button',{name:'Menü'}).getAttribute('aria-expanded'),'false');
  }
  await page.goto(base+'/zertifikate/',{waitUntil:'networkidle'});
  const total=await page.locator('.certificate-card').count();
  await page.getByLabel('Anbieter',{exact:true}).selectOption('Anthropic');
  assert.equal(await page.locator('.certificate-card').count(),6);
  await page.getByLabel('Nachweis suchen').fill('Model Context');
  assert.equal(await page.locator('.certificate-card').count(),2);
  await page.getByLabel('Nachweis suchen').fill('kein-passender-nachweis-xyz');
  await page.getByRole('button',{name:'Filter zurücksetzen'}).click();
  assert.equal(await page.locator('.certificate-card').count(),total);
  await page.goto(base,{waitUntil:'networkidle'});
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(()=>document.activeElement?.textContent),'Zum Inhalt springen');
  await page.keyboard.press('Enter');
  assert.equal(await page.evaluate(()=>location.hash),'#inhalt');
  const download=await context.request.get(base+'/downloads/Marc-Poenisch-Lebenslauf.pdf');
  assert.equal(download.status(),200);
  assert.ok((await download.body()).subarray(0,4).toString()==='%PDF');
  await context.close();
 }
 const context=await browser.newContext({viewport:{width:320,height:800}});
 const page=await context.newPage();
 await page.goto(base,{waitUntil:'networkidle'});
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'320px overflow');
 const missing=await page.goto(base+'/diese-seite-gibt-es-nicht/',{waitUntil:'networkidle'});
 assert.equal(missing.status(),404);
 await context.close();
 assert.deepEqual(errors,[],'Browser runtime errors');
 await fs.writeFile('docs/evidence/browser-results.json',JSON.stringify({checkedAt:new Date().toISOString(),results,checks:['mobile menu, Escape and focus','certificate filters, search, reset','skip link','PDF download','320px overflow','404'],errors},null,2)+'\n');
 console.log(`PASS: ${results.length} Ansichten, 0 Barrierefreiheitsfehler, Filter/Suche, mobile Navigation, Tastatur, PDF und 404 geprüft.`);
}finally{await browser.close();}
