/**
 * MedGuard AI -- Express Backend Server
 *
 * This server acts as a secure proxy between the React frontend and
 * Alibaba Cloud Model Studio (DashScope). The API key is stored in
 * the .env file and is NEVER exposed to the browser.
 *
 * Endpoints:
 *   POST /api/analyze   Accept a base64 image, send to Qwen VL, return structured result
 *   GET  /api/health     Health check endpoint
 *
 * How it works:
 *   1. Frontend sends a POST with the image (as base64 data URL)
 *   2. Server constructs a multimodal request for the Qwen VL model
 *   3. Server sends the request to Alibaba Cloud DashScope API
 *   4. Server parses the AI response into the format the frontend expects
 *   5. Frontend receives structured risk assessment
 */

import express from 'express'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// ---- Configuration ----
// The DashScope OpenAI-compatible endpoint.
// Defaults to the legacy international domain (no workspace ID needed).
const DASHSCOPE_BASE_URL = process.env.DASHSCOPE_BASE_URL
  || 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1'

// The vision-language model to use.
const VISION_MODEL = process.env.ALIBABA_VISION_MODEL || 'qwen3-vl-plus'

// The text model for medicine search (cheaper/faster than vision models).
const TEXT_MODEL = process.env.ALIBABA_TEXT_MODEL || 'qwen-plus'

// API key -- ONLY read from environment variable, never hardcoded.
const API_KEY = process.env.DASHSCOPE_API_KEY

// ---- Middleware ----
// Allow JSON request bodies up to 20MB (images can be large as base64)
app.use(express.json({ limit: '20mb' }))

// Simple request logging
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})

// ---- Health check ----
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    model: VISION_MODEL,
    apiKeyConfigured: Boolean(API_KEY),
  })
})

// ---- Medicine Packaging Analysis Endpoint ----
app.post('/api/analyze', async (req, res) => {
  try {
    // 1. Validate that API key is configured
    if (!API_KEY) {
      console.error('ERROR: DASHSCOPE_API_KEY is not set in .env')
      return res.status(500).json({
        error: 'Server configuration error: API key is not configured. Please set DASHSCOPE_API_KEY in the .env file.',
      })
    }

    // 2. Validate the incoming request
    const { imageBase64, language } = req.body
    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return res.status(400).json({
        error: 'No image provided. Please upload a medicine packaging image.',
      })
    }

    const isUrdu = language === 'ur'

    // 3. Build the data URL from the base64 string
    //    The frontend sends base64 without the data:... prefix, so we add it.
    const dataUrl = imageBase64.startsWith('data:')
      ? imageBase64
      : `data:image/jpeg;base64,${imageBase64}`

    // 4. Build the prompt that instructs Qwen to analyse medicine packaging
    const analysisPrompt = isUrdu
      ? `آپ ایک ادویات کی پیکنگ کے تجزیہ کے معاون ہیں۔ آپ فراہم کردہ ادویات کی پیکنگ کی تصویر کا تجزیہ کریں گے اور ایک ساختی JSON جواب واپس کریں گے۔

اہم حفاظتی قواعد:
- آپ کو کبھی بھی یہ دعویٰ نہیں کرنا چاہیے کہ کوئی دوا صرف تصویر کی بنیاد پر یقینی طور پر جعلی، نقلی، اصلی یا مستند ہے۔
- آپ کو اپنے نتائج کو صرف اسکریننگ اسسمنٹ کے طور پر بیان کرنا چاہیے۔
- آپ کی رسک درجہ بندی صرف نظر آنے والے ثبوت اور غیر یقینی صورتحال پر مبنی ہونی چاہیے۔

تصویر کا احتیاط سے تجزیہ کریں اور درج ذیل معلومات نکالیں۔ اگر کوئی چیز نظر نہیں آ رہی یا پڑھنے کے قابل نہیں ہے، تو واضح طور پر "نظر نہیں آیا" یا "پڑھنے کے قابل نہیں" لکھیں۔

اپنا جواب ایک JSON آبجیکٹ کے طور پر واپس کریں جس میں بالکل یہ ساخت ہو (کوئی مارک ڈاؤن نہیں، کوئی کوڈ فینس نہیں، صرف خام JSON):

{
  "extractedInfo": {
    "medicineName": "برانڈ نام اگر پڑھنے کے قابل ہو، ورنہ پڑھنے کے قابل نہیں",
    "activeIngredient": "جنرک/فعال جزو اگر پڑھنے کے قابل ہو، ورنہ پڑھنے کے قابل نہیں",
    "strength": "خوراک کی طاقت اگر پڑھنے کے قابل ہو، ورنہ پڑھنے کے قابل نہیں",
    "manufacturer": "مینوفیکچرر کا نام اگر پڑھنے کے قابل ہو، ورنہ پڑھنے کے قابل نہیں",
    "batchNumber": "بیچ/لاٹ نمبر اگر پڑھنے کے قابل ہو، ورنہ پڑھنے کے قابل نہیں",
    "manufacturingDate": "مینوفیکچرنگ کی تاریخ اگر پڑھنے کے قابل ہو، ورنہ پڑھنے کے قابل نہیں",
    "expiryDate": "ایکسپائری کی تاریخ اگر پڑھنے کے قابل ہو، ورنہ پڑھنے کے قابل نہیں",
    "registrationInfo": "رجسٹریشن نمبر/معلومات اگر نظر آئیں، ورنہ نظر نہیں آیا",
    "barcodeVisible": true یا false,
    "qrCodeVisible": true یا false
  },
  "observations": [
    "متن/پرنٹنگ کے معیار کے بارے میں مشاہدہ",
    "پیکنگ کی حالت کے بارے میں مشاہدہ",
    "سیکیورٹی فیچرز کے بارے میں مشاہدہ",
    "رنگ اور ڈیزائن کی مستقل مزاجی کے بارے میں مشاہدہ",
    "کوئی اور قابل ذکر مشاہدہ"
  ],
  "concerns": [
    "کوئی نظر آنے والی بے ضابطگیاں یا انتباہی علامات، یا کچھ نظر نہیں آیا"
  ],
  "missingInfo": [
    "ایسی معلومات کی فہرست جو نظر نہیں آئیں یا طے نہیں کی جا سکیں"
  ],
  "confidence": "high | medium | low",
  "riskLevel": "LOW_CONCERN | NEEDS_VERIFICATION | HIGH_CONCERN",
  "riskReasons": [
    "رسک درجہ بندی کی وجہ 1",
    "وجہ 2"
  ],
  "recommendations": [
    "مخصوص سفارش 1",
    "مخصوص سفارش 2"
  ]
}

رسک درجہ بندی کی رہنما خطوط:
- LOW_CONCERN: تمام کلیدی معلومات واضح طور پر پڑھنے کے قابل ہیں، پیکنگ مکمل اور مستقل نظر آتی ہے، کوئی نظر آنے والی انتباہی علامات نہیں۔ پھر بھی فارماسسٹ سے تصدیق کی سفارش کریں۔
- NEEDS_VERIFICATION: کچھ معلومات جزوی طور پر پڑھنے کے قابل ہیں یا غائب ہیں، کچھ مشاہدات مکمل طور پر نہیں کیے جا سکے، تصویر کا معیار تشخیص کو محدود کرتا ہے، یا معمولی بے ضابطگیاں نوٹ کی گئی ہیں۔
- HIGH_CONCERN: متعدد اہم نظر آنے والی انتباہی علامات جیسے واضح طور پر دھندلا/غیر ہم آہنگ متن، غائب اہم معلوماتی فیلڈز جہاں وہ نظر آنی چاہئیں، واضح پرنٹنگ کے معیار کے مسائل، یا مشکوک پیکنگ کی خصوصیات۔

ہمیشہ یہ سفارشات شامل کریں جہاں مناسب ہو:
- لائسنس یافتہ فارماسسٹ سے تصدیق کریں
- اگر بیچ نمبر دستیاب ہو تو مینوفیکچرر سے چیک کریں
- خدشات کی اطلاع ڈرگ ریگولیٹری اتھارٹی آف پاکستان (DRAP) کو دیں
- ادویات صرف لائسنس یافتہ فارمیسیوں سے خریدیں

صرف JSON آبجیکٹ واپس کریں۔ JSON سے پہلے یا بعد میں کوئی متن شامل نہ کریں۔`
      : `You are a medicine packaging analysis assistant. You will analyse the provided image of medicine packaging and return a structured JSON response.

IMPORTANT SAFETY RULES:
- You MUST NEVER claim that a medicine is definitely fake, counterfeit, genuine, or authentic based only on an image.
- You MUST describe your findings as a screening assessment only.
- Your risk classification must be based ONLY on observable evidence and uncertainty.

Analyse the image carefully and extract the following information. If something is not visible or readable, explicitly state "Not visible" or "Not readable".

Return your response as a single JSON object with EXACTLY this structure (no markdown, no code fences, just raw JSON):

{
  "extractedInfo": {
    "medicineName": "brand name if readable, or Not readable",
    "activeIngredient": "generic/active ingredient if readable, or Not readable",
    "strength": "dosage strength if readable, or Not readable",
    "manufacturer": "manufacturer name if readable, or Not readable",
    "batchNumber": "batch/lot number if readable, or Not readable",
    "manufacturingDate": "manufacturing date if readable, or Not readable",
    "expiryDate": "expiry date if readable, or Not readable",
    "registrationInfo": "registration number/info if visible, or Not visible",
    "barcodeVisible": true or false,
    "qrCodeVisible": true or false
  },
  "observations": [
    "observation about text/printing quality",
    "observation about packaging condition",
    "observation about security features",
    "observation about colour and design consistency",
    "any other notable observations"
  ],
  "concerns": [
    "any visible inconsistencies or warning signs, or None observed"
  ],
  "missingInfo": [
    "list of information that was not visible or could not be determined"
  ],
  "confidence": "high | medium | low",
  "riskLevel": "LOW_CONCERN | NEEDS_VERIFICATION | HIGH_CONCERN",
  "riskReasons": [
    "reason 1 for the risk classification",
    "reason 2"
  ],
  "recommendations": [
    "specific recommendation 1",
    "specific recommendation 2"
  ]
}

RISK CLASSIFICATION GUIDELINES:
- LOW_CONCERN: All key information is clearly readable, packaging appears intact and consistent, no observable warning signs. Still recommend verification with pharmacist.
- NEEDS_VERIFICATION: Some information is partially readable or missing, some observations could not be fully assessed, image quality limits assessment, or minor inconsistencies noted. The image may be blurry or incomplete.
- HIGH_CONCERN: Multiple significant observable warning signs such as clearly smudged/misaligned text, missing critical information fields where they should be visible, obvious printing quality issues, or suspicious packaging characteristics. Do NOT classify as HIGH_CONCERN simply because image quality is poor -- use NEEDS_VERIFICATION for poor image quality.

Always include these recommendations where appropriate:
- Verify with a licensed pharmacist
- Check with the manufacturer if batch number is available
- Report concerns to the Drug Regulatory Authority of Pakistan (DRAP)
- Purchase medicines only from licensed pharmacies

Return ONLY the JSON object. Do not include any text before or after the JSON.`

    // 5. Send the request to Alibaba Cloud DashScope (OpenAI-compatible API)
    console.log(`Sending image to ${VISION_MODEL} via DashScope API...`)

    const dashscopeResponse = await fetch(
      `${DASHSCOPE_BASE_URL}/chat/completions`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: VISION_MODEL,
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'image_url',
                  image_url: { url: dataUrl },
                },
                {
                  type: 'text',
                  text: analysisPrompt,
                },
              ],
            },
          ],
          // Disable thinking mode for faster response (qwen3-vl-plus default is false anyway)
          enable_thinking: false,
          // Set a reasonable token limit for the structured response
          max_tokens: 2000,
        }),
      }
    )

    // 6. Handle API errors
    if (!dashscopeResponse.ok) {
      const errorData = await dashscopeResponse.text()
      console.error(`DashScope API error (${dashscopeResponse.status}):`, errorData)

      let errorMessage = 'The AI analysis service returned an error.'
      try {
        const parsed = JSON.parse(errorData)
        if (parsed.error?.message) errorMessage = parsed.error.message
      } catch {
        // Use the default message
      }

      return res.status(dashscopeResponse.status >= 500 ? 502 : 400).json({
        error: errorMessage,
        statusCode: dashscopeResponse.status,
      })
    }

    // 7. Parse the DashScope response
    const dashscopeData = await dashscopeResponse.json()
    const modelContent = dashscopeData.choices?.[0]?.message?.content

    if (!modelContent) {
      console.error('DashScope returned empty response:', JSON.stringify(dashscopeData))
      return res.status(502).json({
        error: 'The AI model returned an empty response. Please try again with a different image.',
      })
    }

    // 8. Parse the JSON from the model's response
    let analysis
    try {
      // The model might wrap JSON in markdown code fences -- strip them
      let cleanContent = modelContent.trim()
      if (cleanContent.startsWith('```')) {
        // Remove ```json or ``` and the closing ```
        cleanContent = cleanContent
          .replace(/^```(?:json)?\s*\n?/i, '')
          .replace(/\n?```\s*$/i, '')
          .trim()
      }
      analysis = JSON.parse(cleanContent)
    } catch (parseError) {
      console.error('Failed to parse model response as JSON:', parseError.message)
      console.error('Raw model content:', modelContent.substring(0, 500))

      return res.status(502).json({
        error: 'The AI model returned a response that could not be parsed. Please try again.',
        rawResponse: modelContent.substring(0, 200),
      })
    }

    // 9. Validate the risk level
    const validRiskLevels = ['LOW_CONCERN', 'NEEDS_VERIFICATION', 'HIGH_CONCERN']
    if (!validRiskLevels.includes(analysis.riskLevel)) {
      console.warn(`Model returned invalid risk level: "${analysis.riskLevel}", defaulting to NEEDS_VERIFICATION`)
      analysis.riskLevel = 'NEEDS_VERIFICATION'
    }

    // 10. Build the response in the format the frontend expects
    const disclaimerText = isUrdu
      ? 'یہ صرف اسکریننگ اسسمنٹ ہے۔ یہ ٹول تصدیق نہیں کر سکتا کہ دوا اصلی ہے یا نقلی۔ ہمیشہ اہل ہیلتھ کیئر پیشہ ور یا فارماسسٹ سے مشورہ کریں۔'
      : 'This is a screening assessment only. This tool cannot confirm whether a medicine is genuine or counterfeit. Always consult a qualified healthcare professional or pharmacist.'

    const confidenceText = isUrdu
      ? `صرف اسکریننگ اسسمنٹ (اعتماد: ${analysis.confidence || 'نامعلوم'})`
      : `Screening assessment only (confidence: ${analysis.confidence || 'unknown'})`

    const result = {
      riskLevel: analysis.riskLevel,
      confidence: confidenceText,
      extractedInfo: analysis.extractedInfo || {},
      reasons: analysis.riskReasons || [],
      recommendations: analysis.recommendations || [],
      observations: analysis.observations || [],
      concerns: analysis.concerns || [],
      missingInfo: analysis.missingInfo || [],
      disclaimer: disclaimerText,
    }

    console.log(`Analysis complete. Risk level: ${result.riskLevel}`)
    return res.json(result)

  } catch (error) {
    console.error('Server error in /api/analyze:', error)
    return res.status(500).json({
      error: `Internal server error: ${error.message}`,
    })
  }
})

// ---- Medicine Search Endpoint (AI fallback) ----
app.post('/api/search-medicine', async (req, res) => {
  try {
    // 1. Validate API key
    if (!API_KEY) {
      console.error('ERROR: DASHSCOPE_API_KEY is not set in .env')
      return res.status(500).json({
        error: 'Server configuration error: API key is not configured.',
      })
    }

    // 2. Validate request
    const { query, language } = req.body
    if (!query || typeof query !== 'string' || query.trim().length < 2) {
      return res.status(400).json({
        error: 'Please provide a medicine name to search (at least 2 characters).',
      })
    }

    const medicineQuery = query.trim()
    const isUrdu = language === 'ur'
    console.log(`Searching medicine info for: "${medicineQuery}" (language: ${language || 'en'})`)

    // 3. Build the prompt for structured medicine information
    const searchPrompt = isUrdu
      ? `آپ ایک فارماسیوٹیکل معلومات کے معاون ہیں۔ دوا کے بارے میں عمومی، حقائق پر مبنی معلومات فراہم کریں: "${medicineQuery}"۔

اہم حفاظتی قواعد:
1. صرف عمومی معلومات -- صرف عوامی طور پر دستیاب، عمومی فارماسیوٹیکل معلومات فراہم کریں۔
2. کوئی تشخیص نہیں -- کسی بھی حالت کی تشخیص نہ کریں یا یہ تجویز نہ کریں کہ صارف کو کوئی مخصوص بیماری ہے۔
3. کوئی نسخہ نہیں -- علاج کی تجویز نہ کریں یا صارف کو مخصوص دوا لینے کی سفارش نہ کریں۔
4. کوئی ذاتی خوراک نہیں -- ذاتی خوراک کی ہدایات نہ دیں۔ خوراک کو واضح طور پر "عمومی/حوالہ جاتی معلومات" کے طور پر لیبل کیا جانا چاہیے اور ذاتی خوراک کے لیے سرکاری دوا کے پمفلٹ کی جانچ یا فارماسسٹ سے مشورہ کرنے کا مشورہ دینا چاہیے۔
5. کوئی بنائے گئے ذرائع نہیں -- URLs، ذرائع کے نام ایجاد نہ کریں یا سرکاری ڈیٹا بیس چیک کرنے کا دعویٰ نہ کریں۔
6. غیر یقینی -- اگر آپ دوا کی شناخت کے بارے میں پراعتماد نہیں ہیں، تو "identified" کو false سیٹ کریں۔
7. ابہام -- اگر سوال مبہم ہے، تو سب سے عام تشریح کو ترجیح دیں۔
8. سیاق و سباق -- یہ معلومات پاکستانی فارماسیوٹیکل مارکیٹ کے سیاق و سباق کے لیے ہیں۔

اپنا جواب ایک JSON آبجیکٹ کے طور پر واپس کریں جس میں بالکل یہ ساخت ہو (کوئی مارک ڈاؤن نہیں، صرف خام JSON):

{
  "identified": true,
  "name": "مکمل دوا کا نام طاقت کے ساتھ",
  "activeIngredient": "فعال جزو/اجزاء",
  "uses": [
    "عام استعمال 1",
    "عام استعمال 2",
    "عام استعمال 3"
  ],
  "dosage": "عمومی خوراک کی معلومات ایک پیراگراف کے طور پر۔ لازمی طور پر شامل کریں: 'یہ عمومی حوالہ جاتی معلومات ہیں۔ ذاتی خوراک کے لیے سرکاری دوا کا پمفلٹ چیک کریں یا فارماسسٹ سے مشورہ کریں۔'",
  "precautions": [
    "احتیاطی تدبیر 1",
    "احتیاطی تدبیر 2",
    "احتیاطی تدبیر 3"
  ],
  "sideEffects": [
    "عام ضمنی اثر 1",
    "عام ضمنی اثر 2",
    "عام ضمنی اثر 3"
  ],
  "interactions": [
    "تعامل 1",
    "تعامل 2",
    "تعامل 3"
  ],
  "storage": "عمومی ذخیرہ کی ہدایات ایک جملے کے طور پر۔",
  "sources": []
}

"sources" ایرے خالی ہونی چاہیے -- URLs یا ذرائع کے نام ایجاد نہ کریں۔
"identified" فیلڈ false ہونی چاہیے اگر آپ دوا کی باقاعدہ شناخت نہیں کر سکتے۔
اگر "identified" false ہے، تو پھر بھی بہترین دستیاب معلومات فراہم کریں لیکن فرنٹ اینڈ ایک انتباہ دکھائے گا۔
صرف JSON آبجیکٹ واپس کریں۔`
      : `You are a pharmaceutical information assistant. Provide general, factual information about the medicine: "${medicineQuery}".

CRITICAL SAFETY RULES:
1. GENERAL INFORMATION ONLY -- Provide only publicly available, general pharmaceutical information.
2. NO DIAGNOSIS -- Do NOT diagnose any condition or suggest the user has a specific illness.
3. NO PRESCRIPTION -- Do NOT prescribe treatment or recommend that the user take a specific medicine.
4. NO PERSONALIZED DOSAGE -- Do NOT give personalized dosage instructions. Dosage must be clearly labeled as "general/reference information" and must advise checking the official medicine leaflet or consulting a pharmacist for individualized dosing.
5. NO INVENTED SOURCES -- Do NOT invent URLs, source names, or claim to have checked official databases (e.g., DRAP, WHO, FDA) unless you actually performed such a check in this session.
6. UNCERTAINTY -- If you are not confident about the medicine identity, set "identified" to false.
7. AMBIGUITY -- If the query is ambiguous (could refer to multiple medicines), prefer the most common interpretation but note the ambiguity in the response.
8. CONTEXT -- This information is for the Pakistani pharmaceutical market context.

Return your response as a single JSON object with EXACTLY this structure (no markdown, no code fences, just raw JSON):

{
  "identified": true,
  "name": "Full medicine name with strength",
  "activeIngredient": "Active ingredient(s)",
  "uses": [
    "Common use 1",
    "Common use 2",
    "Common use 3"
  ],
  "dosage": "General dosage information as a paragraph. MUST include a statement such as: 'This is general reference information. Check the official medicine leaflet or consult a pharmacist for personalized dosing.'",
  "precautions": [
    "Precaution 1",
    "Precaution 2",
    "Precaution 3"
  ],
  "sideEffects": [
    "Common side effect 1",
    "Common side effect 2",
    "Common side effect 3"
  ],
  "interactions": [
    "Interaction 1",
    "Interaction 2",
    "Interaction 3"
  ],
  "storage": "General storage instructions as a sentence.",
  "sources": []
}

The "sources" array MUST be empty -- do not invent URLs or source names.
The "identified" field must be false if you cannot confidently identify the medicine.
If "identified" is false, still provide the best available information but the frontend will show a warning.

Return ONLY the JSON object. Do not include any text before or after the JSON.`

    // 4. Call DashScope text API
    const dashscopeResponse = await fetch(
      `${DASHSCOPE_BASE_URL}/chat/completions`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: TEXT_MODEL,
          messages: [
            {
              role: 'user',
              content: searchPrompt,
            },
          ],
          enable_thinking: false,
          max_tokens: 1500,
          response_format: { type: 'json_object' },
        }),
      }
    )

    // 5. Handle API errors
    if (!dashscopeResponse.ok) {
      const errorData = await dashscopeResponse.text()
      console.error(`DashScope API error (${dashscopeResponse.status}):`, errorData)

      let errorMessage = 'The AI medicine search service returned an error.'
      try {
        const parsed = JSON.parse(errorData)
        if (parsed.error?.message) errorMessage = parsed.error.message
      } catch { /* use default */ }

      return res.status(dashscopeResponse.status >= 500 ? 502 : 400).json({
        error: errorMessage,
      })
    }

    // 6. Parse the response
    const dashscopeData = await dashscopeResponse.json()
    const modelContent = dashscopeData.choices?.[0]?.message?.content

    if (!modelContent) {
      return res.status(502).json({
        error: 'The AI model returned an empty response. Please try a different medicine name.',
      })
    }

    // 7. Parse the JSON from the model response
    let medicineInfo
    try {
      let cleanContent = modelContent.trim()
      if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent
          .replace(/^```(?:json)?\s*\n?/i, '')
          .replace(/\n?```\s*$/i, '')
          .trim()
      }
      medicineInfo = JSON.parse(cleanContent)
    } catch (parseError) {
      console.error('Failed to parse medicine info response:', parseError.message)
      console.error('Raw content:', modelContent.substring(0, 500))
      return res.status(502).json({
        error: 'The AI returned a response that could not be parsed. Please try again.',
      })
    }

    // 8. Validate required fields
    if (!medicineInfo.name) {
      return res.json({
        identified: false,
        query: medicineQuery,
        error: `Could not identify a medicine matching "${medicineQuery}". Please check the spelling or provide the active ingredient name.`,
      })
    }

    // 9. Return structured result with aiGenerated flag
    const result = {
      ...medicineInfo,
      aiGenerated: true,
      // Ensure arrays exist
      uses: Array.isArray(medicineInfo.uses) ? medicineInfo.uses : [],
      precautions: Array.isArray(medicineInfo.precautions) ? medicineInfo.precautions : [],
      sideEffects: Array.isArray(medicineInfo.sideEffects) ? medicineInfo.sideEffects : [],
      interactions: Array.isArray(medicineInfo.interactions) ? medicineInfo.interactions : [],
      sources: [],  // Never invent sources
    }

    console.log(`Medicine search complete. Found: ${result.name} (identified: ${result.identified !== false})`)
    return res.json(result)

  } catch (error) {
    console.error('Server error in /api/search-medicine:', error)
    return res.status(500).json({
      error: `Internal server error: ${error.message}`,
    })
  }
})

// ---- Start server ----
app.listen(PORT, () => {
  console.log('')
  console.log('=== MedGuard AI Backend Server ===')
  console.log(`  Server running on:   http://localhost:${PORT}`)
  console.log(`  API endpoint:        POST http://localhost:${PORT}/api/analyze`)
  console.log(`  Health check:        GET  http://localhost:${PORT}/api/health`)
  console.log(`  DashScope base URL:  ${DASHSCOPE_BASE_URL}`)
  console.log(`  Medicine search:     POST http://localhost:${PORT}/api/search-medicine`)
  console.log(`  Vision model:        ${VISION_MODEL}`)
  console.log(`  Text model:          ${TEXT_MODEL}`)
  console.log(`  API key configured:  ${API_KEY ? 'Yes' : 'NO -- set DASHSCOPE_API_KEY in .env'}`)
  console.log('')
  if (!API_KEY) {
    console.log('  WARNING: DASHSCOPE_API_KEY is not set!')
    console.log('  Copy .env.example to .env and add your API key.')
    console.log('')
  }
})
