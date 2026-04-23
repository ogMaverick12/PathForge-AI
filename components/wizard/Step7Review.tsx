'use client';

import { useForgeStore } from '@/stores/forge-store';

const PERFORMANCE_LABELS: Record<string, string> = {
  below_60: 'Below 60%',
  '60_75': '60–75%',
  '75_85': '75–85%',
  '85_95': '85–95%',
  '95_plus': '95%+',
};

const BUDGET_LABELS: Record<string, string> = {
  low: 'Low (under ₹10L)',
  medium: 'Medium (₹10–40L)',
  high: 'High (₹40L+)',
};

export default function Step7Review({
  onBack,
  onAnalyze,
}: {
  onBack: () => void;
  onAnalyze: () => void;
}) {
  const store = useForgeStore();
  const { academic, constraints, goals, sports } = store;

  const sections = [
    {
      title: '📚 Academic Profile',
      rows: [
        { label: 'Class', value: `Class ${academic.current_class ?? '—'}` },
        { label: 'Performance', value: PERFORMANCE_LABELS[academic.performance ?? ''] ?? '—' },
        { label: 'Study Hours', value: `${academic.study_hours ?? 0}h/day` },
        { label: 'Strengths', value: (academic.subject_strengths ?? []).join(', ') || 'None selected' },
        { label: 'Weaknesses', value: (academic.subject_weaknesses ?? []).join(', ') || 'None selected' },
      ],
    },
    {
      title: '💰 Constraints',
      rows: [
        { label: 'Budget', value: BUDGET_LABELS[constraints.budget ?? ''] ?? '—' },
        { label: 'Location', value: constraints.location_preference ?? '—' },
        { label: 'Stress Tolerance', value: constraints.stress_tolerance ?? '—' },
        { label: 'Risk Appetite', value: constraints.risk_appetite ?? '—' },
      ],
    },
    {
      title: '🎯 Goals',
      rows: [
        { label: 'Primary Goal', value: goals.primary_goal || '—' },
        { label: 'Secondary Goal', value: goals.secondary_goal || '—' },
        { label: 'Dream Job', value: goals.dream_job || '—' },
        { label: 'Motivation', value: goals.goal_motivation ?? '—' },
      ],
    },
    {
      title: '⚡ Commitment',
      rows: [
        { label: 'Commitment Level', value: goals.commitment_level ?? '—' },
        { label: 'Timeline', value: goals.timeline_expectation ?? '—' },
      ],
    },
    ...(sports.applicable
      ? [
          {
            title: '🏆 Sports Profile',
            rows: [
              { label: 'Sport', value: sports.sport_type ?? '—' },
              { label: 'Level', value: sports.current_level ?? '—' },
              { label: 'Practice', value: `${sports.practice_hours_per_day ?? 0}h/day` },
              { label: 'Years Training', value: `${sports.years_training ?? 0} years` },
              { label: 'Has Coach', value: sports.has_coaching ? 'Yes' : 'No' },
              { label: 'Competition Exposure', value: `${sports.competition_exposure ?? 0}/5` },
            ],
          },
        ]
      : []),
  ];

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Review Your Profile</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          Verify everything below. Once you forge, the engine runs your full analysis.
        </p>
      </div>

      {/* Review Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
        {sections.map((section) => (
          <div
            key={section.title}
            className="glass"
            style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}
          >
            <div
              style={{
                padding: '14px 20px',
                background: 'rgba(108,99,255,0.08)',
                borderBottom: '1px solid var(--border)',
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              {section.title}
            </div>
            <div style={{ padding: '4px 0' }}>
              {section.rows.map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: 'flex',
                    padding: '10px 20px',
                    borderBottom: '1px solid rgba(255,255,255,0.03)',
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      width: 140,
                      flexShrink: 0,
                      fontSize: 13,
                      color: 'var(--text-muted)',
                    }}
                  >
                    {row.label}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color:
                        row.value === '—' || row.value === 'None selected'
                          ? 'var(--text-muted)'
                          : 'var(--text-primary)',
                      fontWeight: row.value !== '—' ? 500 : 400,
                      textTransform: 'capitalize',
                      wordBreak: 'break-word',
                    }}
                  >
                    {row.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Warning if no dream job */}
      {!goals.dream_job && (
        <div
          style={{
            padding: '14px 18px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.25)',
            color: 'var(--accent-red)',
            fontSize: 13,
            marginBottom: 20,
          }}
        >
          ⚠ Dream Job is missing. Go back and enter it — the engine requires it.
        </div>
      )}

      {/* Forge CTA */}
      <div
        style={{
          padding: '24px',
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(0,217,245,0.05))',
          border: '1px solid rgba(108,99,255,0.25)',
          marginBottom: 20,
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
          The engine will run 6 scoring models and generate your 3 personalized paths
        </div>
        <button
          className="btn-primary animate-pulse-glow"
          style={{ fontSize: 18, padding: '18px 48px', justifyContent: 'center' }}
          onClick={onAnalyze}
          disabled={!goals.dream_job || !goals.primary_goal}
        >
          ⚡ Forge My Path
        </button>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 12 }}>
          Analysis takes ~5 seconds · No login required · 100% free
        </div>
      </div>

      <button
        className="btn-ghost"
        style={{ width: '100%', justifyContent: 'center' }}
        onClick={onBack}
      >
        ← Edit Profile
      </button>
    </div>
  );
}
