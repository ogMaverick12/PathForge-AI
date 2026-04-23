// ============================================================
// PATHFORGE AI — ZUSTAND STATE STORE
// ============================================================

import { create } from 'zustand';
import {
  StudentProfile,
  ForgeReport,
  AcademicInput,
  ConstraintInput,
  GoalInput,
  SportsInput,
  ExtracurricularInput,
} from '@/lib/types';

interface ForgeState {
  // Wizard step
  currentStep: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  // Profile inputs
  academic: Partial<AcademicInput>;
  setAcademic: (data: Partial<AcademicInput>) => void;

  constraints: Partial<ConstraintInput>;
  setConstraints: (data: Partial<ConstraintInput>) => void;

  goals: Partial<GoalInput>;
  setGoals: (data: Partial<GoalInput>) => void;

  sports: Partial<SportsInput>;
  setSports: (data: Partial<SportsInput>) => void;

  extracurricular: Partial<ExtracurricularInput>;
  setExtracurricular: (data: Partial<ExtracurricularInput>) => void;

  // Full report
  report: ForgeReport | null;
  setReport: (report: ForgeReport) => void;

  // Status
  isAnalyzing: boolean;
  setIsAnalyzing: (v: boolean) => void;

  // Reset
  reset: () => void;
}

const DEFAULT_ACADEMIC: Partial<AcademicInput> = {
  current_class: 11,
  performance: '75_85',
  study_hours: 4,
  subject_strengths: [],
  subject_weaknesses: [],
};

const DEFAULT_CONSTRAINTS: Partial<ConstraintInput> = {
  budget: 'medium',
  location_preference: 'india',
  stress_tolerance: 'medium',
  risk_appetite: 'balanced',
};

const DEFAULT_GOALS: Partial<GoalInput> = {
  primary_goal: '',
  dream_job: '',
  goal_motivation: 'passion',
  commitment_level: 'interested',
  timeline_expectation: '3-5',
};

const DEFAULT_SPORTS: Partial<SportsInput> = {
  applicable: false,
};

const DEFAULT_EXTRACURRICULAR: Partial<ExtracurricularInput> = {
  achievements: [],
  olympiads: [],
  leadership_roles: [],
  financial_need: 'moderate',
  has_published_research: false,
  community_service: false,
  sports_achievements: [],
};

export const useForgeStore = create<ForgeState>((set) => ({
  currentStep: 0,
  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, 6) })),
  prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 0) })),

  academic: { ...DEFAULT_ACADEMIC },
  setAcademic: (data) =>
    set((s) => ({ academic: { ...s.academic, ...data } })),

  constraints: { ...DEFAULT_CONSTRAINTS },
  setConstraints: (data) =>
    set((s) => ({ constraints: { ...s.constraints, ...data } })),

  goals: { ...DEFAULT_GOALS },
  setGoals: (data) =>
    set((s) => ({ goals: { ...s.goals, ...data } })),

  sports: { ...DEFAULT_SPORTS },
  setSports: (data) =>
    set((s) => ({ sports: { ...s.sports, ...data } })),

  extracurricular: { ...DEFAULT_EXTRACURRICULAR },
  setExtracurricular: (data) =>
    set((s) => ({ extracurricular: { ...s.extracurricular, ...data } })),

  report: null,
  setReport: (report) => set({ report }),

  isAnalyzing: false,
  setIsAnalyzing: (v) => set({ isAnalyzing: v }),

  reset: () =>
    set({
      currentStep: 0,
      academic: { ...DEFAULT_ACADEMIC },
      constraints: { ...DEFAULT_CONSTRAINTS },
      goals: { ...DEFAULT_GOALS },
      sports: { ...DEFAULT_SPORTS },
      extracurricular: { ...DEFAULT_EXTRACURRICULAR },
      report: null,
      isAnalyzing: false,
    }),
}));

// ─── Profile Builder ───────────────────────────────────────

export function buildProfile(store: ForgeState): StudentProfile {
  return {
    academic: {
      current_class: store.academic.current_class ?? 11,
      performance: store.academic.performance ?? '75_85',
      study_hours: store.academic.study_hours ?? 4,
      subject_strengths: store.academic.subject_strengths ?? [],
      subject_weaknesses: store.academic.subject_weaknesses ?? [],
    },
    constraints: {
      budget: store.constraints.budget ?? 'medium',
      budget_inr_lakhs: store.constraints.budget_inr_lakhs,
      location_preference: store.constraints.location_preference ?? 'india',
      stress_tolerance: store.constraints.stress_tolerance ?? 'medium',
      risk_appetite: store.constraints.risk_appetite ?? 'balanced',
    },
    goals: {
      primary_goal: store.goals.primary_goal ?? '',
      secondary_goal: store.goals.secondary_goal,
      dream_job: store.goals.dream_job ?? '',
      dream_job_normalized: store.goals.dream_job_normalized,
      goal_motivation: store.goals.goal_motivation ?? 'passion',
      commitment_level: store.goals.commitment_level ?? 'interested',
      timeline_expectation: store.goals.timeline_expectation ?? '3-5',
    },
    sports: {
      applicable: store.sports.applicable ?? false,
      sport_type: store.sports.sport_type,
      current_level: store.sports.current_level,
      years_training: store.sports.years_training,
      practice_hours_per_day: store.sports.practice_hours_per_day,
      has_coaching: store.sports.has_coaching,
      competition_exposure: store.sports.competition_exposure,
      fitness_level: store.sports.fitness_level,
    },
  };
}
