"""Kuratiertes Material für die lokale Auswahl, keine Produktionsinhalte."""
from pathlib import Path
import unicodedata

BASE = Path('/Users/marcpoenisch/Documents/DBA Batch 8')
LP = Path('/Users/marcpoenisch/Projekte/LeadPilot - Eine fiktive Geschäftsidee')

def normalize(value):
    return unicodedata.normalize('NFC', value).casefold()

def lesson(prefix):
    found = [p for p in BASE.iterdir() if p.is_dir() and p.name.startswith(prefix + ' ')]
    if len(found) != 1:
        raise RuntimeError(f'Lektionsordner {prefix}: {len(found)} Treffer')
    return found[0]

def find(parent, needle):
    found = [p for p in parent.iterdir() if p.is_file() and normalize(needle) in normalize(p.name)]
    if len(found) != 1:
        raise RuntimeError(f'{parent} / {needle}: {len(found)} Treffer: {found}')
    return found[0]

CONTEXT = LP / 'LeadPilot - Unternehmensdaten-Projekt Kontext'
MARKETING = LP / 'Marketing'
EXPO = LP / 'Marketing/LeadPilot-Expo-Marketingpaket'
DESIGN = LP / 'LeadPilot-Designsystem'
STANDALONE = LP / 'Standalone-Dashboard Dateistruktur'
PITCH = BASE / 'Power-Friday/Kunden-Pitch(2.8)'
TEAM = BASE / 'Power-Friday/Team-Pitch(2.9)'

SECTIONS = [
    ('01', 'Der Anfang', 'Kick-off und erste Geschäftsidee', 'Aus der Weiterbildungsaufgabe wird ein eigenes B2B-CRM-Konzept.'),
    ('02', 'Sichtbar werden', 'Marketing und Content', 'Von der Zielkundenansprache bis zur Messekampagne.'),
    ('03', 'Eine Welt für LeadPilot', 'Unternehmenshistorie und Kennzahlen', 'Fiktive Geschäftsunterlagen geben dem Szenario eine nachvollziehbare Grundlage.'),
    ('04', 'Ideen präsentieren', 'Kunden-Pitch und Team-Pitch', 'Kundenbezogene und gemeinsame Präsentationen verdichten das Projekt.'),
    ('05', 'LeadPilot in Bewegung', 'Werbeclips', 'Vorhandene Clips setzen unterschiedliche Schwerpunkte.'),
    ('06', 'Zusammenhänge zeigen', 'Diagramme und Prozesse', 'Visualisierungen erklären Qualifizierung und nächsten Schritt.'),
    ('07', 'Vom Dokument zum Dashboard', 'Unternehmensdashboard', 'Die Unternehmensdaten bekommen eine eigenständige, interaktive Oberfläche.'),
    ('08', 'Ein eigenes Erscheinungsbild', 'Designsystem und Schrift', 'Logo, Farben, Komponenten und Hausschrift bilden die visuelle Klammer.'),
]

def item(identifier,title,path,description,why,use,note='',pages=None,preview=None,kind=None):
    if not path.is_file():
        raise FileNotFoundError(str(path))
    return {'id':identifier,'title':title,'path':str(path),'description':description,'recommendation':why,
            'use':use,'note':note,'pages':pages or [],'preview':str(preview) if preview else None,
            'kind':kind or path.suffix.lower().lstrip('.')}

CANDIDATES = [
    item('LP-01-01','Kick-off-Intro: Deine Geschäftsidee',find(lesson('2.1.11'),'Kick-Off-Intro Sheet.pdf'),
         'Zweiseitige Aufgaben-Einführung zum fiktiven Unternehmensprojekt.',
         'Zeigt den tatsächlichen Ausgangspunkt des Projekts.','Dokumentauszug, Seite 1–2',
         'DBA-Aufgabenstellung; keine eigene Ausarbeitung.',[1,2]),
    item('LP-01-02','Meine erste Geschäftsidee',find(lesson('2.1.11'),'Lösung(Aufg. 1-3-Bonus).pdf'),
         'Eigene Lösung zu Branche, Problem und LeadPilot-Konzept.',
         'Macht sichtbar, wie aus der Aufgabenstellung die Idee wurde.','Dokumentauszug, Seiten 1–2',
         'Projektzeitpunkt aus Dokument und Dateimetadaten prüfen.',[1,2]),
    item('LP-01-03','Business Model Canvas',CONTEXT/'LeadPilot - BusinessModelCanvas.pdf',
         'Einseitiges Business Model Canvas für das LeadPilot-Konzept.',
         'Verdichtet Zielgruppe, Wertversprechen und Geschäftsmodell auf einer Seite.','Zoombare Dokumentansicht',
         'Im Dokument datiert auf 21. Juli 2026; Produktkonzept, keine reale Unternehmenshistorie.',[1]),
    item('LP-02-01','Früher LinkedIn-Post',find(lesson('2.1.13'),'LinkedIn-Post.png'),
         'Frühes Social-Motiv über die Kontaktaufnahme mit Leads.',
         'Zeigt einen erkennbaren frühen Content-Schritt.','Motiv mit kurzer Einordnung',
         'Die im Motiv genannte Quote ist aus dem Bild allein nicht belegt; keine Übernahme als Tatsache.'),
    item('LP-02-02','Vom Problem zur Demo',EXPO/'LP - Vom Problem zur Demo.png',
         'Übersicht dreier Inhalte entlang einer Entscheidungsreise.',
         'Verbindet Contentstrategie und konkrete Marketingmotive.','Hauptbild oder Detailausschnitt',
         'Marketingkonzept und illustrierte Anwendung; keine belegte Produktfunktion.'),
    item('LP-02-03','Expo-Anzeige: Messekontakt',EXPO/'LP Expo-Anzeige-dunkel-bearbeitet.png',
         'Dunkle LeadPilot-Expo-Anzeige mit Smartphone-Motiv.',
         'Repräsentatives späteres Kampagnenmotiv.','Kampagnenbeispiel',
         'Visualisierung einer fiktiven Anwendung; kein Nachweis eines produktiven Einsatzes.'),
    item('LP-02-04','Contentstrategie: Aufgabenlösung',find(lesson('2.1.13'),'Content Strategie - Lösungen.pdf'),
         'Aufgabenlösung zur Contentstrategie für das Unternehmensprojekt.',
         'Belegt die fachlichen Überlegungen hinter den Marketingassets.','Dokumentauszug','',
         [1,2]),
    item('LP-03-01','Geschäftsbericht 2025',CONTEXT/'LeadPilot - Geschaeftsbericht2025.pdf',
         'Geschäftsbericht des fiktiven Unternehmens mit Unternehmensprofil und Kennzahlen.',
         'Zeigt, wie aus der Idee eine konsistente Unternehmenswelt wurde.','Dokumentseiten und Kontext',
         'Geschäftsjahr 2025 und Unternehmensgründung sind Teil des fiktiven Szenarios.',[1,2]),
    item('LP-03-02','Faktenblatt v1.2',CONTEXT/'LeadPilot - Faktenblatt v1.2.md',
         'Ausführliches Faktenblatt mit Stammdaten und Definitionen für das Projektszenario.',
         'Geeignet als interne Quelle für belastbare Angaben.','Quellenverweis und kurzer Auszug',
         'Umfangreiches Arbeitsdokument; Zahlenstände vor Übernahme vergleichen.'),
    item('LP-03-03','Quartalsbericht Q3 2026',CONTEXT/'LeadPilot_Quartalsbericht_Q3_2026_v1.1.md',
         'Fiktiver Quartalsbericht mit Kennzahlen und Erläuterungen.',
         'Veranschaulicht die spätere Weiterentwicklung der Unternehmensdaten.','Dokumentauszug',
         'Berichtszeitraum ist Teil des Szenarios; nicht mit persönlichem Vertriebserfolg gleichsetzen.'),
    item('LP-04-01','Kunden-Pitch Weidner',PITCH/'LeadPilot Final Pitch-Deck Weidner.pdf',
         'Achtseitige Kundenpräsentation mit Messekontakt-Szenario.',
         'Ein kompakter Einblick in den kundenbezogenen Pitch.','Ausgewählte Folien',
         'Kennzahlen und Zitate der fiktiven Fallstudie als Szenario ausweisen.',[1,2,3]),
    item('LP-04-02','Team-Pitch: finales Deck',find(TEAM,'Teampitch-Deck final mit Schlussfolie.pptx'),
         'Final benanntes Team-Pitch-Deck mit Schlussfolie.',
         'Zeigt die gemeinsame Verdichtung von Idee, Anwendung und Nutzen.','Ausgewählte Folien',
         'Teamprojekt: Beiträge nicht ausschließlich Marc zuschreiben; Folien und Schlussfolie vor Veröffentlichung prüfen.',[1,2,3]),
    item('LP-04-03','Team-Pitch-Dossier',find(TEAM,'Team-Pitch Dossier LeadPilot.docx'),
         'Gemeinsames Dossier zu Idee, Zielkunde, Content, Outreach, Funnel und Designsystem.',
         'Zeigt den Kontext hinter dem Team-Pitch.','Deckblatt und ausgewählte Seiten',
         'Team- und personenbezogene Angaben vor öffentlicher Darstellung prüfen.',[1,2]),
    item('LP-04-04','Team-Pitch: Entwurfsskizzen',find(TEAM,'Entwurfsskizzen1.pptx'),
         'Präsentationsentwurf mit frühen Folienideen.',
         'Macht den Entwicklungsschritt zum späteren Team-Pitch anschaulich.','Vorher-nachher-Vergleich',
         'Entwurfsstand; nicht als finale Fassung ausgeben.',[1,2]),
    item('LP-05-01','LeadPilot Expo: Werbespot',EXPO/'LP Expo - Werbespot.mp4',
         'Kurzer Expo-Clip mit Messe- und Smartphone-Szenen.',
         'Greift das spätere Messekontakt-Motiv auf.','Abspielbarer Clip',
         '20 Sekunden, 854 × 480; keine Tonspur. Gezeigte App-Ansichten sind Werbematerial.'),
    item('LP-05-02','Demo-Clip ohne Ton',EXPO/'LP-Demo-Clip(mute).mp4',
         'Stummer Clip zu Messeliste, Leadübersicht und Kontaktbearbeitung.',
         'Konkrete visuelle Alternative für eine kurze Chronik-Einbettung.','Abspielbarer Clip',
         '15 Sekunden, 1922 × 1080; keine Tonspur. Dargestellte Oberflächen als Werbevisualisierung kennzeichnen.'),
    item('LP-05-03','Werbespot 2',EXPO/'LP-Werbespot2.mp4',
         'Werbeclip mit importierter Messeliste und Bearbeitungsszenen.',
         'Erzählt einen Prozess in aufeinanderfolgenden Bildern.','Abspielbarer Clip',
         '20 Sekunden, 1280 × 720; Tonspur vorhanden, gesprochenen Inhalt vor Veröffentlichung transkribieren.'),
    item('LP-05-04','LeadPilot-Werbespot',MARKETING/'LeadPilot - Werbespot.webm',
         'Allgemeiner LeadPilot-Clip mit Arbeitsplatz und Dashboard-Motiven.',
         'Alternative zum Expo-spezifischen Clip.','Abspielbarer Clip',
         '15 Sekunden, 1922 × 1080; Tonspur vorhanden, gesprochenen Inhalt vor Veröffentlichung transkribieren.'),
    item('LP-06-01','Lead-Qualifizierung',MARKETING/'LeadPilot - Leadqualifizierung.png',
         'Diagramm zu kalten, warmen und heißen Leads.',
         'Zeigt einen fachlichen Zusammenhang als eigenständige Grafik.','Diagramm mit Textalternative',
         'Darstellung eines Konzepts; nicht als produktiv implementierte Scoring-Logik ausgeben.'),
    item('LP-06-02','Expo-Nachbereitung in drei Schritten',EXPO/'LP Expo-Nachbereitung-dunkel.png',
         'Drei illustrierte Schritte von Messeliste bis nächstem Schritt.',
         'Gibt dem späteren Kunden-Pitch einen anschaulichen Prozess.','Prozessgrafik mit Textalternative',
         'Illustrierter Workflow; nicht als Funktionsnachweis der CRM-App darstellen.'),
    item('LP-06-03','Vom Problem zur Demo: Content-Reise',EXPO/'LP - Vom Problem zur Demo.png',
         'Drei Stufen von Awareness bis Entscheidung.',
         'Alternative Prozessdarstellung mit Bezug zur Contentstrategie.','Diagramm oder vergrößerbarer Ausschnitt',
         'Dasselbe Original wie LP-02-02; nur einmal für die Website aufbereiten.'),
    item('LP-07-01','Ursprüngliches Unternehmensdashboard',CONTEXT/'LeadPilot_Unternehmens_Dashboard.html',
         'Eigenständiges HTML-Dashboard mit Unternehmensprofil und historischen Kennzahlen.',
         'Zentrale Quelle für die Entwicklung vom Unternehmenskontext zur Dashboard-Oberfläche.','Vergrößerbare Vorschau und Dokumentation',
         '8,9 MB; zweites Exemplar im Standalone-Ordner ist bytegleich. Live-Anbindung aus dieser Datei allein nicht nachgewiesen.',
         preview=DESIGN/'uploads/2026-08-11_10-58-42.png',kind='html-dashboard'),
    item('LP-07-02','Frühe Dashboard-Ansicht',DESIGN/'uploads/2026-08-11_10-58-42.png',
         'Vorhandener Screenshot des Executive Dashboards mit Kennzahlen und Diagrammen.',
         'Zeigt die historische Oberfläche ohne ein großes HTML-Dokument einzubetten.','Hauptbild für Dashboard-Meilenstein',
         'Dateiname deutet auf den 11. August 2026; Entstehungszeitpunkt separat prüfen.'),
    item('LP-07-03','Standalone-Dashboard-Komponenten',STANDALONE/'Dashboard.dc.html',
         'Separates Dashboard-Gerüst aus der Standalone-Dateistruktur.',
         'Macht die Strukturierung des Dashboards nachvollziehbar.','Technischer Kontext mit Auszug',
         'Komponentendatei; nicht als eigenständiges Live-Produkt bezeichnen.'),
    item('LP-08-01','Finales LeadPilot-Logo',DESIGN/'assets/logo/leadpilot-logo-full.png',
         'Orange-türkise LeadPilot-Wort-/Bildmarke.',
         'Eindeutiger visueller Anker für den Design-Meilenstein.','Logo auf geeigneter Fläche',
         'Bytegleiche Kopien liegen auch in Logo Final und der Standalone-Dateistruktur.'),
    item('LP-08-02','Brand-Mockup: Anwendungen',DESIGN/'assets/brand/mockup-board-1.png',
         'Vier Brand-Anwendungen auf Geräten, Print und Geschäftsausstattung.',
         'Veranschaulicht das Designsystem über eine einzelne Oberfläche hinaus.','Brandbild oder Ausschnitt',
         'Mockup, kein Nachweis real produzierter Gegenstände.'),
    item('LP-08-03','LeadPilot Grotesk',DESIGN/'fonts/LeadPilotGrotesk-Regular.woff2',
         'Regular-Schnitt der Hausschrift aus dem Designsystem.',
         'Die Schrift kann mit einem echten Textbeispiel gezeigt werden.','Schriftprobe und Lizenzhinweis',
         'Modifizierte Space Grotesk; SIL Open Font License 1.1. Herkunft nennen und Lizenz mitführen.',kind='font'),
    item('LP-08-04','Farb- und Oberflächentokens',DESIGN/'tokens/colors.css',
         'CSS-Farbtokens für dunkle Flächen, Türkis, Orange und Statusfarben.',
         'Originalquelle für eine sachlich korrekte Farbübersicht.','Farb- und Komponentenbeispiel',
         'Tokens stammen aus dem Designsystem; Farbkombinationen für die Website auf Kontrast prüfen.',kind='colors'),
]

assert len(CANDIDATES) == len({x['id'] for x in CANDIDATES})
