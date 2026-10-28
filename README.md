# Marc Pönisch – Bewerbungsportfolio

Deutsche Bewerbungswebsite mit zwei Fallstudien, Kompetenzen, filterbaren Lernnachweisen und einem öffentlich geeigneten Lebenslauf.

## Lokal ansehen

```sh
npm install
npm run build
npm run preview
```

Die statische Vorschau läuft ausschließlich auf `http://127.0.0.1:3100`.
Für die Entwicklung: `npm run dev`. Vorschau und Entwicklungsserver nicht gleichzeitig auf Port 3100 starten.

## Inhalte pflegen

- Profil, Projektbeschreibungen und Kompetenzen: `src/content/portfolio.ts`
- Zertifikate: `src/content/certificates.json`; lokale Herkunftsnachweise: `docs/evidence/certificate-sources.json`
- Bilder und Dokumente: `public/images`, `public/nachweise`, `public/downloads`
- Gestaltung: `src/app/globals.css`

Die sechs Nachweise auf der Startseite werden über `featured` bestimmt. Alle Nachweise erscheinen unter `/zertifikate/`. Anbieter und Themenfilter werden aus dem Katalog gebildet. Datumsangaben stammen aus den Urkunden; bei fehlendem Datum wird dies kenntlich gemacht. Gleiche Nachweise in mehreren Dateiformaten sind zusammengefasst. Anthropic-Kursabschlüsse werden als Lernnachweise, Demandbase- und Google-Abzeichen als digitale Badges bezeichnet. Die Google-Abzeichen enthalten keine namentliche Zuordnung.

## Prüfung

```sh
npm run typecheck
npm run build
npm run check
npm run preview
# In einem zweiten Terminal:
npm run test:browser
```

Die Browserprüfung verwendet lokal installiertes Google Chrome und speichert Prüfergebnisse sowie Desktop- und Mobilaufnahmen unter `docs/evidence/`. Sie prüft auch Filter, Suchfunktion, mobile Navigation, Tastaturbedienung, Bildladefehler und PDF-Download.

## Technischer Rahmen

Next.js mit App Router, TypeScript und Tailwind. `output: export` erzeugt `out/` mit statischen Seiten. Schriftarten werden lokal ausgeliefert. Es gibt keine Datenbank, Analyse-Dienste oder zur Laufzeit benötigten API-Schlüssel. Für den Build ist Webpack gewählt.

Die Website ist noch nicht veröffentlicht. Suchmaschinenindexierung ist für diese Vorschau deaktiviert. Hosting, öffentliche Anbieterangaben und passende Datenschutzhinweise werden erst bei einer späteren Veröffentlichung ergänzt.

## Offener Medienstand

JobScout enthält aktuelle Screenshots aus der unveränderten lokalen Anwendungskopie mit gekennzeichneten Demodaten. Die Originalaufnahmen liegen unter `docs/evidence/project-captures/`.

Für LeadPilot fehlen noch aktuelle Aufnahmen aus einer angemeldeten Sitzung. Die separat gestartete Anwendung ist unter `http://127.0.0.1:4175/login` erreichbar. Die Website zeigt diesen offenen Punkt ausdrücklich; alte Testbilder und leere Dashboard-Ansichten werden nicht verwendet. Nach der Aufnahme werden die Bilddateien ergänzt und `screenshotsReady` in den zentralen Projektdaten aktiviert.

## Quellen und Originale

Vorhandene Lebensläufe, Zertifikate und Quellprojekte wurden als Quellen gelesen und bleiben unverändert. Datenaufbereitung und Anwendungskopien für aktuelle Screenshots liegen unter dem ignorierten Verzeichnis `tmp/`. Diese Kopien gehören nicht zur Website und nicht zum Export. `scripts/` dokumentiert die lokale Aufbereitung; maschinenspezifische Quellpfade sind dort absichtlich nur für diese Arbeitsumgebung hinterlegt.
