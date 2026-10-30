export type CaseStudy = {
  slug: string; number: string; name: string; category: string; title: string; short: string; status: string;
  stack: string[]; problem: string; goal: string; decisions: { title: string; text: string }[];
  contribution: string[]; results: string[]; limits: string; learnings: string[]; sources: string[];
  revenue?: RevenueAnalysis;
};

export type RevenueAnalysis = {
  intro: string; source: string;
  funnel: { stage: string; value: number; rate?: string }[];
  kpis: { label: string; value: string; target: string }[];
  findings: { title: string; text: string }[];
  bridge: { start: number; target: number; drivers: { label: string; value: number }[] };
};

export const profile = {
  name: 'Marc Pönisch', email: 'ma.poenisch@gmail.com', city: 'Leipzig',
  linkedin: 'https://www.linkedin.com/in/marc-poenisch/',
  resume: '/downloads/Marc-Poenisch-Lebenslauf.pdf',
};

export const cases: CaseStudy[] = [
  {
    slug: 'leadpilot', number: '01', name: 'LeadPilot', category: 'Revenue-Steuerung',
    title: 'Wo der Umsatz verloren geht.',
    short: 'Ein Dashboard-CRM für ein fiktives B2B-SaaS-Unternehmen: vom Funnel über die Lead-Übergabe und Unit Economics bis zur Kundenbindung.',
    status: 'Laufende Anwendung · v2.5', stack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'n8n'],
    problem: 'LeadPilot hat 66 Kunden und 411.840 € ARR – und verfehlt 2025 fast alle Ziele: zu wenig Testversionen werden zu Kunden, zu viele Kunden kündigen, und die Akquise rechnet sich zu langsam. Die Zahlen dazu liegen verstreut in Berichten. Marketing, Vertrieb und Customer Success sehen jeweils nur ihren Ausschnitt.',
    goal: 'Ein System, das alle drei Bereiche in einer Datenbasis zusammenführt: jede Funnel-Stufe mit Conversion, jede Kennzahl mit Definition und Quelle – und eine Simulation, mit der sich Hebel durchspielen lassen, bevor man sie umsetzt.',
    decisions: [
      { title: 'Den Funnel durchgängig messen', text: 'Leads, MQL, SQL, Angebote und Neukunden folgen einer einheitlichen Quotenregel: Jahreswert der Stufe geteilt durch Jahreswert der Vorstufe. So werden Engpässe vergleichbar statt gefühlt.' },
      { title: 'Die Übergabe als SLA festschreiben', text: 'Ein Lead geht ab ICP-Score 80 an den Vertrieb. Sales meldet sich innerhalb von 24 Stunden (werktags), macht mindestens drei Kontaktversuche in der ersten Woche und gibt eine Rückmeldung: SQL oder begründete Disqualifikation.' },
      { title: 'Unit Economics herleitbar machen', text: 'CAC, Deckungsbeitrag, LTV und Payback stehen mit ihrer Formel in der Anwendung. Historische Werte, Simulation und Live-Kennzahlen sind getrennt gekennzeichnet.' },
      { title: 'Customer Success mitdenken', text: 'Die Simulation hat eine eigene CS-Warteschlange und einen Health Score aus Onboarding, Support, Engagement und offenen Themen. Lange Wartezeiten senken den Score und erhöhen das Abwanderungsrisiko.' },
    ],
    contribution: ['Kennzahlen, Funnel-Logik, SLA-Regeln und Szenarioparameter fachlich definieren.', 'Das Unternehmensszenario analysieren und daraus Hebel und Prioritäten ableiten.', 'Mit KI-Coding-Agenten umsetzen, jedes Ergebnis prüfen und die Anwendung in Releases weiterentwickeln.'],
    results: ['Funnel, SLA, Kanalperformance, Unit Economics und Kundenbindung in einer Anwendung – jede Kennzahl mit Definition, Zeitraum und Quelle.', 'Eine Simulation mit Parametern für Trial-Conversion, Churn, Sales- und CS-Kapazität, Marketingbudget und Rabatt sowie einem Szenariovergleich.', 'Ein CRM mit Kontakten, Unternehmen und Deals; n8n-Workflows für historische Daten und Live-Kennzahlen.', 'Entwickelt in Releases bis v2.5 mit über 900 Commits, automatisierten Tests, Rollenrechten pro Mandant, Runbook und getestetem Rollback.'],
    limits: 'LeadPilot ist ein fiktives Unternehmen aus meiner Weiterbildung; alle Kennzahlen stammen aus meinem Szenario-Faktenblatt.',
    learnings: ['Churn ist oft ein Zielgruppenproblem, kein Produktproblem: Hier kündigen fast nur Kleinstkunden, die gar nicht ins ICP passen.', 'Der größte Hebel liegt selten bei „mehr Leads“, sondern bei Trial-Conversion und Kundenbindung.', 'Eine Kennzahl ist erst nützlich, wenn Definition und Datenquelle klar sind.'],
    sources: ['LeadPilot-Faktenblatt v1.2: SaaS-Kernmetriken, Funnel, Unit Economics und Planung 2026', 'Anwendung: Seiten Sales Funnel, SLA Marketing & Sales, Unit Economics, Kanalperformance', 'Simulation: Parameter-Registry, CS-Warteschlange mit Health Score, Szenariovergleich', 'README, Architekturentscheidungen und Release Notes bis v2.5.0'],
    revenue: {
      intro: 'Bevor ich Funktionen gebaut habe, habe ich das Szenario analysiert: Wo verliert LeadPilot Umsatz, und welcher Hebel bringt am meisten?',
      source: 'Szenariodaten Geschäftsjahr 2025 · LeadPilot-Faktenblatt v1.2',
      funnel: [
        { stage: 'Leads', value: 1776 },
        { stage: 'MQL', value: 516, rate: '29,1 %' },
        { stage: 'SQL', value: 192, rate: '37,2 %' },
        { stage: 'Angebote', value: 108, rate: '56,3 %' },
        { stage: 'Neukunden', value: 47, rate: '43,5 %' },
      ],
      kpis: [
        { label: 'ARR', value: '411.840 €', target: 'Ziel 480.000 €' },
        { label: 'Trial-to-Paid', value: '18 %', target: 'Ziel 25 %' },
        { label: 'Churn pro Monat', value: '2,8 %', target: 'Ziel < 2,0 %' },
        { label: 'NRR', value: '101 %', target: 'Ziel 105 %' },
        { label: 'LTV : CAC', value: '2,7 : 1', target: 'Ziel ≥ 3,0 : 1' },
        { label: 'CAC-Payback', value: '13 Monate', target: 'Ziel 10 Monate' },
      ],
      findings: [
        { title: 'Der Engpass ist die Testphase', text: 'Aus 264 Testversionen wurden 47 Kunden (18 %). Acht Prozentpunkte mehr bedeuten rund 21 zusätzliche Kunden und etwa 90.000 € ARR.' },
        { title: 'Churn ist ein ICP-Problem', text: 'Die 17 Kündigungen sind fast nur Kleinstkunden mit 2–3 Nutzern: Ø 129 € MRR gegenüber 520 € im Schnitt. Folge: Sie stehen jetzt als Negative-Fit im ICP.' },
        { title: 'Die Akquise rechnet sich zu langsam', text: '4.447 € Fully-Loaded CAC bei 333 € Deckungsbeitrag pro Monat ergeben 13 Monate Payback und ein LTV : CAC von 2,7 : 1.' },
      ],
      bridge: {
        start: 411840, target: 620000,
        drivers: [
          { label: 'Trial-to-Paid 18 → 26 %', value: 72000 },
          { label: 'Churn 2,8 → 1,8 %', value: 58000 },
          { label: 'Partnerprogramm', value: 34000 },
          { label: 'ICP-Schärfung (ARPA)', value: 26000 },
          { label: 'Upsell Starter → Growth', value: 18000 },
        ],
      },
    },
  },
  {
    slug: 'lead-routing', number: '02', name: 'Anfragen sauber übergeben', category: 'Automation & CRM-Hygiene',
    title: 'Vom Eingang zum nächsten Schritt.',
    short: 'Ein eigenständiger Routing-Prototyp: Anfragen prüfen, vereinheitlichen, Dubletten erkennen und eine Folgeaufgabe vorbereiten.',
    status: 'n8n & HubSpot geprüft', stack: ['JavaScript', 'n8n', 'HubSpot API', 'Node.js'],
    problem: 'Eine neue Anfrage ist noch kein bearbeitbarer Lead. Fehlende Angaben, unterschiedliche Schreibweisen und doppelte Eingänge erschweren die Übergabe an den Vertrieb.',
    goal: 'Einen begrenzten, prüfbaren Ablauf für das LeadPilot-Szenario bauen: Eine vollständige Anfrage erhält eine Zuständigkeit und genau eine Folgeaufgabe. Unklare Fälle gehen in die manuelle Prüfung.',
    decisions: [
      { title: 'Vor dem Schreiben prüfen', text: 'E-Mail-Adresse, Unternehmen und Unternehmensgröße werden geprüft, die E-Mail-Adresse wird vereinheitlicht. So gelangen nur saubere Datensätze ins CRM.' },
      { title: 'Wiederholungen abfangen', text: 'Event-ID und normalisierte E-Mail-Adresse verhindern eine doppelte Bearbeitung. Bereits angelegte Kontakte werden bei einem erneuten Versuch weiterverwendet.' },
      { title: 'Zuständigkeiten begründen', text: 'Eine klare, prüfbare Regel: unter 50 Beschäftigten Inside Sales, ab 50 Account Management. Sie lässt sich je nach Vertriebsorganisation austauschen.' },
    ],
    contribution: ['Den fachlichen Übergabeprozess und die Pflichtangaben definieren.', 'Mit KI-Coding-Agenten einen Prototyp mit nachvollziehbarer Zuständigkeitsregel bauen.', 'Gültige Eingänge, Duplikate, unvollständige Angaben und Fehler systematisch testen.'],
    results: ['Ende-zu-Ende-Test über n8n-Webhook, Gateway und HubSpot bestanden: sieben Prüffälle, beide Zuständigkeitsregeln im CRM zurückgelesen.', 'Auch bei wiederholten und parallelen Eingängen entsteht genau ein Kontakt mit genau einer Folgeaufgabe.', 'Unvollständige Anfragen landen in der manuellen Prüfung; Anfragen ohne Zugangsschlüssel weist der Webhook ab.'],
    limits: 'Die interaktive Demo nutzt ein simuliertes CRM; der HubSpot-Lauf mit synthetischen Testdaten ist im Testbericht dokumentiert.',
    learnings: ['Datenqualität beginnt vor dem ersten CRM-Schreibzugriff. HubSpot lehnt die Endung .example ab; der externe Test verwendet reservierte example.com-Adressen.', 'Ein erneuter Versuch darf keine zweite Aufgabe auslösen.', 'Bei unklarem Schreibstatus ist eine manuelle Prüfung sinnvoller als ein blinder Wiederholungsversuch.'],
    sources: ['Eigenständige Demo: demos/routing/core.mjs', 'Prüffälle: tests/routing.test.mjs', 'HubSpot-Adapter: demos/routing/adapters.mjs', 'n8n-Export: demos/routing/workflow.n8n.json', 'Externer Webhook-Test: scripts/test-n8n.mjs und evidence/hubspot-n8n-results.json'],
  },
  {
    slug: 'ki-prospecting', number: '03', name: 'Passende Profile erkennen', category: 'Priorisierung & KI',
    title: 'Eine Bewertung muss sich erklären lassen.',
    short: '50 synthetische Profile, sechs nachvollziehbare Kriterien und ein lokaler KI-Schritt für Kontext und Kontaktentwürfe.',
    status: 'Reproduzierbarer Prototyp', stack: ['JavaScript', 'Ollama', 'JSON-Schema', 'Regelbasiertes Scoring'],
    problem: 'Eine lange Kontaktliste sagt noch wenig darüber aus, welche Firmen und Rollen zum eigenen Angebot passen. Ein einzelner KI-Score wäre dabei schwer nachzuvollziehen.',
    goal: 'Für das fiktive LeadPilot-Szenario Profile nach offengelegten Kriterien priorisieren. KI soll den fachlichen Kontext erklären und für passende Profile einen sachlichen Kontaktansatz entwerfen.',
    decisions: [
      { title: 'Mit klaren Kriterien beginnen', text: 'DACH-Region, Unternehmensgröße, Rolle, CRM-Arbeitsweise, Prozessbedarf und B2B-Ausrichtung ergeben maximal 100 Punkte. Nicht passende Märkte werden vor dem Modellaufruf ausgesondert.' },
      { title: 'Regeln und KI trennen', text: 'Die Punktzahl wird regelbasiert berechnet. Ein lokales Sprachmodell liefert eine ergänzende Einschätzung. Ab 75 Punkten und positiver KI-Einschätzung entsteht ein Kontaktentwurf.' },
      { title: 'Ausgaben kontrollieren', text: 'Modellantworten müssen ein festes JSON-Schema erfüllen. Fehlerhafte Antworten werden verworfen und als Fehler dokumentiert. Jeder Entwurf bleibt ein Entwurf.' },
    ],
    contribution: ['Zielmarkt, Bewertungskriterien und Schwelle für eine vertiefte Prüfung festlegen.', 'Mit KI-Coding-Agenten Testdaten, Auswertung und Validierung bauen.', 'Regelbewertung und Modellantworten getrennt prüfen.'],
    results: ['50 Profile in einem reproduzierbaren Lauf bewertet – jederzeit erneut ausführbar.', 'Jede Punktzahl lässt sich auf sechs Einzelkriterien zurückführen.', 'Ein lokales Sprachmodell liefert Kontext und Kontaktentwürfe; der Laufbericht dokumentiert jede Antwort.'],
    limits: 'Die Profile sind synthetisch, es werden keine Nachrichten versandt. Der Score priorisiert, er prognostiziert keine Kaufwahrscheinlichkeit.',
    learnings: ['Ein Score hilft nur, wenn die Kriterien zur Entscheidung passen.', 'Ein Schema sichert das Format, nicht automatisch die fachliche Qualität.', 'Der Nutzen von KI lässt sich besser prüfen, wenn Regeln, Modellantwort und menschliche Prüfung getrennt bleiben.'],
    sources: ['Bewertungsregeln: demos/prospecting/core.mjs', '50 Testprofile: demos/prospecting/fixtures.mjs', 'Lokaler Runner: demos/prospecting/run.mjs', 'Ausgabevalidierung: tests/prospecting.test.mjs'],
  },
];

export const certificates = [
  { title: 'Sales-Software', issuer: 'HubSpot Academy', kind: 'Zertifizierung', topic: 'CRM & Vertrieb', date: '26.08.2026', until: '25.09.2027', file: 'hubspot-sales.png', text: 'Funktionen und Anwendung des Sales Hub.' },
  { title: 'Berichterstattung', issuer: 'HubSpot Academy', kind: 'Zertifizierung', topic: 'Reporting', date: '07.10.2026', until: '06.11.2027', file: 'hubspot-reporting.png', text: 'Berichte, Analysen und datenbasierte Entscheidungen.' },
  { title: 'Inbound Sales', issuer: 'HubSpot Academy', kind: 'Zertifizierung', topic: 'CRM & Vertrieb', date: '30.08.2026', until: '28.09.2028', file: 'hubspot-inbound.png', text: 'Bedarf verstehen und Gespräche strukturiert führen.' },
  { title: 'Grundwissen Business-Analyse', issuer: 'Microsoft / LinkedIn Learning', kind: 'Lernnachweis', topic: 'Prozesse', date: '07.07.2026', file: 'business-analyse.pdf', text: 'Anforderungen, Probleme und Lösungswege strukturieren.' },
  { title: 'Claude Code in Action', issuer: 'Anthropic Academy', kind: 'Lernnachweis', topic: 'KI & Umsetzung', file: 'claude-code.png', text: 'KI-Werkzeuge für die Softwareentwicklung einsetzen.' },
  { title: 'Claude 101', issuer: 'Anthropic Academy', kind: 'Lernnachweis', topic: 'KI & Umsetzung', file: 'claude-101.png', text: 'Kursabschluss zu den Grundlagen von Claude.' },
  { title: 'Claude Code 101', issuer: 'Anthropic Academy', kind: 'Lernnachweis', topic: 'KI & Umsetzung', file: 'claude-code-101.png', text: 'Kursabschluss zum Einstieg in Claude Code.' },
  { title: 'Claude Platform 101', issuer: 'Anthropic Academy', kind: 'Lernnachweis', topic: 'KI & Umsetzung', file: 'claude-platform-101.png', text: 'Kursabschluss zum Einstieg in die Claude-Plattform.' },
  { title: 'Introduction to Model Context Protocol', issuer: 'Anthropic Academy', kind: 'Lernnachweis', topic: 'KI & Umsetzung', file: 'introduction-to-mcp.png', text: 'Kursabschluss zur Einführung in das Model Context Protocol (MCP).' },
  { title: 'Model Context Protocol: Advanced Topics', issuer: 'Anthropic Academy', kind: 'Lernnachweis', topic: 'KI & Umsetzung', file: 'mcp-advanced-topics.png', text: 'Kursabschluss zu weiterführenden Themen des Model Context Protocol.' },
  { title: 'Marketing Operations / IT Administrator', issuer: 'Demandbase Academy', kind: 'Digitales Badge', topic: 'Prozesse', date: '10.10.2026', file: 'demandbase-marketing-operations.pdf', text: 'Lernnachweis zur Schnittstelle von Marketing und Systemen.' },
];
