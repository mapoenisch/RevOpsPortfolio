/** Opt-in integration test: creates two marked synthetic contacts/tasks in the configured test portal. */
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { randomBytes, createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';

if (!process.argv.includes('--write-synthetic')) throw new Error('Pass --write-synthetic to run the explicitly authorized test.');
process.loadEnvFile('.env.local');
const token = process.env.HUBSPOT_ACCESS_TOKEN;
const expectedPortal = process.env.HUBSPOT_TEST_PORTAL_ID;
const owners = [process.env.HUBSPOT_OWNER_SMALL, process.env.HUBSPOT_OWNER_LARGE];
if (!token || !expectedPortal || owners.some(id => !/^\d+$/.test(id || ''))) throw new Error('TEST_CONFIGURATION_MISSING');
const key = process.env.ROUTING_API_KEY || randomBytes(24).toString('hex');
const viaN8n = process.argv.includes('--via-n8n');
const requestUrl = viaN8n ? 'http://127.0.0.1:5678/webhook/portfolio-lead-routing' : 'http://127.0.0.1:5680/route';
const webhookKey = process.env.N8N_TEST_WEBHOOK_KEY;
if (viaN8n && !webhookKey) throw new Error('N8N_TEST_WEBHOOK_KEY_REQUIRED');
const run = new Date().toISOString().replace(/[^0-9]/g, '') + '-' + randomBytes(3).toString('hex');
const report = { checkedAt: new Date().toISOString(), scope: viaN8n ? 'n8n-webhook-gateway-hubspot' : 'gateway-hubspot', syntheticOnly: true, ownerMapping: 'Beide Testwege: Marc Pönisch', passed: false, cases: [], readbacks: [], createdContacts: 0, createdTasks: 0 };
const privateReport = { run, inputs: [], results: [] };
let gateway;
let currentCheck = 'preflight';
async function api(path, method = 'GET', body) {
  const response = await fetch('https://api.hubapi.com' + path, { method, headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' }, ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error('HUBSPOT_READBACK_HTTP_' + response.status);
  return response.json();
}
async function route(name, input, expectedStatus, expectedResult) {
  const response = await fetch(requestUrl, { method: 'POST', headers: { 'Content-Type': 'application/json', [viaN8n ? 'X-Portfolio-Test-Key' : 'X-Demo-Key']: viaN8n ? webhookKey : key }, body: JSON.stringify(input), signal: AbortSignal.timeout(45000) });
  const result = await response.json();
  privateReport.results.push({ name, httpStatus: response.status, result });
  report.cases.push({ name, httpStatus: response.status, status: result.status, passed: response.status === expectedStatus && result.status === expectedResult });
  assert.equal(response.status, expectedStatus, name + ': HTTP status');
  assert.equal(result.status, expectedResult, name + ': result');
  return result;
}
try {
  const account = await api('/account-info/v3/details');
  assert.equal(String(account.portalId), String(expectedPortal), 'Test portal');
  for (const id of new Set(owners)) {
    const owner = await api('/crm/v3/owners/' + id);
    assert.equal(owner.archived, false);
    assert.equal(owner.firstName + ' ' + owner.lastName, 'Marc Pönisch', 'Confirmed owner');
  }
  // Never attach to or stop an unrelated gateway.
  let existing = false;
  try { await fetch('http://127.0.0.1:5680/health', { signal: AbortSignal.timeout(500) }); existing = true; } catch {}
  if (existing) throw new Error('GATEWAY_ALREADY_RUNNING');
  gateway = spawn(process.execPath, ['demos/routing/server.mjs'], { env: { ...process.env, ROUTING_MODE: 'hubspot', ROUTING_API_KEY: key }, stdio: ['ignore', 'ignore', 'pipe'] });
  let startupError = false;
  gateway.stderr.on('data', () => { startupError = true; });
  let ready = false;
  for (let i = 0; i < 60; i++) {
    if (gateway.exitCode !== null) throw new Error(startupError ? 'GATEWAY_START_FAILED' : 'GATEWAY_EXITED');
    try { const r = await fetch('http://127.0.0.1:5680/health'); const h = await r.json(); if (r.ok && h.mode === 'hubspot') { ready = true; break; } } catch {}
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  assert.ok(ready, 'Own gateway ready');
  for (const [label, employees, owner] of [['small', 12, owners[0]], ['large', 120, owners[1]]]) {
    currentCheck = label + '-write-and-repeats';
    const lead = { eventId: `lp-${run}-${label}`, email: `lp-${run}-${label}@example.com`, firstName: 'Portfolio', lastName: 'Synthetischer Test', company: `[LP-DEMO] Testfirma ${label}`, employees, source: 'demo' };
    privateReport.inputs.push(lead);
    const created = await route(label + '-valid', lead, 201, 'accepted');
    report.createdContacts++;
    report.createdTasks++;
    assert.equal(created.owner, label === 'small' ? 'inside-sales' : 'account-management');
    const duplicate = await route(label + '-repeat', lead, 200, 'duplicate');
    const normalized = await route(label + '-normalized-repeat', { ...lead, eventId: lead.eventId + '-repeat', email: '  ' + lead.email.toUpperCase() + '  ' }, 200, 'duplicate');
    for (const repeated of [duplicate, normalized]) {
      assert.equal(repeated.contactId, created.contactId);
      assert.equal(repeated.taskId, created.taskId);
    }
    currentCheck = label + '-direct-readback';
    const contact = await api(`/crm/v3/objects/contacts/${created.contactId}?properties=email,hubspot_owner_id`);
    let task;
    for (let i = 0; i < 20; i++) {
      task = await api(`/crm/v3/objects/tasks/${created.taskId}?properties=hs_task_subject,hubspot_owner_id&associations=contacts`);
      if (task.associations?.contacts?.results.some(item => String(item.id) === String(created.contactId))) break;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    assert.equal(contact.properties.email, lead.email);
    assert.equal(contact.properties.hubspot_owner_id, owner);
    assert.equal(task.properties.hubspot_owner_id, owner);
    assert.ok(task.associations?.contacts?.results.some(item => String(item.id) === String(created.contactId)), 'Task associated with contact');
    // Search index is eventually consistent; bounded retries verify exact counts.
    const marker = createHash('sha256').update(lead.email).digest('hex').slice(0, 12);
    let contactCount = 0, taskCount = 0;
    currentCheck = label + '-search-index-counts';
    for (let i = 0; i < 30; i++) {
      const contacts = await api('/crm/v3/objects/contacts/search', 'POST', { filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: lead.email }] }], limit: 10 });
      const tasks = await api('/crm/v3/objects/tasks/search', 'POST', { filterGroups: [{ filters: [{ propertyName: 'hs_task_subject', operator: 'EQ', value: `[LP-DEMO ${marker}] Anfrage qualifizieren` }] }], limit: 10 });
      contactCount = contacts.total; taskCount = tasks.total;
      if (contactCount === 1 && taskCount === 1) break;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    report.readbacks.push({ route: label, ownerMatches: true, taskAssociated: true, contactCount, taskCount });
    assert.equal(contactCount, 1, 'Exactly one contact');
    assert.equal(taskCount, 1, 'Exactly one task');
  }
  const missing = { ...privateReport.inputs[0], eventId: `lp-${run}-missing`, email: `lp-${run}-missing@example.com`, company: '' };
  currentCheck = 'missing-required-field';
  await route('missing-required-field', missing, 422, 'review');
  report.passed = true;
} catch (error) {
  report.failure = error.code || (String(error.message).match(/^[A-Z_0-9]+$/) ? error.message : 'INTEGRATION_ASSERTION_FAILED');
  report.failedCheck = currentCheck;
  process.exitCode = 1;
} finally {
  if (gateway && gateway.exitCode === null) { gateway.kill('SIGTERM'); await new Promise(resolve => gateway.once('exit', resolve)); }
  await mkdir('evidence/private', { recursive: true });
  await writeFile(`evidence/private/hubspot-${run}.json`, JSON.stringify(privateReport, null, 2), { mode: 0o600 });
  await writeFile(`evidence/hubspot-${viaN8n ? 'n8n-' : ''}results.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}
