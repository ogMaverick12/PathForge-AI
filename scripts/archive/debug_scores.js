require('ts-node').register();
const { CAREERS } = require('./lib/career-database.ts');
const { interpretDreamJob } = require('./lib/engines.ts');

function debugInterpret(input) {
  const normalized = input.toLowerCase().trim();
  const inputWords = normalized.split(/[^a-z0-9]+/);
  
  let results = [];

  for (const [id, career] of Object.entries(CAREERS)) {
    for (const alias of [career.name.toLowerCase(), ...career.aliases]) {
      const aliasWords = alias.split(/[^a-z0-9]+/);
      const isSubstring = normalized.includes(alias) || alias.includes(normalized);
      
      let wordMatchCount = 0;
      for (const w of aliasWords) {
        if (w.length > 0 && inputWords.includes(w)) wordMatchCount++;
      }
      
      const m = normalized.length, n = alias.length;
      const dp = Array.from({ length: m + 1 }, (_, i) =>
        Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
      );
      for (let i = 1; i <= m; i++)
        for (let j = 1; j <= n; j++)
          dp[i][j] = normalized[i-1] === alias[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
      const dist = dp[m][n];
      let score = dist;
      
      if (isSubstring) {
          score -= (alias.length * 2); 
      }
      score -= (wordMatchCount * 5);
      
      results.push({ id, alias, dist, isSubstring, wordMatchCount, score });
    }
  }
  
  results.sort((a, b) => a.score - b.score);
  console.log(results.slice(0, 10));
}

debugInterpret('ai ml engineer');
