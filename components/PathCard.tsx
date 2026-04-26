'use client';
import type { CareerPath } from '@/lib/types';
import { ScoreBar } from './ScoreBar';

export function PathCard({ path, color, expanded, onToggle, onPivot }: { path: CareerPath; color: string; expanded: boolean; onToggle: () => void; onPivot: () => void }) {
  return (
    <div className="path-card" style={{ borderLeftColor: color }} onClick={onToggle}>
      <div className="path-header">
        <div>
          <span className="badge" style={{ background: `${color}22`, color }}>{path.label}</span>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 8 }}>{path.tagline}</h3>
          <p style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 4 }}>{path.primaryRoute}</p>
        </div>
        <div className="path-prob">
          <span className="mono" style={{ fontSize: 28, fontWeight: 700, color }}>{path.probability}%</span>
          <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>probability</span>
          <button className="btn-ghost pivot-btn" onClick={(e) => { e.stopPropagation(); onPivot(); }} style={{ marginTop: 8, fontSize: 11, padding: '4px 8px' }}>🔄 Pivot Route</button>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <ScoreBar value={path.probability} color={color} />
      </div>

      {expanded && (
        <div className="path-details page-enter">
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-dim)', marginTop: 16 }}>{path.rationale}</p>

          <div className="path-stats">
            <div className="stat"><span className="stat-label">Timeline</span><span className="mono">{path.timeline}</span></div>
            <div className="stat"><span className="stat-label">Entry Salary</span><span className="mono">{path.salaryEntry}</span></div>
            <div className="stat"><span className="stat-label">Mid Salary</span><span className="mono">{path.salaryMid}</span></div>
            <div className="stat"><span className="stat-label">Institution</span><span className="mono" style={{ fontSize: 12 }}>{path.institution.name}</span></div>
          </div>

          <div style={{ marginTop: 16 }}>
            <p className="section-label" style={{ fontSize: 11 }}>MILESTONES & CONTINGENCIES</p>
            <ul className="milestone-list">
              {path.milestones.map((m: any, i) => (
                <li key={i}>
                  {typeof m === 'string' ? m : m.name}
                  {typeof m !== 'string' && m.contingency && (
                    <div className="contingency-node">↳ Pivot: {m.contingency}</div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: 16 }}>
            <p className="section-label" style={{ fontSize: 11, color: 'var(--danger)' }}>⚠️ RISKS</p>
            <ul className="risk-list">
              {path.risks.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
        </div>
      )}

      <p className="expand-hint no-print" style={{ marginTop: 12 }}>{expanded ? '▲ Collapse' : '▼ Expand details'}</p>

      <style jsx>{`
        .path-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-left: 3px solid;
          border-radius: var(--radius);
          padding: 24px;
          cursor: pointer;
          transition: border-color 200ms;
        }
        .path-card:hover { border-color: var(--border-light); }
        .path-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .path-prob { text-align: right; display: flex; flex-direction: column; align-items: flex-end; }
        .path-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-top: 16px; }
        .stat { background: var(--surface-2); padding: 12px; border-radius: var(--radius); }
        .stat-label { display: block; font-size: 11px; color: var(--iron); margin-bottom: 4px; letter-spacing: 0.05em; }
        .milestone-list, .risk-list { list-style: none; display: flex; flex-direction: column; gap: 6px; }
        .milestone-list li, .risk-list li { font-size: 13px; color: var(--text-dim); padding-left: 16px; position: relative; margin-bottom: 6px; }
        .milestone-list li::before { content: '→'; position: absolute; left: 0; color: var(--ember); }
        .risk-list li::before { content: '!'; position: absolute; left: 0; color: var(--danger); font-weight: 700; }
        .contingency-node { margin-top: 4px; padding: 6px 10px; background: rgba(255, 160, 0, 0.1); border-left: 2px solid var(--ember); color: var(--ember); font-size: 12px; border-radius: 0 4px 4px 0; }
        .pivot-btn:hover { background: var(--surface-2); }
        .expand-hint { font-size: 12px; color: var(--iron); text-align: center; }
      `}</style>
    </div>
  );
}
