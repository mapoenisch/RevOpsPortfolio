import type { Metadata } from "next";
import Link from "next/link";
import { CertificateCatalog } from "@/components/certificate-catalog";
import { Contact } from "@/components/shared";
import type { Certificate } from "@/content/portfolio";
import certificates from "@/content/certificates.json";

export const metadata: Metadata = { title: "Zertifikate & Lernnachweise", description: "Nachweise aus CRM, Vertrieb, KI, Datenanalyse und Projektmanagement – nach Anbieter und Thema durchsuchbar." };

export default function CertificatesPage() {
  return <main id="inhalt"><div className="container catalog-page"><Link href="/#zertifikate" className="back-link"><span aria-hidden="true">←</span> Zur Startseite</Link><div className="catalog-intro"><p className="eyebrow">Zertifikate & Weiterbildung</p><h1>Lernen.<br /><span>Anwenden. Weiterdenken.</span></h1><p>Meine Nachweise aus CRM, Vertrieb, Operations, KI und Analyse. Jeder Eintrag führt zum vorhandenen Originalnachweis. Zertifizierungen, abgeschlossene Lernpfade und digitale Badges sind getrennt bezeichnet.</p></div><CertificateCatalog certificates={certificates as Certificate[]} /><p className="catalog-footnote">Mehrere Dateiformate desselben Nachweises werden nur einmal aufgeführt. Allgemeine Profil- und Lernabzeichen ohne konkreten Abschluss werden nicht als Zertifizierung gezählt. Ein Lernnachweis ist kein Beleg für Berufserfahrung im jeweiligen System.</p></div><Contact /></main>;
}
