"""Generate a public-safe, text-readable CV from verified local source facts."""
from pathlib import Path
import shutil
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT/'output/pdf/Marc-Poenisch-Lebenslauf.pdf'
OUT.parent.mkdir(parents=True,exist_ok=True)
pdfmetrics.registerFont(TTFont('CV','/System/Library/Fonts/Supplemental/Arial.ttf'))
pdfmetrics.registerFont(TTFont('CV-Bold','/System/Library/Fonts/Supplemental/Arial Bold.ttf'))
pdfmetrics.registerFontFamily('CV',normal='CV',bold='CV-Bold',italic='CV',boldItalic='CV-Bold')
INK=colors.HexColor('#172b3a'); GREEN=colors.HexColor('#275847'); MUTED=colors.HexColor('#596672')
styles={
 'name':ParagraphStyle('name',fontName='CV-Bold',fontSize=29,leading=34,textColor=INK,spaceAfter=7),
 'strap':ParagraphStyle('strap',fontName='CV',fontSize=10,leading=15,textColor=GREEN,spaceAfter=8),
 'contact':ParagraphStyle('contact',fontName='CV',fontSize=9,leading=14,textColor=MUTED,spaceAfter=19),
 'heading':ParagraphStyle('heading',fontName='CV-Bold',fontSize=10.5,leading=14,textColor=GREEN,spaceBefore=17,spaceAfter=9),
 'title':ParagraphStyle('title',fontName='CV-Bold',fontSize=10.3,leading=15,textColor=INK,spaceAfter=3),
 'meta':ParagraphStyle('meta',fontName='CV',fontSize=9,leading=13,textColor=MUTED,spaceAfter=5),
 'body':ParagraphStyle('body',fontName='CV',fontSize=9.5,leading=15,textColor=INK,spaceAfter=8),
 'small':ParagraphStyle('small',fontName='CV',fontSize=8.5,leading=13,textColor=MUTED,spaceAfter=6),
}
story=[]
def p(t,style='body'): return Paragraph(t,styles[style])
def add(t,style='body'): story.append(p(t,style))
def section(t): add(t.upper(),'heading')
def entry(title,meta,text): story.append(KeepTogether([p(title,'title'),p(meta,'meta'),p(text)]))
add('Marc Pönisch','name')
add('B2B-Vertrieb | CRM | Digitale Prozesse','strap')
add('Leipzig · <link href="mailto:ma.poenisch@gmail.com">ma.poenisch@gmail.com</link><br/><link href="https://www.linkedin.com/in/marc-poenisch/">linkedin.com/in/marc-poenisch/</link> · <link href="https://github.com/mapoenisch">github.com/mapoenisch</link>','contact')
section('Profil')
add('Kaufmann mit Erfahrung in B2B-Kundenberatung, Angebotserstellung und Auftragsabwicklung im Baustoffgroßhandel. Seit Mai 2026 in Weiterbildung zum Digital Sales Manager. Parallel entwickle ich eigene Anwendungen mit KI-Unterstützung. Ich suche den Einstieg in CRM, Sales Operations, Revenue Operations oder eine vergleichbare Rolle an der Schnittstelle von Vertrieb und digitalen Prozessen.')
section('Berufserfahrung')
entry('Fachberater | OBI, Jena','01/2025 - 10/2025','Kundenberatung und Verkauf im Baustoff- und Handwerksbereich. Auftragserstellung und Koordination von Bestellungen und Lieferungen. Beratung zu Handwerks- und Dienstleistungen.')
entry('Kaufmann im Großhandel (B2B) | Raiffeisen Waren GmbH, Erfurt','01/2022 - 01/2024','B2B-Kundenberatung, Angebotserstellung und kaufmännische Auftragsabwicklung. Telefonisches Nachfassen. Einkaufs- und Verkaufsverhandlungen sowie Kunden- und Artikelstammdatenpflege im ERP-System. Bestandskontrolle und Steuerung von Warenein- und -ausgang.')
section('Weiterbildung und Ausbildung')
entry('Weiterbildung zum Digital Sales Manager','Seit 05/2026 | Digital Business Akademie / IDVW | Vollzeit, Remote','Beginn 18.05.2026, Dauer 8,5 Monate. Schwerpunkte: digitaler B2B-Vertrieb, CRM mit HubSpot und Salesforce, Lead-Management, Sales Funnel, Reporting und KI-gestützte Vertriebsprozesse. Die Weiterbildung läuft noch.')
entry('Kaufmännische Ausbildung im Groß- und Außenhandel (IHK)','09/2019 - 01/2022 | Raiffeisen Waren GmbH / Ludwig-Erhard-Schule, Erfurt','Abgeschlossene Ausbildung mit Schwerpunkt Vertrieb und Warenwirtschaft.')
section('Kenntnisse')
add('<b>Berufspraxis:</b> Kundenberatung, Bedarfsanalyse, Angebote, Auftragsabwicklung, Warenwirtschaft und SAP.<br/><b>Weiterbildung und Projekte:</b> HubSpot, Salesforce-Grundlagen, CRM-Datenstruktur, Reporting, regelbasiertes Scoring und Entwicklung mit KI-Unterstützung.<br/><b>Sprachen:</b> Deutsch (Muttersprache), Englisch (gute Kenntnisse).')
story.append(PageBreak())
add('Projekte & Lernnachweise','name')
add('Eigene Anforderungen. Digitale Umsetzung mit KI.','strap')
section('Ausgewählte Projekte')
entry('LeadPilot Dashboard CRM','Eigenes Lern- und Entwicklungsprojekt | Fiktives Unternehmen','Dashboard-CRM mit Ansichten für Kontakte, Unternehmen und Deals sowie dokumentiertem Datenmodell. Mein Beitrag: fachliche Anforderungen bestimmen, Abläufe in Entwicklungsaufträge übersetzen, die Umsetzung mit KI entwickeln und Ergebnisse prüfen. Keine behaupteten Produktivumsätze oder Kundenerfolge.<br/><link href="https://github.com/mapoenisch/leadpilot-dashboard-crm-v2" color="#275847">github.com/mapoenisch/leadpilot-dashboard-crm-v2</link>')
entry('JobScout ApplicationCockpit','Persönliches Entwicklungsprojekt | Lokale Anwendung','Bewerbungs-Cockpit mit mehreren Stellenquellen, regelbasiertem Scoring und einer Pipeline mit Status und Follow-ups. Mein Beitrag: eigenen Bedarf strukturieren, Bewertungslogik und Bedienung mit KI entwickeln, Ergebnisse prüfen und das Werkzeug weiterführen.<br/><link href="https://github.com/mapoenisch/JobScout-ApplicationCockpit" color="#275847">github.com/mapoenisch/JobScout-ApplicationCockpit</link>')
section('Ausgewählte Zertifikate und Nachweise')
for title,meta in [
 ('HubSpot Sales-Software','HubSpot Academy | Zertifizierung vom 26.08.2026, gültig bis 25.09.2027'),
 ('Marketing Operations / IT Administrator','Demandbase Academy | Digitales Badge vom 10.10.2026'),
 ('Introduction to Model Context Protocol','Anthropic Academy | Kursabschluss nachgewiesen; kein Datum auf der Urkunde'),
 ('Grundwissen Business-Analyse','Microsoft und LinkedIn Learning | Lernpfad abgeschlossen am 07.07.2026'),
 ('Copilot in Excel: KI-unterstützte Datenanalyse','LinkedIn Learning | Kurs abgeschlossen am 29.06.2026'),
 ('Kundenbedürfnisse verstehen und nutzen','Rainer Mayer | 5-tägiger B2B-Workshop mit Praxis-Rollenspiel | 28.09.2026'),
]:
 story.append(KeepTogether([p(title,'title'),p(meta,'small'),Spacer(1,8)]))
section('Arbeitsweise')
add('Ich nutze KI als Werkzeug für die Umsetzung. Anforderungen, fachliche Entscheidungen und die Prüfung der Ergebnisse bleiben meine Aufgabe. Zertifikate und Lernnachweise ergänzen meine Berufspraxis; sie ersetzen keine Berufserfahrung in den jeweiligen Systemen.')
add('Öffentliche Fassung - ohne Straßenadresse, Telefonnummer oder Geburtsdatum. Stand: Oktober 2026.','small')

def footer(canvas,doc):
 canvas.saveState();w,h=A4
 canvas.setStrokeColor(colors.HexColor('#dce2da'));canvas.line(43,42,w-43,42)
 canvas.setFont('CV',8);canvas.setFillColor(MUTED)
 canvas.drawString(43,28,'Marc Pönisch | Lebenslauf')
 canvas.drawRightString(w-43,28,str(doc.page))
 canvas.restoreState()
doc=SimpleDocTemplate(str(OUT),pagesize=A4,rightMargin=43,leftMargin=43,topMargin=39,bottomMargin=57,title='Marc Pönisch - Lebenslauf',author='Marc Pönisch')
doc.build(story,onFirstPage=footer,onLaterPages=footer)
target=ROOT/'public/downloads'/OUT.name
target.parent.mkdir(parents=True,exist_ok=True)
shutil.copyfile(OUT,target)
print(OUT)
