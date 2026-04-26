'use client';

// metadata is set in layout.tsx for SEO

export default function TermsPage() {
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
        <p className="section-label">LEGAL</p>
        <h1 className="display-heading" style={{ fontSize: 44, marginBottom: 8 }}>TERMS &amp; CONDITIONS</h1>
        <p style={{ color: 'var(--iron)', fontSize: 13, marginBottom: 40 }}>Last updated: April 2026</p>

        <section className="legal-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using PathForge AI (&quot;the Service&quot;), a product of Vi-Bit Technologies (&quot;we&quot;,
            &quot;us&quot;, &quot;our&quot;), you agree to be bound by these Terms and Conditions. If you do not agree
            with any part of these terms, you may not use the Service.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Description of Service</h2>
          <p>
            PathForge AI is a career intelligence engine that generates personalized career recommendations,
            institution matches, scholarship suggestions, and skill roadmaps based on user-provided academic,
            financial, and aspirational inputs. The Service is designed for informational and guidance purposes only.
          </p>
        </section>

        <section className="legal-section">
          <h2>3. No Professional Advice</h2>
          <p>
            The recommendations provided by PathForge AI are algorithmically generated and do not constitute
            professional career counselling, financial advice, or academic guidance. Users are strongly encouraged
            to consult qualified career counsellors, educators, and financial advisors before making important
            life decisions.
          </p>
          <p>
            Salary ranges, institution fees, cutoff scores, and scholarship information are approximate and based
            on publicly available data at the time of development. These figures may change and should be independently
            verified before reliance.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. User Data &amp; Privacy</h2>
          <p>
            PathForge AI processes all user data locally within your browser session. We do not transmit, store,
            or share your personal information, academic records, or career preferences to any external server
            or third party.
          </p>
          <p>
            Session data (profile inputs and results) is stored temporarily in your browser&apos;s local storage
            and can be cleared at any time by the user.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Accuracy Disclaimer</h2>
          <p>
            While we strive to maintain accurate and up-to-date career data, institution information, and
            scholarship details, Vi-Bit Technologies makes no warranties or representations regarding the completeness,
            accuracy, reliability, or suitability of the information provided through the Service.
          </p>
          <p>
            Career probability scores, reality flags, and ROI assessments are estimates based on generalized
            data patterns and should not be treated as guaranteed outcomes.
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Intellectual Property</h2>
          <p>
            All content, algorithms, designs, branding, and code associated with PathForge AI are the intellectual
            property of Vi-Bit Technologies. Unauthorized reproduction, distribution, or commercial use of any part of
            the Service is prohibited without prior written consent.
          </p>
        </section>

        <section className="legal-section">
          <h2>7. User Responsibilities</h2>
          <p>Users agree to:</p>
          <ul>
            <li>Provide honest and accurate information during the career assessment process.</li>
            <li>Use the Service for personal, non-commercial purposes only.</li>
            <li>Not attempt to reverse-engineer, scrape, or exploit the Service&apos;s algorithms or data.</li>
            <li>Not misrepresent PathForge AI results as certified professional advice.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>8. Limitation of Liability</h2>
          <p>
            Vi-Bit Technologies shall not be held liable for any direct, indirect, incidental, or consequential damages
            arising from the use of PathForge AI, including but not limited to decisions made based on the
            Service&apos;s recommendations.
          </p>
        </section>

        <section className="legal-section">
          <h2>9. Modifications</h2>
          <p>
            Vi-Bit Technologies reserves the right to modify these Terms and Conditions at any time without prior notice.
            Continued use of the Service after any changes constitutes acceptance of the updated terms.
          </p>
        </section>

        <section className="legal-section">
          <h2>10. Governing Law</h2>
          <p>
            These Terms and Conditions are governed by and construed in accordance with the laws of India.
            Any disputes arising from the use of the Service shall be subject to the exclusive jurisdiction
            of the courts in India.
          </p>
        </section>

        <section className="legal-section">
          <h2>11. Contact</h2>
          <p>
            For questions about these terms, please reach out to Vi-Bit Technologies through our official channels.
          </p>
          <p>
            <strong>Email:</strong> <a href="mailto:vibittech67@gmail.com" style={{ color: 'var(--ember)' }}>vibittech67@gmail.com</a><br/>
            <strong>Instagram:</strong> <a href="https://instagram.com/vi_bit.tech" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ember)' }}>@vi_bit.tech</a>
          </p>
        </section>
      </main>

      <style jsx>{`
        .legal-page { min-height: 100vh; background: var(--bg); }
        .legal-nav {
          display: flex; justify-content: space-between; align-items: center;
          padding: 16px 32px; border-bottom: 1px solid var(--border);
        }
        .legal-container { max-width: 720px; margin: 0 auto; padding: 48px 24px 80px; }
        .legal-section {
          margin-bottom: 28px;
        }
        .legal-section h2 {
          font-family: var(--font-display);
          font-size: 22px;
          letter-spacing: 0.05em;
          color: var(--text);
          margin-bottom: 10px;
        }
        .legal-section p {
          font-size: 14px;
          line-height: 1.8;
          color: var(--text-dim);
          margin-bottom: 10px;
        }
        .legal-section ul {
          list-style: none;
          padding: 0;
          margin: 8px 0;
        }
        .legal-section li {
          font-size: 14px;
          line-height: 1.8;
          color: var(--text-dim);
          padding-left: 20px;
          position: relative;
          margin-bottom: 4px;
        }
        .legal-section li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: var(--ember);
        }

        @media (max-width: 768px) {
          .legal-nav { padding: 12px 16px; }
          .legal-container { padding: 32px 16px 64px; }
        }
      `}</style>
    </div>
  );
}
