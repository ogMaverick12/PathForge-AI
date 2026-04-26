'use client';

import Link from 'next/link';
import { useState } from 'react';

const SAMPLE_PATHS = [
  {
    label: "SAFE", tagline: "The Engineered Guarantee", probability: 72,
    route: "VIT Vellore → Software Engineer", color: "var(--success)",
    rationale: "Given Riya's 84% in PCM, VIT is achievable with VITEEE prep. This path prioritizes certainty — she graduates employed.",
    milestones: ["Month 3: Begin JEE Main preparation", "Month 8: First mock — target 70th percentile", "Year 1: CS Foundations complete", "Year 2: First internship", "Year 4: Graduation + placement"],
  },
  {
    label: "BALANCED", tagline: "The Optimal Bet", probability: 54,
    route: "IIT Bombay → Software Engineer", color: "var(--ember)",
    rationale: "With her improving trajectory, IIT Bombay CS is the highest-ROI target. Requires consistent improvement to 90%+ — achievable in 18 months.",
    milestones: ["Month 3: Structured JEE Advanced prep", "Month 8: Mock target — 85th percentile", "Year 1: Domain foundation", "Year 2: Internship at product company", "Year 4: Graduation + top placement"],
  },
  {
    label: "DREAM", tagline: "The Swing for the Fences", probability: 28,
    route: "IIT Delhi → Top SWE roles at Google", color: "var(--heat)",
    rationale: "She said: 'I want to build products used by a billion people.' IIT Delhi CS is a stretch at 28% — but it's the path to Google. 1 in 4 people who try this succeed. Will she be that person?",
    milestones: ["Month 3: Elite JEE coaching + self-study", "Month 8: Mock target — 95th percentile", "Year 2: Open source + competitive programming", "Year 3: Google internship application", "Year 4: Target top companies directly"],
  }
];

const FEATURES = [
  { icon: "🧠", title: "Multi-Factor Probability Engine", desc: "Not vibes. Math. We score your marks, stream, budget, timeline, and constraints against real career requirements to produce honest probability estimates." },
  { icon: "⚠️", title: "Brutally Honest Reality Check", desc: "PathForge tells you what your parents and teachers won't — exactly where your marks, budget, and timeline create real barriers, and how to fix them." },
  { icon: "🏛️", title: "Institution Matchmaker", desc: "Real institutions with real fees, real cutoffs, and real placement data. Filterable by tier, type, and budget. No sponsored listings." },
  { icon: "💰", title: "Scholarship Intelligence", desc: "12 real scholarships scored against your profile. We tell you which ones you'll actually get — not just a list of everything that exists." },
  { icon: "🌳", title: "Interactive Skill Tree", desc: "Every skill you need, organized as a visual tree. Click to track progress. Each leaf is a specific, actionable task — not a vague 'learn coding' suggestion." },
  { icon: "📄", title: "Export & Share", desc: "Generate a clean PDF of your full report. Share a link that lets anyone see your results. Your data stays in your browser — always." },
];

export default function LandingPage() {
  const [expandedSample, setExpandedSample] = useState<number | null>(null);

  return (
    <div className="landing">
      {/* Top Left Logo */}
      <Link href="/" style={{ position: 'absolute', top: 24, left: 24, zIndex: 1000, display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
        <img src="/icons/PathForgeAI.ico" alt="PathForge AI Logo" style={{ width: 32, height: 32, objectFit: 'contain' }} />
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--text)', letterSpacing: '0.05em' }}>
          PATHFORGE <span style={{ color: 'var(--ember)' }}>AI</span>
        </span>
      </Link>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content stagger">
          <h1 className="display-heading hero-title">
            STOP GUESSING.<br />FORGE YOUR PATH.
          </h1>
          <p className="hero-sub">
            PathForge evaluates your grades, goals, budget, and reality.<br />
            Then tells you the truth — three ranked career paths,<br />
            real institutions, and a roadmap that actually works.
          </p>

          <div className="trust-strip">
            <span className="trust-badge">⚡ 100% Client-Side</span>
            <span className="trust-badge">🔒 Zero Data Stored</span>
            <span className="trust-badge">🇮🇳 Built for India</span>
          </div>

          <div className="hero-ctas">
            <Link href="/forge" className="btn-primary hero-cta">⚡ FORGE MY PATH — FREE →</Link>
            <a href="#sample" className="hero-link">See a sample report →</a>
          </div>
        </div>
      </section>

      {/* Sample Report */}
      <section id="sample" className="sample-section">
        <div className="container">
          <p className="section-label">SAMPLE REPORT — GENERATED FROM REAL INPUTS</p>
          <h2 className="display-heading" style={{ fontSize: 36, marginBottom: 8 }}>WHAT YOUR REPORT LOOKS LIKE</h2>
          <p style={{ color: 'var(--text-dim)', marginBottom: 32 }}>Riya Sharma · Class 11 PCM · 84% · Dreams of Google SWE</p>

          {/* Reality Check Sample */}
          <div className="card card-warning" style={{ marginBottom: 16 }}>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 15, letterSpacing: '0.05em', marginBottom: 8, color: 'var(--warning)' }}>⚠️ BUDGET GAP</h4>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-dim)' }}>Your stated budget is under ₹2L/year. IIT Bombay costs ₹2.2L/year. PathForge has identified scholarships below — a loan + scholarship strategy is essential.</p>
          </div>

          {/* Three Paths */}
          <div className="sample-paths">
            {SAMPLE_PATHS.map((path, i) => (
              <div key={i} className="card" style={{ borderLeftColor: path.color, cursor: 'pointer' }}
                onClick={() => setExpandedSample(expandedSample === i ? null : i)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span className="badge" style={{ background: `${path.color}22`, color: path.color }}>{path.label}</span>
                    <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 8 }}>{path.tagline}</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 4 }}>{path.route}</p>
                  </div>
                  <span className="mono" style={{ fontSize: 24, fontWeight: 700, color: path.color }}>{path.probability}%</span>
                </div>
                <div className="score-bar-track" style={{ marginTop: 12 }}>
                  <div className="score-bar-fill" style={{ width: `${path.probability}%`, background: path.color }} />
                </div>
                {expandedSample === i && (
                  <div className="page-enter" style={{ marginTop: 16 }}>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-dim)' }}>{path.rationale}</p>
                    <ul style={{ listStyle: 'none', marginTop: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {path.milestones.map((m, j) => (
                        <li key={j} style={{ fontSize: 13, color: 'var(--text-dim)', paddingLeft: 16, position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: 'var(--ember)' }}>→</span>{m}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <p style={{ fontSize: 12, color: 'var(--iron)', marginTop: 8, textAlign: 'center' }}>
                  {expandedSample === i ? '▲ Collapse' : '▼ Click to expand'}
                </p>
              </div>
            ))}
          </div>

          {/* Sample Scholarships */}
          <div className="sample-scholarships">
            <div className="card" style={{ borderLeftColor: 'var(--success)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600 }}>INSPIRE Scholarship</h4>
                <span className="badge badge-success">🏆 HIGH CHANCE</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-dim)' }}>₹80,000/year for 5 years — DST, Govt of India</p>
              <p style={{ fontSize: 11, color: 'var(--iron)', marginTop: 4 }}>Match: PCM stream matches · 84% exceeds 80% threshold</p>
            </div>
            <div className="card" style={{ borderLeftColor: 'var(--ember)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600 }}>IIT Need-Based Fee Waiver</h4>
                <span className="badge badge-gold">⚡ MODERATE</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-dim)' }}>Full tuition waiver — IITs (all campuses)</p>
              <p style={{ fontSize: 11, color: 'var(--iron)', marginTop: 4 }}>Match: financial need profile aligns</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <p className="section-label">HOW IT WORKS</p>
          <h2 className="display-heading" style={{ fontSize: 36, marginBottom: 40 }}>SIX ENGINES. ONE REPORT.</h2>
          <div className="feature-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="card feature-card">
                <span style={{ fontSize: 28, marginBottom: 12, display: 'block' }}>{f.icon}</span>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="proof-section">
        <div className="container" style={{ textAlign: 'center', maxWidth: 600 }}>
          <p className="section-label">THE METHODOLOGY</p>
          <p style={{ fontSize: 18, lineHeight: 1.8, color: 'var(--text-dim)', marginTop: 16 }}>
            PathForge uses the same multi-factor scoring methodology used in college admission research and career psychology.
            No astrology. No quizzes. Just math and honesty.
          </p>
          <Link href="/forge" className="btn-primary" style={{ textDecoration: 'none', marginTop: 32, display: 'inline-block' }}>⚡ FORGE MY PATH →</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <img src="/icons/PathForgeAI.ico" alt="PathForge AI" style={{ width: 24, height: 24, objectFit: 'contain' }} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--ember)' }}>PATHFORGE</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--iron)', marginTop: 4 }}>Built for students, by students.</p>
          </div>
          <div className="footer-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            <Link href="/forge">Get Started</Link>
            <a href="#sample">Sample Report</a>
          </div>
        </div>
        <div className="container" style={{ borderTop: '1px solid var(--border)', paddingTop: 16, marginTop: 24 }}>
          <p style={{ fontSize: 11, color: 'var(--iron)', lineHeight: 1.6 }}>
            ⚠️ Disclaimer: PathForge is an educational tool. It does not guarantee admission, scholarships, or employment. All probabilities are estimates. Verify independently.
          </p>
        </div>
      </footer>

      <style jsx>{`
        .landing { background: var(--bg); }

        /* Hero */
        .hero {
          min-height: 100vh; display: flex; align-items: center; justify-content: center;
          padding: 80px 24px;
          background:
            radial-gradient(ellipse at 50% 0%, rgba(245,166,35,0.06) 0%, transparent 60%),
            var(--bg);
        }
        .hero-content { text-align: center; max-width: 720px; }
        .hero-title { font-size: 96px; line-height: 0.95; margin-bottom: 24px; }
        .hero-sub { font-size: 18px; color: var(--text-dim); line-height: 1.8; margin-bottom: 32px; }
        .trust-strip { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-bottom: 40px; }
        .trust-badge {
          font-family: var(--font-mono); font-size: 12px; color: var(--text-dim);
          padding: 6px 14px; border: 1px solid var(--border); border-radius: 100px;
        }
        .hero-ctas { display: flex; flex-direction: column; align-items: center; gap: 16px; }
        .hero-cta { font-size: 17px !important; padding: 16px 40px !important; }
        .hero-link { color: var(--text-dim); font-size: 14px; transition: color 150ms; }
        .hero-link:hover { color: var(--ember); }

        /* Container */
        .container { max-width: 960px; margin: 0 auto; padding: 0 24px; }

        /* Sample Section */
        .sample-section { padding: 80px 0; border-top: 1px solid var(--border); }
        .sample-paths { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; }
        .sample-scholarships { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        /* Features */
        .features-section { padding: 80px 0; border-top: 1px solid var(--border); }
        .feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .feature-card { border-left-color: var(--border) !important; transition: border-color 200ms; }
        .feature-card:hover { border-left-color: var(--ember) !important; }

        /* Proof */
        .proof-section { padding: 80px 0; border-top: 1px solid var(--border); }

        /* Footer */
        .footer { padding: 40px 0 24px; border-top: 1px solid var(--border); }
        .footer-content { display: flex; justify-content: space-between; align-items: flex-start; }
        .footer-links { display: flex; gap: 24px; }
        .footer-links a { color: var(--text-dim); font-size: 13px; text-decoration: none; transition: color 150ms; }
        .footer-links a:hover { color: var(--ember); }

        @media (max-width: 768px) {
          .hero-title { font-size: 56px; }
          .hero-sub br { display: none; }
          .feature-grid { grid-template-columns: 1fr; }
          .sample-scholarships { grid-template-columns: 1fr; }
          .footer-content { flex-direction: column; gap: 16px; }
        }
      `}</style>
    </div>
  );
}
