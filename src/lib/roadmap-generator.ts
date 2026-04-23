// ============================================================
// PATHFORGE AI — ROADMAP GENERATOR
// ============================================================

import { Career, StudentProfile, RoadmapPhase } from './types';

export function generateRoadmap(
  profile: StudentProfile,
  career: Career
): RoadmapPhase[] {
  const domain = career.domain;
  const commitment = profile.goals.commitment_level;
  const currentClass = profile.academic.current_class;

  if (domain === 'sports') return generateSportsRoadmap(profile, career);
  if (domain === 'medical') return generateMedicalRoadmap(profile, career);
  if (domain === 'government_law') return generateGovRoadmap(profile, career);
  if (domain === 'arts_creative') return generateCreativeRoadmap(profile, career);
  return generateTechBusinessRoadmap(profile, career);
}

// ─── TECH / BUSINESS / EMERGING ──────────────────────────────

function generateTechBusinessRoadmap(
  profile: StudentProfile,
  career: Career
): RoadmapPhase[] {
  const cls = profile.academic.current_class;
  const phases: RoadmapPhase[] = [];

  if (cls <= 10) {
    phases.push({
      label: 'Phase 1 — Foundation',
      duration: `Class ${cls} → 10 (${10 - cls + 1} year${10 - cls > 0 ? 's' : ''})`,
      milestones: [
        'Score 80%+ in Class 10 Board exams',
        'Complete 1 online course (Python / Finance basics)',
        'Identify top coaching center or study resources',
        'Build habit of 4h focused study/day',
      ],
      skills_to_learn: ['Mathematics', 'Programming Basics', 'English Communication'],
      decision_checkpoints: ['Stream selection (PCM / PCB / Commerce) — critical decision'],
    });
  }

  phases.push({
    label: `Phase ${phases.length + 1} — Preparation (Class 11–12)`,
    duration: '2 years',
    milestones: [
      `Target 85%+ in Class 11 mid-exams`,
      'Begin exam-specific coaching (JEE/CLAT/CAT foundation)',
      'Attempt 2+ mock tests per month by Class 12',
      'Build a basic project or portfolio in your chosen domain',
      'Register for exam by November (Class 12)',
    ],
    skills_to_learn: career.required_skills.slice(0, 3),
    exams: career.required_exams.map(e => `${e.name} (Difficulty: ${e.difficulty}/10)`),
    decision_checkpoints: ['Final exam preparation strategy', 'Coaching vs self-study decision'],
  });

  phases.push({
    label: `Phase ${phases.length + 1} — Entry & Growth (Year 1–3 of College)`,
    duration: '3 years',
    milestones: [
      'Enroll in target institution',
      'Secure 1–2 internships in relevant field by Year 2',
      'Join clubs, competitions, or student organizations',
      'Build 3+ real-world projects for portfolio',
      'Network with industry professionals (LinkedIn)',
    ],
    skills_to_learn: career.required_skills,
    decision_checkpoints: ['Specialization track (Year 2)', 'Internship conversion decision'],
  });

  phases.push({
    label: `Phase ${phases.length + 1} — Execution & Establishment`,
    duration: `Year ${career.years_to_establish - 1}–${career.years_to_establish}`,
    milestones: [
      'Land first full-time role at target company/field',
      'Hit ₹10–15 LPA salary milestone (tech) or equivalent',
      'Develop specialized expertise in 1–2 sub-domains',
      'Begin building professional reputation',
    ],
    skills_to_learn: ['Leadership', 'Negotiation', 'Advanced Specialization'],
    decision_checkpoints: ['Higher education (MS/MBA) vs industry?', 'Startup vs corporate?'],
  });

  return phases;
}

// ─── MEDICAL ─────────────────────────────────────────────────

function generateMedicalRoadmap(
  profile: StudentProfile,
  career: Career
): RoadmapPhase[] {
  const cls = profile.academic.current_class;
  const phases: RoadmapPhase[] = [];

  if (cls <= 10) {
    phases.push({
      label: 'Phase 1 — Early Foundation',
      duration: `Until Class 10 (${10 - cls} years)`,
      milestones: [
        'Score 85%+ with focus on Science & Biology',
        'Join Biology Olympiad or science competitions',
        'NCERT mastery for all science subjects',
        'Explore anatomy, human biology books',
      ],
      skills_to_learn: ['Biology', 'Chemistry', 'Physics Basics'],
      decision_checkpoints: ['Choose PCB stream in Class 11'],
    });
  }

  phases.push({
    label: `Phase ${phases.length + 1} — NEET Preparation (Class 11–12)`,
    duration: '2 years',
    milestones: [
      'Join NEET coaching (Allen/Aakash/Physics Wallah) by Class 11',
      'Complete NCERT 3 full times by February (Class 12)',
      'Solve 50+ NEET previous year questions per week',
      'Attempt ALLEN/Aakash AIY Test Series',
      'Target 600+ in NEET mock tests by April',
    ],
    exams: ['NEET-UG (Difficulty: 8/10)', 'AIIMS Entrance (if applicable)'],
    skills_to_learn: ['Biology (Zoology + Botany)', 'Organic Chemistry', 'Physics for NEET'],
    decision_checkpoints: ['Choose NEET attempt year', 'Drop year vs direct attempt strategy'],
  });

  phases.push({
    label: `Phase ${phases.length + 1} — MBBS (5.5 Years)`,
    duration: '5.5 years',
    milestones: [
      'Enroll in MBBS program',
      'Complete Pre-clinical subjects (Anatomy, Physiology, Biochemistry)',
      'Clinical rotations: Surgery, Medicine, Pediatrics, Gynecology',
      'Complete 1-year compulsory rotating internship',
      'Prepare for NEET-PG by final year',
    ],
    skills_to_learn: ['Clinical Diagnosis', 'Patient Communication', 'Medical Procedures'],
    exams: ['Professional exams each phase (1st, 2nd, 3rd Prof)'],
    decision_checkpoints: ['Specialization choice (NEET-PG)', 'Superspeciality (DM/MCh)?'],
  });

  phases.push({
    label: `Phase ${phases.length + 1} — Residency & Specialization`,
    duration: '3 years',
    milestones: [
      'Crack NEET-PG for MD/MS residency',
      'Complete specialty training',
      'Build patient portfolio and publications',
      'Begin private practice or hospital role',
    ],
    skills_to_learn: ['Specialty Expertise', 'Research & Publication', 'Hospital Administration'],
    decision_checkpoints: ['Private practice vs hospital vs academics'],
  });

  return phases;
}

// ─── GOVERNMENT / LAW ─────────────────────────────────────────

function generateGovRoadmap(
  profile: StudentProfile,
  career: Career
): RoadmapPhase[] {
  return [
    {
      label: 'Phase 1 — Academic Foundation',
      duration: 'Class 11–12 (2 years)',
      milestones: [
        'Score 75%+ in boards (UPSC has no minimum % but it matters for optionals)',
        'Start newspaper reading daily (The Hindu / Indian Express)',
        'Build general knowledge habit with monthly current affairs',
        'Clear concept of Indian History, Polity & Geography',
      ],
      skills_to_learn: ['Current Affairs', 'Essay Writing', 'Critical Analysis'],
      decision_checkpoints: ['Choose graduation stream wisely (History, PSIR, Geography most popular)'],
    },
    {
      label: 'Phase 2 — Graduation + Foundation Prep',
      duration: '3 years',
      milestones: [
        'Complete graduation (History/Political Science/Public Admin)',
        'Join UPSC foundation batch in Year 2',
        'Cover NCERT 6–12 for all subjects',
        'Practice answer writing weekly (250 words)',
        'Attempt 1 UPSC Prelims (even if unprepared — for experience)',
      ],
      exams: ['UPSC Prelims (Annual)', 'State PSC (optional parallel)'],
      skills_to_learn: ['GS Paper 1–4', 'CSAT', 'Optional Subject Mastery'],
      decision_checkpoints: ['Choose UPSC Optional Subject (critical decision)'],
    },
    {
      label: 'Phase 3 — Main Attempt & Interview',
      duration: '1–2 years',
      milestones: [
        'Clear Prelims with 110+ cutoff',
        'Write 20+ full-length mains answer booklets',
        'Develop interview readiness (DAF analysis, current affairs)',
        'Join test series (Insights/ForumIAS)',
      ],
      exams: ['UPSC Mains (Written)', 'UPSC Personality Test (Interview)'],
      skills_to_learn: ['Mains Writing', 'Ethics & Integrity Frameworks', 'Interview Preparation'],
      decision_checkpoints: ['All-India Rank determines service allocation'],
    },
    {
      label: 'Phase 4 — Service & Establishment',
      duration: '2 years',
      milestones: [
        'Complete Foundation Course at LBSNAA',
        'District training (for IAS)',
        'First posting as Assistant Collector or equivalent',
        'Begin building administrative reputation',
      ],
      skills_to_learn: ['Administration', 'Public Policy', 'Leadership'],
    },
  ];
}

// ─── CREATIVE / DESIGN ────────────────────────────────────────

function generateCreativeRoadmap(
  profile: StudentProfile,
  career: Career
): RoadmapPhase[] {
  return [
    {
      label: 'Phase 1 — Skill Building',
      duration: 'Next 12 months',
      milestones: [
        'Learn Figma + Adobe XD (for design) OR Video tools (for creative)',
        'Complete 1 paid online course (DesignLab, Coursera, or Udemy)',
        'Build first portfolio piece (redesign an existing app)',
        'Study 10+ great designs/creations daily for inspiration',
      ],
      skills_to_learn: ['Design Tools', 'Visual Theory', 'Typography', 'Color Theory'],
      decision_checkpoints: ['Choose specialization: UX, Graphics, Film, or Content Creation'],
    },
    {
      label: 'Phase 2 — Portfolio & Education',
      duration: '2–3 years',
      milestones: [
        'Enroll in NID/IDC/Design school (or strong online alternative)',
        'Build 5+ strong portfolio projects',
        'Win 1–2 design competitions or hackathons',
        'Get first client/freelance project',
      ],
      skills_to_learn: ['Advanced Design', 'UX Research', 'Prototyping', 'Brand Strategy'],
      exams: career.required_exams.map(e => e.name),
      decision_checkpoints: ['Agency vs Product company vs Freelance?'],
    },
    {
      label: 'Phase 3 — Career Launch',
      duration: '2 years',
      milestones: [
        'Land internship at reputed design studio or tech company',
        'Convert internship to full-time offer',
        'Build LinkedIn portfolio and case studies',
        'Aim for ₹8–15 LPA in first full-time role',
      ],
      skills_to_learn: ['Client Communication', 'Negotiation', 'Advanced Tools'],
      decision_checkpoints: ['Startup vs established company for first role?'],
    },
  ];
}

// ─── SPORTS ──────────────────────────────────────────────────

function generateSportsRoadmap(
  profile: StudentProfile,
  career: Career
): RoadmapPhase[] {
  const level = profile.sports.current_level ?? 'beginner';
  return [
    {
      label: 'Phase 1 — Elite Training Foundation',
      duration: 'Next 12 months',
      milestones: [
        'Join a certified, high-quality coach immediately',
        'Structure daily training: 5–6 hours minimum',
        'Participate in every district-level competition available',
        'Track performance metrics weekly',
        'Begin nutrition & recovery protocol',
      ],
      skills_to_learn: ['Sport-Specific Technical Skills', 'Strength & Conditioning', 'Mental Toughness'],
      decision_checkpoints: ['Evaluate progression at 6 months — is coaching working?'],
    },
    {
      label: `Phase 2 — Competitive Exposure (${level === 'district' || level === 'beginner' ? 'District → State' : 'State → National'})`,
      duration: '2 years',
      milestones: [
        'Win medals at district/state level competitions',
        'Get registered with state sports association',
        'Attend national-level trials',
        'Build injury prevention protocol',
        'Complete backup education (distance/open university)',
      ],
      skills_to_learn: ['Advanced Techniques', 'Competition Strategy', 'Recovery Protocols'],
      decision_checkpoints: ['Alternative sports quota college admission (Year 2)'],
    },
    {
      label: 'Phase 3 — Professional Entry',
      duration: '3 years',
      milestones: [
        'Achieve national-level selection or professional contract',
        'Secure sports scholarship or SAI TOPS scheme support',
        'Work with performance analysts and sports scientists',
        'Build brand/social media presence (parallel income)',
      ],
      skills_to_learn: ['Performance Analytics', 'Media & Personal Branding', 'Sports Psychology'],
      decision_checkpoints: ['Pursue Coach/Management backup qualification simultaneously?'],
    },
    {
      label: 'Phase 4 — Backup Integration (Mandatory)',
      duration: 'Parallel throughout',
      milestones: [
        'Complete a graduation degree (correspondence) in Sports Science or Commerce',
        'Build coaching certification',
        'Document all achievements for sports management/journalism pivot if needed',
      ],
      skills_to_learn: ['Sports Management', 'Media Communication', 'Coaching Basics'],
    },
  ];
}
