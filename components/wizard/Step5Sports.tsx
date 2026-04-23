'use client';

import { useForgeStore } from '@/stores/forge-store';
import { SportLevel } from '@/lib/types';

const SPORT_TYPES = [
  'Cricket', 'Football', 'Badminton', 'Tennis', 'Table Tennis',
  'Athletics (Track & Field)', 'Swimming', 'Boxing', 'Wrestling',
  'Kabaddi', 'Hockey', 'Basketball', 'Volleyball', 'Chess', 'Other',
];

const LEVELS: { value: SportLevel; label: string; desc: string }[] = [
  { value: 'beginner', label: 'Beginner', desc: 'Just started / school level' },
  { value: 'district', label: 'District', desc: 'Represented at district competitions' },
  { value: 'state', label: 'State', desc: 'Selected/played at state level' },
  { value: 'national', label: 'National', desc: 'National trials or team representation' },
  { value: 'international', label: 'International', desc: 'International competitions / events' },
];

export default function Step5Sports({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { sports, setSports } = useForgeStore();

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🏆</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Sports Profile</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          Relevant only if sports is part of your career plan. Skip if not applicable.
        </p>
      </div>

      {/* Applicable Toggle */}
      <div style={{ marginBottom: 28 }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 12, fontSize: 14 }}>
          Is sports relevant to your career? ✦ <span style={{ color: 'var(--accent-red)' }}>Required</span>
        </label>
        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { value: true, label: '✅ Yes — sports is part of my plan', icon: '🏅' },
            { value: false, label: '❌ No — skip this section', icon: '➡️' },
          ].map((opt) => (
            <div
              key={String(opt.value)}
              className={`option-card ${sports.applicable === opt.value ? 'selected' : ''}`}
              style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}
              onClick={() => setSports({ applicable: opt.value })}
            >
              <span style={{ fontSize: 20 }}>{opt.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 500 }}>{opt.label}</span>
            </div>
          ))}
        </div>
      </div>

      {sports.applicable && (
        <>
          {/* Sport Type */}
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 10, fontSize: 14 }}>
              Sport Type
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {SPORT_TYPES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSports({ sport_type: s })}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 40,
                    border: `1px solid ${sports.sport_type === s ? 'var(--primary)' : 'var(--border)'}`,
                    background: sports.sport_type === s
                      ? 'rgba(108,99,255,0.15)'
                      : 'var(--bg-elevated)',
                    color: sports.sport_type === s ? 'var(--primary-light)' : 'var(--text-secondary)',
                    fontSize: 13,
                    fontWeight: sports.sport_type === s ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Current Level */}
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 10, fontSize: 14 }}>
              Current Level
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {LEVELS.map((l) => (
                <div
                  key={l.value}
                  className={`option-card ${sports.current_level === l.value ? 'selected' : ''}`}
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                  onClick={() => setSports({ current_level: l.value })}
                >
                  <div>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{l.label}</span>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)', marginLeft: 8 }}>
                      {l.desc}
                    </span>
                  </div>
                  {sports.current_level === l.value && (
                    <span style={{ color: 'var(--primary)' }}>✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Practice Hours & Years */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
                Practice hrs/day:{' '}
                <span style={{ color: 'var(--primary-light)' }}>
                  {sports.practice_hours_per_day ?? 2}h
                </span>
              </label>
              <input
                type="range"
                min={0}
                max={10}
                step={0.5}
                value={sports.practice_hours_per_day ?? 2}
                onChange={(e) => setSports({ practice_hours_per_day: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
                Years of Training:{' '}
                <span style={{ color: 'var(--primary-light)' }}>{sports.years_training ?? 1}y</span>
              </label>
              <input
                type="range"
                min={0}
                max={15}
                step={1}
                value={sports.years_training ?? 1}
                onChange={(e) => setSports({ years_training: parseInt(e.target.value) })}
              />
            </div>
          </div>

          {/* Fitness & Competition */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
                Fitness Level:{' '}
                <span style={{ color: 'var(--primary-light)' }}>{sports.fitness_level ?? 5}/10</span>
              </label>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={sports.fitness_level ?? 5}
                onChange={(e) => setSports({ fitness_level: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
                Competition Exposure:{' '}
                <span style={{ color: 'var(--primary-light)' }}>{sports.competition_exposure ?? 2}/5</span>
              </label>
              <input
                type="range"
                min={0}
                max={5}
                step={1}
                value={sports.competition_exposure ?? 2}
                onChange={(e) => setSports({ competition_exposure: parseInt(e.target.value) })}
              />
            </div>
          </div>

          {/* Has Coaching */}
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 10, fontSize: 14 }}>
              Do you have a certified coach?
            </label>
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { value: true, label: 'Yes — certified coach' },
                { value: false, label: 'No / Self-trained' },
              ].map((opt) => (
                <div
                  key={String(opt.value)}
                  className={`option-card ${sports.has_coaching === opt.value ? 'selected' : ''}`}
                  style={{ flex: 1, textAlign: 'center', padding: '12px' }}
                  onClick={() => setSports({ has_coaching: opt.value })}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }} onClick={onBack}>
          ← Back
        </button>
        <button
          className="btn-primary"
          style={{ flex: 2, justifyContent: 'center' }}
          onClick={onNext}
          disabled={sports.applicable === undefined}
        >
          Continue → Commitment
        </button>
      </div>
    </div>
  );
}
