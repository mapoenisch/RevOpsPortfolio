export type CaseStudy = {
  slug: string; number: string; name: string; category: string; title: string; short: string; status: string;
  stack: string[]; problem: string; goal: string; decisions: { title: string; text: string }[];
  contribution: string[]; results: string[]; limits: string; learnings: string[]; sources: string[];
};

export const profile = {
  name: 'Marc Pönisch', email: 'ma.poenisch@gmail.com', city: 'Leipzig',
  linkedin: 'https://www.linkedin.com/in/marc-poenisch/',
  resume: '/downloads/Marc-Poenisch-Lebenslauf.pdf',
};

export const cases: CaseStudy[] = [
  {
    slug: 'leadpilot', number: '01', name: 'LeadPilot', category: 'CRM & Reporting',
    title: 'Vertriebsdaten brauchen Zusammenhang.',
    short: 'Ein Dashboard-CRM, das Kontakte, Unternehmen, Deals und Kennzahlen für ein fiktives B2B-Unternehmen zusammenführt.',
    status: 'Anwendung vorhanden', stack: ['React', 'TypeScript', 'Vite', 'Supabase', 'PostgreSQL'],
    problem: 'Eine Liste mit Kontakten und ein Dashboard mit Zahlen ergeben noch keinen verständlichen Vertriebsprozess. Mich interessiert, wie Kunden, Verkaufschancen und Kennzahlen zusammenhängen – und wie die Herkunft der Daten erkennbar bleibt.',
    goal: 'Ein zusammenhängendes CRM- und Reporting-System für das fiktive Unternehmen LeadPilot entwickeln. Die Anwendung soll Daten gezielt zugänglich machen und historische Werte, Simulation und aktuelle Kennzahlen auseinanderhalten.',
    decisions: [
      { title: 'Den Vertriebsalltag strukturieren', text: 'Kontakte, Unternehmen und Deals haben eigene Ansichten. Suche, Filter, Sortierung und CSV-Export machen Datensätze gezielt zugänglich.' },
      { title: 'Die Herkunft sichtbar halten', text: 'Historische Ausgangsdaten, reproduzierbare Simulation und Live-Kennzahlen werden getrennt behandelt. Ein eingefrorener HubSpot-Import ist als solcher gekennzeichnet.' },
      { title: 'Die Architektur nachvollziehbar machen', text: 'Die Oberfläche basiert auf React und TypeScript. Supabase übernimmt Anmeldung, mandantengebundenen Datenzugriff und Datenhaltung. Anforderungen und Entscheidungen sind dokumentiert.' },
    ],
    contribution: ['Die fachlichen Anforderungen und gewünschten Vertriebsansichten festlegen.', 'Bedarf aus dem Vertriebsalltag in konkrete Entwicklungsaufträge übersetzen.', 'Mit KI entwickeln, Ergebnisse prüfen und die Anwendung schrittweise weiterführen.'],
    results: ['CRM-Ansichten für Kontakte, Unternehmen und Deals sind im Quellprojekt vorhanden.', 'Dashboard, Datenquellen und Quellenstatus sind in der Anwendung umgesetzt.', 'n8n-Workflows für Baseline-Import und Live-Kennzahlen liegen vor. Ihr Vorhandensein belegt keinen aktuellen externen Testlauf.'],
    limits: 'LeadPilot ist ein fiktives Unternehmen und ein Lern- und Entwicklungsprojekt. Die CRM-Aufnahmen stammen aus einer regulären Nur-Lesen-Sitzung mit synthetischen Seed-Daten. Das App-Label „Echte Daten“ bezeichnet den Datenbankzugriff, keine produktiven Kunden. Unternehmenszahlen sind keine persönlichen Vertriebserfolge. Eine produktive HubSpot-Anbindung oder automatische Next-Best-Action-Engine wird hier nicht behauptet.',
    learnings: ['Eine Kennzahl ist erst nützlich, wenn Definition und Datenquelle klar sind.', 'Eine gute CRM-Oberfläche braucht ein konsistentes Datenmodell.', 'KI unterstützt die Umsetzung. Fachliche Entscheidungen und die Prüfung der Ergebnisse bleiben meine Aufgabe.'],
    sources: ['README.md und ARCHITECTURE_DECISIONS.md im LeadPilot-Quellprojekt', 'src/features/crm/pages/LeadsPage.tsx und DealsPage.tsx', 'src/services/data/sources/hubSpotBaselineSource.ts', 'tools/n8n/README.md und die zugehörigen Workflow-Dateien'],
  },
  {
    slug: 'lead-routing', number: '02', name: 'Anfragen sauber übergeben', category: 'Automation & CRM-Hygiene',
    title: 'Vom Eingang zum nächsten Schritt.',
    short: 'Ein eigenständiger Routing-Prototyp: Anfragen prüfen, vereinheitlichen, Dubletten erkennen und eine Folgeaufgabe vorbereiten.',
    status: 'n8n & HubSpot geprüft', stack: ['JavaScript', 'n8n', 'HubSpot API', 'Node.js'],
    problem: 'Eine neue Anfrage ist noch kein bearbeitbarer Lead. Fehlende Angaben, unterschiedliche Schreibweisen und doppelte Eingänge erschweren die Übergabe an den Vertrieb.',
    goal: 'Einen begrenzten, prüfbaren Ablauf für das LeadPilot-Szenario bauen: Eine vollständige Anfrage erhält eine Zuständigkeit und genau eine Folgeaufgabe. Unklare Fälle gehen in die manuelle Prüfung.',
    decisions: [
      { title: 'Vor dem Schreiben prüfen', text: 'E-Mail-Adresse, Unternehmen und Unternehmensgröße werden geprüft. Die E-Mail-Adresse wird vereinheitlicht. In der Demo gelangen ausschließlich erfundene Testanfragen in den Ablauf.' },
      { title: 'Wiederholungen abfangen', text: 'Event-ID und normalisierte E-Mail-Adresse verhindern eine doppelte Bearbeitung. Bereits angelegte Kontakte werden bei einem erneuten Versuch weiterverwendet.' },
      { title: 'Zuständigkeiten begründen', text: 'Die Demo verwendet eine einfache Regel: unter 50 Beschäftigten Inside Sales, ab 50 Account Management. Das ist eine bewusst gewählte Testregel, keine allgemeine Vertriebsempfehlung.' },
    ],
    contribution: ['Den fachlichen Übergabeprozess und die Pflichtangaben definieren.', 'Mit KI einen separaten Prototyp mit nachvollziehbarer Zuständigkeitsregel entwickeln.', 'Gültige Eingänge, Duplikate, unvollständige Angaben und Fehler systematisch prüfen.'],
    results: ['Die lokale Verarbeitung ist mit wiederholten und parallelen Eingängen getestet.', 'Zwei synthetische Anfragen wurden über n8n und das Gateway im HubSpot-Testkonto verarbeitet. Nach Wiederholungen blieben je ein Kontakt und eine verknüpfte Aufgabe erhalten.', 'Beide Testwege wurden Marc Pönisch zugeordnet. Fehlende Pflichtangaben gehen in die manuelle Prüfung. Der Webhook weist Anfragen ohne Zugangsschlüssel ab.'],
    limits: 'Die interaktive Arbeitsprobe und die Videoaufnahme zeigen ein lokal simuliertes CRM. Der externe HubSpot-Lauf ist separat dokumentiert. Beide Testwege verwenden denselben Owner; die Verteilung an zwei verschiedene Personen wurde nicht geprüft. Es gibt keine gemessene Zeitersparnis im Kundeneinsatz.',
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
    contribution: ['Zielmarkt, Bewertungskriterien und Schwelle für eine vertiefte Prüfung festlegen.', 'Mit KI Testdaten, Auswertung und Validierung entwickeln.', 'Regelbewertung und Modellantworten getrennt prüfen und Grenzen dokumentieren.'],
    results: ['Ein festes Set aus 50 vollständig erfundenen Profilen kann erneut ausgewertet werden.', 'Jede Punktzahl lässt sich auf sechs Einzelkriterien zurückführen.', 'Der herunterladbare Laufbericht zeigt den tatsächlichen Stand der lokalen KI-Verarbeitung. Ein Cloud-Schritt wird nur nach expliziter Konfiguration genutzt.'],
    limits: 'Die Daten sind synthetisch. Es werden keine LinkedIn-Profile abgerufen und keine Nachrichten versandt. Die Bewertung ist eine Priorisierungsregel, keine Prognose für Kaufwahrscheinlichkeit oder Vertriebserfolg. Strukturell gültige KI-Ausgaben benötigen weiterhin eine fachliche Prüfung.',
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
