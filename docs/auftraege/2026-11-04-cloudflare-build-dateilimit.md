# Cloudflare-Build: parallele Dateizugriffe begrenzen

Teil des Auftrags, die überarbeitete Portfolio-Startseite nach GitHub und auf die bestehende Cloudflare-Website zu übertragen.

## Beobachteter Fehler

Nach Marcs Merge von `mapoenisch/ma-poenisch-portfolio#1` brach der Produktionsbuild zum Commit `c88f1a7` ab. Cloudflare-Buildkennung: `bcd18883-ed23-4565-a3c2-ee529843e987`.

Das Protokoll zeigt beim Vite-/Rollup-Build nach 22 transformierten Modulen einen `EMFILE: too many open files`-Fehler beim Laden von `lucide-react/dist/esm/icons/message-circle-code.js`. Der Abbruch stammt aus der Buildphase, nicht aus TypeScript oder dem Upload. Die bisherige öffentliche Version bleibt aktiv.

## Änderung

In `gtm-portfolio/vite.config.ts` wird `build.rollupOptions.maxParallelFileOps` auf 64 begrenzt. Die Option begrenzt parallele Dateizugriffe beim Lesen von Modulen und Schreiben von Chunks. Keine Änderung an der Oberfläche, den fachlichen Regeln, Abhängigkeiten oder Zugriffsrechten.

Quelle: https://rollupjs.org/configuration-options/#maxparallelfileops

## Prüfung und Grenzen

- `npm run check` mit lokal auf 256 begrenzter Zahl offener Dateien erfolgreich: 17 fachliche Tests, TypeScript, Produktionsbuild und Inhalts-/Medienprüfung.
- Die erzeugten JavaScript- und CSS-Dateien sind per SHA-256 bytegleich mit dem zuvor geprüften Portfolio-Build.
- Der ungeänderte Build bestand lokal ebenfalls unter diesem Dateilimit; der Cloudflare-Fehler konnte auf diesem Mac nicht reproduziert werden. Der Fix adressiert die im Serverprotokoll belegte Fehlerklasse mit der dafür vorgesehenen Rollup-Option. Ein erfolgreicher Cloudflare-Nachtest bleibt bis zum Merge offen.
- Keine npm-Installationsskripte pauschal freigegeben und keine automatischen Abhängigkeits-Upgrades vorgenommen.

Der Änderungssatz wird auch dem getrennten PR im öffentlichen Repository zugeordnet, damit beide Website-Quellstände dieselbe Buildkonfiguration erhalten. Merge und Freigabe ausschließlich durch Marc.

## Separater Fehler im Vorschau-Check von PR #2

Der Check zum Commit `d0899b7` (Cloudflare-Build `d001d33b-8b73-4354-97f8-c22e4b0dc76c`) startete `npx wrangler preview` und brach vor dem benutzerdefinierten Website-Build ab, weil der erforderliche `previews`-Abschnitt in `wrangler.jsonc` fehlte. Dieser Check testete die Dateizugriffsbegrenzung noch nicht.

Für die reine statische Website wird ein leerer Abschnitt `"previews": {}` ergänzt. Cloudflare dokumentiert genau diese Konfiguration für Worker ohne besondere Vorschau-Bindungen. Workername, Buildkommando, Assetverzeichnis und SPA-Fallback bleiben unverändert; keine neuen Datenbindungen oder Geheimnisse.

Quelle: https://developers.cloudflare.com/workers/previews/configuration/#wrangler-configuration-file

Prüfung vor dem Push: JSON erfolgreich geparst; der Produktionskonfigurationsinhalt ist bis auf den neuen leeren Vorschauabschnitt unverändert. Der eigentliche Vorschau-Build wird anschließend durch Cloudflare geprüft.
