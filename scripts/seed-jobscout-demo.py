"""Create clearly synthetic records in the isolated app copy for genuine UI captures."""
from pathlib import Path
import json,csv

root=Path(__file__).resolve().parents[1]/'tmp/project-previews/jobscout'
(root/'profil.json').write_text(json.dumps({'persoenlich': {'vorname':'Demo', 'nachname':'Profil'}, 'kontakt':{'ort':'Leipzig'}}))
fields=['Neu','Score','Titel','Firma','Ort','Remote','Veröffentlicht','Gründe','Link','Quelle']
jobs=[
 ['NEU',94,'Sales Operations Specialist','Nordstern Tools (Demo)','Leipzig','ja','2026-10-26','Sales Operations | CRM | Prozessgestaltung','https://example.com/jobs/1','Demodatensatz'],
 ['NEU',88,'CRM & Automation Coordinator','Takt Digital (Demo)','Remote','ja','2026-10-25','CRM | Automatisierung | Datenqualität','https://example.com/jobs/2','Demodatensatz'],
 ['NEU',85,'Junior Revenue Operations','Flusswerk (Demo)','Berlin','ja','2026-10-25','Revenue Operations | Reporting','https://example.com/jobs/3','Demodatensatz'],
 ['',81,'Sales Enablement Coordinator','Werkraum Cloud (Demo)','Leipzig','ja','2026-10-24','Sales Enablement | Weiterbildung','https://example.com/jobs/4','Demodatensatz'],
 ['',77,'Customer Operations Specialist','Brückenwerk (Demo)','Remote','ja','2026-10-23','Kundenprozesse | CRM','https://example.com/jobs/5','Demodatensatz'],
 ['',73,'Digital Sales Coordinator','Linienpunkt (Demo)','Dresden','nein','2026-10-22','B2B | Digital Sales','https://example.com/jobs/6','Demodatensatz'],
]
with (root/'jobs_ranked.csv').open('w',newline='',encoding='utf-8-sig') as f:
 w=csv.writer(f,delimiter=';');w.writerow(fields);w.writerows(jobs)
fields=['Firma','Position','Link','Status','Erstellt am','Beworben am','Follow-up am','Ergebnis','Notizen']
rows=[
 ['Nordlicht Software (Demo)','Sales Operations Specialist','https://example.com/jobs/1','vorbereitet','2026-10-26','','','','Fiktiver Beispieldatensatz für die Portfolio-Aufnahme.'],
 ['Kontur Digital (Demo)','CRM & Automation Coordinator','https://example.com/jobs/2','beworben','2026-10-25','2026-10-25','2026-11-02','','Fiktiver Beispieldatensatz.'],
 ['Fokus Systems (Demo)','Junior Revenue Operations','https://example.com/jobs/3','interview','2026-10-24','2026-10-24','2026-11-03','','Fiktiver Beispieldatensatz.'],
 ['Werkraum Cloud (Demo)','Sales Enablement Coordinator','https://example.com/jobs/4','follow-up','2026-10-20','2026-10-20','2026-10-30','','Fiktiver Beispieldatensatz.'],
]
with (root/'bewerbungen_tracker.csv').open('w',newline='',encoding='utf-8-sig') as f:
 w=csv.writer(f,delimiter=';');w.writerow(fields);w.writerows(rows)
print('Demodaten nur in der isolierten Anwendungskopie angelegt.')
