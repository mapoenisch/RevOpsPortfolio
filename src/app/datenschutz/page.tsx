import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/content/portfolio";

export const metadata: Metadata = { title: "Datenschutz der lokalen Vorschau" };
export default function PrivacyPage() {
  return <main id="inhalt" className="container legal-page"><Link href="/" className="back-link">← Zur Startseite</Link><p className="eyebrow">Lokale Vorschau</p><h1>Datenschutz.</h1><h2>Diese Website läuft lokal.</h2><p>Diese Fassung ist eine lokale Bewerbungsportfolio-Vorschau von Marc Pönisch. Sie enthält keine Analyse-Dienste, Werbetracker oder Kontaktformulare. Schriftarten und Bilder werden zusammen mit der Website ausgeliefert.</p><h2>Kontakt und externe Links</h2><p>Bei E-Mail-Kontakt wird das auf Ihrem Gerät eingerichtete E-Mail-Programm geöffnet. Links zu LinkedIn, GitHub und anderen Websites führen zu externen Anbietern; dort gelten deren Datenschutzhinweise.</p><h2>Fragen zu dieser Vorschau</h2><p><a href={`mailto:${profile.email}`}>{profile.email}</a></p><p className="context-note">Die Angaben beziehen sich auf diese lokale Fassung. Vor einer öffentlichen Veröffentlichung müssen Hosting, Anbieterangaben und die dazugehörigen Datenschutzhinweise ergänzt und geprüft werden.</p></main>;
}
