# LeadPilot · lokale Materialauswahl

Die Galerie ist ein separater Arbeitsschritt vor der Chronik. Sie gehört nicht
zum Vite-Build, verwendet keine externe Verbindung und greift lesend auf die
angegebenen Originaldateien zu. Die endgültige Materialentscheidung trifft Marc.

## Öffnen

Solange der lokale Server läuft: <http://127.0.0.1:4327/>.

Falls er beendet wurde, in diesem Ordner neu starten:

```sh
/Users/marcpoenisch/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 server.py --port 4327
```

Der Server bindet nur an `127.0.0.1`. Die Dokumentvorschauen werden bei Bedarf
lokal mit LibreOffice und Poppler erzeugt; Bildausschnitte und Videos werden
direkt aus den Originalen gelesen. Office-Vorschauen können durch die
Konvertierung bei Schrift oder Umbrüchen vom Original abweichen.

## Entscheidung

Material mit „Vormerken“ auswählen und bei Bedarf einzelne Seiten oder
Änderungswünsche im Notizfeld angeben. „Auswahl für den Chat kopieren“ erzeugt
eine Liste mit IDs und Notizen. Die Liste wird in den Chat eingefügt. Die
Merkliste ist nur im lokalen Speicher des jeweiligen Browsers hinterlegt und
stellt für sich genommen noch keine verbindliche Entscheidung dar.

## Recherche und Grenzen

- Das Inventar liegt unter `../../evidence/leadpilot/inventory.csv` und
  `../../evidence/leadpilot/inventory.json`. Quellpfade bleiben lokal.
- Die 88 Bilddateien wurden als 67 byteverschiedene Motive in Kontaktübersichten
  gesichtet; für die endgültige Auswahl folgt bei Bedarf eine Detailprüfung.
- Von jedem Video wurden Stichbilder und technische Daten geprüft. Tonspuren
  wurden nicht transkribiert. Vor einer Veröffentlichung sind sie vollständig
  anzuhören und gegebenenfalls zu untertiteln.
- Die Satzungs-PDF hat keine auslesbare Textebene. Ein aus Bildern bestehender
  Pitch-Entwurf hat keinen auslesbaren Dokumenttext. Beide sind entsprechend
  im Inventar gekennzeichnet; der Pitch-Entwurf ist in der Galerie visuell
  dargestellt.
- Die automatischen Inhaltssätze und Meilensteinzuordnungen im Inventar sind
  Recherchehinweise. Datum aus der Datei ist kein Entstehungsnachweis.
- Werbevisualisierungen und fiktive Unternehmenszahlen sind keine Nachweise
  für produktiven Einsatz oder reale Umsätze.

## Weiterarbeit nach Marcs Auswahl

Die Entscheidung mit Material-IDs und etwaigen Seitenangaben in
`../../evidence/leadpilot/` dokumentieren. Erst danach ausgewählte Medien
aufbereiten und Teaser, Chronikroute und Case-Verweise im Portfolio umsetzen.
