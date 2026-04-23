// ============================================================
// PATHFORGE AI — DECISION ENGINE
// ============================================================

import { Career, StudentProfile, ScoredPath, Institution } from './types';
import { CAREER_DATABASE } from './career-database';

// ─── SCORE NORMALIZERS ────────────────────────────────────────

function clamp(value: number, min = 0, max = 1): number {
  return Math.max(min, Math.min(max, value));
}

const PERFORMANCE_MAP: Record<string, number> = {
  below_60: 0.45,
  '60_75': 0.65,
  '75_85': 0.78,
  '85_95': 0.90,
  '95_plus': 0.97,
};

const MOTIVATION_MAP: Record<string, number> = {
  passion: 1.0,
  money: 0.8,
  prestige: 0.75,
  family: 0.6,
  unsure: 0.4,
};

const COMMITMENT_MAP: Record<string, number> = {
  fully_committed: 1.0,
  interested: 0.65,
  casual: 0.35,
};

const STRESS_TOLERANCE_MAP: Record<string, number> = {
  high: 1.0,
  medium: 0.65,
  low: 0.35,
};

const RISK_APPETITE_MAP: Record<string, number> = {
  aggressive: 1.0,
  balanced: 0.6,
  safe: 0.25,
};

// ─── ACADEMIC PROBABILITY MODEL ──────────────────────────────

function computeAcademicProbability(
  profile: StudentProfile,
  career: Career
): number {
  const marks = PERFORMANCE_MAP[profile.academic.performance] ?? 0.5;
  const study = profile.academic.study_hours;
  const difficulty = career.difficulty;

  // Required study hours scales with difficulty
  const required_hours = 2 + (difficulty - 1) * 0.5; // 2h for easy, 6.5h for difficulty 10
  const study_factor = clamp(study / required_hours);
  const difficulty_penalty = 1 - career.difficulty / 10;

  const raw =
    marks * 0.50 +
    study_factor * 0.30 +
    difficulty_penalty * 0.20;

  return clamp(raw);
}

// ─── SPORTS PROBABILITY MODEL ────────────────────────────────

function computeSportsProbability(profile: StudentProfile, career: Career): number {
  if (!profile.sports.applicable || career.domain !== 'sports') {
    return computeAcademicProbability(profile, career);
  }

  const levelMap: Record<string, number> = {
    beginner: 0.1,
    district: 0.3,
    state: 0.55,
    national: 0.80,
    international: 0.95,
  };

  const level = levelMap[profile.sports.current_level ?? 'beginner'];
  const practice = clamp((profile.sports.practice_hours_per_day ?? 1) / 6);
  const coaching_bonus = profile.sports.has_coaching ? 0.10 : 0;
  const competition = clamp((profile.sports.competition_exposure ?? 0) / 5) * 0.15;
  const fitness = clamp((profile.sports.fitness_level ?? 5) / 10) * 0.05;

  const raw = level * 0.40 + practice * 0.30 + coaching_bonus + competition + fitness;
  return clamp(raw);
}

// ─── GOAL ALIGNMENT SCORE ────────────────────────────────────

function computeGoalAlignment(profile: StudentProfile): number {
  const motivation = MOTIVATION_MAP[profile.goals.goal_motivation] ?? 0.5;
  const commitment = COMMITMENT_MAP[profile.goals.commitment_level] ?? 0.5;
  return clamp(motivation * 0.50 + commitment * 0.50);
}

// ─── STRESS SCORE ────────────────────────────────────────────

function computeStressScore(profile: StudentProfile, career: Career): number {
  const tolerance = STRESS_TOLERANCE_MAP[profile.constraints.stress_tolerance] ?? 0.65;
  const career_stress = career.stress_level / 10;
  // Higher tolerance + lower career stress = better score
  const match = 1 - Math.abs(tolerance - (1 - career_stress));
  return clamp(match);
}

// ─── ROI SCORE NORMALIZER ─────────────────────────────────────

function normalizeROI(career: Career): number {
  return clamp(career.roi_score / 10);
}

// ─── FINAL SCORE ─────────────────────────────────────────────

export function computeFinalScore(
  profile: StudentProfile,
  career: Career
): {
  final: number;
  probability: number;
  roi: number;
  stress: number;
  goal_alignment: number;
} {
  const probability = profile.sports.applicable && career.domain === 'sports'
    ? computeSportsProbability(profile, career)
    : computeAcademicProbability(profile, career);

  const roi = normalizeROI(career);
  const stress = computeStressScore(profile, career);
  const goal_alignment = computeGoalAlignment(profile);

  const final = clamp(
    0.30 * probability +
    0.20 * roi +
    0.15 * stress +
    0.35 * goal_alignment
  );

  return { final, probability, roi, stress, goal_alignment };
}

// ─── BUDGET FILTER ──────────────────────────────────────────

function isBudgetCompatible(profile: StudentProfile, career: Career): boolean {
  const budgetLimitInr = {
    low: 10,
    medium: 40,
    high: 200,
  }[profile.constraints.budget];

  const minCost = career.cost_range_inr[0];
  return minCost <= budgetLimitInr;
}

// ─── INSTITUTION CATEGORIZER ─────────────────────────────────

function categorizeInstitutions(
  institutions: Institution[],
  probability: number
): { dream: Institution[]; target: Institution[]; safe: Institution[] } {
  const sorted = [...institutions].sort(
    (a, b) => (a.acceptance_rate ?? 50) - (b.acceptance_rate ?? 50)
  );

  const dream = sorted.filter(i => (i.acceptance_rate ?? 50) <= 3);
  const target = sorted.filter(i => {
    const rate = i.acceptance_rate ?? 50;
    return rate > 3 && rate <= 20;
  });
  const safe = sorted.filter(i => (i.acceptance_rate ?? 50) > 20);

  return { dream, target, safe };
}

// ─── PATH SCORER ─────────────────────────────────────────────

function scoreCareerPath(
  profile: StudentProfile,
  career: Career,
  pathType: 'safe' | 'balanced' | 'aggressive'
): ScoredPath {
  const scores = computeFinalScore(profile, career);
  const pathVariant = career.paths[pathType];

  // Risk appetite adjustment
  const riskBonus = {
    safe: pathType === 'safe' ? 0.05 : 0,
    balanced: pathType === 'balanced' ? 0.03 : 0,
    aggressive: pathType === 'aggressive' ? 0.05 : 0,
  }[profile.constraints.risk_appetite] ?? 0;

  const adjustedFinal = clamp(scores.final + riskBonus);
  const probability_percent = Math.round(scores.probability * 100);

  // Categorize institutions
  const allInstitutions = [
    ...career.institutions_india,
    ...career.institutions_abroad,
  ];
  const categorized = categorizeInstitutions(allInstitutions, scores.probability);

  return {
    type: pathType,
    career,
    path_variant: pathVariant,
    scores: { ...scores, final: adjustedFinal },
    probability_percent,
    institutions_categorized: categorized,
  };
}

// ─── MAIN ENGINE ─────────────────────────────────────────────

export function runDecisionEngine(
  profile: StudentProfile,
  primaryCareer: Career
): ScoredPath[] {
  const safe = scoreCareerPath(profile, primaryCareer, 'safe');
  const balanced = scoreCareerPath(profile, primaryCareer, 'balanced');
  const aggressive = scoreCareerPath(profile, primaryCareer, 'aggressive');

  return [safe, balanced, aggressive].sort((a, b) => b.scores.final - a.scores.final);
}

// ─── GOAL FIT SCORE ──────────────────────────────────────────

export function computeGoalFitScore(
  profile: StudentProfile,
  primaryCareer: Career
): number {
  const scores = computeFinalScore(profile, primaryCareer);
  const budgetFit = isBudgetCompatible(profile, primaryCareer) ? 1 : 0.5;
  const fit = scores.final * 0.70 + budgetFit * 0.30;
  return Math.round(clamp(fit) * 100);
}

// ─── BACKUP CAREER FINDER ────────────────────────────────────

export function findBackupCareer(
  profile: StudentProfile,
  primaryCareer: Career
): Career | undefined {
  const alternatives = primaryCareer.alternatives
    .map(id => CAREER_DATABASE.find(c => c.id === id))
    .filter((c): c is Career => !!c && isBudgetCompatible(profile, c));

  if (alternatives.length === 0) return undefined;

  // Score and pick the best backup
  return alternatives.sort((a, b) => {
    const sa = computeFinalScore(profile, a).final;
    const sb = computeFinalScore(profile, b).final;
    return sb - sa;
  })[0];
}
