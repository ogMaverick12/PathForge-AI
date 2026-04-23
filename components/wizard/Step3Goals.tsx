'use client';

import { useForgeStore } from '@/stores/forge-store';
import { useState } from 'react';

const PRIMARY_GOALS = [
  'Get into IIT / Top Engineering College',
  'Become a Doctor (MBBS / Specialist)',
  'Crack UPSC Civil Services (IAS/IPS)',
  'Build a successful startup',
  'Pursue professional sports career',
  'Enter the film / arts / creative industry',
  'Become a lawyer / legal professional',
  'Work abroad in a global company',
  'Join the Indian Armed Forces',
  'Become a financial professional (CA/MBA)',
  'Pursue research / academia',
  'Undecided — help me explore',
];

const MOTIVATIONS = [
  { value: 'passion', label: 'Passion', icon: '❤️', desc: 'I love this — it excites me' },
  { value: 'money', label: 'Financial Goal', icon: '💰', desc: 'I want high earning potential' },
  { value: 'prestige', label: 'Prestige', icon: '🏆', desc: 'Status and recognition matter to me' },
  { value: 'family', label: 'Family Expectation', icon: '👨‍👩‍👧', desc: 'My family wants this for me' },
  { value: 'unsure', label: 'Unsure', icon: '🤔', desc: "I'm figuring it out" },
];

export default function Step3Goals({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { goals, setGoals, extracurricular, setExtracurricular } = useForgeStore();
  const [showExtras, setShowExtras] = useState(false);

  const ACHIEVEMENTS = [
    'Science Olympiad', 'Math Olympiad', 'Coding Competition',
    'Debate Champion', 'MUN Award', 'Art/Design Award',
    'Music Performance', 'National-level Sport', 'Published Article',
    'Innovation Fair', 'State-level Exam Topper', 'Scholarship Holder',
  ];
  const OLYMPIADS = ['SOF (NSO/IMO/IEO)', 'HBCSE (IOQM/NSEP)', 'NTSE', 'Informatics Olympiad', 'Astronomy Olympiad', 'RMO/INMO'];
  const LEADERSHIP = ['School Head Boy/Girl', 'Club President', 'Event Coordinator', 'Student Council', 'Volunteer Lead', 'Sports Captain'];

  const toggleChip = (field: 'achievements' | 'olympiads' | 'leadership_roles' | 'sports_achievements', value: string) => {
    const current = (extracurricular[field] as string[]) ?? [];
    const updated = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
    setExtracurricular({ [field]: updated });
  };

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🎯</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Your Goal Engine</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          Vague goals = vague output. Be specific — your paths depend on this.
        </p>
      </div>

      {/* Primary Goal */}
      <div style={{ marginBottom: 28 }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 12, fontSize: 14 }}>
          Primary Goal ✦ <span style={{ color: 'var(--accent-red)' }}>Required</span>
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {PRIMARY_GOALS.map((g) => (
            <div
              key={g}
              className={`option-card ${goals.primary_goal === g ? 'selected' : ''}`}
              style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between' }}
              onClick={() => setGoals({ primary_goal: g })}
            >
              <span style={{ fontSize: 14 }}>{g}</span>
              {goals.primary_goal === g && (
                <span style={{ color: 'var(--primary)' }}>✓</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Secondary Goal (optional) */}
      <div style={{ marginBottom: 28 }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
          Secondary Goal{' '}
          <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(optional)</span>
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="e.g. Also interested in entrepreneurship alongside medicine"
          value={goals.secondary_goal ?? ''}
          onChange={(e) => setGoals({ secondary_goal: e.target.value || undefined })}
        />
      </div>

      {/* Goal Motivation */}
      <div style={{ marginBottom: 36 }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 12, fontSize: 14 }}>
          What drives this goal?
        </label>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 10,
          }}
        >
          {MOTIVATIONS.map((m) => (
            <div
              key={m.value}
              className={`option-card ${goals.goal_motivation === m.value ? 'selected' : ''}`}
              style={{ textAlign: 'center', padding: '16px 12px' }}
              onClick={() => setGoals({ goal_motivation: m.value as typeof goals.goal_motivation })}
            >
              <div style={{ fontSize: 24, marginBottom: 6 }}>{m.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{m.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Extracurricular Profile (Optional) ─────── */}
      <div style={{ marginBottom: 36 }}>
        <button
          onClick={() => setShowExtras(!showExtras)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 18px',
            borderRadius: 'var(--radius-md)',
            background: showExtras ? 'rgba(108,99,255,0.08)' : 'var(--bg-elevated)',
            border: showExtras ? '1px solid rgba(108,99,255,0.3)' : '1px solid var(--border)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 14,
            fontFamily: 'Inter, sans-serif',
            transition: 'all 0.2s',
          }}
        >
          <span>🏅 Profile Boosters <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: 12 }}>(optional — improves scholarship matching)</span></span>
          <span style={{ color: 'var(--primary-light)', fontSize: 18 }}>{showExtras ? '−' : '+'}</span>
        </button>

        {showExtras && (
          <div style={{ padding: '20px 0', display: 'flex', flexDirection: 'column', gap: 20, animation: 'fadeInUp 0.3s ease' }}>
            {/* Achievements */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                🏆 Achievements & Awards
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {ACHIEVEMENTS.map(a => {
                  const sel = (extracurricular.achievements ?? []).includes(a);
                  return (
                    <button key={a} onClick={() => toggleChip('achievements', a)} style={{
                      padding: '5px 12px', borderRadius: 40, fontSize: 12, cursor: 'pointer', transition: 'all 0.2s',
                      border: `1px solid ${sel ? 'var(--accent-gold)' : 'var(--border)'}`,
                      background: sel ? 'rgba(240,165,0,0.12)' : 'var(--bg-elevated)',
                      color: sel ? 'var(--accent-gold)' : 'var(--text-secondary)', fontWeight: sel ? 600 : 400,
                    }}>{sel ? '✓ ' : ''}{a}</button>
                  );
                })}
              </div>
            </div>

            {/* Olympiads */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                🧪 Olympiads / Competitive Exams
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {OLYMPIADS.map(o => {
                  const sel = (extracurricular.olympiads ?? []).includes(o);
                  return (
                    <button key={o} onClick={() => toggleChip('olympiads', o)} style={{
                      padding: '5px 12px', borderRadius: 40, fontSize: 12, cursor: 'pointer', transition: 'all 0.2s',
                      border: `1px solid ${sel ? 'var(--accent-cyan)' : 'var(--border)'}`,
                      background: sel ? 'rgba(0,217,245,0.1)' : 'var(--bg-elevated)',
                      color: sel ? 'var(--accent-cyan)' : 'var(--text-secondary)', fontWeight: sel ? 600 : 400,
                    }}>{sel ? '✓ ' : ''}{o}</button>
                  );
                })}
              </div>
            </div>

            {/* Leadership */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                👑 Leadership Roles
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {LEADERSHIP.map(l => {
                  const sel = (extracurricular.leadership_roles ?? []).includes(l);
                  return (
                    <button key={l} onClick={() => toggleChip('leadership_roles', l)} style={{
                      padding: '5px 12px', borderRadius: 40, fontSize: 12, cursor: 'pointer', transition: 'all 0.2s',
                      border: `1px solid ${sel ? 'var(--primary)' : 'var(--border)'}`,
                      background: sel ? 'rgba(108,99,255,0.1)' : 'var(--bg-elevated)',
                      color: sel ? 'var(--primary-light)' : 'var(--text-secondary)', fontWeight: sel ? 600 : 400,
                    }}>{sel ? '✓ ' : ''}{l}</button>
                  );
                })}
              </div>
            </div>

            {/* Toggles */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button
                onClick={() => setExtracurricular({ has_published_research: !extracurricular.has_published_research })}
                className={`option-card ${extracurricular.has_published_research ? 'selected' : ''}`}
                style={{ flex: 1, minWidth: 200, textAlign: 'center', padding: '12px 16px' }}
              >
                <div style={{ fontSize: 20, marginBottom: 4 }}>📄</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Published Research</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{extracurricular.has_published_research ? '✓ Yes' : 'No'}</div>
              </button>
              <button
                onClick={() => setExtracurricular({ community_service: !extracurricular.community_service })}
                className={`option-card ${extracurricular.community_service ? 'selected' : ''}`}
                style={{ flex: 1, minWidth: 200, textAlign: 'center', padding: '12px 16px' }}
              >
                <div style={{ fontSize: 20, marginBottom: 4 }}>🤝</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Community Service</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{extracurricular.community_service ? '✓ Yes' : 'No'}</div>
              </button>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }} onClick={onBack}>
          ← Back
        </button>
        <button
          className="btn-primary"
          style={{ flex: 2, justifyContent: 'center' }}
          onClick={onNext}
          disabled={!goals.primary_goal}
        >
          Continue → Dream Job
        </button>
      </div>
    </div>
  );
}
