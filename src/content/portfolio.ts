export const profile = {
  name: "Marc Pönisch",
  city: "Leipzig",
  email: "ma.poenisch@gmail.com",
  linkedin: "https://www.linkedin.com/in/marc-poenisch/",
  github: "https://github.com/mapoenisch",
  resume: "/downloads/Marc-Poenisch-Lebenslauf.pdf",
  headline: "Vertrieb verstehen. Prozesse verbinden. Digital umsetzen.",
  introduction: "Ich komme aus dem B2B-Vertrieb und entwickle mit KI digitale Lösungen für strukturierte Abläufe. Mein nächster Schritt: CRM, Sales Operations oder Revenue Operations.",
};

export type Project = {
  slug: string;
  number: string;
  name: string;
  category: string;
  title: string;
  summary: string;
  context: string;
  image: string;
  imageAlt: string;
  color: string;
  screenshotsReady: boolean;
  tags: string[];
  repository: string;
  challenge: string;
  solution: { title: string; text: string }[];
  contribution: string[];
  evidence: string[];
  insights: string[];
  boundary: string;
  technology: string[];
  gallery: { src: string; alt: string; caption: string }[];
  sources: { label: string; url: string }[];
};

export const projects: Project[] = [
  {
    slug: "leadpilot",
    number: "01",
    name: "LeadPilot",
    category: "CRM · Reporting · Vertriebsprozesse",
    title: "Vertriebsdaten im Zusammenhang sehen.",
    summary: "Ein Dashboard-CRM für ein fiktives B2B-Unternehmen. Kunden, Kennzahlen und Abläufe werden in einer gemeinsamen Anwendung greifbar.",
    context: "Eigenes Lern- und Entwicklungsprojekt · fiktives Unternehmen",
    image: "/images/leadpilot-dashboard.webp",
    imageAlt: "Aktuelle lokale Aufnahme des LeadPilot-Dashboards",
    color: "sage",
    screenshotsReady: false,
    tags: ["CRM", "Reporting", "Prozessverständnis"],
    repository: "https://github.com/mapoenisch/leadpilot-dashboard-crm-v2",
    challenge: "Einzelne Kennzahlen erklären noch keinen Vertriebsprozess. Für das fiktive Unternehmen LeadPilot wollte ich CRM-Daten, Unternehmenssteuerung und eine Simulation in einer Anwendung zusammenführen. Entscheidend war für mich, nachvollziehbar zu machen, woher Daten kommen und wie die Ansichten zusammenhängen.",
    solution: [
      { title: "CRM strukturiert abbilden", text: "Kontakte, Unternehmen und Deals haben eigene Ansichten. Suche, Filter und Sortierung machen die Daten gezielt zugänglich." },
      { title: "Kennzahlen einordnen", text: "Das Dashboard verbindet Kennzahlen mit ihrem fachlichen Kontext. Historische Daten, Simulation und Live-Daten werden im Projekt getrennt behandelt." },
      { title: "Entwicklung nachvollziehbar halten", text: "Anforderungen, Architekturentscheidungen und Prüfungen werden im Repository dokumentiert. Die Umsetzung entsteht schrittweise mit KI-Unterstützung." },
    ],
    contribution: [
      "Die fachliche Richtung und Anforderungen an die Anwendung festlegen.",
      "Vertriebsabläufe und gewünschte Ansichten in konkrete Entwicklungsaufträge übersetzen.",
      "Die Umsetzung mit KI entwickeln, Ergebnisse prüfen und die Anwendung weiterführen.",
    ],
    evidence: ["CRM-Ansichten für Kontakte, Unternehmen und Deals im Quellcode", "Dashboard und dokumentiertes Datenmodell", "Versionierte Architektur- und Entwicklungsdokumentation"],
    insights: [
      "Ein Dashboard braucht eine klare Definition der Kennzahlen und ihrer Datenquellen.",
      "CRM ist auch eine Frage von Datenstruktur, Zuständigkeit und Nutzbarkeit.",
      "Bei KI-gestützter Entwicklung bleiben präzise Anforderungen und die Prüfung der Ergebnisse meine Aufgabe.",
    ],
    boundary: "LeadPilot ist ein fiktives Unternehmen. Die Aufnahmen stammen aus der lokal gestarteten Anwendung. Sie belegen Oberfläche und Projektstand, keine Umsätze, Kundenerfolge oder produktiven Integrationen.",
    technology: ["React", "TypeScript", "Vite", "Supabase / PostgreSQL"],
    gallery: [
      { src: "/images/leadpilot-dashboard.webp", alt: "Aktuelle Dashboard-Ansicht von LeadPilot", caption: "Dashboard · aktuelle lokale Anwendung" },
      { src: "/images/leadpilot-detail.webp", alt: "Weitere Ansicht aus der lokal gestarteten LeadPilot-Anwendung", caption: "Projektansicht · aktueller lokaler Stand" },
    ],
    sources: [
      { label: "Projektdokumentation", url: "https://github.com/mapoenisch/leadpilot-dashboard-crm-v2/blob/main/README.md" },
      { label: "CRM-Ansicht im Quellcode", url: "https://github.com/mapoenisch/leadpilot-dashboard-crm-v2/blob/main/src/features/crm/pages/LeadsPage.tsx" },
      { label: "Architekturentscheidungen", url: "https://github.com/mapoenisch/leadpilot-dashboard-crm-v2/blob/main/ARCHITECTURE_DECISIONS.md" },
    ],
  },
  {
    slug: "jobscout",
    number: "02",
    name: "JobScout",
    category: "Datenquellen · Scoring · Workflow",
    title: "Aus vielen Möglichkeiten die passenden machen.",
    summary: "Ein lokales Bewerbungs-Cockpit: Stellen bündeln, nach nachvollziehbaren Regeln bewerten und den nächsten Schritt in einer Pipeline festhalten.",
    context: "Persönliches Entwicklungsprojekt · Aufnahmen mit Demodaten",
    image: "/images/jobscout-dashboard.webp",
    imageAlt: "Frisch aufgenommenes JobScout-Dashboard mit gekennzeichneten Demodaten",
    color: "lavender",
    screenshotsReady: true,
    tags: ["Scoring", "Automatisierung", "Pipeline"],
    repository: "https://github.com/mapoenisch/JobScout-ApplicationCockpit",
    challenge: "Stellenanzeigen aus mehreren Quellen zu vergleichen und Bewerbungen nachzuhalten, führt schnell zu verstreuten Informationen. Ich wollte daraus einen geordneten Ablauf machen: finden, bewerten, priorisieren und nachfassen.",
    solution: [
      { title: "Informationen zusammenführen", text: "JobScout enthält Anbindungen an mehrere Stellenquellen. Ergebnisse werden in einem gemeinsamen Format weiterverarbeitet." },
      { title: "Prioritäten begründen", text: "Ein regelbasiertes Scoring bewertet Stellen anhand eines Profils. Kriterien wie passende Begriffe, Ausschlüsse und Arbeitsort machen die Bewertung nachvollziehbar." },
      { title: "Den nächsten Schritt festhalten", text: "Eine Bewerbungspipeline bildet Status und Follow-ups ab. Das Cockpit verbindet die Übersicht mit Profil, Unterlagen und weiteren Bewerbungsfunktionen." },
    ],
    contribution: [
      "Den eigenen Bedarf in einen konkreten Ablauf von Suche bis Nachfassen übersetzen.",
      "Die gewünschte Bewertungslogik und Bedienung mit KI entwickeln.",
      "Die Ergebnisse prüfen und das Werkzeug an den eigenen Arbeitsablauf anpassen.",
    ],
    evidence: ["Regelbasiertes Scoring in job_scout.py", "Statusverwaltung und Kennzahlen in jobscout_app.py", "Lokal gestartetes Cockpit mit Dashboard und Pipeline"],
    insights: [
      "Scoring ist nur hilfreich, wenn die Kriterien zur eigentlichen Entscheidung passen.",
      "Eine Pipeline braucht verständliche Status und einen klaren nächsten Schritt.",
      "Das Prinzip lässt sich auf Vertriebsabläufe übertragen: Informationen bündeln, priorisieren und konsequent nachhalten.",
    ],
    boundary: "Die Screenshots zeigen die echte lokale Anwendung mit eigens angelegten Demodaten. Die Beispieldaten sind keine tatsächlichen Bewerbungen oder gemessenen Erfolge. Eine Live-Abfrage der externen Stellenquellen ist damit nicht belegt.",
    technology: ["Python", "JavaScript", "SQLite", "HTTP-APIs"],
    gallery: [
      { src: "/images/jobscout-dashboard.webp", alt: "JobScout-Dashboard mit Demodaten", caption: "Dashboard · echte Anwendung, Demodaten" },
      { src: "/images/jobscout-pipeline.webp", alt: "Bewerbungspipeline in JobScout mit erfundenen Beispieldatensätzen", caption: "Pipeline · Status und nächste Schritte" },
    ],
    sources: [
      { label: "Projektdokumentation", url: "https://github.com/mapoenisch/JobScout-ApplicationCockpit/blob/master/README.md" },
      { label: "Scoring im Quellcode", url: "https://github.com/mapoenisch/JobScout-ApplicationCockpit/blob/master/job_scout.py" },
      { label: "Cockpit und Pipeline", url: "https://github.com/mapoenisch/JobScout-ApplicationCockpit/blob/master/jobscout_app.py" },
    ],
  },
];

export const competencies = [
  { number: "01", title: "Vertriebspraxis", text: "Kundenbedarf verstehen, Angebote erstellen und Aufträge sauber abwickeln. Mein Ausgangspunkt ist der Baustoffgroßhandel.", proof: "Beruflicher Hintergrund", href: "/#ueber-mich" },
  { number: "02", title: "CRM & Prozesse", text: "Daten, Status und Zuständigkeiten zusammen denken. In LeadPilot setze ich mich mit der Struktur hinter einer CRM-Oberfläche auseinander.", proof: "Projekt LeadPilot", href: "/projekte/leadpilot/" },
  { number: "03", title: "Daten & Priorisierung", text: "Informationen bündeln und Regeln nachvollziehbar machen. JobScout zeigt das an einer Bewertung mit anschließender Pipeline.", proof: "Projekt JobScout", href: "/projekte/jobscout/" },
  { number: "04", title: "Umsetzung mit KI", text: "Anforderungen formulieren, mit KI entwickeln und Ergebnisse überprüfen. Die Verantwortung für die fachlichen Entscheidungen bleibt bei mir.", proof: "Mein Beitrag in den Projekten", href: "/projekte/leadpilot/#mein-beitrag" },
];

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  provider: string;
  category: string;
  kind: "Zertifizierung" | "Lernnachweis" | "Digitales Badge" | "Teilnahmebestätigung";
  date: string;
  validUntil?: string;
  file: string;
  featured?: boolean;
};
