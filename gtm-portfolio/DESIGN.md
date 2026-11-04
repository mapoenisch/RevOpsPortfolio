---
name: "Marc Pönisch – Hauptportfolio"
description: "Die strukturierte Arbeitsmappe: klar, sachlich und zugänglich."
colors:
  primary: "#244fcd"
  primary-hover: "#183ba6"
  primary-soft: "#eef2ff"
  ink: "#202632"
  muted: "#626b79"
  line: "#dfe3e9"
  canvas: "#f8f9fb"
  paper: "#fff"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(52px,6.1vw,82px)"
    fontWeight: 600
    lineHeight: 1.07
    letterSpacing: "-.065em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(30px,3.2vw,46px)"
    fontWeight: 600
    lineHeight: 1.18
    letterSpacing: "-.055em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-.035em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    letterSpacing: ".14em"
rounded:
  button: "7px"
  control: "6px"
  card: "10px"
  demo: "12px"
  feature: "14px"
spacing:
  button-gap: "18px"
  button-padding-y: "12px"
  button-padding-x: "20px"
  gutter: "48px"
  gutter-tablet: "32px"
  gutter-mobile: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.paper}"
    rounded: "{rounded.button}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-quiet:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "12px 20px"
  filter:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "9px 13px"
  filter-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  certificate-card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.card}"
    padding: "27px"
---

# Design System: Marc Pönisch – Hauptportfolio

## Overview

**Creative North Star: "Die strukturierte Arbeitsmappe"**

Die Gestaltung ist klar, sachlich und zugänglich. Große, eng laufende Überschriften geben Orientierung; helle Flächen, feine Rahmen und kompakte Metadaten gliedern die Arbeitsproben. Blau markiert Aktionen und ausgewählte inhaltliche Akzente. Buttons, Karten und Eingabefelder wirken ruhig, leicht gerundet und funktional.

Geltungsbereich ist ausschließlich `gtm-portfolio/`. Grundlage sind `src/style.css`, die gezielten Ergänzungen in `src/home.css`, die Komponenten in `src/App.tsx` und `src/Demos.tsx` sowie die ergänzenden Stylesheets. Die Begriffe wurden von Marc am 4. November 2026 bestätigt. Dies ist eine Bestandsdokumentation, kein Redesign.

**Key Characteristics:**
- Helle, kühl neutrale Flächen mit gezielten blauen Akzenten.
- Manrope für Überschriften, DM Sans für Lesetext und Bedienung.
- Leichte Rundungen, dünne Rahmen und zurückhaltende Schatten.
- Kompakte Demonstrationen innerhalb großzügiger Seitenabschnitte.

Am 4. November 2026 wurden die Änderungen an der laufenden Startseite auf Desktop und Mobil visuell betrachtet. Die Browserprüfung umfasst sieben Routen bei 1440, 768, 375 und 320 px sowie vier Demo-Testfälle pro Startseitenbreite, die Tastaturbedienung des Datenbereichs und die Fehlerhilfe. Es wurden keine horizontalen Überläufe oder automatisiert auffindbaren WCAG-A/AA-Probleme gemeldet. Das ersetzt keine vollständige manuelle Barrierefreiheitsprüfung oder einen Test auf physischen Mobilgeräten.

## Colors

Die Palette verbindet Klares Königsblau mit neutralen Text-, Rahmen- und Papierfarben. Die verbindlichen Werte stehen im Frontmatter.

### Primary
- **Klares Königsblau** (`primary`): Hauptaktionen, Links im Hover, Fokus und kleine quadratische Marker.
- **Vertieftes Königsblau** (`primary-hover`): Hover der blauen Hauptaktion.
- **Helles Blaufeld** (`primary-soft`): unterstützende Akzentflächen.

### Neutral
- **Druckfarbe** (`ink`): Überschriften und primäre Texte.
- **Schiefergrau** (`muted`): erklärende Texte und Metadaten.
- **Trennlinie** (`line`): Rahmen und Abschnittsgrenzen.
- **Kühles Papier** (`canvas`): Seitenhintergrund.
- **Weißes Blatt** (`paper`): Karten, Demos und Dialoge.

**The Kontextfarben Rule.** Grüne Ergebniszustände sowie violette und grüne Projektvorschauen bleiben an ihre Komponenten gebunden. Die dunklen grün-türkisen LeadPilot-Medien sind Teil der gezeigten Projektidentität; sie ersetzen nicht die Portfolio-Palette.

## Typography

**Display Font:** Manrope, sans-serif. **Body Font:** DM Sans, sans-serif. Beide Familien werden lokal eingebunden. Technische Metadaten verwenden stellenweise ui-monospace und System-Fallbacks.

### Hierarchy
- **Display:** Der Frontmatter-Wert beschreibt die Desktop-Heroüberschrift. Ab 1600 px wird sie 90 px groß; unter 1100 px 64 px, unter 850 px 52 px. Die Startseite überschreibt die Basisskala unter 850 px mit `clamp(52px,7vw,64px)` und unter 620 px mit `clamp(46px,10.9vw,67px)` in `src/home.css`.
- **Headline / Title:** Die Frontmatter-Werte sind globale Ausgangswerte. Abschnitte und Case-Seiten besitzen gezielte Overrides.
- **Body:** Absätze haben global die angegebene Zeilenhöhe, aber keine eigene globale Schriftgröße. Die Basisdatei enthält kontextabhängige Größen. Auf der überarbeiteten Startseite liegen wesentliche Lesetexte auf Mobilgeräten bei 16 px, unterstützende Metadaten überwiegend bei 12–14 px. Die Routing-Auswahl verwendet 16 px, ihre Aktion 14 px und ihre Beschriftung 13 px. Diese Rollen sind in `src/home.css` definiert; sie ersetzen keine globale Schriftgrößenskala.
- **Label:** Kleine, fette Versalien mit vergrößerter Laufweite; technische Labels können monospace sein.

**The Kontexttypografie Rule.** Die Website besitzt keine durchgängig mathematische Schriftgrößenskala. Bestehende Rollen und responsive Overrides übernehmen, statt jede Überschrift auf den Hero-Wert zu setzen.

## Layout

Die Startseite folgt seit der Überarbeitung vom 4. November 2026 dem Weg Einstieg → Arbeitsproben → Profil → Nachweise → ergänzende Chronik → Kontakt. Die wiederholende Fokusleiste, der separate Arbeitsweise-Abschnitt und der zusätzliche Chronik-Sprungbutton sind entfallen. Pro Arbeitsprobe wird eine vorhandene fachliche Entscheidung ausdrücklich genannt.

Der zentrale Container ist einschließlich Seitenpadding maximal 1280 px breit, ab 1600 px 1400 px. Die seitlichen Abstände folgen den dokumentierten Gutter-Werten; unter 360 px sind es 19 px. Der Desktop-Hero nutzt zwei Spalten im Verhältnis 1.05 zu .95 mit 65 px Abstand. Unter 1100 px werden es zwei gleich breite Spalten mit 32 px Abstand; unter 850 px wird der Hero einspaltig. Die Demo erhält dabei maximal 600 px Breite.

Die Arbeitsproben stehen zunächst in drei Spalten mit 23 px Abstand. Unter 850 px werden sie zu einspaltigen Reihen mit Bild und Text nebeneinander; unter 620 px stehen Bild und Text untereinander. Das mobile Menü erscheint unter 620 px. Case-Seiten kombinieren eine 180 px breite Inhaltsnavigation mit der Inhaltsspalte und 68 px Abstand; unter 850 px wird die Inhaltsnavigation horizontal umgebrochen.

Die Hauptdatei enthält Breakpoints bei 1600, 1100, 850, 620 und 360 px. Die Chronik ergänzt Regeln bei 900, 760 und 700 px; diese sind Teil des bestehenden Systems, keine abgelöste globale Skala. Große Abschnittsabstände und kleine Metadatenabstände sind kontextabhängig, kein einheitliches Spacing-Raster.

## Elevation & Depth

Helle Hintergründe und dünne Rahmen trennen die meisten Flächen. Hauptaktionen und eingebettete Demos erhalten dezente Schatten. Dialoge heben sich mit einem deutlich stärkeren Schatten und abgedunkeltem Hintergrund ab.

### Shadow Vocabulary
- **Hauptaktion:** `0 3px 5px #1d3e9f12`.
- **Routing-Demo:** `0 15px 40px #25395d08`.
- **Medien- und Diagrammdialog:** `0 20px 100px #0005`; der Bilddialog ergänzt einen abgedunkelten, um 3 px weichgezeichneten Hintergrund.

## Shapes

Leichte Rundungen unterscheiden die Rollen: Buttons, Bedienfelder, Karten und Demos besitzen jeweils eigene Werte im Frontmatter. Kreisförmige Avatare, Statuspunkte und Link-Pfeile sind bewusste Ausnahmen. Rahmen sind meist 1 px stark. Das deklarierte `--radius` ist kein überall angewandter Einheitsradius.

## Components

### Buttons
Ruhig und funktional. Primär blau mit weißem Text, sekundär weiß mit neutralem Rahmen. Die Grundform hat mindestens 46 px Höhe, 13 px Schriftgröße, Gewicht 600 und die im Frontmatter angegebenen Abstände. Hover vertieft die Hauptfarbe und verschiebt den Button um 1 px nach oben. Die Transition dauert .18 s. Kompakte Demos und mobile Heroaktionen überschreiben diese Maße. Demo-Auswahl, Demo-Aktion, Reset, Daten-Aufklapper und die Arbeitsproben-Links besitzen in der aktuellen Startseite mindestens 44 px hohe Bedienflächen. Die Arbeitsproben-Links sind neutral gerahmt mit blauem Text und erhalten im Hover eine helle Akzentfläche.

### Chips
Filter haben einen neutralen Rahmen und eine weiße Fläche. Der aktive Filter wechselt zu Druckfarbe mit weißem Text. Die Form und Innenabstände sind im Frontmatter dokumentiert. Statuslabels kombinieren Text und einen Punkt; Farbe allein vermittelt den Zustand nicht.

### Cards / Containers
Nachweiskarten sind weiß, dünn gerahmt und leicht gerundet; ihre Basis-Innenabstände stehen im Frontmatter. Projektkarten besitzen eine separate Bildfläche und darunter offenen Text, statt einen durchgehend geschlossenen Kartenrahmen. Die Routing-Demo verwendet eine eigene Rundung und einen dezenten Schatten.

### Inputs / Fields
Suchfelder verwenden einen gerahmten Wrapper mit 6 px Rundung und horizontal 11 px Padding. Das innere Feld ist transparent und rahmenlos. `focus-within` hebt den Wrapper mit einer 2 px starken Akzentkontur und 2 px Abstand hervor. Selects haben weißes Papier, einen neutralen Rahmen und eigene kompakte Maße.

### Navigation
Die Desktop-Kopfzeile ist 88 px hoch, die Navigation kompakt und horizontal. Aktive Links sind blau. Unter 620 px wird sie durch ein ausklappbares Menü ersetzt. Die allgemeine Tastaturfokus-Markierung ist 3 px stark mit 5 px Abstand. Der fokussierte Haupttitel unterdrückt die Kontur gezielt; daraus folgt keine Regel für Bedienelemente.

### Routing-Demo

Auf der Startseite ist die Demoüberschrift eine H2, auf der Routing-Unterseite eine H3. Ein nativer Details-Bereich macht Eingangsadresse, Unternehmen, Unternehmensgröße und Zuständigkeitsregel per Tastatur zugänglich. Die ausführliche Routing-Demo zeigt diese Angaben direkt. Fehlende Angaben und unvollständige Übergaben nutzen ein Warnsymbol; Erfolgs- und Dublettenfälle ein Häkchen. Fehler nennen den erreichten Zwischenstand und den nächsten fachlichen Schritt. Ein Hinweis unterscheidet ausdrücklich den neuen Browser-Demolauf von der Fortsetzung eines echten Vorgangs. Reset stellt auch den ursprünglichen Testfall wieder her.

### Dialoge und Projektmedien
Bild- und Diagrammdialoge besitzen große Ansichtsflächen, Schließen-Bedienung sowie im Diagramm Zoom und Verschieben. Bilder bleiben als Projektbelege erkennbar. Die LeadPilot-Chronik umfasst eigene dunkle Medienflächen und eine lokal verwendete LeadPilotGrotesk-Schriftprobe.

Bei reduzierter Bewegung werden Animationen und Transitionen deaktiviert und weiches Scrollen abgeschaltet.

## Do's and Don'ts

### Do:
- **Do** Kontextfarben und Projektdesigns innerhalb ihrer bestehenden Komponenten halten.
- **Do** die jeweiligen responsiven Rollen und Komponentenmaße übernehmen.
- **Do** Tastaturfokus, Textzustände und reduzierte Bewegung berücksichtigen.

### Don't:
- **Don't** den Hero-Schriftgrad oder den allgemeinen Radius auf alle Komponenten übertragen.
- **Don't** die Projektidentität von LeadPilot mit der Portfolioidentität gleichsetzen.
