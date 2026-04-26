'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useForgeStore } from '@/stores/forge-store';
import { generateResults } from '@/lib/engines';
import StepProfile from '@/components/wizard/StepProfile';
import StepAcademics from '@/components/wizard/StepAcademics';
import StepGoals from '@/components/wizard/StepGoals';
import StepConstraints from '@/components/wizard/StepConstraints';
import StepFinances from '@/components/wizard/StepFinances';
import StepDream from '@/components/wizard/StepDream';

const STEP_LABELS = ["PROFILE", "ACADEMICS", "GOALS", "CONSTRAINTS", "FINANCES", "DREAM"];
const FORGE_MESSAGES = [
  "Interpreting your dream job...",
  "Running probability models...",
  "Matching scholarships...",
  "Detecting effort mismatches...",
  "Building your Skill Tree...",
  "Forging your paths..."
];

export default function ForgePage() {
  const router = useRouter();
  const { profile, setResults } = useForgeStore();
  const [step, setStep] = useState(0);
  const [isForging, setIsForging] = useState(false);
  const [forgeMessage, setForgeMessage] = useState(FORGE_MESSAGES[0]);
  const [forgeProgress, setForgeProgress] = useState(0);
  const [showError, setShowError] = useState(false);

  const validationError = useMemo(() => {
    switch (step) {
      case 0: 
        if (profile.name.length < 2) return "Please enter your full name.";
        if (profile.class_level === '') return "Please select your class.";
        if (profile.stream === '') return "Please select your stream.";
        if (profile.city.length < 1) return "Please enter your city.";
        return null;
      case 1: 
        if (!profile.marks || profile.marks <= 0) return "Please enter your marks.";
        if (profile.board === '') return "Please select your board.";
        return null;
      case 2: 
        if (profile.dream_job.length < 2) return "Please enter a dream job.";
        if ((profile.priorities?.length || 0) < 1) return "Please select at least one priority.";
        return null;
      case 3: 
        if (profile.abroad_open === 'maybe') return "Please decide if you are open to studying abroad.";
        return null;
      case 4: 
        if (profile.budget === '') return "Please select a budget range.";
        return null;
      case 5: 
        if (profile.deep_dream.length < 20) return "Please describe your deep dream (min 20 characters).";
        return null;
      default: return null;
    }
  }, [step, profile]);

  const handleForge = useCallback(() => {
    setIsForging(true);
    setForgeProgress(0);
    setForgeMessage(FORGE_MESSAGES[0]);

    // Animate forge messages
    FORGE_MESSAGES.forEach((msg, i) => {
      setTimeout(() => {
        setForgeMessage(msg);
        setForgeProgress(((i + 1) / FORGE_MESSAGES.length) * 100);
      }, i * 420);
    });

    // After animation, generate results and navigate
    setTimeout(() => {
      const results = generateResults(profile);
      setResults(results);
      router.push('/forge/results');
    }, 2500);
  }, [profile, setResults, router]);

  const handleNext = () => {
    if (validationError) {
      setShowError(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowError(false);
      if (step < 5) setStep(step + 1);
      else handleForge();
    }
  };

  const handleBack = () => {
    setShowError(false);
    if (step > 0) setStep(step - 1);
  };

  if (isForging) {
    return (
      <div className="forge-screen">
        <div className="forge-animation">
          <div className="forge-icon" style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <img src="/icons/PathForgeAI.ico" alt="PathForge AI" style={{ width: 64, height: 64, objectFit: 'contain' }} />
          </div>
          <p className="forge-status">{forgeMessage}</p>
          <div className="forge-bar-track">
            <div className="forge-bar-fill" style={{ width: `${forgeProgress}%` }} />
          </div>
        </div>

        <style jsx>{`
          .forge-screen {
            min-height: 100vh;
            background: var(--bg);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .forge-animation {
            text-align: center;
            max-width: 400px;
          }
          .forge-icon {
            font-size: 80px;
            animation: pulse 1s ease-in-out infinite alternate;
          }
          @keyframes pulse {
            from { transform: scale(1); filter: brightness(1); }
            to { transform: scale(1.15); filter: brightness(1.3); }
          }
          .forge-status {
            color: var(--ember);
            font-family: var(--font-mono);
            font-size: 14px;
            margin: 24px 0;
            min-height: 20px;
          }
          .forge-bar-track {
            height: 4px;
            background: var(--border);
            border-radius: 2px;
            overflow: hidden;
            width: 300px;
            margin: 0 auto;
          }
          .forge-bar-fill {
            height: 100%;
            background: var(--ember);
            transition: width 400ms ease;
          }
        `}</style>
      </div>
    );
  }

  const steps = [<StepProfile key={0} />, <StepAcademics key={1} />, <StepGoals key={2} />, <StepConstraints key={3} />, <StepFinances key={4} />, <StepDream key={5} />];

  return (
    <div className="wizard-page">
      {/* Progress bar */}
      <div className="progress-bar">
        <div className="no-print" style={{ padding: '0 16px', display: 'flex', alignItems: 'center', borderRight: '1px solid var(--border)' }}>
          <img src="/icons/PathForgeAI.ico" alt="PathForge AI" style={{ width: 24, height: 24, objectFit: 'contain' }} />
        </div>
        {STEP_LABELS.map((label, i) => (
          <div key={label} className={`progress-segment ${i < step ? 'past' : i === step ? 'current' : 'future'}`}>
            <div className="segment-fill" />
            <span className="segment-label">{label}</span>
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="wizard-body">
        {steps[step]}
      </div>

      {/* Bottom bar */}
      <div className="wizard-footer" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        {showError && validationError && (
          <div style={{ color: 'var(--danger)', fontSize: 13, marginBottom: 12, textAlign: 'right' }}>
            ⚠️ {validationError}
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <button className="btn-ghost" onClick={handleBack} disabled={step === 0} style={{ opacity: step === 0 ? 0.3 : 1 }}>
            ← Back
          </button>
          <button className="btn-primary" onClick={handleNext}>
            {step === 5 ? '⚡ FORGE MY PATH →' : 'Next →'}
          </button>
        </div>
      </div>

      <style jsx>{`
        .wizard-page {
          min-height: 100vh;
          background: var(--bg);
          display: flex;
          flex-direction: column;
        }

        .progress-bar {
          position: sticky;
          top: 0;
          z-index: 100;
          display: flex;
          background: var(--surface);
          border-bottom: 1px solid var(--border);
        }

        .progress-segment {
          flex: 1;
          padding: 12px 0;
          position: relative;
          text-align: center;
        }

        .segment-fill {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--border);
          transition: background 300ms;
        }

        .progress-segment.past .segment-fill { background: var(--ember-dim); }
        .progress-segment.current .segment-fill { background: var(--ember); }

        .segment-label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          color: var(--iron);
          transition: color 300ms;
        }

        .progress-segment.current .segment-label { color: var(--ember); }
        .progress-segment.past .segment-label { color: var(--ember-dim); }

        .wizard-body {
          flex: 1;
          display: flex;
          padding: 60px 24px;
          max-width: 800px;
          margin: 0 auto;
          width: 100%;
        }

        .wizard-footer {
          position: sticky;
          bottom: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 32px;
          background: var(--surface);
          border-top: 1px solid var(--border);
        }

        @media (max-width: 768px) {
          .segment-label { font-size: 8px; }
          .wizard-body { padding: 32px 16px; }
          .wizard-footer { padding: 12px 16px; }
        }
      `}</style>
    </div>
  );
}
