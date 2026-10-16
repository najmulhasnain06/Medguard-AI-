# MedGuard AI 🛡️💊

> **AI-Powered Medicine Packaging Verification & Anti-Counterfeit Safety Shield**  
> *Developed with Alibaba Cloud Model Studio (`qwen3-vl-plus` & `qwen-plus`), React, and Express.*

---

## 📌 Overview

**MedGuard AI** is a specialized pharmaceutical visual screening web application designed to combat counterfeit and substandard medicines. Frontline patients and healthcare dispensers can upload or capture photographs of medicine boxes, blister foils, and labels to detect potential packaging irregularities, typographical flaws, smudged lot numbers, or missing regulatory markers.

### Core Ethical & Safety Tenets
1. **Not a Medical Diagnosis:** MedGuard AI does not evaluate personal health conditions or diagnose diseases.
2. **Not a Personalized Prescription:** MedGuard AI does not calculate dosages or recommend medication regimens.
3. **Authenticity Cannot Be Guaranteed From an Image Alone:** Physical chemical integrity requires laboratory testing. Visual inspection identifies red flags and prompts verification with licensed pharmacists or regulatory authorities (e.g., DRAP).

---

## 🚀 Tech Stack

- **Frontend:**
  - React 18 + Vite 6
  - React Router 6 (Client-side routing)
  - Vanilla CSS (Responsive healthcare design system with native Urdu RTL support)
  - Lucide React (Clean medical UI icons)
- **Backend:**
  - Node.js 20+ & Express 4
  - Multer (In-memory multipart image processing for JPG, JPEG, PNG, WEBP)
  - CORS & dotenv
- **Alibaba Cloud Model Studio (DashScope):**
  - **Vision Model:** `qwen3-vl-plus` (Multi-modal visual inspection of pharmaceutical packaging)
  - **Text Model:** `qwen-plus` (Pharmaceutical knowledge retrieval & safety verification)
  - OpenAI-compatible API endpoint integration
- **Fallback Simulation:**
  - Automatic, seamless **Demo Mode** fallback whenever the Alibaba API key is not configured or network access is restricted.

---

## 🎯 Key Features

1. **Home Page:**
   - Visual safety hero section and 3-step inspection overview.
   - Quick one-click demo specimens (Authentic Panadol, Nuberol Forte, Suspected Irregular pack).
   - Complete guide to the three risk classifications.
2. **Medicine Search Directory:**
   - Real-time search and category filtering (Pain & Fever, Muscle Relaxants, NSAIDs, Antibiotics).
   - Curated reference records with DRAP registration codes for:
     - **Panadol** (GlaxoSmithKline - 500mg)
     - **Aspirin** (Bayer - Cardio / Regular)
     - **Ibuprofen** (Brufen / Abbott - 200mg/400mg)
     - **Paracetamol** (Generic / Calpol / Disprol)
     - **Nuberol Forte** (Searle - 650mg/50mg)
     - **Amoxicillin** (Amoxil / GSK - 250mg/500mg)
   - Packaging security checklists, red flag warning signs, storage requirements, and warnings.
   - Direct link to inspect packaging for any searched medicine.
3. **Packaging Image Upload & Inspection:**
   - Drag-and-drop or file picker supporting JPG, JPEG, PNG, and WEBP (up to 10MB).
   - In-memory base64 conversion sent securely through the Express backend to Alibaba Qwen Vision.
   - Laser scanner animation during inspection.
4. **Structured Inspection Safety Report:**
   - Clearly labeled mode badge (**LIVE AI: Alibaba Qwen3-VL-Plus** or **DEMO MODE: Simulated Result**).
   - **Risk Levels:**
     - 🟢 `LOW_CONCERN`
     - 🟡 `NEEDS_VERIFICATION`
     - 🔴 `HIGH_CONCERN`
   - Confidence score indicator.
   - 5-point verification checklist (Batch/Lot number, Expiration date, DRAP registration, Packaging seal/hologram, Typography & graphic alignment).
   - Visual observations and actionable safety recommendations.
   - Prominent medical & regulatory disclaimer box.
   - Print & PDF-export friendly layout.
5. **Full English & Urdu Bilingual Support:**
   - Complete localization across all UI elements, checklists, observations, and disclaimers.
   - Native Urdu Right-to-Left (RTL) layout with tailored typography.
   - Instant language toggle in navbar.

---

## 🔌 Backend API Endpoints

### 1. `GET /api/health`
Returns service status, model configuration, and live/demo mode indicator.
```json
{
  "status": "ok",
  "service": "MedGuard AI Backend",
  "alibaba_api_configured": true,
  "mode": "LIVE_ALIBABA_CLOUD",
  "models": {
    "vision": "qwen3-vl-plus",
    "text": "qwen-plus"
  },
  "timestamp": "2026-10-07T04:25:00.000Z"
}
```

### 2. `POST /api/search-medicine`
Searches curated reference database or queries `qwen-plus`.
- **Request Body:**
  ```json
  {
    "query": "panadol",
    "lang": "en"
  }
  ```

### 3. `POST /api/analyze`
Multipart form upload of medicine packaging image.
- **Fields:**
  - `image` (file): JPG, JPEG, PNG, or WEBP image.
  - `medicineName` (text, optional): User-provided medicine name.
  - `notes` (text, optional): User observations or purchase location.
  - `lang` (text, optional): `'en'` or `'ur'`.

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v18 or newer)
- npm

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd "Medguard AI"
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Open `.env` and configure your Alibaba Cloud Model Studio credentials:
```env
PORT=5000
DASHSCOPE_API_KEY=your_actual_dashscope_api_key_here
DASHSCOPE_BASE_URL=https://dashscope-intl.aliyuncs.com/compatible-mode/v1
QWEN_VISION_MODEL=qwen3-vl-plus
QWEN_TEXT_MODEL=qwen-plus
```

> **Note on Security:** The Alibaba API key is **only** used on the Node/Express backend and is **never** exposed to client-side code.  
> If `DASHSCOPE_API_KEY` is not set or invalid, MedGuard AI will run in safe, fully functional **Demo Mode**.

---

## 🏃 Running the Application

### Start the Backend Server
```bash
npm run server
```
*The Express server runs on `http://localhost:5000`.*

### Start the Frontend Development Server
In a separate terminal:
```bash
npm run dev
```
*Vite launches on `http://localhost:5173` with automated API proxy to port 5000.*

### Run Backend Endpoint Test Suite
```bash
npm run test:backend
```
*Tests `GET /api/health`, `POST /api/search-medicine`, and `POST /api/analyze` with assertions.*

### Build for Production
```bash
npm run build
npm start
```

---

## ⚖️ Safety & Regulatory Disclaimers

- MedGuard AI is an assistive visual screening proof-of-concept.
- It is **NOT** a medical diagnostic tool or a substitute for professional pharmaceutical advice.
- Authenticity cannot be established conclusively from 2D digital photographs alone.
- If you suspect a medicine is counterfeit in Pakistan, please report it to the **Drug Regulatory Authority of Pakistan (DRAP)** via their national helpline: **`0800-03727`**.
