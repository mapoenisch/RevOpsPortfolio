/** Isolated normal n8n setup; no existing n8n database, account or workflows are used. */
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { randomBytes, randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile, open } from 'node:fs/promises';
import { resolve } from 'node:path';

if (!process.argv.includes('--write-synthetic')) throw new Error('Pass --write-synthetic for the authorized HubSpot test.');
const runtime = resolve('.cache/n8n-runtime/node_modules/n8n/bin/n8n');
const directory = resolve('.cache/n8n-test-' + Date.now());
const base = 'http://127.0.0.1:5678';
const gatewayKey = randomBytes(24).toString('hex');
const webhookKey = randomBytes(24).toString('hex');
const password = 'Lp!9a' + randomBytes(24).toString('hex');
const report = { checkedAt: new Date().toISOString(), n8nVersion: '2.45.4', isolatedDatabase: true, normalOwnerSetup: false, authenticatedCredentialSetup: false, workflowActivated: false, webhookRejectsUnauthorized: false, integrationPassed: false, workflowDeactivated: false, serverStopped: false };
let child, workflowId, cookies;
async function rest(path, method = 'GET', body) {
  const response = await fetch(base + '/rest' + path, { method, headers: { 'Content-Type': 'application/json', ...(cookies ? { Cookie: cookies } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error('N8N_REST_' + response.status + '_' + path.split('/')[1].toUpperCase());
  const setCookies = response.headers.getSetCookie();
  if (setCookies.length) cookies = setCookies.map(value => value.split(';')[0]).join('; ');
  const json = await response.json();
  return json.data;
}
try {
  let existing = false;
  try { await fetch(base + '/healthz', { signal: AbortSignal.timeout(500) }); existing = true; } catch {}
  if (existing) throw new Error('N8N_ALREADY_RUNNING');
  await mkdir(directory, { recursive: true, mode: 0o700 });
  await writeFile(directory + '/local-test-login.json', JSON.stringify({ email: 'portfolio-local@example.com', password }, null, 2), { mode: 0o600 });
  const log = await open(directory + '/server.log', 'w', 0o600);
  child = spawn(process.execPath, [runtime, 'start'], { env: { ...process.env, N8N_USER_FOLDER: directory, N8N_LISTEN_ADDRESS: '127.0.0.1', N8N_HOST: '127.0.0.1', N8N_PORT: '5678', N8N_PROTOCOL: 'http', N8N_SECURE_COOKIE: 'false', N8N_DIAGNOSTICS_ENABLED: 'false', N8N_VERSION_NOTIFICATIONS_ENABLED: 'false', N8N_TEMPLATES_ENABLED: 'false', N8N_PERSONALIZATION_ENABLED: 'false', N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS: 'true', EXECUTIONS_DATA_SAVE_ON_SUCCESS: 'none', EXECUTIONS_DATA_SAVE_ON_ERROR: 'none' }, stdio: ['ignore', log.fd, log.fd] });
  await log.close();
  let ready = false;
  for (let i = 0; i < 180; i++) {
    if (child.exitCode !== null) throw new Error('N8N_START_FAILED');
    try { const response = await fetch(base + '/healthz/readiness'); if (response.ok) { ready = true; break; } } catch {}
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  assert.ok(ready, 'n8n readiness');
  await rest('/owner/setup', 'POST', { email: 'portfolio-local@example.com', firstName: 'Portfolio', lastName: 'Lokaler Test', password });
  assert.ok(cookies, 'Normal setup authenticated the local owner');
  report.normalOwnerSetup = true;
  const credential = (name, header, value) => rest('/credentials', 'POST', { name, type: 'httpHeaderAuth', data: { name: header, value } });
  const webhookCredential = await credential('Portfolio test webhook', 'X-Portfolio-Test-Key', webhookKey);
  const gatewayCredential = await credential('Portfolio test gateway', 'X-Demo-Key', gatewayKey);
  report.authenticatedCredentialSetup = true;
  const workflow = JSON.parse(await readFile('demos/routing/workflow.n8n.json', 'utf8'));
  for (const node of workflow.nodes) {
    if (node.type === 'n8n-nodes-base.webhook') { node.webhookId = randomUUID(); node.credentials = { httpHeaderAuth: { id: webhookCredential.id, name: webhookCredential.name } }; }
    if (node.type === 'n8n-nodes-base.httpRequest') node.credentials = { httpHeaderAuth: { id: gatewayCredential.id, name: gatewayCredential.name } };
  }
  const created = await rest('/workflows', 'POST', workflow);
  workflowId = created.id;
  await rest('/workflows/' + workflowId + '/activate', 'POST', { versionId: created.versionId, expectedChecksum: created.checksum });
  report.workflowActivated = true;
  let unauthorized;
  // Publication returns before the local webhook registration event finishes.
  for (let i = 0; i < 30; i++) {
    unauthorized = await fetch(base + '/webhook/portfolio-lead-routing', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}', signal: AbortSignal.timeout(10000) });
    if (unauthorized.status !== 404) break;
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  report.unauthorizedHttpStatus = unauthorized.status;
  assert.ok([401, 403].includes(unauthorized.status), 'Webhook requires configured header credential');
  report.webhookRejectsUnauthorized = true;
  const testLog = await open(directory + '/integration.log', 'w', 0o600);
  const test = spawn(process.execPath, ['scripts/test-hubspot.mjs', '--write-synthetic', '--via-n8n'], { env: { ...process.env, ROUTING_API_KEY: gatewayKey, N8N_TEST_WEBHOOK_KEY: webhookKey }, stdio: ['ignore', testLog.fd, testLog.fd] });
  await testLog.close();
  const exitCode = await new Promise(resolve => test.once('exit', resolve));
  report.integrationPassed = exitCode === 0;
  assert.equal(exitCode, 0, 'n8n → gateway → HubSpot');
} catch (error) {
  report.failure = error.code || (/^[A-Z_0-9]+$/.test(error.message) ? error.message : 'N8N_TEST_ASSERTION_FAILED');
  process.exitCode = 1;
} finally {
  if (workflowId && cookies && child?.exitCode === null) {
    try { await rest('/workflows/' + workflowId + '/deactivate', 'POST', {}); report.workflowDeactivated = true; } catch { report.cleanupFailed = true; process.exitCode = 1; }
  }
  if (child?.exitCode === null) { child.kill('SIGTERM'); await new Promise(resolve => child.once('exit', resolve)); report.serverStopped = true; }
  await writeFile('evidence/n8n-runtime-results.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}
