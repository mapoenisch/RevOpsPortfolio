import { useMemo, useState, useEffect } from 'react';
import { ArrowRight, Check, ChevronDown, CircleAlert, Copy, RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import { createRouter } from '../demos/routing/core.mjs';
import { profiles } from '../demos/prospecting/fixtures.mjs';
import { scoreProfile } from '../demos/prospecting/core.mjs';

type RoutingResult = { status: string; steps: string[]; reason?: string; owner?: string };
export function RoutingDemo({ compact = false }: { compact?: boolean }) {
  const [scenario, setScenario] = useState('new');
  const [result, setResult] = useState<RoutingResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [counts, setCounts] = useState({ contacts: 0, tasks: 0 });
  const Heading = compact ? 'h2' : 'h3';
  const statuses: Record<string, string> = { accepted: 'Sauber übergeben', duplicate: 'Dublette abgefangen', review: 'Manuelle Prüfung', error: 'Übergabe unvollständig' };
  const input = { eventId: 'portfolio-test-01', email: ' Mara@Testfirma.example ', firstName: 'Mara', lastName: 'Beispiel', company: scenario === 'missing' ? '' : 'Testfirma', employees: 42, source: 'demo' };
  const evidence = <>
    <dl className="routing-input">
      <div><dt>E-Mail im Eingang</dt><dd><code>{input.email}</code></dd></div>
      <div><dt>Unternehmen</dt><dd>{input.company || 'Fehlt in diesem Testfall'}</dd></div>
      <div><dt>Unternehmensgröße</dt><dd>{input.employees} Beschäftigte</dd></div>
    </dl>
    <p className="routing-rule">Die Regel: unter 50 Beschäftigten → Inside Sales, ab 50 → Account Management. Fehlt eine Pflichtangabe, wird die Anfrage manuell geprüft.</p>
  </>;
  async function run() {
    setBusy(true);
    try {
      const contacts = new Map(); const tasks = new Map();
      const crm = {
        async upsertContact(lead: { email: string }) { contacts.set(lead.email, 'DEMO-K01'); return { id: 'DEMO-K01' }; },
        async ensureTask(_: string, lead: { email: string }) { if (scenario === 'error') throw new Error('Testfehler'); tasks.set(lead.email, 'DEMO-A01'); return { id: 'DEMO-A01' }; },
      };
      const router = createRouter({ crm });
      if (scenario === 'duplicate') await router.route(input);
      const value = await router.route(input);
      setResult(value as RoutingResult); setCounts({ contacts: contacts.size, tasks: tasks.size });
    } finally { setBusy(false); }
  }
  const reset = () => { setScenario('new'); setResult(null); setCounts({ contacts: 0, tasks: 0 }); };
  return <div className={`routing-demo ${compact ? 'compact-demo' : ''}`}>
    <div className="demo-toolbar"><span className="tiny-label"><span className="live-dot" /> Lokale Arbeitsprobe</span><span className="mono">02</span></div>
    <div className="demo-intro"><div className="demo-symbol" aria-hidden="true"><ArrowRight size={20}/></div><div><Heading>Eine Anfrage. Ein klarer nächster Schritt.</Heading><p>Synthetische Daten · simuliertes CRM</p></div></div>
    <div className="incoming-record"><div className="record-avatar" aria-hidden="true">MB</div><div><strong>Mara Beispiel</strong><span>{input.company || 'Unternehmen fehlt'}</span></div><span className="record-state">{scenario === 'duplicate' ? 'Erneuter Eingang' : 'Neue Anfrage'}</span></div>
    {compact ? <details className="routing-evidence"><summary>Eingang & Regel ansehen <ChevronDown size={17} aria-hidden="true"/></summary><div>{evidence}</div></details> : <div className="routing-evidence routing-evidence-expanded">{evidence}</div>}
    <div className="demo-controls"><label htmlFor={compact ? 'scenario-hero' : 'scenario-case'}>Testfall<select id={compact ? 'scenario-hero' : 'scenario-case'} aria-label="Testfall" value={scenario} onChange={e => { setScenario(e.target.value); setResult(null); setCounts({ contacts: 0, tasks: 0 }); }}><option value="new">Vollständige Anfrage</option><option value="duplicate">Doppelte Anfrage</option><option value="missing">Pflichtangabe fehlt</option><option value="error">CRM nicht erreichbar</option></select></label><button type="button" className="button blue" onClick={run} disabled={busy}>{busy ? 'Wird geprüft …' : 'Anfrage prüfen'} <ArrowRight size={16} aria-hidden="true"/></button></div>
    <div className="demo-result" aria-live="polite" aria-atomic="true">{result ? <>
      <div className={`result-heading result-${result.status}`}>{result.status === 'error' || result.status === 'review' ? <CircleAlert size={18} aria-hidden="true"/> : <Check size={18} aria-hidden="true"/>}<strong>{statuses[result.status]}</strong></div>
      <p>{result.status === 'review' && scenario === 'missing' ? 'Die Unternehmensangabe fehlt. Vor der Übergabe muss sie ergänzt und geprüft werden.' : result.status === 'error' ? 'Der Kontakt wurde angelegt. Die Folgeaufgabe fehlt, weil der simulierte CRM-Zugriff unterbrochen wurde.' : result.reason || 'Aus „ Mara@Testfirma.example “ wird „mara@testfirma.example“. 42 Beschäftigte → Inside Sales.'}</p>
      <div className="result-counts"><span><strong>{counts.contacts}</strong> Kontakt</span><span><strong>{counts.tasks}</strong> Folgeaufgabe</span></div>
      {result.status === 'error' && <p className="routing-recovery">Nächster Schritt im echten Ablauf: Kontakt und Aufgaben im CRM abgleichen, dann den gesicherten Vorgang fortsetzen. Jeder Klick hier startet einen neuen Demolauf.</p>}
      {!compact && <ol className="execution-log">{result.steps.map((s, i) => <li key={s}><span>{String(i + 1).padStart(2, '0')}</span>{s}</li>)}</ol>}
    </> : <><div className="result-placeholder"><span className="status-outline" />Bereit für den Testlauf</div><p>Wähle einen Fall und prüfe die Verarbeitung.</p></>}</div>
    <div className="demo-foot"><span>Keine externen Schreibzugriffe</span><button type="button" className="text-action" onClick={reset} aria-label="Demo zurücksetzen"><RotateCcw size={16} aria-hidden="true"/> Zurücksetzen</button></div>
  </div>;
}

export type ProspectReport = { generatedAt: string; status: string; model: string | null; durationMs: number; cloudModel: string | null; stats: { total: number; prefiltered: number; eligible: number; prioritized: number; aiReviewed: number; aiValid: number; drafts: number; aiErrors: number; localCalls: number; cloudCalls: number }; results: { profile: typeof profiles[number]; aiStatus: string; ai: { relevant: boolean; reason: string } | null; opener: string | null }[] };
export function useProspectReport() {
  const [report, setReport] = useState<ProspectReport | null>(null);
  useEffect(() => { const controller = new AbortController(); fetch('/data/prospecting-report.json', { signal: controller.signal }).then(r => { if (!r.ok) throw new Error('REPORT_MISSING'); return r.json(); }).then(setReport).catch(() => {}); return () => controller.abort(); }, []);
  return report;
}

export function ProspectingDemo() {
  const report = useProspectReport();
  const [filter, setFilter] = useState('all'); const [selected, setSelected] = useState('LP-P001'); const [query, setQuery] = useState('');
  const rows = useMemo(() => profiles.map(profile => ({ profile, ...scoreProfile(profile) })), []);
  const filtered = rows.filter(r => (filter === 'all' || (filter === 'priority' ? r.createOpener : !r.eligible)) && `${r.profile.company} ${r.profile.role}`.toLowerCase().includes(query.toLowerCase()));
  const current = rows.find(r => r.profile.id === selected)!;
  const ai = report?.results.find(r => r.profile.id === selected);
  return <div className="prospecting-demo">
    <div className="demo-toolbar"><span className="tiny-label"><span className="live-dot" /> Nachvollziehbare Priorisierung</span><span className="mono">CASE 03</span></div>
    <div className="score-summary"><div><strong>50</strong><span>Testprofile</span></div><div><strong>6</strong><span>Kriterien</span></div><div><strong>75</strong><span>Punkte als Schwelle</span></div></div>
    <div className="score-tools"><label className="search-label"><Search size={17} /><span className="sr-only">Testprofile durchsuchen</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Testfirma oder Rolle suchen" /></label><label><span className="sr-only">Profile filtern</span><select value={filter} onChange={e => setFilter(e.target.value)}><option value="all">Alle Profile</option><option value="priority">Priorisiert · ab 75</option><option value="excluded">Ausgesondert</option></select></label></div>
    <div className="score-layout"><div className="score-list" aria-label="Synthetische Testprofile"><div className="list-caption">{filtered.length} Profile · vollständig erfundene Daten</div>{filtered.length ? filtered.map(r => <button className={`score-row ${selected === r.profile.id ? 'selected' : ''}`} key={r.profile.id} onClick={() => setSelected(r.profile.id)} aria-pressed={selected === r.profile.id}><span><strong>{r.profile.company}</strong><small>{r.profile.role} · {r.profile.country}</small></span><span className={`score-value ${r.createOpener ? 'high' : ''}`}>{r.score}<span className="sr-only"> von 100 Punkten</span></span></button>) : <p className="empty-state">Keine passenden Testprofile.</p>}</div>
    <div className="score-detail"><span className="tiny-label">Bewertung im Detail</span><h3>{current.profile.company}</h3><p>{current.profile.role} · {current.profile.employees} Beschäftigte</p><div className="score-total">{current.score}<span>/ 100</span></div>{current.eligible ? <ul className="criteria">{current.criteria.map((c: { id: string; label: string; max: number; points: number }) => <li key={c.id}><span>{c.label}</span><strong>{c.points}<span>/{c.max}</span></strong></li>)}</ul> : <p className="notice">{current.reason}</p>}<div className="ai-context"><span className="tiny-label">Ergänzende KI-Einschätzung</span><p>{ai?.ai?.reason || (current.eligible ? 'Für dieses Profil liegt noch keine geprüfte Modellantwort vor.' : 'Vor dem Modellaufruf ausgesondert.')}</p>{ai?.opener && <blockquote>{ai.opener}<small>KI-Entwurf · nicht versandt</small></blockquote>}</div></div></div>
    <div className="demo-foot"><span>Punkte aus Regeln · Kontext aus KI</span><a href="/data/prospecting-report.json" download className="text-action">Laufbericht herunterladen <ArrowRight size={13} /></a></div>
  </div>;
}
