'use client';
import { useForgeStore } from '@/stores/forge-store';

export default function StepFinances() {
  const { profile, setProfileField } = useForgeStore();

  const budgetOptions = ["<1L", "1-3L", "3-6L", "6-12L", "12-25L", "25L+", "full_scholarship"];
  const budgetLabels: Record<string, string> = {
    "<1L": "Under ₹1L/yr", "1-3L": "₹1–3L/yr", "3-6L": "₹3–6L/yr",
    "6-12L": "₹6–12L/yr", "12-25L": "₹12–25L/yr", "25L+": "₹25L+/yr",
    "full_scholarship": "🎓 Need Full Scholarship"
  };

  const loanOptions: { value: "yes" | "no" | "maybe"; label: string }[] = [
    { value: "yes", label: "✅ Yes, open to loans" },
    { value: "no", label: "❌ No loans" },
    { value: "maybe", label: "🤔 Maybe" },
  ];

  const scholarshipExpOptions: { value: "never" | "applied" | "researching"; label: string }[] = [
    { value: "never", label: "Never explored" },
    { value: "researching", label: "Currently researching" },
    { value: "applied", label: "Already applied to some" },
  ];

  return (
    <div className="step-content page-enter">
      <p className="section-label">STEP 5 OF 6 — FINANCES</p>
      <h2 className="display-heading" style={{ fontSize: 48, marginBottom: 32 }}>THE MONEY TALK.</h2>

      <div className="field-grid">
        <div className="field">
          <label>Annual Education Budget</label>
          <div className="toggle-group">
            {budgetOptions.map(opt => (
              <button key={opt} className={`chip ${profile.budget === opt ? 'selected' : ''}`} onClick={() => setProfileField('budget', opt)}>{budgetLabels[opt]}</button>
            ))}
          </div>
        </div>

        <div className="field">
          <label>Open to Education Loans?</label>
          <div className="toggle-group">
            {loanOptions.map(opt => (
              <button key={opt.value} className={`chip ${profile.loan_open === opt.value ? 'selected' : ''}`} onClick={() => setProfileField('loan_open', opt.value)}>{opt.label}</button>
            ))}
          </div>
        </div>

        <div className="field">
          <label>Scholarship Experience</label>
          <div className="toggle-group">
            {scholarshipExpOptions.map(opt => (
              <button key={opt.value} className={`chip ${profile.scholarship_exp === opt.value ? 'selected' : ''}`} onClick={() => setProfileField('scholarship_exp', opt.value)}>{opt.label}</button>
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
