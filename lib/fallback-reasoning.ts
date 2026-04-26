// ============================================================
// PATHFORGE AI — CLIENT-SIDE FALLBACK REASONING ENGINE (v5)
// ============================================================
// When the NVIDIA NIM API is unavailable, this engine provides
// intelligent, context-aware responses using rule-based pattern
// matching and actual user data.

import type { ForgeProfile, CareerPath, GeneratedResults } from './types';
import { CAREERS } from './career-database';

interface ReasoningContext {
  profile: ForgeProfile;
  paths: CareerPath[];
  results?: GeneratedResults;
}

// ── PATTERN MATCHERS ──────────────────────────────────────────
interface PatternRule {
  patterns: RegExp[];
  handler: (input: string, ctx: ReasoningContext) => string;
}

const RULES: PatternRule[] = [
  // ── Exam Failure Contingency ──
  {
    patterns: [
      /what if.*(fail|don't clear|can't crack|bomb|mess up|low score).*(jee|neet|upsc|clat|cat|gate|exam|entrance|test)/i,
      /fail.*(jee|neet|entrance|exam)/i,
      /couldn.*clear.*(jee|neet|upsc)/i,
    ],
    handler: (input, ctx) => {
      const examMentioned = input.match(/jee|neet|upsc|clat|cat|gate/i)?.[0]?.toUpperCase() || 'entrance exam';
      const safePath = ctx.paths.find(p => p.id === 'safe');
      const aggressivePath = ctx.paths.find(p => p.id === 'aggressive');

      return `Great question — this is exactly what PathForge is designed for. Here's your contingency plan if ${examMentioned} doesn't work out:\n\n` +
        `**IMMEDIATE PIVOT (Month 1–3):**\n` +
        `• Apply to private/deemed universities that accept ${examMentioned === 'JEE' ? 'BITSAT, VITEEE, MET, SRMJEE' : examMentioned === 'NEET' ? 'JIPMER, AIIMS counseling, management quota' : 'alternative entrance exams'}.\n` +
        `• Your safe path "${safePath?.careerTarget || 'fallback career'}" remains fully viable through alternative entry.\n\n` +
        `**MID-TERM STRATEGY (Month 3–12):**\n` +
        `• ${examMentioned === 'JEE' ? 'Consider a drop year with structured coaching (Allen/FIITJEE) — 40% of IIT students are droppers.' : examMentioned === 'NEET' ? 'A drop year with structured coaching is very common — most NEET toppers take 1-2 attempts.' : 'Consider alternative paths to the same career goal.'}\n` +
        `• Start building a portfolio/project base NOW — regardless of exam outcome, demonstrated skills open doors.\n\n` +
        `**LONG-TERM REALITY:**\n` +
        `• Your dream of "${aggressivePath?.careerTarget || ctx.profile.dream_job}" does NOT require ${examMentioned}. There are 5+ alternative entry routes.\n` +
        `• ${ctx.profile.marks}% marks + skills + portfolio can get you into top companies regardless of college name. Companies like Google and Goldman Sachs have open-source/portfolio hiring tracks.`;
    }
  },

  // ── Career Comparison ──
  {
    patterns: [
      /compare.*(path|option|route|career)/i,
      /which.*(path|option|route|career).*(better|best|choose|pick)/i,
      /safe.*(vs|or|versus).*dream/i,
      /should i.*(go with|pick|choose)/i,
      /difference.*between.*(safe|balanced|dream|aggressive)/i,
    ],
    handler: (_, ctx) => {
      if (ctx.paths.length < 2) return "I need at least 2 paths to compare. Try regenerating your results.";

      let response = `**⚡ PATH COMPARISON BREAKDOWN:**\n\n`;
      for (const path of ctx.paths) {
        const emoji = path.id === 'safe' ? '🟢' : path.id === 'balanced' ? '🟡' : '🔴';
        response += `${emoji} **${path.label} — ${path.careerTarget}** (${path.probability}% probability)\n`;
        response += `   Route: ${path.primaryRoute}\n`;
        response += `   Salary: ${path.salaryEntry} → ${path.salaryMid}\n`;
        response += `   Timeline: ${path.timeline}\n\n`;
      }

      response += `**MY RECOMMENDATION:**\n`;
      const balanced = ctx.paths.find(p => p.id === 'balanced');
      const aggressive = ctx.paths.find(p => p.id === 'aggressive');
      if (balanced && aggressive) {
        response += `Start with the ${balanced.label} path. It gives you ${balanced.probability}% success probability while keeping the door open to pivot to "${aggressive.careerTarget}" once you've built foundational skills. The safe path is your insurance; the dream path is what you optimize toward.`;
      }
      return response;
    }
  },

  // ── Risk Assessment ──
  {
    patterns: [
      /what.*(risk|danger|threat|problem|issue)/i,
      /am i.*(risk|danger|trouble)/i,
      /risk.*factor/i,
      /biggest.*challenge/i,
    ],
    handler: (_, ctx) => {
      let response = `**⚠️ YOUR RISK PROFILE:**\n\n`;

      // Marks risk
      if (ctx.profile.marks < 70) {
        response += `🔴 **MARKS GAP**: At ${ctx.profile.marks}%, you're below the competitive threshold for premium institutions. You need a 15-20% improvement or an alternative entry strategy.\n\n`;
      } else if (ctx.profile.marks < 85) {
        response += `🟡 **MARKS**: ${ctx.profile.marks}% is competitive but not dominant. Top 5 institutions will be reaches; top 20 are realistic.\n\n`;
      } else {
        response += `🟢 **MARKS**: ${ctx.profile.marks}% — you're in strong position for most programs.\n\n`;
      }

      // Budget risk
      const budgetMap: Record<string, number> = { '<1L': 50000, '1-3L': 200000, '3-6L': 450000, '6-12L': 900000, '12-25L': 1850000, '25L+': 4000000, 'full_scholarship': 0 };
      const budget = budgetMap[ctx.profile.budget] || 200000;
      if (budget < 450000) {
        response += `🔴 **BUDGET CONSTRAINT**: Your ₹${Math.round(budget/100000)}L/year budget limits Tier-1 private options. Scholarships and government institutions are essential.\n\n`;
      }

      // Stream risk
      const dreamCareer = CAREERS[ctx.paths[0]?.careerTarget?.toLowerCase().replace(/[^a-z_]/g, '') || ''];
      if (dreamCareer && !dreamCareer.streams.includes(ctx.profile.stream)) {
        response += `🔴 **STREAM MISMATCH**: Your ${ctx.profile.stream} stream may not directly map to your dream career. A bridge program or lateral entry will be needed.\n\n`;
      }

      // Trend risk
      if (ctx.profile.trend === 'declining') {
        response += `🟡 **DECLINING TREND**: Your grades are trending downward. This needs immediate attention — consistent improvement matters more than absolute marks to admissions committees.\n\n`;
      }

      // Path-specific risks
      for (const path of ctx.paths) {
        if (path.risks && path.risks.length > 0) {
          response += `**${path.label} risks**: ${path.risks[0]}\n`;
        }
      }

      return response;
    }
  },

  // ── Abroad Decision ──
  {
    patterns: [
      /should i.*(go abroad|study abroad|leave india|go overseas)/i,
      /abroad.*(worth|good|idea)/i,
      /india.*(vs|or|versus).*abroad/i,
      /stay.*india.*or.*(go|leave)/i,
      /international.*option/i,
    ],
    handler: (_, ctx) => {
      const budgetMap: Record<string, number> = { '<1L': 50000, '1-3L': 200000, '3-6L': 450000, '6-12L': 900000, '12-25L': 1850000, '25L+': 4000000, 'full_scholarship': 0 };
      const budget = budgetMap[ctx.profile.budget] || 200000;
      const isLowBudget = budget < 900000;

      let response = `**🌍 ABROAD ANALYSIS FOR YOUR PROFILE:**\n\n`;

      if (isLowBudget) {
        response += `Your budget is tight (₹${Math.round(budget/100000)}L/year), but FREE education abroad EXISTS:\n\n`;
        response += `• **Germany**: TU Munich, RWTH Aachen — ₹0 tuition (only €300/semester admin)\n`;
        response += `• **Norway**: University of Oslo — completely free for all nationalities\n`;
        response += `• **KAUST (Saudi Arabia)**: Free + $20K/year stipend for research students\n`;
        response += `• **École 42 (France)**: Free software engineering, no degree required\n`;
        response += `• **Scholarships**: Erasmus Mundus, DAAD, MEXT (Japan) — all fully funded\n\n`;
      }

      response += `**SALARY MULTIPLIER:**\n`;
      response += `• Same role, India: ₹${ctx.paths[0]?.salaryEntry || '6-20L'}\n`;
      response += `• Same role, USA/Europe: 3-8x the Indian salary\n`;
      response += `• ROI breakeven: Usually 2-3 years after graduation\n\n`;

      response += `**MY RECOMMENDATION:**\n`;
      if (ctx.profile.marks >= 85) {
        response += `With ${ctx.profile.marks}% marks, you're competitive for fully-funded programs. Apply to 5 funded programs + 3 Indian safeties. The worst case is you stay in India with great options anyway.`;
      } else {
        response += `Focus on getting the best Indian institution first, then consider abroad for Masters/PhD where funding is more accessible and your undergrad research/portfolio matters more than marks.`;
      }

      return response;
    }
  },

  // ── ROI / Salary Analysis ──
  {
    patterns: [
      /roi|return on investment/i,
      /how much.*(earn|make|salary|money|income)/i,
      /salary.*(expect|projection|growth)/i,
      /worth.*investment/i,
      /cost.*benefit/i,
    ],
    handler: (_, ctx) => {
      let response = `**💰 ROI ANALYSIS:**\n\n`;

      for (const path of ctx.paths) {
        const emoji = path.id === 'safe' ? '🟢' : path.id === 'balanced' ? '🟡' : '🔴';
        const instFee = path.institution?.fees_per_year || 200000;
        const totalCost = instFee * parseInt(path.timeline) || instFee * 4;

        response += `${emoji} **${path.label} — ${path.careerTarget}**\n`;
        response += `   Investment: ₹${Math.round(totalCost/100000)}L (${path.timeline} at ₹${Math.round(instFee/100000)}L/yr)\n`;
        response += `   Entry salary: ${path.salaryEntry}\n`;
        response += `   Mid-career: ${path.salaryMid}\n`;
        response += `   10-year projected earnings: ~₹${path.id === 'aggressive' ? '2-5Cr' : path.id === 'balanced' ? '1.5-3Cr' : '1-2Cr'}\n\n`;
      }

      response += `**KEY INSIGHT:** The institution you attend matters less than the skills you build there. An IIT student who doesn't code outside class will earn less than a Tier-2 college student with a killer GitHub portfolio and 3 internships.`;

      return response;
    }
  },

  // ── Startup / Entrepreneurship ──
  {
    patterns: [
      /start.*(startup|business|company)/i,
      /entrepreneur/i,
      /should i.*(build|start|create|launch)/i,
      /when.*(start|begin).*startup/i,
      /too young.*startup/i,
    ],
    handler: (_, ctx) => {
      const classNum = parseInt(ctx.profile.class_level) || 11;
      const age = classNum + 5; // rough estimate

      return `**🚀 STARTUP READINESS ANALYSIS:**\n\n` +
        `At ~${age} years old in Class ${ctx.profile.class_level}, here's the truth about starting up:\n\n` +
        `**YES, START NOW — but with guardrails:**\n` +
        `• **Right now**: Build a side project that solves a real problem. Ship it. Get 10 users.\n` +
        `• **Don't drop out** until you have revenue > your living costs. The "dropout founder" myth is survivorship bias.\n` +
        `• **College IS your incubator** — use free compute, free mentorship, co-founder access, and zero living costs.\n\n` +
        `**THE INDIAN STARTUP PLAYBOOK (for a ${ctx.profile.stream} student):**\n` +
        `1. Class 11-12: Learn to code. Ship 2 projects. Start a tech blog.\n` +
        `2. Year 1 (College): Join/build college startup cell. Apply to incubators (NSRCEL, T-Hub).\n` +
        `3. Year 2-3: Launch MVP. Target ₹1L MRR before graduation.\n` +
        `4. Year 4: If traction exists → raise seed round. If not → join a high-growth startup to learn.\n\n` +
        `**BACKUP MATH:** Your safe path (${ctx.paths[0]?.careerTarget || 'tech career'}) pays ${ctx.paths[0]?.salaryEntry || '₹10-20L'}. Even if your startup fails (90% do), you've built skills that make you MORE hireable, not less.`;
    }
  },

  // ── Pivoting / Switching Careers ──
  {
    patterns: [
      /pivot|switch|change.*(career|path|field)/i,
      /what if i.*(switch|pivot|change|move)/i,
      /don't.*like.*(career|path|field)/i,
      /not sure.*(right|fit|for me)/i,
      /wrong.*(career|path|choice)/i,
    ],
    handler: (input, ctx) => {
      return `**🔄 PIVOT ANALYSIS:**\n\n` +
        `Pivoting is not failure — it's optimization. Here's what changes:\n\n` +
        `**FROM YOUR CURRENT PATHS:**\n` +
        ctx.paths.map(p => `• ${p.label} (${p.careerTarget}): ${p.probability}% probability`).join('\n') + `\n\n` +
        `**PIVOT RULES:**\n` +
        `1. **Before Year 2 of college**: Almost any pivot is free. Change major, switch focus.\n` +
        `2. **After Year 2**: Lateral pivots work (CS → Data Science → AI). 180° pivots (CS → Medicine) cost 2+ years.\n` +
        `3. **After graduation**: MBA from IIM-A/B/C is the universal "reset button" — it enables career switches to consulting, product, finance.\n\n` +
        `**WHAT TRANSFERS:**\n` +
        `• Analytical thinking (${ctx.profile.stream} foundation) → ANY career\n` +
        `• Communication skills → Management, Product, Consulting\n` +
        `• Technical skills → Startup, Data, Finance\n\n` +
        `To explore a specific pivot, go back to the forge and try a different dream job. PathForge will recalculate your probability for the new path.`;
    }
  },

  // ── Scholarship / Funding Help ──
  {
    patterns: [
      /scholarship|funding|financial aid|afford/i,
      /how.*pay|money.*problem|can't afford/i,
      /free.*education|free.*college/i,
      /loan.*worth/i,
    ],
    handler: (_, ctx) => {
      const scholarships = ctx.results?.scholarships || [];
      let response = `**💰 FUNDING YOUR EDUCATION:**\n\n`;

      if (scholarships.length > 0) {
        response += `PathForge matched you with ${scholarships.length} scholarships:\n\n`;
        for (const s of scholarships.slice(0, 4)) {
          const emoji = s.tier === 'high' ? '🏆' : s.tier === 'moderate' ? '⚡' : '🎯';
          response += `${emoji} **${s.scholarship.name}** (${s.scholarship.org})\n`;
          response += `   Value: ${s.scholarship.value} · Match: ${s.matchReason}\n`;
          response += `   Deadline: ${s.scholarship.deadline}\n\n`;
        }
      }

      response += `**FREE EDUCATION OPTIONS (no one tells you about):**\n`;
      response += `• IIT fee waiver: Family income <₹5L → ₹0 tuition\n`;
      response += `• German universities: ₹0 tuition for EVERYONE (including Indians)\n`;
      response += `• KAUST (Saudi): Free + $20K/year stipend\n`;
      response += `• École 42: Free coding school, no degree needed\n`;
      response += `• PM Vidyalakshmi: 3% interest education loans\n\n`;
      response += `**STRATEGY:** Apply to 5+ scholarships simultaneously. Most students apply to 1 and hope. The winners apply to 10+ and negotiate.`;

      return response;
    }
  },

  // ── Timeline / Age Concern ──
  {
    patterns: [
      /too late|too old|too young|behind|time.*left/i,
      /how long.*(take|until)/i,
      /when.*(start|ready|placed|hired)/i,
      /gap year|drop year|dropper/i,
    ],
    handler: (_, ctx) => {
      const classNum = parseInt(ctx.profile.class_level) || 11;
      const firstJobAge = classNum + parseInt(ctx.paths[0]?.timeline || '4');

      return `**⏰ TIMELINE REALITY CHECK:**\n\n` +
        `You're in Class ${ctx.profile.class_level}. Here's your math:\n\n` +
        `• First meaningful employment: ~age ${firstJobAge + 5} (${ctx.paths[0]?.timeline || '4 years'} from now)\n` +
        `• Career maturity (mid-salary): ~age ${firstJobAge + 10}\n` +
        `• Peak earning potential: ~age ${firstJobAge + 20}\n\n` +
        `**IS A DROP YEAR WORTH IT?**\n` +
        `• For JEE/NEET: YES if your mock scores are within 20% of target. The IIT salary premium repays the lost year within 2 years of working.\n` +
        `• For other exams: Rarely worth a full drop. Instead, prepare alongside college Year 1.\n\n` +
        `**YOU ARE NOT BEHIND.** The biggest careers (startup exits, senior VP roles, research breakthroughs) happen at age 30-45. You have a 15+ year runway. What matters now is not speed — it's direction. Pick the right direction, then accelerate.`;
    }
  },

  // ── Skills / What to Learn ──
  {
    patterns: [
      /what.*learn|what.*skill|how.*prepare/i,
      /what.*start|where.*begin|first step/i,
      /roadmap|action plan|next step/i,
      /what.*do now|today|this month/i,
    ],
    handler: (_, ctx) => {
      const topPath = ctx.paths.find(p => p.id === 'balanced') || ctx.paths[0];
      const milestones = topPath?.milestones || [];

      let response = `**🎯 YOUR ACTION PLAN (starting today):**\n\n`;
      response += `Based on your balanced path toward **${topPath?.careerTarget || 'your dream career'}**:\n\n`;

      if (milestones.length > 0) {
        milestones.forEach((m, i) => {
          response += `${i + 1}. ${m.name}\n`;
          if (m.contingency) response += `   ↳ Backup: ${m.contingency}\n`;
          response += `\n`;
        });
      }

      response += `**THIS WEEK:** \n`;
      response += `• Start with the first skill domain.\n`;
      response += `• Create a GitHub account and commit code daily.\n`;
      response += `• Subscribe to 1 newsletter in your target field.\n`;
      response += `• Block 2 hours/day for deliberate skill-building (non-negotiable).`;

      return response;
    }
  },
];

// ── FALLBACK RESPONSE ─────────────────────────────────────────
function generateFallback(input: string, ctx: ReasoningContext): string {
  const topPath = ctx.paths.find(p => p.id === 'balanced') || ctx.paths[0];

  return `I understand you're asking about "${input.slice(0, 60)}..." — here's what I can tell you based on your profile:\n\n` +
    `**YOUR PROFILE SUMMARY:**\n` +
    `• ${ctx.profile.name || 'Student'}, Class ${ctx.profile.class_level}, ${ctx.profile.stream}, ${ctx.profile.marks}%\n` +
    `• Dream: ${ctx.profile.dream_job}\n` +
    `• Top match: ${topPath?.careerTarget || 'Under evaluation'} (${topPath?.probability || '??'}% probability)\n\n` +
    `**QUESTIONS I CAN ANSWER DEEPLY:**\n` +
    `• "What if I fail JEE/NEET?"\n` +
    `• "Compare my 3 paths"\n` +
    `• "What are my risks?"\n` +
    `• "Should I go abroad?"\n` +
    `• "What's my ROI?"\n` +
    `• "When should I start a startup?"\n` +
    `• "How do I pay for this?"\n` +
    `• "What should I learn first?"\n\n` +
    `Try asking one of these for a detailed, personalized breakdown.`;
}

// ── MAIN REASONING FUNCTION ───────────────────────────────────
export function generateFallbackResponse(
  input: string,
  context: ReasoningContext
): string {
  const normalizedInput = input.toLowerCase().trim();

  // Try each rule in order
  for (const rule of RULES) {
    for (const pattern of rule.patterns) {
      if (pattern.test(normalizedInput)) {
        return rule.handler(input, context);
      }
    }
  }

  // No pattern matched — use generic fallback
  return generateFallback(input, context);
}
