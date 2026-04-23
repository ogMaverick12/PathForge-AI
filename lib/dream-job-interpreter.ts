// ============================================================
// PATHFORGE AI — DREAM JOB INTERPRETER
// ============================================================

import { CAREER_DATABASE, DREAM_JOB_MAP } from './career-database';
import { Career } from './types';

export interface InterpreterResult {
  matched_career: Career | null;
  confidence: number; // 0-1
  suggestions: Career[];
  normalized_input: string;
}

function normalizeText(input: string): string {
  return input.toLowerCase().trim()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ');
}

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function similarityScore(a: string, b: string): number {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  const dist = levenshteinDistance(a, b);
  return 1 - dist / maxLen;
}

export function interpretDreamJob(rawInput: string): InterpreterResult {
  const normalized = normalizeText(rawInput);

  // 1. Direct synonym map lookup
  for (const [synonym, careerId] of Object.entries(DREAM_JOB_MAP)) {
    if (normalized.includes(normalizeText(synonym)) || normalizeText(synonym).includes(normalized)) {
      const career = CAREER_DATABASE.find(c => c.id === careerId);
      if (career) {
        return {
          matched_career: career,
          confidence: 0.95,
          suggestions: getSuggestions(career),
          normalized_input: normalized,
        };
      }
    }
  }

  // 2. Career name / tag fuzzy match
  let bestMatch: Career | null = null;
  let bestScore = 0;

  for (const career of CAREER_DATABASE) {
    const nameSim = similarityScore(normalized, normalizeText(career.name));
    const tagSim = career.tags.reduce((max, tag) =>
      Math.max(max, similarityScore(normalized, normalizeText(tag))), 0);
    const score = Math.max(nameSim, tagSim);

    if (score > bestScore) {
      bestScore = score;
      bestMatch = career;
    }
  }

  if (bestMatch && bestScore > 0.5) {
    return {
      matched_career: bestMatch,
      confidence: bestScore,
      suggestions: getSuggestions(bestMatch),
      normalized_input: normalized,
    };
  }

  // 3. Keyword partial match
  const keywordMatches = CAREER_DATABASE.filter(c =>
    c.tags.some(t => normalized.includes(t) || t.includes(normalized)) ||
    normalizeText(c.name).includes(normalized)
  );

  if (keywordMatches.length > 0) {
    return {
      matched_career: keywordMatches[0],
      confidence: 0.65,
      suggestions: keywordMatches.slice(0, 4),
      normalized_input: normalized,
    };
  }

  // 4. No match → return top 4 as suggestions
  return {
    matched_career: null,
    confidence: 0,
    suggestions: CAREER_DATABASE.slice(0, 4),
    normalized_input: normalized,
  };
}

function getSuggestions(career: Career): Career[] {
  return career.alternatives
    .map(id => CAREER_DATABASE.find(c => c.id === id))
    .filter((c): c is Career => !!c)
    .slice(0, 3);
}

export function getAutocompleteSuggestions(query: string): string[] {
  const q = normalizeText(query);
  if (!q) return [];

  const results: string[] = [];

  // From synonym map keys
  for (const synonym of Object.keys(DREAM_JOB_MAP)) {
    if (synonym.includes(q)) {
      results.push(synonym);
    }
  }

  // From career names
  for (const career of CAREER_DATABASE) {
    if (normalizeText(career.name).includes(q)) {
      results.push(career.name);
    }
    for (const tag of career.tags) {
      if (tag.includes(q) && !results.includes(tag)) {
        results.push(tag);
      }
    }
  }

  // Deduplicate and return top 6
  return [...new Set(results)].slice(0, 6);
}
