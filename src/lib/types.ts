// ============================================================
// PATHFORGE AI — CORE TYPE DEFINITIONS
// ============================================================

export type Domain =
  | 'tech_ai'
  | 'medical'
  | 'sports'
  | 'arts_creative'
  | 'commerce_business'
  | 'government_law'
  | 'emerging_hybrid';

export type MotivationType = 'passion' | 'money' | 'prestige' | 'family' | 'unsure';
export type CommitmentLevel = 'casual' | 'interested' | 'fully_committed';
export type TimelineExpectation = '0-2' | '3-5' | '5+';
export type StressTolerance = 'low' | 'medium' | 'high';
export type RiskAppetite = 'safe' | 'balanced' | 'aggressive';
export type Budget = 'low' | 'medium' | 'high';
export type LocationPreference = 'india' | 'abroad' | 'both';
export type SportLevel = 'beginner' | 'district' | 'state' | 'national' | 'international';
export type AcademicPerfomance = 'below_60' | '60_75' | '75_85' | '85_95' | '95_plus';

export interface Exam {
  name: string;
  difficulty: number; // 1-10
  attempts_per_year: number;
  eligibility: string;
}

export interface Institution {
  name: string;
  location: string;
  rank?: number; // QS or NIRF rank
  type: 'government' | 'private' | 'deemed' | 'international';
  annual_cost_inr?: number; // in lakhs
  annual_cost_usd?: number; // in thousands
  acceptance_rate?: number; // percentage
}

export interface PathVariant {
  label: string;
  description: string;
  target_exams: string[];
  institutions: Institution[];
  timeline_years: number;
  cost_inr_lakhs: number;
  expected_salary_lpa?: number;
  roi_score: number;
}

export interface Career {
  id: string;
  name: string;
  domain: Domain;
  difficulty: number;         // 1-10
  stress_level: number;       // 1-10
  cost_range_inr: [number, number]; // lakhs
  cost_range_usd: [number, number]; // thousands
  roi_score: number;          // 1-10
  years_to_establish: number;
  required_skills: string[];
  required_exams: Exam[];
  institutions_india: Institution[];
  institutions_abroad: Institution[];
  paths: {
    safe: PathVariant;
    balanced: PathVariant;
    aggressive: PathVariant;
  };
  alternatives: string[];
  sports_compatible: boolean;
  description: string;
  tags: string[];
}

// ─── STUDENT INPUT TYPES ─────────────────────────────────────

export interface AcademicInput {
  current_class: 9 | 10 | 11 | 12;
  performance: AcademicPerfomance;
  study_hours: number; // per day
  subject_strengths: string[];
  subject_weaknesses: string[];
}

export interface ConstraintInput {
  budget: Budget;
  budget_inr_lakhs?: number;
  location_preference: LocationPreference;
  stress_tolerance: StressTolerance;
  risk_appetite: RiskAppetite;
}

export interface GoalInput {
  primary_goal: string;
  secondary_goal?: string;
  dream_job: string;
  dream_job_normalized?: string;
  goal_motivation: MotivationType;
  commitment_level: CommitmentLevel;
  timeline_expectation: TimelineExpectation;
}

export interface SportsInput {
  applicable: boolean;
  sport_type?: string;
  current_level?: SportLevel;
  years_training?: number;
  practice_hours_per_day?: number;
  has_coaching?: boolean;
  competition_exposure?: number; // 0-5
  fitness_level?: number; // 1-10
}

export interface StudentProfile {
  academic: AcademicInput;
  constraints: ConstraintInput;
  goals: GoalInput;
  sports: SportsInput;
}

// ─── ENGINE OUTPUT TYPES ──────────────────────────────────────

export interface ScoredPath {
  type: 'safe' | 'balanced' | 'aggressive';
  career: Career;
  path_variant: PathVariant;
  scores: {
    final: number;
    probability: number;
    roi: number;
    stress: number;
    goal_alignment: number;
  };
  probability_percent: number;
  institutions_categorized: {
    dream: Institution[];
    target: Institution[];
    safe: Institution[];
  };
}

export interface RealityWarning {
  type: 'effort_mismatch' | 'budget_mismatch' | 'timeline_mismatch' | 'skill_gap' | 'risk_warning' | 'positive_signal';
  severity: 'critical' | 'moderate' | 'info';
  title: string;
  message: string;
  suggestion?: string;
}

export interface RoadmapPhase {
  label: string;
  duration: string;
  milestones: string[];
  skills_to_learn: string[];
  exams?: string[];
  decision_checkpoints?: string[];
}

export interface ForgeReport {
  student: StudentProfile;
  primary_career: Career;
  backup_career?: Career;
  paths: ScoredPath[];
  goal_fit_score: number; // 0-100
  reality_warnings: RealityWarning[];
  roadmap: RoadmapPhase[];
  scholarship_report?: ScholarshipReport;
  generated_at: string;
}

// ─── EXTRACURRICULAR / PROFILE INPUTS ─────────────────────────

export type FinancialNeed = 'none' | 'low' | 'moderate' | 'high' | 'critical';

export interface ExtracurricularInput {
  achievements: string[];         // e.g. 'Science Olympiad Gold'
  olympiads: string[];            // specific olympiads
  leadership_roles: string[];     // e.g. 'School Head Boy'
  financial_need: FinancialNeed;
  has_published_research: boolean;
  community_service: boolean;
  sports_achievements: string[];  // separate from career sports
}

// ─── SCHOLARSHIP TYPES ────────────────────────────────────────

export type ScholarshipCoverage = 'full' | 'partial_75' | 'partial_50' | 'partial_25' | 'stipend_only';
export type ScholarshipTarget = 'stem' | 'medical' | 'sports' | 'arts' | 'law' | 'commerce' | 'general' | 'research';

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  country: string;
  region: 'india' | 'usa' | 'uk' | 'europe' | 'australia' | 'global';
  eligibility: {
    min_performance: AcademicPerfomance;
    max_family_income_lpa?: number;
    target_fields: ScholarshipTarget[];
    country_restriction?: string;
    class_restriction?: (9 | 10 | 11 | 12)[];
    requires_entrance_exam: boolean;
    requires_research: boolean;
    requires_community_service: boolean;
    gender_specific?: 'male' | 'female';
  };
  coverage: ScholarshipCoverage;
  coverage_details: string;
  amount_inr_lakhs?: number;
  amount_usd_thousands?: number;
  difficulty: number;             // 1-10
  acceptance_rate_percent: number; // approximate
  deadline_month: string;         // e.g. 'March', 'October'
  required_documents: string[];
  description: string;
  url?: string;
  tags: string[];
}

export interface ScholarshipMatch {
  scholarship: Scholarship;
  match_score: number;            // 0-100
  academic_fit: number;           // 0-1
  financial_need_fit: number;     // 0-1
  profile_strength: number;       // 0-1
  goal_alignment: number;         // 0-1
  competition_level: number;      // 0-1 (higher = less competition = better)
  tier: 'high_chance' | 'moderate_chance' | 'reach';
  effort_required: 'low' | 'medium' | 'high' | 'extreme';
  notes: string[];
}

export interface ScholarshipStrategy {
  apply_now: ScholarshipMatch[];       // ready to apply
  prepare_for: ScholarshipMatch[];     // 1-2 years prep needed
  backup_funding: ScholarshipMatch[];  // partial / easier
}

export interface FinancialGapAnalysis {
  total_estimated_cost_inr: number;    // in lakhs
  total_scholarship_coverage_inr: number;
  remaining_gap_inr: number;
  coverage_percentage: number;
  suggestions: string[];
}

export interface ScholarshipRoadmap {
  phase_1_profile_building: string[];
  phase_2_preparation: string[];
  phase_3_execution: string[];
}

export interface ScholarshipRealityWarning {
  type: 'academic_gap' | 'profile_weak' | 'funding_unlikely' | 'positive' | 'deadline_warning';
  severity: 'critical' | 'moderate' | 'info';
  title: string;
  message: string;
  suggestion?: string;
}

export interface ScholarshipReport {
  matches: ScholarshipMatch[];
  strategy: ScholarshipStrategy;
  financial_gap: FinancialGapAnalysis;
  roadmap: ScholarshipRoadmap;
  reality_warnings: ScholarshipRealityWarning[];
}
