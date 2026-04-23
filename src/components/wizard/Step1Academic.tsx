'use client';

import { useForgeStore } from '@/stores/forge-store';
import { AcademicPerfomance } from '@/lib/types';

const SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology',
  'English', 'Computer Science', 'Economics', 'History',
  'Geography', 'Political Science', 'Accountancy', 'Business Studies',
];

const PERFORMANCE_OPTIONS: { value: AcademicPerfomance; label: string; desc: string }[] = [
  { value: 'below_60', label: 'Below 60%', desc: 'Need significant improvement' },
  { value: '60_75', label: '60 – 75%', desc: 'Average — scope to grow' },
  { value: '75_85', label: '75 – 85%', desc: 'Good — solid foundation' },
  { value: '85_95', label: '85 – 95%', desc: 'Very strong — competitive' },
  { value: '95_plus', label: '95%+', desc: 'Exceptional — top tier' },
];

export default function Step1Academic({ onNext }: { onNext: () => void }) {
  const { academic, setAcademic } = useForgeStore();

  const toggleSubject = (list: 'subject_strengths' | 'subject_weaknesses', subject: string) => {
    const current = academic[list] ?? [];
    const updated = current.includes(subject)
      ? current.filter((s) => s !== subject)
      : [...current, subject];
    setAcademic({ [list]: updated });
  };

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>📚</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Academic Profile</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          Be honest — the engine works only if your inputs are accurate.
        </p>
      </div>

      {/* Current Class */}
      <div style={{ marginBottom: 28 }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 12, fontSize: 14 }}>
          Current Class
        </label>
        <div style={{ display: 'flex', gap: 12 }}>
          {[9, 10, 11, 12].map((cls) => (
            <button
              key={cls}
              className={`option-card ${academic.current_class === cls ? 'selected' : ''}`}
              style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 18, color: '#ffffff' }}
              onClick={() => setAcademic({ current_class: cls as 9 | 10 | 11 | 12 })}
            >
              {cls}
            </button>
          ))}
        </div>
      </div>

      {/* Academic Performance */}
      <div style={{ marginBottom: 28 }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 12, fontSize: 14 }}>
          Current Academic Performance
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {PERFORMANCE_OPTIONS.map((opt) => (
            <div
              key={opt.value}
              className={`option-card ${academic.performance === opt.value ? 'selected' : ''}`}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              onClick={() => setAcademic({ performance: opt.value })}
            >
              <div>
                <span style={{ fontWeight: 600, fontSize: 15 }}>{opt.label}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: 13, marginLeft: 10 }}>
                  {opt.desc}
                </span>
              </div>
              {academic.performance === opt.value && (
                <span style={{ color: 'var(--primary)', fontSize: 18 }}>✓</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Study Hours */}
      <div style={{ marginBottom: 28 }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 12, fontSize: 14 }}>
          Study Hours per Day:{' '}
          <span style={{ color: 'var(--primary-light)', fontWeight: 700 }}>
            {academic.study_hours ?? 4}h
          </span>
          {(academic.study_hours ?? 4) < 3 && (
            <span style={{ color: 'var(--accent-red)', fontSize: 12, marginLeft: 8 }}>
              ⚠ Low
            </span>
          )}
          {(academic.study_hours ?? 4) >= 6 && (
            <span style={{ color: 'var(--accent-green)', fontSize: 12, marginLeft: 8 }}>
              ✅ Strong
            </span>
          )}
        </label>
        <input
          type="range"
          min={0}
          max={12}
          step={0.5}
          value={academic.study_hours ?? 4}
          onChange={(e) => setAcademic({ study_hours: parseFloat(e.target.value) })}
          style={{ marginBottom: 8 }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 11,
            color: 'var(--text-muted)',
          }}
        >
          <span>0h (None)</span>
          <span>6h (Competitive)</span>
          <span>12h (Maximum)</span>
        </div>
      </div>

      {/* Subject Strengths */}
      <div style={{ marginBottom: 28 }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
          Subject Strengths{' '}
          <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(select all that apply)</span>
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SUBJECTS.map((sub) => {
            const isSelected = (academic.subject_strengths ?? []).includes(sub);
            return (
              <button
                key={sub}
                onClick={() => toggleSubject('subject_strengths', sub)}
                style={{
                  padding: '7px 14px',
                  borderRadius: 40,
                  border: `1px solid ${isSelected ? 'var(--accent-green)' : 'var(--border)'}`,
                  background: isSelected ? 'rgba(34,197,94,0.12)' : 'var(--bg-elevated)',
                  color: isSelected ? 'var(--accent-green)' : 'var(--text-secondary)',
                  fontSize: 13,
                  fontWeight: isSelected ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {isSelected ? '✓ ' : ''}{sub}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subject Weaknesses */}
      <div style={{ marginBottom: 36 }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
          Subject Weaknesses{' '}
          <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(be honest)</span>
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SUBJECTS.map((sub) => {
            const isSelected = (academic.subject_weaknesses ?? []).includes(sub);
            return (
              <button
                key={sub}
                onClick={() => toggleSubject('subject_weaknesses', sub)}
                style={{
                  padding: '7px 14px',
                  borderRadius: 40,
                  border: `1px solid ${isSelected ? 'var(--accent-red)' : 'var(--border)'}`,
                  background: isSelected ? 'rgba(239,68,68,0.1)' : 'var(--bg-elevated)',
                  color: isSelected ? 'var(--accent-red)' : 'var(--text-secondary)',
                  fontSize: 13,
                  fontWeight: isSelected ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {isSelected ? '✗ ' : ''}{sub}
              </button>
            );
          })}
        </div>
      </div>

      <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={onNext}>
        Continue → Constraints
      </button>
    </div>
  );
}
