# SchemeShortsAI - Implementation Plan

SchemeShortsAI is a modern, high-engagement web platform delivering government, financial, and welfare schemes in bite-sized, reels-style "shorts" with instant eligibility checks, bookmarking, and discovery.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following product specifications were confirmed during the interactive interview:
> - **Category Scope**: Multi-category coverage spanning Citizen Welfare, Education & Scholarships, Healthcare, Startups & MSME, Agriculture, and Senior Citizens.
> - **Entry Experience**: Branded SchemeShortsAI opening splash screen with an interactive "Get Started" action transitioning cleanly into the primary workspace.
> - **Presentation Engine**: Full-screen reels-style shorts mode alongside a responsive dashboard grid view, complete with swipe/arrow navigation, key takeaways, eligibility checks, and audio narration.

---

## 1. Overview & Core Concept

- **What It Does**: SchemeShortsAI translates complex, bureaucratic government and financial welfare schemes into concise, 60-second digestible "shorts" with clear bullet benefits, required documents, deadline warnings, and interactive eligibility scoring.
- **Target Audience / Persona**: Students, job-seekers, small business owners, farmers, senior citizens, and general citizens searching for financial aid, grants, and social welfare programs without digging through hundreds of pages of legal documentation.
- **Key Value**: Replaces 20-page scheme gazettes with high-impact, visual, bite-sized summaries accessible in seconds.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Splash Screen Reveal**:
   - High-contrast, polished hero splash screen featuring the **SchemeShortsAI** brand mark with an animated shield/sparkle icon, live counter of active schemes, and an interactive **"Get Started"** button.
   - Smooth transition into the main dashboard application. Option to return to splash via brand click or reset.

2. **Top Dashboard Navigation**:
   - Pinned, ergonomic top dashboard header featuring:
     - **Home**: Discover schemes across all categories with search, category tabs, and toggle between "Reels / Shorts Mode" (immersive vertical swipeable player) and "Catalog Grid Mode".
     - **Last Viewed**: Chronological history tracking recently opened schemes with relative timestamps (e.g. "Viewed 5m ago") and resume playback.
     - **Interested**: Curated wishlist of saved schemes with application deadline alerts, required document checklists, and application links.
   - Live category filter pills and interactive search bar with instant query matching.

3. **Shorts Experience & Scheme Detail View**:
   - Each scheme is structured like an interactive Short:
     - Big benefit figure (e.g., *₹5,00,000 Health Coverage*, *100% Tuition Waiver*, *₹10 Lakh Collateral-Free Loan*).
     - 3 key bullet points: Who gets it, How much aid, and Application deadline.
     - Interactive controls: **Interested / Bookmark** button, **Mark as Viewed**, **Check My Eligibility**, **Text-to-Speech Audio Reader**, and **Official Portal Link**.
     - Detailed slide-over drawer with full eligibility criteria, required documents list, and step-by-step application instructions.

### Visual Identity & Theme
- **Aesthetic Direction**: High-trust modern civic-tech dashboard; clean, approachable, and responsive.
- **Color Palette**:
  - Dominant Neutral (60%): Clean crisp slate background (`#0B0F19` in dark mode / `#F8FAFC` in light mode).
  - Structural Surface (30%): Elevated card containers (`#111827` / `#FFFFFF`) with hairline slate borders (`border-slate-800` / `border-slate-200`).
  - Accent Budget (10%): Vibrant Emerald & Indigo accents (`#10B981` & `#6366F1`) for primary calls-to-action, high-intent badges, and active tab indicators.
- **Typography**: `Plus Jakarta Sans` for titles and crisp interface labels; `font-mono tabular-nums` for grant amounts, coverage numbers, and deadlines. Zero pill clutter on static metadata.

---

## 3. Key Product Decisions & Trade-Offs

- **Reels Player + Catalog Dual Presentation**:
  - *Chosen Approach*: Provide both an immersive vertical Shorts viewer (auto-advancing, swipeable, arrow keys) and a structured responsive catalog grid.
  - *Why*: Users looking for quick entertainment-style discovery love the shorts reel; users doing targeted research prefer scanning a grid with search filters.
- **Client-Side History & Interested Store**:
  - *Chosen Approach*: Persist `lastViewed` and `interested` lists via `localStorage` with fallback default seed states.
  - *Why*: Instant reactivity, zero latency, offline availability, and privacy-first storage without requiring login.
- **Interactive Eligibility Simulator**:
  - *Chosen Approach*: Built-in eligibility quiz widget (Occupation, Age, Annual Income, State/Region) that calculates a live match score against scheme rules.
  - *Why*: Solves the biggest user complaint with schemes ("Am I actually eligible?").

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                       SchemeShortsAI                        │
├─────────────────────────────────────────────────────────────┤
│  [Splash Screen] ─────────── (Get Started) ───────────────┐ │
│                                                           ▼ │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Top Dashboard Header                                  │  │
│  │ [SchemeShortsAI Wordmark]  [Home] [Last Viewed] [Interested] │
│  └───────────────────────────────────────────────────────┘  │
│                               │                             │
│         ┌─────────────────────┼─────────────────────┐       │
│         ▼                     ▼                     ▼       │
│   ┌───────────┐         ┌───────────┐         ┌───────────┐ │
│   │   Home    │         │Last Viewed│         │Interested │ │
│   │  Catalog  │         │  History  │         │ Bookmarks │ │
│   │     &     │         │  Timeline │         │ & Deadlines││
│   │Shorts Feed│         └───────────┘         └───────────┘ │
│   └─────┬─────┘                                             │
│         ▼                                                   │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ Scheme Drawer Modal & Eligibility Calculator          │ │
│   └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Data Model & Schemas

```typescript
export interface Scheme {
  id: string;
  title: string;
  ministryOrOrg: string;
  category: 'welfare' | 'education' | 'healthcare' | 'startup_msme' | 'agriculture' | 'senior_citizen';
  headlineBenefit: string;
  summaryIn60s: string;
  keyBullets: string[];
  eligibility: {
    ageRange: [number, number];
    occupations: string[];
    maxIncomeLakhsPerYear?: number;
    description: string;
  };
  requiredDocuments: string[];
  deadline: string;
  officialLink: string;
  beneficiaryCount: string;
}
```

### State Store & Interactive Handlers

- `viewMode`: `'splash' | 'dashboard'`
- `dashboardTab`: `'home' | 'last_viewed' | 'interested'`
- `feedMode`: `'shorts' | 'grid'`
- `activeShortIndex`: `number` (current index in vertical reels player)
- `lastViewedIds`: `string[]` (persisted in local storage, updated on scheme view)
- `interestedIds`: `string[]` (persisted in local storage, toggled by user)
- `activeFilterCategory`: `string | 'all'`
- `searchQuery`: `string`
- `selectedSchemeForModal`: `Scheme | null`
- `eligibilityInputs`: `{ age: number, occupation: string, income: number }`

---

## 5. Implementation Steps (Upon Approval)

1. **Metadata & HTML Setup**: Update `metadata.json` and `index.html` with SchemeShortsAI branding.
2. **Curated Multi-Category Scheme Dataset**: Seed rich, authentic government and public welfare schemes across Agriculture, Healthcare, Education, Startups/MSME, Social Security, and Citizen Aid.
3. **Interactive Splash Component**: Build animated `SchemeShortsAI` splash screen with stat counter and "Get Started" transition.
4. **Dashboard Header Navigation**: Implement the top bar containing brand wordmark and responsive single-line buttons: **Home**, **Last Viewed**, and **Interested**, plus search and category filters.
5. **Shorts Player & Catalog Views**: Build the vertical reels viewer with keyboard/touch navigation, audio narration (SpeechSynthesis), and scheme cards with instant interest toggles.
6. **Last Viewed & Interested Dedicated Views**: Build chronological history with resume links and bookmark manager with export/checklist features.
7. **Interactive Eligibility Checker Drawer**: Modal showing full eligibility breakdown, required documents checklist, and instant match scoring.
8. **Verification**: Run `compile_applet` and test all interactive event handlers.
