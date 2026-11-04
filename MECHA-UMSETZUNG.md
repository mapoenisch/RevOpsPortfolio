# Mecha × Marc Pönisch

## Ergebnis

- **Portfolio im Mecha-Stil:** [Lokale Vorschau](http://127.0.0.1:4321/) · Ordner `gtm-portfolio-mecha/`
- **Separater Referenznachbau:** [Lokale Vorschau](http://127.0.0.1:4322/) · Ordner `mecha-nachbau/`
- **Original:** `gtm-portfolio/` – unverändert. Die separat gespeicherten SHA-256-Prüfsummen umfassen alle 7.544 Originaldateien, einschließlich Abhängigkeiten und Arbeitsmaterial.

## Gestalterische Umsetzung

Referenz ist ausschließlich die ausdrücklich ausgewählte [Mecha-Homepage](https://mecha-xyz.webflow.io/). Beobachtet wurden bei 1440 × 1000 Pixeln: feste linke Spalte von ungefähr einem Drittel der Breite, rechtsbündige Navigation, weiße Flächen, sehr feine Trennlinien, dunkle Flecha-Serifenschrift, Neue-Haas-Grotesk-Fließtext, versetzte Projektbilder und eine feste bordeauxrote Kontaktfläche.

Die Portfolio-Kopie übernimmt diese Gestaltung als React-Komponenten und CSS-Tokens. Die vorhandenen Portfolio-Texte, Fallstudien, Screenshots, Videos, Untertitel, Nachweise, Downloads, Kontaktangaben und Projektchronik wurden übernommen. Die Inhalte in `src/content.ts` und die bestehenden öffentlichen Portfolio-Dateien wurden nicht verändert. Auf der Startseite werden ausgewählte Inhalte neu angeordnet; die vollständigen Inhalte bleiben in den jeweiligen Detailseiten erreichbar.

Die linke Grafik wurde nach Marcs mp.-Referenz als eigenes extrudiertes 3D-Logo mit blauem Punkt gestaltet. Sie reagiert auf den Mauszeiger, lässt sich wie die Referenz durch Ziehen um maximal 25 Grad neigen, federt zurück und vollführt beim Scrollen durch den Hero eine halbe Drehung. Pfeiltasten steuern die Neigung; Escape setzt sie zurück. Bei reduzierter Bewegung bleibt die Grafik ruhig. Die kleine Wortmarke übernimmt ebenfalls mp. und Marc Pönisch. Der Code steht in `MpSculpture.tsx` und `mp-scene.js`; Three.js wird nur auf Desktop dynamisch geladen. Die separat gespeicherte Mecha-Referenz enthält die ursprüngliche 3D-Grafik. Auf dem Handy wird die feste Spalte durch eine kompakte Kopfzeile mit ausklappbarer Navigation ersetzt.

## Seiten der Portfolio-Kopie

- `/`: Neue Startseite mit drei Arbeitsproben, Videos, Profil, Nachweisen, LeadPilot-Hintergrund und Kontakt
- `/cases/leadpilot`: vollständige LeadPilot-Fallstudie
- `/cases/lead-routing`: vollständige Routing-Fallstudie mit interaktiver Demo
- `/cases/ki-prospecting`: vollständige Scoring-Fallstudie mit interaktiver Demo
- `/leadpilot`: vollständige Projektchronik mit Bildern und weiteren Videos
- `/nachweise`: alle elf Originalnachweise mit Themenfiltern
- `/hinweise`: bestehende Transparenz- und Datenschutzhinweise

## Lokal starten

Portfolio: im Ordner `gtm-portfolio-mecha` den Befehl `npm run dev` ausführen. Port: **4321**.

Referenz: im Ordner `mecha-nachbau` den Befehl `python3 -m http.server 4322 --bind 127.0.0.1` ausführen. Port: **4322**.

Produktions-Build der Portfolio-Kopie: `npm run build`. Ausgabe: `gtm-portfolio-mecha/dist/`. Es wurde nichts veröffentlicht.

## Nachvollziehbarkeit

Die Browseruntersuchung wurde mit dem ausdrücklich ausgewählten Skill `reverse-engineer-anything` und dem REA-Werkzeug `capture_browser_scenario` durchgeführt. REA öffnete die Referenz in einem eigenen Browser, wartete auf den Seitenaufbau und erfasste DOM sowie Accessibility. Die referenzierte Sitzung wurde anschließend automatisch beendet.

REA-Evidence: `ev_5c09855a198f139ca035560f41dbeedbd84802a72097c7ae17faf7ea3a60d255`.

Die REA-Erfassung belegt den beobachteten Seitenzustand, keine vollständige Prüfung sämtlicher Interaktionen der Fremdseite. Desktop-, Mobil- und Laufzeitprüfungen ergänzen diese Beobachtung. Die Portfolio-Gestaltung ist eine bewusste Übertragung der Referenz auf die vorhandenen Inhalte; sie ist kein pixelidentischer Austausch unterschiedlich langer Texte.

Werkzeuge und Herkunftsverzeichnisse:

- `mecha-tools/prepare.mjs`: Prüfsummen und Download der öffentlichen Referenzdateien
- `mecha-tools/complete-reference.mjs`: lokale Auflösung der 3D-Module und Ergänzung der Referenzvideos
- `mecha-tools/original-manifest.json`: Original-Prüfsummen
- `mecha-nachbau/asset-map.json` und `additional-assets.json`: Zuordnung der gespeicherten Referenzdateien
- `gtm-portfolio-mecha/evidence/browser-results.json`: Browserprüfung der Kopie

Die Formulare im reinen Referenznachbau versenden keine Nachrichten. In der Portfolio-Kopie führt Kontakt zu Marcs bestehender E-Mail-Adresse; LinkedIn und GitHub führen zu den bestehenden Profilen.

## Abgeschlossene Prüfung am 04.11.2026

- `npm run check`: 19 Tests bestanden, vier umgebungsabhängige Tests planmäßig übersprungen, keine fehlgeschlagen; Build und Inhaltsprüfung bestanden.
- Abschließender `npm run build`: bestanden, keine fehlenden Schriftdateien.
- Browserprüfung: acht Seiten auf vier Breiten (1440, 768, 375 und 320 Pixel), insgesamt 32 Ansichten. Kein horizontaler Überlauf, keine defekten Bilder, jeweils eine Hauptüberschrift und keine gemeldeten Verstöße in den automatisierten WCAG-A/AA-Prüfungen.
- Interaktionen: vier Routing-Fälle, Scoring-Suche und Filter, Nachweisfilter, alle verlinkten Nachweise und Downloads, drei Diagramme mit Zoom und Escape, mobiles Menü mit Fokusrückgabe, Sprunglink und Screenshotdialog geprüft.
- Alle drei Fallstudienvideos mit tatsächlichem Wiedergabefortschritt, Dauer und Untertitelspur geprüft.
- Portfolio-Browserlauf: keine JavaScript-Fehler und keine externen Netzwerkaufrufe.
- Separater Referenznachbau: Start und erster Projektabschnitt bei blockierten externen Requests geprüft. Keine externen Requests, JavaScript-Fehler oder defekten Bilder in diesem geprüften Zustand; 3D-Canvas vorhanden.
- Originalvergleich: alle 7.544 Dateien mit der gespeicherten SHA-256-Liste identisch (`changed: []`).

Der vollständige Browserlauf steht in `gtm-portfolio-mecha/evidence/browser-results.json`; die zugehörigen Screenshots stehen in `gtm-portfolio-mecha/evidence/browser/`.
