"""Video „In etwa 90 Sekunden“ (Drehbuch v1): Szenen aus den Cap-Aufnahmen vom 31.10.2026
mit wenigen, gezielten Kamerafahrten, Sprechertext als Untertitel und Sprecher-Tonspur (Sprecher.m4a).

Aufruf: uv run --with pillow python render.py  (Ergebnis in export/, Zwischenstände in parts/)
"""
import json
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
CAP = ROOT / 'quellen' / 'cap'  # Cap-Aufnahmen, nur die im Schnitt benutzten
OUT = ROOT / 'export'
PARTS = ROOT / 'parts'
PARTS.mkdir(exist_ok=True)
FONT = str(Path.home() / 'Library/Fonts/Figtree-Medium.ttf')

MAIN = CAP / 'Cap 2026-10-31 at 14.46.27.mp4'
N8N = CAP / 'Cap 2026-10-31 at 15.33.18.mp4'
PW = ROOT / 'quellen' / 'playwright'  # Nachdreh per Playwright (aufnahme.mjs), Vollbild ohne Browserleiste
VERGLEICH = PW / 's6-vergleich.webm'
SUPABASE = PW / 's7-supabase.webm'
TREIBER = PW / 's8-treiber.webm'
SIMULATION = PW / 's6a-simulation.webm'  # Operative Simulation, Tempo 10×, Leads laufen ein
LIVE_PW = PW / 's7c-live.webm'  # Dashboard offen, Event über n8n ausgelöst, Wert springt bei 57,1 s ein
VOICE = ROOT / 'quellen' / 'Sprecher.m4a'

# Basisausschnitt ohne Browserleiste und App-Seitenleiste (Quelle 1732×1080), 16:9
BASE = (1682, 946, 50, 40)
BASE_PW = (1920, 1080, 0, 0)
# Abschnitte, deren Untertitel oben steht, weil unten die Aussage liegt (Churn-Balken, Live-Wert)
SUB_TOP = {'s4', 's7c'}
# Abschnitte ohne Untertitel (Sprechpause)
NO_SUB = {'s6a'}

TEXT = {
    1: 'LeadPilot lag 2025 bei 411.840 Euro Jahresumsatz, deutlich unter Plan. Die Frage: Wo geht der Umsatz verloren?',
    2: 'Im Funnel wird aus 1.776 Leads am Ende 47 Neukunden. Die Lücke liegt aber nicht am Anfang, sondern in der Testphase.',
    3: 'Nur 18 Prozent der Testkunden zahlen. Acht Punkte mehr wären rund 21 Kunden zusätzlich.',
    4: 'Der zweite Hebel ist Kundenbindung. Gekündigt haben fast nur Kleinstkunden. Das ist kein Service-Problem, sondern ein ICP-Problem.',
    5: 'Dazu rechnet sich die Akquise zu langsam: 13 Monate Payback, LTV zu CAC 2,7 zu 1.',
    6: 'Beide Hebel habe ich in der Simulation gegengerechnet: 30 Tage, je ein Szenario. Trial bringt fast 28.000 Euro, Churn gut 20.000.',
    7: 'Die Zahlen kommen nicht aus einer Folie. Sie liegen in Supabase, und n8n spielt neue Werte live ins Dashboard.',
    8: 'Daraus ergibt sich der Plan für 2026: fünf Hebel, die zwei größten nach dem ersten Kontakt.',
}

# Kamera nur dort, wo das Bild steht und der Zoom auf die Aussage zeigt. Wo in der App etwas
# passiert (Navigation, n8n-Durchlauf, Live-Wert springt ein), bleibt die Totale.
# Kamera: (Start s, Ende s, (x, y, Zoom) von, (x, y, Zoom) nach), x/y normiert im Basisausschnitt
TOTALE = None
SEGMENTS = [
    # Umsatz steht still: langsame Fahrt über die ganze Szene auf den ARR-Wert
    # Umsatz steht still bis 12 s; leicht verlangsamt, damit der erste Satz ganz Platz hat
    ('s1', 1, MAIN, 1.0, 11.8, 0.93, (0.3, 7.6, (0.5, 0.5, 1.0), (0.27, 0.25, 1.7))),
    ('s2', 2, MAIN, 20.0, 32.0, 1.0, TOTALE),
    # Erst die Seite aufbauen lassen, dann kurz und deutlich auf die 18 Prozent
    ('s3', 3, MAIN, 42.0, 52.0, 1.0, (4.6, 7.0, (0.5, 0.5, 1.0), (0.45, 0.72, 1.55))),
    ('s4', 4, MAIN, 45.0, 54.5, 1.0, TOTALE),
    ('s5', 5, MAIN, 57.5, 63.5, 0.6, TOTALE),
    # Laufende Simulation ohne Untertitel: Sprecher pausiert, das Bild trägt
    ('s6a', 6, SIMULATION, 10.3, 15.8, 1.0, TOTALE),
    # Vergleich steht still: leicht herangeholt, seitlich über die Versionen schwenken
    ('s6', 6, VERGLEICH, 7.5, 17.0, 0.9, (0.8, 9.2, (0.42, 0.55, 1.3), (0.62, 0.55, 1.3))),
    ('s7a', 7, SUPABASE, 8.0, 12.0, 1.0, TOTALE),
    ('s7b', 7, N8N, 8.0, 12.5, 1.0, TOTALE),
    # Zeitlupe nur rund um den Einsprung des Live-Werts: (von s, bis s, Tempo) relativ zum In-Punkt
    ('s7c', 7, LIVE_PW, 54.5, 60.0, (2.2, 3.7, 0.4), TOTALE),
    ('s8', 8, TREIBER, 2.0, 10.0, 1.0, TOTALE),
]

FADE = 0.3

# Sprechblöcke je Szene in Sprecher.m4a (s), gemessen per silencedetect und Whisper-Abgleich.
# Jeder Block wird in seiner Szene kurz nach dem Einblenden angelegt, die Pausen dazwischen trägt das Bild.
VOICE_BLOCKS = {
    1: (2.21, 12.70), 2: (13.16, 22.00), 3: (22.40, 28.39), 4: (28.87, 37.45),
    5: (37.79, 46.60), 6: (46.93, 56.61), 7: (56.99, 63.95), 8: (64.33, 71.13),
}
VOICE_LEAD = 0.4
# Szene 6 beginnt mit der laufenden Simulation (ohne Untertitel); der Sprecher setzt erst mit dem Vergleich ein
VOICE_ANCHOR = {6: 's6'}


def subtitle(scene: int, top: bool) -> Path:
    path = PARTS / f'untertitel-{scene}{"-oben" if top else ""}.png'
    img = Image.new('RGBA', (1920, 1080), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    font = ImageFont.truetype(FONT, 40)
    words = TEXT[scene].split()
    lines = [TEXT[scene]]
    if draw.textlength(TEXT[scene], font=font) > 1500:
        # zwei möglichst gleich lange Zeilen
        best = min(range(1, len(words)), key=lambda i: abs(
            draw.textlength(' '.join(words[:i]), font=font) - draw.textlength(' '.join(words[i:]), font=font)))
        lines = [' '.join(words[:best]), ' '.join(words[best:])]
    lh = 54
    widths = [draw.textlength(l, font=font) for l in lines]
    bw, bh = max(widths) + 64, lh * len(lines) + 36
    x0, y0 = (1920 - bw) / 2, (70 if top else 1080 - 70 - bh)
    draw.rounded_rectangle((x0, y0, x0 + bw, y0 + bh), radius=14, fill=(6, 20, 18, 200))
    for i, (l, w) in enumerate(zip(lines, widths)):
        draw.text(((1920 - w) / 2, y0 + 18 + i * lh), l, font=font, fill=(240, 250, 247, 255))
    img.save(path)
    return path


def camera_filter(cam, base=BASE) -> str:
    # Fahrt mit Smoothstep zwischen zwei Kamerapositionen; zoompan auf 4K-Zwischenbild gegen Ruckeln.
    bw, bh, bx, by = base
    crop = f"crop={bw}:{bh}:{bx}:{by},"
    if cam is None:
        return crop + "scale=1920:1080:flags=lanczos"
    t0, t1, (x0, y0, z0), (x1, y1, z1) = cam
    e = f"(st(0,clip((it-{t0})/{t1 - t0:.3f},0,1))*ld(0)*ld(0)*(3-2*ld(0)))"
    z = f"({z0}+{z1 - z0:.4f}*{e})"
    cx = f"({x0}+{x1 - x0:.4f}*{e})"
    cy = f"({y0}+{y1 - y0:.4f}*{e})"
    return (
        crop + "scale=3840:2160:flags=lanczos,"
        f"zoompan=z='{z}':x='clip({cx}*iw-iw/zoom/2,0,iw-iw/zoom)':"
        f"y='clip({cy}*ih-ih/zoom/2,0,ih-ih/zoom)':d=1:s=1920x1080:fps=30"
    )


def render(seg) -> Path:
    name, scene, src, tin, tout, speed, cam = seg
    target = PARTS / f'{name}.mp4'
    if isinstance(speed, tuple):
        # Tempo nur zwischen a und b ändern, davor und danach Echtzeit
        a, b, k = speed
        dur = (tout - tin) - (b - a) + (b - a) / k
        t = '(PTS-STARTPTS)*TB'
        setpts = (f"setpts='if(lt({t},{a}),{t},if(lt({t},{b}),{a}+({t}-{a})/{k},"
                  f"{a + (b - a) / k:.4f}+({t}-{b})))/TB'")
    else:
        dur = (tout - tin) / speed
        setpts = f"setpts=(PTS-STARTPTS)/{speed}"
    vf = (
        f"[0:v]{setpts},fps=30,{camera_filter(cam, BASE_PW if src.parent == PW else BASE)},"
        f"fade=in:st=0:d={FADE},fade=out:st={dur-FADE:.3f}:d={FADE}[v];"
        f"[v][1:v]overlay=0:0,format=yuv420p[out]"
    )
    if name in NO_SUB:
        vf = vf.replace("[v];[v][1:v]overlay=0:0,format=yuv420p[out]", ",format=yuv420p[out]")
    subprocess.run(
        ['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-ss', str(tin), '-t', str(tout - tin),
         '-i', str(src), '-loop', '1', '-i', str(subtitle(scene, name in SUB_TOP)), '-filter_complex', vf,
         '-map', '[out]', '-t', f'{dur:.3f}', '-an', '-r', '30', '-c:v', 'libx264', '-preset', 'medium',
         '-crf', '18', str(target)],
        check=True,
    )
    return target


def duration(path: Path) -> float:
    out = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(path)],
                         capture_output=True, text=True, check=True)
    return float(out.stdout)


def voice_starts(parts) -> dict:
    # Startzeit je Szene im fertigen Video: erstes Segment der Szene bzw. VOICE_ANCHOR
    t, seg_start, starts = 0.0, {}, {}
    for seg, part in zip(SEGMENTS, parts):
        seg_start[seg[0]] = t
        starts.setdefault(seg[1], t)
        t += duration(part)
    for scene, name in VOICE_ANCHOR.items():
        starts[scene] = seg_start[name]
    return {scene: start + VOICE_LEAD for scene, start in starts.items()}


def mix_voice(silent: Path, final: Path, starts: dict):
    chains, labels = [], []
    for i, (scene, (a, b)) in enumerate(VOICE_BLOCKS.items()):
        ms = round(starts[scene] * 1000)
        chains.append(f"[0:a]atrim={a - 0.08:.3f}:{b + 0.15:.3f},asetpts=PTS-STARTPTS,"
                      f"afade=in:d=0.05,afade=out:st={b - a + 0.13:.3f}:d=0.1,adelay={ms}|{ms}[a{i}]")
        labels.append(f"[a{i}]")
    graph = (';'.join(chains) + f";{''.join(labels)}amix=inputs={len(labels)}:normalize=0,"
             f"apad=whole_dur={duration(silent):.3f}[aout]")
    # Erst die Tonspur als WAV auf Videolänge, dann muxen (direktes Mischen beim Muxen bricht am Zeitstempel)
    track = PARTS / 'sprecher-angelegt.wav'
    subprocess.run(
        ['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', str(VOICE), '-filter_complex', graph,
         '-map', '[aout]', str(track)],
        check=True,
    )
    subprocess.run(
        ['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', str(silent), '-i', str(track),
         '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k', '-shortest',
         '-movflags', '+faststart', str(final)],
        check=True,
    )


def vtt_time(t: float) -> str:
    return f"{int(t // 60):02d}:{t % 60:06.3f}"


def write_vtt(path: Path, starts: dict):
    cues = ['WEBVTT', '']
    for scene, (a, b) in VOICE_BLOCKS.items():
        cues += [f"{vtt_time(starts[scene])} --> {vtt_time(starts[scene] + b - a + 0.3)}", TEXT[scene], '']
    path.write_text('\n'.join(cues))


def main():
    OUT.mkdir(exist_ok=True)
    parts = [render(s) for s in SEGMENTS]
    listing = PARTS / 'concat.txt'
    listing.write_text(''.join(f"file '{p}'\n" for p in parts))
    silent = PARTS / 'ohne-ton.mp4'
    final = OUT / 'leadpilot-case1-90s.mp4'
    subprocess.run(
        ['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', str(listing),
         '-c', 'copy', str(silent)],
        check=True,
    )
    starts = voice_starts(parts)
    mix_voice(silent, final, starts)
    write_vtt(OUT / 'leadpilot-case1-90s.vtt', starts)
    beleg = [
        {'segment': s[0], 'szene': s[1], 'quelle': s[2].name, 'in': s[3], 'out': s[4], 'tempo': s[5],
         'kamera': s[6], 'text': TEXT[s[1]], 'sprecher_ab': round(starts[s[1]], 2)}
        for s in SEGMENTS
    ]
    (OUT / 'schnittbeleg-90s.json').write_text(json.dumps(beleg, ensure_ascii=False, indent=2))
    print(final)


if __name__ == '__main__':
    main()
