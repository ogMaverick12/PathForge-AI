// ============================================================
// PATHFORGE AI — SCHOLARSHIP INTELLIGENCE ENGINE
// Matching · Strategy · Financial Gap · Reality Check
// ============================================================

import {
  StudentProfile,
  ExtracurricularInput,
  Career,
  Scholarship,
  ScholarshipMatch,
  ScholarshipStrategy,
  FinancialGapAnalysis,
  ScholarshipRoadmap,
  ScholarshipRealityWarning,
  ScholarshipReport,
  ScholarshipCoverage,
} from './types';
import { SCHOLARSHIP_DATABASE, DOMAIN_TO_SCHOLARSHIP_TARGET } from './scholarship-database';

// ─── CONSTANTS ───────────────────────────────────────────────

const PERFORMANCE_NUMERIC: Record<string, number> = {
  below_60: 0.3,
  '60_75': 0.55,
  '75_85': 0.72,
  '85_95': 0.88,
  '95_plus': 0.97,
};

const PERFORMANCE_RANK: Record<string, number> = {
  below_60: 0,
  '60_75': 1,
  '75_85': 2,
  '85_95': 3,
  '95_plus': 4,
};

const NEED_SCORE: Record<string, number> = {
  none: 0.1,
  low: 0.3,
  moderate: 0.55,
  high: 0.8,
  critical: 1.0,
};

const BUDGET_TO_INCOME: Record<string, number> = {
  low: 4,
  medium: 12,
  high: 50,
};

const COVERAGE_PERCENTAGE: Record<ScholarshipCoverage, number> = {
  full: 1.0,
  partial_75: 0.75,
  partial_50: 0.5,
  partial_25: 0.25,
  stipend_only: 0.1,
};

function clamp(v: number, min = 0, max = 1): number {
  return Math.max(min, Math.min(max, v));
}

// ─── ELIGIBILITY FILTER ──────────────────────────────────────

function isEligible(
  scholarship: Scholarship,
  profile: StudentProfile,
  career: Career
): boolean {
  const perfRank = PERFORMANCE_RANK[profile.academic.performance] ?? 2;
  const minPerfRank = PERFORMANCE_RANK[scholarship.eligibility.min_performance] ?? 0;

  // Academic minimum
  if (perfRank < minPerfRank) return false;

  // Class restriction
  if (scholarship.eligibility.class_restriction) {
    if (!scholarship.eligibility.class_restriction.includes(profile.academic.current_class)) {
      return false;
    }
  }

  // Location filter — skip abroad scholarships if student is India-only
  if (profile.constraints.location_preference === 'india' && scholarship.region !== 'india') {
    return false;
  }

  // Income filter (approximate)
  if (scholarship.eligibility.max_family_income_lpa) {
    const estimatedIncome = BUDGET_TO_INCOME[profile.constraints.budget] ?? 12;
    if (estimatedIncome > scholarship.eligibility.max_family_income_lpa * 1.5) {
      return false; // generous margin
    }
  }

  return true;
}

// ─── SCORING ENGINE ──────────────────────────────────────────

function computeAcademicFit(
  scholarship: Scholarship,
  profile: StudentProfile
): number {
  const perfScore = PERFORMANCE_NUMERIC[profile.academic.performance] ?? 0.5;
  const minRequired = PERFORMANCE_NUMERIC[scholarship.eligibility.min_performance] ?? 0.3;
  
  // How much above the minimum are you?
  const surplus = perfScore - minRequired;
  if (surplus < 0) return 0;
  return clamp(0.5 + surplus * 2); // baseline 0.5 if you meet minimum, up to 1.0
}

function computeFinancialNeedFit(
  scholarship: Scholarship,
  profile: StudentProfile,
  extras: ExtracurricularInput
): number {
  const needScore = NEED_SCORE[extras.financial_need] ?? 0.3;
  
  // If scholarship is need-based and student has high need → strong fit
  if (scholarship.eligibility.max_family_income_lpa) {
    return clamp(needScore * 1.2);
  }
  
  // Merit-only scholarships — need doesn't matter much
  return 0.5 + needScore * 0.3;
}

function computeProfileStrength(
  extras: ExtracurricularInput
): number {
  let score = 0.2; // base

  // Achievements
  score += Math.min(extras.achievements.length * 0.08, 0.24);
  
  // Olympiads — very impactful
  score += Math.min(extras.olympiads.length * 0.12, 0.24);
  
  // Leadership — matters for top scholarships
  score += Math.min(extras.leadership_roles.length * 0.08, 0.16);
  
  // Research
  if (extras.has_published_research) score += 0.15;
  
  // Community service
  if (extras.community_service) score += 0.08;
  
  // Sports achievements
  score += Math.min(extras.sports_achievements.length * 0.06, 0.12);

  return clamp(score);
}

function computeGoalAlignment(
  scholarship: Scholarship,
  career: Career
): number {
  const careerTargets = DOMAIN_TO_SCHOLARSHIP_TARGET[career.domain] ?? ['general'];
  const scholarshipTargets = scholarship.eligibility.target_fields;
  
  // Check overlap
  const overlap = careerTargets.filter(t => scholarshipTargets.includes(t as any));
  if (overlap.length === 0) return 0.2; // generic match
  return clamp(0.5 + (overlap.length / Math.max(careerTargets.length, 1)) * 0.5);
}

function computeCompetitionLevel(scholarship: Scholarship): number {
  // Higher acceptance_rate = less competition = higher score for student
  const rate = scholarship.acceptance_rate_percent;
  if (rate >= 30) return 0.9;
  if (rate >= 15) return 0.7;
  if (rate >= 8) return 0.5;
  if (rate >= 3) return 0.3;
  return 0.15;
}

function scoreScholarship(
  scholarship: Scholarship,
  profile: StudentProfile,
  career: Career,
  extras: ExtracurricularInput
): ScholarshipMatch {
  const academic_fit = computeAcademicFit(scholarship, profile);
  const financial_need_fit = computeFinancialNeedFit(scholarship, profile, extras);
  const profile_strength = computeProfileStrength(extras);
  const goal_alignment = computeGoalAlignment(scholarship, career);
  const competition_level = computeCompetitionLevel(scholarship);

  const match_score = Math.round(clamp(
    academic_fit * 0.30 +
    financial_need_fit * 0.25 +
    profile_strength * 0.20 +
    goal_alignment * 0.15 +
    competition_level * 0.10
  ) * 100);

  // Determine tier
  let tier: ScholarshipMatch['tier'];
  if (match_score >= 65) tier = 'high_chance';
  else if (match_score >= 45) tier = 'moderate_chance';
  else tier = 'reach';

  // Effort required
  let effort_required: ScholarshipMatch['effort_required'];
  if (scholarship.difficulty <= 3) effort_required = 'low';
  else if (scholarship.difficulty <= 6) effort_required = 'medium';
  else if (scholarship.difficulty <= 8) effort_required = 'high';
  else effort_required = 'extreme';

  // Generate notes
  const notes: string[] = [];
  if (academic_fit < 0.5) notes.push('Your academic profile is below the competitive range for this scholarship.');
  if (scholarship.eligibility.requires_research && !extras.has_published_research) {
    notes.push('Research experience required — you currently have none.');
  }
  if (scholarship.eligibility.requires_community_service && !extras.community_service) {
    notes.push('Community service is a key eligibility factor you haven\'t listed.');
  }
  if (competition_level < 0.3) {
    notes.push(`Extremely competitive: ~${scholarship.acceptance_rate_percent}% acceptance rate.`);
  }
  if (match_score >= 70) notes.push('Strong match — prioritize this application.');

  return {
    scholarship,
    match_score,
    academic_fit,
    financial_need_fit,
    profile_strength,
    goal_alignment,
    competition_level,
    tier,
    effort_required,
    notes,
  };
}

// ─── STRATEGY GENERATOR ──────────────────────────────────────

function generateStrategy(matches: ScholarshipMatch[]): ScholarshipStrategy {
  const sorted = [...matches].sort((a, b) => b.match_score - a.match_score);

  const apply_now: ScholarshipMatch[] = [];
  const prepare_for: ScholarshipMatch[] = [];
  const backup_funding: ScholarshipMatch[] = [];

  for (const m of sorted) {
    if (m.tier === 'high_chance' && m.effort_required !== 'extreme') {
      apply_now.push(m);
    } else if (m.tier === 'reach' || m.effort_required === 'extreme') {
      prepare_for.push(m);
    } else if (m.scholarship.coverage === 'partial_25' || m.scholarship.coverage === 'stipend_only') {
      backup_funding.push(m);
    } else {
      // moderate chance, decent coverage
      if (apply_now.length < 5) apply_now.push(m);
      else backup_funding.push(m);
    }
  }

  return {
    apply_now: apply_now.slice(0, 5),
    prepare_for: prepare_for.slice(0, 4),
    backup_funding: backup_funding.slice(0, 4),
  };
}

// ─── FINANCIAL GAP ANALYSIS ──────────────────────────────────

function computeFinancialGap(
  profile: StudentProfile,
  career: Career,
  matches: ScholarshipMatch[]
): FinancialGapAnalysis {
  const total_estimated_cost_inr = (career.cost_range_inr[0] + career.cost_range_inr[1]) / 2;

  // Estimate max scholarship coverage from top 3 matches
  const topMatches = [...matches]
    .sort((a, b) => b.match_score - a.match_score)
    .slice(0, 3);

  let total_scholarship_coverage_inr = 0;
  for (const m of topMatches) {
    const amount = m.scholarship.amount_inr_lakhs ?? 0;
    const coverageFactor = COVERAGE_PERCENTAGE[m.scholarship.coverage];
    // Weight by match probability
    const probability = m.match_score / 100;
    total_scholarship_coverage_inr += amount * coverageFactor * probability;
  }

  // Take the best single scholarship as realistic coverage
  const bestCoverage = topMatches[0]
    ? (topMatches[0].scholarship.amount_inr_lakhs ?? 0) * (topMatches[0].match_score / 100)
    : 0;
  total_scholarship_coverage_inr = Math.max(total_scholarship_coverage_inr * 0.5, bestCoverage);

  const remaining_gap_inr = Math.max(0, total_estimated_cost_inr - total_scholarship_coverage_inr);
  const coverage_percentage = total_estimated_cost_inr > 0
    ? Math.round((total_scholarship_coverage_inr / total_estimated_cost_inr) * 100)
    : 0;

  // Generate suggestions
  const suggestions: string[] = [];
  if (remaining_gap_inr > 20) {
    suggestions.push('Consider education loans: SBI Scholar Loan (up to ₹40L), Avanse Education Loans, or PM Vidyalakshmi scheme.');
  }
  if (remaining_gap_inr > 10) {
    suggestions.push('Apply to multiple scholarships simultaneously — combining 2-3 partial scholarships can cover the gap.');
  }
  if (profile.constraints.location_preference !== 'india') {
    suggestions.push('Germany and Scandinavian countries offer near-zero tuition at public universities.');
    suggestions.push('Consider Teaching Assistantships (TA) or Research Assistantships (RA) that provide stipends + tuition waivers.');
  }
  if (career.domain === 'tech_ai' || career.domain === 'emerging_hybrid') {
    suggestions.push('Tech companies like Google, Microsoft, and Adobe offer India-specific scholarships for CS students.');
  }
  if (remaining_gap_inr > 0 && remaining_gap_inr <= 10) {
    suggestions.push('The remaining gap is manageable with part-time work, paid internships, or small institutional grants.');
  }
  if (remaining_gap_inr === 0) {
    suggestions.push('Your profile has strong scholarship potential — the estimated cost may be fully covered.');
  }

  return {
    total_estimated_cost_inr: Math.round(total_estimated_cost_inr),
    total_scholarship_coverage_inr: Math.round(total_scholarship_coverage_inr * 10) / 10,
    remaining_gap_inr: Math.round(remaining_gap_inr * 10) / 10,
    coverage_percentage: Math.min(coverage_percentage, 100),
    suggestions: suggestions.slice(0, 4),
  };
}

// ─── SCHOLARSHIP ROADMAP ─────────────────────────────────────

function generateScholarshipRoadmap(
  profile: StudentProfile,
  extras: ExtracurricularInput,
  matches: ScholarshipMatch[]
): ScholarshipRoadmap {
  const phase_1: string[] = [];
  const phase_2: string[] = [];
  const phase_3: string[] = [];

  // Phase 1: Profile Building
  if (PERFORMANCE_RANK[profile.academic.performance] < 3) {
    phase_1.push('Improve academic performance to 85%+ — this unlocks the majority of merit scholarships.');
  }
  if (extras.olympiads.length === 0) {
    phase_1.push('Register for at least 1 Olympiad (SOF, HBCSE, or NSO) in the next cycle.');
  }
  if (extras.leadership_roles.length === 0) {
    phase_1.push('Take up a leadership position — school prefect, club president, or event coordinator.');
  }
  if (!extras.community_service) {
    phase_1.push('Start a community service initiative — many top scholarships (Fulbright, Rhodes) require this.');
  }
  if (!extras.has_published_research) {
    phase_1.push('Begin a research project or write a paper — even a school-level publication counts.');
  }
  phase_1.push('Build a running document of all certifications, awards, and achievements.');

  // Phase 2: Preparation
  const needsTests = matches.some(m => m.scholarship.eligibility.requires_entrance_exam);
  if (needsTests) {
    phase_2.push('Start test preparation: IELTS/TOEFL (target: 7.5+/100+), SAT (target: 1450+), GRE (target: 320+).');
  }
  phase_2.push('Write a draft Statement of Purpose (SOP) — get it reviewed by teachers and professionals.');
  phase_2.push('Identify 2-3 recommenders and brief them on your goals. Request strong, personalized Letters of Recommendation.');
  phase_2.push('Create a master spreadsheet: scholarship name, deadline, requirements, documents needed.');
  if (profile.constraints.location_preference !== 'india') {
    phase_2.push('Research university-specific financial aid pages — many offer automatic merit awards.');
  }

  // Phase 3: Execution
  const deadlineMonths = [...new Set(matches.slice(0, 5).map(m => m.scholarship.deadline_month))];
  phase_3.push(`Key deadline months to track: ${deadlineMonths.join(', ') || 'varies by scholarship'}.`);
  phase_3.push('Submit applications at least 1 week before deadlines — late submissions are never reviewed.');
  phase_3.push('Follow up on application status. Keep email confirmations for every submission.');
  phase_3.push('Prepare for scholarship interviews — many top awards have an interview round.');
  phase_3.push('Apply to at least 5 scholarships to maximize probability. One "yes" is all you need.');

  return {
    phase_1_profile_building: phase_1,
    phase_2_preparation: phase_2,
    phase_3_execution: phase_3,
  };
}

// ─── REALITY ENGINE (SCHOLARSHIPS) ───────────────────────────

function generateScholarshipReality(
  profile: StudentProfile,
  extras: ExtracurricularInput,
  matches: ScholarshipMatch[],
  financialGap: FinancialGapAnalysis
): ScholarshipRealityWarning[] {
  const warnings: ScholarshipRealityWarning[] = [];

  // Academic gap
  const perfRank = PERFORMANCE_RANK[profile.academic.performance] ?? 2;
  if (perfRank < 2) {
    warnings.push({
      type: 'academic_gap',
      severity: 'critical',
      title: 'Academic Profile Below Scholarship Threshold',
      message: `Most merit-based scholarships require 75%+ academic performance. Your current band (${profile.academic.performance.replace('_', '-')}%) makes you ineligible for ${matches.filter(m => m.academic_fit < 0.4).length} scholarships in the database.`,
      suggestion: 'Focus on improving grades immediately — even a 10-15% improvement opens up significantly more options.',
    });
  }

  // Weak profile
  const profileScore = computeProfileStrength(extras);
  if (profileScore < 0.35) {
    warnings.push({
      type: 'profile_weak',
      severity: 'critical',
      title: 'Extracurricular Profile is Weak for Competitive Scholarships',
      message: `Top global scholarships (Fulbright, Rhodes, Gates Cambridge) heavily weight leadership, research, and community service. Your current profile score is ${Math.round(profileScore * 100)}/100 — below the competitive threshold of 50+.`,
      suggestion: 'Start building now: 1 Olympiad + 1 leadership role + community service = significant profile improvement in 6 months.',
    });
  } else if (profileScore < 0.55) {
    warnings.push({
      type: 'profile_weak',
      severity: 'moderate',
      title: 'Profile Needs Strengthening for Top-Tier Scholarships',
      message: `Your extracurricular profile (${Math.round(profileScore * 100)}/100) is acceptable for regional scholarships but weak for elite global awards.`,
      suggestion: 'Add 1-2 more achievements: research publication, national competition, or sustained community initiative.',
    });
  }

  // Funding unlikely
  if (financialGap.coverage_percentage < 20 && profile.constraints.budget === 'low') {
    warnings.push({
      type: 'funding_unlikely',
      severity: 'critical',
      title: 'Full Funding Abroad is Currently Unlikely',
      message: `Based on your profile, estimated scholarship coverage is only ${financialGap.coverage_percentage}% of total costs. The remaining gap of ₹${financialGap.remaining_gap_inr}L is substantial for a low-budget profile.`,
      suggestion: 'Consider government colleges in India (near-zero cost) or German public universities (no tuition). Build your profile for 1-2 years before targeting fully-funded programs.',
    });
  }

  // No high-chance matches
  const highChance = matches.filter(m => m.tier === 'high_chance');
  if (highChance.length === 0 && matches.length > 0) {
    warnings.push({
      type: 'funding_unlikely',
      severity: 'moderate',
      title: 'No High-Probability Scholarship Matches Found',
      message: `All ${matches.length} matching scholarships are in the "Moderate" or "Reach" category. This means significant profile improvement is needed before applying.`,
      suggestion: 'Focus on government schemes (PM Vidyalakshmi, CSSS) and institutional aid first. Build towards competitive scholarships over 1-2 years.',
    });
  }

  // Positive signals
  if (highChance.length >= 3) {
    warnings.push({
      type: 'positive',
      severity: 'info',
      title: `✅ ${highChance.length} Strong Scholarship Matches Found`,
      message: `Your profile aligns well with ${highChance.length} scholarships. Combined, these could cover up to ₹${Math.round(highChance.reduce((sum, m) => sum + (m.scholarship.amount_inr_lakhs ?? 0), 0))}L of your education costs.`,
      suggestion: 'Start applications immediately for the highest-match scholarships. Early applications have statistically better outcomes.',
    });
  }

  if (profileScore >= 0.6) {
    warnings.push({
      type: 'positive',
      severity: 'info',
      title: '✅ Strong Extracurricular Profile',
      message: `Your profile score (${Math.round(profileScore * 100)}/100) puts you in a competitive position for merit-based scholarships, especially those valuing all-round development.`,
    });
  }

  if (extras.has_published_research) {
    warnings.push({
      type: 'positive',
      severity: 'info',
      title: '✅ Research Experience Detected',
      message: 'Published research is a significant differentiator. This opens doors to research-focused scholarships like KVPY, Gates Cambridge, and university research fellowships.',
    });
  }

  // Deadline warning
  const currentMonth = new Date().getMonth(); // 0-indexed
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const nearDeadlines = matches.filter(m => {
    const deadlineIdx = monthNames.indexOf(m.scholarship.deadline_month);
    if (deadlineIdx === -1) return false;
    const diff = deadlineIdx - currentMonth;
    return diff >= 0 && diff <= 2;
  });

  if (nearDeadlines.length > 0) {
    warnings.push({
      type: 'deadline_warning',
      severity: 'moderate',
      title: `⏰ ${nearDeadlines.length} Scholarship Deadlines Approaching`,
      message: `${nearDeadlines.map(m => m.scholarship.name).join(', ')} — deadlines within the next 2 months.`,
      suggestion: 'Prioritize these applications immediately. Late submissions are automatically rejected.',
    });
  }

  return warnings;
}

// ─── MAIN ENGINE ─────────────────────────────────────────────

export function runScholarshipEngine(
  profile: StudentProfile,
  career: Career,
  extras: ExtracurricularInput
): ScholarshipReport {
  // 1. Filter eligible scholarships
  const eligible = SCHOLARSHIP_DATABASE.filter(s => isEligible(s, profile, career));

  // 2. Score each scholarship
  const matches = eligible
    .map(s => scoreScholarship(s, profile, career, extras))
    .sort((a, b) => b.match_score - a.match_score);

  // 3. Generate strategy
  const strategy = generateStrategy(matches);

  // 4. Financial gap analysis
  const financial_gap = computeFinancialGap(profile, career, matches);

  // 5. Scholarship roadmap
  const roadmap = generateScholarshipRoadmap(profile, extras, matches);

  // 6. Reality check
  const reality_warnings = generateScholarshipReality(profile, extras, matches, financial_gap);

  return {
    matches,
    strategy,
    financial_gap,
    roadmap,
    reality_warnings,
  };
}

// ─── DEFAULT EXTRACURRICULAR INPUT ───────────────────────────

export const DEFAULT_EXTRACURRICULAR: ExtracurricularInput = {
  achievements: [],
  olympiads: [],
  leadership_roles: [],
  financial_need: 'moderate',
  has_published_research: false,
  community_service: false,
  sports_achievements: [],
};
