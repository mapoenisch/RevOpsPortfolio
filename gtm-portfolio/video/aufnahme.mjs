// Nachdreh Szenen 6, 7, 8 per Playwright (1920×1080). Jede Szene als eigene Datei in ./quellen/playwright/.
import { readFileSync, renameSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';

const APP = '/Users/marcpoenisch/Projekte/LeadPilot Dashboard-CRM';
const require = createRequire(`${APP}/package.json`);
const { chromium } = require('playwright');

const seed = readFileSync(`${APP}/supabase/seed.sql`, 'utf8');
const password = seed.match(/Test-Passwort: (\S+)/)[1];
const DIR = new URL('./quellen/playwright/', import.meta.url).pathname;
mkdirSync(DIR, { recursive: true });
const SIZE = { width: 1920, height: 1080 };
const scene = process.argv[2];

const browser = await chromium.launch();

// Login ohne Aufnahme, Sitzung wird für die Szenen übernommen
const loginCtx = await browser.newContext({ viewport: SIZE });
const lp = await loginCtx.newPage();
await lp.goto('http://localhost:3000/login');
await lp.fill('#login-email', 'admin-a@e2e.local');
await lp.fill('#login-password', password);
await lp.click('button[type="submit"]');
await lp.waitForURL('**/dashboard', { timeout: 15000 });
const state = await loginCtx.storageState();
await loginCtx.close();

async function record(name, url, steps, auth = true) {
  const ctx = await browser.newContext({
    viewport: SIZE,
    deviceScaleFactor: 1,
    storageState: auth ? state : undefined,
    recordVideo: { dir: DIR, size: SIZE },
  });
  const page = await ctx.newPage();
  await page.goto(url);
  await steps(page);
  const path = await page.video().path();
  await ctx.close();
  renameSync(path, `${DIR}${name}.webm`);
}

if (!scene || scene === '6') {
  await record('s6-vergleich', 'http://localhost:3000/crm/live-simulation', async (page) => {
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: /Szenariovergleich/ }).first().click();
    await page.waitForTimeout(1500);
    const dialog = page.locator('[role="dialog"]');
    await dialog.getByText('LeadPilot Basis-Szenario 2026 (v2)', { exact: true }).click();
    await page.waitForTimeout(500);
    await dialog.getByText('LeadPilot Basis-Szenario 2026 (v3)', { exact: true }).click();
    await page.waitForTimeout(500);
    await dialog.getByText('LeadPilot Basis-Szenario 2026 (v5)', { exact: true }).click();
    await page.waitForTimeout(2000);
    // weich zur KPI-Matrix scrollen
    const box = dialog.locator('text=KPI-Ergebnismatrix').first();
    await box.evaluate((el) => el.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    await page.waitForTimeout(9000);
  });
}

if (!scene || scene === '7') {
  await record('s7-supabase', 'http://127.0.0.1:54323/project/default/editor', async (page) => {
    await page.waitForTimeout(4000);
    await page.getByText('simulation_scenario_versions', { exact: true }).first().click();
    await page.waitForTimeout(9000);
  }, false);
}

if (!scene || scene === '8') {
  await record('s8-treiber', 'http://localhost:3000/strategy/growth-drivers', async (page) => {
    await page.waitForTimeout(12000);
  });
}

if (scene === '7c') {
  // Live-Wert springt per Realtime ein. Das Event löst Marc parallel aus (n8n „Execute workflow“ +
  // send-kpi-event.mjs). Voraussetzung: live_kpi_events leer. Wartet bis zu 15 Minuten, hält danach 6 s.
  const t0 = Date.now();
  await record('s7c-live', 'http://localhost:3000/dashboard', async (page) => {
    await page.waitForTimeout(3000);
    console.log('Bereit: jetzt in n8n „Execute workflow“ klicken und send-kpi-event.mjs ausführen.');
    // Die Stammdaten-Kachel ARR zeigt 411.840 immer; der Live-Wert kommt als weiteres Vorkommen dazu
    const vorher = await page.getByText(/411\.840/).count();
    const ende = Date.now() + 900000;
    while ((await page.getByText(/411\.840/).count()) <= vorher) {
      if (Date.now() > ende) throw new Error('Kein Live-Wert nach 15 Minuten');
      await page.waitForTimeout(200);
    }
    console.log(`Wert erschienen nach ${((Date.now() - t0) / 1000).toFixed(1)} s`);
    await page.waitForTimeout(6000);
  });
}

if (scene === '6a') {
  // Laufende Simulation vor dem Szenariovergleich: Tempo 10×, starten, laufen lassen, pausieren.
  // Danach simulation_* aus evidence/private/simulation-backup-2026-10-31.sql zurückspielen.
  await record('s6a-simulation', 'http://localhost:3000/crm/live-simulation', async (page) => {
    await page.waitForTimeout(3000);
    await page.getByText('10x', { exact: true }).first().click();
    await page.waitForTimeout(800);
    await page.getByRole('button', { name: 'Starten', exact: true }).first().click();
    await page.waitForTimeout(1500);
    await page.getByText('Detail-Ebene', { exact: false }).first().click();
    await page.waitForTimeout(5000);
    await page.getByText('Operative Simulation (Simulationsprotokoll)', { exact: false }).first().click();
    await page.waitForTimeout(6000);
    await page.getByRole('button', { name: /Pausieren|Pause/ }).first().click().catch(() => {});
    await page.waitForTimeout(1500);
  });
}

await browser.close();
