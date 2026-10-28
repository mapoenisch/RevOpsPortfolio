import Image from "next/image";
import type { Project } from "@/content/portfolio";

export function ProjectMedia({ project, priority = false }: { project: Project; priority?: boolean }) {
  if (!project.screenshotsReady) return <div className="media-pending" role="note"><span className="media-pending-label">LeadPilot · Aufnahme ausstehend</span><p>Aktuelle Einblicke<br />nach der Anmeldung.</p><span>Die lokale Anwendung ist gestartet. Für die Aufnahme des Dashboards fehlt noch die angemeldete Sitzung.</span></div>;
  return <div className="browser-frame"><div className="browser-top"><span /><span /><span /><p>{project.name} / Aktuelle lokale Aufnahme</p></div><Image src={project.image} alt={project.imageAlt} width={1440} height={1000} priority={priority} sizes="(max-width: 800px) 90vw, 60vw" /></div>;
}
