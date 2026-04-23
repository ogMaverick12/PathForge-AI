<div align="center">

# ⚡ PathForge AI

### The Most Intelligent Career Decision Engine for Students

[![MIT License](https://img.shields.io/badge/License-MIT-6c63ff.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg)](https://typescriptlang.org)
[![Cloudflare Pages](https://img.shields.io/badge/Deployed_on-Cloudflare_Pages-f38020.svg)](https://pages.cloudflare.com)

**Stop guessing your future. PathForge AI evaluates your goals, constraints, and reality to generate personalized, actionable career paths — with integrated scholarship intelligence.**

[Live Demo](#) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## 🎯 What is PathForge AI?

PathForge AI is a **client-side career decision engine** built for students in India and globally. It takes your academic profile, goals, constraints, and dream job — then runs multiple intelligence engines to generate:

- **3 Ranked Career Paths** (Safe · Balanced · Aggressive)
- **Brutally Honest Reality Check** — no sugarcoating
- **Phase-by-Phase Execution Roadmap**
- **Scholarship Intelligence Report** — personalized funding strategies
- **Financial Gap Analysis** — cost vs. scholarship coverage

> 🔒 **100% client-side.** Your data never leaves your browser. No accounts. No tracking. No API calls.

---

## 🧠 Intelligence Engines

| Engine | Purpose |
|--------|---------|
| **Decision Engine** | Multi-factor scoring (Probability, ROI, Stress, Goal Alignment) for 15+ careers |
| **Reality Engine** | Detects profile mismatches — effort, budget, timeline, skill gaps |
| **Dream Job Interpreter** | NLP fuzzy matching with Levenshtein distance for typo/synonym handling |
| **Roadmap Generator** | Domain-aware, phase-based execution planning |
| **Scholarship Engine** | 5-factor matching across 22 real scholarships with strategy generation |

### Scholarship Matching Algorithm

```
match_score = (academic_fit × 0.30) + (financial_need_fit × 0.25) +
              (profile_strength × 0.20) + (goal_alignment × 0.15) +
              (competition_level × 0.10)
```

Scholarships are ranked into **High Chance**, **Moderate**, and **Reach** tiers.

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| State | Zustand |
| Styling | Vanilla CSS (glassmorphism, dark mode) |
| Deployment | Cloudflare Pages (static export) |
| Fonts | Space Grotesk + Inter (Google Fonts) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/pathforge-ai.git
cd pathforge-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build static export
npm run build

# Output is in the /out directory — ready for deployment
```

---

## ☁️ Cloudflare Pages Deployment

### Option 1: Git Integration (Recommended)

1. Push this repo to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com)
3. Connect your GitHub repository
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Node.js version:** `18`
5. Deploy

### Option 2: Direct Upload

```bash
npm run build
npx wrangler pages deploy out --project-name=pathforge-ai
```

---

## 📂 Project Structure

```
pathforge-ai/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Landing page
│   │   ├── layout.tsx               # Root layout + SEO
│   │   ├── globals.css              # Design system
│   │   └── forge/
│   │       ├── page.tsx             # 7-step wizard
│   │       └── results/
│   │           └── page.tsx         # Results dashboard
│   ├── components/
│   │   └── wizard/
│   │       ├── Step1Academic.tsx     # Academic profile
│   │       ├── Step2Constraints.tsx  # Budget, location, risk
│   │       ├── Step3Goals.tsx        # Goals + profile boosters
│   │       ├── Step4DreamJob.tsx     # Dream job interpreter
│   │       ├── Step5Sports.tsx      # Sports career input
│   │       ├── Step6Commitment.tsx  # Commitment level
│   │       └── Step7Review.tsx      # Review & submit
│   ├── lib/
│   │   ├── types.ts                 # All TypeScript interfaces
│   │   ├── career-database.ts       # 15+ career definitions
│   │   ├── scholarship-database.ts  # 22 real scholarships
│   │   ├── decision-engine.ts       # Career scoring engine
│   │   ├── reality-engine.ts        # Mismatch detection
│   │   ├── dream-job-interpreter.ts # NLP fuzzy matching
│   │   ├── roadmap-generator.ts     # Phase-based planning
│   │   └── scholarship-engine.ts    # Scholarship intelligence
│   └── stores/
│       └── forge-store.ts           # Zustand state management
├── public/
│   └── _headers                     # Cloudflare security headers
├── next.config.ts                   # Static export config
├── package.json
├── tsconfig.json
└── LICENSE
```

---

## 🎓 Scholarship Database

Includes 22 real scholarships across 5 regions:

| Region | Scholarships |
|--------|-------------|
| 🇮🇳 India | INSPIRE, KVPY, NTSE, CSSS, IIT Fee Waiver, AICTE Pragati, PM Vidyalakshmi |
| 🇺🇸 USA | Fulbright-Nehru, Knight-Hennessy, MIT Financial Aid |
| 🇬🇧 UK | Commonwealth, Chevening, Gates Cambridge, Rhodes |
| 🇪🇺 Europe | DAAD (Germany), Erasmus Mundus |
| 🌍 Global | Aga Khan Foundation, JN Tata, Inlaks, SAI TOPS |

---

## 🔒 Security

- **Zero data collection** — all computation happens in-browser
- **No API calls** — no external services contacted
- **No cookies or tracking** — fully privacy-respecting
- **CSP headers** — Content Security Policy enforced
- **X-Frame-Options: DENY** — prevents clickjacking
- **No personal data stored** — state exists only in memory

---

## ⚠️ Disclaimer

PathForge AI is an educational tool designed to assist students in career exploration. It does **not**:

- Guarantee admission to any institution
- Guarantee any scholarship award
- Replace professional career counseling
- Store or transmit any personal data

Match scores, probabilities, and recommendations are **estimates** based on publicly available data and should be verified independently.

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Areas for Contribution

- Adding more careers to `career-database.ts`
- Expanding the scholarship database
- Improving the matching algorithms
- Adding new wizard steps
- UI/UX improvements
- Internationalization (i18n)

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

<div align="center">

**Built with ⚡ by students, for students.**

</div>
