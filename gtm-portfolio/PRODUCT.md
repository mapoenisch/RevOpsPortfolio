# Marc Pönisch – Bewerbungsportfolio

<!-- impeccable:product-schema 1 -->

## Platform

web

## Geltungsbereich

Dieser Produktkontext gilt ausschließlich für das Hauptportfolio in `gtm-portfolio/`. Marc hat den Geltungsbereich am 4. November 2026 entsprechend eingegrenzt. Die Initialisierung und ihre Workflow-Vorgaben gelten nur innerhalb dieses App-Ordners.

## Users

Recruiter und fachlich Verantwortliche für Digital Sales, CRM, Sales Operations und Revenue Operations. Sie wollen Marcs Fähigkeiten und Arbeitsweise anhand nachvollziehbarer Arbeitsproben und Nachweise einschätzen und bei Interesse Kontakt aufnehmen.

## Product Purpose

Das deutschsprachige Bewerbungsportfolio macht Marcs Vertriebserfahrung, fachliche Entscheidungen und praktische Arbeit an digitalen Vertriebsprozessen prüfbar. Besucher können Arbeitsproben untersuchen, deren Ergebnisse und Grenzen verstehen, Qualifikationen einsehen, den Lebenslauf herunterladen und Kontakt aufnehmen. Erfolg bedeutet, eine fundierte Einschätzung und eine passende Kontaktaufnahme zu ermöglichen. Quantitative Erfolgsziele sind noch nicht festgelegt.

## Positioning

Das Portfolio verbindet B2B-Vertriebspraxis mit selbst erarbeiteten CRM-, Automations- und Analyseprojekten. Es erklärt fachliche Anforderungen, Entscheidungen, Ergebnisse und Grenzen. Marcs Beitrag ist die fachliche Konzeption, Steuerung und Prüfung; die Umsetzung mit KI-Coding-Agenten wird transparent benannt. Eine belegte Alleinstellung gegenüber anderen Bewerbern ist nicht festgelegt.

## Operating Context

- Das Hauptportfolio ist eine bestehende React-/TypeScript-Website mit Vite und Tailwind CSS.
- Der App-Ordner ist `gtm-portfolio/`. Alle nachfolgenden relativen Dateipfade beziehen sich auf diesen Ordner.
- Laut Vite-Konfiguration startet `npm run dev` im App-Ordner die Website auf `http://127.0.0.1:4317/`.
- Die Portfolio-Website kann ohne laufendes LeadPilot, n8n, HubSpot oder Ollama genutzt werden. Separate Integrationsdienste und Testläufe sind von den eingebetteten Browser-Demos zu unterscheiden.
- Bestehende Inhalte liegen insbesondere in `src/content.ts`, `src/App.tsx` und `src/LeadPilotChronik.tsx`; Medien und Downloads unter `public/`.

## Capabilities and Constraints

- Drei Arbeitsproben: LeadPilot als Dashboard-CRM für ein fiktives B2B-SaaS-Szenario, Inbound-Lead-Routing und regelbasierte Profilpriorisierung mit ergänzender KI-Auswertung.
- Eigene Case-Seiten, LeadPilot-Projektchronik, Nachweisübersicht und Lebenslauf-Download. Kontakt über die vorhandenen Kontakt- und Profillinks.
- Die Routing-Demo im Browser verwendet ein simuliertes CRM. Ein separat dokumentierter n8n-/HubSpot-Test ist kein fortlaufender Live-Zugriff aus der Website.
- Die Prospecting-Demo verwendet synthetische Profile und einen gespeicherten Laufbericht. Kontaktentwürfe belegen keinen Nachrichtenversand.
- LeadPilot ist das fiktive Fallstudien-Unternehmen aus Marcs Weiterbildung. Szenariozahlen, Simulationen, historische Importe und tatsächlich ausgeführte Integrationen müssen eindeutig unterschieden werden.
- Bestehende Tests, Quellenangaben, Medien, Downloads und fachliche Regeln bei Designarbeiten erhalten, soweit der konkrete Auftrag keine Änderung verlangt.
- Veröffentlichung, Domain, Integrationszustand und Teststände sind veränderlich. Vor entsprechenden Aussagen die zuständigen aktuellen Quellen prüfen. Ältere README-Aussagen sind kein Beleg des heutigen Betriebsstands.

## Brand Commitments

- Persönliches Bewerbungsportfolio von Marc Pönisch.
- Sprache: Deutsch; klar, direkt und verständlich. Fachbegriffe erklären, wenn sie für die Zielgruppe nicht selbstverständlich sind.
- Weiterbildung zum Digital Sales Manager, keine Umschulung.
- Bestehende persönliche Angaben, Qualifikationen und Nachweise als überprüfbare Fakten behandeln; neue Behauptungen nur mit entsprechender Grundlage aufnehmen.

## Evidence on Hand

- `public/nachweise/`, `public/downloads/`, `public/media/` und `public/leadpilot/assets/` für Qualifikationen, Lebenslauf und Projektmedien.
- `public/data/media.json`, `public/data/routing-report.json` und `public/data/prospecting-report.json` als Medienzuordnung und gespeicherte Laufberichte.
- Quellen und Herkunft sind unter `docs/QUELLEN.md` und `evidence/` dokumentiert. Für eine konkrete Behauptung den passenden Nachweis lesen; die bloße Existenz eines Berichts bestätigt keinen aktuellen Live-Zustand.
- Authentische Anwendungsaufnahmen und nachvollziehbare Herkunft erhalten. Generierte Visuals dürfen nicht als Aufnahmen tatsächlich ausgeführter Integrationen oder als Kundenbelege ausgegeben werden.
- Keine Kundenergebnisse, Referenzkunden, Testimonials oder Leistungsbenchmarks erfinden.

## Product Principles

1. Fachliche Fähigkeiten durch nachvollziehbare Arbeitsproben belegen.
2. Marcs eigenen Beitrag und den Einsatz von KI transparent machen.
3. Fiktion, Simulation, gespeicherte Ergebnisse und überprüfte Ausführung klar kennzeichnen.
4. Recruitern und fachlich Verantwortlichen eine verständliche Prüfung und Kontaktaufnahme ermöglichen.
5. Neue Inhalte und Gestaltungsentscheidungen an den belegten Produktfakten ausrichten.

## Offene Entscheidungen

- Keine zusätzlichen quantitativen Bewerbungs- oder Kontaktziele festgelegt.
- Kein zusätzlicher produktspezifischer Barrierefreiheitsstandard bestätigt. Die vorhandenen Prüfungen und Funktionen sind bei späteren Änderungen zu berücksichtigen.
