// ============================================================
// PATHFORGE AI — REALITY ENGINE (Brutal Honesty Module)
// ============================================================

import { Career, StudentProfile, RealityWarning } from './types';

const PERFORMANCE_MARKS: Record<string, number> = {
  below_60: 55,
  '60_75': 68,
  '75_85': 80,
  '85_95': 90,
  '95_plus': 97,
};

const BUDGET_CORE_INR: Record<string, number> = {
  low: 10,
  medium: 40,
  high: 200,
};

const TIMELINE_YEARS: Record<string, number> = {
  '0-2': 2,
  '3-5': 4,
  '5+': 6,
};

export function runRealityEngine(
  profile: StudentProfile,
  career: Career
): RealityWarning[] {
  const warnings: RealityWarning[] = [];
  const marks = PERFORMANCE_MARKS[profile.academic.performance] ?? 70;
  const budget = BUDGET_CORE_INR[profile.constraints.budget] ?? 20;
  const timeline = TIMELINE_YEARS[profile.goals.timeline_expectation] ?? 4;

  // ── 1. Goal vs Effort Mismatch ────────────────────────────
  if (career.difficulty >= 8 && profile.academic.study_hours < 4) {
    warnings.push({
      type: 'effort_mismatch',
      severity: 'critical',
      title: 'Critical Effort Gap Detected',
      message: `${career.name} is rated ${career.difficulty}/10 difficulty — one of the most demanding careers in India. You're currently studying ${profile.academic.study_hours}h/day. The minimum required is 6–8 hours of focused, structured study.`,
      suggestion: 'Increase to at least 6 hours/day immediately. Use the Pomodoro method. Join a structured coaching program.',
    });
  } else if (career.difficulty >= 6 && profile.academic.study_hours < 2) {
    warnings.push({
      type: 'effort_mismatch',
      severity: 'moderate',
      title: 'Study Hours Below Recommended',
      message: `${career.name} requires consistent effort. You're studying ${profile.academic.study_hours}h/day. Recommended: 4–5 hours minimum.`,
      suggestion: 'Structure your day using time-blocking. 4h/day is the minimum to stay competitive.',
    });
  }

  // ── 2. Goal vs Budget Mismatch ────────────────────────────
  const minCost = career.cost_range_inr[0];
  if (minCost > budget) {
    warnings.push({
      type: 'budget_mismatch',
      severity: minCost > budget * 2 ? 'critical' : 'moderate',
      title: 'Budget vs Career Cost Conflict',
      message: `The minimum cost for ${career.name} (₹${minCost}L) exceeds your stated budget (₹${budget}L). This path may be financially inaccessible without scholarships or education loans.`,
      suggestion: minCost > budget * 2
        ? 'Explore government schemes (PM Vidyalakshmi), scholarship programs, or consider lower-cost alternatives.'
        : 'Look into education loans (SBI Scholar Loan, Avanse), and apply for merit-based scholarships early.',
    });
  }

  // ── 3. Goal vs Timeline Mismatch ─────────────────────────
  if (career.years_to_establish > timeline + 2) {
    warnings.push({
      type: 'timeline_mismatch',
      severity: 'moderate',
      title: 'Timeline Expectation is Unrealistic',
      message: `${career.name} takes ~${career.years_to_establish} years to establish. You expect results in ${profile.goals.timeline_expectation} years. That's a gap of ${career.years_to_establish - timeline} years.`,
      suggestion: `Adjust your timeline expectations. Early financial stability in this field typically comes at year ${career.years_to_establish - 2}, not sooner.`,
    });
  }

  // ── 4. Marks vs Career Requirements ──────────────────────
  const requiredMarks: Record<string, number> = {
    mbbs_doctor: 95,
    ias_ips_officer: 60,
    software_engineer: 70,
    data_scientist: 75,
    lawyer: 65,
    chartered_accountant: 60,
    professional_cricketer: 40,
  };
  const required = requiredMarks[career.id] ?? 60;
  if (marks < required - 15) {
    warnings.push({
      type: 'effort_mismatch',
      severity: 'critical',
      title: `Academic Gap: ${marks}% vs Required ${required}%+`,
      message: `Your current academic performance (${marks}% band) is significantly below what competitive candidates in ${career.name} typically hold. This creates a steep probability drop.`,
      suggestion: `Focus on improving marks in the next 1–2 terms. Consider a coaching foundation course. A 15-20% improvement in study quality can significantly improve entry probability.`,
    });
  }

  // ── 5. Skill Gap Detection ────────────────────────────────
  const strength_set = new Set(
    profile.academic.subject_strengths.map(s => s.toLowerCase())
  );
  const gaps = career.required_skills.filter(
    skill => !profile.academic.subject_strengths.some(
      s => s.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(s.toLowerCase())
    )
  );
  if (gaps.length >= 3) {
    warnings.push({
      type: 'skill_gap',
      severity: 'moderate',
      title: `${gaps.length} Critical Skills Missing`,
      message: `${career.name} requires: ${career.required_skills.join(', ')}. You've identified no strength in: ${gaps.slice(0, 3).join(', ')}.`,
      suggestion: `Start building these skills now. Even 30 minutes/day of focused skill development compounds significantly over 1–2 years.`,
    });
  }

  // ── 6. Commitment vs Goal Mismatch ───────────────────────
  if (profile.goals.commitment_level === 'casual' && career.difficulty >= 8) {
    warnings.push({
      type: 'risk_warning',
      severity: 'critical',
      title: 'Commitment Level vs Career Demands — Conflict',
      message: `You described yourself as "Casually" pursuing this goal. ${career.name} is one of the most competitive paths in India. Casual effort will not be sufficient.`,
      suggestion: 'Either elevate your commitment level or explore careers that match your current bandwidth.',
    });
  }

  // ── 7. Sports-specific warnings ──────────────────────────
  if (career.domain === 'sports' && profile.sports.applicable) {
    if ((profile.sports.practice_hours_per_day ?? 0) < 3) {
      warnings.push({
        type: 'effort_mismatch',
        severity: 'critical',
        title: 'Practice Hours Far Below Professional Standard',
        message: `Professional athletes train 6–8 hours/day. You're at ${profile.sports.practice_hours_per_day ?? 0}h/day. At this rate, reaching competitive levels will take much longer than expected.`,
        suggestion: 'Aim for structured training of at least 4–5 hours/day. Find a certified coach immediately.',
      });
    }
    if (!profile.sports.has_coaching && (profile.sports.current_level === 'district' || profile.sports.current_level === 'beginner')) {
      warnings.push({
        type: 'skill_gap',
        severity: 'moderate',
        title: 'No Certified Coach — Career-Limiting Risk',
        message: 'Without proper coaching, self-trained athletes plateau early. A certified coach dramatically accelerates technical development.',
        suggestion: 'Seek SAI-affiliated coaches or state sports authority programs. Many are free for promising athletes.',
      });
    }
  }

  // ── 8. Positive Signals ───────────────────────────────────
  if (profile.academic.study_hours >= 6 && career.difficulty >= 7) {
    warnings.push({
      type: 'positive_signal',
      severity: 'info',
      title: '✅ Study Discipline is Strong',
      message: `${profile.academic.study_hours}h/day of study is genuinely impressive and puts you in the top 15% of aspirants for ${career.name}.`,
      suggestion: 'Channel this discipline into mock tests, revision cycles, and past papers for maximum output.',
    });
  }
  if (profile.goals.commitment_level === 'fully_committed') {
    warnings.push({
      type: 'positive_signal',
      severity: 'info',
      title: '✅ Full Commitment Detected',
      message: 'Commitment is the #1 predictor of success in competitive careers. You have the right mindset.',
      suggestion: 'Pair this commitment with a structured study plan and weekly review checkpoints.',
    });
  }

  return warnings;
}
