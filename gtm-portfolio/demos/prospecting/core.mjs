export const CRITERIA = [
  { id: 'region', label: 'DACH-Region', max: 15 },
  { id: 'size', label: '10–250 Beschäftigte', max: 20 },
  { id: 'role', label: 'Entscheidungsnahe Vertriebsrolle', max: 20 },
  { id: 'crm', label: 'Tabellen oder manuelle CRM-Pflege', max: 15 },
  { id: 'pain', label: 'Benannter Prozessbedarf', max: 20 },
  { id: 'b2b', label: 'B2B-Geschäftsmodell', max: 10 },
];

export function scoreProfile(profile) {
  const reject = reason => ({ eligible: false, score: 0, createOpener: false, criteria: [], reason });
  if (!profile || typeof profile !== 'object' || Array.isArray(profile)) return reject('Profil unvollständig.');
  if (!['id', 'company', 'role', 'country', 'crm', 'pain'].every(k => typeof profile[k] === 'string' && profile[k].trim().length > 0)) return reject('Pflichtangaben fehlen.');
  if (typeof profile.b2b !== 'boolean' || !Number.isInteger(profile.employees) || profile.employees < 1) return reject('Ungültige Datentypen.');
  if (!['DE', 'AT', 'CH'].includes(profile.country) || !profile.b2b) return reject('Außerhalb des gewählten B2B-Zielmarkts DACH.');
  const points = {
    region: 15,
    size: profile.employees >= 10 && profile.employees <= 250 ? 20 : 5,
    role: /vertriebsleitung|geschäftsführung|revenue operations|sales operations|head of sales/i.test(profile.role) ? 20 : 5,
    crm: /tabellen|manuell|excel/i.test(profile.crm) ? 15 : 0,
    pain: profile.pain === 'Kein Bedarf benannt' ? 0 : 20,
    b2b: 10,
  };
  const criteria = CRITERIA.map(c => ({ ...c, points: points[c.id] }));
  const score = criteria.reduce((sum, c) => sum + c.points, 0);
  return { eligible: true, score, createOpener: score >= 75, criteria, reason: score >= 75 ? 'Für eine vertiefte Prüfung priorisiert.' : 'Unterhalb der Schwelle für einen Kontaktentwurf.' };
}

function parseStrict(input, keys) {
  try {
    const value = typeof input === 'string' ? JSON.parse(input) : input;
    if (!value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).length !== keys.length || !keys.every(k => Object.hasOwn(value, k))) return null;
    return value;
  } catch { return null; }
}

export function validateAiResponse(input) {
  const value = parseStrict(input, ['relevant', 'reason']);
  if (!value || typeof value.relevant !== 'boolean' || typeof value.reason !== 'string' || value.reason.trim().length < 5 || value.reason.length > 400) return null;
  return { relevant: value.relevant, reason: value.reason.trim() };
}

export function validateOpener(input) {
  const value = parseStrict(input, ['opener']);
  if (!value || typeof value.opener !== 'string' || value.opener.trim().length < 15 || value.opener.length > 280) return null;
  return { opener: value.opener.trim() };
}
