const fs = require('fs');
let content = fs.readFileSync('lib/career-database.ts', 'utf8');

// The faulty pattern is:
// mid: "...",
//     category: "Other",
content = content.replace(/category:\s*"Other",\s*senior:/g, "senior:");

fs.writeFileSync('lib/career-database.ts', content, 'utf8');
