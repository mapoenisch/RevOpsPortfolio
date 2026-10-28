"""Read certificate text and produce a private source inventory. No originals modified."""
from pathlib import Path
import json, subprocess

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path('/Users/marcpoenisch/Projekte/Jobsuche 2026/Zertifikate')
records = []
for p in sorted(SOURCE.rglob('*.pdf')):
    text = subprocess.check_output(['pdftotext', '-layout', str(p), '-'], text=True)
    records.append({'file': str(p), 'text': text})
images = sorted(SOURCE.rglob('*.png'))
if images:
    result = subprocess.run([str(ROOT/'tmp/ocr'), *map(str, images)], capture_output=True, text=True, check=True)
    records.extend(json.loads(line) for line in result.stdout.splitlines() if line.startswith('{'))
(ROOT/'tmp/certificate-text.json').write_text(json.dumps(records, ensure_ascii=False, indent=2))
for r in records:
    text = r.get('text', '')
    print(Path(r['file']).name + '\n' + text[:1900] + '\n')
print(f'{len(records)} Quelldateien gelesen.')
