# Lokale Abnahme · 27.10.2026

## Gelieferte Fassung

- Eigenständige neue React-/TypeScript-/Vite-/Tailwind-Website, lokale Produktionsvorschau auf `127.0.0.1:4317`.
- Startseite, drei Case-Seiten, elf ausgewählte Originalnachweise einschließlich aller sechs vorhandenen Anthropic-Academy-Abschlüsse, Hinweise und eigene 404-Ansicht.
- Zwei interaktive Demos, tatsächlicher lokaler KI-Lauf, drei 90-sekündige MP4-Walkthroughs mit deutscher Untertitelspur und Textfassung.
- Vier authentifizierte LeadPilot-Aufnahmen aus der regulären Nur-Lesen-Sitzung. Synthetische Seed-Daten sind ausdrücklich gekennzeichnet. Keine nachgebauten Ansichten.
- Öffentlicher Kurzlebenslauf als einseitiges PDF; elf Nachweiskopien per SHA-256 mit den Originalen abgeglichen. Das von Marc gelieferte neue Porträt ist an beiden Stellen der Startseite eingesetzt.
- Quellen- und Pflegeanleitung, lokales Gateway, n8n-Workflow und konfigurierbarer HubSpot-Adapter.

## Verifikation

| Prüfung | Ergebnis | Beleg |
| --- | --- | --- |
| Fachtests | 17/17 bestanden | `npm test`, `.cache/hubspot-final-check.log` |
| TypeScript und Produktionsbuild | bestanden | `npm run check`, `.cache/final-check.log` |
| Originalnachweise und Medienzuordnung | bestanden | `evidence/asset-sources.json`, `npm run check` |
| Lokales Routing-Gateway | sechs HTTP-Prüffälle bestanden | `evidence/gateway-results.json` |
| n8n → Gateway → HubSpot | sieben fachliche Webhook-Fälle bestanden, Owner/Verknüpfung und je ein Kontakt/eine Aufgabe nach Wiederholungen bestätigt | `public/data/routing-report.json` |
| n8n-Zugang und Abschluss | ohne Header-Schlüssel abgewiesen (403), Workflow deaktiviert, eigene Instanz beendet | `evidence/n8n-runtime-results.json` |
| Diagramme | drei native SVGs ohne abgeschnittene Texte oder externe Ressourcen; Zoom, Einpassen, Textfassung, Download, Escape und Fokusrückgabe bestanden | `evidence/diagrams.json`, `evidence/browser-results.json` |
| Browser | 28 Ansichten, null Fehler | `evidence/browser-results.json` |
| Interaktionen | vier Routing-Fälle, Suche/Filter, Menü, Tastatur, Downloads und MP4-Wiedergabe bestanden | `evidence/browser-results.json` |
| Visuelle Prüfung | alle Seiten bei 1440/768/375 Pixeln; PDF und Videoframes geprüft | `evidence/browser/`, `.cache/lebenslauf-final.png`, `.cache/video-*.png` |
| KI | 36 gültige Einschätzungen, 25 Entwürfe, keine Cloud-Aufrufe | `public/data/prospecting-report.json` |
| Unabhängiger Review | zwei P2-Befunde behoben, zugehörige Regressionstests bestanden | `evidence/final-review.md` |

Automatisierte Accessibility-Prüfungen ersetzen keine vollständige manuelle WCAG-Zertifizierung. Das Ergebnis benennt die geprüften Ansichten und Interaktionen.

## Diagramme nachgeliefert

Marc hat alle drei SVG-Vorlagen geliefert und ihre Überarbeitung ausdrücklich erlaubt. Sie sind als fachlich korrigierte Portfolio-Versionen eingebunden; die Originaldateien bleiben erhalten. Zoom mit verschiebbarem Ausschnitt, Einpassen, Tastaturbedienung, Textfassung und SVG-Download sind geprüft. Anpassungen: `docs/DIAGRAMME.md`; Hashes und Kontrollbilder: `evidence/diagrams.json` und `evidence/diagrams/`.

Nach der Diagramm-Einbindung erneut 17 Fachtests, Produktionsbuild und alle 28 Browseransichten bestanden. Native SVGs, Desktop-Einbindung und mobile Zoomansichten visuell geprüft. Keine Überläufe, defekten Bilder, JavaScript-Fehler, externen Seitenabrufe oder automatisiert auffindbaren WCAG-A/AA-Probleme in den geprüften Ansichten. Prüfprotokolle: `.cache/diagrams-check.log`, `.cache/diagrams-render.log`, `.cache/diagrams-browser.log`.

## Nachprüfung nach Anmeldung

- Vier neue Originalaufnahmen mit SHA-256, Quelle und tatsächlicher Bildschirmgröße in `evidence/captures.json` dokumentiert.
- LeadPilot-Walkthrough aus 114 tatsächlichen Browserframes erzeugt und auf 90 Sekunden geschnitten. Wartepausen gekürzt; keine UI- oder Datenbilder synthetisch erzeugt. Datenquelle und Definition im Video sichtbar.
- Nach Ergänzung erneut 16 Fachtests, Produktionsbuild und 28 Browseransichten bestanden. Galerie-Vergrößerung/Escape und Wiedergabe aller drei MP4s geprüft.
- Hinterlegte API-Geheimwerte wurden nicht im öffentlichen Build gefunden. Bericht zu HubSpot nur mit Statuscodes und Prüfergebnissen, ohne Zugangsdaten.
- Nach Marcs Bestätigung beide HubSpot-Testwege demselben aktiven Owner zugeordnet. Zwei verschiedene Personen wurden nicht getestet. Der echte n8n-Lauf verwendet eine isolierte lokale Datenbank und reguläre Kontoeinrichtung. Erfolgsbericht nach tatsächlichen API-Rückleseprüfungen erzeugt.
- Die erste externe Validierung zeigte: HubSpot lehnt `.example`-Adressen ab. Die Schutzregel wurde mit zuerst fehlgeschlagenem Regressionstest auf reservierte `example.com`-/`example.org`-/`example.net`-Adressen erweitert. Der gezielte unabhängige Nachreview fand keine neuen relevanten Probleme.
- Abschließende Nachprüfung nach aktualisiertem Routing-Video und Testbericht: 17 Fachtests, Produktionsbuild und alle 28 Browseransichten bestanden. Der neue Bericht ist herunterladbar und wurde in der Browserprüfung geprüft. Testbeleg-Komponente bei 1440/375 Pixeln und Schlussbild des neuen 90-Sekunden-Videos visuell geprüft.
- Frühere Geheimwertprüfung nach dem externen Routing-Test: 45 Dateien, kein hinterlegtes Secret gefunden. Eigene Dienste auf 5678/5680 beendet; private Konfiguration auf Dateimodus 0600. Beleg: `evidence/final-private-check.json`.
- Neues Porträt aus `Untitled Project Kopie.png` an beiden Startseiten-Stellen übernommen und bei 1440/375 Pixeln geprüft; unverändertes Motiv, WebP, kein Farbfilter. Beleg: `evidence/portrait-results.json`.
- Alle sechs vorhandenen Anthropic-Academy-Abschlüsse als unveränderte Originalkopien eingebunden, insgesamt elf Nachweise. Nach Foto- und Zertifikatsergänzung: 17 Fachtests, Build und alle 28 Browseransichten erneut bestanden. Der KI-Filter zeigt sechs Anthropic-Einträge, sämtliche Originaldateien sind erreichbar. Prüfprotokolle: `.cache/portrait-anthropic-check.log`, `.cache/portrait-anthropic-browser.log`.

Hosting, Domain und Veröffentlichung sind nicht erfolgt und gehören nicht zu diesem Auftrag. Die vorhandenen Originalprojekte und der ältere Portfolioentwurf bleiben unverändert.
