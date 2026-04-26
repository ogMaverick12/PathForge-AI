'use client';
import { useForgeStore } from '@/stores/forge-store';

export default function StepDream() {
  const { profile, setProfileField } = useForgeStore();

  return (
    <div className="step-content page-enter">
      <div className="dream-layout">
        <h2 className="display-heading" style={{ fontSize: 64, marginBottom: 16, textAlign: 'center' }}>ONE LAST THING.</h2>
        <p className="dream-subtitle">
          Forget what&apos;s realistic for a moment. If marks, money, and society didn&apos;t exist — what would you be? Who would you help? What would you build?
        </p>

        <textarea
          id="deep_dream"
          rows={4}
          placeholder="Write freely. This is just for you and PathForge..."
          value={profile.deep_dream}
          onChange={e => setProfileField('deep_dream', e.target.value)}
          className="dream-textarea"
        />

        <p className="dream-footnote">
          PathForge uses this to calibrate how hard to push you vs. protect you. Write freely.
        </p>

        {profile.deep_dream.length > 0 && profile.deep_dream.length < 20 && (
          <p style={{ color: 'var(--danger)', fontSize: 13, textAlign: 'center', marginTop: 8 }}>
            Tell us a bit more — at least 20 characters.
          </p>
        )}
      </div>

      <style jsx>{`
        .step-content { max-width: 640px; display: flex; justify-content: center; }
        .dream-layout {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 40px 0;
        }
        .dream-subtitle {
          font-size: 18px;
          color: var(--text-dim);
          font-style: italic;
          line-height: 1.7;
          margin-bottom: 32px;
          max-width: 500px;
        }
        .dream-textarea {
          width: 100%;
          max-width: 560px;
          font-size: 16px;
          line-height: 1.6;
          resize: vertical;
          min-height: 120px;
        }
        .dream-footnote {
          font-size: 13px;
          color: var(--iron);
          margin-top: 16px;
        }
      `}</style>
    </div>
  );
}
