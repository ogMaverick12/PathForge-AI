const fs = require('fs');
let content = fs.readFileSync('lib/career-database.ts', 'utf8');

const map = {
  software_engineer: 'Technical',
  doctor_mbbs: 'Research',
  data_scientist: 'Technical',
  chartered_accountant: 'Financial',
  investment_banker: 'Financial',
  commercial_pilot: 'Technical',
  lawyer_corporate: 'Hybrid',
  architect: 'Creative',
  civil_engineer: 'Technical',
  mechanical_engineer: 'Technical',
  electrical_engineer: 'Technical',
  product_manager: 'Entrepreneurial',
  ux_ui_designer: 'Creative',
  digital_marketer: 'Creative',
  management_consultant: 'Hybrid',
  hr_manager: 'Hybrid',
  supply_chain_manager: 'Hybrid',
  financial_analyst: 'Financial',
  actuary: 'Financial',
  psychologist: 'Research',
  journalist: 'Creative',
  event_manager: 'Creative',
  fashion_designer: 'Creative',
  chef: 'Creative',
  hotel_manager: 'Hybrid',
  teacher: 'Other',
  marine_biologist: 'Research',
  space_scientist: 'Research',
  research_scientist: 'Research',
  esports_professional: 'Other',
  diplomat_international_relations: 'Hybrid',
  yoga_wellness_instructor: 'Other',
  nurse: 'Research',
  performing_artist: 'Creative',
};

// Replace id: "...", with id: "...",\n    category: "...",
content = content.replace(/id:\s*"([^"]+)",/g, (match, id) => {
  const category = map[id] || 'Other';
  return `${match}\n    category: "${category}",`;
});

// Also let's inject a contingency into Data Scientist
content = content.replace(
  `{ name: "Algorithms & AI Models", skills: ["Machine Learning", "Deep Learning", "NLP"], topResource: "Andrew Ng's ML + Fast.ai", timeMonths: 6 },`,
  `{ name: "Algorithms & AI Models", skills: ["Machine Learning", "Deep Learning", "NLP"], topResource: "Andrew Ng's ML + Fast.ai", timeMonths: 6, contingency: "If math gets too abstract: Pivot to Data Engineering (focus on SQL/Cloud)." },`
);

fs.writeFileSync('lib/career-database.ts', content, 'utf8');
