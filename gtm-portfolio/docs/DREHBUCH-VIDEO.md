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
| 1 | 0–8 s | Dashboard-CRM (eingeloggt), Startansicht mit ARR | ARR-Kachel **411.840 €** neben Ziel 480.000 € | „LeadPilot lag 2025 bei 411.840 Euro Jahresumsatz. Das Ziel waren 480.000. Die Frage: Wo geht der Umsatz verloren?“ |
| 2 | 8–20 s | **Portfolio-Seite** `/cases/leadpilot`, Abschnitt „Der Funnel 2025“ (hier ist Scrollen möglich) | Funnel Leads → Neukunden: 1.776 → 47 | „Im Funnel wird aus 1.776 Leads am Ende 47 Neukunden. Die Lücke liegt aber nicht am Anfang, sondern in der Testphase.“ |
| 3 | 20–30 s | Portfolio-Seite, KPI-Kacheln und Befund 01 | **18 %** gegenüber Ziel 25 % | „Nur 18 Prozent der Testkunden zahlen. Acht Punkte mehr wären rund 21 Kunden zusätzlich.“ |
| 4 | 30–40 s | Portfolio-Seite, Befund 02 | Churn **2,8 %**, Ø 129 € MRR bei Kündigern | „Der zweite Hebel ist Kundenbindung. Gekündigt haben fast nur Kleinstkunden. Das ist kein Service-Problem, sondern ein ICP-Problem.“ |
| 5 | 40–50 s | Portfolio-Seite, Befund 03 | LTV : CAC **2,7 : 1**, Payback 13 Monate | „Dazu rechnet sich die Akquise zu langsam: 13 Monate Payback, LTV zu CAC 2,7 zu 1.“ |
| 6 | 50–62 s | Dashboard-CRM, Live-Simulation: Szenario Trial, dann Churn, je ein Lauf. In der App per Sprung navigieren, Übergänge glätte ich im Schnitt | Ergebnis **+27.990 €** und **+20.250 €** | „Beide Hebel habe ich in der Simulation gegengerechnet: 30 Tage, je ein Szenario. Trial bringt fast 28.000 Euro, Churn gut 20.000.“ |
| 7 | 62–72 s | Schnitt: Supabase Studio (Tabelle), dann n8n Live-KPI-Workflow, Ausführung läuft durch | Grüne Knoten im n8n-Workflow | „Die Zahlen kommen nicht aus einer Folie. Sie liegen in Supabase, und n8n berechnet die KPIs live.“ |
| 8 | 72–80 s | Portfolio-Seite, „Der Weg zu 620.000 € ARR“ | Weg zu **620.000 €** ARR | „Daraus ergibt sich der Plan für 2026: fünf Hebel, die zwei größten nach dem ersten Kontakt.“ |

Gesprochener Text gesamt: rund 190 Wörter.

## Sprechertext am Stück (für dein Stimm-Tool)

> LeadPilot lag 2025 bei 411.840 Euro Jahresumsatz. Das Ziel waren 480.000. Die Frage: Wo geht der Umsatz verloren?
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

- Funnel (1.776 Leads), CAC 4.447 € und ARR-Ziel 620.000 € stehen nicht im Dashboard-CRM. Szenen 2–5 und 8 werden deshalb auf der Portfolio-Seite aufgenommen, dort stehen genau die Zahlen aus dem Sprechertext.
- Dashboard-CRM nur für Szene 1 und 6. Navigation dort nur per Sprung, kein Scrollen.
- Login ins Dashboard-CRM macht Marc selbst vor der Aufnahme (Supabase-Auth, kein Demo-Zugang).

## Vorbereitung vor der Aufnahme

- Dashboard-CRM: `npm run dev` im Repo „LeadPilot Dashboard-CRM“ (Branch `codex/leadpilot-live-demo`), läuft auf http://localhost:3000
- Portfolio: `npm run build && npm run preview` in `gtm-portfolio`, Seite `/cases/leadpilot`
- Supabase Studio: Tabelle ohne personenbezogene Spalten öffnen
- n8n: Live-KPI-Workflow öffnen, nach „Tidy up“ wie im Kapitel-6-Screenshot
