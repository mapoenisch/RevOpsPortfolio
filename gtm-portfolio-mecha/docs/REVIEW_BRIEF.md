# Abschlussprüfung

## Auftrag

Eigenständiges, helles deutsches Bewerbungsportfolio für Marc Pönisch, SalesOps/RevOps. Neue React-/TypeScript-/Vite-/Tailwind-Website in diesem Ordner, unabhängig vom älteren Entwurf im Parent. Drei Fälle: tatsächliches LeadPilot-Dashboard-CRM; separate lokale Inbound-Routing-Demo mit vorbereitetem n8n-/HubSpot-Anschluss; separate Profil-Priorisierung mit 50 synthetischen Profilen und echtem lokalem Ollama-Lauf. Alle Diagramme kommen später von Marc. Keine Veröffentlichung.

## Prüffokus

- Stimmen Behauptungen mit nachgewiesenem Status überein? Kein vorgetäuschter HubSpot-/n8n-Erfolg oder LeadPilot-Screenshot.
- Routing: Validierung, normalisierte E-Mail, Event-Kollisionen, Duplikate, Parallelität, Wiederaufnahme, unklare Schreibzustände, persistierter Zustand und Credential-Grenze.
- KI: deterministischer Score, Schwelle 75, gültige strukturierte Antworten, kein Versand, korrekte Laufstatistik. Modellantworten nicht als fachlich geprüfte Fakten darstellen.
- UI: Routen, Tastatur, direktes Laden, mobile Breiten, Medienzuordnung, Videos, Platzhalter, Downloads. Kein Laufzeitbedarf an Demo-Servern.
- Source-/Build-Trennung: keine Secrets im Frontend, keine Verwendung von `.env` oder Original-Quellprojektänderungen.

## Bekannte offene Voraussetzungen

- Reguläre LeadPilot-Anmeldung wurde angefordert, steht noch aus. Daher keine aktuellen Anwendungsbilder/kein LeadPilot-Video.
- Kein HubSpot-Testzugang vorhanden. Workflow und Adapter sind vorbereitet, lokale Fachregeln und HTTP-Gateway getestet. Externer End-to-End-Lauf klar als offen markiert.
- Drei Diagramme von Marc fehlen erwartungsgemäß.

## Dateien und Nachweise

README und docs/QUELLEN.md beschreiben Einrichtung und Aussagegrenzen. Code in src/, demos/, scripts/; Fachtests in tests/. evidence/browser-results.json, gateway-results.json und asset-sources.json liefern aktuelle Belege. public/data/prospecting-report.json enthält ausschließlich synthetische Daten und tatsächliche lokale Modellantworten. Video-Aufnahme kann während der Prüfung noch laufen.

Nur lesen und berichten. Keine Dateien ändern, keine Netzaufrufe, keine Secrets, keine `.env*`-Dateien und keine Modellcache-Dateien lesen. Der Parent und das Original-LeadPilot-Projekt gehören nicht zum Review-Scope. Kein Git-Repository vorhanden. Konkrete Fehler mit Datei/Zeile und Wirkung benennen; keine Stil-Nits oder zusätzliche Features verlangen.
