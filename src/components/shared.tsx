import Link from "next/link";
import { profile, type Certificate } from "@/content/portfolio";
import { Arrow, Download } from "./icons";

export function Contact() {
  return <section className="contact-section" id="kontakt" aria-labelledby="contact-title">
    <div className="container contact-inner">
      <div><p className="eyebrow light">Der nächste Schritt</p><h2 id="contact-title">Gute Prozesse beginnen<br />mit einem Gespräch.</h2><p>Sie suchen jemanden, der Vertrieb kennt, sich in Systeme einarbeitet und Dinge umsetzt? Ich freue mich auf den Austausch.</p></div>
      <div className="contact-actions"><a className="button button-light" href={`mailto:${profile.email}`}>Kontakt aufnehmen <Arrow diagonal /></a><a className="contact-mail" href={`mailto:${profile.email}`}>{profile.email}</a><a className="contact-social" href={profile.linkedin} target="_blank" rel="noreferrer">Auf LinkedIn verbinden <Arrow diagonal width="16" height="16" /></a></div>
    </div>
  </section>;
}

export function Footer() {
  return <footer className="site-footer"><div className="container footer-inner"><p>© {new Date().getFullYear()} Marc Pönisch <span>· Leipzig</span></p><div><Link href="/datenschutz/">Datenschutz</Link><a href={profile.github} target="_blank" rel="noreferrer">GitHub <Arrow diagonal width="14" height="14" /></a><a href={profile.resume} download>Lebenslauf <Download width="14" height="14" /></a></div></div></footer>;
}

export function CertificateCard({ certificate }: { certificate: Certificate }) {
  const initials: Record<string, string> = { HubSpot: "H", Anthropic: "A", Demandbase: "db", "Microsoft / LinkedIn": "in", LinkedIn: "in", Google: "G", "Rainer Mayer": "RM" };
  return <article className="certificate-card">
    <div className="certificate-top"><span className={`issuer-mark issuer-${certificate.provider.split(" ")[0].toLowerCase()}`} aria-hidden="true">{initials[certificate.provider] ?? certificate.provider[0]}</span><span className="certificate-kind">{certificate.kind}</span></div>
    <p className="certificate-issuer">{certificate.issuer}</p>
    <h3>{certificate.title}</h3>
    <div className="certificate-bottom"><p>{certificate.date}{certificate.validUntil && <span>Gültig bis {certificate.validUntil}</span>}</p><a href={certificate.file} target="_blank" rel="noreferrer" className="certificate-link" aria-label={`Nachweis ansehen: ${certificate.title}`}>Nachweis <Arrow diagonal width="16" height="16" /></a></div>
  </article>;
}
