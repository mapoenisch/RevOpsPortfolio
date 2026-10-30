# Ablaufplan Überarbeitung (Stand 30.10.2026)

Ergebnis der Rückfragerunde. Reihenfolge: erst aufräumen, dann Zahlen, dann Chronik, zuletzt Video.

## Phase 0 – Projektordner verschlanken

1. Supabase-Schema-Varianten aus `Diagramme/` sichten, beste Variante als Vorlage für das Datenfluss-Diagramm sichern.
2. Löschen (freigegeben):
   - Neu erzeugbar: `gtm-portfolio/.cache`, Root-`.cache`, `tmp`, Root-`node_modules`, `.next`, `out`, `gtm-portfolio/dist`, `.playwright-mcp`, alle `.DS_Store`
   - Ungenutzte Bilder: `public/media/leadpilot-contacts.webp`, `leadpilot-deals-filtered.webp`
   - Alte Next.js-App im Repo-Root (src, public, scripts, output, docs, Config-Dateien)
   - `Diagramme/`, `Untitled Project Kopie.png`
   - Arbeitsnotizen: `work/`, `docs/auftraege`, `docs/wiederherstellung`, `evidence/case1-neuaufnahme-preflight.json`, `review/`
   - `evidence/browser`
3. Behalten: `Ursprung/` (Kurs-PDFs, Quelle für Chronik Kapitel 1).
4. `gtm-portfolio/work/case1-neuaufnahme` wird erst gelöscht, wenn das neue Video fertig ist.
5. Build, Tests, Content-Check; Commit.

## Phase 1 – Case 1: Zahlen angleichen

1. In LeadPilot zwei Szenario-Versionen anlegen und simulieren: Churn 1,8 % und Trial-to-Paid 26 %.
2. Szenariovergleich neu aufnehmen (ersetzt den heutigen Screenshot mit 2,2 % / drittem Sales Rep).
3. Hebelrechnung im Case-Text so anpassen, dass Churn und Trial dieselben Werte wie die Simulation zeigen. Die übrigen Hebel bleiben Plan-Werte und werden so gekennzeichnet.

## Phase 2 – Projektchronik neu aufbauen

Kompakter, inhaltlich nicht gekürzt. Überall kleine Vorschaubilder, groß erst nach Auswahl (Lightbox).

1. **Die erste Idee:** Kernpunkte aus „2.1.11 Unternehmensprojekt – Deine Geschäftsidee – Lösung (Aufg. 2)“.
2. **Die Unternehmenswelt:** gruppierte Liste mit Vorschau der ersten Seite
   - Strategie: ICP, Buyer Persona, strategische Analyse & Zielgruppenpriorisierung
   - Gründung: Geschäftsführeranstellungsvertrag, Gesellschafterliste, Mietvertrag, Handelsregisteranmeldung, Satzung
   - Finanzen: Unternehmens-Check-up, Geschäftsbericht 2025, Jahresabschluss, Unternehmensanalyse, Quartalsberichte
   - Marketing: Marketingplanung, Content-Strategie
3. **Marketing & Content:** einige frühe und einige aktuelle Assets (Auswahl: Marc). Darin:
   - „LeadPilot in Bewegung“: nur die ersten zwei Videos, ein Player mit Pfeil-Umschalter
   - „Prozesse visualisieren“ (Lead-Qualifizierung, Expo-Nachbereitung)
4. **Designsystem:** neues Bild (Auswahl: Marc), benannt als Grundlage des späteren Frontends.
5. **Kunden- & Team-Pitch:** eigenes Kapitel (Weidner, Team-Deck, Dossier).
6. **Vom Dashboard zum CRM:** neue Bilder (Auswahl: Marc), dazu frische Aufnahmen aus Supabase Studio und n8n und ein Datenfluss-Diagramm.

Daneben prüfe ich jedes Asset auf richtige Stelle, Beschriftung und Datum. Schwache App-Aufnahmen werden ersetzt.

## Phase 3 – Video „In etwa 90 Sekunden“

- Länge 60–90 s, Storyline: Umsatzverlust → Hebel (Funnel-Engpass → SLA → Unit Economics → Szenariovergleich)
- Kurze Einschübe zur Datenherkunft: Supabase und n8n, als Aufnahme oder Workflow-Animation
- Stil: modernes App-Präsentationsvideo mit Zooms auf relevante Bereiche
- Einheitlich 1920×1080, keine Browserleiste, kein Dock, keine Klarnamen

Ablauf:
1. Claude: Drehbuch mit Klickpfad, Zoom-Punkten und Sprechertext.
2. Claude: Umgebung vorbereiten (App, Supabase Studio, n8n, Daten, sauberes Fenster).
3. Marc: Aufnahme mit Cap.app; Stimme mit eigenem Tool erzeugen.
4. Claude: Schnitt und Ton anlegen, Untertitel (VTT), Poster, einbinden.
5. Rohmaterial-Ordner löschen.

## Phase 4 – Abschluss

Build, Content-Check, Tests, Prüfung bei 1440/768/375 px, Commit.

## Offene Zulieferungen von Marc

- Auswahl der Marketing-Assets (Kapitel 3)
- Bild für das Designsystem (Kapitel 4)
- Bilder für „Vom Dashboard zum CRM“ (Kapitel 6)
- Cap-Aufnahme und eingesprochene Stimme (Phase 3)
