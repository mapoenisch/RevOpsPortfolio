import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const base = 'http://127.0.0.1:4317';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({ reducedMotion: 'reduce' });
const page = await context.newPage();
const errors = [], external = [], results = [];
page.on('pageerror', error => errors.push(error.message));
page.on('request', request => {
  if (!request.url().startsWith(base) && !request.url().startsWith('data:')) external.push(request.url());
});
try {
  for (const width of [1440, 768, 375, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(base + '/leadpilot');
    await page.locator('h1').waitFor();
    await page.evaluate(() => document.fonts.ready);
    for (const picture of await page.locator('img[loading="lazy"]').all()) {
      await picture.scrollIntoViewIfNeeded();
      await picture.evaluate(img => img.decode().catch(() => undefined));
    }
    const metrics = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      brokenImages: [...document.images].filter(img => img.complete && !img.naturalWidth).map(img => img.src),
      h1: document.querySelectorAll('h1').length,
      chapters: document.querySelectorAll('.lp-chapter').length,
      videos: [...document.querySelectorAll('video')].map(video => ({
        autoplay: video.autoplay, preload: video.preload, tracks: video.querySelectorAll('track[kind="captions"]').length,
      })),
    }));
    const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    results.push({ width, ...metrics, violations: axe.violations.map(v => ({id:v.id, impact:v.impact, nodes:v.nodes.map(n => n.target)})) });
    await page.evaluate(() => window.scrollTo(0,0));
    await page.screenshot({path:root+`evidence/leadpilot/qa-chronik-${width}.png`});
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(base+'/');
  await page.getByRole('link',{name:'Die Projektchronik ansehen'}).click();
  assert.equal(new URL(page.url()).pathname,'/leadpilot');
  await page.locator('.lp-chapter').first().waitFor();
  assert.equal(await page.locator('.lp-chapter').count(),8);
  assert.equal(await page.locator('.lp-gallery-count').textContent(),'01 / 12');
  await page.getByRole('button',{name:'Nächstes Marketingmotiv'}).click();
  assert.equal(await page.locator('.lp-gallery-count').textContent(),'02 / 12');
  await page.getByRole('button',{name:'Vorheriges Marketingmotiv'}).click();
  assert.equal(await page.locator('.lp-gallery-count').textContent(),'01 / 12');
  assert.equal(await page.locator('.lp-compare').count(),3);
  assert.equal(await page.locator('.lp-compare a[aria-label]').count(),6);
  for (const video of await page.locator('.lp-video video').all()) {
    await video.scrollIntoViewIfNeeded();
    const state = await video.evaluate(async element => {
      element.muted = true;
      await element.play();
      await new Promise((resolve,reject) => {
        const timer=setTimeout(()=>reject(new Error('Video startet nicht')),10000);
        element.addEventListener('timeupdate',()=>{clearTimeout(timer);resolve(null);},{once:true});
      });
      element.pause();
      return {time:element.currentTime,duration:element.duration,error:element.error?.code || null};
    });
    assert.ok(state.time>0 && state.duration>0);
    assert.equal(state.error,null);
  }
  await page.locator('#dashboard').scrollIntoViewIfNeeded();
  await page.screenshot({path:root+'evidence/leadpilot/qa-vergleich.png'});
  await page.goto(base+'/cases/leadpilot');
  assert.equal(await page.getByRole('link',{name:'Zur Projektchronik'}).count(),1);
  const captionPaths=['/leadpilot/assets/expo-feature.de.vtt','/leadpilot/assets/expo-spot.de.vtt','/leadpilot/assets/erster-werbespot.en.vtt'];
  for (const path of captionPaths) {
    const response=await page.request.get(base+path);
    assert.equal(response.status(),200,path);
    assert.ok((await response.text()).startsWith('WEBVTT'),path);
  }
  const failed=results.filter(item => item.overflow || item.brokenImages.length || item.h1!==1 ||
    item.chapters!==8 || item.violations.length || item.videos.some(v=>v.autoplay || v.preload!=='none' || v.tracks!==1));
  const report={generatedAt:new Date().toISOString(),results,errors,external,checks:['Teaser und Case-Verweis','Galerie vor/zurück','drei Vorher-Nachher-Vergleiche','Untertiteldateien','drei Videos starten','keine Autoplay-Videos']};
  await writeFile(root+'evidence/leadpilot/qa-browser.json',JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify({results,errors,external,failed:failed.length},null,2));
  assert.deepEqual(errors,[]);
  assert.deepEqual(external,[]);
  assert.equal(failed.length,0,'Chronik enthält Darstellungs- oder Barrierefreiheitsfehler');
} finally {
  await browser.close();
}
