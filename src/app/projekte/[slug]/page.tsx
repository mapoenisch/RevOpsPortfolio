import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/portfolio";
import { Arrow, Check, Github } from "@/components/icons";
import { Contact } from "@/components/shared";
import { ProjectMedia } from "@/components/project-media";

export const dynamicParams = false;
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return { title: project?.name ?? "Projekt", description: project?.summary };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const next = projects.find((p) => p.slug !== slug)!;
  return <main id="inhalt"><div className="container">
    <div className="detail-intro"><Link href="/#projekte" className="back-link"><span aria-hidden="true">←</span> Alle Projekte</Link><p className="eyebrow">Projekt {project.number} / {project.category}</p><h1>{project.name}<span>{project.title}</span></h1><p className="detail-summary">{project.summary}</p><div className="detail-actions"><a href={project.repository} target="_blank" rel="noreferrer" className="button button-primary"><Github /> Repository ansehen <Arrow diagonal width="17" height="17" /></a><span>{project.context}</span></div></div>
    <figure className={`detail-cover project-${project.color}`}><ProjectMedia project={project} priority />{project.screenshotsReady && <figcaption>{project.gallery[0].caption}. Die Aufnahme lässt sich <a href={project.image} target="_blank" rel="noreferrer">in voller Größe öffnen <Arrow diagonal width="14" height="14" /></a>.</figcaption>}</figure>
    <div className="project-meta"><div><span>Schwerpunkt</span><p>{project.tags.join(" · ")}</p></div><div><span>Meine Rolle</span><p>Konzeption und Umsetzung mit KI</p></div><div><span>Technischer Rahmen</span><p>{project.technology.join(" · ")}</p></div></div>
    <div className="case-layout"><div className="case-main"><section className="case-section"><p className="eyebrow">01 / Ausgangspunkt</p><h2>Das Problem hinter dem Projekt.</h2><p>{project.challenge}</p></section><section className="case-section"><p className="eyebrow">02 / Die Lösung</p><h2>So wird daraus ein Ablauf.</h2><div className="solution-list">{project.solution.map((item, i) => <div key={item.title}><span className="item-number">0{i + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></div>)}</div></section><section className="case-section" id="mein-beitrag"><p className="eyebrow">03 / Mein Beitrag</p><h2>Meine Entscheidungen.<br />KI als Werkzeug.</h2><ul className="check-list">{project.contribution.map((item) => <li key={item}><Check /><span>{item}</span></li>)}</ul><p className="muted">Die Umsetzung entsteht mit KI-Unterstützung. Meine Arbeit umfasst Konzeption, Entwicklungsaufträge und die fachliche Prüfung der Ergebnisse.</p></section><section className="case-section"><p className="eyebrow">04 / Erkenntnisse</p><h2>Was ich daraus mitnehme.</h2><ul className="insight-list">{project.insights.map((item) => <li key={item}>{item}</li>)}</ul></section></div><aside className="case-aside"><div className="evidence-panel"><p className="eyebrow">Nachvollziehbarer Stand</p><h2>Was das Projekt belegt.</h2><ul>{project.evidence.map((item) => <li key={item}>{item}</li>)}</ul><div className="evidence-sources"><h3>Ein Blick in die Quellen</h3>{project.sources.map((source) => <a href={source.url} key={source.url} target="_blank" rel="noreferrer">{source.label}<Arrow diagonal width="16" height="16" /></a>)}</div></div></aside></div>
    {project.screenshotsReady && <section className="gallery-section" aria-labelledby="gallery-title"><div className="section-heading"><div><p className="eyebrow">Direkt aus der Anwendung</p><h2 id="gallery-title">Einblicke ins Projekt.</h2></div><p>Aktuelle Aufnahmen aus der lokalen Anwendung. Jede Ansicht kann in voller Größe geöffnet werden.</p></div><div className="project-gallery">{project.gallery.map((item) => <figure key={item.src}><a href={item.src} target="_blank" rel="noreferrer" aria-label={`${item.caption}: Screenshot vergrößern`}><Image src={item.src} alt={item.alt} width={1440} height={1000} sizes="(max-width: 700px) 95vw, 47vw" /></a><figcaption>{item.caption}<Arrow diagonal width="15" height="15" /></figcaption></figure>)}</div><p className="context-note">{project.boundary}</p></section>}
    <Link href={`/projekte/${next.slug}/`} className="next-project"><div><p className="eyebrow">Das nächste Projekt</p><h2>{next.name}</h2><p>{next.category}</p></div><Arrow diagonal width="40" height="40" /></Link>
  </div><Contact /></main>;
}
