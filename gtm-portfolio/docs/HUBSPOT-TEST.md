# Externer Routing-Test · 27.10.2026

Der tatsächliche Ablauf **n8n-Webhook → lokales Gateway → HubSpot-Testkonto** ist bestanden. Der bereinigte Beleg ist `public/data/routing-report.json` und auf der Case-Seite herunterladbar.

## Geprüfter Umfang

| Fall | Erwartung | Ergebnis |
| --- | --- | --- |
| Anfrage mit 12 Beschäftigten | Inside-Sales-Regel, Kontakt und Folgeaufgabe | 201, angenommen |
| Gleiches Event wiederholen | Keine neue Anlage | 200, Dublette |
| Neue Event-ID, E-Mail großgeschrieben mit Leerzeichen | Normalisieren, keine neue Anlage | 200, Dublette |
| Anfrage mit 120 Beschäftigten | Account-Management-Regel, Kontakt und Folgeaufgabe | 201, angenommen |
| Beide Wiederholungen beim zweiten Weg | Keine neue Anlage | zweimal 200, Dublette |
| Unternehmen als Pflichtangabe fehlt | Zur manuellen Prüfung aussondern | 422, Prüfung erforderlich |
| Webhook ohne Header-Schlüssel | Zugang verweigern | 403 |

Kontakt und Aufgabe wurden nach beiden erfolgreichen Eingängen per HubSpot-API zurückgelesen. Owner, Kontaktverknüpfung und die Anzahl nach Wiederholungen stimmen: je ein Kontakt und eine Aufgabe. Nach Marcs ausdrücklicher Bestätigung verwenden beide Wege denselben tatsächlichen Owner **Marc Pönisch**. Eine Verteilung an zwei unterschiedliche Personen wurde nicht geprüft.

## Durchführung und Grenzen

- n8n 2.45.4 wurde im Projektcache installiert und mit einer eigenen neuen lokalen Datenbank regulär eingerichtet. Bestehende n8n-Instanzen und Benutzerkonten wurden nicht verwendet.
- Webhook und Gateway verwenden zwei getrennte zufällige Header-Schlüssel. HubSpot-Zugangsdaten liegen ausschließlich im Gateway-Prozess und der privaten Konfiguration.
- Nach dem Test wurde der eigene Workflow deaktiviert und die n8n-Instanz beendet. Die Website benötigt keinen dieser Dienste zur Anzeige.
- Testadressen liegen unter der reservierten Domain `example.com`. Kontakte und Aufgaben sind als synthetische Portfolio-Tests markiert. Die ersten Versuche mit `.example` wurden von HubSpot als ungültige E-Mail zurückgewiesen; das Gateway gab kontrolliert einen Fehler zurück. Eine Regression prüft die erlaubten Beispieldomains und die Sperre echter Domains.
- Die HubSpot-Suche kann neue Daten verzögert anzeigen. Die Rückleseprüfung wartet begrenzt und prüft die Datensätze zusätzlich direkt anhand der zurückgegebenen IDs.
- Synthetische Datensätze aus direkten Tests, Wiederholungsversuchen und dem abschließenden n8n-Lauf bleiben zur Nachprüfung im Testkonto. Die genauen IDs und Adressen sind ausschließlich in `evidence/private/hubspot-*.json` und dem lokalen Gateway-Zustand dokumentiert.
- Die Website und das Video zeigen eine lokale Simulation. Der externe Lauf wird durch den separaten Bericht belegt. Es gibt keine gemessene Kundennutzung, Zeitersparnis oder produktive Integrationsfreigabe.

## Wiederholen

`node scripts/check-hubspot.mjs` prüft Portal und Owner ohne Schreibzugriff. `node scripts/test-n8n.mjs --write-synthetic` führt den vollständigen Test erneut aus und erzeugt dafür neue synthetische Datensätze. Voraussetzungen und Installation stehen in der README. Berichte aus fehlgeschlagenen Versuchen werden nicht als Erfolg veröffentlicht.
