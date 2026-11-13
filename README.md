# TrekPulse AI Upgrade — Contextual Mountain Intelligence

> **Contextual AI Intelligence woven directly into high-altitude mountain marketplace & Guide Ops workflows.**

TrekPulse introduces three high-utility Gemini AI workflows woven directly into its existing mobile marketplace and Guide Ops screens. Instead of adding a generic chatbot tab, AI intelligence appears right at the point of decision—helping guides draft complete traveller-tailored treks from a brief sentence, matching trekkers to the right Himalayan routes, and generating personalized acclimatization and packing guidance.

---

## 🏔️ 3 Flagship Gemini AI Workflows

### 1. AI Trip Builder from Traveller Prompt (Guide Ops → Create)
- **Problem Solved**: Manually drafting an expedition (camp-by-camp itinerary, elevation profile, gear requirements, pricing) takes 45+ minutes on mobile.
- **AI Solution**: Guides enter a brief traveller sentence (e.g. *"5 IT folks from Pune in December, moderate fitness, want snow & views under ₹11k"*) or tap starter prompt chips.
- **Output**: Generates a structured JSON draft that instantly populates the editable builder form:
  - Trek title, highlight, region, and difficulty
  - Safe daily altitude thresholds and camp-by-camp itinerary
  - Accurate pricing in INR (₹)
  - Must-pack vs basecamp rental gear list
- Guides can review, tweak inline, and tap **"Publish Trek to Marketplace"** (`#7EC845`), making it immediately discoverable by trekkers.

### 2. Trekker AI Fit Matcher (Trekker → Explore)
- **Problem Solved**: Trekkers struggle to evaluate whether a route matches their physical fitness, budget, or timeline.
- **AI Solution**: A High-Pass Indigo (`#5046E4`) action pill on Explore opens a slide-up drawer (`rounded-t-3xl`).
- **Live Grounding**: Evaluates the live expeditions catalog (including newly host-published custom treks) based on:
  - Trekker fitness (Beginner / Moderate / Advanced)
  - Max duration (3–4 Days / 5–6 Days / 7+ Days)
  - Budget range & custom goals (e.g. *"First snow trek in Dec with lake camping"*)
- **Output**: Ranked matches with a 1-line **"Why it fits"** reason and an essential **Caution note** with 1-tap navigation directly to Expedition Details.

### 3. Contextual Trail Q&A & Personalized Gear/Altitude Advisor (Detail & Gear Screens)
- **Trail Q&A Sheet**: A route-grounded assistant pre-seeded with tap-to-ask chips (*"Is Diamox needed?"*, *"Best camera views?"*, *"How steep is summit day?"*, *"Will my phone get signal?"*). Answers are strictly grounded in that trek's altitude profile, daily camps, and terrain.
- **Gear & Altitude Advisor**: Asks two quick inputs (*Prior Max Altitude* and *Cold Sensitivity*) and computes:
  - Tailored acclimatization pacing advice specific to that trek's highest camp;
  - Clinical altitude safety tips (hydration rate, symptom recognition, ascent rules);
  - Priority gear breakdown distinguishing **Must Pack** (bring own) vs **Rent at Basecamp** (economical local rental) with clinical reasoning.

---

## 🎨 Visual Identity & Mobile Ergonomics

- **Color Discipline**:
  - **High-Pass Indigo (`#5046E4`)**: Reserved for AI intelligence triggers, verified guide authority, and focused states.
  - **Alpine Flora Green (`#7EC845`)**: Dedicated to primary publish and booking confirmations.
  - **Alpenglow Amber (`#FF9F1C`)**: Highlights altitude numbers and mountain safety cautions.
- **Mobile Showcase Shell**:
  - Embedded in a 390×844 mobile showcase frame with status bar, dynamic island, and zero-clutter navigation under the 15% viewport height budget.
  - Desktop showcase bar features direct jump shortcuts to all 3 AI workflows and a mobile mockup frame toggle.

---

## 🛠️ Technical Architecture

```text
┌──────────────────────────────────────────────────────────────────────┐
│                  TrekPulse Mobile UI (390×844 Shell)                 │
├──────────────────────┬───────────────────────┬───────────────────────┤
│ Guide Create Screen  │ Explore Match Sheet   │ Detail Q&A & Advisor  │
│ "Draft with AI"      │ "Find My Trek Fit"    │ "Ask Trail AI" /      │
│                      │                       │ "Personalize Prep"    │
└──────────┬───────────┴───────────┬───────────┴───────────┬───────────┘
           │ POST /api/ai/         │ POST /api/ai/         │ POST /api/ai/
           │ generate-trek         │ match-treks           │ trail-advisor
           ▼                       ▼                       ▼
┌──────────────────────────────────────────────────────────────────────┐
│              Express Server (server.ts · Port 3000)                  │
│   • Vite dev middleware (dev) / static dist serving (prod)           │
│   • @google/genai SDK (gemini-2.5-flash / gemini-4-hydrogen)         │
│   • Structured JSON responseSchema validation                        │
│   • Intelligent high-fidelity fallback when API key is unconfigured  │
└──────────────────────────────────┬───────────────────────────────────┘
                                   │ Structured Typed JSON
                                   ▼
┌──────────────────────────────────────────────────────────────────────┐
│             Unified TrekPulse State Store (React Context)            │
│   • Pre-fills editable Create Trek form -> Publish to Marketplace    │
│   • Highlights ranked matches -> Jump to Expedition Detail           │
│   • Displays grounded Q&A answers & personalized gear/altitude plan  │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start & Local Run

### Prerequisites
- Node.js v18+ (tested on v24.22)
- npm or pnpm

### 1. Installation
```bash
git clone https://github.com/apoorv15verma/TrekPulse-.git
cd TrekPulse-
npm install
```

### 2. Configure Environment (Optional)
Create a `.env` file in the project root:
```env
# Optional: Provide Gemini API key for live Gemini 2.5 Flash calls.
# If omitted or invalid, the server automatically runs in intelligent mock mode!
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

### 3. Start Development Server
```bash
npm run dev
```

Visit **`http://localhost:3000`** in your browser.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check & Gemini live status |
| `POST` | `/api/ai/generate-trek` | Drafts a complete expedition from a guide/traveller prompt |
| `POST` | `/api/ai/match-treks` | Matches trekker fitness, days & budget against live catalog |
| `POST` | `/api/ai/trail-qna` | Grounded multi-turn trail Q&A assistant |
| `POST` | `/api/ai/prep-advisor` | Personalized acclimatization & gear checklist advisor |

---

## 📜 License
MIT License. Built with passion for Himalayan trekking safety and guide enablement.
