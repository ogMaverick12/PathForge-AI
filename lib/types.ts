// ============================================================
// PATHFORGE AI — TYPE DEFINITIONS (v3 — Career OS)
// ============================================================

export interface ForgeProfile {
  name: string;
  gender: "male" | "female" | "other" | "prefer_not_to_say";
  class_level: string;
  stream: string;
  city: string;
  marks: number;
  board: string;
  exam_score: number | null;
  trend: "improving" | "stable" | "declining";
  dream_job: string;
  priorities: string[];
  timeline: "urgent" | "normal" | "long-game";
  constraints: string[];
  abroad_open: "yes" | "no" | "if_funded" | "maybe" | "only_abroad";
  backup_openness: number;
  budget: string;
  loan_open: "yes" | "no" | "maybe";
  scholarship_exp: "never" | "applied" | "researching";
  deep_dream: string;
}

export interface CareerPath {
  id: "safe" | "balanced" | "aggressive";
  label: string;
  tagline: string;
  probability: number;
  careerTarget: string;
  primaryRoute: string;
  institution: Institution;
  timeline: string;
  salaryEntry: string;
  salaryMid: string;
  rationale: string;
  milestones: { name: string; contingency?: string }[];
  risks: string[];
  color: "success" | "ember" | "heat";
}

export interface RealityFlag {
  type: "warning" | "danger" | "success" | "info";
  title: string;
  message: string;
}

export interface ScholarshipMatch {
  scholarship: import('./scholarship-database').Scholarship;
  score: number;
  tier: "high" | "moderate" | "reach";
  matchReason: string;
}

export interface GeneratedResults {
  careerId: string;
  careerName: string;
  paths: CareerPath[];
  realityFlags: RealityFlag[];
  scholarships: ScholarshipMatch[];
  skillDomains: import('./career-database').SkillDomain[];
  institutions: Institution[];
}

export interface Institution {
  name: string;
  tier: 1 | 2 | 3;
  city: string;
  state: string;
  fees_per_year: number;
  cutoff_description: string;
  placement_median: string;
  type: "government" | "private" | "deemed" | "global";
}
