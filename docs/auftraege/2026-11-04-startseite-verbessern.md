# Hauptportfolio: fünf Befunde der Startseitenkritik bearbeiten

Marc wählte am 4. November 2026 mobile Lesbarkeit als erste Priorität und die Bearbeitung aller fünf priorisierten Befunde. Geltungsbereich: Hauptportfolio `gtm-portfolio/`, einschließlich der gemeinsam genutzten Routing-Demo. Die alternative Portfolio-Anwendung bleibt unverändert. Die anschließende Anweisung umfasst Commit, Push und Übertragung auf die bestehende Cloudflare-Website.

## Umsetzung

- Wesentliche mobile Lesetexte vergrößert; Demo-Auswahl, Demoaktion, Reset, Daten-Aufklapper und Arbeitsproben-Links besitzen mindestens 44 px hohe Bedienflächen. Die Hero-Demo wird schon unter 850 px einspaltig angeordnet.
- Die kompakte Demo legt Eingangsadresse, Unternehmen, Unternehmensgröße und Zuständigkeitsregel über einen nativen, per Tastatur bedienbaren Aufklappbereich offen. Angezeigte Eingaben und tatsächlich verarbeitete Daten stammen aus demselben Objekt. Die Unternehmensangabe fehlt im passenden Testfall auch sichtbar.
- Wiederholende Fokusleiste und Arbeitsweise-Abschnitt entfernt. Den eigenen fachlichen Beitrag im Profil zusammengefasst und je Arbeitsprobe eine bereits dokumentierte Entscheidung sichtbar gemacht. Keine neuen Kunden- oder Leistungsbehauptungen ergänzt.
- Zusätzlichen Chronik-Sprungbutton unter den Arbeitsproben entfernt. Die Chronik bleibt nach Profil und Nachweisen als ergänzender Kontext erreichbar. Arbeitsproben erhalten größere, klar benannte Einstiege.
- Unvollständige Übergabe mit Warnsymbol, vorhandenem Kontakt, fehlender Folgeaufgabe und nächstem fachlichen Schritt erklärt. Ein neuer Browser-Demolauf wird ausdrücklich von der Wiederaufnahme im echten Ablauf unterschieden. Reset stellt auch den ursprünglichen Testfall wieder her.

Die Startseitenergänzungen liegen in `src/home.css`; die größere Routing-Bedienung gilt auch auf der Routing-Unterseite. Nicht mehr verwendete Styles für entfernte Startseitenblöcke wurden bereinigt. `DESIGN.md`, ihre Begleitdatei und die README sind aktualisiert.

## Prüfungen

- `npm run check`: 19 Tests bestanden, 4 Linux-Deploymenttests auf macOS übersprungen; TypeScript, Produktionsbuild und Inhalts-/Medienprüfung erfolgreich.
- `npm run test:browser`: sieben Routen bei 1440, 768, 375 und 320 px, insgesamt 28 Ansichten, ohne gemeldete Darstellungs- oder automatisierte WCAG-A/AA-Probleme. Keine JavaScript-Fehler oder unerwarteten externen Datenaufrufe.
- Zusätzlich vier Routing-Testfälle auf der Startseite pro Breite: Erfolg, Dublette, fehlende Unternehmensangabe und CRM-Ausfall. Eingabedaten per Tastatur, verständlicher Fehlerzustand, Zähler, Reset und mindestens 44 px hohe Bedienflächen geprüft. Auch Routing-Unterseite, Scoring, Nachweise/Downloads, Diagramme, Menü und Videos im bestehenden Prüflauf geprüft.
- Startseite und aufgeklappte Demo einschließlich Fehlerhilfe visuell auf Desktop und Mobil betrachtet. Kein horizontaler Überlauf in den geprüften Größen.
- Vite nahm erzeugte Prüfdateien zuvor als Änderungsereignis wahr und lud die Seite während der Interaktion neu. `server.watch.ignored` nimmt nun `evidence/` aus der Überwachung. Ein gezielter Nachtest bestätigt, dass Berichtsausgaben keinen Reload mehr auslösen. Der Diagrammtest scrollt vor dem Dekodieren zum verzögert geladenen Bild.
- Automatisierte Viewportprüfungen in Chrome, keine Prüfung auf physischen Mobilgeräten und keine vollständige manuelle Screenreader-Abnahme.

Prüfbericht: `gtm-portfolio/evidence/browser-results.json`. Ursprung: Startseitenkritik vom 4. November 2026, Zielkennung `src-app-tsx`. Alle fünf priorisierten Befunde sind in diesem Durchgang bearbeitet; es wurde keine neue Heuristikpunktzahl vergeben.

## Repository- und Veröffentlichungsstand

Die ursprüngliche Arbeitskopie stand auf `codex/portfolio-veroeffentlichung`. Dieser ältere Branch enthält SSH-Veröffentlichung und die separate Designvariante und ist nicht Grundlage dieses Auftrags.

Die Änderungen werden auf `codex/portfolio-startseite` vom aktuellen `main` isoliert. Das Quellrepository ist `mapoenisch/RevOpsPortfolio`; die bestehende Cloudflare-Website `https://portfolio.marc-poenisch.workers.dev/` ist mit dem separaten privaten Repository `mapoenisch/ma-poenisch-portfolio` verbunden. Die Hauptportfolio-Verzeichnisse beider Hauptbranches waren vor der Übertragung identisch (Git-Tree `98be41b991b645e144a546e0aa1ed9fb2240ef36`). Die jeweilige vorhandene Cloudflare-Konfiguration bleibt erhalten.

Im isolierten Branch bestehen ohne die alten SSH-Deploymenttests 17 fachliche Tests; `npm run check` einschließlich Build und Inhaltsprüfung ist erfolgreich. Die Übertragung der 17 Auftragsdateien aus der geprüften Arbeitskopie wurde bytegenau abgeglichen. Fremde Notizen und die zuvor bestehende Dateilöschung werden nicht übernommen. Die ursprüngliche lokale Arbeitskopie bleibt für die laufende Vorschau erhalten.

Merge und Freigabe erfolgen ausschließlich durch Marc.
