# Umsetzung: eigenständiges SalesOps-/RevOps-Portfolio

Auftrag: im Chat bestätigter Plan vom 27.10.2026. Dieser Ordner ist ein eigenständiges Projekt. Keine Inhalte, Komponenten oder Gestaltung des vorherigen Entwurfs übernehmen.

## Verbindliche Grenzen

- Website lokal, Deutsch, hell, drei Cases. Keine Veröffentlichung.
- LeadPilot-Quellprojekt ausschließlich lesen und über reguläre Anmeldung aufnehmen.
- Diagrammvorlagen kommen von Marc. Er hat nach Lieferung ausdrücklich die Überarbeitung erlaubt; Änderungen erfolgen ausschließlich an den Portfolio-Versionen, Originale bleiben erhalten.
- Neue Routing- und Prospecting-Demos getrennt von LeadPilot.
- Keine Produktivkennzahlen oder nicht ausgeführten Integrationen behaupten.

## Fortschritt

- [x] Chat, LeadPilot-Architektur und Original-Lebenslauf geprüft.
- [x] Eigenständigen Projektordner und Konfiguration angelegt.
- [x] Routing-Demo mit Idempotenz und Fehlerbehandlung; lokaler HTTP-Pfad geprüft.
- [x] Prospecting mit 50 synthetischen Profilen und validierter lokaler KI-Ausgabe.
- [x] Website und Inhalte; eigenständiger Produktionsbuild.
- [x] Elf bytegleiche Originalnachweise, darunter alle sechs vorhandenen Anthropic-Academy-Abschlüsse, und einseitiger öffentlicher Lebenslauf; PDF visuell geprüft.
- [x] Vier aktuelle authentifizierte LeadPilot-Aufnahmen: Dashboard, Kontakte, gefilterte Deals und ARR-Detail.
- [x] Drei 90-Sekunden-Walkthroughs mit Untertiteln; drei Diagramm-Einbauplätze. LeadPilot-Video aus tatsächlichen Browserframes ergänzt.
- [x] Build, 16 Fachtests, sechs HTTP-Prüffälle und 28 Browseransichten bestanden.
- [x] Alle Seiten bei 1440, 768 und 375 Pixeln visuell geprüft; zusätzlich 320-Pixel-Überlaufprüfung. Zwei Videoframes und PDF geprüft.
- [x] Unabhängiger Abschlussreview: zwei Randfälle jeweils mit zuerst fehlgeschlagenem Regressionstest behoben, gesamte Suite 16/16 grün.
- [x] Vollständiger n8n-Webhook-/Gateway-/HubSpot-Test: sieben fachliche Fälle, beide Owner bestätigt, Kontakt- und Aufgabenanzahl sowie Verknüpfung im CRM nachgelesen. Webhook ohne Schlüssel abgewiesen.
- [x] Ergänzender Regressionstest für reservierte Beispieldomains; jetzt 17 Fachtests. Gezielter unabhängiger Nachreview ohne neue relevante Findings.
- [x] Drei Diagramme nach Marcs Vorlagen fachlich überarbeitet und eingebunden. SVGs und mobile Zoomansichten visuell geprüft; 17 Fachtests, Build und 28 Browseransichten einschließlich Diagrammbedienung erneut bestanden.
- [x] Von Marc gewähltes neues Porträt auf der Startseite übernommen und alle sechs Anthropic-Academy-Abschlüsse eingebunden. Elf Originalkopien abgeglichen; 17 Fachtests, Build und 28 Browseransichten erneut bestanden.

## Entscheidungen und Voraussetzungen

- Kein Git-Repository im Workspace; eigenständiger Unterordner statt Worktree. Keine Git-Initialisierung oder Commits angefordert.
- Routing ohne HubSpot-Zugang zunächst als lokal getesteter Adapter. Echte HubSpot-Schreibzugriffe nur im ausdrücklich konfigurierten Testkonto.
- HubSpot-Konfiguration ausschließlich aus der von Marc hinterlegten privaten `.env.local`. Keine Geheimwerte unter `public/`, in Browsercode oder öffentlichen Berichten.
- LeadPilot enthält Offline-HubSpot-Importe und Live-KPI-Ingest, keine nachgewiesene Inbound-Routing-Demo.
- Vorhandene Ollama-Textmodelle verweisen auf Cloud-Modelle. Für einen echten lokalen KI-Lauf wird ein kleines Modell in der Projekt-Cacheablage verwendet, falls verfügbar.

## Abschließender Stand

- Produktionsvorschau läuft unter `http://127.0.0.1:4317/`. Ollama nach dem dokumentierten Modelllauf beendet; die Website benötigt den Dienst nicht.
- Aktueller Modelllauf: qwen3:1.7b, 50 Testprofile, 14 vorab ausgesondert, 36 gültige KI-Einschätzungen, 25 Kontaktentwürfe, null Cloud-Aufrufe. Erster Modelllauf zum Vergleich erhalten.
- Browser-Abnahme des Produktionsbuilds: alle 28 Ansichten ohne Überlauf, defekte Bilder, JavaScript-Fehler oder automatisiert auffindbare WCAG-A/AA-Probleme. Routing, Suche, Filter, Menü/Escape/Fokus, Downloads und tatsächliche MP4-Wiedergabe geprüft.
- LeadPilot regulär angemeldet. Vier Screenshots und 90-Sekunden-Walkthrough eingebunden. Nur-Lesen-Testzugang, historische Daten des fiktiven Unternehmens und synthetische Supabase-Seed-Daten; keine Authentifizierung umgangen.
- HubSpot-Konfiguration wurde von Marc hinterlegt. Nach seiner Bestätigung beide Testwege dem aktiven Owner Marc Pönisch zugeordnet; private Owner-IDs korrigiert. Token, Portal und Owner geprüft. Direkter Gateway-Test und vollständiger n8n-Webhook-Test bestanden. Der abschließende Webhook-Lauf umfasst zwei synthetische Anfragen, vier Wiederholungen und einen Fall mit fehlender Pflichtangabe. Je ein Kontakt und eine verknüpfte Aufgabe im CRM bestätigt.
- HubSpot lehnt `.example` ab. Externe Tests verwenden die reservierte Domain `example.com`; andere reale Domains bleiben gesperrt. Verzögerte Suchindizes werden bei Rückleseprüfungen begrenzt berücksichtigt. Synthetische Testdatensätze bleiben zur Nachprüfung im Testkonto markiert stehen.
- Isolierte n8n-Testinstanz regulär eingerichtet, Workflow nach dem Test deaktiviert und Instanz beendet. Keine bestehende n8n-Datenbank verwendet. Bereinigter öffentlicher Bericht unter `public/data/routing-report.json`, konkrete Testdatensätze ausschließlich unter `evidence/private/`.
- Nach Medienergänzung erneut 16 Fachtests, Build und 28 Browseransichten bestanden. Galerie-Vergrößerung/Escape und Wiedergabe aller drei MP4s geprüft. Kein hinterlegter Geheimwert im öffentlichen Build gefunden.
- Abschließende Fassung einschließlich externem Testbericht und neuem Routing-Video: 17 Fachtests, Produktionsbuild und 28 Browseransichten bestanden. Bericht-Download und alle drei Videos geprüft. Neue Beleg-Komponente auf Desktop/Mobil sowie Videobild visuell geprüft. Keine Geheimwerte im finalen Build; eigene Integrationsdienste beendet.
- Drei Diagramme nach Marcs Vorlagen fachlich überarbeitet und als native SVGs mit Vergrößerung, Textfassung und Download eingebunden. Externe Schriftimporte der Originalexporte entfallen. Änderungen sind in `docs/DIAGRAMME.md` dokumentiert.
- Ursprünglicher Portfolioentwurf und LeadPilot-Quellprojekt wurden nicht bearbeitet.

## Konkrete Fortsetzung

1. Lokale Fassung einschließlich aller drei Diagramme durchsehen.
2. Bei weiteren Änderungen Build und relevante Browserprüfungen wiederholen. Keine Veröffentlichung ohne eigenen Auftrag.
