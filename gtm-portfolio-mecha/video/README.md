# Video „In etwa 90 Sekunden“

Quellen und Skripte für das LeadPilot-Video unter `public/media/videos/leadpilot.mp4`.

- `render.py` schneidet die Szenen, setzt Kamerafahrten und Untertitel, legt die Sprecher-Tonspur je Szene an und schreibt Video, VTT und Schnittbeleg nach `export/`.
- `quellen/cap/`: die zwei im Schnitt benutzten Cap-Aufnahmen vom 31.10.2026 (Dashboard-Rundgang, n8n-Workflow).
- `quellen/playwright/`: Nachdrehs der Szenen 6, 6a, 7a, 7c und 8, erzeugt mit `aufnahme.mjs`.
- `quellen/Sprecher.m4a`: eingesprochener Text, Zeitmarken der Sprechblöcke in `VOICE_BLOCKS`.
- `send-kpi-event.mjs`: schickt das signierte Live-KPI-Event für Szene 7c an n8n (Ablauf siehe `docs/DREHBUCH-VIDEO.md`).

Neu rendern:

```bash
uv run --with pillow python render.py
```

Danach die Web-Fassung erzeugen (`export/` und `parts/` sind nicht versioniert):

```bash
ffmpeg -i export/leadpilot-case1-90s.mp4 -c:v libx264 -preset slow -crf 25 -tune stillimage -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart ../public/media/videos/leadpilot.mp4
```
