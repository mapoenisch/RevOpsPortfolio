# Veröffentlichung auf marc-poenisch.de

## Auftrag und Umsetzung

Marc hat die Einrichtung der Veröffentlichung aus dem GitHub-Repository beauftragt.
GitHub Actions prüft und baut `gtm-portfolio`; nur der Inhalt von `dist` wird verpackt.
Ein eigener SSH-Benutzer überträgt das Paket in einen dedizierten Website-Ordner.
Versionierte Verzeichnisse und der symbolische Link `current` erlauben den Wechsel
zwischen Versionen. Die öffentliche Release-Kennung wird nach dem Wechsel geprüft;
bei fehlender Bestätigung wird die vorherige Version wieder aktiviert.
Es gibt keine automatische Löschung alter Versionen. Regelmäßig Speicher prüfen.

Alternative: Repository auf dem Server auschecken und dort bauen. Nicht gewählt,
weil für die statische Portfolio-Seite nur fertige Website-Dateien benötigt werden.

## Arbeitsschritte und Status

- [x] Repository, Build-Befehle und vorhandene GitHub-Einstellungen prüfen.
- [x] Workflow und Veröffentlichungsskript vorbereiten; Übertragung standardmäßig deaktiviert.
- [x] Bestehende Projektprüfungen, Build, YAML-Syntax und lokale Abbruchtests erfolgreich; Linux-Veröffentlichungstests folgen im GitHub-Lauf.
- [ ] Änderungen als Pull Request bereitstellen; Merge führt ausschließlich Marc aus.
- [ ] Serverzugang, Webserver, DNS und vorhandene Websites prüfen.
- [ ] Eigenen Deployment-Benutzer und dedizierten Website-Ordner einrichten.
- [ ] HTTPS und Weiterleitung für React-Unterseiten einrichten und prüfen.
- [ ] GitHub-Zugangsdaten hinterlegen, Übertragung aktivieren und online verifizieren.

## GitHub-Einstellungen

Repository-Variablen:

| Name | Zweck |
| --- | --- |
| `DEPLOY_ENABLED` | Erst nach geprüfter Servereinrichtung auf `true` setzen. |
| `DEPLOY_HOST` | Tatsächlich erreichbarer SSH-Hostname oder IPv4-Adresse. Die Webmin-Adresse ist nicht automatisch ein SSH-Zugang. |
| `DEPLOY_PORT` | SSH-Port, standardmäßig 22. |
| `DEPLOY_USER` | Eigener Benutzer mit Schreibrecht ausschließlich im Website-Bereich, kein root. |
| `DEPLOY_ROOT` | Dedizierter absoluter Website-Ordner, etwa `/var/www/marc-poenisch.de`. Vorhandene Inhalte zuvor prüfen. |

Secrets für die GitHub-Umgebung `production`:

| Name | Zweck |
| --- | --- |
| `DEPLOY_SSH_KEY` | Privater Schlüssel des Deployment-Benutzers. Niemals ins Repository schreiben. |
| `DEPLOY_KNOWN_HOSTS` | SSH-Hostschlüssel, dessen Fingerabdruck über einen unabhängigen vertrauenswürdigen Zugang bestätigt wurde. |

Der Schlüssel darf keine allgemeinen Administrationsrechte erhalten. Benötigt werden
Bash, tar, chmod, readlink und GNU mv auf einem Linux-Server. GitHub muss den SSH-Port
erreichen können; Cloudflare Access für die Webmin-Oberfläche stellt diesen Zugang
nicht automatisch bereit. Der Webserver muss die Verzeichnisse lesen und betreten dürfen.

## Webserver

Document Root: `<DEPLOY_ROOT>/current`. Vor der Aktivierung in Webmin prüfen,
ob Apache, Nginx oder eine Kombination läuft. Keinen vorhandenen Host überschreiben.
Für Apache kann im passenden Directory-Block `FallbackResource /index.html` verwendet
werden. Für Nginx im passenden `location /` die Direktive
`try_files $uri $uri/ /index.html;`. Konfiguration vor dem Neuladen prüfen.
Nur `current` öffentlich ausliefern; `state`, `incoming` und andere Serverdateien bleiben außerhalb des Website-Ordners.
`/__release.json` ohne Cache ausliefern. HTTPS-Zertifikat und automatische Erneuerung
für `marc-poenisch.de` einrichten. DNS A und gegebenenfalls AAAA müssen zum Server passen.

## Aktivierung und Abnahme

Nach Marcs Merge und geprüfter Servereinrichtung `DEPLOY_ENABLED=true` setzen und den
Workflow auf `main` starten. Pushes nach `main` veröffentlichen anschließend automatisch,
sofern alle Projektprüfungen erfolgreich sind. Pull Requests bauen ausschließlich.

Startseite, `/leadpilot`, `/nachweise` und eine konkrete Case-Unterseite direkt öffnen
und neu laden; unbekannte Route, Videos einschließlich Spulen/Untertiteln, Downloads,
Kontaktlinks und mobile Darstellung prüfen. Release-Kennung muss dem Commit entsprechen.
Der bestehende Suchmaschinen-Ausschluss (`noindex, nofollow`) bleibt unverändert;
vor einer gewünschten Suchmaschinenfreigabe bewusst gesondert entscheiden.

Die Serverprüfung ist aktuell durch eine noch nicht bestätigte Weiterleitung zur
Cloudflare-Anmeldung `alexle135.cloudflareaccess.com` blockiert.
