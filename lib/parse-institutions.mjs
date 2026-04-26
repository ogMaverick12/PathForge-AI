import fs from 'fs';
import path from 'path';

const markdown = fs.readFileSync(path.join(process.cwd(), 'pathforge_institution_database.md'), 'utf-8');

const lines = markdown.split('\n');

let currentSection = '';
let currentSubsection = '';
let currentRegionOrTier = '';
let isParsingTable = false;
let headers = [];

const parsedInstitutions = [];

const cleanValue = (str) => str.trim().replace(/\|$/, '').trim();

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  if (line.startsWith('## SECTION')) {
    currentSection = line;
  } else if (line.startsWith('####')) {
    currentRegionOrTier = line;
  } else if (line.startsWith('###')) {
    currentSubsection = line;
  } else if (line.startsWith('|')) {
    if (!isParsingTable) {
      if (line.includes('---')) continue; // separator
      headers = line.split('|').filter(Boolean).map(h => h.trim().toLowerCase());
      if (headers.length > 0 && !headers[0].includes('---')) {
        isParsingTable = true;
      }
    } else {
      if (line.includes('---')) continue;
      const values = line.split('|').filter(Boolean).map(cleanValue);
      if (values.length === 0) {
        isParsingTable = false;
        continue;
      }
      
      const entry = {};
      for (let j = 0; j < headers.length; j++) {
        if (values[j]) {
          entry[headers[j]] = values[j];
        }
      }

      // Process entry
      const name = entry['institution'] || entry['body'] || entry['institution/resource'] || entry['certification'];
      if (name && !name.toLowerCase().includes('coaching') && !name.toLowerCase().includes('---')) {
        let tier = 2;
        if (currentRegionOrTier.toLowerCase().includes('tier 1') || currentRegionOrTier.toLowerCase().includes('elite')) tier = 1;
        if (currentRegionOrTier.toLowerCase().includes('tier 3')) tier = 3;

        let type = "private";
        if (currentRegionOrTier.toLowerCase().includes('global') || entry['country'] && entry['country'].toLowerCase() !== 'india') {
          type = "global";
        } else if (currentRegionOrTier.toLowerCase().includes('govt') || currentRegionOrTier.toLowerCase().includes('government') || (entry['notes'] && entry['notes'].toLowerCase().includes('govt'))) {
          type = "government";
        }

        let fees = 0;
        const rawFee = entry['annual fee (inr)'] || entry['annual fee'] || entry['annual cost (inr)'] || entry['annual cost'] || entry['fee (inr)'] || entry['fee'] || entry['total cost (inr)'] || entry['cost (inr)'] || entry['cost'];
        if (rawFee) {
            const matches = rawFee.replace(/,/g, '').match(/\d+/);
            if (matches) fees = parseInt(matches[0]);
            if (rawFee.toLowerCase().includes('l') || rawFee.toLowerCase().includes('lakhs')) {
                fees *= 100000;
            }
        }

        const placement = entry['median placement'] || entry['outcome'] || "Variable";
        const cutoff = entry['entrance'] || entry['notes'] || "Merit/Entrance";

        const title = currentSubsection.toLowerCase();
        let careers = [];
        if (title.includes('computer science') || title.includes('ai')) careers.push('software_engineer', 'data_scientist');
        if (title.includes('core engineering')) careers.push('mechanical_engineer', 'electrician_electrical_engineer', 'civil_engineer');
        if (title.includes('space')) careers.push('commercial_pilot', 'space_scientist', 'marine_biologist');
        if (title.includes('medical')) careers.push('doctor_medicine', 'dentist', 'nurse');
        if (title.includes('architecture')) careers.push('architect_urban_planner', 'graphic_designer', 'interior_designer', 'animator');
        if (title.includes('business')) careers.push('chartered_accountant', 'investment_banker', 'management_consultant', 'entrepreneur');
        if (title.includes('law')) careers.push('lawyer', 'civil_servant_ias', 'diplomat_international_relations');
        if (title.includes('performing arts')) careers.push('musician', 'filmmaker', 'journalist', 'cricketer', 'esports_professional', 'yoga_wellness_instructor');

        if (careers.length === 0) {
            // fallback
            careers.push(currentSubsection.replace(/#/g, '').trim());
        }

        parsedInstitutions.push({
          name: name.replace(/\*/g, '').trim(),
          tier: tier,
          city: "Various",
          state: entry['country'] || "India",
          fees_per_year: fees,
          cutoff_description: cutoff,
          placement_median: placement,
          type: type,
          careers: careers
        });
      }
    }
  } else {
    isParsingTable = false;
  }
}

fs.writeFileSync(path.join(process.cwd(), 'lib', 'parsed_institutions.json'), JSON.stringify(parsedInstitutions, null, 2));
console.log(`Parsed ${parsedInstitutions.length} institutions into lib/parsed_institutions.json`);
