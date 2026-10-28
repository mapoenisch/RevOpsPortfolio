// Ausschließlich erfundene Firmen und Profile. Keine Daten aus LinkedIn oder Kundensystemen.
export const profiles = Array.from({ length: 50 }, (_, index) => {
  const n = index + 1;
  return {
    id: `LP-P${String(n).padStart(3, '0')}`,
    company: `Testunternehmen ${String(n).padStart(2, '0')}`,
    country: n % 7 === 0 ? 'US' : ['DE', 'AT', 'CH'][index % 3],
    b2b: n % 6 !== 0,
    employees: [12, 42, 85, 160, 320][index % 5],
    role: ['Vertriebsleitung', 'Geschäftsführung', 'Assistenz', 'Revenue Operations', 'Einkauf'][index % 5],
    industry: ['Großhandel', 'IT-Dienstleistung', 'Maschinenbau'][index % 3],
    crm: n % 3 === 0 ? 'CRM vorhanden' : 'Tabellen und manuelle Pflege',
    pain: n % 4 === 0 ? 'Kein Bedarf benannt' : 'Manuelle Übergaben zwischen Marketing und Vertrieb',
    synthetic: true,
  };
});
