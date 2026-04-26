require('ts-node').register();
const { generateResults } = require('./lib/engines.ts');

const profile = {
  name: "Power User",
  class_level: "11",
  stream: "PCM",
  city: "Bangalore",
  marks: 95,
  board: "CBSE",
  exam_score: null,
  trend: "improving",
  dream_job: "AI Startup Founder",
  priorities: ["wealth", "impact"],
  abroad_open: "both",
  budget: "2-5L",
  deep_dream: "I want to build a billion dollar AI company while maximizing my impact on the world."
};

const results = generateResults(profile);
console.log(JSON.stringify(results, null, 2));
