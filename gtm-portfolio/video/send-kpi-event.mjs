// Sendet ein signiertes Live-KPI-Event an den lokalen n8n-Workflow
// „LeadPilot Live KPI Ingest Pipeline (Gate G18)“ – für Szene 7 des Videos.
//
// Aufruf (Secret aus dem Passwortmanager, nur in dieser Shell):
//   read -s LEADPILOT_INGEST_SECRET && export LEADPILOT_INGEST_SECRET
//   node send-kpi-event.mjs          # Test-URL, n8n-Editor muss auf „Execute workflow“ warten
//   node send-kpi-event.mjs --prod   # Produktions-URL, Workflow muss aktiv sein
import crypto from 'node:crypto';

const secret = process.env.LEADPILOT_INGEST_SECRET;
if (!secret) {
  console.error('LEADPILOT_INGEST_SECRET fehlt (siehe Kopfkommentar).');
  process.exit(1);
}

const base = 'http://localhost:5678';
const url = `${base}/${process.argv.includes('--prod') ? 'webhook' : 'webhook-test'}/live-kpi-ingest`;
const now = new Date().toISOString();
const eventId = `video-szene7-${Date.now()}`;

const body = JSON.stringify({
  contractVersion: '1.0',
  provenance: 'live',
  eventId,
  kpiId: 'arr',
  value: 411840,
  unit: 'EUR',
  occurredAt: now,
  sourceSystem: 'leadpilot-demo',
  qualityStatus: 'valid',
  correlationId: eventId,
  context: {},
});

const nonce = crypto.randomUUID();
const signature = crypto.createHmac('sha256', secret).update(`${now}.${nonce}.${body}`).digest('hex');

const res = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-LeadPilot-Timestamp': now,
    'X-LeadPilot-Nonce': nonce,
    'X-LeadPilot-Signature': signature,
  },
  body,
});

console.log(res.status, await res.text());
