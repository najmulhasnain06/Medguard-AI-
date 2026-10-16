// Alibaba Cloud Model Studio (DashScope) Integration
// Models:
// - Vision: qwen3-vl-plus
// - Text: qwen-plus

import { CURATED_MEDICINES } from '../data/curatedMedicines.js';

const DEFAULT_BASE_URL = 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1';

export function isAlibabaConfigured() {
  const key = process.env.DASHSCOPE_API_KEY || process.env.ALIBABA_API_KEY;
  return Boolean(
    key &&
    key.trim().length > 5 &&
    !key.includes('your_dashscope_api_key_here') &&
    !key.includes('placeholder')
  );
}

/**
 * Clean and parse JSON from LLM output, stripping markdown fences if present.
 */
function cleanAndParseJson(text) {
  if (!text) throw new Error('Empty response from model');
  let clean = text.trim();
  if (clean.startsWith('```json')) {
    clean = clean.replace(/^```json\s*/i, '').replace(/```\s*$/, '');
  } else if (clean.startsWith('```')) {
    clean = clean.replace(/^```\s*/, '').replace(/```\s*$/, '');
  }
  return JSON.parse(clean.trim());
}

/**
 * Generates a realistic high-quality demo packaging analysis.
 */
function generateDemoAnalysis({ originalname = 'sample-medicine.jpg', medicineHint = '', lang = 'en' }) {
  const lowerHint = (medicineHint || originalname || '').toLowerCase();

  let matchedMed = CURATED_MEDICINES.find(m =>
    lowerHint.includes(m.id) ||
    lowerHint.includes(m.name.toLowerCase()) ||
    lowerHint.includes(m.genericName.toLowerCase())
  );

  if (!matchedMed) {
    matchedMed = CURATED_MEDICINES[0]; // Default to Panadol
  }

  // Determine a realistic risk level based on demo context
  // Use NEEDS_VERIFICATION as standard prudent health AI posture or LOW_CONCERN
  const isSuspicious = lowerHint.includes('fake') || lowerHint.includes('counterfeit') || lowerHint.includes('suspicious');
  const riskLevel = isSuspicious ? 'HIGH_CONCERN' : 'NEEDS_VERIFICATION';

  const confidenceScore = isSuspicious ? 88 : 92;

  const summary = isSuspicious
    ? `Visual inspection identified potential irregularities in the packaging typography and missing tamper-evident markers for ${matchedMed.name}. Immediate pharmacist verification is advised before use.`
    : `Packaging visual inspection for ${matchedMed.name} indicates legible branding and regulatory labeling. However, image verification cannot guarantee chemical authenticity. Follow safety verification checklist.`;

  const summaryUrdu = isSuspicious
    ? `${matchedMed.nameUrdu} کی پیکیجنگ میں فانٹ کے معیار اور سیکیورٹی مہر میں مشتبہ خامیاں نوٹ کی گئی ہیں۔ استعمال سے قبل مستند فارماسسٹ سے لازمی تصدیق کروائیں۔`
    : `${matchedMed.nameUrdu} کی پیکیجنگ کا بصری معائنہ مکمل۔ برانڈنگ اور لیبلنگ بظاہر واضح ہے، لیکن محض تصویر سے 100 فیصد اصلی ہونے کی ضمانت نہیں دی جا سکتی۔ حفاظتی چیک لسٹ دیکھیں۔`;

  return {
    isDemo: true,
    model: 'Demo Mode (Simulated Qwen3-VL-Plus)',
    demoNotice: 'Running in DEMO MODE. To enable live Alibaba Qwen3-VL-Plus visual inspection, configure DASHSCOPE_API_KEY in your .env file.',
    timestamp: new Date().toISOString(),
    identifiedMedicine: matchedMed.name,
    identifiedMedicineUrdu: matchedMed.nameUrdu,
    genericName: matchedMed.genericName,
    genericNameUrdu: matchedMed.genericNameUrdu,
    manufacturer: matchedMed.manufacturer,
    manufacturerUrdu: matchedMed.manufacturerUrdu,
    riskLevel: riskLevel, // LOW_CONCERN, NEEDS_VERIFICATION, HIGH_CONCERN
    confidenceScore: confidenceScore,
    summary,
    summaryUrdu,
    checklist: [
      {
        item: 'Batch & Lot Number',
        itemUrdu: 'بیچ اور لاٹ نمبر',
        status: isSuspicious ? 'FLAGGED' : 'PASS',
        notes: isSuspicious ? 'Batch number printing shows slight ink bleeding or irregular alignment.' : 'Batch and manufacturing code appear printed with standard pharmaceutical dot-matrix style.',
        notesUrdu: isSuspicious ? 'بیچ نمبر کی روشنائی پھیلی ہوئی یا غیر متوازن لگ رہی ہے۔' : 'بیچ نمبر اور تیاری کا کوڈ معیاری ڈاٹ میٹرکس پرنٹنگ میں واضح ہے۔'
      },
      {
        item: 'Expiration Date Legibility',
        itemUrdu: 'تاریخ تنسیخ کی درستگی',
        status: 'PASS',
        notes: 'Expiry date is stamped in standard MM/YYYY format and legible.',
        notesUrdu: 'ایکسپائری تاریخ معیاری فارمیٹ میں صاف اور قابل مطالعہ ہے۔'
      },
      {
        item: 'DRAP / Regulatory Registration',
        itemUrdu: 'ریگولیٹری رجسٹریشن (DRAP)',
        status: isSuspicious ? 'FLAGGED' : 'PASS',
        notes: isSuspicious ? 'Registration number format requires physical cross-reference with official register.' : `DRAP registration number (${matchedMed.drapRegNo}) format matches official layout.`,
        notesUrdu: isSuspicious ? 'رجسٹریشن نمبر کی تصدیق سرکاری ریکارڈ سے کروانا ضروری ہے۔' : `رجسٹریشن نمبر (${matchedMed.drapRegNo}) کا انداز سرکاری ترتیب کے مطابق ہے۔`
      },
      {
        item: 'Packaging Seal & Hologram',
        itemUrdu: 'سیکیورٹی سیل اور ہولوگرام',
        status: isSuspicious ? 'FLAGGED' : 'INDETERMINATE',
        notes: isSuspicious ? 'Tamper-evident seal appears disturbed or absent on outer edge.' : 'Foil sheen is visible; physical hologram refraction cannot be conclusively tested via 2D photograph.',
        notesUrdu: isSuspicious ? 'کناروں پر سیکیورٹی سیل کے چھیڑ چھاڑ کے آثار ہیں۔' : 'ورق کی چمک نظر آ رہی ہے مگر تھری ڈی ہولوگرام کی تصدیق تصویر سے حتمی نہیں۔'
      },
      {
        item: 'Typography & Graphic Alignment',
        itemUrdu: 'فانٹ اور گرافکس کا معیار',
        status: isSuspicious ? 'FLAGGED' : 'PASS',
        notes: isSuspicious ? 'Trademark font weight differs slightly from genuine brand specifications.' : 'Logos, color saturation, and trademark symbols conform to expected visual standards.',
        notesUrdu: isSuspicious ? 'برانڈ کے لوگو کا رنگ اور فانٹ اصل سے قدرے مختلف محسوس ہوتا ہے۔' : 'لوگو اور رنگ کا معیار عام متوقع اصولوں کے عین مطابق ہے۔'
      }
    ],
    observations: [
      `Package identified as ${matchedMed.name} (${matchedMed.genericName}).`,
      isSuspicious
        ? 'Visual inconsistencies detected in edge sealing and font typography.'
        : 'Primary packaging features including product title and strength markings are legible.',
      `Official registered regulatory reference on record: DRAP Reg. No. ${matchedMed.drapRegNo}.`,
      'Lighting and camera angle may affect barcode and microtext resolution.'
    ],
    observationsUrdu: [
      `پیکیجنگ کی شناخت بطور ${matchedMed.nameUrdu} (${matchedMed.genericNameUrdu})۔`,
      isSuspicious
        ? 'سیل کے کناروں اور فانٹ کی کوالٹی میں کچھ ناہمواری دیکھی گئی۔'
        : 'پیکیجنگ پر ادویات کا نام، طاقت اور کمپنی کی معلومات واضح ہیں۔',
      `سرکاری ریکارڈ کے مطابق ریفرنس نمبر: DRAP Reg No. ${matchedMed.drapRegNo}۔`,
      'روشنی یا تصویر کے زاویے سے بارکوڈ کی واضحیت پر اثر پڑ سکتا ہے۔'
    ],
    recommendations: [
      'Compare batch number and expiry date with the retail purchase receipt.',
      'Purchase medicines only from licensed, temperature-monitored pharmacies.',
      'Do not consume if tablet blister foil is loose, discolored, or punctured.',
      'If in doubt, show the physical pack to a registered pharmacist or report to DRAP helpline.'
    ],
    recommendationsUrdu: [
      'بیچ نمبر اور ایکسپائری تاریخ کو میڈیکل اسٹور کے اصل بل سے ملائیں۔',
      'ادویات ہمیشہ تصدیق شدہ اور لائسنس یافتہ فارمیسی سے خریدیں۔',
      'اگر بلسٹر پیک ڈھیلا، پھٹا ہوا یا بد رنگ ہو تو ہرگز استعمال نہ کریں۔',
      'کسی بھی شبہ کی صورت میں فارماسسٹ سے رجوع کریں یا DRAP ہیلپ لائن پر اطلاع دیں۔'
    ],
    disclaimers: [
      'NOT A MEDICAL DIAGNOSIS OR PRESCRIPTION: MedGuard AI does not evaluate patient health conditions or prescribe treatments.',
      'AUTHENTICITY CANNOT BE GUARANTEED FROM AN IMAGE ALONE: Visual analysis is an assistive screening tool and cannot detect chemical composition, active ingredient purity, or sophisticated counterfeit packaging.',
      'Always consult a qualified healthcare provider or licensed pharmacist for medical advice and medication safety.'
    ],
    disclaimersUrdu: [
      'یہ کوئی طبی تشخیص یا ذاتی نسخہ نہیں ہے: میڈ گارڈ اے آئی مریض کی صحت یا علاج تجویز نہیں کرتا۔',
      'محض تصویر سے اصل ہونے کی قطعی ضمانت ممکن نہیں: بصری معائنہ صرف ابتدائی جائزہ ہے، لیب ٹیسٹنگ کا متبادل نہیں۔',
      'ادویات کے محفوظ استعمال اور طبی مشورے کے لیے ہمیشہ مستند ڈاکٹر یا فارماسسٹ سے رجوع کریں۔'
    ]
  };
}

/**
 * Analyzes medicine packaging using Alibaba Cloud Model Studio Qwen3-VL-Plus.
 * Falls back safely to Demo Mode simulation if API key is not configured or network fails.
 */
export async function analyzePackagingWithQwen({
  base64DataUri,
  medicineName = '',
  notes = '',
  originalname = 'upload.jpg',
  lang = 'en'
}) {
  const configured = isAlibabaConfigured();

  if (!configured) {
    console.log('[MedGuard AI] DASHSCOPE_API_KEY not configured. Providing DEMO MODE packaging analysis.');
    return generateDemoAnalysis({ originalname, medicineHint: medicineName, lang });
  }

  const apiKey = process.env.DASHSCOPE_API_KEY || process.env.ALIBABA_API_KEY;
  const baseUrl = (process.env.DASHSCOPE_BASE_URL || DEFAULT_BASE_URL).replace(/\/$/, '');
  const model = process.env.QWEN_VISION_MODEL || 'qwen3-vl-plus';

  const systemPrompt = `You are MedGuard AI, a specialized pharmaceutical packaging visual inspection and safety screening AI.
Your purpose is to inspect images of medicine packaging, blister packs, cartons, and labels for counterfeit indicators, printing quality, regulatory information, and tamper marks.

CRITICAL SAFETY & MEDICAL POLICY:
1. NEVER claim a medicine is definitely genuine or authentic based only on an image. Physical chemical integrity cannot be verified by photo.
2. NEVER claim a medicine is definitely counterfeit based only on an image. Use wording such as "NEEDS_VERIFICATION" or "Potential packaging irregularity observed".
3. NEVER provide personalized prescriptions, dosages, or medical diagnosis.
4. The output must strictly assign one of the three risk levels:
   - "LOW_CONCERN" (packaging shows expected clean printing, standard regulatory markings, no obvious visual flaws)
   - "NEEDS_VERIFICATION" (some markers unreadable, ambiguous typography, or camera angle prevents full verification)
   - "HIGH_CONCERN" (obvious misspellings, blurry typography, missing required lot/exp/DRAP markers, or clear physical tampering signs)

Output must be ONLY valid JSON matching this schema:
{
  "identifiedMedicine": "Identified product or generic name (or 'Unspecified')",
  "identifiedMedicineUrdu": "Urdu transliteration/translation",
  "genericName": "Active ingredient if identifiable",
  "genericNameUrdu": "Active ingredient in Urdu",
  "manufacturer": "Manufacturer name or 'Unknown'",
  "manufacturerUrdu": "Manufacturer in Urdu",
  "riskLevel": "LOW_CONCERN" | "NEEDS_VERIFICATION" | "HIGH_CONCERN",
  "confidenceScore": number (70-98),
  "summary": "1-2 sentence executive assessment in English",
  "summaryUrdu": "1-2 sentence executive assessment in Urdu",
  "checklist": [
    { "item": "Batch & Lot Number", "itemUrdu": "بیچ اور لاٹ نمبر", "status": "PASS"|"FLAGGED"|"INDETERMINATE", "notes": "...", "notesUrdu": "..." },
    { "item": "Expiration Date Legibility", "itemUrdu": "تاریخ تنسیخ کی درستگی", "status": "PASS"|"FLAGGED"|"INDETERMINATE", "notes": "...", "notesUrdu": "..." },
    { "item": "DRAP / Regulatory Registration", "itemUrdu": "ریگولیٹری رجسٹریشن (DRAP)", "status": "PASS"|"FLAGGED"|"INDETERMINATE", "notes": "...", "notesUrdu": "..." },
    { "item": "Packaging Seal & Hologram", "itemUrdu": "سیکیورٹی سیل اور ہولوگرام", "status": "PASS"|"FLAGGED"|"INDETERMINATE", "notes": "...", "notesUrdu": "..." },
    { "item": "Typography & Graphic Alignment", "itemUrdu": "فانٹ اور گرافکس کا معیار", "status": "PASS"|"FLAGGED"|"INDETERMINATE", "notes": "...", "notesUrdu": "..." }
  ],
  "observations": ["English string 1", "English string 2", "English string 3"],
  "observationsUrdu": ["اردو مشاہدہ 1", "اردو مشاہدہ 2", "اردو مشاہدہ 3"],
  "recommendations": ["English recommendation 1", "English recommendation 2"],
  "recommendationsUrdu": ["اردو تجویز 1", "اردو تجویز 2"],
  "disclaimers": [
    "Not a medical diagnosis or personalized prescription.",
    "Physical authenticity cannot be guaranteed from an image alone.",
    "Always consult a licensed pharmacist or physician for medication guidance."
  ],
  "disclaimersUrdu": [
    "یہ کوئی طبی تشخیص یا ذاتی نسخہ نہیں ہے۔",
    "محض تصویر سے اصلی ہونے کی حتمی ضمانت ممکن نہیں ہے۔",
    "ادویات کے مشورے کے لیے ہمیشہ مستند فارماسسٹ یا معالج سے رجوع کریں۔"
  ]
}`;

  const userPromptText = `Inspect this medicine packaging image.
${medicineName ? `User notes the medicine may be: ${medicineName}.` : ''}
${notes ? `User notes: ${notes}.` : ''}
Provide your detailed packaging safety analysis in JSON.`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120000);

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      signal: controller.signal,
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: [
              { type: 'text', text: userPromptText },
              {
                type: 'image_url',
                image_url: {
                  url: base64DataUri
                }
              }
            ]
          }
        ],
        temperature: 0.2
      })
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errText = await response.text();
      console.error(`[MedGuard AI] Alibaba Vision API error (${response.status}):`, errText);
      throw new Error(`Alibaba API returned status ${response.status}: ${errText.slice(0, 200)}`);
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content;
    const parsed = cleanAndParseJson(rawContent);

    // Ensure riskLevel conforms to requirements
    const validRiskLevels = ['LOW_CONCERN', 'NEEDS_VERIFICATION', 'HIGH_CONCERN'];
    if (!validRiskLevels.includes(parsed.riskLevel)) {
      parsed.riskLevel = 'NEEDS_VERIFICATION';
    }

    // Ensure disclaimers are always enforced
    if (!parsed.disclaimers || !parsed.disclaimers.length) {
      parsed.disclaimers = [
        'Not a medical diagnosis or personalized prescription.',
        'Physical authenticity cannot be guaranteed from an image alone.',
        'Always consult a licensed pharmacist or physician for medication guidance.'
      ];
    }

    return {
      isDemo: false,
      model: model,
      timestamp: new Date().toISOString(),
      ...parsed
    };
  } catch (error) {
    console.warn(`[MedGuard AI] Vision API call failed (${error.message}). Falling back to safe Demo Mode.`);
    const fallback = generateDemoAnalysis({ originalname, medicineHint: medicineName, lang });
    fallback.demoNotice = `Notice: Alibaba Qwen Vision API error (${error.message}). Displaying safe fallback analysis.`;
    return fallback;
  }
}

/**
 * Searches medicine information.
 * Uses curated reference data first; queries Alibaba Qwen-Plus if configured and needed.
 */
export async function searchMedicineInfo(query, lang = 'en') {
  const normalized = (query || '').trim().toLowerCase();

  // 1. Check curated database
  const curatedMatches = CURATED_MEDICINES.filter(med => {
    if (!normalized) return true;
    return (
      med.id.toLowerCase().includes(normalized) ||
      med.name.toLowerCase().includes(normalized) ||
      med.nameUrdu.includes(normalized) ||
      med.genericName.toLowerCase().includes(normalized) ||
      med.genericNameUrdu.includes(normalized) ||
      med.category.toLowerCase().includes(normalized) ||
      med.manufacturer.toLowerCase().includes(normalized)
    );
  });

  if (curatedMatches.length > 0) {
    return {
      source: 'curated_database',
      query,
      count: curatedMatches.length,
      results: curatedMatches,
      disclaimer: 'Curated pharmaceutical packaging and safety guide. Not a personalized medical prescription.'
    };
  }

  // 2. If no curated matches and Alibaba is configured, query qwen-plus
  if (isAlibabaConfigured() && normalized) {
    const apiKey = process.env.DASHSCOPE_API_KEY || process.env.ALIBABA_API_KEY;
    const baseUrl = (process.env.DASHSCOPE_BASE_URL || DEFAULT_BASE_URL).replace(/\/$/, '');
    const model = process.env.QWEN_TEXT_MODEL || 'qwen-plus';

    const prompt = `You are MedGuard AI's pharmaceutical reference assistant. Provide structured information for the medicine: "${query}".
Strict Rules:
- DO NOT provide personalized medical prescription or dosage advice.
- Provide general pharmaceutical indicators and authentic packaging verification markers.
- Return ONLY valid JSON in this schema:
{
  "id": "${query.toLowerCase().replace(/[^a-z0-9]/g, '-')}",
  "name": "Brand / Generic Name",
  "nameUrdu": "اردو نام",
  "genericName": "Active Ingredient",
  "genericNameUrdu": "فعال جزو",
  "manufacturer": "Typical Manufacturer",
  "manufacturerUrdu": "ادویہ ساز کمپنی",
  "category": "Therapeutic Category",
  "categoryUrdu": "طبی زمرہ",
  "dosageForm": "Common dosage form (e.g. Tablets, Syrup)",
  "dosageFormUrdu": "شکل",
  "typicalIndications": "General indications (informational only)",
  "typicalIndicationsUrdu": "عمومی استعمال",
  "packagingSecurityFeatures": ["Feature 1", "Feature 2", "Feature 3"],
  "packagingSecurityFeaturesUrdu": ["سیکیورٹی نشانی 1", "سیکیورٹی نشانی 2"],
  "storageAdvice": "Storage instructions",
  "storageAdviceUrdu": "محفوظ رکھنے کی ہدایات",
  "safetyWarning": "General cautions and contraindications (NO personalized prescriptions)",
  "safetyWarningUrdu": "حفاظتی انتباہ",
  "redFlags": ["Packaging warning sign 1", "Packaging warning sign 2"],
  "redFlagsUrdu": ["مشتبہ نشانی 1", "مشتبہ نشانی 2"]
}`;

    try {
      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.2
        })
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        const parsed = cleanAndParseJson(content);
        return {
          source: 'qwen-plus-ai',
          query,
          count: 1,
          results: [parsed],
          disclaimer: 'Generated via Alibaba Qwen-Plus text model for informational awareness only. Not a prescription.'
        };
      }
    } catch (e) {
      console.warn('[MedGuard AI] Qwen text search failed:', e.message);
    }
  }

  // 3. Fallback: return all curated medicines with a search hint
  return {
    source: 'curated_database',
    query,
    count: CURATED_MEDICINES.length,
    results: CURATED_MEDICINES,
    noDirectMatch: true,
    message: `No exact record found for "${query}". Showing available curated reference medicines (Panadol, Nuberol Forte, Aspirin, Ibuprofen, Paracetamol, Amoxicillin).`,
    disclaimer: 'Informational reference guide only.'
  };
}
