# MedGuard AI — Smarter Medicine Verification. Safer Decisions.

[![Alibaba Cloud](https://img.shields.io/badge/Alibaba%20Cloud-Qwen--VL-orange)](https://www.alibabacloud.com/)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4.19-green)](https://expressjs.com/)
[![Language](https://img.shields.io/badge/Bilingual-English%20%7C%20%D8%A7%D8%B1%D8%AF%D9%88-emerald)](https://github.com/)

**MedGuard AI** is an AI-powered medicine information and packaging-risk assessment platform designed especially for users in Pakistan. Built for the Alibaba Cloud x AlKhidmat Foundation Hackathon, MedGuard AI helps users search for reliable educational medicine details, analyze photos of medicine packaging using AI vision, and understand health information in both **English and Urdu (with complete RTL support)**.

---

## 📌 Core Features

1. **Medicine Search (Function A)**: Structured educational information for medicines registered in Pakistan covering 16 detailed sections including Uses, Mechanism, General Dosage, Precautions, Side Effects, Drug Interactions, Contraindications, Storage, Overdose Emergency Advice, and Sources.
2. **Packaging Risk Assessment (Function B)**: Computer vision packaging check using Alibaba Cloud Qwen-VL (`qwen3-vl-plus`) to analyze visible label typography, manufacturer details, batch numbers, and expiry stamps.
3. **Bilingual English & Urdu (RTL)**: Dynamic interface direction switching (`dir="rtl"` for Urdu and `dir="ltr"` for English) with natural Pakistani Urdu medical terminology.
4. **Safe Demo Mode**: Interactive fallback simulation when API keys are absent, clearly labeled with `"DEMO MODE — SIMULATED RESULT — NOT AI ANALYSIS"`.
5. **Strict Safety & Disclaimers**: Clear non-counterfeit disclaimers (`"Packaging analysis cannot confirm authenticity."`) and dosage safety warnings (`"General dosage information — not a personalized prescription."`).

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite 5, React Router DOM 6, Lucide Icons, Vanilla CSS Design System with RTL & Dark Mode support.
- **Backend**: Node.js, Express, Cors, Multer, Dotenv.
- **AI Engine**: Alibaba Cloud Model Studio OpenAI-compatible API (`qwen-plus` for text analysis, `qwen3-vl-plus` for vision packaging analysis).

---

## 📁 Project Structure

```
c:/Users/USR K/Desktop/anti/
├── server/
│   ├── index.js                    # Express server entrypoint
│   ├── routes/
│   │   ├── health.js               # GET /api/health
│   │   ├── search.js               # POST /api/search-medicine
│   │   └── analyze.js              # POST /api/analyze
│   ├── services/
│   │   ├── qwenService.js          # Alibaba Cloud Qwen API client
│   │   └── mockService.js          # Safe Demo Mode simulation service
│   └── data/
│       └── curatedMedicines.js     # Curated Pakistani reference data
├── src/
│   ├── main.jsx                    # React DOM entrypoint
│   ├── App.jsx                     # Router & layout wrapper
│   ├── index.css                   # Healthcare CSS design tokens & RTL styles
│   ├── context/
│   │   └── LanguageContext.jsx     # i18n, RTL & Theme Provider
│   ├── translations/
│   │   ├── en.js                   # English UI strings
│   │   └── ur.js                   # Urdu UI strings (اردو)
│   ├── components/
│   │   ├── Navbar.jsx              # Header navigation & language switcher
│   │   ├── Footer.jsx              # Footer & medical disclaimers
│   │   ├── DisclaimerBanner.jsx    # Safety alert banner
│   │   ├── RiskBadge.jsx           # Packaging risk level badge
│   │   ├── MedicineCard.jsx        # 16-section structured medicine view
│   │   └── ScanResultView.jsx      # Packaging risk visualizer view
│   └── pages/
│       ├── HomePage.jsx            # Hero banner & main action cards
│       ├── SearchPage.jsx          # Medicine search page with quick chips
│       ├── ScanPage.jsx            # Packaging photo upload & scanner
│       └── AboutPage.jsx           # Mission & platform safety principles
├── package.json                    # Full-stack dependencies & scripts
├── vite.config.js                  # Vite configuration & dev API proxy
├── .env.example                    # Environment configuration template
└── test_backend.js                 # API endpoint verification script
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory (copy from `.env.example`):
```env
PORT=5000
FRONTEND_ORIGIN=http://localhost:5173
DASHSCOPE_API_KEY=YOUR_ALIBABA_DASHSCOPE_API_KEY
DASHSCOPE_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
ALIBABA_VISION_MODEL=qwen3-vl-plus
ALIBABA_TEXT_MODEL=qwen-plus
```

*Note: If `DASHSCOPE_API_KEY` is left blank, MedGuard AI automatically operates in safe interactive **Demo Mode**.*

---

## 💻 Running Locally

### Start Backend Express API
```bash
npm run server
```
*Backend runs on `http://localhost:5000`*

### Start Frontend Vite App (in a second terminal)
```bash
npm run dev
```
*Frontend runs on `http://localhost:5173`*

### Or Run Both Concurrently
```bash
npm run dev:all
```

---

## 🧪 Local Testing

Run automated API test suite:
```bash
node test_backend.js
```

### Tested Endpoints:
1. `GET /api/health` — Health check endpoint.
2. `POST /api/search-medicine` — Returns structured 16-section medicine info (Panadol, Aspirin, Ibuprofen, Amoxicillin, Nuberol Forte, or AI search).
3. `POST /api/analyze` — Evaluates packaging images and returns risk level (`LOW_CONCERN`, `NEEDS_VERIFICATION`, `HIGH_CONCERN`), observations, concerns, and verification recommendations.

---

## 🌐 Deployment Instructions

### Independent Backend Deployment (e.g. Render / Railway / ECS)
- Build command: `npm install`
- Start command: `node server/index.js`
- Set environment variables: `PORT`, `DASHSCOPE_API_KEY`, `DASHSCOPE_BASE_URL`, `ALIBABA_VISION_MODEL`, `ALIBABA_TEXT_MODEL`, `FRONTEND_ORIGIN`.

### Independent Frontend Deployment (e.g. Vercel / Netlify)
- Build command: `npm run build`
- Output directory: `dist`
- Set environment variable: `VITE_API_URL=https://your-backend-api-domain.com`

---

## ⚖️ Medical Safety Principles

- **No Medical Advice**: MedGuard AI provides general educational reference information only.
- **No Counterfeit Claims**: Image analysis cannot confirm authenticity. It highlights visible anomalies and recommends professional verification.
- **No Calculated Prescriptions**: Dosage details are strictly non-personalized.

---

## 🏆 Hackathon Demo Flow

1. **Opening Landing Page**: Show the modern healthcare interface in English. Point out the Alibaba Cloud x AlKhidmat Foundation hackathon badge.
2. **Medicine Search Demo**: Click **Search Medicine**, search for **Panadol**. Show the 16 structured sections, active ingredients, dosage safety warning, and verified sources.
3. **Urdu & RTL Toggle**: Click **اردو** in the top navbar. Demonstrate how the interface smoothly flips to right-to-left (RTL) layout with natural Pakistani Urdu text.
4. **AI Packaging Scanner Demo**: Navigate to **Scan Medicine** (دوا اسکین کریں). Click **Quick Demo** (تصویر بنائیں / فوری ڈیمو). Show the Risk Assessment Visualizer, Risk Badge (`LOW CONCERN`), AI observations, concerns, and safety disclaimers.
