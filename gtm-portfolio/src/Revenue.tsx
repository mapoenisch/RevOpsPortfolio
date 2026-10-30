import type { RevenueAnalysis } from './content';
import './revenue.css';

const euro = (value: number) => `${value.toLocaleString('de-DE')} €`;

export function RevenueBlock({ data }: { data: RevenueAnalysis }) {
  const top = data.funnel[0].value;
  const driverTotal = data.bridge.drivers.reduce((sum, d) => sum + d.value, 0);
  const largest = Math.max(...data.bridge.drivers.map(d => d.value));
  return <div className="revenue">
    <p>{data.intro}</p>

    <div className="rv-panel"><div className="rv-panel-head"><h3>Der Funnel 2025</h3><span>Conversion zur Vorstufe</span></div>
      <ol className="rv-funnel">{data.funnel.map(step => <li key={step.stage}><span className="rv-stage">{step.stage}</span><span className="rv-bar"><span style={{ width: `${Math.max(3, step.value / top * 100)}%` }} /></span><strong>{step.value.toLocaleString('de-DE')}</strong><small>{step.rate ?? '–'}</small></li>)}</ol>
    </div>

    <div className="rv-kpis">{data.kpis.map(k => <div key={k.label}><span>{k.label}</span><strong>{k.value}</strong><small><span className="rv-miss">verfehlt</span> {k.target}</small></div>)}</div>

    <h3 className="rv-heading">Meine Analyse</h3>
    <div className="rv-findings">{data.findings.map((f, i) => <article key={f.title}><span>{String(i + 1).padStart(2, '0')}</span><h4>{f.title}</h4><p>{f.text}</p></article>)}</div>

    <div className="rv-panel"><div className="rv-panel-head"><h3>Der Weg zu {euro(data.bridge.target)} ARR</h3><span>ARR-Effekt der Hebel im Plan 2026</span></div>
      <ul className="rv-bridge">
        <li className="rv-bridge-base"><span>Ausgangswert 2025</span><strong>{euro(data.bridge.start)}</strong></li>
        {data.bridge.drivers.map(d => <li key={d.label}><span>{d.label}</span><span className="rv-bar"><span style={{ width: `${d.value / largest * 100}%` }} /></span><strong>+ {euro(d.value)}</strong></li>)}
        <li className="rv-bridge-base"><span>Summe der Hebel</span><strong>+ {euro(driverTotal)}</strong></li>
      </ul>
      <p className="rv-note">Die beiden größten Hebel liegen nach dem ersten Kontakt: bei der Testphase und bei der Kundenbindung.</p>
    </div>
    <p className="rv-source">{data.source}</p>
  </div>;
}
