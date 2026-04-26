// ============================================================
// PATHFORGE AI — GLOBAL INSTITUTION DATABASE (v4 — Diversity Expansion)
// ============================================================

export interface GlobalInstitution {
  id: string;
  name: string;
  country: string;
  city: string;
  region: string;
  tier: 1 | 2 | 3;
  type: "government" | "private" | "deemed" | "global";
  careers: string[];
  fees_per_year_inr: number;
  fees_currency: string;
  fees_original: number;
  ranking_note: string;
  cutoff_description: string;
  placement_median_inr: number;
  notable_for: string;
  scholarship_available: boolean;
  intake_month: string;
  website: string;
}

export const EAST_ASIA_INSTITUTIONS: GlobalInstitution[] = [
  { id: "u_tokyo", name: "University of Tokyo (UTokyo)", country: "Japan", city: "Tokyo", region: "other_asia", tier: 1, type: "global", careers: ["research_scientist", "software_engineer", "architect_urban_planner", "space_scientist"], fees_per_year_inr: 600000, fees_currency: "JPY", fees_original: 535800, ranking_note: "QS World #28", cutoff_description: "Japanese N2 + entrance exam OR English programs", placement_median_inr: 5000000, notable_for: "Japan's #1 university. MEXT scholarship covers full fees + ¥117,000/month stipend.", scholarship_available: true, intake_month: "April / September", website: "u-tokyo.ac.jp" },
  { id: "kaist", name: "KAIST (Korea Advanced Institute)", country: "South Korea", city: "Daejeon", region: "other_asia", tier: 1, type: "global", careers: ["software_engineer", "data_scientist", "research_scientist", "space_scientist"], fees_per_year_inr: 400000, fees_currency: "KRW", fees_original: 6000000, ranking_note: "QS World #42", cutoff_description: "Strong STEM background + English", placement_median_inr: 3500000, notable_for: "South Korea's MIT. Samsung, LG, Hyundai recruit directly.", scholarship_available: true, intake_month: "March / September", website: "kaist.ac.kr" },
  { id: "national_taiwan_u", name: "National Taiwan University (NTU)", country: "Taiwan", city: "Taipei", region: "other_asia", tier: 1, type: "global", careers: ["software_engineer", "research_scientist", "data_scientist"], fees_per_year_inr: 200000, fees_currency: "TWD", fees_original: 90000, ranking_note: "QS World #65", cutoff_description: "Strong academics + English", placement_median_inr: 2800000, notable_for: "Extremely affordable. TSMC recruits here.", scholarship_available: true, intake_month: "September", website: "ntu.edu.tw" },
  { id: "peking_u", name: "Peking University", country: "China", city: "Beijing", region: "other_asia", tier: 1, type: "global", careers: ["research_scientist", "policy_analyst", "management_consultant"], fees_per_year_inr: 180000, fees_currency: "CNY", fees_original: 16000, ranking_note: "QS World #12", cutoff_description: "Chinese HSK 5 or English program + CSC scholarship", placement_median_inr: 2500000, notable_for: "China's most prestigious university. CSC scholarship covers full fees + ¥2500/month.", scholarship_available: true, intake_month: "September", website: "pku.edu.cn" },
];

export const NORDIC_INSTITUTIONS: GlobalInstitution[] = [
  { id: "lund_university", name: "Lund University", country: "Sweden", city: "Lund", region: "europe", tier: 1, type: "global", careers: ["research_scientist", "environmental_scientist", "data_scientist", "social_worker"], fees_per_year_inr: 1500000, fees_currency: "SEK", fees_original: 175000, ranking_note: "QS World #79", cutoff_description: "Strong academics + English B2", placement_median_inr: 5500000, notable_for: "Scandinavia's highest-paying job market.", scholarship_available: true, intake_month: "September", website: "lu.se" },
  { id: "u_oslo", name: "University of Oslo", country: "Norway", city: "Oslo", region: "europe", tier: 1, type: "global", careers: ["marine_biologist", "research_scientist", "environmental_scientist", "social_worker"], fees_per_year_inr: 0, fees_currency: "NOK", fees_original: 0, ranking_note: "QS World #135 — tuition-FREE for all nationalities", cutoff_description: "Strong academics + Norwegian B2", placement_median_inr: 6000000, notable_for: "TUITION FREE for all nationalities including Indians.", scholarship_available: true, intake_month: "August", website: "uio.no" },
  { id: "aalto_u", name: "Aalto University", country: "Finland", city: "Helsinki", region: "europe", tier: 1, type: "global", careers: ["architect_urban_planner", "graphic_designer", "interior_designer", "data_scientist"], fees_per_year_inr: 500000, fees_currency: "EUR", fees_original: 5000, ranking_note: "QS World #115 — QS Design #12", cutoff_description: "Portfolio/academics + English B2", placement_median_inr: 4500000, notable_for: "Aalto design school is world-famous. Nokia, KONE recruit here.", scholarship_available: true, intake_month: "September", website: "aalto.fi" },
  { id: "kth", name: "KTH Royal Institute of Technology", country: "Sweden", city: "Stockholm", region: "europe", tier: 1, type: "global", careers: ["software_engineer", "data_scientist", "electrician_electrical_engineer", "civil_engineer"], fees_per_year_inr: 1500000, fees_currency: "SEK", fees_original: 175000, ranking_note: "QS World #98", cutoff_description: "Strong STEM + English B2", placement_median_inr: 5500000, notable_for: "Sweden's top tech university. Ericsson, Spotify, Klarna recruit from KTH.", scholarship_available: true, intake_month: "September", website: "kth.se" },
];

export const LATAM_INSTITUTIONS: GlobalInstitution[] = [
  { id: "usp_brazil", name: "University of São Paulo (USP)", country: "Brazil", city: "São Paulo", region: "latam", tier: 2, type: "global", careers: ["research_scientist", "environmental_scientist", "filmmaker"], fees_per_year_inr: 0, fees_currency: "BRL", fees_original: 0, ranking_note: "QS World #101 — #1 in Latin America", cutoff_description: "Portuguese proficiency + FUVEST exam", placement_median_inr: 1500000, notable_for: "Free tuition. Largest university in Latin America.", scholarship_available: true, intake_month: "March", website: "usp.br" },
  { id: "unam_mexico", name: "UNAM Mexico City", country: "Mexico", city: "Mexico City", region: "latam", tier: 2, type: "global", careers: ["research_scientist", "policy_analyst", "journalist"], fees_per_year_inr: 0, fees_currency: "MXN", fees_original: 0, ranking_note: "QS World #105", cutoff_description: "Spanish proficiency + entrance exam", placement_median_inr: 1200000, notable_for: "Essentially free tuition. 3 Nobel Prize alumni.", scholarship_available: true, intake_month: "August", website: "unam.mx" },
];

export const MIDDLE_EAST_INSTITUTIONS: GlobalInstitution[] = [
  { id: "kaust", name: "KAUST (King Abdullah University)", country: "Saudi Arabia", city: "Thuwal", region: "middle_east", tier: 1, type: "global", careers: ["research_scientist", "environmental_scientist", "data_scientist", "marine_biologist"], fees_per_year_inr: 0, fees_currency: "USD", fees_original: 0, ranking_note: "QS World #148 — fully funded for ALL students", cutoff_description: "Strong STEM UG + research experience — FULLY FUNDED with stipend", placement_median_inr: 0, notable_for: "FULLY FUNDED — tuition + housing + health + $20,000/year stipend for ALL students.", scholarship_available: true, intake_month: "August", website: "kaust.edu.sa" },
  { id: "aust_dubai", name: "American University of Sharjah", country: "UAE", city: "Sharjah", region: "middle_east", tier: 2, type: "global", careers: ["software_engineer", "architect_urban_planner", "management_consultant"], fees_per_year_inr: 1500000, fees_currency: "AED", fees_original: 72000, ranking_note: "QS Arab World #6", cutoff_description: "Strong academics + English", placement_median_inr: 3000000, notable_for: "Tax-free UAE salary after graduation.", scholarship_available: true, intake_month: "September", website: "aus.edu" },
];

export const AFRICA_INSTITUTIONS: GlobalInstitution[] = [
  { id: "u_cape_town", name: "University of Cape Town (UCT)", country: "South Africa", city: "Cape Town", region: "africa", tier: 1, type: "global", careers: ["research_scientist", "environmental_scientist", "social_worker", "lawyer"], fees_per_year_inr: 400000, fees_currency: "ZAR", fees_original: 80000, ranking_note: "QS World #226 — #1 in Africa", cutoff_description: "Strong academics + IELTS 6.5", placement_median_inr: 1500000, notable_for: "Africa's best university. Low fees, high quality.", scholarship_available: true, intake_month: "February", website: "uct.ac.za" },
  { id: "alu", name: "African Leadership University (ALU)", country: "Rwanda/Mauritius", city: "Kigali/Port Louis", region: "africa", tier: 2, type: "global", careers: ["entrepreneur", "social_worker", "management_consultant"], fees_per_year_inr: 1200000, fees_currency: "USD", fees_original: 15000, ranking_note: "Forbes-featured innovative institution", cutoff_description: "Strong profile + essays + interview", placement_median_inr: 2000000, notable_for: "Africa-focused entrepreneurship education.", scholarship_available: true, intake_month: "September", website: "alueducation.com" },
];

export const SPECIALTY_INSTITUTIONS: GlobalInstitution[] = [
  { id: "unitec_nz", name: "Unitec New Zealand (Animation/Design)", country: "New Zealand", city: "Auckland", region: "australia", tier: 2, type: "global", careers: ["animator", "graphic_designer", "filmmaker"], fees_per_year_inr: 2200000, fees_currency: "NZD", fees_original: 38000, ranking_note: "NZ's top applied technology institution", cutoff_description: "Portfolio + application + IELTS 6.0", placement_median_inr: 3000000, notable_for: "Weta Workshop (Lord of the Rings VFX) partnership.", scholarship_available: true, intake_month: "February / July", website: "unitec.ac.nz" },
  { id: "full_sail", name: "Full Sail University (Game Design/Film)", country: "United States", city: "Winter Park, FL", region: "usa", tier: 2, type: "global", careers: ["game_developer", "filmmaker", "musician", "animator", "esports_professional"], fees_per_year_inr: 3000000, fees_currency: "USD", fees_original: 30000, ranking_note: "Top game/film production school USA", cutoff_description: "Portfolio + application", placement_median_inr: 2500000, notable_for: "Industry-standard equipment. Disney, EA, Universal nearby.", scholarship_available: true, intake_month: "Monthly intake", website: "fullsail.edu" },
  { id: "sae_institute", name: "SAE Institute (Global — 54 campuses)", country: "Global", city: "Multiple continents", region: "global", tier: 2, type: "global", careers: ["musician", "filmmaker", "animator", "game_developer"], fees_per_year_inr: 1500000, fees_currency: "Local", fees_original: 0, ranking_note: "World's largest creative media institution", cutoff_description: "Portfolio + application", placement_median_inr: 2000000, notable_for: "Campuses in Sydney, London, Berlin, Dubai, Mumbai.", scholarship_available: true, intake_month: "Multiple intakes", website: "sae.edu" },
  { id: "ecole42", name: "École 42 (Paris/Multiple cities)", country: "France/Global", city: "Paris + 50 cities", region: "europe", tier: 1, type: "global", careers: ["software_engineer", "cybersecurity_engineer", "game_developer"], fees_per_year_inr: 0, fees_currency: "EUR", fees_original: 0, ranking_note: "NO teachers, NO tuition — peer learning only", cutoff_description: "4-week 'Piscine' selection — no degree required", placement_median_inr: 4000000, notable_for: "COMPLETELY FREE — no tuition, no fees, ever. Graduates hired by FAANG.", scholarship_available: false, intake_month: "Multiple cohorts", website: "42.fr" },
  { id: "minerva_university", name: "Minerva University", country: "USA (nomadic)", city: "San Francisco + 6 global cities", region: "usa", tier: 1, type: "global", careers: ["management_consultant", "entrepreneur", "policy_analyst", "data_scientist"], fees_per_year_inr: 3000000, fees_currency: "USD", fees_original: 30000, ranking_note: "Most selective university in USA (1.2% acceptance)", cutoff_description: "Pure problem-solving assessment — no SAT/GRE", placement_median_inr: 6000000, notable_for: "Students rotate through 7 cities in 4 years. Need-blind financial aid.", scholarship_available: true, intake_month: "September", website: "minerva.edu" },
];

import parsedInstitutions from './parsed_institutions.json';

export const ALL_GLOBAL_INSTITUTIONS: GlobalInstitution[] = [
  ...EAST_ASIA_INSTITUTIONS,
  ...NORDIC_INSTITUTIONS,
  ...LATAM_INSTITUTIONS,
  ...MIDDLE_EAST_INSTITUTIONS,
  ...AFRICA_INSTITUTIONS,
  ...SPECIALTY_INSTITUTIONS,
  ...(parsedInstitutions as any[]).map(p => ({
    id: p.name.toLowerCase().replace(/[^a-z0-9]/g, '_'),
    name: p.name,
    country: p.state === "India" ? "India" : p.state,
    city: p.city,
    region: p.state === "India" ? "india" : "global",
    tier: p.tier as 1 | 2,
    type: p.type as "global" | "private" | "government" | "deemed",
    careers: p.careers,
    fees_per_year_inr: p.fees_per_year || 0,
    fees_currency: "INR",
    fees_original: p.fees_per_year || 0,
    ranking_note: "",
    cutoff_description: p.cutoff_description,
    placement_median_inr: typeof p.placement_median === 'string' && p.placement_median.includes('LPA') ? parseInt(p.placement_median) * 100000 : 0,
    notable_for: p.cutoff_description,
    scholarship_available: false,
    intake_month: "August",
    website: ""
  }))
];
