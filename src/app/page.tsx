import Image from "next/image";
import Link from "next/link";
import { profile, projects, competencies, type Certificate } from "@/content/portfolio";
import certificateData from "@/content/certificates.json";
import { Arrow, Download } from "@/components/icons";
import { CertificateCard, Contact } from "@/components/shared";
import { ProjectMedia } from "@/components/project-media";

export default function Home() {
  const certificates = certificateData as Certificate[];
  return <main id="inhalt">
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy"><p className="eyebrow"><span className="status-dot" />Vertriebspraxis trifft digitale Umsetzung</p>
        <h1 id="hero-title">Vertrieb verstehen.<br />Prozesse verbinden.<br /><span>Digital umsetzen.</span></h1>
        <p className="hero-description">{profile.introduction}</p>
        <div className="hero-actions"><Link className="button button-primary" href="#projekte">Projekte ansehen <Arrow /></Link><Link className="text-link" href="#kontakt">Kontakt aufnehmen <Arrow diagonal width="17" height="17" /></Link></div>
        <div className="hero-footnote"><span>Leipzig</span><span>SalesOps · CRM · RevOps</span></div>
      </div>
      <figure className="hero-portrait"><div className="portrait-frame"><Image src="/images/marc-poenisch.webp" alt="Marc Pönisch" width={720} height={900} priority sizes="(max-width: 700px) 90vw, 35vw" /><span className="portrait-monogram" aria-hidden="true">mp.</span></div><figcaption><div><strong>Marc Pönisch</strong><span>Kaufmann. Digital Sales Manager in Weiterbildung.</span></div><span className="portrait-caption-arrow" aria-hidden="true">↗</span></figcaption></figure>
    </section>

    <div className="intro-band"><div className="container intro-band-inner"><p>Mein Ausgangspunkt</p><div><span>B2B-Vertrieb</span><span className="band-plus" aria-hidden="true">+</span><span>CRM & Prozesse</span><span className="band-plus" aria-hidden="true">+</span><span>KI-gestützte Umsetzung</span></div></div></div>

    <section className="section container" id="projekte" aria-labelledby="projects-title">
      <div className="section-heading"><div><p className="eyebrow">Ausgewählte Arbeiten</p><h2 id="projects-title">Von der Idee<br />zur Anwendung.</h2></div><p>Zwei Projekte, an denen ich zeige, wie ich Aufgaben strukturiere und digitale Lösungen mit KI entwickle.</p></div>
      <div className="project-list">{projects.map((project) => <article className={`project-card project-${project.color}`} key={project.slug}>
        <div className="project-copy"><div className="project-label"><span>{project.number}</span><span>{project.category}</span></div><h3>{project.name}</h3><p className="project-title">{project.title}</p><p className="project-summary">{project.summary}</p><div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><Link href={`/projekte/${project.slug}/`} className="text-link">Projekt kennenlernen <Arrow diagonal /></Link></div>
        <Link className="project-visual" href={`/projekte/${project.slug}/`} aria-label={`${project.name}: Fallstudie öffnen`}><ProjectMedia project={project} /><span className="project-visual-caption">{project.slug === "leadpilot" ? "Fiktives Unternehmen · lokale Anwendung" : "Lokale Anwendung · Demodaten"}<Arrow diagonal width="16" height="16" /></span></Link>
      </article>)}</div>
      <p className="project-note">Konzept und Umsetzung mit KI-Unterstützung. Mein Beitrag und der belegbare Stand sind in jeder Fallstudie beschrieben.</p>
    </section>

    <section className="competence-section" id="kompetenzen" aria-labelledby="competencies-title"><div className="container section"><div className="section-heading"><div><p className="eyebrow">Was ich mitbringe</p><h2 id="competencies-title">Praxis als Grundlage.<br />Systeme als Werkzeug.</h2></div><p>Ich verbinde kaufmännische Erfahrung mit dem Lernen und Ausprobieren digitaler Arbeitsweisen.</p></div><div className="competence-grid">{competencies.map((item) => <article className="competence" key={item.number}><span className="item-number">{item.number}</span><h3>{item.title}</h3><p>{item.text}</p><Link href={item.href}>{item.proof} <Arrow diagonal width="16" height="16" /></Link></article>)}</div></div></section>

    <section className="section container" id="zertifikate" aria-labelledby="certificates-title"><div className="section-heading"><div><p className="eyebrow">Weiterlernen gehört dazu</p><h2 id="certificates-title">Wissen mit Nachweis.</h2></div><p>CRM, Operations, KI und Analyse. Hier eine Auswahl – alle {certificates.length} Nachweise finden Sie in der Übersicht.</p></div><div className="certificate-grid">{certificates.filter((c) => c.featured).map((certificate) => <CertificateCard key={certificate.id} certificate={certificate} />)}</div><div className="section-action"><Link className="button button-outline" href="/zertifikate/">Alle Nachweise entdecken <Arrow /></Link><p>Zertifizierungen, Lernnachweise und Badges sind als solche gekennzeichnet.</p></div></section>

    <section className="about-section" id="ueber-mich" aria-labelledby="about-title"><div className="container about-inner"><div className="about-heading"><p className="eyebrow">Über mich</p><h2 id="about-title">Ich kenne Vertrieb<br />aus der Praxis.<br /><span>Jetzt denke ich<br />die Systeme mit.</span></h2><a href={profile.resume} className="button button-outline" download>Lebenslauf als PDF <Download /></a></div><div className="about-copy"><p className="about-lead">Im Baustoffgroßhandel ging es für mich um Kundenbedarf, Angebote und eine zuverlässige Auftragsabwicklung.</p><p>Dabei habe ich erlebt, wie wichtig klare Informationen und funktionierende Abläufe sind. Heute beschäftige ich mich damit, wie CRM-Systeme, Daten und Automatisierung diese Arbeit unterstützen können.</p><p>Seit Mai 2026 mache ich eine Weiterbildung zum Digital Sales Manager. Parallel entwickle ich eigene Anwendungen mit KI-Unterstützung. Ich bestimme die Anforderungen, prüfe Ergebnisse und arbeite mich in die Zusammenhänge ein.</p><p>Ich suche eine Rolle, in der ich meine Vertriebserfahrung einbringen und an digitalen Prozessen mitarbeiten kann: in CRM, Sales Operations, Revenue Operations oder einer vergleichbaren Aufgabe.</p><div className="timeline"><div><span>Seit 05/2026</span><strong>Digital Sales Manager</strong><p>Weiterbildung · Digital Business Akademie / IDVW · Remote</p></div><div><span>01/2025 – 10/2025</span><strong>Fachberater · OBI</strong><p>Kundenberatung und Auftragsabwicklung · Jena</p></div><div><span>01/2022 – 01/2024</span><strong>Kaufmann im Großhandel · Raiffeisen</strong><p>B2B-Vertrieb und Warenwirtschaft · Erfurt</p></div><div><span>09/2019 – 01/2022</span><strong>Kaufmännische Ausbildung · IHK</strong><p>Groß- und Außenhandel · Raiffeisen / Ludwig-Erhard-Schule</p></div></div></div></div></section>
    <Contact />
  </main>;
}
