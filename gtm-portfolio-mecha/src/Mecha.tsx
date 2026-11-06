import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, FileText, Menu, X } from 'lucide-react';
import { cases, certificates, profile } from './content';
import media from '../public/data/media.json';
import MpSculpture from './MpSculpture';

const anchors = [
  ['01', 'LeadPilot', 'projekt-leadpilot'],
  ['02', 'Anfragen sauber übergeben', 'projekt-lead-routing'],
  ['03', 'KI-Prospecting & Scoring', 'projekt-ki-prospecting'],
];

export function MechaLayout({children}:{children:ReactNode}) {
  const location=useLocation();
  const [open,setOpen]=useState(false);
  const [active,setActive]=useState('');
  const toggle=useRef<HTMLButtonElement>(null);
  const home=location.pathname==='/';
  useEffect(()=>setOpen(false),[location]);
  useEffect(()=>{
    const close=(event:KeyboardEvent)=>{if(event.key==='Escape' && open){setOpen(false);toggle.current?.focus();}};
    document.addEventListener('keydown',close);return()=>document.removeEventListener('keydown',close);
  },[open]);
  useEffect(()=>{
    if(!home){setActive('');return;}
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries) if(entry.isIntersecting) setActive(entry.target.id);
    },{rootMargin:'-10% 0px -65% 0px'});
    document.querySelectorAll('[data-mecha-section]').forEach(el=>observer.observe(el));
    return()=>observer.disconnect();
  },[home]);
  return <div className={`mecha-site ${home?'is-home':'is-detail'}`}>
    <a className="skip-link" href="#inhalt">Zum Inhalt</a>
    <aside className="mecha-sidebar" aria-label="Portfolio-Übersicht">
      <Link className="mecha-wordmark mp-wordmark" to="/" aria-label="Marc Pönisch – Startseite"><span className="mp-wordmark-monogram">mp<b>.</b></span><span className="mp-wordmark-name">Marc Pönisch</span></Link>
      <MpSculpture/>
      <div className="mecha-side-bottom">
        <span className="mecha-side-location">LEIPZIG, DE · SALES OPERATIONS</span>
        <nav className="mecha-project-nav" aria-label="Arbeitsproben">
          <a href="/#arbeitsproben" className="mecha-nav-label"><span>⊢</span> Arbeitsproben</a>
          {anchors.map(([number,name,id])=><a key={id} href={`/#${id}`} className={active===id?'is-active':''} aria-current={active===id?'location':undefined}><span>{number}</span>{name}<ArrowUpRight size={13}/></a>)}
        </nav>
      </div>
      <button ref={toggle} className="mecha-menu-toggle" aria-label={open?'Menü schließen':'Menü öffnen'} aria-expanded={open} aria-controls="mecha-main-nav" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
    </aside>
    <nav id="mecha-main-nav" className={`mecha-top-nav ${open?'is-open':''}`} aria-label="Hauptnavigation">
      <a href="/#arbeitsproben" onClick={()=>setOpen(false)} aria-current={home && active.startsWith('projekt')?'location':undefined}>Arbeitsproben</a>
      <a href="/#profil" onClick={()=>setOpen(false)}>Über mich</a>
      <Link to="/nachweise" aria-current={location.pathname==='/nachweise'?'page':undefined}>Nachweise</Link>
      <a href="/#kontakt" onClick={()=>setOpen(false)}>Kontakt</a>
    </nav>
    <div className="mecha-content">{children}
      <footer className="mecha-footer"><span>© 2026 MARC PÖNISCH</span><Link to="/hinweise">Hinweise & Datenschutz <ArrowRight size={12}/></Link><a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={12}/></a></footer>
    </div>
    <a className="mecha-floating-contact" href="/#kontakt"><span aria-hidden="true">＋</span>Kontakt aufnehmen</a>
  </div>;
}

function Label({number,children}:{number?:string;children:ReactNode}) {
  return <div className="mecha-label"><span className="mecha-cross" aria-hidden="true"/>{children}{number&&<span className="mecha-index">{number} / 03</span>}</div>;
}

const metrics:Record<string,[string,string][]>={
  leadpilot:[['ARR · Szenario 2025','411.840 €'],['Funnel · Leads → Neukunden','1.776 → 47'],['Trial-to-Paid · Szenario 2025','18 %']],
  'lead-routing':[['Prüffälle im n8n-/HubSpot-Test','7'],['Kontakt & Folgeaufgabe je Anfrage','1 + 1'],['Dubletten erkannt','4']],
  'ki-prospecting':[['Synthetische Testprofile','50'],['Offengelegte Scoring-Kriterien','6'],['Kontaktentwürfe · lokaler Modelllauf','25']],
};

export default function MechaHome() {
  return <div className="mecha-home">
    <section className="mecha-hero" data-mecha-section id="start">
      <Label>Sales Operations & Revenue Operations</Label>
      <h1 tabIndex={-1}>Vertrieb kennen.<br/>Prozesse weiterdenken.</h1>
      <p className="mecha-hero-description">Ich komme aus dem B2B-Vertrieb. Heute verbinde ich diese Erfahrung mit CRM, Daten und KI – und baue digitale Vertriebsprozesse in eigenen Praxisprojekten direkt nach.</p>
      <div className="mecha-hero-bottom"><div className="mecha-connected-tags"><span>B2B-Vertrieb</span><i/><span>Digitale Prozesse</span></div><a className="mecha-scroll" href="#arbeitsproben">Arbeitsproben entdecken <ArrowDown size={16}/></a></div>
    </section>
    <div id="arbeitsproben" className="mecha-projects">
      {cases.map((project,index)=>{
        const item=media[project.slug as keyof typeof media];
        const cover=index===0?'/media/leadpilot-dashboard.webp':item.screenshots[0].src;
        const second=index===0?'/media/leadpilot-funnel.webp':item.diagram.src;
        return <section className={`mecha-project mecha-project-${project.slug}`} key={project.slug} id={`projekt-${project.slug}`} data-mecha-section>
          <Label number={project.number}>{project.category}</Label>
          <div className="mecha-project-title"><h2><Link to={`/cases/${project.slug}`}>{index===0?<>LeadPilot</>:index===1?<>Anfragen sauber<br/>übergeben.</>:<>KI-Prospecting<br/>& Scoring.</>}</Link></h2><Link className="mecha-circle-arrow" to={`/cases/${project.slug}`} aria-label={`${project.name}: Fallstudie öffnen`}><ArrowUpRight size={26}/></Link></div>
          <div className="mecha-project-info">
            <div className="mecha-project-symbols" aria-hidden="true"><span>{index===0?'↗':index===1?'⇄':'✳'}</span><span>↗</span><span>{String(index+1).padStart(2,'0')}</span></div>
            <div className="mecha-project-description"><span className="mecha-project-stamp">{index===0?'LeadPilot':index===1?'CRM':'KI'}</span><div><p>{project.short}</p><Link className="mecha-inline-link" to={`/cases/${project.slug}`}>Die Fallstudie ansehen <ArrowRight size={14}/></Link><span className="mecha-status">{project.status}</span></div></div>
            <dl className="mecha-metrics">{metrics[project.slug].map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          </div>
          <div className="mecha-gallery">
            <figure className="mecha-gallery-primary"><Link to={`/cases/${project.slug}`} aria-label={`${project.name}: Details ansehen`}><img src={cover} alt={index===0?'LeadPilot Executive Dashboard mit historischen Szenariodaten':item.screenshots[0].alt} loading="lazy" width="1440" height="1000"/></Link><figcaption>{index===0?'Dashboard-CRM · fiktives B2B-SaaS-Szenario':item.screenshots[0].caption}</figcaption></figure>
            <figure className="mecha-gallery-secondary"><Link to={`/cases/${project.slug}`} aria-label={`${project.name}: ${index===0?'Funnel':'Prozess'} im Detail`}><img src={second} alt={index===0?'Sales Funnel 2025 – von 1.776 Leads zu 47 Neukunden':item.diagram.alt} loading="lazy" width={index===0?1440:item.diagram.width} height={index===0?1000:item.diagram.height}/></Link><figcaption>{index===0?'Funnel · alle Stufen mit Conversion':item.diagram.caption}</figcaption></figure>
          </div>
          <div className="mecha-video-block"><div className="mecha-video-caption"><span>Die Arbeitsprobe in etwa 90 Sekunden</span><span>{project.number} / VIDEO</span></div><video controls preload="none" poster={item.video.poster} aria-label={`Portfolio-Walkthrough: ${project.name}`}><source src={item.video.src} type="video/mp4"/><track kind="captions" src={item.video.subtitles} srcLang="de" label="Deutsch" default={index!==0}/></video></div>
          <div className="mecha-project-end"><p>{project.limits}</p><Link to={`/cases/${project.slug}`}>Entscheidungen, Demo & Ergebnisse <ArrowRight size={17}/></Link></div>
        </section>;
      })}
    </div>
    <section id="profil" className="mecha-profile mecha-section" data-mecha-section>
      <Label>Über mich</Label><h2>Aus dem Vertrieb.<br/>Mit Blick aufs Ganze.</h2>
      <div className="mecha-profile-row"><img src="/images/marc.webp" alt="Marc Pönisch, kaufmännischer Hintergrund im B2B-Vertrieb" width="480" height="640" loading="lazy"/><div><div className="mecha-profile-name"><strong>Marc Pönisch</strong><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14}/></a></div><p className="mecha-profile-intro">Ich kenne den Weg von der Kundenanfrage bis zur Auftragsabwicklung. Jetzt beschäftige ich mich mit den Systemen und Prozessen dahinter.</p><p>Als Kaufmann im Groß- und Außenhandel habe ich im Baustoffhandel B2B-Kunden beraten, Angebote erstellt und Stammdaten gepflegt. Diese Erfahrung ist die Grundlage für meine Projekte.</p><p>Seit dem 18. Mai 2026 absolviere ich die Weiterbildung zum Digital Sales Manager. Mein nächster beruflicher Schritt liegt an der Schnittstelle von Vertrieb, CRM und Operations.</p><dl className="mecha-career"><div><dt>2019–2024</dt><dd>Ausbildung & B2B-Vertrieb<br/><small>Raiffeisen Waren GmbH</small></dd></div><div><dt>Seit Mai 2026</dt><dd>Digital Sales Manager<br/><small>Laufende Vollzeit-Weiterbildung · remote</small></dd></div></dl><a className="mecha-inline-link" href={profile.resume} target="_blank" rel="noreferrer">Lebenslauf als PDF <ArrowUpRight size={16}/></a></div></div>
      <div className="mecha-approach">{[
        ['01','Vertrieb verstehen','Kundenbedarf klären, Angebote erstellen und Aufträge begleiten. Mein Ausgangspunkt ist die Arbeit im B2B-Baustoffhandel.'],
        ['02','Prozesse ordnen','Daten, Zuständigkeiten und nächste Schritte zusammenbringen. LeadPilot und die Routing-Demo zeigen, wie ich daran arbeite.'],
        ['03','Ergebnisse prüfen','Kriterien offenlegen, Fehlerfälle testen und Grenzen benennen. KI-Unterstützung gehört dazu – ebenso die eigene Prüfung.'],
      ].map(([number,title,text])=><div key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
    </section>
    <section className="mecha-qualifications mecha-section" data-mecha-section id="qualifikationen"><Label>Lernen & Anwenden</Label><h2>Wissen mit Grundlage.</h2><div className="mecha-certificates">{certificates.slice(0,3).map(c=><a href={`/nachweise/${c.file}`} target="_blank" rel="noreferrer" key={c.file}><FileText size={22}/><span><small>{c.issuer}</small><strong>{c.title}</strong><small>{c.kind}{c.date&&` · ${c.date.slice(-4)}`}</small></span><ArrowUpRight size={22}/></a>)}</div><div className="mecha-section-bottom"><p>Die Kurse liefern das Fundament, die Arbeitsproben zeigen die Anwendung.</p><Link className="mecha-inline-link" to="/nachweise">Alle Nachweise <ArrowRight size={16}/></Link></div></section>
    <section id="leadpilot-hintergrund" className="mecha-chronicle mecha-section" data-mecha-section><Label>Hinter dem Projekt</Label><h2>Von der ersten Idee<br/>zum eigenen System.</h2><div className="mecha-chronicle-grid"><Link to="/leadpilot"><img src="/leadpilot/assets/marketing/messe-demo.webp" alt="LeadPilot-Messestand als Teil des fiktiven Unternehmensszenarios" width="1200" height="800" loading="lazy"/></Link><div><p>Die Geschichte von LeadPilot – von der ersten Idee bis zum Designsystem.</p><Link className="mecha-inline-link" to="/leadpilot">Zur Projektchronik <ArrowRight size={16}/></Link></div></div></section>
    <section id="kontakt" className="mecha-contact mecha-section" data-mecha-section><Label>Der nächste Schritt</Label><h2>Gute Prozesse beginnen<br/>mit einem Gespräch.</h2><p>Du suchst jemanden, der Vertrieb aus der Praxis kennt und digitale Prozesse direkt im System umsetzt? Dann lass uns sprechen.</p><a className="mecha-contact-email" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={26}/></a><div className="mecha-contact-links"><a href={profile.linkedin} target="_blank" rel="noreferrer">Auf LinkedIn vernetzen <ArrowUpRight size={16}/></a><a href={profile.github} target="_blank" rel="noreferrer">Projekte auf GitHub <ArrowUpRight size={16}/></a><a href={profile.resume} target="_blank" rel="noreferrer">Lebenslauf <ArrowUpRight size={16}/></a></div></section>
  </div>;
}
