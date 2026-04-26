const fs = require('fs');
const path = require('path');

const mdPath = path.join(process.cwd(), 'pathforge_extreme_diversity_expansion_1.md');
const dbPath = path.join(process.cwd(), 'lib/career-database.ts');

const mdContent = fs.readFileSync(mdPath, 'utf8');
const dbContent = fs.readFileSync(dbPath, 'utf8');

const regex = /```typescript\n([\s\S]*?)```/;
let match = regex.exec(mdContent);
if (!match) {
  console.log("No typescript block found.");
  process.exit(1);
}

let replacementCode = match[1];

// Find cybersecurity_engineer in dbContent
const startIdx = dbContent.indexOf('  cybersecurity_engineer: {');
const endIdx = dbContent.lastIndexOf('};');

if (startIdx !== -1 && endIdx !== -1) {
  const newDbContent = dbContent.substring(0, startIdx) + replacementCode.trim() + '\n};\n';
  fs.writeFileSync(dbPath, newDbContent);
  console.log('Replaced successfully! Length of new DB:', newDbContent.length);
} else {
  console.log('Could not find start/end indices in DB content.');
}
