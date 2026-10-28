# RevOpsPortfolio

# Marc Pönisch · SalesOps & RevOps

Eigenständiges deutsches Bewerbungsportfolio mit React, TypeScript, Vite und Tailwind; unabhängig vom vorherigen Entwurf im übergeordneten Ordner. Es enthält drei Case-Seiten, zwei interaktive lokale Demos, ausgewählte Originalnachweise, einen Kurzlebenslauf und eine eigene LeadPilot-Projektchronik.

## Lokal starten

```sh
npm ci
npm run dev
```

Adresse: http://127.0.0.1:4317/

Für die fertige Build-Vorschau zuerst den Entwicklungsserver beenden:

```sh
npm run build
npm run preview
```

Beide Server binden ausschließlich an `127.0.0.1:4317`. Die Website kann ohne LeadPilot, n8n, HubSpot oder Ollama betrachtet und bedient werden. Es gibt keine Veröffentlichung und keine Analyse-Dienste. Alle Schriftarten und Medien liegen lokal.

## Inhalte und Medien pflegen

- Texte, Profil, Cases und ausgewählte Nachweise: `src/content.ts`.
- Gestaltung und responsive Regeln: `src/style.css`.
- Originalnachweise und Download-Lebenslauf: `public/nachweise/` und `public/downloads/`.
- Medienzuordnung: `public/data/media.json`. Jeder Case hat `screenshots`; `video` und `diagram` sind optional.
- Tatsächlicher KI-Lauf: `public/data/prospecting-report.json`.
- Quellen, Kopiernachweise und Prüfprotokolle: `docs/QUELLEN.md` und `evidence/`.

### LeadPilot-Projektchronik

Die Chronik unter `/leadpilot` beschreibt in acht Kapiteln die Entwicklung von der Geschäftsidee über Marketing, Unternehmensdaten und Pitch bis zu Dashboard und Designsystem. LeadPilot und die darin gezeigten Unternehmenszahlen sind fiktiv. Produktideen und Marketingvisualisierungen sind keine Nachweise für reale Kundenergebnisse oder bereits umgesetzte Funktionen.

Auf der Startseite steht unter den Arbeitsproben der Button „LeadPilot-Entstehung ansehen“. Er springt zum LeadPilot-Abschnitt am Seitenende; dort führt „Die Projektchronik ansehen“ zur eigenen Chronikseite. Die LeadPilot-Case-Study und die Chronik verweisen gegenseitig aufeinander.

- Inhalt und Komponenten: `src/LeadPilotChronik.tsx`; Gestaltung: `src/leadpilot-chronik.css`.
- Ausgewählte Bilder, drei Werbeclips, Untertitel und Schriftdateien: `public/leadpilot/assets/`. Die Marketinggalerie enthält zwölf durchblätterbare Motive.
- Die Dashboard-Vergleiche zeigen historische Ansichten neben regulär angemeldeten Viewer-Aufnahmen aus v2.5.0. Die neuen Standort- und Steckbriefaufnahmen stammen vom 28. Oktober 2026; ihre Herkunft und Hashes sind unter `evidence/leadpilot/` dokumentiert.
- Auswahl, Quelldokumentation und Medienherkunft: `evidence/leadpilot/selection.json`, `evidence/leadpilot/QUELLEN.md` und `evidence/leadpilot/media-sources.json`. Die separate Materialauswahl unter `review/leadpilot/` gehört nicht zum Produktions-Build.
- Die DBA-Kick-off-Aufgabe wird sinngemäß beschrieben, ohne ihr Originaldesign zu übernehmen. LeadPilot Grotesk ist eine modifizierte Space Grotesk; die beiliegende SIL Open Font License liegt neben der Schriftdatei.
- Das von Marc angegebene Claude-Artefakt ist als externer Link eingebunden; sein Inhalt konnte nicht unabhängig abgerufen werden. Die Zeitmarken der englischen Untertitel des ersten Werbespots sind geschätzt und müssen beim Abspielen noch auf Synchronität geprüft werden.

Die ausgewählten Medien können bei Bedarf mit `scripts/prepare-leadpilot.py` aus den dokumentierten lokalen Originalen erneut aufbereitet werden. Das Skript benötigt Pillow, Poppler, LibreOffice und FFmpeg; es überschreibt die von ihm erzeugten Chronikmedien und die zugehörige Medienliste.

### Diagramme pflegen

Die drei von Marc gelieferten Vorlagen sind als fachlich überarbeitete SVGs unter `public/media/diagrams/` eingebunden. Die Originale in den Ordnern `Diagramm zu Case Study 1–3` bleiben erhalten. Marc hat die Überarbeitung ausdrücklich erlaubt. Unterschiede und Quellen sind in `docs/DIAGRAMME.md` dokumentiert; Original- und Ausgabe-Hashes stehen in `evidence/diagrams.json`.

Die Website zeigt Vorschaubilder, eine vergrößerbare und verschiebbare Ansicht, SVG-Downloads und eine Textfassung. Bei Änderungen Datei und Eintrag in `public/data/media.json` pflegen:

```json
"diagram": {
  "src": "/media/diagrams/leadpilot.svg",
  "alt": "Beschreibung der tatsächlich dargestellten Architektur",
  "caption": "Architekturdiagramm · Marc Pönisch"
}
```

`width` und `height` können die SVG-Abmessungen angeben; `description` enthält die Textfassung als Liste. Die Portfolio-SVGs verwenden native Texte und lokale Systemschriften ohne externe Schriftimporte. Nach Änderungen `npm run check`, `node scripts/check-diagrams.mjs` und bei laufender Vorschau die Browserprüfung ausführen. `check-diagrams.mjs` aktualisiert Hashes und Kontrollbilder; anschließend die Bilder visuell prüfen.

### LeadPilot-Aufnahmen ergänzen

Der ursprüngliche LeadPilot-Build wurde zum Lesen unter http://127.0.0.1:4175/ bereitgestellt. Nach der regulären Anmeldung wurden vier aktuelle Screenshots und ein 90-Sekunden-Walkthrough aufgenommen und eingebunden. Sie zeigen einen Nur-Lesen-Testzugang, synthetische Supabase-Seed-Daten sowie historische Werte des fiktiven Unternehmens. Es wurden keine Daten oder Ansichten nachgebaut.

Aufnahmen müssen aus einer regulär angemeldeten Sitzung stammen. Ansicht, Aufnahmedatum, Herkunft und Dateihash in `evidence/` dokumentieren. Die Dateien nach `public/media/` kopieren und unter `leadpilot.screenshots` zuordnen. Nicht auf Testbilder oder synthetische Dashboard-Bilder ausweichen. Keine Änderungen am Quellprojekt sind erforderlich.

## Demo 2: Inbound-Routing

Die Website führt dieselben Fachregeln wie das lokale Gateway aus, verwendet dabei jedoch ein simuliertes CRM im Arbeitsspeicher. Vier Testfälle sind direkt auf der Case-Seite auswählbar.

```sh
npm test
node scripts/test-gateway.mjs
```

Der Gateway-Test startet und beendet seinen eigenen lokalen Server und erzwingt den lokalen Modus. Er testet Authentifizierung, gültige Anfrage, Dublette, Pflichtangaben, ausgeschlossene reale Domains und Payload-Grenze. Es erfolgen keine externen Aufrufe.

### n8n und HubSpot vorbereiten

1. `.env.example` als `.env.local` kopieren, wenn dort noch keine eigene Konfiguration liegt. Niemals bestehende Zugangsdaten überschreiben.
2. `ROUTING_API_KEY` als eigenen zufälligen Schlüssel mit mindestens 24 Zeichen setzen. Geheimnisse nur lokal, nie unter `public/` oder als `VITE_`-Variable speichern.
3. Zunächst `ROUTING_MODE=local` verwenden und `npm run demo:routing` starten.
4. `demos/routing/workflow.n8n.json` in eine lokal laufende n8n-Instanz importieren. Am Webhook eine Header-Auth konfigurieren. Am HTTP-Node eine separate Header-Auth mit `X-Demo-Key` und dem Gateway-Schlüssel hinterlegen. Der Workflow enthält keine Credentials.
5. Der HTTP-Node erwartet ein nativ auf demselben Rechner laufendes n8n und das Gateway unter `127.0.0.1:5680`. Docker-Netzwerkanbindung ist nicht vorkonfiguriert.
6. Für den echten Test ein ausschließlich für synthetische Daten vorgesehenes HubSpot-Testkonto verwenden. Token, Test-Portal-ID und zwei gültige Owner-IDs eintragen und `ROUTING_MODE=hubspot` setzen. Der Adapter prüft die Portal-ID vor dem ersten Schreibzugriff.
7. Ausschließlich reservierte Beispieladressen mit `source: "demo"` einspeisen. Die lokale Demo erlaubt `.example`; HubSpot lehnt diese Endung ab. Für den externen Test `example.com`, `example.org` oder `example.net` verwenden. Andere Domains bleiben gesperrt. Gültigen Eingang, Wiederholung, Pflichtangaben und einen fehlgeschlagenen Zugriff prüfen.

Eingabeformat:

```json
{
  "eventId": "demo-001",
  "email": "mara@example.com",
  "firstName": "Mara",
  "lastName": "Beispiel",
  "company": "Testfirma",
  "employees": 42,
  "source": "demo"
}
```

Der Gateway-Zustand liegt pro Modus unter `.cache/routing-*/`. Ein Single-Instance-Lock verhindert zwei Prozesse auf demselben Zustand. Bei einem unklaren Schreibstatus nicht blind wiederholen: zuerst Kontakt und Aufgabe im Testkonto abgleichen. Ein Lock nach einem Prozessabbruch erst entfernen, nachdem geprüft wurde, dass kein zugehöriger Gateway-Prozess läuft. Dies ist eine begrenzte lokale Demo, kein produktionsreifer Integrationsdienst.

### Externe Testläufe reproduzieren

`node scripts/check-hubspot.mjs` prüft Portal und Owner lesend. `node scripts/test-hubspot.mjs --write-synthetic` führt den Gateway-/HubSpot-Test aus und legt zwei markierte synthetische Kontakte mit Aufgaben an. Beide Owner sind in der aktuellen privaten Konfiguration auf Marc Pönisch gesetzt, wie im Chat bestätigt. Der Gateway-Modus wird ausschließlich für den eigenen Testprozess überschrieben; `.env.local` bleibt standardmäßig auf `local`.

Für den vollständigen Webhook-Test ist n8n isoliert im Projektcache installiert:

```bash
npm install --prefix .cache/n8n-runtime n8n@2.45.4 --omit=dev --no-audit --no-fund
node scripts/test-n8n.mjs --write-synthetic
```

Dieser Lauf verwendet eine neue lokale Datenbank und die reguläre Einrichtung eines eigenen lokalen n8n-Testkontos. Zwei zufällige Header-Schlüssel schützen Webhook und Gateway. Nach dem Test wird der Workflow deaktiviert und die eigene Instanz beendet. Bestehende n8n-Datenbanken werden nicht verwendet. Die gespeicherte lokale Testanmeldung liegt ausschließlich im ignorierten `.cache/n8n-test-*/`-Ordner.

Jeder Schreibtest erzeugt eigene Testadressen und lässt die markierten Datensätze im Testkonto zur Nachprüfung stehen. Rückleseprüfungen warten begrenzt auf die verzögert aktualisierte HubSpot-Suche. Bereinigte Berichte liegen unter `evidence/`; konkrete Testadressen und CRM-IDs ausschließlich unter `evidence/private/`. Zugangsdaten werden in keinem Bericht ausgegeben.

## Demo 3: Profile priorisieren

```sh
# Nur Regeln, kein Modellaufruf:
npm run demo:prospecting -- --rules-only

# Lokales Modell, eigener Port; kein laufender Dienst für die Website nötig:
OLLAMA_HOST=127.0.0.1:11435 OLLAMA_MODELS="$PWD/.cache/ollama-models" ollama serve
# In einem zweiten Terminal:
OLLAMA_HOST=127.0.0.1:11435 ollama pull qwen3:1.7b
npm run demo:prospecting
```

Der Runner verarbeitet 50 feste, erfundene Profile. 14 werden durch Zielmarktregeln vor dem Modellaufruf ausgesondert. Die Punktzahl stammt aus sechs dokumentierten Regeln, nicht aus einer unkontrollierten Modellbewertung. Ab 75 Punkten und positiver KI-Einschätzung entsteht ein Kontaktentwurf. Keine Nachricht wird versandt.

Der lokale Modelllauf ist im JSON-Bericht dokumentiert. „Gültige KI-Ausgabe“ bedeutet Schema- und Typprüfung; die fachliche Qualität muss weiterhin geprüft werden. Die bewusst allgemeine Kontaktfrage wird nicht als individuelle Recherche dargestellt.

Der optionale Cloud-Schritt ist mit `--cloud` vorbereitet und benötigt einen explizit gesetzten API-Schlüssel und ein Modell. Er wurde nicht ausgeführt und wird nicht als nachgewiesen dargestellt. Ohne dieses Argument erfolgen keine Cloud-Aufrufe.

## Medien neu erzeugen

```sh
npm run prepare:assets
node scripts/capture-demos.mjs
npx playwright install ffmpeg
node scripts/record-walkthroughs.mjs
```

Zwei 90-Sekunden-Videos zeigen die eigenständigen Portfolio-Demos mit deutscher Textspur und ergänzendem Transkript. Es sind keine Aufnahmen einer HubSpot-Oberfläche. Das dritte Video zeigt die regulär angemeldete Originalanwendung LeadPilot. Dafür wurden tatsächliche Browserframes aufgenommen, Wartepausen zwischen Aufnahmeblöcken gekürzt und der Ablauf auf 90 Sekunden geschnitten. Zeit- oder Leistungsbenchmarks werden daraus nicht abgeleitet.

`scripts/adopt-leadpilot-media.mjs` übernimmt die dokumentierten Browseraufnahmen und das Frame-Zeitprotokoll in die Website. Es erzeugt keine Ersatzbilder. Originale, Hashes, tatsächliche Bildschirmgrößen und Herkunft stehen in `evidence/captures.json`, `evidence/captures/leadpilot-session.json` und `evidence/video-results.json`.

Der Kurzlebenslauf wird aus den geprüften Angaben des Originals durch `scripts/create-resume.py` erzeugt (ReportLab erforderlich). Er enthält keine Straßenadresse, Telefonnummer oder Geburtsdatum und wurde als einseitiges PDF gerendert und visuell geprüft.

## Prüfung

```sh
npm run check
# Bei laufender lokaler Vorschau:
npm run test:browser
node scripts/check-leadpilot-chronik.mjs
```

Die Browserprüfung nutzt eine getrennte Headless-Chrome-Sitzung. Sie erfasst alle Seiten bei 1440, 768, 375 und 320 Pixeln, prüft Überlauf, Bilder und automatisiert auffindbare WCAG-A/AA-Probleme. Zusätzlich: Routing-Fälle, Scoring-Suche und Filter, Nachweisfilter, Downloads, mobiles Menü, Escape und Fokus. Ergebnisse liegen unter `evidence/`.

Die ergänzende Chronik-Prüfung kontrolliert dieselben vier Bildschirmbreiten, automatisiert auffindbare Barrierefreiheitsprobleme, die Marketinggalerie, drei Vorher-Nachher-Vergleiche, Verweise und die Wiedergabe der Werbeclips. Der Sprungbutton der Startseite wurde zusätzlich auf Desktop und Mobilgeräten geprüft. Das Prüfprotokoll liegt unter `evidence/leadpilot/qa-browser.json`.

## Abgeschlossener Teststand und spätere Ergänzungen

- Echter n8n-/HubSpot-Testlauf bestanden: sieben fachliche Webhook-Prüffälle und CRM-Rückleseprüfung für beide Zuständigkeitsregeln. Je ein Kontakt und eine verknüpfte Aufgabe nach Wiederholungen. Beide Testwege sind Marc Pönisch zugeordnet. Bericht: `public/data/routing-report.json`.
- Drei fachlich überarbeitete SVG-Diagramme nach Marcs Vorlagen eingebunden, einschließlich Zoom, Textfassung und Downloads. Die Diagramm-Platzhalter sind ersetzt.
- Hosting, Domain und Veröffentlichung sind nicht Teil dieser lokalen Fassung.
