# Drehbuch: Video „In etwa 90 Sekunden“ (Case 1, LeadPilot)

Stand: 30.10.2026 · Entwurf 1 · Ziel-Länge rund 80 s

## Rahmen

- Format: 1920×1080, 30 fps, keine Browserleiste, kein Dock, keine Klarnamen
- Aufnahme: Cap.app, Fenster-Modus, Mauszeiger sichtbar, Klick-Hervorhebung an
- Sprechtempo: etwa 2,5 Wörter pro Sekunde, also rund 200 Wörter Text insgesamt
- Zahlen: alle aus `src/content.ts` (Faktenblatt v1.2), nichts Neues erfinden
- Zooms setze ich im Schnitt, nicht in der Aufnahme. Bei der Aufnahme also ruhig und langsam klicken, an jedem Zoom-Punkt 2 s stehen bleiben.

## Szenen

| # | Zeit | Bild / Klickpfad | Zoom-Punkt | Sprechertext |
|---|------|------------------|------------|--------------|
| 1 | 0–8 s | Executive Dashboard (Startansicht nach Login) | ARR-Kachel **411.840 €** | „LeadPilot lag 2025 bei 411.840 Euro Jahresumsatz, deutlich unter Plan. Die Frage: Wo geht der Umsatz verloren?“ |
| 2 | 8–20 s | Sprung: Vertrieb & Marketing → **Sales Funnel 2025**, Konvertierungskaskade | Kaskade Leads → Neukunden (1.776 → 47) | „Im Funnel wird aus 1.776 Leads am Ende 47 Neukunden. Die Lücke liegt aber nicht am Anfang, sondern in der Testphase.“ |
| 3 | 20–30 s | Sprung: Strategie 2026+ → **Ziele & OKRs**, Objective O1 | KR 3: Trial-to-Paid **18 % → ≥ 26 %** | „Nur 18 Prozent der Testkunden zahlen. Acht Punkte mehr wären rund 21 Kunden zusätzlich.“ |
| 4 | 30–40 s | Gleiche Seite, Objective O2 | KR 1: Churn **2,8 % → ≤ 1,8 %** | „Der zweite Hebel ist Kundenbindung. Gekündigt haben fast nur Kleinstkunden. Das ist kein Service-Problem, sondern ein ICP-Problem.“ |
| 5 | 40–50 s | Sprung: Finanzen → **Unit Economics 2026** | Kennzahlen: Gesamtkosten pro Neukunde 4.447 €, LTV/CAC **2,7 : 1**, Payback 13 Monate | „Dazu rechnet sich die Akquise zu langsam: 13 Monate Payback, LTV zu CAC 2,7 zu 1.“ |
| 6 | 50–62 s | Sprung: **⚡ Live-Simulation**, Szenario Trial, dann Churn, je ein Lauf | Ergebnis **+27.990 €** und **+20.250 €** | „Beide Hebel habe ich in der Simulation gegengerechnet: 30 Tage, je ein Szenario. Trial bringt fast 28.000 Euro, Churn gut 20.000.“ |
| 7 | 62–72 s | Schnitt: Supabase Studio (Tabelle), dann n8n Live-KPI-Workflow, Ausführung läuft durch | Grüne Knoten im n8n-Workflow | „Die Zahlen kommen nicht aus einer Folie. Sie liegen in Supabase, und n8n berechnet die KPIs live.“ |
| 8 | 72–80 s | Sprung: Strategie 2026+ → **Wachstumstreiber** | Basis ARR 411.840 € und Hebel; OKR-Ziel **620.000 €** | „Daraus ergibt sich der Plan für 2026: fünf Hebel, die zwei größten nach dem ersten Kontakt.“ |

Gesprochener Text gesamt: rund 190 Wörter.

## Sprechertext am Stück (für dein Stimm-Tool)

> LeadPilot lag 2025 bei 411.840 Euro Jahresumsatz, deutlich unter Plan. Die Frage: Wo geht der Umsatz verloren?
>
> Im Funnel wird aus 1.776 Leads am Ende 47 Neukunden. Die Lücke liegt aber nicht am Anfang, sondern in der Testphase.
>
> Nur 18 Prozent der Testkunden zahlen. Acht Punkte mehr wären rund 21 Kunden zusätzlich.
>
> Der zweite Hebel ist Kundenbindung. Gekündigt haben fast nur Kleinstkunden. Das ist kein Service-Problem, sondern ein ICP-Problem.
>
> Dazu rechnet sich die Akquise zu langsam: 13 Monate Payback, LTV zu CAC 2,7 zu 1.
>
> Beide Hebel habe ich in der Simulation gegengerechnet: 30 Tage, je ein Szenario. Trial bringt fast 28.000 Euro, Churn gut 20.000.
>
> Die Zahlen kommen nicht aus einer Folie. Sie liegen in Supabase, und n8n berechnet die KPIs live.
>
> Daraus ergibt sich der Plan für 2026: fünf Hebel, die zwei größten nach dem ersten Kontakt.

## Aufnahme-Checkliste (Phase 3, Schritt 3)

- [ ] Benachrichtigungen aus (Fokus „Nicht stören“)
- [ ] Fenster exakt 1920×1080, Browser im App- oder Kiosk-Modus
- [ ] Simulation **nicht** zurücksetzen, keinen neuen Lauf starten (siehe „Stand der Umgebung“)
- [ ] Szenen einzeln aufnehmen (8 Clips), lieber zu lang als zu kurz
- [ ] Stimme als eine Datei, Satzpausen etwa 0,5 s

## Entscheidung nach Prüfung der Umgebung (30.10.2026)

- Alles wird im Dashboard-CRM aufgenommen, nicht auf der Portfolio-Seite (das Video läuft ja dort).
- Navigation in der App nur per Sprung über das Menü, kein Scrollen. Übergänge glätte ich im Schnitt.
- Zahlen in der App geprüft (`src/domain/*Data.ts`): Funnel 1.776 → 47, Trial 18 → 26 %, Churn 2,8 → 1,8 %, 4.447 € / 2,7 : 1 / 13 Monate, ARR 411.840 € → 620.000 €.
- Das ARR-Ziel 480.000 € steht nicht in der App. Szene 1 sagt deshalb „deutlich unter Plan“ statt der Zahl.
- Login ins Dashboard-CRM macht Marc selbst vor der Aufnahme (Supabase-Auth, kein Demo-Zugang).

## Vorbereitung vor der Aufnahme

- Dashboard-CRM: `npm run dev` im Repo „LeadPilot Dashboard-CRM“ (Branch `codex/leadpilot-live-demo`), läuft auf http://localhost:3000
- Supabase Studio: Tabelle ohne personenbezogene Spalten öffnen
- n8n: Live-KPI-Workflow öffnen, nach „Tidy up“ wie im Kapitel-6-Screenshot

## Stand der Umgebung (31.10.2026)

Gestartet und erreichbar:

- Docker Desktop, lokales Supabase (Projekt `LeadPilot_Dashboard-CRM`)
- Dashboard-CRM: http://localhost:3000 (Vite-Dev-Server, Commit `5f20c7c`)
- Supabase Studio: http://127.0.0.1:54323
- n8n lokal: http://localhost:5678 (Compose-Ordner `~/n8n`), Workflow „LeadPilot Live KPI Ingest Pipeline (Gate G18)“, ID `LeadPilotLiveKpiDemo`

Zahlen gegengeprüft:

- Funnel: Leads 384 + 432 + 456 + 504 = 1.776, Neukunden 10 + 11 + 12 + 14 = 47 (`vertriebData.ts`)
- Simulation: Die Werte +27.990 € und +20.250 € sind Deltas zum **Mittel der beiden Basis-Läufe** (411.840 € und 431.340 €, Mittel 421.590 €). Trial (Version 5): 449.580 €. Churn 1,8 % (Version 4): 441.840 €.
- Backup aller `simulation_*`-Tabellen: `evidence/private/simulation-backup-2026-10-31.sql` (nicht versioniert)

Folgen für die Aufnahme:

- **Keinen neuen Simulationslauf starten und die Simulation nicht zurücksetzen.** Jeder weitere Lauf hat einen neuen Zufalls-Seed und verschiebt das Mittel der Basis. Damit stimmen die Zahlen im Sprechertext nicht mehr. Szene 6 zeigt deshalb die vorhandenen Läufe; der Punkt „Simulation zurückgesetzt“ in der Checkliste entfällt.
- Der Multi-Szenario-Vergleich rechnet Deltas gegen *eine* Referenzversion, nicht gegen das Mittel. Die Deltas auf dem Bildschirm können deshalb von +27.990 € / +20.250 € abweichen. Zoom-Punkt in Szene 6 also auf die ARR-Werte der Versionen legen, nicht auf eine Delta-Spalte.
- Supabase Studio (Szene 7): `live_kpi_events` ist leer. Stattdessen `simulation_scenario_versions` zeigen (5 Versionen mit Beschreibung und Parametern, keine Personendaten).
- n8n (Szene 7): Der Workflow ist inaktiv und hat keine gespeicherte Ausführung. Der grüne Durchlauf wird live mit einem signierten Test-Event erzeugt (siehe unten).

## Szene 7: grüner n8n-Durchlauf

Vorhanden und geprüft: Credentials `LeadPilot PostgreSQL (n8n_ingest role)` und `LeadPilot Ingest HMAC` in n8n, Rolle `n8n_ingest` mit `EXECUTE` auf `ingest_live_kpi_event`, `claim_ingress_slot` und `claim_ingress_nonce`. Das Secret wird nicht ausgelesen und liegt nirgends im Repo.

Sende-Skript: `work/case1-neuaufnahme/send-kpi-event.mjs` (nicht versioniert). Es schickt ein ARR-Event über 411.840 € mit Zeitstempel, Nonce und HMAC-SHA-256-Signatur.

Ablauf bei der Aufnahme:

1. Terminal (nicht im Bild): `cd gtm-portfolio/work/case1-neuaufnahme`, dann `read -s LEADPILOT_INGEST_SECRET && export LEADPILOT_INGEST_SECRET` und das Secret aus dem Passwortmanager einfügen.
2. n8n-Editor: Workflow öffnen, Aufnahme starten, **Execute workflow** klicken.
3. Im Terminal `node send-kpi-event.mjs` ausführen. Erwartet: `201` und `status: accepted`. Im Editor werden die Knoten bis „Respond Accepted“ grün.
4. Zum Dashboard-CRM wechseln, Executive Dashboard: Die ARR-Karte im Live-Bereich zeigt 411.840 €. Der Wert steht schon in der Datenbank und wird beim Öffnen geladen; ist das Dashboard schon offen, kommt er per Realtime in etwa einer Sekunde.
5. Danach Supabase Studio: `live_kpi_events` hat dann eine Zeile. Die Tabelle kann für Szene 7 statt `simulation_scenario_versions` gezeigt werden.

Bei `401` stimmt das Secret nicht mit dem n8n-Credential überein. Ein `404` bedeutet, dass „Execute workflow“ nicht geklickt war; der Test-Webhook nimmt je Klick nur einen Aufruf an.
