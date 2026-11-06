import test from 'node:test';
import assert from 'node:assert/strict';
import { createRouter, normalizeLead } from '../demos/routing/core.mjs';
import { createHubSpotCrm } from '../demos/routing/adapters.mjs';

const lead = { eventId: 'evt-1', email: ' Mara@Testfirma.example ', firstName: 'Mara', lastName: 'Beispiel', company: 'Testfirma', employees: 42, source: 'demo' };
function fixture() {
  const contacts = new Map(); const tasks = new Map(); let failTask = false;
  const crm = {
    async upsertContact(value) { contacts.set(value.email, { ...value, id: 'c-1' }); return { id: 'c-1' }; },
    async ensureTask(contactId, value) { if (failTask) throw new Error('upstream contains secret'); tasks.set(value.email, { contactId }); return { id: 't-1' }; },
  };
  return { router: createRouter({ crm, store: new Map() }), contacts, tasks, failTask: () => { failTask = true; }, recover: () => { failTask = false; } };
}
test('normalisiert E-Mail und wählt nachvollziehbar eine Zuständigkeit', () => {
  const result = normalizeLead(lead);
  assert.equal(result?.email, 'mara@testfirma.example');
  assert.equal(result?.owner, 'inside-sales');
});
test('gültiger Eingang erzeugt einen Kontakt und eine Aufgabe', async () => {
  const f = fixture(); const result = await f.router.route(lead);
  assert.equal(result?.status, 'accepted'); assert.equal(f.contacts.size, 1); assert.equal(f.tasks.size, 1);
});
test('wiederholtes Event und gleiche E-Mail mit neuer Event-ID erzeugen keine zweite Aufgabe', async () => {
  const f = fixture(); await f.router.route(lead);
  assert.equal((await f.router.route(lead))?.status, 'duplicate');
  assert.equal((await f.router.route({ ...lead, eventId: 'evt-2', email: 'mara@testfirma.example' }))?.status, 'duplicate');
  assert.equal(f.contacts.size, 1); assert.equal(f.tasks.size, 1);
});
test('parallele Duplikate werden seriell genau einmal verarbeitet', async () => {
  const f = fixture(); const result = await Promise.all(Array.from({ length: 5 }, () => f.router.route(lead)));
  assert.equal(result.filter(r => r?.status === 'accepted').length, 1); assert.equal(f.tasks.size, 1);
});
test('fehlende Pflichtangaben und falsche Datentypen landen in manueller Prüfung', async () => {
  const f = fixture();
  for (const invalid of [{ ...lead, email: '' }, { ...lead, company: '' }, { ...lead, employees: '42' }, null]) {
    assert.equal((await f.router.route(invalid))?.status, 'review');
  }
  assert.equal(f.contacts.size, 0); assert.equal(f.tasks.size, 0);
});
test('Fehler nach Kontaktanlage können ohne Doppelanlage fortgesetzt werden', async () => {
  const f = fixture(); f.failTask();
  const result = await f.router.route(lead);
  assert.equal(result?.status, 'error'); assert.equal(JSON.stringify(result).includes('secret'), false);
  f.recover(); assert.equal((await f.router.route(lead))?.status, 'accepted');
  assert.equal(f.contacts.size, 1); assert.equal(f.tasks.size, 1);
});
test('unvollständige CRM-Antworten werden nicht als Erfolg verbucht', async () => {
  for(const phase of ['contact','task']) {
    const crm = { upsertContact: async () => phase === 'contact' ? {} : {id:'c-1'}, ensureTask: async () => ({}) };
    const result = await createRouter({crm}).route(lead);
    assert.equal(result.status,'error'); assert.equal(result.retryable,false);
  }
});
test('persistierter Zustand verhindert eine zweite Aufgabe nach Neustart', async () => {
  const f=fixture();const state=new Map();
  const crm={upsertContact:async()=>({id:'c1'}),ensureTask:async()=>({id:'t1'})};
  await createRouter({crm,store:state}).route(lead);
  let calls=0;const unexpected={upsertContact:async()=>{calls++;return{id:'c2'}},ensureTask:async()=>{calls++;return{id:'t2'}}};
  const reloaded = new Map(JSON.parse(JSON.stringify([...state])));
  assert.equal((await createRouter({crm:unexpected,store:reloaded}).route(lead)).status,'duplicate');assert.equal(calls,0);
});
test('neue Event-ID einer E-Mail-Dublette bleibt für diese E-Mail reserviert', async () => {
  const f=fixture();await f.router.route(lead);
  assert.equal((await f.router.route({...lead,eventId:'evt-2'})).status,'duplicate');
  assert.equal((await f.router.route({...lead,eventId:'evt-2',email:'andere@testfirma.example'})).status,'review');
  assert.equal(f.contacts.size,1);assert.equal(f.tasks.size,1);
});
test('HubSpot-Preflight erholt sich beim nächsten Versuch nach einem Netzwerkfehler', async () => {
  let checks=0;
  const fetcher=async(url,options)=>{
    if(url.endsWith('/account-info/v3/details')){checks++;if(checks===1)throw new Error('temporary');return Response.json({portalId:42});}
    if(url.endsWith('/contacts/batch/upsert'))return Response.json({results:[{id:'c1'}]});
    if(url.endsWith('/tasks/search'))return Response.json({results:[]});
    if(url.endsWith('/tasks')&&options.method==='POST')return Response.json({id:'t1'});
    throw new Error('Unexpected request');
  };
  const crm=createHubSpotCrm({token:'unit-test-token',portalId:'42',ownerSmall:'1',ownerLarge:'2',fetcher});
  const router=createRouter({crm});
  assert.equal((await router.route(lead)).status,'error');
  assert.equal((await router.route(lead)).status,'accepted');assert.equal(checks,2);
});
test('HubSpot-Test erlaubt reservierte Beispieldomains und blockiert echte Domains vor Schreibzugriffen', async () => {
  let writes = 0;
  const fetcher = async (url, options) => {
    if (url.endsWith('/account-info/v3/details')) return Response.json({portalId:42});
    if (url.endsWith('/contacts/batch/upsert') && options.method === 'POST') { writes++; return Response.json({results:[{id:'c1'}]}); }
    throw new Error('Unexpected request');
  };
  const crm = createHubSpotCrm({token:'unit-test-token',portalId:'42',ownerSmall:'1',ownerLarge:'2',fetcher});
  for (const domain of ['example.com','example.org','example.net','testfirma.example']) {
    assert.equal((await crm.upsertContact(normalizeLead({...lead,email:'demo@'+domain}))).id,'c1');
  }
  assert.equal(writes,4);
  for (const email of ['demo@real-business.com','demo@notexample.com','demo@example.com.invalid']) {
    await assert.rejects(crm.upsertContact(normalizeLead({...lead,email})),/SYNTHETIC_DEMO_DATA_ONLY/);
  }
  await assert.rejects(crm.upsertContact(normalizeLead({...lead,email:'demo@example.com',source:'website'})),/SYNTHETIC_DEMO_DATA_ONLY/);
  assert.equal(writes,4);
});
