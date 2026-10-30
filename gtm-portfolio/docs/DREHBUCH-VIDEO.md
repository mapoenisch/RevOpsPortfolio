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
| 1 | 0–8 s | Dashboard-CRM, Management-Ansicht, Startzustand | ARR-Kachel **411.840 €** neben Ziel 480.000 € | „LeadPilot lag 2025 bei 411.840 Euro Jahresumsatz. Das Ziel waren 480.000. Die Frage: Wo geht der Umsatz verloren?“ |
| 2 | 8–20 s | Zum Funnel springen (in der App gibt es kein Scrollen, nur Sprünge; den Übergang glätte ich im Schnitt) | Funnel Leads → Neukunden: 1.776 → 47 | „Im Funnel wird aus 1.776 Leads am Ende 47 Neukunden. Die Lücke liegt aber nicht am Anfang, sondern in der Testphase.“ |
| 3 | 20–30 s | Detail-Ansicht öffnen, Trial-to-Paid | **18 %** gegenüber Ziel 25 % | „Nur 18 Prozent der Testkunden zahlen. Acht Punkte mehr wären rund 21 Kunden zusätzlich.“ |
| 4 | 30–40 s | Weiter zu Churn und Kundengröße | Churn **2,8 %**, Ø 129 € MRR bei Kündigern | „Der zweite Hebel ist Kundenbindung. Gekündigt haben fast nur Kleinstkunden. Das ist kein Service-Problem, sondern ein ICP-Problem.“ |
| 5 | 40–50 s | Unit Economics: CAC, Payback | LTV : CAC **2,7 : 1**, Payback 13 Monate | „Dazu rechnet sich die Akquise zu langsam: 13 Monate Payback, LTV zu CAC 2,7 zu 1.“ |
| 6 | 50–62 s | Live-Simulation: Szenario Trial, dann Churn, je ein Lauf starten | Ergebnis **+27.990 €** und **+20.250 €** | „Beide Hebel habe ich in der Simulation gegengerechnet: 30 Tage, je ein Szenario. Trial bringt fast 28.000 Euro, Churn gut 20.000.“ |
| 7 | 62–72 s | Schnitt: Supabase Studio (Tabelle), dann n8n Live-KPI-Workflow, Ausführung läuft durch | Grüne Knoten im n8n-Workflow | „Die Zahlen kommen nicht aus einer Folie. Sie liegen in Supabase, und n8n berechnet die KPIs live.“ |
| 8 | 72–80 s | Zurück zur ARR-Brücke im Portfolio | Weg zu **620.000 €** ARR | „Daraus ergibt sich der Plan für 2026: fünf Hebel, die zwei größten nach dem ersten Kontakt.“ |

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

## Offen, klärt sich in Schritt 2 (Umgebung)

- Ob Funnel, Churn und Unit Economics im Dashboard-CRM genau so zu sehen sind. Sonst nehme ich für Szene 2 bis 5 die Portfolio-Seite selbst auf.
- Welche Supabase-Tabelle am besten zeigt, dass die Daten echt sind (ohne personenbezogene Spalten).
