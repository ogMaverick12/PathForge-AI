'use client';
import { useForgeStore } from '@/stores/forge-store';

export default function StepConstraints() {
  const { profile, setProfileField } = useForgeStore();

  const constraintOptions = ["📍 Can't relocate", "👨‍👩‍👧 Family expectations", "😰 Exam anxiety", "🗣️ English barrier", "🏋️ Need to earn fast", "🩺 Health limitations"];
  const abroadOptions: { value: "yes" | "no" | "if_funded" | "only_abroad"; label: string }[] = [
    { value: "yes", label: "✈️ Yes, open to it" },
    { value: "no", label: "🏠 No, India only" },
    { value: "if_funded", label: "💰 Only if funded" },
    { value: "only_abroad", label: "🌍 Only abroad" },
  ];

  const toggleConstraint = (c: string) => {
    const current = profile.constraints || [];
    if (current.includes(c)) {
      setProfileField('constraints', current.filter(x => x !== c));
    } else {
      setProfileField('constraints', [...current, c]);
    }
  };

  return (
    <div className="step-content page-enter">
      <p className="section-label">STEP 4 OF 6 — CONSTRAINTS</p>
      <h2 className="display-heading" style={{ fontSize: 48, marginBottom: 32 }}>YOUR REALITY.</h2>

      <div className="field-grid">
        <div className="field">
          <label>Any barriers or constraints? <span style={{ color: 'var(--iron)', fontWeight: 400 }}>(optional, select all that apply)</span></label>
          <div className="toggle-group">
            {constraintOptions.map(opt => (
              <button key={opt} className={`chip ${(profile.constraints || []).includes(opt) ? 'selected' : ''}`} onClick={() => toggleConstraint(opt)}>{opt}</button>
            ))}
          </div>
        </div>

        <div className="field">
          <label>Open to studying abroad?</label>
          <div className="toggle-group">
            {abroadOptions.map(opt => (
              <button key={opt.value} className={`chip ${profile.abroad_open === opt.value ? 'selected' : ''}`} onClick={() => setProfileField('abroad_open', opt.value)}>{opt.label}</button>
            ))}
          </div>
        </div>

        <div className="field">
          <label>Backup Openness: <span className="mono" style={{ color: 'var(--ember)' }}>{profile.backup_openness}/5</span></label>
          <p style={{ fontSize: 12, color: 'var(--iron)', marginBottom: 8 }}>1 = &quot;I need ONE perfect path&quot; → 5 = &quot;Give me multiple options&quot;</p>
          <input type="range" min={1} max={5} step={1} value={profile.backup_openness} onChange={e => setProfileField('backup_openness', parseInt(e.target.value))} style={{ accentColor: 'var(--ember)' }} />
        </div>
      </div>

      <style jsx>{`
        .step-content { max-width: 640px; }
        .field-grid { display: flex; flex-direction: column; gap: 24px; }
        .field { display: flex; flex-direction: column; }
        .toggle-group { display: flex; flex-wrap: wrap; gap: 8px; }
      `}</style>
    </div>
  );
}
