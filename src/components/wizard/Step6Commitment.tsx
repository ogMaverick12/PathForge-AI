'use client';

import { useForgeStore } from '@/stores/forge-store';
import { CommitmentLevel, TimelineExpectation } from '@/lib/types';

const COMMITMENTS: { value: CommitmentLevel; label: string; desc: string; icon: string; color: string }[] = [
  {
    value: 'casual',
    label: 'Casual',
    desc: "I'm exploring — no serious commitment yet",
    icon: '😌',
    color: 'var(--text-muted)',
  },
  {
    value: 'interested',
    label: 'Interested',
    desc: 'I want this, but I have other priorities too',
    icon: '🙂',
    color: 'var(--accent-gold)',
  },
  {
    value: 'fully_committed',
    label: 'Fully Committed',
    desc: 'This is my #1 priority — I will do what it takes',
    icon: '🔥',
    color: 'var(--accent-green)',
  },
];

const TIMELINES: { value: TimelineExpectation; label: string; desc: string }[] = [
  { value: '0-2', label: '0 – 2 Years', desc: 'I need results very quickly' },
  { value: '3-5', label: '3 – 5 Years', desc: 'Standard career timeline' },
  { value: '5+', label: '5+ Years', desc: "I'm playing the long game" },
];

export default function Step6Commitment({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { goals, setGoals } = useForgeStore();

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>⚡</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Commitment & Timeline</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          This directly affects your probability scores. Honest answers give you better paths.
        </p>
      </div>

      {/* Commitment Level */}
      <div style={{ marginBottom: 32 }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 14, fontSize: 14 }}>
          Commitment Level
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {COMMITMENTS.map((c) => (
            <div
              key={c.value}
              className={`option-card ${goals.commitment_level === c.value ? 'selected' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                border:
                  goals.commitment_level === c.value
                    ? `1px solid ${c.color}60`
                    : '1px solid var(--border)',
                background:
                  goals.commitment_level === c.value
                    ? `${c.color}0D`
                    : 'var(--bg-elevated)',
                padding: '18px 20px',
              }}
              onClick={() => setGoals({ commitment_level: c.value })}
            >
              <span style={{ fontSize: 28, flexShrink: 0 }}>{c.icon}</span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: goals.commitment_level === c.value ? c.color : 'var(--text-primary)',
                  }}
                >
                  {c.label}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 3 }}>{c.desc}</div>
              </div>
              {goals.commitment_level === c.value && (
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: c.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 13,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  ✓
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div style={{ marginBottom: 36 }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 14, fontSize: 14 }}>
          Timeline Expectation
          <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: 12, marginLeft: 8 }}>
            (When do you expect real career outcomes?)
          </span>
        </label>
        <div style={{ display: 'flex', gap: 12 }}>
          {TIMELINES.map((t) => (
            <div
              key={t.value}
              className={`option-card ${goals.timeline_expectation === t.value ? 'selected' : ''}`}
              style={{ flex: 1, textAlign: 'center', padding: '20px 12px' }}
              onClick={() => setGoals({ timeline_expectation: t.value })}
            >
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{t.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Reality check notice if mismatch */}
      {goals.commitment_level === 'casual' && (
        <div
          style={{
            padding: '14px 18px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(249,115,22,0.08)',
            border: '1px solid rgba(249,115,22,0.25)',
            marginBottom: 24,
            fontSize: 13,
            color: 'var(--accent-orange)',
            lineHeight: 1.6,
          }}
        >
          ⚠ <strong>Note:</strong> Casual commitment significantly lowers your probability scores for competitive careers.
          The Reality Engine will flag this if there&apos;s a mismatch with your goals.
        </div>
      )}

      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }} onClick={onBack}>
          ← Back
        </button>
        <button
          className="btn-primary"
          style={{ flex: 2, justifyContent: 'center' }}
          onClick={onNext}
        >
          Review & Forge →
        </button>
      </div>
    </div>
  );
}
