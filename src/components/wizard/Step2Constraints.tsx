'use client';

import { useForgeStore } from '@/stores/forge-store';
import { Budget, LocationPreference, StressTolerance, RiskAppetite, FinancialNeed } from '@/lib/types';

type OptionGroup<T> = { value: T; label: string; icon: string; desc: string };

const BUDGETS: OptionGroup<Budget>[] = [
  { value: 'low', label: 'Low', icon: '🪙', desc: 'Under ₹10L total — strictly budget-conscious' },
  { value: 'medium', label: 'Medium', icon: '💳', desc: '₹10–40L — comfortable with education loan' },
  { value: 'high', label: 'High', icon: '💎', desc: '₹40L+ — costs are not a primary constraint' },
];

const LOCATIONS: OptionGroup<LocationPreference>[] = [
  { value: 'india', label: 'India Only', icon: '🇮🇳', desc: 'Prefer to study and work in India' },
  { value: 'abroad', label: 'Abroad', icon: '🌍', desc: 'Open to international universities' },
  { value: 'both', label: 'Both', icon: '🌐', desc: 'Flexible — best option wherever it is' },
];

const STRESS: OptionGroup<StressTolerance>[] = [
  { value: 'low', label: 'Low', icon: '🌿', desc: 'I prefer a balanced, calm lifestyle' },
  { value: 'medium', label: 'Medium', icon: '⚖️', desc: 'Some pressure is fine, but not extreme' },
  { value: 'high', label: 'High', icon: '🔥', desc: 'I thrive under intense pressure' },
];

const RISK: OptionGroup<RiskAppetite>[] = [
  { value: 'safe', label: 'Safe', icon: '🛡️', desc: 'High certainty — even if smaller outcome' },
  { value: 'balanced', label: 'Balanced', icon: '⚡', desc: 'Good upside with managed risk' },
  { value: 'aggressive', label: 'Aggressive', icon: '🚀', desc: 'Maximum outcome — I can handle failure' },
];

const FINANCIAL_NEED: OptionGroup<FinancialNeed>[] = [
  { value: 'none', label: 'No Need', icon: '💎', desc: 'Family can fully fund education' },
  { value: 'low', label: 'Low Need', icon: '🟢', desc: 'Can afford most, need minor help' },
  { value: 'moderate', label: 'Moderate Need', icon: '🟡', desc: 'Need scholarships for 40-60% of costs' },
  { value: 'high', label: 'High Need', icon: '🟠', desc: 'Cannot afford without significant aid' },
  { value: 'critical', label: 'Critical Need', icon: '🔴', desc: 'Education impossible without full scholarship' },
];

function OptionGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: OptionGroup<T>[];
  value: T | undefined;
  onChange: (v: T) => void;
}) {
  return (
    <div style={{ marginBottom: 28 }}>
      <label style={{ display: 'block', fontWeight: 600, marginBottom: 12, fontSize: 14 }}>
        {label}
      </label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {options.map((opt) => (
          <div
            key={opt.value}
            className={`option-card ${value === opt.value ? 'selected' : ''}`}
            style={{ display: 'flex', alignItems: 'center', gap: 14 }}
            onClick={() => onChange(opt.value)}
          >
            <span style={{ fontSize: 24, flexShrink: 0 }}>{opt.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{opt.label}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{opt.desc}</div>
            </div>
            {value === opt.value && (
              <span style={{ color: 'var(--primary)', fontSize: 20, flexShrink: 0 }}>✓</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Step2Constraints({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { constraints, setConstraints, extracurricular, setExtracurricular } = useForgeStore();

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>💰</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Your Constraints</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          Honesty here prevents bad advice. Budget and location shape everything.
        </p>
      </div>

      <OptionGroup
        label="Total Career Education Budget"
        options={BUDGETS}
        value={constraints.budget}
        onChange={(v) => setConstraints({ budget: v })}
      />

      {/* Optional numeric input */}
      {constraints.budget && (
        <div style={{ marginBottom: 28 }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
            Specify Budget (optional){' '}
            <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>in ₹ Lakhs</span>
          </label>
          <input
            type="number"
            className="input-field"
            placeholder="e.g. 25"
            value={constraints.budget_inr_lakhs ?? ''}
            onChange={(e) =>
              setConstraints({ budget_inr_lakhs: parseFloat(e.target.value) || undefined })
            }
            style={{ maxWidth: 200 }}
          />
        </div>
      )}

      <OptionGroup
        label="Preferred Study / Work Location"
        options={LOCATIONS}
        value={constraints.location_preference}
        onChange={(v) => setConstraints({ location_preference: v })}
      />

      <OptionGroup
        label="Stress Tolerance"
        options={STRESS}
        value={constraints.stress_tolerance}
        onChange={(v) => setConstraints({ stress_tolerance: v })}
      />

      <OptionGroup
        label="Risk Appetite"
        options={RISK}
        value={constraints.risk_appetite}
        onChange={(v) => setConstraints({ risk_appetite: v })}
      />

      <OptionGroup
        label="💰 Financial Need for Education"
        options={FINANCIAL_NEED}
        value={extracurricular.financial_need}
        onChange={(v) => setExtracurricular({ financial_need: v })}
      />

      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }} onClick={onBack}>
          ← Back
        </button>
        <button className="btn-primary" style={{ flex: 2, justifyContent: 'center' }} onClick={onNext}>
          Continue → Goals
        </button>
      </div>
    </div>
  );
}
