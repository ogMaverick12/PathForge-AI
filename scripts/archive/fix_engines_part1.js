const fs = require('fs');
let content = fs.readFileSync('lib/engines.ts', 'utf8');

const newLogic = `
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
  const theme = analyzeDream(profile.deep_dream || "");
  
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
    
    // Theme multipliers
    if (theme === "wealth" && (career.category === "Financial" || career.category === "Entrepreneurial")) bestAliasScore -= 10;
    if (theme === "impact" && (career.category === "Research" || career.category === "Other")) bestAliasScore -= 10;
    if (theme === "fame" && career.category === "Creative") bestAliasScore -= 10;
    if (theme === "stability" && career.category === "Hybrid") bestAliasScore -= 10;

    scores.push({ id, score: bestAliasScore, category: career.category || "Other" });
  }
  
  scores.sort((a, b) => a.score - b.score);
  
  const selected: string[] = [];
  const seenCategories = new Set<string>();
  
  for (const s of scores) {
    if (!seenCategories.has(s.category)) {
      selected.push(s.id);
      seenCategories.add(s.category);
    }
    if (selected.length === 3) break;
  }
  
  if (selected.length < 3) {
    for (const s of scores) {
      if (!selected.includes(s.id)) selected.push(s.id);
      if (selected.length === 3) break;
    }
  }
  
  return selected.length > 0 ? selected : ["software_engineer", "data_scientist", "product_manager"];
}
`;

const startIdx = content.indexOf('export function interpretDreamJob');
const endIdx = content.indexOf('// ─── PROBABILITY CALCULATOR', startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  content = content.slice(0, startIdx) + newLogic + '\n' + content.slice(endIdx);
  fs.writeFileSync('lib/engines.ts', content, 'utf8');
  console.log('Success');
} else {
  console.log('Failed to find indices');
}
