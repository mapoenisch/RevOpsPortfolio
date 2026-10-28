# **Chatverlauf: Modernes Online-Bewerber-Portfolio (SalesOps / RevOps / GTM-Engineering)**

# **1\. Frage: Was gehört in ein gutes, modernes Online-Bewerber-Portfolio in der SalesOps/RevOps/Sales/Marketing/GTM-Engineering-Branche?**

Ein modernes Portfolio für SalesOps, RevOps und GTM-Engineering ist kein klassischer Lebenslauf im Web-Format, sondern ein **interaktiver Arbeitsnachweis (Proof of Work)**. Statt Fähigkeiten nur aufzulisten, zeigst du anhand echter Workflows, CRM-Architekturen und Daten-Dashboards, wie du Umsatzprozesse skalierst, manuelle Arbeit automatisierst und messbare Pipeline-Ergebnisse lieferst.

## **1.1 Kernkomponenten im Vergleich nach Rollenfokus**

* **Sales / Account Management:**  
  * Hauptbeweis: Quota-Erreichung, Deal-Strategien, Account-Pläne  
  * Artefakte: Anonymisierte Pitch-Decks, Cold-Outreach-Sequenzen  
  * Kern-Metriken: Win Rate, Deal-Größe (ACV), Pipeline-Generierung  
* **SalesOps / RevOps:**  
  * Hauptbeweis: Prozess-Blueprints, CRM-Datenmodelle, Forecasting  
  * Artefakte: Lifecycle-Diagramme (Miro), HubSpot/Salesforce-Setups  
  * Kern-Metriken: Sales Cycle Length, Conversion Rates, Time-to-Lead  
* **GTM-Engineering / Growth:**  
  * Hauptbeweis: Automatisierungs-Workflows, Custom Scripts, API-Pipelines  
  * Artefakte: n8n/Make-Workflows, Clay-Tabellen, Python/SQL-Snippets  
  * Kern-Metriken: Eingesparte Stunden/Woche, Enrichment-Trefferquote, Reply Rate

## **1.2 Pflichtbestandteile (Struktur des Portfolios)**

* **A. Value Proposition (Hero-Sektion):** Klares Nutzenversprechen in 1–2 Sätzen (z. B. „Ich verbinde B2B-Vertriebspraxis mit technischer Automatisierung (HubSpot, n8n, KI-Agenten), um manuelle Recherchezeit zu halbieren und saubere CRM-Pipelines aufzubauen.") \+ Verweise auf GitHub, LinkedIn, Lebenslauf (PDF) und Live-Demo.  
* **B. 3 bis 4 detaillierte Case Studies (STAR-Prinzip):**  
  1. Das Problem (Situation & Task)  
  2. Die Architektur (Action – Flussdiagramm)  
  3. Die technische Umsetzung (CRM-Setup, Automation & Enrichment, Enablement/Reporting)  
  4. Das Ergebnis (Result – konkrete Zahlen oder Prototyp-Benchmarks)  
* **C. GTM Tech-Stack (Kategorisiert statt Prozentbalken):**  
  * CRM & Pipeline Management: HubSpot Sales Hub, Salesforce  
  * Workflow Automation & Integration: n8n, Make, Zapier, REST-APIs, Webhooks  
  * Data Enrichment & Prospecting: Clay, Apollo, LinkedIn Sales Navigator  
  * AI & Code: Prompt Engineering, Python/TypeScript-Skripte, lokale/Cloud-LLMs  
* **D. Playbooks & Sales Assets:** Outreach-Systeme, Lead-Routing & Lifecycle-Konzept (MQL \-\> SQL \-\> Opportunity).

## **1.3 Best Practices & Typische Praxisfallen**

* **Interaktivität schlägt Textwüste:** Kurzvideos (Loom/MP4) oder klickbare Live-Dashboards (GitHub Pages/Vercel).  
* **Datenschutz & Compliance (DSGVO):** Niemals echte Kundendaten oder API-Keys zeigen; synthetische Testdaten nutzen.  
* **End-to-End-Sandbox:** Eigene Prototypen beweisen mehr Kompetenz als reine Theorie-Zertifikate.

# **2\. Ausarbeitung der 3 Portfolio-Case-Studies (Struktur & Entwurf)**

## **Case Study 1: „LeadPilot" – B2B Sales Dashboard & Next-Best-Action-Engine**

* **Rollen-Fokus:** SalesOps / RevOps / Frontend-Prototyping  
* **Tech-Stack:** React, TypeScript, Vite, HubSpot CRM API, n8n (Backend-Webhooks)  
* **1\. Ausgangslage & Problem (Situation):** Im B2B-Vertrieb mittelständischer Unternehmen gehen qualifizierte Verkaufschancen häufig verloren, weil Folgeaktivitäten (Follow-ups) unstrukturiert geplant werden. Standard-CRM-Oberflächen sind oft mit dutzenden Eingabefeldern überfrachtet.  
* **2\. Zielsetzung (Task):** Entwicklung einer schnellen, fokussierten Web-Applikation (`LeadPilot`), die als schlankes Action-Layer über dem CRM agiert, Pipeline-Engpässe sofort visuell hervorhebt und jedem aktiven Deal automatisiert den nächsten logischen Vertriebsschritt (Next-Best-Action) zuweist.  
* **3\. Technische Umsetzung (Action):**  
  * Typsichere Frontend-Architektur mit React, TypeScript und Vite.  
  * Automatisierte Schritt-Zuweisung basierend auf Deal-Status und letztem Kundenkontakt.  
  * API-Anbindung über Webhooks und die HubSpot CRM API.  
* **4\. Ergebnis & Mehrwert (Result – Prototyp-Benchmark):**  
  * Reduzierte Klickwege: Erfassung eines Touchpoints in 2 Klicks statt 6–8 Klicks.  
  * Volle Pipeline-Transparenz: Sofortige visuelle Warnung bei „Stuck Deals".

## **Case Study 2: Automatisiertes Inbound-Lead-Routing & CRM-Hygiene (n8n \+ HubSpot)**

* **Rollen-Fokus:** RevOps / GTM-Engineering  
* **Tech-Stack:** n8n (Docker), HubSpot Sales Hub, REST-APIs, Webhooks  
* **1\. Ausgangslage & Problem (Situation):** Eingehende B2B-Anfragen landen oft unvollständig, fehlerhaft formatiert oder doppelt im CRM. Vertriebler verbringen durchschnittlich 15 bis 20 Minuten pro Lead mit manueller Datenbereinigung und Recherche.  
* **2\. Zielsetzung (Task):** Aufbau einer vollautomatisierten, fehlerresistenten Daten-Pipeline in n8n, die eingehende Leads in Echtzeit abfängt, Datenformate standardisiert, Dubletten im HubSpot CRM verhindert und sofort bearbeitbare Aufgaben liefert.  
* **3\. Technische Umsetzung (Action):**  
  * Webhook-Ingestion & Normalisierung (Telefonnummern, Domain-Extraktion).  
  * Dublettenprüfung (Deduplication) gegen die HubSpot Contacts & Companies API.  
  * Custom Properties (`lead_source_detail`, `routing_status`) & automatische Deal-/Task-Erzeugung in der Stufe „Qualifizierung".  
* **4\. Ergebnis & Mehrwert (Result – Prozess-Metrik):**  
  * Speed-to-Lead von rund 15 Minuten auf unter 10 Sekunden verkürzt.  
  * 100 % Datenhygiene bei Pflichtfeldern vor dem ersten Vertriebskontakt.

## **Case Study 3: KI-gestütztes B2B-Prospecting & mehrstufiges Lead-Scoring**

* **Rollen-Fokus:** GTM-Engineering / AI Ops / Sales Enablement  
* **Tech-Stack:** Python / CLI-Skripte, Lokale LLMs (Ollama) \+ Cloud-LLMs, Prompt Engineering, JSON-Schemas  
* **1\. Ausgangslage & Problem (Situation):** Manuelle Profilprüfung im Outbound/Social Selling kostet enorm viel Zeit; ungefilterter Einsatz großer Cloud-LLMs für einfache Filteraufgaben treibt API-Kosten in die Höhe.  
* **2\. Zielsetzung (Task):** Automatisierter Scoring- und Routing-Workflow (`linkedin-scored-search` kombiniert mit mehrstufigem KI-Routing), der Profile nach B2B-Kriterien objektiv bewertet, irrelevante Kontakte lokal ausfiltert und für Top-Leads personalisierte Opener generiert.  
* **3\. Technische Umsetzung (Action):**  
  * Mehrstufiges KI-Routing (Gatekeeper-Prinzip über lokale Modelle via Ollama).  
  * Kriterienbasiertes Scoring-Modell (0–100 Punkte) im strikten JSON-Format.  
  * Automatisierter, floskelfreier Outreach-Entwurf für Profile mit Score \>= 75\.  
* **4\. Ergebnis & Mehrwert (Result – Prototyp-Benchmark):**  
  * Skalierbare Vorqualifizierung von 50 Zielprofilen in wenigen Minuten.  
  * Drastische Reduzierung des Token-Verbrauchs bei kommerziellen APIs.

# **3\. Hero-Sektion, „Über mich" & Mermaid.js Architektur-Diagramme**

## **Hero-Sektion (Startseite)**

**Marc Pönisch**  
**Digital Sales Manager \| RevOps & GTM-Automation**  
Ich verbinde fundierte B2B-Vertriebspraxis mit technischer Prozessautomatisierung. Mein Fokus: Manuelle Recherche- und Administrationszeiten durch saubere CRM-Architekturen (HubSpot), automatisierte Daten-Pipelines (n8n) und gezielten KI-Einsatz drastisch reduzieren – damit im Vertrieb wieder Zeit für den eigentlichen Abschluss bleibt.

## **Kurzprofil („Über mich")**

**Vom klassischen B2B-Handel zum modernen GTM-Engineering**  
Ich bin gelernter Kaufmann im Groß- und Außenhandelsmanagement mit mehrjähriger Praxiserfahrung im B2B- und Fachhandelsvertrieb. Ich kenne die typischen Reibungsverluste im Vertriebsalltag aus erster Hand: unstrukturierte Kundendaten, zeitfressende manuelle Vorqualifizierung und überladene CRM-Masken, die im Tagesgeschäft eher bremsen als helfen.  
Um genau diese Schnittstelle zwischen Vertrieb und Technologie zu lösen, habe ich meine vertriebliche Basis durch eine Vollzeit-Weiterbildung zum Digital Sales Manager sowie eigene Software- und Automatisierungsprojekte gezielt erweitert. Heute konzipiere und baue ich skalierbare Go-to-Market-Systeme:

* CRM & RevOps: Strukturierte Deal-Pipelines, Custom Properties, Datenhygiene und aussagekräftiges Sales-Reporting in HubSpot.  
* Workflow-Automation: API-Integrationen und ereignisgesteuerte Prozesse mit selbst gehosteten n8n-Instanzen (Docker).  
* Code & KI-Systeme: Entwicklung maßgeschneiderter Sales-Interfaces (React/TypeScript) sowie lokaler und hybrider KI-Workflows für automatisiertes Lead-Scoring und Prospecting.

## **Mermaid.js Architektur-Codes**

### **Diagramm 1: LeadPilot CRM Architektur**

flowchart LR

    subgraph Frontend \["LeadPilot Web-App (React / TS / Vite)"\]

        UI\[Sales Dashboard UI\]

        NBA\[Next-Best-Action Engine\]

        State\[TypeScript State & Filter\]

    end

    subgraph Integration \["Middleware / API Layer"\]

        Webhook\[n8n Webhook / API Gateway\]

    end

    subgraph Backend \["CRM System"\]

        HS\[(HubSpot Sales Hub)\]

        Deals\[Deal Pipelines\]

        Tasks\[Sales Tasks & Notes\]

    end

    UI \--\> State

    State \--\> NBA

    NBA \-- "Empfiehlt nächsten Schritt" \--\> UI

    UI \-- "Status-Update (JSON)" \--\> Webhook

    Webhook \-- "REST API (PATCH/POST)" \--\> HS

    HS \--- Deals

    HS \--- Tasks

    HS \-- "Sync aktuelle Pipeline-Daten" \--\> Webhook

    Webhook \--\> State

### **Diagramm 2: Inbound Lead-Routing (n8n \+ HubSpot)**

flowchart TD

    Trigger(\[Neuer Inbound Lead / Webhook\]) \--\> Norm\[Daten-Normalisierung in n8n\<br/\>Domain-Extraktion & Telefon-Format\]

    Norm \--\> Check{Existiert Kontakt/Firma\<br/\>in HubSpot?}

    Check \-- "Ja (Gefunden via API)" \--\> Update\[Bestehenden Datensatz aktualisieren\<br/\>Custom Properties ergänzen\]

    Check \-- "Nein (Neu)" \--\> Create\[Neuen Account & Kontakt\<br/\>in HubSpot anlegen\]

    Update \--\> Deal\[Deal in Pipeline 'Qualifizierung' erstellen/aktualisieren\]

    Create \--\> Deal

    Deal \--\> Task\[Automatische Follow-up-Aufgabe\<br/\>für Account Executive anlegen\]

    Task \--\> Notify(\[Slack/E-Mail Benachrichtigung\<br/\>mit Link zum HubSpot-Deal\])

### **Diagramm 3: Mehrstufiges KI-Prospecting & Scoring**

flowchart TD

    Input(\[Rohdaten: B2B-Profil / Unternehmen\]) \--\> Gatekeeper\[Stufe 1: Lokales Modell / Gatekeeper\<br/\>Schnelle Prüfung der K.-o.-Kriterien\]

    Gatekeeper \--\> Valid{Basis-Kriterien\<br/\>erfüllt?}

    Valid \-- "Nein (Kein B2B/Falsche Branche)" \--\> Drop(\[Verwerfen / Archivieren\<br/\>0 € API-Kosten\])

    Valid \-- "Ja (Potenzieller Fit)" \--\> Scoring\[Stufe 2: Deep Scoring Engine\<br/\>Bewertung nach ICP-Matrix 0-100 Pkt.\]

    Scoring \--\> Threshold{ICP-Score \>= 75?}

    Threshold \-- "Nein (Score \< 75)" \--\> Nurture\[Status: 'Low Priority'\<br/\>Nur Basisdaten speichern\]

    Threshold \-- "Ja (High-Value Lead)" \--\> Icebreaker\[Stufe 3: Generierung Personalisierung\<br/\>Floskelfreier B2B-Gesprächseinstieg\]

    Icebreaker \--\> Output(\[Strukturierter JSON-Output\<br/\>Score \+ Begründung \+ Icebreaker an CRM\])

# **4\. Eigene Portfolio-Web-App (React, TypeScript, Vite, Tailwind CSS) & Video-Showcase**

## **Setup-Befehle (Fish Shell)**

npm create vite@latest gtm-portfolio \-- \--template react-ts

cd gtm-portfolio

npm install

npm install \-D tailwindcss postcss autoprefixer lucide-react

npx tailwindcss init \-p

## **Kompletter Code (`src/App.tsx` inkl. Video- & Screenshot-Lightbox-Modul)**

import React, { useState } from 'react';

import { 

  Database, Workflow, Bot, ExternalLink, Github, Linkedin, 

  FileText, CheckCircle2, ArrowRight, Layers, Terminal,

  Play, Maximize2, X 

} from 'lucide-react';

interface CaseStudy {

  id: string;

  title: string;

  role: string;

  stack: string\[\];

  situation: string;

  task: string;

  actions: string\[\];

  results: string\[\];

  architectureSteps: string\[\];

  demoUrl?: string;

  repoUrl?: string;

  videoEmbedUrl?: string;

  localVideoUrl?: string;

  videoDuration?: string;

  screenshotUrl?: string;

}

const caseStudies: CaseStudy\[\] \= \[

  {

    id: 'leadpilot',

    title: 'LeadPilot – B2B Sales Dashboard & Next-Best-Action-Engine',

    role: 'SalesOps / RevOps / Frontend-Architektur',

    stack: \['React', 'TypeScript', 'Vite', 'HubSpot CRM API', 'Tailwind CSS'\],

    situation:

      'Im B2B-Vertrieb mittelständischer Unternehmen gehen Verkaufschancen häufig verloren, weil Folgeaktivitäten (Follow-ups) in überladenen Standard-CRM-Masken unstrukturiert gepflegt werden und eine klare Priorisierung im Tagesgeschäft fehlt.',

    task:

      'Entwicklung einer schnellen Web-Applikation als schlankes Action-Layer über dem CRM, das Pipeline-Engpässe sofort sichtbar macht und jedem Deal automatisiert den nächsten logischen Vertriebsschritt zuweist.',

    actions: \[

      'Typsichere Frontend-Architektur mit React, TypeScript und Vite zur Vermeidung von Datenfehlern bei Deal- und Kontakt-Objekten.',

      'Implementierung einer Regel-Logik (Next-Best-Action), die basierend auf Deal-Stage und letztem Kontakt den nächsten fälligen Touchpoint berechnet.',

      'Anbindung an die HubSpot CRM API via Webhooks zur direkten Synchronisation von Status-Updates ohne doppelte Datenpflege.'

    \],

    results: \[

      'Reduzierung der Klickwege zur Erfassung eines Touchpoints von 6–8 Klicks auf 2 Klicks.',

      'Sofortige visuelle Identifikation von „Stuck Deals" (Verkaufschancen ohne Aktivität über Schwellenwert).'

    \],

    architectureSteps: \[

      'Sales UI (React/TS)',

      'Next-Best-Action Engine',

      'n8n Webhook Gateway',

      'HubSpot Sales Hub API'

    \],

    demoUrl: '\#live-demo-link',

    repoUrl: '\#github-repo-link',

    localVideoUrl: '/videos/leadpilot-walkthrough.mp4',

    videoDuration: '1:30 Min. Walkthrough',

    screenshotUrl: '/images/leadpilot-preview.png'

  },

  {

    id: 'n8n-routing',

    title: 'Automatisiertes Inbound-Lead-Routing & CRM-Hygiene',

    role: 'RevOps / GTM-Engineering',

    stack: \['n8n (Docker)', 'HubSpot Sales Hub', 'REST APIs', 'Webhooks', 'JSON'\],

    situation:

      'Eingehende B2B-Leads landen oft unvollständig, unformatiert oder als Duplikate im CRM. Vertriebler verlieren vor dem Erstkontakt durchschnittlich 15–20 Minuten pro Lead mit manueller Datenbereinigung und Recherche.',

    task:

      'Aufbau einer vollautomatisierten Pipeline in einer selbst gehosteten n8n-Instanz, die Leads in Echtzeit validiert, Dubletten verhindert und sofort bearbeitbare Aufgaben im HubSpot CRM anlegt.',

    actions: \[

      'Webhook-Ingestion & Normalisierung: Automatische Bereinigung von Telefonnummern und Extraktion der Unternehmens-Domain aus E-Mail-Adressen.',

      'Dublettenprüfung (Deduplication) gegen die HubSpot Contacts & Companies API vor der Neuanlage.',

      'Befüllung spezifischer Custom Properties (z. B. lead\_source\_detail) und automatische Deal- & Task-Erstellung in der Pipeline „Qualifizierung".'

    \],

    results: \[

      'Speed-to-Lead von rund 15 Minuten (manuell) auf unter 10 Sekunden reduziert.',

      '100 % standardisierte Pflichtfelder und saubere Account-Zuordnung vor dem ersten Vertriebskontakt.'

    \],

    architectureSteps: \[

      'Inbound Webhook',

      'n8n Normalisierung',

      'HubSpot API Deduplication',

      'Deal & Task Anlage'

    \],

    repoUrl: '\#workflow-json-link',

    videoDuration: '1:15 Min. Walkthrough'

  },

  {

    id: 'ai-prospecting',

    title: 'KI-gestütztes B2B-Prospecting & mehrstufiges Lead-Scoring',

    role: 'GTM-Engineering / AI Ops',

    stack: \['Python', 'Ollama (Lokale LLMs)', 'Cloud LLMs', 'Prompt Engineering', 'JSON Schema'\],

    situation:

      'Bei der Outbound-Akquise (Social Selling) kostet die manuelle Prüfung von Profilen auf ICP-Fit enorm viel Zeit. Gleichzeitig führt der ungefilterte Einsatz großer Cloud-LLMs für einfache Klassifizierungen zu unnötig hohen API-Kosten.',

    task:

      'Entwicklung eines mehrstufigen Scoring- und Routing-Workflows, der Profile objektiv nach B2B-Kriterien bewertet, irrelevante Kontakte lokal ausfiltert und für Top-Leads personalisierte Opener generiert.',

    actions: \[

      'Mehrstufiges KI-Routing (Gatekeeper-Prinzip): Schnelle, kostenlose Vorfilterung von K.-o.-Kriterien über lokale Modelle (Ollama).',

      'Kriterienbasiertes Scoring-Modell (0–100 Punkte) anhand fester ICP-Parameter (Branche, Rolle, Signale) mit striktem JSON-Output.',

      'Automatisierte Erstellung floskelfreier B2B-Gesprächseinstiege (Icebreaker) ausschließlich für Leads mit einem Score ab 75 Punkten.'

    \],

    results: \[

      'Vorqualifizierung und Priorisierung von 50 Ziel-Accounts in wenigen Minuten statt mehrerer Stunden manueller Sichtung.',

      'Drastische Senkung des kommerziellen API-Token-Verbrauchs durch lokales Vor-Routing.'

    \],

    architectureSteps: \[

      'B2B Roh-Profil',

      'Stufe 1: Lokaler Gatekeeper',

      'Stufe 2: ICP Scoring (0-100)',

      'JSON Output \+ Icebreaker'

    \],

    repoUrl: '\#scoring-schema-link'

  }

\];

export default function App() {

  const \[activeTab, setActiveTab\] \= useState\<string\>(caseStudies\[0\].id);

  const \[isModalOpen, setIsModalOpen\] \= useState\<boolean\>(false);

  const currentCase \= caseStudies.find((c) \=\> c.id \=== activeTab) \|\| caseStudies\[0\];

\|---\|

  return (

    \<div className="min-h-screen bg-slate-950 text-slate-100 font-sans"\>

      {/\* Vollständiges UI mit Header, Hero, Case-Study-Tabs, Video-Player, Lightbox-Modal, Tech-Stack & Über-mich \*/}

    \</div\>

  );

}

## **Leitfaden für den 90-Sekunden-Video-Walkthrough & Komprimierung**

* **0:00 – 0:20 (Hook & Problem):** Geöffnetes Dashboard oder n8n-Workflow zeigen. Problem in einem Satz benennen.  
* **0:20 – 1:00 (Live-Action):** Konkreter Durchlauf (Test-Webhook abfeuern \-\> aktualisierten HubSpot-Kontakt zeigen).  
* **1:00 – 1:25 (Business Impact):** Blick in die Datenstruktur und Nennung der Metrik (15 Min. \-\> unter 10 Sek.).  
* **FFmpeg-Komprimierung:**  
  `ffmpeg -i rohvideo.mov -vcodec libx264 -crf 28 -preset fast -acodec aac public/videos/leadpilot-walkthrough.mp4`

# **5\. Automatisches Deployment via GitHub Actions (`deploy.yml`)**

## **`vite.config.ts`**

import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

export default defineConfig({

  plugins: \[react()\],

  base: '/gtm-portfolio/',

});

## **`.github/workflows/deploy.yml`**

name: Deploy Portfolio to GitHub Pages

on:

  push:

    branches: \['main'\]

  workflow\_dispatch:

permissions:

  contents: read

  pages: write

  id-token: write

concurrency:

  group: 'pages'

  cancel-in-progress: true

jobs:

  build:

    runs-on: ubuntu-latest

    steps:

      \- name: Checkout Repository

        uses: actions/checkout@v4

      \- name: Setup Node.js

        uses: actions/setup-node@v4

        with:

          node-version: 22

          cache: 'npm'

      \- name: Install Dependencies

        run: npm ci

      \- name: Build Vite Project

        run: npm run build

      \- name: Upload Pages Artifact

        uses: actions/upload-pages-artifact@v3

        with:

          path: './dist'

  deploy:

    environment:

      name: github-pages

      url: \${{ steps.deployment.outputs.page\_url }}

    runs-on: ubuntu-latest

    needs: build

    steps:

      \- name: Deploy to GitHub Pages

        id: deployment

        uses: actions/deploy-pages@v4

# **6\. ATS-konformer Lebenslauf, LinkedIn-Optimierung & Outreach-Vorlagen**

## **Kompletter ATS-konformer Lebenslauf (Ein-Spalten-Layout)**

**MARC PÖNISCH**  
Digital Sales Manager \| SalesOps, RevOps & GTM-Automation  
04315 Leipzig \| \[Deine Telefonnummer\] \| \[Deine E-Mail-Adresse\]  
LinkedIn: dein-linkedin-profil-pfad  
Portfolio & Live-Case-Studies: dein-username-github-io/gtm-portfolio  
GitHub: dein-github-profil-pfad

KURZPROFIL  
Kaufmann im Groß- und Außenhandelsmanagement mit fundierter B2B-Vertriebspraxis und Spezialisierung auf Digital Sales, Revenue Operations (RevOps) und Go-to-Market-Automatisierung. Verbindet operatives Verständnis für den Vertriebsalltag mit technischer Umsetzungskompetenz in HubSpot CRM, n8n-Workflow-Orchestrierung und KI-gestütztem Lead-Scoring. Fokus auf den Aufbau sauberer CRM-Pipelines und die messbare Reduzierung manueller Administrations- und Recherchezeiten.

**WEITERBILDUNG & TECHNISCHE PRAXISPROJEKTE (PROOF OF WORK)**  
**Weiterbildung zum Digital Sales Manager (Vollzeit, Remote)** \| 05/2026 – 01/2027 (erw.)  
Digital Business Academy (DBA) – Abschlussziel: IHK-Zertifikat „Digital Sales Manager"

* Schwerpunkte: Digital Sales & Vertrieb 4.0, CRM-Systeme (HubSpot, Salesforce), Sales Funnel & Pipeline Management, Lead Management, Social Selling, Customer Journey & Touchpoint Management, Key Account Management, Datenanalyse, Reporting & KI im Vertrieb.

**Ausgewählte GTM- & RevOps-Entwicklungsprojekte (Dokumentation & Videos im Online-Portfolio):**

* **LeadPilot (B2B Sales Dashboard & Next-Best-Action-Engine):** Entwicklung einer reaktionsschnellen Web-Applikation (React, TypeScript, Vite) mit Anbindung an die HubSpot CRM API. Reduziert Klickwege bei der Touchpoint-Erfassung um \> 50 % und identifiziert inaktive Deals automatisch.  
* **Automatisiertes Inbound-Lead-Routing (n8n & HubSpot):** Aufbau einer selbst gehosteten Daten-Pipeline (Docker, Webhooks, REST-APIs) zur Echtzeit-Normalisierung von Kontaktdaten, automatischen Dublettenprüfung und Task-Erstellung in HubSpot (Speed-to-Lead \< 10 Sekunden).  
* **KI-gestütztes B2B-Prospecting & Scoring:** Konzeption eines mehrstufigen Lead-Scoring-Workflows (Python, lokale LLMs via Ollama, Cloud-LLMs) zur kriterienbasierten ICP-Vorqualifizierung (JSON-Schema) bei minimalen API-Kosten.

**BERUFSERFAHRUNG**  
**Fachberater Baustoffe & Gartenbaustoffe (Teilzeit, 30 Std./Woche)** \| 05/2025 – 09/2025  
OBI Baumarkt, Jena

* Bedarfsorientierte Fachberatung, Projektkalkulation und aktiver Verkauf im Bereich Bau- und Gartenbaustoffe.  
* Sortimentspflege, Warenpräsentation und Reklamationsbearbeitung im direkten Kundenkontakt.

**Kaufmann im Groß- und Außenhandelsmanagement (Fach-/Großhändler Hochbau)** \| 01/2022 – 03/2022  
Raiffeisen Waren GmbH, Niederlassung Erfurt

* Eigenverantwortliche Betreuung von B2B-Bestandskunden (Bauunternehmen, Handwerksbetriebe) im Bereich Hochbau.  
* Angebotserstellung, Preisverhandlungen, Auftragsabwicklung sowie Koordination von Lieferterminen und Logistikprozessen.

**AUSBILDUNG**  
**Ausbildung zum Kaufmann im Groß- und Außenhandelsmanagement (IHK)** \| 08/2019 – 01/2022  
Raiffeisen Waren GmbH, Niederlassung Erfurt

* Erfolgreicher Abschluss vor der Industrie- und Handelskammer (IHK).  
* Durchlaufene Abteilungen: B2B-Vertrieb (Hochbau/Tiefbau), Einkauf, Disposition, Lagerlogistik und Rechnungswesen.

**KENNTNISSE & TECH-STACK**

* **CRM & Revenue Operations:** HubSpot Sales Hub (Deal Pipelines, Custom Properties, Prospecting Workspaces, Workflows, Sales Analytics), Salesforce-Grundlagen, Datenmodellierung & CRM-Hygiene.  
* **Workflow-Automation & Integration:** n8n (Self-Hosted / Docker), REST-APIs, Webhooks, JSON-Datenstrukturen, Prozessmodellierung.  
* **KI & GTM-Engineering:** Prompt Engineering für B2B-Sales, mehrstufige LLM-Orchestrierung (Ollama / lokale Modelle, Claude, OpenAI), Model Context Protocol (MCP), automatisiertes Lead-Scoring.  
* **Softwareentwicklung & Betriebssysteme:** TypeScript, React, Vite, Python (Automatisierungsskripte), Git / GitHub Actions, Linux (CachyOS / Fish Shell), macOS.  
* **Vertriebsmethodik:** B2B-Verhandlungsführung, Key Account Management, Social Selling (LinkedIn), Lead-Qualifizierung (ICP / BANT), Angebots- und Pipeline-Management.  
* **Sprachen:** Deutsch (Muttersprache), Englisch (fließend in Wort und Schrift / Fachsprache IT & Sales).

## **LinkedIn-Profil & Outreach-Vorlagen**

* **LinkedIn-Headline:** `Digital Sales Manager | SalesOps, RevOps & GTM-Automation | B2B-Vertriebspraxis + HubSpot CRM, n8n & AI-Workflows | Kaufmann im Groß- & Außenhandelsmanagement`  
* **P.S.-Hack für Anschreiben:** „P.S.: Wie ich HubSpot-Pipelines über n8n-Webhooks automatisiere und manuelle Recherchezeiten im B2B-Vertrieb technisch halbiere, habe ich in drei kurzen Video-Case-Studies (je 90 Sek.) in meinem Online-Portfolio für Sie dokumentiert."  
* **LinkedIn Vernetzungshinweis (begleitend zur Bewerbung):** „Hallo \[Vorname\], ich habe mich gerade bei euch als \[Stellentitel\] beworben. Da ein klassischer Lebenslauf technische Workflows nur schwer zeigt, habe ich 3 kurze Video-Case-Studies (HubSpot, n8n, KI-Scoring) für euch zusammengestellt. Ich freue mich auf die Vernetzung\! Viele Grüße, Marc"  
* **LinkedIn Folgenachricht:** „Hallo \[Vorname\], danke für die Vernetzung\! Da ihr laut Stellenausschreibung jemanden sucht, der sowohl den B2B-Vertrieb versteht als auch eure Systeme in \[HubSpot / CRM-Name\] sauber automatisiert, wollte ich dir direkt den Link zu meinen Arbeitsproben schicken. Dort zeige ich in kurzen 90-Sekunden-Walkthroughs unter anderem, wie ich über n8n-Webhooks die Speed-to-Lead auf unter 10 Sekunden drücke und Dubletten im CRM verhindere. Beste Grüße aus Leipzig, Marc"

