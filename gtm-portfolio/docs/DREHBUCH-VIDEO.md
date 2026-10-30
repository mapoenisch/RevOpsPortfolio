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
- [ ] Simulation vor der Aufnahme zurückgesetzt
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
