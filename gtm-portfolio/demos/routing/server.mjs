import http from 'node:http';
import { readFile, mkdir, writeFile, rename, open, unlink } from 'node:fs/promises';
import { timingSafeEqual } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { createRouter, isSyntheticEmail } from './core.mjs';
import { createLocalCrm, createHubSpotCrm } from './adapters.mjs';

const root = fileURLToPath(new URL('../../', import.meta.url));
try { process.loadEnvFile(`${root}.env.local`); } catch {}
const mode = process.env.ROUTING_MODE === 'hubspot' ? 'hubspot' : 'local';
const key = process.env.ROUTING_API_KEY;
if (!key || key.length < 24) throw new Error('Bitte ROUTING_API_KEY mit mindestens 24 Zeichen in .env.local setzen.');
const directory = `${root}.cache/routing-${mode}`;
await mkdir(directory, { recursive: true });
// Genau ein Gateway je persistiertem Zustand. Ein vorhandenes Lock wird nie automatisch entfernt.
try { await (await open(`${directory}/gateway.lock`, 'wx', 0o600)).close(); } catch { throw new Error('Gateway-Lock vorhanden. Zuerst prüfen, ob bereits ein Gateway läuft.'); }
const unlock = async () => { try { await unlink(`${directory}/gateway.lock`); } catch {} };
for(const signal of ['SIGINT', 'SIGTERM']) process.once(signal, async () => { await unlock(); process.exit(0); });
let state;
try { state = JSON.parse(await readFile(`${directory}/state.json`, 'utf8')); } catch (e) { if (e.code !== 'ENOENT') { await unlock(); throw new Error('Gespeicherter Zustand ist beschädigt; keine automatische Rücksetzung.'); } state = { contacts: {}, tasks: {}, records: [] }; }
const crm = mode === 'hubspot' ? createHubSpotCrm({ token: process.env.HUBSPOT_ACCESS_TOKEN, portalId: process.env.HUBSPOT_TEST_PORTAL_ID, ownerSmall: process.env.HUBSPOT_OWNER_SMALL, ownerLarge: process.env.HUBSPOT_OWNER_LARGE }) : createLocalCrm(state);
const store = new Map(state.records);
const save = async records => { state.records = [...records]; await writeFile(`${directory}/state.tmp`, JSON.stringify(state), { mode: 0o600 }); await rename(`${directory}/state.tmp`, `${directory}/state.json`); };
const router = createRouter({ crm, store, save });
function authorized(header) { const a = Buffer.from(typeof header === 'string' ? header : ''); const b = Buffer.from(key); return a.length === b.length && timingSafeEqual(a, b); }
const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8'); res.setHeader('Cache-Control', 'no-store');
  const reply = (status, data) => { res.writeHead(status); res.end(JSON.stringify(data)); };
  if (req.method === 'GET' && req.url === '/health') return reply(200, { mode, externalTestVerified: false });
  if (req.method !== 'POST' || req.url !== '/route') return reply(404, { error: 'NOT_FOUND' });
  if (!authorized(req.headers['x-demo-key'])) return reply(401, { error: 'UNAUTHORIZED' });
  try {
    let body = ''; for await (const chunk of req) { body += chunk; if (Buffer.byteLength(body) > 16384) return reply(413, { error: 'PAYLOAD_TOO_LARGE' }); }
    const input = JSON.parse(body);
    if (input.source !== 'demo' || !isSyntheticEmail(input.email)) return reply(422, { error: 'SYNTHETIC_DATA_ONLY' });
    const result = await router.route(input);
    reply(result.status === 'error' ? 502 : result.status === 'review' ? 422 : result.status === 'duplicate' ? 200 : 201, { mode, ...result });
  } catch { reply(400, { error: 'INVALID_REQUEST' }); }
});
server.on('error', async () => { await unlock(); process.exitCode = 1; });
server.listen(5680, '127.0.0.1', () => console.log(`Routing-Gateway: http://127.0.0.1:5680 (Modus: ${mode})`));
