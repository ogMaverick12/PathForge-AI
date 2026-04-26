'use client';
import { useForgeStore } from '@/stores/forge-store';

export default function StepAcademics() {
  const { profile, setProfileField } = useForgeStore();

  const boardOptions = ["CBSE", "ICSE", "State Board", "IB", "IGCSE", "Other"];
  const trendOptions: { value: "improving" | "stable" | "declining"; icon: string; label: string }[] = [
    { value: "improving", icon: "📈", label: "Improving" },
    { value: "stable", icon: "➡️", label: "Stable" },
    { value: "declining", icon: "📉", label: "Declining" },
  ];

  return (
    <div className="step-content page-enter">
      <p className="section-label">STEP 2 OF 6 — ACADEMICS</p>
      <h2 className="display-heading" style={{ fontSize: 48, marginBottom: 32 }}>YOUR NUMBERS.</h2>

      <div className="field-grid">
        <div className="field">
          <label htmlFor="marks">Current / Last Exam Marks (%)</label>
          <input id="marks" type="number" min={0} max={100} placeholder="e.g. 78" value={profile.marks || ''} onChange={e => setProfileField('marks', Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))} />
          {profile.marks > 0 && profile.marks < 20 && <span className="field-error">Are you sure? This seems very low.</span>}
        </div>

        <div className="field">
          <label>Board</label>
          <div className="toggle-group">
            {boardOptions.map(opt => (
              <button key={opt} className={`chip ${profile.board === opt ? 'selected' : ''}`} onClick={() => setProfileField('board', opt)}>{opt}</button>
            ))}
          </div>
        </div>

        <div className="field">
          <label htmlFor="exam_score">JEE / NEET / CUET Score (if applicable)</label>
          <input id="exam_score" type="number" placeholder="Leave blank if N/A" value={profile.exam_score ?? ''} onChange={e => setProfileField('exam_score', e.target.value ? parseInt(e.target.value) : null)} />
        </div>

        <div className="field">
          <label>Performance Trend</label>
          <div className="toggle-group">
            {trendOptions.map(opt => (
              <button key={opt.value} className={`chip ${profile.trend === opt.value ? 'selected' : ''}`} onClick={() => setProfileField('trend', opt.value)}>
                {opt.icon} {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .step-content { max-width: 640px; }
        .field-grid { display: flex; flex-direction: column; gap: 24px; }
        .field { display: flex; flex-direction: column; }
        .toggle-group { display: flex; flex-wrap: wrap; gap: 8px; }
        .field-error { color: var(--danger); font-size: 12px; margin-top: 4px; }
      `}</style>
    </div>
  );
}
