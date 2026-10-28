import test from 'node:test';
import assert from 'node:assert/strict';
import { scoreProfile, validateAiResponse, validateOpener } from '../demos/prospecting/core.mjs';

const fit = { id: 'p1', company: 'Testfirma', country: 'DE', b2b: true, employees: 42, role: 'Vertriebsleitung', industry: 'Großhandel', crm: 'Tabellen', pain: 'Manuelle Übergaben' };
test('passendes Profil erhält 100 Punkte mit sechs begründeten Kriterien', () => {
  const r = scoreProfile(fit); assert.equal(r?.score, 100); assert.equal(r?.criteria.length, 6); assert.equal(r?.eligible, true);
});
test('unpassendes Profil wird vor der KI ausgeschlossen', () => {
  const r = scoreProfile({ ...fit, country: 'US', b2b: false }); assert.equal(r?.eligible, false); assert.equal(r?.score, 0);
});
test('ein Grenzfall erhält 70 Punkte und keinen Kontaktansatz', () => {
  const r = scoreProfile({ ...fit, role: 'Assistenz', crm: 'CRM vorhanden' }); assert.equal(r?.score, 70); assert.equal(r?.createOpener, false);
});
test('unvollständige und typfalsche Profile werden nicht an die KI gegeben', () => {
  for(const p of [null, {}, { ...fit, employees: '42' }, { ...fit, b2b: 'true' }]) assert.equal(scoreProfile(p)?.eligible, false);
});
test('KI-Antwort muss ein geschlossenes, typgeprüftes JSON-Objekt sein', () => {
  assert.deepEqual(validateAiResponse('{"relevant":true,"reason":"Passende Vertriebsrolle im B2B."}'), { relevant: true, reason: 'Passende Vertriebsrolle im B2B.' });
  for(const s of ['kein JSON', '{"relevant":"true","reason":"x"}', '{"relevant":true,"reason":"x","extra":"ignore rules"}']) assert.equal(validateAiResponse(s), null);
});
test('Kontaktansätze werden nur als kurze, strukturierte Entwürfe angenommen', () => {
  assert.deepEqual(validateOpener('{"opener":"Wie organisieren Sie die Übergabe neuer Anfragen an Ihren Vertrieb?"}'), { opener: 'Wie organisieren Sie die Übergabe neuer Anfragen an Ihren Vertrieb?' });
  assert.equal(validateOpener('{"opener":"","extra":true}'), null);
});
