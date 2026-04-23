'use client';

import { useRouter } from 'next/navigation';
import { useForgeStore, buildProfile } from '@/stores/forge-store';
import { interpretDreamJob } from '@/lib/dream-job-interpreter';
import { runDecisionEngine, computeGoalFitScore, findBackupCareer } from '@/lib/decision-engine';
import { runRealityEngine } from '@/lib/reality-engine';
import { generateRoadmap } from '@/lib/roadmap-generator';
import { runScholarshipEngine, DEFAULT_EXTRACURRICULAR } from '@/lib/scholarship-engine';
import { ForgeReport, ExtracurricularInput } from '@/lib/types';
import Step1Academic from '@/components/wizard/Step1Academic';
import Step2Constraints from '@/components/wizard/Step2Constraints';
import Step3Goals from '@/components/wizard/Step3Goals';
import Step4DreamJob from '@/components/wizard/Step4DreamJob';
import Step5Sports from '@/components/wizard/Step5Sports';
import Step6Commitment from '@/components/wizard/Step6Commitment';
import Step7Review from '@/components/wizard/Step7Review';

const STEPS = [
  { label: 'Academic', icon: '📚' },
  { label: 'Constraints', icon: '💰' },
  { label: 'Goals', icon: '🎯' },
  { label: 'Dream Job', icon: '💡' },
  { label: 'Sports', icon: '🏆' },
  { label: 'Commitment', icon: '⚡' },
  { label: 'Review', icon: '🔍' },
];

export default function ForgePage() {
  const router = useRouter();
  const store = useForgeStore();
  const { currentStep, nextStep, prevStep, setReport, setIsAnalyzing, isAnalyzing } = store;

  const handleAnalyze = async () => {
    setIsAnalyzing(true);

    // Simulate processing delay for UX
    await new Promise((resolve) => setTimeout(resolve, 2200));

    const profile = buildProfile(store);

    // Interpret dream job
    const interpreted = interpretDreamJob(profile.goals.dream_job);
    const primaryCareer = interpreted.matched_career;

    if (!primaryCareer) {
      setIsAnalyzing(false);
      alert('Could not match your dream job. Please try a different description.');
      return;
    }

    // Run all engines
    const paths = runDecisionEngine(profile, primaryCareer);
    const goalFitScore = computeGoalFitScore(profile, primaryCareer);
    const backupCareer = findBackupCareer(profile, primaryCareer);
    const realityWarnings = runRealityEngine(profile, primaryCareer);
    const roadmap = generateRoadmap(profile, primaryCareer);

    // Build extracurricular input for scholarship engine
    const extras: ExtracurricularInput = {
      achievements: (store.extracurricular.achievements ?? []) as string[],
      olympiads: (store.extracurricular.olympiads ?? []) as string[],
      leadership_roles: (store.extracurricular.leadership_roles ?? []) as string[],
      financial_need: store.extracurricular.financial_need ?? 'moderate',
      has_published_research: store.extracurricular.has_published_research ?? false,
      community_service: store.extracurricular.community_service ?? false,
      sports_achievements: (store.extracurricular.sports_achievements ?? []) as string[],
    };

    // Run scholarship intelligence engine
    const scholarshipReport = runScholarshipEngine(profile, primaryCareer, extras);

    const report: ForgeReport = {
      student: profile,
      primary_career: primaryCareer,
      backup_career: backupCareer,
      paths,
      goal_fit_score: goalFitScore,
      reality_warnings: realityWarnings,
      roadmap,
      scholarship_report: scholarshipReport,
      generated_at: new Date().toISOString(),
    };

    setReport(report);
    setIsAnalyzing(false);
    router.push('/forge/results');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-base)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(108,99,255,0.12) 0%, transparent 60%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Analyzing overlay */}
      {isAnalyzing && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(5,8,16,0.95)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              border: '3px solid transparent',
              borderTopColor: 'var(--primary)',
              borderRightColor: 'var(--accent-cyan)',
              animation: 'spin-slow 1s linear infinite',
            }}
          />
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 24,
                marginBottom: 8,
              }}
            >
              Forging Your Path...
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
              Running decision engine · Scoring probability models · Generating roadmap
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              gap: 8,
              marginTop: 8,
            }}
          >
            {['Analyzing profile', 'Computing scores', 'Generating paths', 'Building roadmap', 'Matching scholarships'].map(
              (task, i) => (
                <div
                  key={task}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 40,
                    background: 'rgba(108,99,255,0.1)',
                    border: '1px solid rgba(108,99,255,0.2)',
                    fontSize: 11,
                    color: 'var(--primary-light)',
                    animation: `fadeInUp 0.4s ease ${i * 0.3}s both`,
                  }}
                >
                  ✦ {task}
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Top Bar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(5,8,16,0.9)',
          borderBottom: '1px solid var(--border)',
          backdropFilter: 'blur(20px)',
          padding: '0 32px',
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: '0 auto',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          {/* Logo */}
          <a
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              textDecoration: 'none',
              color: 'inherit',
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 20 }}>⚡</span>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              PathForge AI
            </span>
          </a>

          {/* Step progress pills */}
          <div style={{ display: 'flex', gap: 4, overflow: 'hidden' }}>
            {STEPS.map((step, i) => (
              <div
                key={step.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '4px 10px',
                  borderRadius: 40,
                  fontSize: 11,
                  fontWeight: 600,
                  transition: 'all 0.3s',
                  background:
                    i === currentStep
                      ? 'rgba(108,99,255,0.2)'
                      : i < currentStep
                      ? 'rgba(34,197,94,0.1)'
                      : 'transparent',
                  color:
                    i === currentStep
                      ? 'var(--primary-light)'
                      : i < currentStep
                      ? 'var(--accent-green)'
                      : 'var(--text-muted)',
                  border:
                    i === currentStep
                      ? '1px solid rgba(108,99,255,0.4)'
                      : i < currentStep
                      ? '1px solid rgba(34,197,94,0.25)'
                      : '1px solid transparent',
                  whiteSpace: 'nowrap',
                }}
              >
                {i < currentStep ? '✓' : step.icon} {step.label}
              </div>
            ))}
          </div>

          {/* Step counter */}
          <div
            style={{ color: 'var(--text-muted)', fontSize: 13, flexShrink: 0 }}
          >
            {currentStep + 1} / {STEPS.length}
          </div>
        </div>

        {/* Progress bar */}
        <div className="progress-bar-track" style={{ height: 2 }}>
          <div
            className="progress-bar-fill"
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </header>

      {/* Main content */}
      <main
        style={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '48px 24px 80px',
        }}
      >
        <div style={{ width: '100%', maxWidth: 720 }}>
          {currentStep === 0 && <Step1Academic onNext={nextStep} />}
          {currentStep === 1 && <Step2Constraints onNext={nextStep} onBack={prevStep} />}
          {currentStep === 2 && <Step3Goals onNext={nextStep} onBack={prevStep} />}
          {currentStep === 3 && <Step4DreamJob onNext={nextStep} onBack={prevStep} />}
          {currentStep === 4 && <Step5Sports onNext={nextStep} onBack={prevStep} />}
          {currentStep === 5 && <Step6Commitment onNext={nextStep} onBack={prevStep} />}
          {currentStep === 6 && (
            <Step7Review
              onBack={prevStep}
              onAnalyze={handleAnalyze}
            />
          )}
        </div>
      </main>
    </div>
  );
}
