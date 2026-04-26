'use client';

// metadata is set in layout.tsx for SEO

export default function AboutPage() {
  return (
    <div className="legal-page page-enter">
      <nav className="legal-nav no-print">
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src="/icons/PathForgeAI.ico" alt="PathForge AI" style={{ width: 32, height: 32, objectFit: 'contain' }} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--ember)' }}>PATHFORGE</span>
        </a>
        <a href="/forge" className="btn-ghost" style={{ textDecoration: 'none', fontSize: 13 }}>⚡ Forge Your Path</a>
      </nav>

      <main className="legal-container stagger">
        <p className="section-label">ABOUT US</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <img src="/icons/VI-BIT%20Tech.ico" alt="Vi-Bit Technologies Logo" style={{ width: 48, height: 48, objectFit: 'contain' }} />
          <h1 className="display-heading" style={{ fontSize: 48, margin: 0 }}>VI-BIT TECHNOLOGIES</h1>
        </div>

        <div className="about-hero">
          <p className="about-tagline">Solving problems smarter, faster, and better.</p>
        </div>

        <section className="legal-section">
          <p>
            Vi-Bit Technologies is a modern problem-solving company focused on delivering agile, high-impact digital
            solutions across a wide range of domains.
          </p>
          <p>
            Founded by two driven innovators, the company was built with a clear mission—to simplify complexity
            and make powerful solutions accessible to everyone. At Vi-Bit Technologies, we specialize in what we call{' '}
            <em>vibecoded solutions</em>: intuitive, efficient, and thoughtfully designed systems that align with
            both functionality and user experience.
          </p>
        </section>

        <section className="legal-section">
          <h2>Our Approach</h2>
          <p>
            We combine structured thinking with creative execution to build solutions that are not only effective
            but adaptable in a fast-changing world.
          </p>
          <p>
            Our subscription-based model ensures that high-quality innovation remains affordable, scalable, and
            accessible—whether for individuals, startups, or growing teams.
          </p>
        </section>

        <section className="legal-section">
          <h2>Our Mission</h2>
          <p>
            Vi-Bit Technologies stands at the intersection of creativity, technology, and practicality—committed to solving
            problems smarter, faster, and better.
          </p>
        </section>

        <section className="legal-section">
          <h2>PathForge AI</h2>
          <p>
            PathForge AI is our flagship career intelligence engine — built to give every Indian student access to the
            kind of brutally honest, data-driven career guidance that was previously available only to the privileged few.
            No fluff. No generic advice. Real institutions, real salaries, real reality checks.
          </p>
        </section>

        <section className="legal-section">
          <h2>Contact Us</h2>
          <p>
            Interested in what we do? Let's connect.
          </p>
          <p>
            <strong>Email:</strong> <a href="mailto:vibittech67@gmail.com" style={{ color: 'var(--ember)' }}>vibittech67@gmail.com</a><br/>
            <strong>Instagram:</strong> <a href="https://instagram.com/vi_bit.tech" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ember)' }}>@vi_bit.tech</a>
          </p>
        </section>

        <div className="about-cta">
          <a href="/forge" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
            ⚡ Try PathForge AI →
          </a>
        </div>
      </main>

      <style jsx>{`
        .legal-page { min-height: 100vh; background: var(--bg); }
        .legal-nav {
          display: flex; justify-content: space-between; align-items: center;
          padding: 16px 32px; border-bottom: 1px solid var(--border);
        }
        .legal-container { max-width: 720px; margin: 0 auto; padding: 48px 24px 80px; }
        .about-hero {
          background: var(--surface);
          border: 1px solid var(--border);
          border-left: 3px solid var(--ember);
          border-radius: var(--radius);
          padding: 32px;
          margin-bottom: 40px;
        }
        .about-tagline {
          font-family: var(--font-display);
          font-size: 24px;
          letter-spacing: 0.05em;
          color: var(--ember);
          text-align: center;
        }
        .legal-section {
          margin-bottom: 32px;
        }
        .legal-section h2 {
          font-family: var(--font-display);
          font-size: 24px;
          letter-spacing: 0.05em;
          color: var(--text);
          margin-bottom: 12px;
        }
        .legal-section p {
          font-size: 15px;
          line-height: 1.8;
          color: var(--text-dim);
          margin-bottom: 12px;
        }
        .legal-section em {
          color: var(--ember);
          font-style: italic;
        }
        .about-cta {
          text-align: center;
          margin-top: 48px;
          padding-top: 32px;
          border-top: 1px solid var(--border);
        }

        @media (max-width: 768px) {
          .legal-nav { padding: 12px 16px; }
          .legal-container { padding: 32px 16px 64px; }
          .about-tagline { font-size: 20px; }
        }
      `}</style>
    </div>
  );
}
