const fs = require('fs');

let fileContent = fs.readFileSync('lib/career-database.ts', 'utf-8');

fileContent = fileContent.replace(
  /aliases:\s*\["actor", "theatre", "dance", "classical dance", "bharatanatyam", "kathak", "odissi", "classical music", "carnatic", "hindustani", "performing arts"\]/,
  'aliases: ["actor", "theatre", "dance", "classical dance", "bharatanatyam", "kathak", "odissi", "classical music", "carnatic", "hindustani", "performing arts", "musician", "music", "singer", "producer", "band"]'
);

fileContent = fileContent.replace(
  /aliases:\s*\["data", "machine learning", "ai", "artificial intelligence", "analyst", "data analyst", "ml engineer"\]/,
  'aliases: ["data", "machine learning", "ai", "artificial intelligence", "analyst", "data analyst", "ml engineer", "ai engineer", "ai ml engineer", "artificial intelligence engineer"]'
);

fs.writeFileSync('lib/career-database.ts', fileContent, 'utf-8');
console.log("Done modifying aliases.");
