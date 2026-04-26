const fs = require('fs');
let fileContent = fs.readFileSync('lib/career-database.ts', 'utf-8');

fileContent = fileContent.replace(
  /aliases:\s*\[\s*"data science",\s*"machine learning",\s*"ml",\s*"ai",\s*"artificial intelligence",\s*"data analyst",\s*"nlp",\s*"deep learning",\s*"chatgpt",\s*"openai"\s*\]/g,
  'aliases: ["data science", "machine learning", "ml", "ai", "artificial intelligence", "data analyst", "nlp", "deep learning", "chatgpt", "openai", "ai engineer", "ml engineer", "ai ml engineer"]'
);

fileContent = fileContent.replace(
  /aliases:\s*\[\s*"actor",\s*"theatre",\s*"dance",\s*"classical dance",\s*"bharatanatyam",\s*"kathak",\s*"odissi",\s*"classical music",\s*"carnatic",\s*"hindustani",\s*"performing arts"\s*\]/g,
  'aliases: ["actor", "theatre", "dance", "classical dance", "bharatanatyam", "kathak", "odissi", "classical music", "carnatic", "hindustani", "performing arts", "musician", "music", "singer", "producer", "band"]'
);

fs.writeFileSync('lib/career-database.ts', fileContent, 'utf-8');
console.log("Done");
