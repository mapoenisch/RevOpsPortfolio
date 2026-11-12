# Diagramme · Einbindung und Überarbeitung

Marc hat drei SVG-Dateien geliefert und die Änderung ausdrücklich erlaubt. Die gelieferten Dateien bleiben unverändert. Die Website verwendet eigene fachlich überarbeitete Portfolio-Versionen nach diesen Vorlagen; die Bildunterschriften weisen die Überarbeitung aus.

## Originale und Portfolio-Versionen

| Case | Geliefertes Original im übergeordneten Workspace | Eingebundene Datei |
| --- | --- | --- |
| LeadPilot | `Diagramm zu Case Study 1/Diagramm zu Case Study 1- LeadPilot CRM Architektur1.svg` | `public/media/diagrams/leadpilot.svg` |
| Inbound-Routing | `Diagramm zu Case Study 2/Case Study 2- Inbound Lead-Routing (n8n + HubSpot).svg` | `public/media/diagrams/lead-routing.svg` |
| KI-Prospecting | `Diagramm zu Case Study 3/Case Study 3- Mehrstufiges KI-Prospecting & Scoring.svg` | `public/media/diagrams/ki-prospecting.svg` |

## Fachliche Anpassungen

**Case 1:** Das Original zeigt HubSpot als laufendes CRM-Backend, einen bidirektionalen n8n-Sync und eine Next-Best-Action-Engine. Diese Darstellung passt nicht zum geprüften Anwendungsstand. Die neue Version zeigt React/TypeScript/Vite, Datenadapter, Supabase Auth und PostgreSQL/RLS. Historische Ausgangsdaten samt eingefrorenem HubSpot-Import, regelbasierte Simulation und der vorhandene separate Live-KPI-Ingest werden getrennt dargestellt. Ein aktueller externer Live-Lauf wird daraus nicht abgeleitet. Belege sind README, Architekturentscheidungen, Datenquellenadapter und n8n-Dateien im ursprünglichen LeadPilot-Projekt.

**Case 2:** Die Normalisierung erfolgt im lokalen Gateway, n8n übernimmt den geschützten Webhook und die Weiterleitung. Die tatsächliche Demo gleicht Kontakte ab und stellt eine verknüpfte Aufgabe sicher. Firmen-/Account-Anlage, Deal-Erstellung und Slack-/E-Mail-Versand sind keine Bestandteile dieses Prototyps und wurden aus der Darstellung entfernt. Pflichtfeldfehler, Dubletten, Zuständigkeitsregeln, gespeicherte Zwischenstände und unklare Schreibzustände sind nun sichtbar. Die fachlichen Regeln unterscheiden unter 50 und ab 50 Beschäftigten; im tatsächlichen Test verwenden beide Wege Marc Pönisch als Owner. Belege: `demos/routing/`, `tests/routing.test.mjs` und `public/data/routing-report.json`.

**Case 3:** Die Vorfilterung erfolgt durch lokale Regeln ohne Modell. Auch die Punktzahl wird anhand sechs fester Kriterien berechnet. Das lokale Modell ergänzt anschließend eine Relevanzeinschätzung für alle 36 zulässigen Profile. Ein gültiges, relevantes Profil ab 75 Punkten erhält einen allgemeinen Kontaktentwurf aus einem zweiten KI-Schritt. Die Ausgabe wird lokal als JSON-Bericht gespeichert; ein CRM-Export und eine individuelle Personalisierung sind nicht umgesetzt. Der dokumentierte Lauf enthält 14 ausgesonderte Profile, 36 gültige KI-Einschätzungen und 25 Entwürfe. Belege: `demos/prospecting/core.mjs`, `run.mjs` und `public/data/prospecting-report.json`.

## Gestaltung und Bedienung

- Die Farbgruppen der Vorlagen bleiben als zurückhaltende Flächen erhalten. Größere Textflächen und klare Verbindungen verbessern die Lesbarkeit.
- Native SVG-Texte ersetzen die exportierten HTML-Textflächen. Externe Google-Fonts-Importe entfallen; Systemschriften benötigen keinen Abruf.
- Die Vorschau passt in die bestehende helle Website. Lange Diagramme erhalten eine begrenzte Vorschauhöhe.
- Die Vergrößerungsansicht bietet Zoom, Einpassen und einen horizontal/vertikal verschiebbaren Ausschnitt. Auf kleinen Bildschirmen beginnt sie mit 250 Prozent.
- Jede Grafik hat eine Bildbeschreibung, eine vollständige Textfassung und einen SVG-Download. Escape schließt die Ansicht und gibt den Fokus an die auslösende Schaltfläche zurück.

## Pflege und Prüfung

Zuordnung, Bildunterschrift, Abmessungen und Textfassung liegen in `public/data/media.json`. Die Dateien liegen unter `public/media/diagrams/`. Original- und Ausgabe-Hashes sowie Kontrollbilder werden durch `node scripts/check-diagrams.mjs` in `evidence/diagrams.json` dokumentiert. Der Test benötigt die laufende Produktionsvorschau unter `127.0.0.1:4317`.

Nach einer SVG-Änderung zuerst `npm run check`, dann `node scripts/check-diagrams.mjs` und `npm run test:browser` ausführen. Kontrollbilder visuell auf Beschriftungen, Verbindungen und Überschneidungen prüfen. Die Browserprüfung umfasst alle Seiten bei 1440, 768, 375 und 320 Pixeln sowie Zoom, Textfassungen, Downloads, Schließen und Fokusrückgabe für alle drei Diagramme.
