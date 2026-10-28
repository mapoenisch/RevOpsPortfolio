"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Arrow } from "./icons";

export function Header() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return <header className="site-header">
    <div className="container header-inner">
      <Link href="/" className="brand" aria-label="Marc Pönisch – Startseite" onClick={() => setOpen(false)}>
        <span className="brand-mark" aria-hidden="true">mp<span>.</span></span>
        <span>Marc Pönisch</span>
      </Link>
      <button ref={trigger} type="button" className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? "Schließen" : "Menü"}<span aria-hidden="true">{open ? "−" : "+"}</span></button>
      <nav id="main-navigation" className={`main-nav ${open ? "is-open" : ""}`} aria-label="Hauptnavigation">
        <Link href="/#projekte" onClick={() => setOpen(false)} aria-current={pathname.startsWith("/projekte") ? "true" : undefined}>Projekte</Link>
        <Link href="/#kompetenzen" onClick={() => setOpen(false)}>Kompetenzen</Link>
        <Link href="/zertifikate/" onClick={() => setOpen(false)} aria-current={pathname.startsWith("/zertifikate") ? "page" : undefined}>Zertifikate</Link>
        <Link href="/#ueber-mich" onClick={() => setOpen(false)}>Über mich</Link>
        <Link href="/#kontakt" className="nav-contact" onClick={() => setOpen(false)}>Kontakt <Arrow diagonal width="16" height="16" /></Link>
      </nav>
    </div>
  </header>;
}
