# ⚡ PathForge AI — Career Intelligence Engine

> Stop guessing your future. PathForge evaluates your grades, goals, budget, and reality to generate three ranked career paths with real institutions and scholarship intelligence.

**Official Product of Vi-Bit Technologies.**

---

## Tech Stack

| Layer          | Technology                                  |
|----------------|---------------------------------------------|
| Framework      | Next.js 16 (App Router, Turbopack)          |
| Language       | TypeScript (strict)                         |
| Database       | Prisma + Supabase (PostgreSQL)              |
| Auth           | Clerk Authentication                        |
| AI Engine      | NVIDIA NIM (Llama-3.1-70b-Instruct)         |
| State          | Zustand with `persist` middleware           |
| Styling        | Vanilla CSS (design system in globals.css)  |
| Fonts          | Bebas Neue · DM Sans · JetBrains Mono       |

---

## Architecture

```
app/
├── api/                      ← Backend API routes (AI generation, RAG)
├── forge/
│   ├── page.tsx              ← 6-step wizard with integrated branding
│   └── results/page.tsx      ← AI-powered career report
├── dashboard/                ← User persistence & tracking
├── layout.tsx                ← Global layout with top-left brand anchor
└── globals.css               ← Full design system (ember/dark forge aesthetic)

prisma/
└── schema.prisma             ← Database schema for career paths & users

public/
└── icons/                    ← PathForge AI & Vi-Bit official icons
```

---

## Getting Started

### 1. Environment Configuration
Create a `.env.local` file with the following keys:
```env
# AI Intelligence
NVIDIA_API_KEY=your_key_here

# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key

# Database
DATABASE_URL="your_supabase_pooler_url"
DIRECT_URL="your_supabase_direct_url"
```

### 2. Installation & Database Setup
```bash
npm install
npx prisma generate
npx prisma db push
```

### 3. Development
```bash
npm run dev    # → http://localhost:3000
```

---

## Deployment (Vercel)

PathForge AI is optimized for Vercel. 

1. **Connect GitHub**: Push your code and import the repository.
2. **Environment Variables**: Add all keys from your `.env.local` to the Vercel project settings.
3. **Build Settings**: The app is configured with a `postinstall` script to automatically generate the Prisma client on every deployment.

---

## Core Engines

### 1. AI Reasoning Layer
Powered by NVIDIA's high-inference engines, PathForge interprets complex, qualitative dream inputs and maps them to high-entropy career branches.

### 2. Multi-Factor Probability Calculator
Scores: marks fit (40%) + stream fit (30%) + budget fit (20%) + base (10%) + trend bonus ± penalties.

### 3. Reality Check Engine (Brutal Honesty)
Generates specific flags for budget gaps, salary arbitrage opportunities, and actual survival odds in competitive fields.

---

## Privacy & Persistence

PathForge AI now supports persistent career memory via **Clerk** and **Supabase**. Your data is securely stored and accessible across devices, while maintaining our core principle of user-controlled privacy.

---

**Built by Vi-Bit Technologies.** ⚡
*Solving problems smarter, faster, and better.*
)
```

---

## Privacy

PathForge stores **nothing** on any server. All computation happens in your browser. Your profile is stored in `localStorage` under `pathforge-v3-store`. Clear your browser data to reset.

---

Built for students, by students. ⚡
