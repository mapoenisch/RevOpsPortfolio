# Bewerbungsportfolio – Umsetzung

Auftrag: bestätigter Plan „Dein Bewerbungsportfolio – erste Version“, 26.10.2026.

## Entscheidungen

- Umsetzung direkt im leeren, ausdrücklich gewählten Portfolio-Ordner. Kein Git-Repository vorhanden; kein fremdes Repository verändern und kein Worktree nötig.
- Lokale Vorschau, keine Veröffentlichung, keine Domain, keine Analyse-Dienste oder Datenbank.
- Zwei Fallstudien: LeadPilot Dashboard CRM und JobScout. KI-Unterstützung transparent; keine behaupteten Produktiverfolge.
- Persönliche Daten: Stadt, E-Mail und bestätigter LinkedIn-Link. Kein Geburtsdatum, keine Straßenadresse und keine Telefonnummer im öffentlichen Lebenslauf.
- Quellenprojekte ausschließlich lesen. Vorhandene Bilder und Nachweise als separate Kopien verwenden.
- Funktionsprüfung über Build, Exportprüfung und echte Browser-Prüfung; keine umfangreichen TDD-Prozesse für eine statische Bewerbungswebsite.

## Fortschritt

- [x] Positionierung und Umfang bestätigt.
- [x] Quellcode und vorhandene Projektaufnahmen gesichtet.
- [x] Gesamtbestand: 57 Dateien, nach Zusammenfassung von Mehrfachformaten und allgemeinen Profilabzeichen 40 verschiedene Nachweise im Katalog.
- [x] 54 PDF- und Bilddateien gelesen (PDF-Text bzw. macOS Vision OCR); ausgewählte Urkunden und bildbasierte PDF zusätzlich visuell geprüft.
- [x] Nach Nutzerkorrektur: vollständige filterbare Zertifikatsübersicht statt Beschränkung auf sechs Nachweise; Startseite mit sechs Nachweisen aus sechs Anbietergruppen.
- [x] Inhalte und Oberfläche umgesetzt.
- [x] Öffentlich geeigneter Lebenslauf erstellt; beide gerenderten Seiten visuell geprüft.
- [x] JobScout als unveränderte lokale Anwendungskopie gestartet; Dashboard und Pipeline frisch mit ausdrücklich benannten Demodaten aufgenommen und visuell geprüft.
- [x] Produktionsbuild und statischer Export erfolgreich.
- [x] 6 HTML-Seiten und 191 lokale Verweise geprüft.
- [x] 10 Browseransichten (Desktop/Mobil) ohne automatisiert festgestellte WCAG-A/AA-Verstöße geprüft. Filter/Suche, Menü/Escape/Fokus, Sprunglink, PDF, 320px und 404 bestanden.
- [ ] Aktuelle LeadPilot-Screenshots: Anwendung gestartet, benötigt echte angemeldete Supabase-Sitzung. Keine Umgehung, keine alten Testbilder und keine leeren Screenshots verwendet. Im Portfolio ist der ausstehende Medienstand sichtbar markiert.

## Noch offen

LeadPilot verlangt im aktuellen Stand eine echte Anmeldung. Unter `http://127.0.0.1:4175/login` kann Marc sich anmelden. Danach die gewünschten Ansichten über die normale Oberfläche öffnen, unveränderte Screenshots erfassen und in `public/images/` ablegen. Erst dann `screenshotsReady` bei LeadPilot aktivieren, die Galerie-Texte an die tatsächlich aufgenommenen Ansichten anpassen und Build/Prüfung erneut ausführen.

Die vorhandene Browser-Konfiguration aus dem ursprünglichen lokalen Projekt wird ausschließlich in der ignorierten Anwendungskopie verwendet. Sie gehört nicht zur Portfolio-Website und nicht zum Export.
