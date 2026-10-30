import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import './leadpilot-chronik.css';

const asset = '/leadpilot/assets/';
const chapters = [
  ['idee', 'Die erste Idee'],
  ['unternehmen', 'Die Unternehmenswelt'],
  ['marketing', 'Marketing & Content'],
  ['design', 'Das Designsystem'],
  ['pitch', 'Kunden- & Team-Pitch'],
  ['dashboard', 'Vom Dashboard zum CRM'],
] as const;

const companyDocs = [
  { group: 'Strategie', items: [
    ['icp', 'Ideal Customer Profile', 'Welcher Kunde passt wirtschaftlich am besten?'],
    ['buyer-persona', 'Buyer Persona', 'Vertriebsleiter als zentrale Entscheiderrolle.'],
    ['strategische-analyse', 'Strategische Analyse & Zielgruppenpriorisierung', 'Positionierung und Reihenfolge der Zielgruppen.'],
  ] },
  { group: 'Gründung', items: [
    ['gf-vertrag', 'Geschäftsführeranstellungsvertrag', 'Rolle und Pflichten der Geschäftsführung.'],
    ['gesellschafterliste', 'Gesellschafterliste', 'Anteile nach der Seed-Finanzierung.'],
    ['mietvertrag', 'Mietvertrag Augustusplatz 9', 'Der fiktive Firmensitz in Leipzig.'],
    ['handelsregister', 'Anmeldung zum Handelsregister', 'Mustertext für das Registergericht.'],
    ['satzung', 'Satzung der LeadPilot GmbH', 'Gesellschaftsvertrag als Grundlage.'],
  ] },
  { group: 'Finanzen', items: [
    ['checkup', 'Unternehmens-Check-up 2025', 'Jährliche Bestandsaufnahme.'],
    ['geschaeftsbericht', 'Geschäftsbericht 2025 mit Jahresabschluss', 'Das fiktive Geschäftsjahr in Zahlen.'],
    ['unternehmensanalyse', 'Unternehmensanalyse', 'Stärken, Schwächen und Handlungsfelder.'],
    ['quartalsbericht-q1', 'Quartalsbericht Q1 2026', 'Fortschreibung des Szenarios.'],
    ['quartalsbericht-q2', 'Quartalsbericht Q2 2026', 'Fortschreibung des Szenarios.'],
    ['quartalsbericht-q3', 'Quartalsbericht Q3 2026', 'Grundlage der Kennzahlen im CRM.'],
  ] },
  { group: 'Marketing', items: [
    ['marketingplanung', 'Marketingplanung H2 2026', 'Sechs-Monats-Roadmap von August bis Januar.'],
    ['content-strategie', 'Content-Strategie', 'Fragen der Persona als Themenquelle.'],
  ] },
] as const;

type Shot = { src: string; alt: string; caption?: string };
const LightboxContext = createContext<(shot: Shot) => void>(() => {});

function Lightbox({ children }: { children: ReactNode }) {
  const [shot, setShot] = useState<Shot | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { const d = dialog.current; if (!d) return; if (shot && !d.open) d.showModal(); if (!shot && d.open) d.close(); }, [shot]);
  return <LightboxContext.Provider value={setShot}>{children}
    <dialog ref={dialog} className="lp-lightbox" onClose={() => setShot(null)} onClick={e => { if (e.target === e.currentTarget) setShot(null); }} aria-label={shot?.alt ?? 'Bildansicht'}>
      {shot && <figure><img src={shot.src} alt={shot.alt} />{shot.caption && <figcaption>{shot.caption}</figcaption>}</figure>}
      <button type="button" onClick={() => setShot(null)} aria-label="Dialog schließen"><X size={20} /></button>
    </dialog>
  </LightboxContext.Provider>;
}

function Thumb({ src, alt, caption, className }: Shot & { className?: string }) {
  const open = useContext(LightboxContext);
  return <button type="button" className={'lp-thumb ' + (className ?? '')} onClick={() => open({ src, alt, caption })} aria-label={`${alt} – vergrößern`}><img src={src} alt={alt} loading="lazy" /></button>;
}

function ThumbFigure({ src, alt, caption }: Shot) {
  return <figure className="lp-thumb-figure"><Thumb src={src} alt={alt} caption={caption} />{caption && <figcaption>{caption}</figcaption>}</figure>;
}

const videos = [
  { name: 'expo-feature', title: 'LeadPilot Expo · Feature-Spot', description: 'Eine illustrierte Abfolge von der Messeliste bis zur Bearbeitung eines Kontakts.', audio: 'Musik und Geräusche; kein Sprechertext.', captions: { src: 'expo-feature.de.vtt', language: 'de', label: 'Deutsch' } },
  { name: 'expo-spot', title: 'LeadPilot Expo · Messekontakt', description: 'Das Expo-Konzept in einer kurzen Messegeschichte.', audio: 'Dieser Originalclip enthält keine Tonspur.', captions: { src: 'expo-spot.de.vtt', language: 'de', label: 'Deutsch' } },
] as const;

const marketing = [
  { src: 'marketing/follow-up-problem.webp', phase: 'Früh', alt: 'Social-Media-Grafik: 120 Leads im Quartal, nur 33 werden wirklich bearbeitet.', title: 'Kein Lead-Problem, ein Follow-up-Problem', note: 'Ein frühes Motiv, das das Kernproblem der Geschäftsidee in einer Zahl zeigt. Die Werte sind illustrativ.' },
  { src: 'marketing/landingpage.webp', phase: 'Früh', alt: 'Entwurf einer LeadPilot-Landingpage mit der Überschrift Kein Lead wird mehr vergessen.', title: 'Die erste Landingpage', note: 'Entwurf der Startseite mit Nutzenversprechen und Testangebot. Die genannte Steigerung ist ein Platzhalterwert.' },
  { src: 'marketing/connect-mail.webp', phase: 'Früh', alt: 'Kunden-E-Mail zur Einführung der Integration LeadPilot Connect.', title: 'Launch-Mail für LeadPilot Connect', note: 'Kunden-E-Mail aus dem Launch-Sprint zur Zapier- und Make-Integration im August 2026.' },
  { src: 'marketing/ki-scoring-mail.webp', phase: 'Früh', alt: 'Produkt-E-Mail: KI-Scoring zeigt, welcher Lead zuerst dran ist.', title: 'Feature-Mail zum KI-Scoring', note: 'Onboarding-Mail, die ein neues Feature in drei Schritten erklärt.' },
  { src: 'marketing/mql-handoff.webp', phase: 'Früh', alt: 'Internes Dokument zum MQL-Handoff in drei Schritten zwischen Marketing und Sales.', title: 'MQL-Handoff an Sales', note: 'Interne Übergaberegel vom August 2026: Wann ein Lead an Sales geht und was danach dokumentiert wird.' },
  { src: 'marketing/expo-features.webp', phase: 'Aktuell', alt: 'Anzeige: Alle Messe-Features von LeadPilot Expo im Überblick.', title: 'LeadPilot Expo · Feature-Übersicht', note: 'Kampagnenmotiv vom Oktober 2026 mit zehn Funktionen rund um Messekontakte.' },
  { src: 'marketing/expo-anzeige.webp', phase: 'Aktuell', alt: 'Anzeige: Messekontakt rein, nächster Schritt klar. Ein Smartphone scannt eine Visitenkarte.', title: 'LeadPilot Expo · Anzeige', note: 'Hauptmotiv der Expo-Kampagne, Oktober 2026.' },
  { src: 'marketing/messe-workflow.webp', phase: 'Aktuell', alt: 'Vier Schritte vom Import der Messeliste bis zum Anruf beim Kontakt.', title: 'Messe-Workflow in vier Schritten', note: 'Erklärgrafik vom Oktober 2026. Die Oberflächen sind Konzeptmotive.' },
  { src: 'marketing/messe-demo.webp', phase: 'Aktuell', alt: 'Anzeige für die Decision-Phase: Ihre Messe-Liste, 30 Minuten Klarheit.', title: 'Demo-Angebot für die Entscheidungsphase', note: 'Contentpiece entlang der Customer Journey, Oktober 2026.' },
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
    <figure className="lp-gallery-image"><Thumb src={asset + current.src} alt={current.alt} caption={current.title} /></figure>
    <div className="lp-gallery-footer"><div aria-live="polite"><span className="lp-gallery-count">{String(index + 1).padStart(2, '0')} / {marketing.length}</span><h3><span className="lp-phase">{current.phase}</span> {current.title}</h3><p>{current.note}</p></div><div className="lp-gallery-controls"><button type="button" onClick={() => move(-1)} aria-label="Vorheriges Marketingmotiv"><ChevronLeft size={20} /></button><button type="button" onClick={() => move(1)} aria-label="Nächstes Marketingmotiv"><ChevronRight size={20} /></button></div></div>
    <div className="lp-gallery-thumbs" aria-label="Marketingmotiv auswählen">{marketing.map((item, i) => <button type="button" key={item.src} className={i === index ? 'active' : ''} aria-label={`Motiv ${i + 1}: ${item.title}`} aria-pressed={i === index} onClick={() => setIndex(i)}><img src={asset + item.src} alt="" width="90" height="60" loading="lazy" /></button>)}</div>
  </div>;
}

function ComparisonImage({ src, alt, label, caption }: { src: string; alt: string; label: string; caption: string }) {
  return <figure className="lp-thumb-figure"><Thumb src={src} alt={alt} caption={`${label} · ${caption}`} /><figcaption><strong>{label}</strong> {caption}</figcaption></figure>;
}

function VideoSwitcher() {
  const [index, setIndex] = useState(0);
  const v = videos[index];
  const move = (delta: number) => setIndex((index + delta + videos.length) % videos.length);
  return <article className="lp-video"><video key={v.name} controls preload="none" poster={asset + v.name + '-poster.webp'} aria-label={v.title}><source src={asset + v.name + '.mp4'} type="video/mp4" /><track kind="captions" src={asset + v.captions.src} srcLang={v.captions.language} label={v.captions.label} default /></video><div><span className="eyebrow">Clip {index + 1} / {videos.length}</span><h4 aria-live="polite">{v.title}</h4><p>{v.description}</p><p className="lp-video-audio">{v.audio}</p><div className="lp-gallery-controls"><button type="button" onClick={() => move(-1)} aria-label="Vorheriger Clip"><ChevronLeft size={20} /></button><button type="button" onClick={() => move(1)} aria-label="Nächster Clip"><ChevronRight size={20} /></button></div></div></article>;
}

export function LeadPilotTeaser() {
  return <section id="leadpilot-hintergrund" className="lp-teaser section-pad" aria-labelledby="lp-teaser-title"><div className="lp-teaser-copy"><span className="eyebrow">Hinter dem Projekt</span><h2 id="lp-teaser-title">Wie LeadPilot<br />entstanden ist.</h2><p>Von einer Geschäftsidee über Content und Pitch bis zum eigenen Dashboard und Designsystem.</p><Link to="/leadpilot" className="text-link">Die Projektchronik ansehen <ArrowRight size={17} /></Link></div><Link to="/leadpilot" className="lp-teaser-visual" aria-label="LeadPilot-Projektchronik ansehen"><span>PROJEKTCHRONIK <ArrowUpRight size={16} /></span><img src={asset + 'logo.webp'} alt="" width="900" height="450" loading="lazy" /><small>Idee · Marke · Anwendung</small></Link></section>;
}

export default function LeadPilotChronik() {
  return <Lightbox><article className="lp-chronicle">
    <div className="lp-hero section-pad"><Link className="back-link" to="/"><ArrowLeft size={16} /> Zur Startseite</Link><div className="lp-hero-grid"><div><span className="eyebrow">Projektchronik · seit Juli 2026</span><h1 tabIndex={-1}>Aus einer Idee<br />wird <span>LeadPilot.</span></h1><p>Ein fiktives B2B-Unternehmen als praktisches Lernprojekt: von den ersten Gedanken über Unternehmenswelt, Marketing und Pitch bis zur eigenen Anwendung.</p><a className="button blue" href="#idee">Die Geschichte entdecken <ArrowRight size={17} /></a></div><div className="lp-hero-art"><span>VON DER IDEE ZUR ANWENDUNG</span><img src={asset + 'logo.webp'} alt="LeadPilot-Logo" width="900" height="450" /><small>Konzeption & Umsetzung mit KI</small></div></div></div>
    <div className="lp-boundary section-pad"><strong>Zur Einordnung</strong><p>LeadPilot ist ein fiktives Unternehmen aus meiner Weiterbildung. Historie, Kennzahlen, Kundenbeispiele und Marketingmotive sind Teil des Szenarios.</p></div>
    <div className="lp-layout section-pad"><aside className="lp-toc"><span>Auf dieser Seite</span><nav aria-label="Meilensteine der LeadPilot-Chronik">{chapters.map(([id,label],i) => <a key={id} href={`#${id}`}><small>{String(i+1).padStart(2,'0')}</small>{label}</a>)}</nav></aside>
    <div className="lp-content">
      <section className="lp-chapter"><ChapterTitle number="01" kicker="Juli 2026 · Der Anfang" title="Eine Idee für den Vertriebsalltag." id="idee" />
        <p className="lp-lead">Wie lässt sich verhindern, dass ein vielversprechender Kontakt nach dem ersten Gespräch liegen bleibt?</p>
        <p>Aus einer Aufgabe der Digital Business Akademie, ein fiktives B2B-Unternehmen zu entwickeln, entstand meine Idee für LeadPilot.</p>
        <dl className="lp-idea">
          <div><dt>Angebot</dt><dd>Ein KI-gestütztes Sales-CRM als SaaS für Lead-Management und Vertriebsautomatisierung.</dd></div>
          <div><dt>Zielgruppe</dt><dd>Vertriebsleiter in kleinen und mittelständischen B2B-Unternehmen bis etwa 200 Mitarbeitende, etwa aus Maschinenbau, IT, Großhandel oder Agenturen.</dd></div>
          <div><dt>Problem</dt><dd>Leads gehen verloren, weil das Nachfassen nach dem Erstkontakt nicht systematisch organisiert ist und vom einzelnen Mitarbeiter abhängt.</dd></div>
          <div><dt>Lösung</dt><dd>Nach jedem Kontakt legt das System die nächste fällige Aktivität an und weist sie zu. Ein Dashboard zeigt dem Vertriebsleiter, welche Leads überfällig sind.</dd></div>
        </dl>
        <div className="lp-quote"><span>Die Ausgangsidee</span><p>Kein Lead soll verloren gehen, weil unklar ist, wer sich als Nächstes darum kümmert.</p></div>
        <SourceNote><p>Task Sheet 2.1.11, meine Lösung zu Aufgabe 2 „Geschäftsidee“. Die Aufgabenstellung wird sinngemäß eingeordnet; ihr Originaldesign wird nicht übernommen.</p></SourceNote>
      </section>
      <section className="lp-chapter"><ChapterTitle number="02" kicker="Juli bis Oktober 2026 · Unternehmenskontext" title="Eine Welt, in der die Idee arbeiten kann." id="unternehmen" />
        <p>Damit Aufgaben, CRM und Kennzahlen zusammenpassen, entwickelte ich für LeadPilot eine fiktive Unternehmenswelt: von der Zielgruppe über Gründungsunterlagen bis zu Geschäfts- und Quartalsberichten.</p>
        <div className="lp-figures"><div><strong>100</strong><span>aktive Kunden</span></div><div><strong>62.060 €</strong><span>monatlich wiederkehrender Umsatz</span></div></div>
        <p className="lp-caption">Fiktive Werte aus dem Szenariobericht Q3 2026. Keine realen Umsätze oder persönlichen Vertriebserfolge.</p>
        {companyDocs.map(({ group, items }) => <div className="lp-doc-group" key={group}><h3>{group}</h3><ul>{items.map(([file, title, note]) => <li key={file}><Thumb src={`${asset}docs/${file}.webp`} alt={`Erste Seite: ${title}`} caption={title} /><div><strong>{title}</strong><span>{note}</span></div></li>)}</ul></div>)}
        <p className="lp-caption">Vorschau jeweils der ersten Seite. Textdokumente wurden für die Vorschau einheitlich gesetzt und können vom Originallayout abweichen.</p>
        <SourceNote><p>Projektordner „LeadPilot – Unternehmensdaten-Projekt Kontext“ und Marketingplanung H2 2026. Die Geschäftsjahre gehören zur fiktiven Unternehmensgeschichte und sind nicht mit dem Entstehungsdatum des Projekts gleichzusetzen. Rechtsdokumente sind Übungsentwürfe, keine geprüften Verträge.</p></SourceNote>
      </section>
      <section className="lp-chapter"><ChapterTitle number="03" kicker="Juli bis Oktober 2026 · Sichtbar werden" title="Eine Idee braucht eine Stimme." id="marketing" />
        <p>Aus der Zielgruppe und ihrem Problem entwickelte ich Content: zuerst Social-Posts, Landingpage und E-Mails, später eine Kampagne rund um Messekontakte. Die Galerie zeigt frühe und aktuelle Arbeiten.</p>
        <MarketingGallery />
        <p className="lp-caption">Marketingentwürfe für das fiktive Projekt; gezeigte Oberflächen sind Konzeptmotive.</p>
        <h3 className="lp-subhead">LeadPilot in Bewegung</h3>
        <VideoSwitcher />
        <h3 className="lp-subhead">Prozesse visualisieren</h3>
        <p>Diagramme halfen dabei, abstrakte Vertriebsabläufe verständlich zu machen: von der Einordnung eines Leads bis zum nächsten Schritt nach einer Messe.</p>
        <div className="lp-thumb-row"><ThumbFigure src={asset + 'leadqualifizierung.webp'} alt="Grafik zur Einordnung kalter, warmer und heißer Leads nach Kaufabsicht und Zielkundenpassung" caption="Lead-Qualifizierung · kalt, warm, heiß" /><ThumbFigure src={asset + 'expo-nachbereitung.webp'} alt="Drei illustrierte Schritte: Messeliste importieren, Person zuweisen und nächsten Schritt festhalten" caption="Expo-Nachbereitung · drei Schritte" /></div>
        <SourceNote><p>Meine Auswahl aus den LeadPilot-Marketing- und Expo-Materialien, Juli bis Oktober 2026 sowie die Originalclips „LP-Werbespot2“ und „LP Expo – Werbespot“. Zahlen in den Motiven sind Marketingbeispiele, keine Ergebnisse. Gezeigte Produktoberflächen und Prozessgrafiken sind Konzepte, kein Nachweis implementierter Funktionen.</p></SourceNote>
      </section>
      <section className="lp-chapter"><ChapterTitle number="04" kicker="2026 · Gestaltung" title="Ein System für die Marke." id="design" />
        <p>Mit dem Designsystem erhielt LeadPilot eine gemeinsame visuelle Sprache: Logo, Farben, Typografie und Komponenten. Es wurde zur Grundlage des späteren Frontends im Dashboard-CRM.</p>
        <div className="lp-design-row"><ThumbFigure src={asset + 'brand-board.webp'} alt="Mockup mit LeadPilot-Anwendungen auf Geräten, Drucksachen und Geschäftsausstattung" caption="Brand-Mockup · Gestaltungskonzept, keine real produzierten Gegenstände" /><div className="lp-font-sample"><span>HAUSSCHRIFT</span><strong>LeadPilot<br />Grotesk.</strong><p>Aa Bb Cc 0123456789</p></div><div className="lp-palette"><span>FARBEN</span><div>{[['#061613','Dunkel'],['#00D9C6','Türkis'],['#FF7A3D','Orange'],['#FFFFFF','Weiß']].map(([color,name])=><div key={color}><i style={{background:color}} /><strong>{name}</strong><small>{color}</small></div>)}</div></div></div>
        <p className="lp-caption">LeadPilot Grotesk ist eine modifizierte Version von Space Grotesk und steht unter der SIL Open Font License 1.1. <a href={asset + 'LeadPilotGrotesk-OFL.txt'}>Lizenz und Herkunft</a>.</p>
        <SourceNote><p>Das von mir ausgewählte finale Logo, LeadPilot-Designsystem mit Farb- und Typografietokens, Komponenten, Brand-Mockup sowie Schriftdatei und mitgelieferte Lizenz.</p></SourceNote>
      </section>
      <section className="lp-chapter"><ChapterTitle number="05" kicker="Oktober 2026 · Präsentieren" title="Das Konzept wird zur Geschichte." id="pitch" />
        <p>Für einen Kunden-Pitch übertrug ich die Idee auf das fiktive Unternehmen Weidner Antriebstechnik. Im Team-Pitch entstand daraus gemeinsam mit Patrick und André eine weiter ausgearbeitete Präsentation samt Dossier.</p>
        <div className="lp-thumb-row three"><ThumbFigure src={asset + 'kundenpitch.webp'} alt="Titelfolie des Kunden-Pitches für das fiktive Unternehmen Weidner" caption="Kunden-Pitch · Weidner" /><ThumbFigure src={asset + 'teampitch.webp'} alt="Erste Folie des gemeinsamen LeadPilot-Team-Pitches" caption="Team-Pitch · finales Deck" /><ThumbFigure src={asset + 'teamdossier.webp'} alt="Titelblatt des gemeinsamen Team-Pitch-Dossiers" caption="Team-Pitch · Dossier" /></div>
        <p className="lp-caption">Die Teamunterlagen sind eine gemeinsame Arbeit. Vorschauen des PPTX und DOCX wurden lokal umgewandelt und können bei Schrift und Umbruch vom Original abweichen.</p>
        <SourceNote><p>Finales Kunden-Pitch-Deck als PDF, Team-Pitch-Deck mit Schlussfolie und gemeinsames Team-Pitch-Dossier. Die Kundenperson und die im Pitch verwendeten Geschäftszahlen gehören zum fiktiven Szenario.</p></SourceNote>
      </section>
      <section className="lp-chapter"><ChapterTitle number="06" kicker="August bis Oktober 2026 · Anwendung" title="Vom Unternehmensdashboard zum CRM." id="dashboard" />
        <p>Die fiktiven Unternehmensdaten wurden zunächst in einem eigenständigen HTML-Dashboard erfahrbar. Daraus entwickelte sich das heutige Dashboard-CRM. Historische Stammdaten, Simulation und aktuelle Datenzugriffe werden darin getrennt eingeordnet.</p>
        <div className="lp-compare-table">
          <div className="lp-compare"><ComparisonImage src={asset + 'dashboard-early.webp'} alt="Frühere Ansicht des ursprünglichen LeadPilot-Unternehmensdashboards" label="Früher · Dashboard" caption="Eigenständiges Unternehmensdashboard" /><ComparisonImage src="/media/leadpilot-dashboard.webp" alt="Executive Dashboard im LeadPilot Dashboard-CRM v2.5.0 aus einer regulären Testsitzung" label="Heute · Dashboard" caption="v2.5.0, Testsitzung vom 27.10.2026" /></div>
          <div className="lp-compare"><ComparisonImage src={asset + 'standort-frueher.webp'} alt="Frühere Standortseite: eine Tabelle mit der fiktiven Anschrift und den Räumlichkeiten" label="Früher · Standort" caption="Anschrift als Tabelle" /><ComparisonImage src={asset + 'standort-v25.webp'} alt="Standortseite in v2.5.0 mit einer fiktiven Visualisierung des Gebäudes" label="Heute · Standort" caption="v2.5.0 mit fiktivem Gebäudebild, 28.10.2026" /></div>
          <div className="lp-compare"><ComparisonImage src={asset + 'profil-frueher.webp'} alt="Früherer Unternehmenssteckbrief als Tabelle mit fiktiven Stammdaten" label="Früher · Steckbrief" caption="Tabellarische Stammdaten" /><ComparisonImage src={asset + 'profil-v25.webp'} alt="Unternehmenssteckbrief in v2.5.0 mit gegliederten Bereichen für fiktive Stammdaten" label="Heute · Steckbrief" caption="Gegliederte Ansicht in v2.5.0, 28.10.2026" /></div>
        </div>
        <h3 className="lp-subhead">Woher die Daten kommen</h3>
        <p>Heute trennt die Anwendung drei Datenwege: versionierte Ausgangsdaten, die n8n offline erzeugt, Simulationsläufe, die die App in Supabase speichert, und eine signierte Live-Strecke für echte Kennzahlen.</p>
        <div className="lp-thumb-row four"><ThumbFigure src={asset + 'datenfluss.svg'} alt="Datenfluss-Diagramm: HubSpot und Seed-Generator über n8n zu versionierten Baselines, Simulationstabellen in Supabase und Live-KPI-Strecke über n8n in die App" caption="Datenfluss · Stand 30.10.2026" /><ThumbFigure src={asset + 'supabase-schema.webp'} alt="Supabase Studio, Schema-Visualizer mit den Simulations- und Live-KPI-Tabellen der lokalen Datenbank" caption="Supabase Studio · Datenbankschema" /><ThumbFigure src={asset + 'supabase-runs.webp'} alt="Supabase Studio, Tabelle simulation_runs mit sechs abgeschlossenen Szenarioläufen" caption="Supabase Studio · sechs Simulationsläufe" /><ThumbFigure src={asset + 'n8n-live-kpi.webp'} alt="n8n-Editor mit dem Workflow LeadPilot Live KPI Ingest Pipeline: Webhook, Signaturprüfung, Nonce, Ratenlimit, Ingest-RPC und Antworten nach Status" caption="n8n · Live-KPI-Ingest-Workflow" /></div>
        <p className="lp-caption">Lokale Supabase- und n8n-Instanz, aufgenommen am 30.10.2026. Die Live-KPI-Strecke ist aufgebaut, enthält in dieser Datenbank aber noch keine Ereignisse.</p>
        <p>Das separate Standalone-Komponentengerüst zeigt den nächsten Schritt: Inhalte und Oberflächenelemente wurden als eigene Bausteine organisiert.</p>
        <div className="lp-components" aria-label="Beispiele aus dem Standalone-Komponentengerüst"><div><strong>KpiCard</strong><span>Kennzahlen</span></div><div><strong>InfoCard</strong><span>Informationen</span></div><div><strong>ChartCard</strong><span>Diagramme</span></div><div><strong>DataTableCard</strong><span>Tabellen</span></div></div>
        <SourceNote><p>Ursprüngliches „LeadPilot_Unternehmens_Dashboard.html“, Standalone-Dashboard-Dateistruktur und reguläre Viewer-Sitzungen des Dashboard-CRM v2.5.0 vom 27. und 28. Oktober 2026, lokale Supabase-Studio-Aufnahmen vom 30. Oktober 2026 sowie die n8n-Workflows und ihre Dokumentation im Projektordner „tools/n8n“. Die neueren Ausschnitte zeigen fiktive Stammdaten. Eine damalige Live-Anbindung folgt nicht aus dem alten Dashboard.</p></SourceNote>
      </section>
      <div className="lp-next"><span className="eyebrow">Die Anwendung im Detail</span><h2>Von der Geschichte<br />zur Arbeitsprobe.</h2><p>Die Case Study zeigt, wie ich CRM, Kennzahlen und Datenquellen in der aktuellen Anwendung einordne.</p><Link to="/cases/leadpilot" className="button blue">Zur LeadPilot Case Study <ArrowRight size={17} /></Link></div>
    </div></div>
  </article></Lightbox>;
}
