const fs = require('fs');

let content = fs.readFileSync('lib/engines.ts', 'utf8');

// Replace interpretDreamJob and levenshtein with new analyzeDream and generateDistinctCareers
const newLogic = `
// ─── DREAM JOB INTERPRETER ────────────────────────────────────────────────────
function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}

function analyzeDream(text: string): "wealth" | "impact" | "fame" | "stability" | "none" {
  const t = text.toLowerCase();
  if (t.match(/\\b(billion|rich|wealth|money|startup|scale|business|crore)\\b/)) return "wealth";
  if (t.match(/\\b(help|change|solve|world|impact|society|poor|save)\\b/)) return "impact";
  if (t.match(/\\b(famous|audience|followers|youtube|star|known)\\b/)) return "fame";
  if (t.match(/\\b(stable|secure|safe|government|peaceful)\\b/)) return "stability";
  return "none";
}

export function generateDistinctCareers(profile: ForgeProfile): string[] {
  const normalized = profile.dream_job.toLowerCase().trim();
  const theme = analyzeDream(profile.deep_dream);
  
  const scores: { id: string; score: number; category: string }[] = [];
  const inputWords = normalized.split(/[^a-z0-9]+/);
  
  for (const [id, career] of Object.entries(CAREERS)) {
    let bestAliasScore = Infinity;
    
    for (const alias of [career.name.toLowerCase(), ...career.aliases]) {
      const aliasWords = alias.split(/[^a-z0-9]+/);
      const isSubstring = normalized.includes(alias) || alias.includes(normalized);
      
      let wordMatchCount = 0;
      for (const w of aliasWords) {
        if (w.length > 0 && inputWords.includes(w)) wordMatchCount++;
      }
      
      let score = levenshtein(normalized, alias);
      if (isSubstring) score -= (alias.length * 2); 
      score -= (wordMatchCount * 5);
      
      if (score < bestAliasScore) bestAliasScore = score;
    }
    
    // Theme multipliers (lower score is better initially, so we subtract from score to improve it)
    if (theme === "wealth" && (career.category === "Financial" || career.category === "Entrepreneurial")) bestAliasScore -= 10;
    if (theme === "impact" && (career.category === "Research" || career.category === "Other")) bestAliasScore -= 10;
    if (theme === "fame" && career.category === "Creative") bestAliasScore -= 10;
    if (theme === "stability" && career.type === "government") bestAliasScore -= 10;

    scores.push({ id, score: bestAliasScore, category: career.category || "Other" });
  }
  
  scores.sort((a, b) => a.score - b.score);
  
  // Pick top 3 DISTINCT categories
  const selected: string[] = [];
  const seenCategories = new Set<string>();
  
  for (const s of scores) {
    if (!seenCategories.has(s.category)) {
      selected.push(s.id);
      seenCategories.add(s.category);
    }
    if (selected.length === 3) break;
  }
  
  // Fallback if not enough distinct categories
  if (selected.length < 3) {
    for (const s of scores) {
      if (!selected.includes(s.id)) selected.push(s.id);
      if (selected.length === 3) break;
    }
  }
  
  return selected.length > 0 ? selected : ["software_engineer", "data_scientist", "product_manager"];
}
`;

content = content.replace(/\/\/ ─── DREAM JOB INTERPRETER ────────────────────────────────────────────────────[\s\S]*?\/\/\/ ─── PROBABILITY CALCULATOR ───────────────────────────────────────────────────/, newLogic + '\n// ─── PROBABILITY CALCULATOR ───────────────────────────────────────────────────');

// Replace generateMilestones
const newMilestones = `
// ─── MILESTONE GENERATOR ──────────────────────────────────────────────────────
function generateMilestones(profile: ForgeProfile, careerId: string, mode: string): { name: string; contingency?: string }[] {
  const career = CAREERS[careerId];
  if (!career) return [];
  const classNum = parseInt(profile.class_level) || 11;
  const baseMonth = classNum >= 11 ? 3 : 6;

  let examRequired = career.examRequired;
  if (profile.abroad_open === "only_abroad" && examRequired && (examRequired.includes("JEE") || examRequired.includes("NEET") || examRequired.includes("UPSC"))) {
    examRequired = "SAT / AP / International Requirements";
  }

  const milestones = [];

  milestones.push({ 
    name: examRequired ? \`Month \${baseMonth}: Begin structured \${examRequired} preparation\` : \`Month \${baseMonth}: Start building portfolio/skills\`,
    contingency: examRequired ? "If mock scores are low, pivot to portfolio-based entry routes." : undefined
  });

  milestones.push({ 
    name: \`Month \${baseMonth + 5}: First mock test target — score \${mode === "safe" ? "70th" : mode === "balanced" ? "85th" : "95th"} percentile\`
  });

  milestones.push({ 
    name: \`Year 1: Complete domain foundation (\${career.domains[0]?.name || "Core Skills"})\`,
    contingency: career.domains[0]?.contingency
  });

  milestones.push({ 
    name: \`Year \${Math.ceil(career.timeline / 2)}: First internship/practical experience\`,
    contingency: "If unable to secure internship, contribute heavily to Open Source or indie projects."
  });

  milestones.push({ 
    name: \`Year \${career.timeline}: \${mode === "aggressive" ? "Target top companies directly" : "Graduation + placement"}\`
  });

  return milestones;
}
`;

content = content.replace(/\/\/ ─── MILESTONE GENERATOR ──────────────────────────────────────────────────────[\s\S]*?\/\/\/ ─── MAIN RESULTS GENERATOR ───────────────────────────────────────────────────/, newMilestones + '\n// ─── MAIN RESULTS GENERATOR ───────────────────────────────────────────────────');


// Replace generateResults
const newResults = `
// ─── MAIN RESULTS GENERATOR ───────────────────────────────────────────────────
export function generateResults(profile: ForgeProfile): GeneratedResults {
  const distinctCareerIds = generateDistinctCareers(profile);
  const mainCareerId = distinctCareerIds[0];
  const career = CAREERS[mainCareerId];

  if (!career) {
    return generateResults({ ...profile, dream_job: "software engineer" });
  }

  const paths: CareerPath[] = [];
  const labels = ["SAFE", "BALANCED", "DREAM"];
  const taglines = ["The Logical Anchor", "The High-Leverage Pivot", "The Dream Execution"];
  const modes: ("safe" | "balanced" | "aggressive")[] = ["safe", "balanced", "aggressive"];
  const colors: ("success" | "ember" | "heat")[] = ["success", "ember", "heat"];
  
  let allInstitutions: Institution[] = [];

  distinctCareerIds.forEach((cId, index) => {
    const c = CAREERS[cId];
    if (!c) return;

    let availableInstitutions = getInstitutions(cId);
    if (profile.abroad_open === "only_abroad") {
      const globalOnly = availableInstitutions.filter(i => i.type === "global");
      if (globalOnly.length > 0) availableInstitutions = globalOnly;
    }

    const sortedByFees = [...availableInstitutions].sort((a,b) => a.fees_per_year - b.fees_per_year);
    
    let targetInst;
    if (index === 0) {
      targetInst = availableInstitutions.filter(i => i.tier >= 2).sort((a,b) => a.fees_per_year - b.fees_per_year)[0] || sortedByFees[sortedByFees.length - 1] || sortedByFees[0];
    } else if (index === 1) {
      targetInst = availableInstitutions.filter(i => i.tier <= 2)[0] || availableInstitutions[0];
    } else {
      targetInst = availableInstitutions[0];
    }

    allInstitutions = [...allInstitutions, ...availableInstitutions];

    const prob = calculateProbability(profile, cId, modes[index]);

    let rationale = "";
    if (index === 0) {
       rationale = \`Given your \${profile.marks}% in \${profile.stream}, \${c.name} is the most mathematically secure path within your interest area.\`;
    } else if (index === 1) {
       rationale = \`A pivot to \${c.name} offers higher leverage. It uses similar foundational skills but offers a different trajectory.\`;
    } else {
       const theme = analyzeDream(profile.deep_dream);
       rationale = \`You mentioned themes of \${theme !== 'none' ? theme : 'high ambition'}. \${c.name} represents the maximum realization of that dream.\`;
    }

    paths.push({
      id: modes[index],
      label: labels[index],
      tagline: taglines[index],
      probability: prob,
      careerTarget: c.name,
      primaryRoute: \`\${targetInst.name} → \${c.name}\`,
      institution: targetInst,
      timeline: \`\${c.timeline} years\`,
      salaryEntry: c.salaryRange.entry,
      salaryMid: c.salaryRange.mid,
      rationale: rationale,
      milestones: generateMilestones(profile, cId, modes[index]),
      risks: [c.realityNote, \`Probability: \${prob}%\`],
      color: colors[index]
    });
  });

  return {
    careerId: mainCareerId,
    careerName: career.name,
    paths,
    realityFlags: generateRealityFlags(profile, mainCareerId),
    scholarships: matchScholarships(profile),
    skillDomains: career.domains,
    institutions: allInstitutions
  };
}

export function handleFollowUpQuery(query: string, paths: CareerPath[]): string {
  // A mock LLM responder for the Follow-up CLI
  const q = query.toLowerCase();
  if (q.includes("why") && q.includes("path")) {
    return "These paths were chosen using PathForge's Reasoning Layer. The first path is your safest mathematical bet. The second introduces a related career with better ROI. The third explicitly targets the themes found in your deep dream.";
  }
  if (q.includes("fail") || q.includes("backup")) {
    return "Failure is factored into the roadmaps. Check the orange branching nodes (contingencies) under each path's milestones for immediate pivot strategies if exam scores fall short.";
  }
  if (q.includes("compare")) {
    return \`Comparing your paths: \${paths[0].careerTarget} offers stability (\${paths[0].probability}% chance), whereas \${paths[2].careerTarget} offers the highest ceiling but at massive risk (\${paths[2].probability}% chance).\`;
  }
  return "I am the PathForge Follow-up Engine. I can compare paths, explain risk factors, or help you pivot. Try asking: 'What if I fail my entrance exams?'";
}
`;

content = content.replace(/\/\/ ─── MAIN RESULTS GENERATOR ───────────────────────────────────────────────────[\s\S]*/, newResults);

fs.writeFileSync('lib/engines.ts', content, 'utf8');
