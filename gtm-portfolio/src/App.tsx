import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Download, ExternalLink, FileText, Layers3, Mail, Menu, Plus, X } from 'lucide-react';
import { cases, certificates, profile, type CaseStudy } from './content';
import { RoutingDemo, ProspectingDemo, useProspectReport } from './Demos';
import LeadPilotChronik, { LeadPilotTeaser } from './LeadPilotChronik';
import { AnalysisBlock, RevenueBlock } from './Revenue';

type MediaItem = { src: string; alt: string; caption: string; width?: number; height?: number; description?: string[] };
type CaseMedia = { screenshots: MediaItem[]; diagram?: MediaItem; video?: { src: string; poster: string; subtitles: string; duration: number; captionsBurnedIn?: boolean } };
type MediaManifest = Record<string, CaseMedia>;
function useMedia() {
  const [media, setMedia] = useState<MediaManifest>({});
  useEffect(() => { const controller = new AbortController(); fetch('/data/media.json', { signal: controller.signal }).then(r => r.ok ? r.json() : {}).then(setMedia).catch(() => {}); return () => controller.abort(); }, []);
  return media;
}
const Arrow = ({ size = 19 }: { size?: number }) => <ArrowUpRight size={size} strokeWidth={1.7} aria-hidden="true" />;

function Header() {
  const [open, setOpen] = useState(false); const trigger = useRef<HTMLButtonElement>(null); const location = useLocation();
  useEffect(() => { setOpen(false); }, [location]);
  useEffect(() => { const escape = (e: KeyboardEvent) => { if (e.key === 'Escape' && open) { setOpen(false); trigger.current?.focus(); } }; document.addEventListener('keydown', escape); return () => document.removeEventListener('keydown', escape); }, [open]);
  return <><a className="skip-link" href="#inhalt">Zum Inhalt</a><header className="site-header"><Link className="wordmark" to="/" aria-label="Marc Pönisch – Startseite"><span className="monogram">mp<span>.</span></span><span>Marc Pönisch</span></Link><button ref={trigger} className="menu-toggle" aria-label={open ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button><nav id="main-nav" className={open ? 'nav-open' : ''} aria-label="Hauptnavigation"><a href="/#arbeitsproben">Arbeitsproben</a><a href="/#profil">Über mich</a><NavLink to="/nachweise">Nachweise</NavLink><a className="nav-contact" href="/#kontakt">Kontakt <ArrowRight size={16} /></a></nav></header></>;
}

function Footer() {
  return <footer className="site-footer"><div><strong>Marc Pönisch</strong><span>Vertriebspraxis. Klare Prozesse. Digitale Umsetzung.</span></div><div><Link to="/hinweise">Hinweise & Datenschutz</Link><span>© 2026</span></div></footer>;
}

function Contact() {
  return <section id="kontakt" className="contact-section section-pad"><div><span className="eyebrow">Der nächste Schritt</span><h2>Gute Prozesse beginnen<br />mit einem Gespräch.</h2><p>Du suchst jemanden, der Vertrieb aus der Praxis kennt<br className="desktop-break" /> und digitale Prozesse direkt im System umsetzt? Dann lass uns sprechen.</p></div><div className="contact-actions"><a className="button blue" href={`mailto:${profile.email}`}>Kontakt aufnehmen <ArrowUpRight size={18} /></a><a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">Auf LinkedIn vernetzen <Arrow size={19} /></a><a className="text-link" href={profile.github} target="_blank" rel="noreferrer">Projekte auf GitHub <Arrow size={19} /></a></div></section>;
}

function ProjectCard({ project, media }: { project: CaseStudy; media?: CaseMedia }) {
  const image = media?.screenshots[0];
  return <article className={`project-card project-${project.slug}`}>
    <Link className="project-image" to={`/cases/${project.slug}`} aria-label={`${project.name}: Arbeitsprobe ansehen`}>
      {image ? <img src={image.src} alt={image.alt} loading="lazy" width="1440" height="1000" /> : <div className="project-cover-text"><span className="cover-kicker">{project.number} / ARBEITSPROBE</span><strong>{project.slug === 'leadpilot' ? 'LeadPilot' : project.slug === 'lead-routing' ? 'Eine Anfrage.\nEin klarer Ablauf.' : '50 Profile.\nKlare Kriterien.'}</strong><span>{project.slug === 'leadpilot' ? 'CRM · Reporting · Datenquellen' : project.category}</span></div>}
      <span className="cover-link"><ArrowRight size={19} strokeWidth={1.7} aria-hidden="true" /></span>
    </Link>
    <div className="project-content">
      <span className="project-category">{project.category}</span>
      <h3><Link to={`/cases/${project.slug}`}>{project.name}</Link></h3>
      <p>{project.short}</p>
      <p className="project-decision"><strong>Meine Entscheidung:</strong> {project.decisions[0].title}.</p>
      <div className="project-bottom">
        <span className="status-label"><span />{project.status}</span>
        <Link to={`/cases/${project.slug}`} className="text-link project-action" aria-label={`${project.name}: Arbeitsprobe ansehen`}>Arbeitsprobe ansehen <ArrowRight size={16} /></Link>
      </div>
    </div>
  </article>;
}

function Home() {
  const media = useMedia();
  return <div className="home-page">
    <section className="hero section-pad">
      <div className="hero-copy">
        <span className="eyebrow"><span className="blue-square" /> B2B-Vertrieb & CRM</span>
        <h1 tabIndex={-1}>Vertrieb kennen.<br />Prozesse<br /><span>weiterdenken.</span></h1>
        <p className="hero-description">Ich komme aus dem B2B-Vertrieb. Heute verbinde ich diese Erfahrung mit CRM, Daten und KI – und baue digitale Vertriebsprozesse in eigenen Praxisprojekten direkt nach.</p>
        <div className="hero-actions"><a className="button blue" href="#arbeitsproben">Arbeitsproben ansehen <ArrowDown size={17} /></a><a className="button quiet" href={profile.resume} target="_blank" rel="noreferrer">Lebenslauf als PDF <Arrow /></a></div>
        <div className="hero-person"><img src="/images/marc.webp" alt="Marc Pönisch" width="48" height="48" /><div><strong>Marc Pönisch</strong><span>Leipzig · Weiterbildung zum Digital Sales Manager</span></div></div>
      </div>
      <div className="hero-proof">
        <RoutingDemo compact />
        <p className="proof-note"><Link to="/cases/lead-routing">Zur vollständigen Routing-Arbeitsprobe <ArrowRight size={16} /></Link></p>
      </div>
    </section>
    <section id="arbeitsproben" className="projects-section section-pad" aria-labelledby="projects-title">
      <div className="section-heading"><div><h2 id="projects-title">Drei Arbeitsproben.<br />Entscheidungen zum Nachprüfen.</h2></div><p>Umsatz analysieren, Anfragen sauber übergeben und passende Profile priorisieren – mit Umsetzung, Ergebnissen und klar benannten Grenzen.</p></div>
      <div className="project-grid">{cases.map(project => <ProjectCard project={project} media={media[project.slug]} key={project.slug} />)}</div>
    </section>
    <section id="profil" className="about-section section-pad">
      <div className="about-portrait"><img src="/images/marc.webp" alt="Marc Pönisch, kaufmännischer Hintergrund im B2B-Vertrieb" width="480" height="640" loading="lazy" /><span>Marc Pönisch · Leipzig</span></div>
      <div className="about-copy">
        <h2>Gelernt am Telefon<br />und im ERP-System.</h2>
        <p className="large-copy">Bei der Raiffeisen Waren GmbH in Erfurt habe ich über 30 Stammkunden aus dem Baustoffhandel betreut und jede Woche mehr als 20 Angebote geschrieben. Nachgefasst habe ich am Telefon.</p>
        <p>Mit der Zusage des Kunden ging die Arbeit erst richtig los: Aufträge abwickeln, Lieferungen mit Kunden, Lieferanten und Lager abstimmen, Gutschriften und Rechnungsabweichungen prüfen, damit Fehler nicht erst nach der Buchung auffallen, und die Stammdaten im ERP aktuell halten. Den Außendienst habe ich mit Preisabfragen bei Zulieferern unterstützt; im Einkauf habe ich Angebote von 30 Lieferanten verglichen und verhandelt.</p>
        <p>Seit dem 18. Mai 2026 mache ich in Vollzeit die Weiterbildung zum Digital Sales Manager und arbeite dort mit HubSpot und Salesforce. Für die Arbeitsproben oben lege ich die fachlichen Regeln fest und lasse KI-Coding-Agenten den Code schreiben; ob das Ergebnis stimmt, prüfe ich selbst.</p>
        <p>Ob die Stelle dann Inside Sales oder Sales Operations heißt, ist mir weniger wichtig als zwei Dinge: dass ich mit Kunden zu tun habe und dass die Daten im CRM stimmen.</p>
        <div className="about-facts"><div><span>2019–2024</span><strong>Ausbildung & B2B-Kundenbetreuung</strong><small>Raiffeisen Waren GmbH, Erfurt</small></div><div><span>2025</span><strong>Fachberater</strong><small>OBI, Jena</small></div><div><span>Seit Mai 2026</span><strong>Digital Sales Manager</strong><small>Vollzeit-Weiterbildung · remote</small></div></div>
        <a className="text-link" href={profile.resume} target="_blank" rel="noreferrer">Lebenslauf als PDF <Arrow /></a>
      </div>
    </section>
    <section className="qualifications-section section-pad" aria-labelledby="qualifications-title">
      <div className="section-heading"><div><h2 id="qualifications-title">Wissen mit Grundlage.</h2></div><Link className="text-link" to="/nachweise">Alle Nachweise ansehen <ArrowRight size={17}/></Link></div>
      <div className="qualification-preview">{certificates.slice(0, 3).map(c => <a href={`/nachweise/${c.file}`} key={c.file} target="_blank" rel="noreferrer"><div className="certificate-icon"><FileText size={21}/></div><span><small>{c.issuer}</small><strong>{c.title}</strong><span>{c.kind}{c.date && ` · ${c.date.slice(-4)}`}</span></span><Arrow /></a>)}</div>
      <p className="section-note">Ausgewählte Zertifikate aus meiner Weiterbildung und ergänzenden Kursen.</p>
    </section>
    <LeadPilotTeaser />
    <Contact />
  </div>;
}

function ImageViewer({ items }: { items: MediaItem[] }) {
  const dialog = useRef<HTMLDialogElement>(null); const [active, setActive] = useState<MediaItem | null>(null);
  if (!items.length) return <div className="pending-media"><Layers3 size={25}/><h3>Aktuelle Anwendungsaufnahmen folgen.</h3><p>Aufgenommen wird eine regulär angemeldete Sitzung. Bis dahin beschreiben die Texte den geprüften Quellstand.</p></div>;
  return <><div className="screenshot-grid">{items.map(item => <figure key={item.src}><button className="screenshot-button" onClick={() => { setActive(item); dialog.current?.showModal(); }} aria-label={`${item.caption} vergrößern`}><img src={item.src} alt={item.alt} loading="lazy" width="1440" height="1000" /><span><Plus size={18}/></span></button><figcaption>{item.caption}</figcaption></figure>)}</div><dialog ref={dialog} className="image-dialog" aria-label={active?.caption || 'Arbeitsprobe vergrößert'} onClick={e => { if (e.target === dialog.current) dialog.current.close(); }}><button className="dialog-close" onClick={() => dialog.current?.close()} aria-label="Bildansicht schließen"><X /></button>{active && <><img src={active.src} alt={active.alt}/><p>{active.caption}</p></>}</dialog></>;
}

function DiagramViewer({ item }: { item: MediaItem }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const open = () => { setZoom(window.innerWidth < 768 ? 2.5 : 1); dialog.current?.showModal(); requestAnimationFrame(()=>{if(stage.current) { stage.current.scrollTop = 0; stage.current.scrollLeft = Math.max(0,(stage.current.scrollWidth-stage.current.clientWidth)/2); }}); };
  return <div className="diagram-viewer">
    <figure><button type="button" className="diagram-trigger" onClick={open} aria-label={`${item.caption} vergrößern`}><img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy"/><span><Plus size={17} aria-hidden="true"/>Diagramm vergrößern</span></button><figcaption>{item.caption}</figcaption></figure>
    {!!item.description?.length && <details className="diagram-description"><summary>Diagramm als Text <ChevronDown size={16} aria-hidden="true"/></summary><ol>{item.description.map(text=><li key={text}>{text}</li>)}</ol></details>}
    <a className="text-link diagram-download" href={item.src} download>SVG herunterladen <Download size={15} aria-hidden="true"/></a>
    <dialog ref={dialog} className="diagram-dialog" aria-label="Diagramm vergrößert" onClick={event=>{if(event.target===dialog.current)dialog.current.close();}}>
      <div className="diagram-toolbar"><div role="group" aria-label="Diagrammgröße"><button type="button" onClick={()=>setZoom(value=>Math.max(1,value-.5))} disabled={zoom===1} aria-label="Diagramm verkleinern">−</button><output aria-live="polite">{Math.round(zoom*100)} %</output><button type="button" onClick={()=>setZoom(value=>Math.min(4,value+.5))} disabled={zoom===4} aria-label="Diagramm weiter vergrößern">+</button><button type="button" className="diagram-fit" onClick={()=>setZoom(1)}>Einpassen</button></div><button type="button" className="diagram-close" onClick={()=>dialog.current?.close()} aria-label="Diagrammansicht schließen"><X size={20}/></button></div>
      <p className="diagram-pan-hint">Vergrößerte Ansichten lassen sich horizontal und vertikal verschieben.</p>
      <div ref={stage} className="diagram-stage" tabIndex={0} aria-label="Verschiebbarer Diagrammausschnitt"><img src={item.src} alt={item.alt} width={item.width} height={item.height} style={{width:`${zoom*100}%`}}/></div>
      <p className="diagram-dialog-caption">{item.caption}</p>
    </dialog>
  </div>;
}

function Walkthrough({ project, media }: { project: CaseStudy; media?: CaseMedia }) {
  const captions = project.slug === 'leadpilot' ? ['Die Umsatzlücke 2025 benennen und im Funnel den Engpass in der Testphase finden.', 'Die Hebel Trial-Conversion und Kundenbindung belegen, Unit Economics einordnen und die Simulation starten.', 'Beide Szenarien vergleichen, die Datenherkunft aus Supabase und n8n live zeigen und den Plan 2026 ableiten.'] : project.slug === 'lead-routing' ? ['Eine vollständige synthetische Anfrage prüfen und die Zuständigkeit erklären.', 'Den doppelten Eingang testen. Ein Kontakt und eine Folgeaufgabe bleiben erhalten.', 'Fehlende Angaben und einen CRM-Fehler zeigen. Den Weg über n8n und HubSpot einordnen.'] : ['Den Datensatz aus 50 synthetischen Profilen und das Zielkundenbild erklären.', 'Priorisierte und ausgesonderte Profile vergleichen. Die sechs Kriterien einzeln aufschlüsseln.', 'Den gespeicherten KI-Kontext und Kontaktentwurf zeigen. Modellantwort und Regelbewertung trennen.'];
  return <div className="walkthrough"><div className="walkthrough-heading"><div><span className="eyebrow">In etwa 90 Sekunden</span><h3>Der Ablauf im Überblick.</h3></div><FileText size={24}/></div>{media?.video && <video key={project.slug} controls preload="none" poster={media.video.poster} aria-label={`Portfolio-Walkthrough: ${project.name}`}><source src={media.video.src} type="video/mp4"/><track kind="captions" src={media.video.subtitles} srcLang="de" label="Deutsch" default={!media.video.captionsBurnedIn}/></video>}<details open={!media?.video}><summary>{media?.video ? 'Text zum Walkthrough' : 'Walkthrough lesen'}<ChevronDown size={18}/></summary><ol>{captions.map((c, i) => <li key={c}><span>{['00:00–00:20', '00:20–01:00', '01:00–01:30'][i]}</span><p>{c}</p></li>)}</ol>{!media?.video && <p className="section-note">Das Ablaufskript ist vorbereitet. Eine Videoaufnahme liegt noch nicht vor.</p>}</details></div>;
}

function CasePage() {
  const { slug } = useParams(); const project = cases.find(c => c.slug === slug); const media = useMedia(); const report = useProspectReport();
  if (!project) return <NotFound />;
  const currentMedia = media[project.slug];
  const shift = project.revenue || project.analysis ? 1 : 0; const label = (n: number) => String(n + (n > 1 ? shift : 0)).padStart(2, '0');
  return <article className="case-page"><section className="case-hero section-pad"><Link className="back-link" to="/#arbeitsproben"><ArrowLeft size={16}/> Alle Arbeitsproben</Link><div className="case-eyebrow"><span className="eyebrow">Case {project.number} / {project.category}</span><span className="status-label"><span/>{project.slug === 'ki-prospecting' && report?.status === 'local-ai-verified' ? 'Lokale KI-Auswertung durchgeführt' : project.status}</span></div><h1 tabIndex={-1}>{project.title}</h1><p className="case-lead">{project.short}</p><div className="case-meta"><div><span>Kontext</span><strong>{project.slug === 'leadpilot' ? 'Fiktives B2B-Unternehmen' : 'Eigenständige Erweiterungsdemo'}</strong></div><div><span>Mein Beitrag</span><strong>Konzept, Anforderungen & Prüfung</strong></div><div><span>Umsetzung</span><strong>Mit KI-Coding-Agenten</strong></div></div><div className="tech-list">{project.stack.map(t => <span key={t}>{t}</span>)}</div></section>
    <div className="case-body section-pad"><nav className="case-toc" aria-label="In dieser Fallstudie"><span>In dieser Fallstudie</span><a href="#ausgangslage">Ausgangslage</a>{(project.revenue || project.analysis) && <a href="#analyse">Analyse</a>}<a href="#loesungsweg">Lösungsweg</a><a href="#arbeitsprobe">Arbeitsprobe</a><a href="#mein-beitrag">Mein Beitrag</a><a href="#ergebnis">Ergebnis & Grenzen</a></nav><div className="case-sections">
      <section id="ausgangslage"><SectionLabel number="01">Die Ausgangslage</SectionLabel><h2>Welche Frage dahintersteht.</h2><p>{project.problem}</p><div className="goal-block"><span className="eyebrow">Das Ziel</span><p>{project.goal}</p></div></section>
      {project.revenue && <section id="analyse"><SectionLabel number="02">Die Analyse</SectionLabel><h2>Wo LeadPilot Umsatz verliert.</h2><RevenueBlock data={project.revenue}/></section>}
      {project.analysis && <section id="analyse"><SectionLabel number="02">Die Analyse</SectionLabel><h2>{project.analysis.heading}</h2><AnalysisBlock data={project.analysis}/></section>}
      <section id="loesungsweg"><SectionLabel number={label(2)}>Der Lösungsweg</SectionLabel><h2>Entscheidungen vor Werkzeugen.</h2><div className="decision-list">{project.decisions.map((d, i) => <div key={d.title}><span>{String(i + 1).padStart(2, '0')}</span><div><h3>{d.title}</h3><p>{d.text}</p></div></div>)}</div>{currentMedia?.diagram ? <DiagramViewer key={currentMedia.diagram.src} item={currentMedia.diagram}/> : <div className="diagram-slot"><Layers3 size={28}/><div><h3>Architekturdiagramm in Vorbereitung</h3><p>Der Ablauf ist oben beschrieben. Die grafische Darstellung wird ergänzt.</p></div></div>}</section>
      <section id="arbeitsprobe"><SectionLabel number={label(3)}>Die Arbeitsprobe</SectionLabel><h2>Den Ablauf greifbar machen.</h2>{project.slug === 'lead-routing' ? <><p>Vier Testfälle zeigen die Verarbeitung derselben synthetischen Anfrage. Die Demo greift auf kein externes CRM zu.</p><RoutingDemo/><div className="run-evidence"><Check size={18}/><div><strong>Separater n8n-/HubSpot-Test bestanden</strong><p>Zwei synthetische Anfragen über Webhook und Gateway verarbeitet. Je ein Kontakt und eine verknüpfte Aufgabe, auch nach Wiederholungen.</p><a className="text-link" href="/data/routing-report.json" download>Testbericht herunterladen <Download size={16}/></a></div></div></> : project.slug === 'ki-prospecting' ? <><p>Wähle ein Testprofil und prüfe, wie die Bewertung entsteht. Die KI-Texte stammen aus dem gespeicherten Laufbericht.</p><ProspectingDemo/>{report && <div className="run-evidence"><Check size={18}/><div><strong>{report.status === 'local-ai-verified' ? 'Lokaler Modelllauf dokumentiert' : 'Stand des gespeicherten Testlaufs'}</strong><p>{report.stats.aiValid} gültige KI-Einschätzungen · {report.stats.drafts} Kontaktentwürfe · {report.stats.aiErrors} Fehler. {report.model ? `Modell: ${report.model}.` : 'Modellschritt noch nicht ausgeführt.'} Cloud-Aufrufe: {report.stats.cloudCalls}.</p></div></div>}</> : <ImageViewer items={currentMedia?.screenshots || []}/>}<Walkthrough project={project} media={currentMedia}/></section>
      <section id="mein-beitrag"><SectionLabel number={label(4)}>Mein Beitrag</SectionLabel><h2>Fachlich führen. Mit KI umsetzen.</h2><ul className="contribution-list">{project.contribution.map(c => <li key={c}><Check size={18}/><span>{c}</span></li>)}</ul><p className="small-copy">Ich baue mit KI-Coding-Agenten. Anforderungen, fachliche Regeln und die Abnahme der Ergebnisse verantworte ich selbst.</p></section>
      <section id="ergebnis"><SectionLabel number={label(5)}>Ergebnis & Einordnung</SectionLabel><h2>Was dabei herausgekommen ist.</h2><ul className="result-list">{project.results.map(r => <li key={r}><span className="blue-square"/>{r}</li>)}</ul><div className="boundary-note"><span className="eyebrow">Einordnung</span><p>{project.limits}</p></div><h3>Was ich daraus mitnehme</h3><ol className="learning-list">{project.learnings.map(l => <li key={l}>{l}</li>)}</ol><details className="sources"><summary>Quellgrundlage ansehen <ChevronDown size={17}/></summary><ul>{project.sources.map(s => <li key={s}>{s}</li>)}</ul>{project.slug === 'lead-routing' && <a href="/downloads/lead-routing.n8n.json" download className="text-link">n8n-Workflow herunterladen <Download size={16}/></a>}{project.slug === 'ki-prospecting' && <a href="/data/prospecting-report.json" download className="text-link">Laufbericht herunterladen <Download size={16}/></a>}</details></section>
    </div></div>{project.slug === 'leadpilot' && <div className="lp-case-crosslink section-pad"><span className="eyebrow">Hinter dem Projekt</span><p>Die Geschichte von LeadPilot – von der ersten Idee bis zum Designsystem.</p><Link className="text-link" to="/leadpilot">Zur Projektchronik <ArrowRight size={16}/></Link></div>}<div className="next-case section-pad"><span className="eyebrow">Weiter entdecken</span>{cases.filter(c => c.slug !== slug).map(c => <Link to={`/cases/${c.slug}`} key={c.slug}><span>{c.number}</span><strong>{c.name}</strong><ArrowRight size={19} strokeWidth={1.7} aria-hidden="true" /></Link>)}</div><Contact/>
  </article>;
}
function SectionLabel({ number, children }: { number: string; children: ReactNode }) { return <div className="section-label"><span>{number}</span>{children}</div>; }

function Certificates() {
  const [topic, setTopic] = useState('Alle'); const topics = ['Alle', ...new Set(certificates.map(c => c.topic))]; const filtered = certificates.filter(c => topic === 'Alle' || c.topic === topic);
  return <div className="certificates-page section-pad"><Link className="back-link" to="/"><ArrowLeft size={16}/> Zur Startseite</Link><span className="eyebrow">Qualifikationen</span><h1 tabIndex={-1}>Wissen mit Grundlage.</h1><p className="case-lead">Ausgewählte Originalnachweise zu CRM, Vertrieb, Reporting und KI.<br />Die Art des Nachweises ist jeweils benannt.</p><div className="filter-buttons" aria-label="Nachweise nach Thema filtern">{topics.map(t => <button key={t} aria-pressed={t === topic} className={topic === t ? 'active' : ''} onClick={() => setTopic(t)}>{t}</button>)}</div><p className="result-caption" aria-live="polite">{filtered.length} Nachweise</p><div className="certificate-grid">{filtered.map(c => <article key={c.file}><span className="certificate-provider">{c.issuer}</span><FileText className="certificate-file-icon" size={28}/><h2>{c.title}</h2><p>{c.text}</p><div className="certificate-meta"><span>{c.kind}</span>{c.date && <span>Ausgestellt: {c.date}</span>}{c.until && <span>Gültig bis: {c.until}</span>}</div><a href={`/nachweise/${c.file}`} target="_blank" rel="noreferrer" className="text-link">Originalnachweis öffnen <Arrow /></a></article>)}</div><div className="boundary-note"><strong>Weiterbildung läuft.</strong><p>Die Weiterbildung zum Digital Sales Manager läuft seit dem 18.05.2026. Der Abschluss ist für Februar 2027 geplant.</p></div></div>;
}

function Notes() { return <div className="legal-page section-pad"><span className="eyebrow">Transparenz</span><h1 tabIndex={-1}>Hinweise zu diesem Portfolio.</h1><h2>Lokale Vorschau</h2><p>Diese Fassung ist zur lokalen Durchsicht gedacht. Es ist keine öffentliche Veröffentlichung erfolgt. Öffentliche Anbieterangaben werden vor einer Veröffentlichung ergänzt.</p><h2>Person und Kontakt</h2><p>Marc Pönisch · Leipzig<br/><a href={`mailto:${profile.email}`}>{profile.email}</a></p><h2>Projekte und Beispieldaten</h2><p>LeadPilot ist ein fiktives Unternehmen. Die weiteren Demos nutzen erfundene Testdaten. Sie belegen keine realen Kundenergebnisse. Der jeweilige Projektstand und offene externe Testläufe werden auf den Case-Seiten erläutert.</p><h2>KI-Unterstützung</h2><p>Konzeption, Texte und Software entstehen mit KI-Unterstützung. Fachliche Anforderungen, Entscheidungen und die Prüfung der Ergebnisse bleiben bei Marc.</p><h2>Datenverarbeitung in der Vorschau</h2><p>Die Website nutzt keine Analyse-Dienste, Tracking-Cookies oder extern geladenen Schriftarten. Die interaktiven Arbeitsproben verarbeiten Eingaben im Browser. Die Website sendet sie weder an HubSpot noch an einen KI-Anbieter. Beim Öffnen externer Links gelten die Bedingungen der jeweiligen Website.</p><h2>Nachweise</h2><p>Die verlinkten Lernnachweise sind Kopien vorhandener Originaldateien. Zertifizierungen, Kursabschlüsse und digitale Badges werden unterschiedlich bezeichnet.</p></div>; }
function NotFound() { return <div className="not-found section-pad"><span className="eyebrow">404</span><h1 tabIndex={-1}>Hier geht es nicht weiter.</h1><p>Diese Seite gibt es in diesem Portfolio nicht.</p><Link className="button blue" to="/">Zur Startseite <ArrowRight size={17}/></Link></div>; }

export default function App() {
  const location = useLocation();
  const previousPath = useRef(location.pathname);
  useEffect(() => {
    const titles: Record<string, string> = { '/': 'Marc Pönisch · SalesOps & RevOps', '/leadpilot': 'LeadPilot · Projektchronik', '/nachweise': 'Qualifikationen · Marc Pönisch', '/hinweise': 'Hinweise · Marc Pönisch' };
    const project = cases.find(c => location.pathname === `/cases/${c.slug}`);
    document.title = titles[location.pathname] || (project ? `${project.name} · Marc Pönisch` : 'Seite nicht gefunden · Marc Pönisch');
    if (location.hash) { requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView()); }
    else { window.scrollTo(0, 0); if(previousPath.current !== location.pathname) document.querySelector<HTMLElement>('h1')?.focus({ preventScroll: true }); }
    previousPath.current = location.pathname;
  }, [location.pathname, location.hash]);
  return <><Header/><main id="inhalt"><Routes><Route path="/" element={<Home/>}/><Route path="/leadpilot" element={<LeadPilotChronik/>}/><Route path="/cases/:slug" element={<CasePage/>}/><Route path="/nachweise" element={<Certificates/>}/><Route path="/hinweise" element={<Notes/>}/><Route path="*" element={<NotFound/>}/></Routes></main><Footer/></>;
}
