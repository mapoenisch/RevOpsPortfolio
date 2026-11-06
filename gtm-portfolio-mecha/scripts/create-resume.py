from pathlib import Path
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

root = Path(__file__).resolve().parent.parent
output = root / 'public/downloads/Marc-Poenisch-Lebenslauf.pdf'
output.parent.mkdir(parents=True, exist_ok=True)
font_dir = Path('/System/Library/Fonts/Supplemental')
pdfmetrics.registerFont(TTFont('CV', str(font_dir/'Arial.ttf')))
pdfmetrics.registerFont(TTFont('CVBold', str(font_dir/'Arial Bold.ttf')))
pdfmetrics.registerFontFamily('CV', normal='CV', bold='CVBold')
ink=colors.HexColor('#202632'); muted=colors.HexColor('#566172'); blue=colors.HexColor('#244fcd')
body=ParagraphStyle('Body',fontName='CV',fontSize=9,leading=13,textColor=ink,spaceAfter=6)
small=ParagraphStyle('Small',parent=body,fontSize=8,leading=11,textColor=muted)
heading=ParagraphStyle('Heading',parent=body,fontName='CVBold',fontSize=10,leading=14,textColor=blue,spaceBefore=14,spaceAfter=7)
name=ParagraphStyle('Name',parent=body,fontName='CVBold',fontSize=27,leading=32,spaceAfter=6)
story=[]
def p(text,style=body): story.append(Paragraph(text,style))
def h(text): p(text.upper(),heading)
def entry(date,title,description):
 t=Table([[Paragraph(date,small),Paragraph(f'<b>{title}</b><br/>{description}',body)]],colWidths=[91,420])
 t.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),10),('TOPPADDING',(0,0),(-1,-1),0),('BOTTOMPADDING',(0,0),(-1,-1),4)]))
 story.append(t)
p('Marc Pönisch',name)
p('B2B-Vertrieb · CRM · Sales Operations · Revenue Operations',body)
p('Leipzig · ma.poenisch@gmail.com · linkedin.com/in/marc-poenisch',small)
h('Profil')
p('Kaufmann mit Erfahrung im B2B-Baustoffhandel und laufender Vollzeit-Weiterbildung zum Digital Sales Manager. Mein Fokus liegt auf strukturierten Vertriebsprozessen, CRM-Daten und Reporting. Eigene Projekte entstehen mit KI-Unterstützung; Anforderungen, fachliche Entscheidungen und Prüfung liegen bei mir.')
h('Berufserfahrung')
entry('01/2025 - 10/2025','Fachberater · OBI, Jena','Kundenberatung, Verkauf, Auftragserstellung sowie Koordination von Bestellungen und Lieferungen im Baustoff- und Handwerksbereich.')
entry('01/2022 - 01/2024','Kaufmann im Groß- und Außenhandel · Raiffeisen Waren GmbH, Erfurt','B2B-Kundenberatung, Angebotserstellung und Auftragsabwicklung im Baustoffhandel. Pflege von Kunden- und Artikelstammdaten im ERP-System.')
entry('08/2019 - 01/2022','Ausbildung · Raiffeisen Waren GmbH, Erfurt','Vertrieb und Warenwirtschaft: Kundenberatung, Bestellwesen, Bestandskontrolle und Warenfluss. Abschluss als Kaufmann im Groß- und Außenhandel (IHK).')
h('Weiterbildung')
entry('Seit 05/2026','Digital Sales Manager · Digital Business Akademie / IDVW','Laufende Weiterbildung in Vollzeit und remote seit 18.05.2026. CRM, Lead-Management, Sales Funnel, Reporting, Vertriebsstrategie, Social Selling und KI. Angestrebter IHK-Abschluss ausstehend.')
entry('09/2026','Kundenbedürfnisse verstehen und nutzen · Rainer Mayer','Fünftägiger B2B-Vertriebsworkshop mit Gesprächsstruktur, Verkaufspsychologie und SPIN Selling.')
h('Eigene Arbeitsproben')
p('<b>LeadPilot:</b> Dashboard-CRM für ein fiktives B2B-Unternehmen. Fachliche Anforderungen, Vertriebsansichten und Prüfung der KI-gestützten Umsetzung. React, TypeScript, Vite und Supabase.')
p('<b>Routing &amp; Prospecting:</b> Separate lokale Prototypen mit synthetischen Daten. Dublettenprüfung, Zuständigkeitsregeln und nachvollziehbares Scoring. Externe Testläufe werden gesondert ausgewiesen.')
h('Ausgewählte Kenntnisse und Nachweise')
p('<b>CRM &amp; Vertrieb:</b> HubSpot Sales-Software, Inbound Sales, Berichterstattung; B2B-Beratung, Angebot und Auftragsabwicklung.<br/><b>Prozesse &amp; KI:</b> Grundwissen Business-Analyse (Microsoft / LinkedIn Learning), Marketing Operations / IT Administrator (Demandbase), Claude Code in Action (Anthropic).')
p('<b>Sprachen:</b> Deutsch (Muttersprache), Englisch (gute Kenntnisse, Duolingo English Test 92), Französisch (Grundkenntnisse).')
story.append(Spacer(1,7))
p('Öffentliche Kurzfassung · Stand 27.10.2026 · Grundlage: vorhandener Original-Lebenslauf. Frühere Stationen sind im vollständigen Lebenslauf enthalten.',small)
doc=SimpleDocTemplate(str(output),pagesize=(595.28,841.89),rightMargin=42,leftMargin=42,topMargin=35,bottomMargin=32,title='Marc Pönisch - Lebenslauf (Kurzfassung)',author='Marc Pönisch')
doc.build(story)
print(output)
