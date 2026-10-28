#!/usr/bin/env python3
"""Prepare selected local LeadPilot media and a traceable source manifest."""
import hashlib
import io
import json
import shutil
import subprocess
import tempfile
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
LP = Path('/Users/marcpoenisch/Projekte/LeadPilot - Eine fiktive Geschäftsidee')
DBA = Path('/Users/marcpoenisch/Documents/DBA Batch 8')
MEDIA = ROOT/'public/leadpilot/assets'
EVIDENCE = ROOT/'evidence/leadpilot'
EXPO = LP/'Marketing/LeadPilot-Expo-Marketingpaket'
MARKETING = LP/'Marketing'
DESIGN = LP/'LeadPilot-Designsystem'
CONTEXT = LP/'LeadPilot - Unternehmensdaten-Projekt Kontext'
PITCH = DBA/'Power-Friday/Kunden-Pitch(2.8)'
TEAM = DBA/'Power-Friday/Team-Pitch(2.9)'
records = []

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def image(name, source, width=1600, crop=None, trim_alpha=False):
    source = Path(source)
    if not source.is_file():
        raise FileNotFoundError(source)
    with Image.open(source) as original:
        pic = ImageOps.exif_transpose(original)
        if trim_alpha and 'A' in pic.getbands():
            bounds = pic.getchannel('A').getbbox()
            if bounds:
                left, top, right, bottom = bounds
                pad = 24
                pic = pic.crop((max(0,left-pad),max(0,top-pad),min(pic.width,right+pad),min(pic.height,bottom+pad)))
        if crop:
            pic = pic.crop(crop)
        pic.thumbnail((width, 3000), Image.Resampling.LANCZOS)
        if pic.mode not in ('RGB','RGBA'):
            pic = pic.convert('RGBA' if 'transparency' in pic.info else 'RGB')
        target = MEDIA/(name+'.webp')
        pic.save(target,'WEBP',quality=84,method=5)
    records.append({'id':name,'source':str(source),'source_sha256':digest(source),
                    'output':str(target.relative_to(ROOT)),'output_sha256':digest(target),
                    'kind':'image','processing':f'WebP, max {width}px'+(', cropped' if crop else '')+(', transparent margins trimmed' if trim_alpha else '')})

def pdf_image(name, source, page):
    result = subprocess.run(['pdftoppm','-f',str(page),'-l',str(page),'-singlefile',
                             '-scale-to','1600','-png',str(source)],capture_output=True,check=True)
    with Image.open(io.BytesIO(result.stdout)) as img:
        target = MEDIA/(name+'.webp')
        img.convert('RGB').save(target,'WEBP',quality=84,method=5)
    records.append({'id':name,'source':str(source),'source_sha256':digest(source),
                    'output':str(target.relative_to(ROOT)),'output_sha256':digest(target),
                    'kind':'document-preview','page':page,'processing':'Poppler PDF page to WebP'})

def office_image(name, source, page):
    with tempfile.TemporaryDirectory(prefix='leadpilot-doc-') as folder:
        profile = (Path(folder)/'profile').as_uri()
        cmd = ['soffice','-env:UserInstallation='+profile,'--headless','--convert-to','pdf','--outdir',folder,str(source)]
        subprocess.run(cmd,capture_output=True,check=True,timeout=90)
        pdf = Path(folder)/(source.stem+'.pdf')
        output = subprocess.run(['pdftoppm','-f',str(page),'-l',str(page),'-singlefile','-scale-to','1600','-png',str(pdf)],capture_output=True,check=True)
        with Image.open(io.BytesIO(output.stdout)) as img:
            target = MEDIA/(name+'.webp')
            img.convert('RGB').save(target,'WEBP',quality=84,method=5)
    records.append({'id':name,'source':str(source),'source_sha256':digest(source),
                    'output':str(target.relative_to(ROOT)),'output_sha256':digest(target),
                    'kind':'document-preview','page':page,'processing':'LibreOffice PDF preview to WebP; layout may differ'})

def video(name, source):
    source = Path(source)
    target = MEDIA/(name+'.mp4')
    subprocess.run(['ffmpeg','-v','error','-y','-i',str(source),'-vf',"scale='min(1280,iw)':-2",
                    '-c:v','libx264','-preset','veryfast','-crf','24','-c:a','aac','-b:a','128k',
                    '-movflags','+faststart',str(target)],capture_output=True,check=True,timeout=180)
    still = subprocess.run(['ffmpeg','-v','error','-ss','1','-i',str(target),'-frames:v','1',
                            '-f','image2pipe','-vcodec','mjpeg','pipe:1'],capture_output=True,check=True)
    poster = MEDIA/(name+'-poster.webp')
    with Image.open(io.BytesIO(still.stdout)) as pic:
        pic.thumbnail((1000,1000),Image.Resampling.LANCZOS)
        pic.save(poster,'WEBP',quality=80,method=5)
    records.append({'id':name,'source':str(source),'source_sha256':digest(source),
                    'output':str(target.relative_to(ROOT)),'output_sha256':digest(target),
                    'poster':str(poster.relative_to(ROOT)),'kind':'video','processing':'H.264 MP4, max 1280px, original audio retained'})

def main():
    MEDIA.mkdir(parents=True,exist_ok=True)
    EVIDENCE.mkdir(parents=True,exist_ok=True)
    image('logo',LP/'Logo Final/Logo(final-big).png',900,trim_alpha=True)
    image('brand-board',DESIGN/'assets/brand/mockup-board-1.png')
    image('dashboard-early',DESIGN/'uploads/2026-08-11_10-58-42.png')
    image('leadqualifizierung',MARKETING/'LeadPilot - Leadqualifizierung.png')
    image('expo-nachbereitung',EXPO/'LP Expo-Nachbereitung-dunkel.png')
    image('problem-demo',EXPO/'LP - Vom Problem zur Demo.png')
    image('expo-anzeige',EXPO/'LP Expo-Anzeige-dunkel-bearbeitet.png')
    oldpost = next((p for p in DBA.iterdir() if p.is_dir() and p.name.startswith('2.1.13 '))).glob('*LinkedIn-Post.png')
    image('linkedin-frueh',next(oldpost))
    for name, filename in [
        ('messe-01','LP - Messe vorbei-Bildfolge1.png'),
        ('messe-02','LP - Messe vorbei-Bildfolge2.png'),
        ('messe-03','LP - Messe vorbei-Bildfolge3.png'),
        ('expo-ablauf','LP-Messe-Workflow in 4 Schritten.png'),
        ('expo-features','LP Expo-Features-hell.png'),
        ('expo-import','LP Expo-01-Messe-Listen-importieren.png'),
        ('expo-person','LP Expo-02-Person-zuweisen.png'),
        ('expo-schritt','LP Expo-03-Naechsten-Schritt-zuweisen.png'),
        ('outreach','6. Outreach- Sequenz - Folie 8.png'),
        ('jens','LP - Jens braucht nächsten Schritt.png'),
    ]:
        image(name,EXPO/filename)
    for i in range(1,5):
        image('leitfaden-'+str(i),MARKETING/f'LeadPilot - Leitfaden Lead-Nachverfolgung{i}.png')
    pdf_image('geschaeftsbericht',CONTEXT/'LeadPilot - Geschaeftsbericht2025.pdf',1)
    pdf_image('kundenpitch',PITCH/'LeadPilot Final Pitch-Deck Weidner.pdf',1)
    office_image('teampitch',TEAM/'Teampitch-Deck final mit Schlussfolie.pptx',1)
    office_image('teamdossier',TEAM/'Team-Pitch Dossier LeadPilot.docx',1)
    video('expo-spot',EXPO/'LP Expo - Werbespot.mp4')
    video('expo-feature',EXPO/'LP-Werbespot2.mp4')
    video('erster-werbespot',MARKETING/'LeadPilot - Werbespot.webm')
    font = DESIGN/'fonts/LeadPilotGrotesk-Regular.woff2'
    license_path = DESIGN/'fonts/OFL.txt'
    for src,name in [(font,'LeadPilotGrotesk-Regular.woff2'),(license_path,'LeadPilotGrotesk-OFL.txt')]:
        out=MEDIA/name
        shutil.copyfile(src,out)
        records.append({'id':name,'source':str(src),'source_sha256':digest(src),'output':str(out.relative_to(ROOT)),'output_sha256':digest(out),'kind':'font'})
    (EVIDENCE/'media-sources.json').write_text(json.dumps({'assets':records},ensure_ascii=False,indent=2)+'\n')
    print(f'{len(records)} Medien und Quellenbelege vorbereitet.')

if __name__=='__main__':
    main()
