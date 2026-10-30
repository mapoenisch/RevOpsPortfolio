import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import './leadpilot-chronik.css';

const asset = '/leadpilot/assets/';
const chapters = [
  ['idee', 'Die erste Idee'],
  ['marketing', 'Marketing & Content'],
  ['unternehmen', 'Die Unternehmenswelt'],
  ['pitch', 'Kunden- & Team-Pitch'],
  ['filme', 'LeadPilot in Bewegung'],
  ['diagramme', 'Prozesse visualisieren'],
  ['dashboard', 'Vom Dashboard zum CRM'],
  ['design', 'Das Designsystem'],
] as const;

const marketing = [
  { src: 'linkedin-frueh.webp', alt: 'Frühes LeadPilot-LinkedIn-Motiv zur Kontaktaufnahme mit Leads.', title: 'Ein früher LinkedIn-Post', note: 'Aus dem Contentprojekt, Juli 2026. Die genannte Quote ist ein illustrativer Marketingwert.' },
  { src: 'problem-demo.webp', alt: 'Drei Contentmotive entlang des Wegs vom Messeproblem zur Demo.', title: 'Vom Problem zur Demo', note: 'Eine Contentreise für die fiktive Persona Jens Hartwig.' },
  { src: 'expo-anzeige.webp', alt: 'Dunkle LeadPilot-Expo-Anzeige mit der Überschrift Messekontakt rein, nächster Schritt klar.', title: 'Eine Anzeige für LeadPilot Expo', note: 'Kampagnenmotiv und illustrative Produktansicht.' },
  { src: 'messe-01.webp', alt: 'Messekontakt-Motiv mit der Frage Wer ruft jetzt an?', title: 'Nach der Messe', note: 'Erstes Motiv einer zusammengehörigen Bildfolge.' },
  { src: 'messe-02.webp', alt: 'Illustration der Schritte vom Messekontakt zum nächsten Schritt.', title: 'Vom Kontakt zum nächsten Schritt', note: 'Zweites Motiv der Messe-Bildfolge.' },
  { src: 'messe-03.webp', alt: 'Illustration einer aufgeräumten Messekontaktliste.', title: 'Die Messeliste ordnen', note: 'Drittes Motiv der Messe-Bildfolge.' },
  { src: 'expo-features.webp', alt: 'Helle Übersicht mit illustrierten LeadPilot-Expo-Funktionen.', title: 'Die Expo-Features', note: 'Ein visueller Überblick über das fiktive Feature-Konzept.' },
  { src: 'expo-import.webp', alt: 'Illustration: Eine Messeliste wird in ein CRM importiert.', title: 'Liste importieren', note: 'Erster Schritt einer illustrierten Messe-Nachbereitung.' },
  { src: 'expo-person.webp', alt: 'Illustration: Ein Kontakt erhält eine verantwortliche Person.', title: 'Verantwortung zuweisen', note: 'Zweiter Schritt der illustrierten Messe-Nachbereitung.' },
  { src: 'expo-schritt.webp', alt: 'Illustration: Für einen Kontakt wird ein nächster Schritt festgelegt.', title: 'Den nächsten Schritt festhalten', note: 'Dritter Schritt der illustrierten Messe-Nachbereitung.' },
  { src: 'outreach.webp', alt: 'Übersicht einer Outreach-Sequenz mit E-Mail, LinkedIn und Telefon.', title: 'Vom Content zum Gespräch', note: 'Eine geplante Outreach-Sequenz ergänzt die Contentmotive.' },
  { src: 'leitfaden-1.webp', alt: 'Erste Seite eines LeadPilot-Leitfadens zur Lead-Nachverfolgung.', title: 'Leitfaden zur Nachverfolgung', note: 'Ein weiteres Asset aus der Marketingarbeit.' },
] as const;

function SourceNote({ children }: { children: ReactNode }) {
  return <details className="lp-source"><summary>Quellen & Einordnung <ChevronDown size={16} aria-hidden="true" /></summary><div>{children}</div></details>;
}

function ChapterTitle({ number, kicker, title, id }: { number: string; kicker: string; title: string; id: string }) {
  return <div className="lp-chapter-heading" id={id}><span className="lp-chapter-num">{number}</span><div><span className="eyebrow">{kicker}</span><h2>{title}</h2></div></div>;
}

function MarketingGallery() {
  const [index, setIndex] = useState(0);
  const current = marketing[index];
  const move = (delta: number) => setIndex((index + delta + marketing.length) % marketing.length);
  return <div className="lp-gallery" aria-label="Marketinggalerie">
    <figure className="lp-gallery-image"><img src={asset + current.src} alt={current.alt} width="1600" height="1000" loading="lazy" /></figure>
    <div className="lp-gallery-footer"><div aria-live="polite"><span className="lp-gallery-count">{String(index + 1).padStart(2, '0')} / {marketing.length}</span><h3>{current.title}</h3><p>{current.note}</p></div><div className="lp-gallery-controls"><button type="button" onClick={() => move(-1)} aria-label="Vorheriges Marketingmotiv"><ChevronLeft size={20} /></button><button type="button" onClick={() => move(1)} aria-label="Nächstes Marketingmotiv"><ChevronRight size={20} /></button></div></div>
    <div className="lp-gallery-thumbs" aria-label="Marketingmotiv auswählen">{marketing.map((item, i) => <button type="button" key={item.src} className={i === index ? 'active' : ''} aria-label={`Motiv ${i + 1}: ${item.title}`} aria-pressed={i === index} onClick={() => setIndex(i)}><img src={asset + item.src} alt="" width="90" height="60" loading="lazy" /></button>)}</div>
  </div>;
}

function ComparisonImage({ src, alt, label, caption }: { src: string; alt: string; label: string; caption: string }) {
  return <figure><a href={src} target="_blank" rel="noreferrer" aria-label={`${label}: Ansicht in voller Größe öffnen`}><img src={src} alt={alt} width="1440" height="900" loading="lazy" /></a><figcaption><strong>{label}</strong> {caption} · <a href={src} target="_blank" rel="noreferrer">vergrößern</a></figcaption></figure>;
}

function VideoCard({ name, title, label, description, audio, captions, transcript }: { name: string; title: string; label: string; description: string; audio: string; captions?: {src: string; language: string; label: string}; transcript?: string }) {
  return <article className="lp-video"><video controls preload="none" poster={asset + name + '-poster.webp'} aria-label={title}><source src={asset + name + '.mp4'} type="video/mp4" />{captions && <track kind="captions" src={asset + captions.src} srcLang={captions.language} label={captions.label} default />}</video><div><span className="eyebrow">{label}</span><h3>{title}</h3><p>{description}</p><p className="lp-video-audio">{audio}</p>{transcript && <details className="lp-video-transcript"><summary>Sprechertext lesen</summary><p lang="en">{transcript}</p></details>}</div></article>;
}

export function LeadPilotTeaser() {
  return <section id="leadpilot-hintergrund" className="lp-teaser section-pad" aria-labelledby="lp-teaser-title"><div className="lp-teaser-copy"><span className="eyebrow">Hinter dem Projekt</span><h2 id="lp-teaser-title">Wie LeadPilot<br />entstanden ist.</h2><p>Von einer Geschäftsidee über Content und Pitch bis zum eigenen Dashboard und Designsystem.</p><Link to="/leadpilot" className="text-link">Die Projektchronik ansehen <ArrowRight size={17} /></Link></div><Link to="/leadpilot" className="lp-teaser-visual" aria-label="LeadPilot-Projektchronik ansehen"><span>PROJEKTCHRONIK <ArrowUpRight size={16} /></span><img src={asset + 'logo.webp'} alt="" width="900" height="450" loading="lazy" /><small>Idee · Marke · Anwendung</small></Link></section>;
}

export default function LeadPilotChronik() {
  return <article className="lp-chronicle">
    <div className="lp-hero section-pad"><Link className="back-link" to="/"><ArrowLeft size={16} /> Zur Startseite</Link><div className="lp-hero-grid"><div><span className="eyebrow">Projektchronik · seit Juli 2026</span><h1 tabIndex={-1}>Aus einer Idee<br />wird <span>LeadPilot.</span></h1><p>Ein fiktives B2B-Unternehmen als praktisches Lernprojekt: von den ersten Gedanken über Marketing und Pitch bis zur eigenen Anwendung.</p><a className="button blue" href="#idee">Die Geschichte entdecken <ArrowRight size={17} /></a></div><div className="lp-hero-art"><span>VON DER IDEE ZUR ANWENDUNG</span><img src={asset + 'logo.webp'} alt="LeadPilot-Logo" width="900" height="450" /><small>Konzeption & Umsetzung mit KI</small></div></div></div>
    <div className="lp-boundary section-pad"><strong>Zur Einordnung</strong><p>LeadPilot ist ein fiktives Unternehmen aus meiner Weiterbildung. Historie, Kennzahlen, Kundenbeispiele und Marketingmotive sind Teil des Szenarios.</p></div>
    <div className="lp-layout section-pad"><aside className="lp-toc"><span>Auf dieser Seite</span><nav aria-label="Meilensteine der LeadPilot-Chronik">{chapters.map(([id,label],i) => <a key={id} href={`#${id}`}><small>{String(i+1).padStart(2,'0')}</small>{label}</a>)}</nav></aside>
    <div className="lp-content">
      <section className="lp-chapter"><ChapterTitle number="01" kicker="Juli 2026 · Der Anfang" title="Eine Idee für den Vertriebsalltag." id="idee" />
        <p className="lp-lead">Wie lässt sich verhindern, dass ein vielversprechender Kontakt nach dem ersten Gespräch liegen bleibt?</p>
        <p>Aus einer Aufgabe der Digital Business Akademie, ein fiktives B2B-Unternehmen zu entwickeln, entstand meine Idee für LeadPilot: ein einfach zugängliches Sales-CRM, das Vertriebsleitern hilft, Leads und nächste Schritte im Blick zu behalten.</p>
        <div className="lp-quote"><span>Die Ausgangsidee</span><p>Kein Lead soll verloren gehen, weil unklar ist, wer sich als Nächstes darum kümmert.</p></div>
        <p>Aus dieser Produktidee wurde Schritt für Schritt eine eigene CRM- und Reporting-Anwendung.</p>
        <SourceNote><p>DBA Kick-off-Intro zum Unternehmensprojekt, Task Sheet 2.1.11 und meine Lösung zur Geschäftsidee. Die Aufgabenstellung wird sinngemäß eingeordnet; ihr Originaldesign wird nicht übernommen.</p></SourceNote>
      </section>
      <section className="lp-chapter"><ChapterTitle number="02" kicker="Juli bis Oktober 2026 · Sichtbar werden" title="Eine Idee braucht eine Stimme." id="marketing" />
        <p>Aus der Zielgruppe und ihrem Problem entwickelte ich Contentideen: erste LinkedIn-Motive, eine Contentstrategie und später eine Kampagne rund um Messekontakte. Die Beispiele zeigen, wie aus einem fachlichen Problem unterschiedliche Formate entstehen.</p>
        <MarketingGallery />
        <p className="lp-caption">Marketingentwürfe für das fiktive Projekt; gezeigte Oberflächen sind Konzeptmotive.</p>
        <SourceNote><p>Meine Lösung zur Contentstrategie, früher LinkedIn-Post und ausgewählte Materialien aus den LeadPilot-Marketing- und Expo-Ordnern. Die im frühen Motiv genannte Prozentzahl wurde nicht als Tatsache übernommen.</p></SourceNote>
      </section>
      <section className="lp-chapter"><ChapterTitle number="03" kicker="2026 · Unternehmenskontext" title="Eine Welt, in der die Idee arbeiten kann." id="unternehmen" />
        <p>Damit Aufgaben, CRM und Kennzahlen zusammenpassen, entwickelte ich für LeadPilot eine fiktive Unternehmenshistorie. Geschäftsbericht, Faktenblatt und Quartalsberichte geben dem Projekt eine gemeinsame Datenbasis.</p>
        <div className="lp-doc-feature"><img src={asset + 'geschaeftsbericht.webp'} alt="Titelblatt des fiktiven LeadPilot-Geschäftsberichts 2025" width="1100" height="1550" loading="lazy" /><div><span className="eyebrow">Ein dokumentiertes Szenario</span><h3>Unternehmensdaten mit Kontext.</h3><p>Der Geschäftsbericht beschreibt das fiktive Geschäftsjahr 2025. Das Faktenblatt v1.2 hält Stammdaten und Annahmen fest; der Quartalsbericht führt das Szenario für 2026 fort.</p><div className="lp-figures"><div><strong>100</strong><span>aktive Kunden</span></div><div><strong>62.060 €</strong><span>monatlich wiederkehrender Umsatz</span></div></div><small>Fiktive Werte aus dem Szenariobericht Q3 2026. Keine realen Umsätze oder persönlichen Vertriebserfolge.</small></div></div>
        <SourceNote><p>LeadPilot-Geschäftsbericht 2025, Faktenblatt v1.2 und Quartalsbericht Q3 2026 v1.1. Die Geschäftsjahre gehören zur fiktiven Unternehmensgeschichte und sind nicht mit dem Entstehungsdatum des Projekts gleichzusetzen.</p></SourceNote>
      </section>
      <section className="lp-chapter"><ChapterTitle number="04" kicker="Oktober 2026 · Präsentieren" title="Das Konzept wird zur Geschichte." id="pitch" />
        <p>Für einen Kunden-Pitch übertrug ich die Idee auf das fiktive Unternehmen Weidner Antriebstechnik. Im Team-Pitch entstand daraus gemeinsam mit Patrick und André eine weiter ausgearbeitete Präsentation samt Dossier.</p>
        <div className="lp-document-grid"><figure><img src={asset + 'kundenpitch.webp'} alt="Titelfolie des Kunden-Pitches für das fiktive Unternehmen Weidner" width="1200" height="675" loading="lazy" /><figcaption>Kunden-Pitch · Weidner</figcaption></figure><figure><img src={asset + 'teampitch.webp'} alt="Erste Folie des gemeinsamen LeadPilot-Team-Pitches" width="1200" height="675" loading="lazy" /><figcaption>Team-Pitch · finales Deck</figcaption></figure><figure><img src={asset + 'teamdossier.webp'} alt="Titelblatt des gemeinsamen Team-Pitch-Dossiers" width="900" height="1200" loading="lazy" /><figcaption>Team-Pitch · Dossier</figcaption></figure></div>
        <p className="lp-caption">Die Teamunterlagen sind eine gemeinsame Arbeit. Vorschauen des PPTX und DOCX wurden lokal umgewandelt und können bei Schrift und Umbruch vom Original abweichen.</p>
        <SourceNote><p>Finales Kunden-Pitch-Deck als PDF, Team-Pitch-Deck mit Schlussfolie und gemeinsames Team-Pitch-Dossier. Die Kundenperson und die im Pitch verwendeten Geschäftszahlen gehören zum fiktiven Szenario.</p></SourceNote>
      </section>
      <section className="lp-chapter"><ChapterTitle number="05" kicker="August bis Oktober 2026 · Bewegtbild" title="LeadPilot in Bewegung." id="filme" />
        <p>Die Werbeclips zeigen unterschiedliche Entwicklungsstufen: einen ersten Versuch, ein Messekonzept und ein späteres Feature-Video für LeadPilot Expo.</p>
        <div className="lp-videos">
          <VideoCard name="expo-feature" title="LeadPilot Expo · Feature-Spot" label="AUSGEWÄHLTES HIGHLIGHT" description="Eine illustrierte Abfolge von der Messeliste bis zur Bearbeitung eines Kontakts." audio="Musik und Geräusche; kein Sprechertext." captions={{src:'expo-feature.de.vtt',language:'de',label:'Deutsch'}} />
          <VideoCard name="expo-spot" title="LeadPilot Expo · Messekontakt" label="WERBECLIP" description="Das Expo-Konzept in einer kurzen Messegeschichte." audio="Dieser Originalclip enthält keine Tonspur." captions={{src:'expo-spot.de.vtt',language:'de',label:'Deutsch'}} />
          <VideoCard name="erster-werbespot" title="Der erste LeadPilot-Werbespot" label="ERSTER VERSUCH" description="Ein früher Versuch, die Marke und ihre Idee als Bewegtbild zu zeigen." audio="Englischer Sprechertext · Untertitel verfügbar; zeitliche Abstimmung noch zu prüfen." captions={{src:'erster-werbespot.en.vtt',language:'en',label:'English'}} transcript="LeadPilot Connect – your leads always in motion. No lead is forgotten, no opportunity missed. Streamline your workflow, simplify your sales. For SMBs ready to grow." />
        </div>
        <SourceNote><p>Originalclips „LP-Werbespot2“, „LP Expo – Werbespot“ und „LeadPilot – Werbespot“. Die gezeigten Produktoberflächen sind Werbevisualisierungen und kein Nachweis einer produktiven Integration.</p></SourceNote>
      </section>
      <section className="lp-chapter"><ChapterTitle number="06" kicker="2026 · Zusammenhänge" title="Prozesse sichtbar machen." id="diagramme" />
        <p>Diagramme und Prozessbilder halfen mir dabei, abstrakte Vertriebsabläufe verständlich zu machen: von der Einordnung eines Leads bis zum nächsten Schritt nach einer Messe.</p>
        <div className="lp-figure-grid"><figure><img src={asset + 'leadqualifizierung.webp'} alt="Grafik zur Einordnung kalter, warmer und heißer Leads nach Kaufabsicht und Zielkundenpassung" width="1200" height="675" loading="lazy" /><figcaption>Lead-Qualifizierung · kalt, warm, heiß</figcaption><details><summary>Grafik als Text</summary><p>Die Grafik ordnet Leads entlang ihrer Kaufabsicht und ihrer Passung zum Zielkundenbild ein. Sie unterscheidet kalte, warme und heiße Kontakte.</p></details></figure><figure><img src={asset + 'expo-nachbereitung.webp'} alt="Drei illustrierte Schritte: Messeliste importieren, Person zuweisen und nächsten Schritt festhalten" width="1200" height="675" loading="lazy" /><figcaption>Expo-Nachbereitung · drei Schritte</figcaption><details><summary>Grafik als Text</summary><p>Eine Messeliste wird importiert, einem Kontakt eine verantwortliche Person zugewiesen und anschließend der nächste Schritt festgehalten.</p></details></figure></div>
        <SourceNote><p>LeadPilot-Grafik zur Lead-Qualifizierung und Expo-Prozessvisualisierung. Beide beschreiben Konzepte; sie sind kein Nachweis, dass alle gezeigten Funktionen in der aktuellen CRM-App implementiert sind.</p></SourceNote>
      </section>
      <section className="lp-chapter"><ChapterTitle number="07" kicker="August bis Oktober 2026 · Anwendung" title="Vom Unternehmensdashboard zum CRM." id="dashboard" />
        <p>Die fiktiven Unternehmensdaten wurden zunächst in einem eigenständigen HTML-Dashboard erfahrbar. Aus diesem Gerüst entwickelte sich das heutige Dashboard-CRM weiter. Historische Stammdaten, Simulation und aktuelle Datenzugriffe werden darin getrennt eingeordnet.</p>
        <div className="lp-compare"><ComparisonImage src={asset + 'dashboard-early.webp'} alt="Frühere Ansicht des ursprünglichen LeadPilot-Unternehmensdashboards" label="Früher · Dashboard" caption="Eigenständiges Unternehmensdashboard · historische Ansicht" /><ComparisonImage src="/media/leadpilot-dashboard.webp" alt="Executive Dashboard im LeadPilot Dashboard-CRM v2.5.0 aus einer regulären Testsitzung" label="Heute · Dashboard" caption="Executive Dashboard · v2.5.0, Testsitzung vom 27. Oktober 2026" /></div>
        <div className="lp-comparison-intro"><span className="eyebrow">Ein weiteres Beispiel · Firmensitz</span><h3>Von der Adresse zum visuellen Ort.</h3><p>Im ursprünglichen Dashboard standen Anschrift und Räumlichkeiten als Tabelle im Mittelpunkt. In v2.5.0 ergänzen fiktive Visualisierungen des Standorts die Daten.</p></div>
        <div className="lp-compare"><ComparisonImage src={asset + 'standort-frueher.webp'} alt="Frühere Standortseite: eine Tabelle mit der fiktiven Anschrift und den Räumlichkeiten" label="Früher · Standort" caption="Anschrift und Räumlichkeiten im ursprünglichen Unternehmensdashboard" /><ComparisonImage src={asset + 'standort-v25.webp'} alt="Standortseite in v2.5.0 mit einer fiktiven Visualisierung des Gebäudes" label="Heute · Standort" caption="v2.5.0 mit fiktivem Gebäudebild · Viewer-Sitzung vom 28. Oktober 2026" /></div>
        <div className="lp-comparison-intro"><span className="eyebrow">Ein drittes Beispiel · Unternehmenssteckbrief</span><h3>Stammdaten anders aufbereitet.</h3><p>Der Steckbrief wurde von einer langen Tabelle in eine gegliederte Ansicht mit Themenbereichen überführt. Die darin gezeigten Unternehmensangaben und Rollen gehören zur Fiktion.</p></div>
        <div className="lp-compare"><ComparisonImage src={asset + 'profil-frueher.webp'} alt="Früherer Unternehmenssteckbrief als Tabelle mit fiktiven Stammdaten" label="Früher · Steckbrief" caption="Tabellarische Stammdaten im ursprünglichen Dashboard" /><ComparisonImage src={asset + 'profil-v25.webp'} alt="Unternehmenssteckbrief in v2.5.0 mit gegliederten Bereichen für fiktive Stammdaten" label="Heute · Steckbrief" caption="Gegliederte Ansicht in v2.5.0 · Viewer-Sitzung vom 28. Oktober 2026" /></div>
        <p>Das separate Standalone-Komponentengerüst zeigt den nächsten Schritt: Inhalte und Oberflächenelemente wurden als eigene Bausteine organisiert.</p>
        <div className="lp-components" aria-label="Beispiele aus dem Standalone-Komponentengerüst"><div><strong>KpiCard</strong><span>Kennzahlen</span></div><div><strong>InfoCard</strong><span>Informationen</span></div><div><strong>ChartCard</strong><span>Diagramme</span></div><div><strong>DataTableCard</strong><span>Tabellen</span></div></div>
        <SourceNote><p>Ursprüngliches „LeadPilot_Unternehmens_Dashboard.html“, Standalone-Dashboard-Dateistruktur und reguläre Viewer-Sitzungen des Dashboard-CRM v2.5.0 vom 27. und 28. Oktober 2026. Die neueren Ausschnitte zeigen fiktive Stammdaten. Eine damalige Live-Anbindung folgt nicht aus dem alten Dashboard.</p></SourceNote>
      </section>
      <section className="lp-chapter"><ChapterTitle number="08" kicker="2026 · Gestaltung" title="Ein System für die Marke." id="design" />
        <p>Mit dem Designsystem erhielt LeadPilot eine gemeinsame visuelle Sprache: Logo, Farben, Typografie und Komponenten für unterschiedliche Anwendungsfälle.</p>
        <div className="lp-brand-board"><img src={asset + 'brand-board.webp'} alt="Mockup mit LeadPilot-Anwendungen auf Geräten, Drucksachen und Geschäftsausstattung" width="1200" height="1000" loading="lazy" /><p>Brand-Mockup · Gestaltungskonzept, keine real produzierten Gegenstände</p></div>
        <div className="lp-design-grid"><div className="lp-font-sample"><span>HAUSSCHRIFT</span><strong>LeadPilot<br />Grotesk.</strong><p>Aa Bb Cc 0123456789</p></div><div className="lp-palette"><span>FARBEN DES DESIGNSYSTEMS</span><div>{[['#061613','Dunkel'],['#00D9C6','Türkis'],['#FF7A3D','Orange'],['#FFFFFF','Weiß']].map(([color,name])=><div key={color}><i style={{background:color}} /><strong>{name}</strong><small>{color}</small></div>)}</div></div></div>
        <p className="lp-caption">LeadPilot Grotesk ist eine modifizierte Version von Space Grotesk und steht unter der SIL Open Font License 1.1. <a href={asset + 'LeadPilotGrotesk-OFL.txt'}>Lizenz und Herkunft</a>.</p>
        <a className="text-link" href="https://claude.ai/artifact/Bk5nju1MEkB6Nw6DPRRuVp" target="_blank" rel="noreferrer">Claude-Artefakt öffnen <ArrowUpRight size={16} /></a><p className="lp-caption">Externer Link. Der Inhalt des Artefakts konnte bei der lokalen Prüfung nicht unabhängig abgerufen werden.</p>
        <SourceNote><p>Das von mir ausgewählte finale Logo, LeadPilot-Designsystem mit Farb- und Typografietokens, Komponenten, Brand-Mockup sowie Schriftdatei und mitgelieferte Lizenz.</p></SourceNote>
      </section>
      <div className="lp-next"><span className="eyebrow">Die Anwendung im Detail</span><h2>Von der Geschichte<br />zur Arbeitsprobe.</h2><p>Die Case Study zeigt, wie ich CRM, Kennzahlen und Datenquellen in der aktuellen Anwendung einordne.</p><Link to="/cases/leadpilot" className="button blue">Zur LeadPilot Case Study <ArrowRight size={17} /></Link></div>
    </div></div>
  </article>;
}
