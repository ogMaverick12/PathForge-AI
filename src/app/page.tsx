'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const STATS = [
  { value: '50+', label: 'Career Domains' },
  { value: '3', label: 'Paths Generated' },
  { value: '100%', label: 'Personalized' },
  { value: '0%', label: 'Generic Advice' },
];

const FEATURES = [
  {
    icon: '🧠',
    title: 'Intelligence Engine',
    desc: 'Scores your reality using probability models, ROI analysis, and goal alignment — not vibes.',
  },
  {
    icon: '💀',
    title: 'Brutal Honesty Mode',
    desc: 'We tell you what no counsellor will: effort mismatch, budget gaps, timeline illusions.',
  },
  {
    icon: '🗺️',
    title: 'Execution Roadmap',
    desc: 'Phase-by-phase plan with milestones, decisions, exams, and monthly checkpoints.',
  },
  {
    icon: '🎯',
    title: '3 Distinct Paths',
    desc: 'Safe, Balanced, and Aggressive options — each with real institutions and probability scores.',
  },
  {
    icon: '🏆',
    title: 'Sports Dual Path',
    desc: 'Dedicated sports pipeline with backup career integration so you never have only one plan.',
  },
  {
    icon: '🌍',
    title: 'India + Global',
    desc: 'QS-ranked universities, Indian government colleges, and scholarship pathways combined.',
  },
];

const STUDENT_SCENARIOS = [
  {
    name: 'Riya Sharma',
    class: 'Class 11, PCM',
    dream: 'Software Engineer at Google',
    result: 'Safe: NIT Trichy → Balanced: IIT Roorkee → Aggressive: MS at CMU',
    color: 'var(--primary)',
  },
  {
    name: 'Arjun Mehta',
    class: 'Class 10, Cricketer',
    dream: 'Professional Cricketer',
    result: 'Primary: BCCI Pipeline → Backup: Sports Management + Journalism',
    color: 'var(--accent-orange)',
  },
  {
    name: 'Priya Nair',
    class: 'Class 12, PCB',
    dream: 'Doctor',
    result: '⚠️ Reality: 540 NEET score. Target: JIPMER. Alternative: BDS/Pharmacy',
    color: 'var(--accent-gold)',
  },
];

export default function HomePage() {
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeScenario, setActiveScenario] = useState(0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScenario((s) => (s + 1) % STUDENT_SCENARIOS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Cursor glow */}
      <div
        style={{
          position: 'fixed',
          top: mousePos.y - 200,
          left: mousePos.x - 200,
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'top 0.1s, left 0.1s',
        }}
      />

      {/* Background grid */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(108,99,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108,99,255,0.04) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* ─── NAVBAR ─────────────────────────────────── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '16px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(5,8,16,0.8)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 24 }}>⚡</span>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: '-0.03em',
            }}
          >
            PathForge{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #8b85ff, #00d9f5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              AI
            </span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>India&apos;s #1 Career Engine</span>
          <button
            className="btn-primary"
            style={{ padding: '10px 22px', fontSize: 13 }}
            onClick={() => router.push('/forge')}
          >
            Start Free →
          </button>
        </div>
      </nav>

      {/* ─── HERO ───────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '120px 24px 80px',
        }}
      >
        {/* Top badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 40,
            background: 'rgba(108,99,255,0.12)',
            border: '1px solid rgba(108,99,255,0.3)',
            marginBottom: 32,
          }}
        >
          <span style={{ fontSize: 12 }}>✦</span>
          <span style={{ fontSize: 12, color: 'var(--primary-light)', fontWeight: 600 }}>
            Not a quiz. A decision engine.
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: 'clamp(40px, 7vw, 84px)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            maxWidth: 900,
            marginBottom: 28,
          }}
        >
          Stop Guessing.
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #8b85ff 0%, #00d9f5 50%, #6c63ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200%',
            }}
          >
            Forge Your Path.
          </span>
        </h1>

        <p
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'var(--text-secondary)',
            maxWidth: 620,
            lineHeight: 1.7,
            marginBottom: 48,
          }}
        >
          PathForge AI evaluates your goals, constraints, marks, and reality to generate
          three ranked, personalized, brutally honest career paths — with probability scores,
          real institutions, and actionable roadmaps.
        </p>

        {/* CTA */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            className="btn-primary animate-pulse-glow"
            style={{ fontSize: 17, padding: '16px 36px' }}
            onClick={() => router.push('/forge')}
          >
            ⚡ Forge My Path — Free
          </button>
          <a href="#how-it-works" className="btn-ghost" style={{ fontSize: 15 }}>
            How it works →
          </a>
        </div>

        {/* Stats Row */}
        <div
          style={{
            display: 'flex',
            gap: 48,
            marginTop: 80,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {STATS.map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  fontWeight: 800,
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: 'linear-gradient(135deg, #8b85ff, #00d9f5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── LIVE DEMO PANEL ─────────────────────────── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: 12 }}>
              Real Students. Real Paths.
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>
              Here&apos;s what PathForge AI actually generates — not motivational fluff.
            </p>
          </div>

          {/* Scenario cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {STUDENT_SCENARIOS.map((s, i) => (
              <div
                key={i}
                className="glass"
                style={{
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px 28px',
                  border: activeScenario === i
                    ? `1px solid ${s.color}55`
                    : '1px solid var(--border)',
                  background: activeScenario === i
                    ? `${s.color}08`
                    : 'rgba(26,32,53,0.5)',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  transform: activeScenario === i ? 'scale(1.01)' : 'scale(1)',
                }}
                onClick={() => setActiveScenario(i)}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 16,
                    flexWrap: 'wrap',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          background: `${s.color}22`,
                          border: `1px solid ${s.color}44`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 14,
                          fontWeight: 700,
                          color: s.color,
                        }}
                      >
                        {s.name[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{s.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.class}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>
                      Dream: <span style={{ color: s.color }}>{s.dream}</span>
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                        maxWidth: 600,
                      }}
                    >
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>PathForge </span>
                      {s.result}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      color: s.color,
                      padding: '4px 10px',
                      border: `1px solid ${s.color}40`,
                      borderRadius: 40,
                      background: `${s.color}10`,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    SAMPLE REPORT
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─────────────────────────────────── */}
      <section id="how-it-works" style={{ position: 'relative', zIndex: 1, padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: 16 }}>
              Everything a career counsellor{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #8b85ff, #00d9f5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                won&apos;t tell you
              </span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 560, margin: '0 auto' }}>
              Built for students who are serious about their future and want data, not generic advice.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 20,
            }}
          >
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="glass"
                style={{
                  borderRadius: 'var(--radius-lg)',
                  padding: '28px 28px',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(108,99,255,0.4)';
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(108,99,255,0.06)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(26,32,53,0.6)';
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INPUT SYSTEM PREVIEW ─────────────────────── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', marginBottom: 16 }}>
            A 6-minute deep profile.
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, marginBottom: 48 }}>
            7 focused steps covering academics, goals, constraints, and sports inputs.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginBottom: 48,
            }}
          >
            {[
              '📚 Academic Profile',
              '💰 Budget & Location',
              '🎯 Your Goals',
              '💡 Dream Job',
              '🏆 Sports Profile',
              '⚡ Commitment Level',
              '🔍 Review & Forge',
            ].map((step, i) => (
              <div
                key={step}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 18px',
                  borderRadius: 40,
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    fontWeight: 700,
                  }}
                >
                  {i + 1}
                </span>
                {step}
              </div>
            ))}
          </div>

          <button
            className="btn-primary"
            style={{ fontSize: 18, padding: '18px 48px' }}
            onClick={() => router.push('/forge')}
          >
            ⚡ Start Your Analysis — Free
          </button>
          <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 16 }}>
            No signup required · Takes ~6 minutes · 100% free for basic report
          </p>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────── */}
      <footer
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '40px 40px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>⚡</span>
          <span style={{ fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>PathForge AI</span>
          <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>· Built for ambitious students</span>
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>
          Data-driven career decisions. Not vibes.
        </div>
      </footer>
    </div>
  );
}
