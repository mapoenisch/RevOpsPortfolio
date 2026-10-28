import { chromium } from 'playwright';
import fs from 'node:fs/promises';

await fs.mkdir('tmp/captures', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
for (const [name, url] of [
  ['jobscout-dashboard', 'http://127.0.0.1:4176/#dashboard'],
  ['jobscout-pipeline', 'http://127.0.0.1:4176/#pipeline'],
  ['leadpilot-current', 'http://127.0.0.1:4175/dashboard'],
]) {
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  console.log(name, await page.title(), page.url());
  console.log((await page.locator('body').innerText()).slice(0, 700));
  await page.screenshot({ path: `tmp/captures/${name}.png` });
}
await browser.close();
