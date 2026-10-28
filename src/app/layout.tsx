import type { Metadata } from "next";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-700.css";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/shared";

export const metadata: Metadata = {
  title: { default: "Marc Pönisch | Vertrieb, CRM & digitale Prozesse", template: "%s | Marc Pönisch" },
  description: "Vertriebspraxis trifft digitale Umsetzung: Projekte, Kompetenzen und Zertifikate von Marc Pönisch. Berufliche Perspektive in CRM, SalesOps und RevOps.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de"><body><a className="skip-link" href="#inhalt">Zum Inhalt springen</a><Header />{children}<Footer /></body></html>;
}
