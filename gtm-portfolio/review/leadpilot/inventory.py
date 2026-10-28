#!/usr/bin/env python3
"""Read-only inventory. JSON is written to stdout; source files are never modified."""
from __future__ import annotations

import concurrent.futures
import hashlib
import json
import re
import subprocess
import sys
import unicodedata
import zipfile
from collections import Counter, defaultdict
from datetime import datetime
from pathlib import Path
from xml.etree import ElementTree
from zoneinfo import ZoneInfo

BASE = Path('/Users/marcpoenisch/Documents/DBA Batch 8')
PROJECT = Path('/Users/marcpoenisch/Projekte/LeadPilot - Eine fiktive Geschäftsidee')

def roots():
    result = []
    for p in BASE.iterdir():
        match = re.match(r'^(\d+)\.(\d+)\.(\d+)', p.name)
        if not p.is_dir() or not match:
            continue
        n = tuple(map(int, match.groups()))
        if ((2,1,11) <= n <= (2,3,9) or (2,3,13) <= n <= (2,4,3)
                or n == (2,5,4) or n >= (2,8,1)):
            result.append(p)
    result.sort(key=lambda p: tuple(map(int, re.match(r'^(\d+)\.(\d+)\.(\d+)', p.name).groups())))
    return result + [BASE / 'Power-Friday/Kunden-Pitch(2.8)', BASE / 'Power-Friday/Team-Pitch(2.9)', PROJECT]

def norm(s):
    return unicodedata.normalize('NFC', s).lower()

def milestone(path, excerpt):
    s = norm(str(path))
    name = norm(path.name)
    if '.git' in path.parts or path.name == '.DS_Store' or path.name.startswith('~$'):
        return None, 'Verwaltung / Sperrdatei'
    if path.is_relative_to(PROJECT):
        if 'leadpilot-designsystem' in s or '/logo final/' in s:
            return 8, 'Designsystem / Marke'
        if 'standalone-dashboard' in s or 'unternehmens_dashboard' in name:
            return 7, 'Unternehmensdashboard / Komponenten'
        if 'unternehmensdaten-projekt kontext' in s:
            if '2.1.11' in name or 'businessmodelcanvas' in name or 'geschaeftsidee' in name:
                return 1, 'Geschäftsidee / Konzept'
            if 'marketing' in name or 'expo' in name or 'persona' in name:
                return 2, 'Marketing / Zielkunden'
            return 3, 'Fiktive Unternehmensdaten / Kontext'
        if '/marketing/' in s or 'leadpilot-expo-marketingpaket' in s:
            if path.suffix.lower() in ('.mp4', '.webm', '.m4a'):
                return 5, 'Werbeclip / Audio'
            if any(x in name for x in ('qualifizierung', 'workflow', 'problem zur demo', 'kpi-board')):
                return 6, 'Diagramm / Prozessvisualisierung'
            if path.suffix.lower() == '.pptx':
                return 4, 'Pitch / Präsentation'
            return 2, 'Marketing / Content'
        return None, 'Projektkontext / Zuordnung prüfen'
    if '/power-friday/' in s:
        return 4, 'Pitch / Team-Pitch'
    match = re.search(r'/2\.(\d+)\.(\d+)', s)
    if not match:
        return None, 'Kurskontext'
    chapter, lesson = map(int, match.groups())
    if chapter == 1 and lesson == 11:
        return 1, 'Geschäftsidee / Kick-off'
    if chapter == 1 and lesson in (12,13,14):
        return 2, 'Zielkunde / Content'
    if chapter == 8 or (chapter == 5 and lesson == 4):
        return 4, 'Pitch / Gesprächskontext'
    if chapter == 9:
        return {1:1,2:2,3:2,4:6}.get(lesson), 'Recap / Kurskontext'
    return None, 'Kurskontext; keine direkte Meilensteinzuordnung'

def clean(s):
    return ' '.join(re.sub(r'[\x00-\x1f]+', ' ', s).split())

def ooxml(path):
    with zipfile.ZipFile(path) as z:
        names = [n for n in z.namelist() if n == 'word/document.xml'
                 or re.fullmatch(r'ppt/slides/slide\d+\.xml', n)
                 or n == 'xl/sharedStrings.xml'
                 or re.fullmatch(r'xl/worksheets/sheet\d+\.xml', n)]
        names.sort(key=lambda n: (int(re.search(r'(\d+)\.xml$', n).group(1)) if re.search(r'(\d+)\.xml$', n) else 0, n))
        chunks = []
        for name in names:
            try:
                root = ElementTree.fromstring(z.read(name))
                chunks.extend(node.text or '' for node in root.iter() if node.tag.split('}')[-1] in ('t','v'))
            except (ElementTree.ParseError, KeyError):
                continue
        return clean(' '.join(chunks))

def inspect(path):
    st = path.stat()
    ext = path.suffix.lower()
    kind = ext[1:] if ext else 'ohne Endung'
    status = 'Metadaten erfasst'
    text = ''
    detail = ''
    sha = None
    try:
        if '.git' in path.parts:
            detail = 'Datei der Git-Versionsverwaltung ohne fachlichen Chronikinhalt.'
            status = 'Verwaltung; Inhalt nicht ausgewertet'
        elif path.name == '.DS_Store' or path.name.startswith('~$'):
            detail = 'Finder-Verwaltungsdatei.' if path.name == '.DS_Store' else 'Temporäre Office-Sperrdatei und kein eigenständiges Dokument.'
            status = 'Verwaltung / Sperrdatei'
        else:
            sha = hashlib.sha256(path.read_bytes()).hexdigest()
            if ext == '.pdf':
                proc = subprocess.run(['pdftotext', '-layout', str(path), '-'], capture_output=True, text=True, timeout=20)
                text = clean(proc.stdout)
                status = 'Volltext maschinell ausgelesen' if text else 'Kein auslesbarer Text; Sichtprüfung/OCR offen'
                detail = ('PDF mit Text über ' + text[:210].rstrip(' .') + '.') if text else 'PDF ohne auslesbaren Text; Inhalt muss visuell oder per OCR geprüft werden.'
            elif ext in ('.pptx','.docx','.xlsx'):
                text = ooxml(path)
                status = 'Dokumenttext maschinell ausgelesen' if text else 'Keine Textauszüge; visuelle Prüfung offen'
                detail = ('Dokument mit Inhalten zu ' + text[:210].rstrip(' .') + '.') if text else 'Office-Dokument ohne maschinell lesbaren Text.'
            elif ext in ('.png','.jpg','.jpeg'):
                detail = 'Bilddatei „' + path.stem + '“; Motiv anhand einer Kontaktübersicht gesichtet.'
                status = 'Bildkontaktübersicht visuell gesichtet; Detailprüfung abhängig von Auswahl'
            elif ext in ('.mp4','.webm','.m4a'):
                proc = subprocess.run(['ffprobe','-v','error','-show_entries','format=duration:stream=codec_type,width,height','-of','json',str(path)],capture_output=True,text=True,timeout=12)
                info = json.loads(proc.stdout)
                duration = float(info.get('format',{}).get('duration',0))
                streams = info.get('streams',[])
                video = next((x for x in streams if x.get('codec_type') == 'video'),None)
                audio = any(x.get('codec_type') == 'audio' for x in streams)
                resolution = f"; {video.get('width')}×{video.get('height')}" if video and video.get('width') else ''
                detail = f"{'Videodatei' if video else 'Audiodatei'} „{path.stem}“; {duration:.1f} Sekunden{resolution}; {'Tonspur vorhanden' if audio else 'keine Tonspur'}."
                status = 'Videostichbilder gesichtet; Toninhalt nicht transkribiert' if video else 'Audiometadaten erfasst; Toninhalt nicht transkribiert'
            elif ext == '.zip':
                with zipfile.ZipFile(path) as z:
                    names = [x.filename for x in z.infolist() if not x.is_dir()]
                detail = f"ZIP-Archiv „{path.stem}“ mit {len(names)} Dateien: " + ', '.join(Path(n).name for n in names[:6]) + '.'
                status = 'Archivverzeichnis ausgelesen; nicht entpackt'
            elif ext == '.woff2':
                detail = 'Webfont-Datei „' + path.stem + '“ für die Schrift LeadPilot Grotesk.'
                status = 'Datei und beiliegende Lizenz eingeordnet'
            else:
                raw = path.read_text(errors='replace')
                if ext in ('.html','.svg'):
                    raw = re.sub(r'<(script|style)\b[^>]*>.*?</\1>', ' ', raw, flags=re.I|re.S)
                    raw = re.sub(r'<[^>]+>', ' ', raw)
                text = clean(raw)
                detail = ('Text-/Quelldatei mit Inhalten zu ' + text[:210].rstrip(' .') + '.') if text else 'Text-/Quelldatei ohne lesbaren Inhalt.'
                status = 'Text maschinell ausgelesen'
    except Exception as exc:
        detail = 'Inhalt konnte nicht automatisch gelesen werden; manuelle Prüfung erforderlich.'
        status = 'Lesefehler: ' + type(exc).__name__
    mid, category = milestone(path, text)
    return {'pfad':str(path),'typ':kind,'datum_aenderung':datetime.fromtimestamp(st.st_mtime,ZoneInfo('Europe/Berlin')).isoformat(timespec='seconds'),
            'inhalt_ein_satz':detail,'meilenstein':mid,'zuordnung':category,'pruefstatus':status,
            'groesse_bytes':st.st_size,'sha256':sha,'duplikatgruppe':None}

def main():
    paths = sorted(p for root in roots() for p in root.rglob('*') if p.is_file())
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        rows = list(pool.map(inspect, paths))
    groups = defaultdict(list)
    for row in rows:
        if row['sha256']:
            groups[row['sha256']].append(row)
    for digest, matches in groups.items():
        if len(matches) > 1:
            for row in matches:
                row['duplikatgruppe'] = digest[:12]
    print(json.dumps({'stand':datetime.now(ZoneInfo('Europe/Berlin')).isoformat(timespec='seconds'),
                      'umfang':[str(p) for p in roots()],
                      'hinweis':'Änderungsdatum ist kein Beleg für das Entstehungsdatum. Textauszüge sind maschinell und keine redaktionelle Freigabe.',
                      'anzahl_dateien':len(rows),'dateien':rows},ensure_ascii=False,indent=2))

if __name__ == '__main__':
    main()
