// ============================================================
// PATHFORGE AI — SCHOLARSHIP DATABASE (v3 — 12 Real Scholarships)
// ============================================================

export interface Scholarship {
  id: string;
  name: string;
  org: string;
  value: string;
  renewable: string;
  criteria: {
    streams?: string[];
    minMarks?: number;
    maxIncome?: number | null;
    classLevel?: string[];
    abroadRequired?: boolean;
    gender?: "female" | "male";
  };
  matchFactors: string[];
  url: string;
  deadline: string;
  competitionLevel: "low" | "moderate" | "high" | "elite";
  region: "india" | "usa" | "uk" | "europe" | "global";
  description: string;
}

export const SCHOLARSHIPS: Scholarship[] = [
  {
    id: "inspire",
    name: "INSPIRE Scholarship",
    org: "DST, Govt of India",
    value: "₹80,000/year",
    renewable: "5 years",
    criteria: { streams: ["PCM", "PCB"], minMarks: 80, classLevel: ["11", "12", "Dropper"] },
    matchFactors: ["science_stream", "high_marks", "india_study"],
    url: "https://inspire-dst.gov.in",
    deadline: "October (tentative)",
    competitionLevel: "moderate",
    region: "india",
    description: "For top 1% students in class 12 science boards pursuing natural/basic sciences."
  },
  {
    id: "kvpy",
    name: "KVPY Fellowship",
    org: "Indian Institute of Science",
    value: "₹5,000–7,000/month",
    renewable: "5 years",
    criteria: { streams: ["PCM", "PCB"], minMarks: 85, classLevel: ["11", "12"] },
    matchFactors: ["science_stream", "high_marks", "research_interest"],
    url: "https://kvpy.iisc.ac.in",
    deadline: "August",
    competitionLevel: "high",
    region: "india",
    description: "For students pursuing basic sciences (B.Sc./B.S./B.Stat./B.Math./Int. M.Sc./M.S.)."
  },
  {
    id: "pm_vidyalakshmi",
    name: "PM Vidyalakshmi Scheme",
    org: "Ministry of Education, India",
    value: "Full tuition loan with 3% interest subsidy",
    renewable: "Full course duration",
    criteria: { minMarks: 60, maxIncome: 800000 },
    matchFactors: ["low_budget", "india_study", "loan_open"],
    url: "https://www.vidyalakshmi.co.in",
    deadline: "Rolling / Post-admission",
    competitionLevel: "low",
    region: "india",
    description: "Central government education loan portal covering top 860 institutions."
  },
  {
    id: "aicte_pragati",
    name: "AICTE Pragati Scholarship",
    org: "AICTE, Govt of India",
    value: "₹50,000/year",
    renewable: "4 years",
    criteria: { streams: ["PCM"], minMarks: 60, maxIncome: 800000, gender: "female" },
    matchFactors: ["female_student", "engineering_stream", "low_budget"],
    url: "https://www.aicte-pragati-saksham-gov.in",
    deadline: "December",
    competitionLevel: "moderate",
    region: "india",
    description: "For girl students in technical education (B.Tech/Diploma). 4000 scholarships awarded."
  },
  {
    id: "iit_fee_waiver",
    name: "IIT Need-Based Fee Waiver",
    org: "IITs (all campuses)",
    value: "Full tuition waiver + ₹1,000/month stipend",
    renewable: "Full B.Tech duration",
    criteria: { streams: ["PCM"], minMarks: 90, maxIncome: 500000 },
    matchFactors: ["iit_target", "low_budget", "high_marks"],
    url: "https://www.iitsystem.ac.in",
    deadline: "Post-admission",
    competitionLevel: "low",
    region: "india",
    description: "Any IIT student with family income under ₹5L gets full fee waiver automatically."
  },
  {
    id: "jn_tata",
    name: "JN Tata Endowment",
    org: "JN Tata Endowment Trust",
    value: "₹10–20L (loan scholarship)",
    renewable: "1 year (renewable)",
    criteria: { minMarks: 75, abroadRequired: true },
    matchFactors: ["abroad_open", "postgrad_target", "high_achiever"],
    url: "https://www.jntataendowment.org",
    deadline: "March",
    competitionLevel: "high",
    region: "global",
    description: "For Indian students pursuing higher education abroad. 150 scholars selected annually."
  },
  {
    id: "inlaks",
    name: "Inlaks Shivdasani Scholarship",
    org: "Inlaks Shivdasani Foundation",
    value: "Up to $100,000 (covers tuition + living)",
    renewable: "Full program",
    criteria: { minMarks: 80, abroadRequired: true, maxIncome: null },
    matchFactors: ["abroad_open", "elite_academics", "global_dream"],
    url: "https://www.inlaksfoundation.org",
    deadline: "April",
    competitionLevel: "elite",
    region: "global",
    description: "For exceptional Indian students (under 30) admitted to top global universities."
  },
  {
    id: "chevening",
    name: "Chevening Scholarship",
    org: "UK Government (FCDO)",
    value: "Full funding (UK Masters)",
    renewable: "1 year (Masters)",
    criteria: { minMarks: 75, abroadRequired: true },
    matchFactors: ["uk_target", "leadership_profile", "abroad_open"],
    url: "https://www.chevening.org",
    deadline: "November",
    competitionLevel: "elite",
    region: "uk",
    description: "UK's flagship scholarship for future global leaders. 1,800 scholars/year worldwide."
  },
  {
    id: "gates_cambridge",
    name: "Gates Cambridge Scholarship",
    org: "Bill & Melinda Gates Foundation",
    value: "Full funding (Cambridge Postgrad)",
    renewable: "Full program",
    criteria: { minMarks: 90, abroadRequired: true },
    matchFactors: ["cambridge_target", "research_interest", "elite_academics"],
    url: "https://www.gatescambridge.org",
    deadline: "October",
    competitionLevel: "elite",
    region: "uk",
    description: "For outstanding postgrad students at University of Cambridge. One of the world's most competitive."
  },
  {
    id: "daad",
    name: "DAAD Scholarship (Germany)",
    org: "German Academic Exchange Service",
    value: "€850–1,200/month + benefits",
    renewable: "Full program duration",
    criteria: { minMarks: 70, abroadRequired: true },
    matchFactors: ["germany_open", "postgrad_target", "abroad_open"],
    url: "https://www.daad.in",
    deadline: "October–December",
    competitionLevel: "high",
    region: "europe",
    description: "For Indian students pursuing Masters/PhD in Germany. Many programs are fully English-medium."
  },
  {
    id: "fulbright_nehru",
    name: "Fulbright-Nehru Fellowship",
    org: "USIEF",
    value: "Full funding (USA Masters/Research)",
    renewable: "Full program",
    criteria: { minMarks: 80, abroadRequired: true },
    matchFactors: ["usa_target", "research_interest", "abroad_open", "postgrad_target"],
    url: "https://www.usief.org.in",
    deadline: "July",
    competitionLevel: "elite",
    region: "usa",
    description: "The US government's flagship scholarship. Covers Masters and Research at US universities."
  },
  {
    id: "aga_khan",
    name: "Aga Khan Foundation Scholarship",
    org: "Aga Khan Foundation",
    value: "50% grant + 50% loan (full cost)",
    renewable: "Full program",
    criteria: { minMarks: 75, maxIncome: 500000, abroadRequired: true },
    matchFactors: ["low_budget", "abroad_open", "postgrad_target"],
    url: "https://www.akdn.org/our-agencies/aga-khan-foundation/scholarships",
    deadline: "March",
    competitionLevel: "high",
    region: "global",
    description: "For outstanding students with exceptional promise but limited financial means."
  },
  {
    id: "mext_japan",
    name: "MEXT Scholarship (Japan)",
    org: "Japanese Government (MEXT)",
    value: "Full tuition + ¥117,000/month + flights",
    renewable: "Full program (2–5 years)",
    criteria: { minMarks: 75, abroadRequired: true },
    matchFactors: ["japan_interest", "research_interest", "abroad_open"],
    url: "https://www.studyinjapan.go.jp/en/smap-stopj-applications-scholarship.html",
    deadline: "April (via Embassy)",
    competitionLevel: "high",
    region: "global",
    description: "Japanese government's flagship scholarship. Covers tuition, living, and flights for research/UG/PG students."
  },
  {
    id: "csc_china",
    name: "CSC Scholarship (China)",
    org: "China Scholarship Council",
    value: "Full tuition + ¥2,500–3,500/month + insurance",
    renewable: "Full program",
    criteria: { minMarks: 70, abroadRequired: true },
    matchFactors: ["china_interest", "research_interest", "abroad_open", "low_budget"],
    url: "https://www.campuschina.org",
    deadline: "January–April",
    competitionLevel: "moderate",
    region: "global",
    description: "Fully funded scholarship for international students at Chinese universities including Peking, Tsinghua."
  },
  {
    id: "erasmus_mundus",
    name: "Erasmus Mundus Joint Masters",
    org: "European Union",
    value: "€1,400/month + tuition waiver + travel",
    renewable: "Full Masters (1–2 years)",
    criteria: { minMarks: 75, abroadRequired: true },
    matchFactors: ["europe_open", "abroad_open", "postgrad_target"],
    url: "https://erasmus-plus.ec.europa.eu",
    deadline: "October–January",
    competitionLevel: "high",
    region: "europe",
    description: "Study in 2+ European countries with full EU funding. 100+ joint Masters programs available."
  },
  {
    id: "kgsp_korea",
    name: "KGSP Scholarship (South Korea)",
    org: "Korean Government",
    value: "Full tuition + ₩900,000/month + flights + insurance",
    renewable: "Full program (4–6 years incl. Korean language)",
    criteria: { minMarks: 70, abroadRequired: true },
    matchFactors: ["korea_interest", "abroad_open", "low_budget"],
    url: "https://www.studyinkorea.go.kr",
    deadline: "February–March",
    competitionLevel: "moderate",
    region: "global",
    description: "Korean government scholarship covering Korean language training + UG/PG at top Korean universities including KAIST, SNU."
  }
];

