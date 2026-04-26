'use client';
import { useForgeStore } from '@/stores/forge-store';

export default function StepGoals() {
  const { profile, setProfileField } = useForgeStore();

  const priorityOptions = ["💰 High Salary", "🏆 Prestige", "❤️ Passion", "🛡️ Job Security", "🌍 Travel/Global", "🚀 Entrepreneurship", "🏠 Stay in India", "⏱️ Work-Life Balance"];
  const timelineOptions: { value: "urgent" | "normal" | "long-game"; label: string }[] = [
    { value: "urgent", label: "⚡ Urgent (ASAP)" },
    { value: "normal", label: "📅 Normal (3-5 yr)" },
    { value: "long-game", label: "🎯 Long Game (5+ yr)" },
  ];

  const togglePriority = (p: string) => {
    const current = profile.priorities || [];
    if (current.includes(p)) {
      setProfileField('priorities', current.filter(x => x !== p));
    } else if (current.length < 3) {
      setProfileField('priorities', [...current, p]);
    }
  };

  return (
    <div className="step-content page-enter">
      <p className="section-label">STEP 3 OF 6 — GOALS</p>
      <h2 className="display-heading" style={{ fontSize: 48, marginBottom: 32 }}>WHAT DO YOU WANT?</h2>

      <div className="field-grid">
        <div className="field">
          <label htmlFor="dream_job">Dream Job / Career</label>
          <input id="dream_job" type="text" placeholder="e.g. Software Engineer, Doctor, Game Designer, Cricketer..." value={profile.dream_job} onChange={e => setProfileField('dream_job', e.target.value)} />
        </div>

        <div className="field">
          <label>Top 3 Priorities <span style={{ color: 'var(--iron)', fontWeight: 400 }}>(pick up to 3)</span></label>
          <div className="toggle-group">
            {priorityOptions.map(opt => (
              <button key={opt} className={`chip ${(profile.priorities || []).includes(opt) ? 'selected' : ''}`} onClick={() => togglePriority(opt)}>{opt}</button>
            ))}
          </div>
        </div>

        <div className="field">
          <label>Timeline Expectation</label>
          <div className="toggle-group">
            {timelineOptions.map(opt => (
              <button key={opt.value} className={`chip ${profile.timeline === opt.value ? 'selected' : ''}`} onClick={() => setProfileField('timeline', opt.value)}>{opt.label}</button>
            ))}
          </div>
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
