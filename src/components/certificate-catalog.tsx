"use client";

import { useState } from "react";
import type { Certificate } from "@/content/portfolio";
import { CertificateCard } from "./shared";

export function CertificateCatalog({ certificates }: { certificates: Certificate[] }) {
  const [search, setSearch] = useState("");
  const [provider, setProvider] = useState("Alle Anbieter");
  const [category, setCategory] = useState("Alle Themen");
  const providers = [...new Set(certificates.map((c) => c.provider))].sort();
  const categories = [...new Set(certificates.map((c) => c.category))].sort();
  const visible = certificates.filter((c) => (provider === "Alle Anbieter" || c.provider === provider) && (category === "Alle Themen" || c.category === category) && `${c.title} ${c.issuer} ${c.category}`.toLocaleLowerCase("de").includes(search.toLocaleLowerCase("de").trim()));
  return <>
    <div className="catalog-filters">
      <div className="search-field"><label htmlFor="certificate-search">Nachweis suchen</label><input id="certificate-search" type="search" placeholder="Zum Beispiel: KI, Reporting, Projektmanagement …" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
      <div><label htmlFor="certificate-provider">Anbieter</label><select id="certificate-provider" value={provider} onChange={(e) => setProvider(e.target.value)}><option>Alle Anbieter</option>{providers.map((p) => <option key={p}>{p}</option>)}</select></div>
      <div><label htmlFor="certificate-category">Thema</label><select id="certificate-category" value={category} onChange={(e) => setCategory(e.target.value)}><option>Alle Themen</option>{categories.map((c) => <option key={c}>{c}</option>)}</select></div>
    </div>
    <p className="result-count" role="status" aria-live="polite">{visible.length} von {certificates.length} Nachweisen</p>
    {visible.length ? <div className="certificate-grid">{visible.map((c) => <CertificateCard key={c.id} certificate={c} />)}</div> : <div className="empty-state"><h2>Kein passender Nachweis.</h2><p>Versuchen Sie einen anderen Suchbegriff oder setzen Sie die Filter zurück.</p><button className="button button-primary" type="button" onClick={() => { setSearch(""); setProvider("Alle Anbieter"); setCategory("Alle Themen"); }}>Filter zurücksetzen</button></div>}
  </>;
}
