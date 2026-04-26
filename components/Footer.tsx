'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer no-print">
      <div className="footer-inner">
        {/* Brand masthead */}
        <div className="footer-brand">
          <img src="/icons/PathForgeAI.ico" alt="PathForge AI Logo" className="footer-logo" style={{ width: 40, height: 40, objectFit: 'contain' }} />
          <div>
            <p className="footer-product">PATHFORGE AI</p>
            <p className="footer-byline">
              Created by <span className="footer-lab">Vi-Bit Technologies</span>
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="footer-links">
          <Link href="/about">About Us</Link>
          <Link href="/terms">Terms &amp; Conditions</Link>
          <Link href="/forge">Forge Your Path</Link>
          <a href="mailto:vibittech67@gmail.com">📧 Contact</a>
          <a href="https://instagram.com/vi_bit.tech" target="_blank" rel="noopener noreferrer">📸 Instagram</a>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Vi-Bit Technologies. All rights reserved.</p>
          <p className="footer-tagline">Solving problems smarter, faster, and better.</p>
        </div>
      </div>

      <style jsx>{`
        .site-footer {
          border-top: 1px solid var(--border);
          background: var(--surface);
          padding: 48px 24px 32px;
          margin-top: 80px;
        }
        .footer-inner {
          max-width: 960px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .footer-brand {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .footer-logo {
          font-size: 28px;
          filter: drop-shadow(0 0 8px rgba(245, 166, 35, 0.4));
        }
        .footer-product {
          font-family: var(--font-display);
          font-size: 20px;
          letter-spacing: 0.1em;
          color: var(--ember);
          line-height: 1;
        }
        .footer-byline {
          font-size: 13px;
          color: var(--text-dim);
          margin-top: 4px;
        }
        .footer-lab {
          font-family: var(--font-display);
          font-size: 15px;
          letter-spacing: 0.08em;
          color: var(--text);
          background: linear-gradient(135deg, var(--ember), var(--heat));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .footer-links {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }
        .footer-links a {
          font-size: 14px;
          color: var(--text-dim);
          text-decoration: none;
          transition: color 150ms;
          letter-spacing: 0.01em;
        }
        .footer-links a:hover {
          color: var(--ember);
        }
        .footer-bottom {
          border-top: 1px solid var(--border);
          padding-top: 20px;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
        }
        .footer-bottom p {
          font-size: 12px;
          color: var(--iron);
        }
        .footer-tagline {
          font-style: italic;
        }

        @media (max-width: 768px) {
          .site-footer { padding: 32px 16px 24px; margin-top: 48px; }
          .footer-links { flex-direction: column; gap: 12px; }
          .footer-bottom { flex-direction: column; gap: 4px; }
        }
      `}</style>
    </footer>
  );
}
