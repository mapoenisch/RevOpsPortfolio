# Quellen und Aussagegrenzen

## Grundlage

- Vom Nutzer benannter Chatverlauf `Chatverlauf_ GTM & RevOps Online-Portfolio.md` im übergeordneten Workspace. Enthält Entwürfe und Beispielbehauptungen, keine verbindlichen Nachweise.
- Originalprojekt `/Users/marcpoenisch/Projekte/LeadPilot Dashboard-CRM`, insbesondere README, Architekturentscheidungen, CRM-Seiten, Datenquellenadapter und `tools/n8n/`.
- Original-Lebenslauf `/Users/marcpoenisch/Projekte/Jobsuche 2026/Lebenslauf Marc Pönisch.dc.html` (Dateiname kann Unicode-Normalisierung verwenden).
- Original-Zertifikate aus `Jobsuche 2026`; genaue Pfade und Hashes in `evidence/asset-sources.json`. Das aktuelle Porträt wurde von Marc als `Untitled Project Kopie.png` im Portfolio-Workspace geliefert und auf seinen Wunsch übernommen; unverändertes Motiv mit WebP-Konvertierung.
- Alle sechs unterschiedlichen Abschlüsse im Originalordner `Zertifikate/Anthropic Academy` sind eingebunden: Claude 101, Claude Code 101, Claude Platform 101, Claude Code in Action, Introduction to Model Context Protocol und Model Context Protocol: Advanced Topics. Titel und Name wurden auf den Originalbildern geprüft; die PNG-Kopien sind bytegleich. Die Zertifikate nennen kein sichtbares Abschlussdatum, daher wird keines aus Dateinamen oder Dateimetadaten abgeleitet. Die parallel vorliegenden PDFs werden als dieselben sechs Abschlüsse behandelt.

## Übernommene und korrigierte Aussagen

| Aussage im Chat | Prüfergebnis | Darstellung im Portfolio |
| --- | --- | --- |
| LeadPilot als Dashboard/CRM | Im Quellprojekt vorhanden | Vorhandene Anwendung für ein fiktives Unternehmen |
| HubSpot-/n8n-Anbindung | Offline-Baseline-Import und separater Live-KPI-Ingest vorhanden | Kein behaupteter aktueller HubSpot-End-to-End-Lauf |
| Next-Best-Action-Engine | In dieser Prüfung nicht als beschriebener Deal-Automatismus nachgewiesen | Bezeichnung nicht verwendet |
| 2 statt 6–8 Klicks | Keine passende Messung vorgelegt | Nicht übernommen |
| 15 Minuten auf unter 10 Sekunden | Kein dokumentierter Benchmark | Nicht übernommen |
| 100 % Datenhygiene | Kein Nachweis für einen produktiven Datenbestand | Lokale, einzeln benannte Prüffälle |
| KI-Prospecting | Im genannten App-Projekt nicht nachgewiesen | Neue separate Demo mit 50 synthetischen Profilen |
| Englische Sprachkompetenz „fließend“ | Original-Lebenslauf nennt gute Kenntnisse und DET 92 | Gute Kenntnisse; kein behauptetes C1/C2-Niveau |

## KI-Modellläufe

- Erster Lauf: `qwen3:0.6b`, 34 gültige Einschätzungen, zwei verworfene Antworten, 24 Kontaktentwürfe. Bericht in `evidence/prospecting-qwen06.json`. Sprachliche und fachliche Qualität reichte teilweise nicht aus.
- Zweiter Lauf: `qwen3:1.7b` mit kürzerer, präziserer Aufgabenstellung. Aktueller vollständiger Bericht in `public/data/prospecting-report.json`: 36 gültige Einschätzungen, 25 Entwürfe, 14 regelbasiert ausgesonderte Profile, keine Cloud-Aufrufe.
- „Gültig“ bezeichnet die Schema- und Typprüfung. Es ist kein pauschales Urteil über fachliche Qualität.
- Die Kontaktfrage ist bewusst allgemein gehalten. Keine behauptete individuelle Recherche oder Personalisierung. Kein Versand.
- Modellname, Laufzeit, Tokenzahlen und tatsächliche Aufrufe werden im Bericht getrennt protokolliert. Keine abgeleitete Zeit- oder Kostenersparnis gegenüber einem nicht gemessenen Ausgangsprozess.

## Medien und externe Testnachweise

- Authentifizierte LeadPilot-Aufnahmen und Walkthrough sind nach der regulären Anmeldung ergänzt: Dashboard, Kontakte, gefilterte Deal-Pipeline und ARR-Detail. Der Kontakt ist als synthetischer Datensatz in `supabase/seed.sql:265` belegt. Keine alten Testbilder, nachgebauten Ansichten oder Loginbilder als Ersatz.
- Der LeadPilot-Walkthrough besteht aus tatsächlichen Browserframes. Wartepausen zwischen Aufnahmeblöcken wurden gekürzt und der Ablauf auf 90 Sekunden geschnitten. Die Aufnahme ist kein Zeitbenchmark. Hashes, Originale und Metadaten liegen in `evidence/`.
- n8n-/HubSpot-Testlauf: Nach Marcs Bestätigung wurden beide Wege dem aktiven Owner Marc Pönisch zugeordnet. Token, Testportal und korrigierte Owner-IDs wurden geprüft. Vollständiger Webhook-Test mit n8n 2.45.4: zwei synthetische Anfragen, je zwei Wiederholungen und ein Pflichtfeldfehler. Je ein Kontakt und eine verknüpfte Aufgabe durch API-Rücklesen bestätigt; Header-Auth ohne Schlüssel ergibt 403. Bereinigter Beleg: `public/data/routing-report.json`. Konkrete Testadressen und IDs bleiben privat.
- Die Videoaufnahme zu Case 2 zeigt weiterhin die lokale Browser-Demo; der externe Test ist separat dokumentiert. Beide Zuständigkeitsregeln verwenden im Test denselben tatsächlichen Owner. Kein Nachweis für eine produktive Integration oder Verteilung an zwei Personen.
- HubSpot wies `.example` mit `INVALID_EMAIL` zurück. Der erfolgreiche Test verwendet reservierte `example.com`-Adressen. Die Rückleseprüfung berücksichtigt verzögerte Suchindizes. Die Schutzregel gegen echte Empfängerdomains wurde per Regressionstest geprüft.
- Drei SVG-Vorlagen von Marc wurden mit seiner ausdrücklichen Erlaubnis fachlich und grafisch für das Portfolio überarbeitet. Originale bleiben erhalten. Die Versionen zeigen ausschließlich die vorhandene LeadPilot-Architektur beziehungsweise die tatsächlich geprüften eigenständigen Demos. Änderungen und Originalpfade: `docs/DIAGRAMME.md`; Hashes und Kontrollbilder: `evidence/diagrams.json`.

## Technische Referenzen

- https://vite.dev/config/server-options
- https://tailwindcss.com/docs/installation/using-vite
- https://docs.ollama.com/capabilities/structured-outputs
- https://docs.ollama.com/api/chat
- https://developers.hubspot.com/docs/api-reference/legacy/crm/objects/contacts/guide
- https://developers.hubspot.com/docs/api-reference/legacy/crm/activities/tasks/guide
- https://www.iana.org/domains/reserved
- https://docs.n8n.io/hosting/installation/npm/

Gestalterischer Referenzrahmen: Linear, Stripe und Vercel. Der Entwurf ist eigenständig und übernimmt keine Komponenten oder Texte des älteren Portfolio-Entwurfs.
