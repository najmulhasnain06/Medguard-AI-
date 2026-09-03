/**
 * MedGuard AI — Alibaba Cloud Qwen AI Integration Service
 * 
 * Interacts with Alibaba Cloud Model Studio OpenAI-compatible endpoint.
 * Secret keys are stored ONLY on the server side and never sent to frontend.
 */

import dotenv from 'dotenv';
dotenv.config();

const DASHSCOPE_API_KEY = process.env.DASHSCOPE_API_KEY;
const DASHSCOPE_BASE_URL = process.env.DASHSCOPE_BASE_URL || 'https://dashscope.aliyuncs.com/compatible-mode/v1';
const ALIBABA_TEXT_MODEL = process.env.ALIBABA_TEXT_MODEL || 'qwen-plus';
const ALIBABA_VISION_MODEL = process.env.ALIBABA_VISION_MODEL || 'qwen3-vl-plus';

export function isQwenConfigured() {
    return Boolean(DASHSCOPE_API_KEY && DASHSCOPE_API_KEY.trim() !== '');
}

/**
 * Search medicine using Qwen text model
 */
export async function searchMedicineWithQwen(query) {
    if (!isQwenConfigured()) {
        throw new Error('Alibaba DashScope API key is not configured.');
    }

    const endpoint = `${DASHSCOPE_BASE_URL.replace(/\/$/, '')}/chat/completions`;

    const systemPrompt = `You are an expert pharmaceutical educational AI assistant for MedGuard AI in Pakistan.
Provide only general educational reference information for the requested medicine.

CRITICAL SAFETY RULES:
1. NEVER diagnose a patient or provide personalized medical advice/prescriptions.
2. NEVER calculate a personalized dose based on age, weight, symptoms, pregnancy, or disease history.
3. ALWAYS label dosage section as: "General dosage information — not a personalized prescription."
4. NEVER fabricate medical sources, URLs, studies, manufacturers, or regulatory information. If reliable sources cannot be cited, return: ["Source unavailable — verify with a pharmacist or official medicine documentation."]
5. Return strictly valid JSON with no markdown block formatting or extra commentary.

Return JSON schema:
{
  "name": "Medicine Name",
  "genericName": "Generic Formula",
  "activeIngredients": ["Ingredient 1"],
  "drugClass": "Drug Class",
  "dosageForm": "Form (e.g. Tablet)",
  "strength": "Strength",
  "manufacturer": "Manufacturer if known",
  "countryRegion": "Country/Region",
  "prescriptionStatus": "Prescription / OTC status",
  "description": "Simple summary of what it is",
  "uses": ["Common use 1", "Common use 2"],
  "howItWorks": "General mechanism explanation",
  "dosageLabel": "General dosage information — not a personalized prescription.",
  "dosage": "General educational dosage reference",
  "howToTake": "General administration instructions",
  "precautions": ["Precaution 1", "Precaution 2"],
  "sideEffects": ["Side effect 1"],
  "seriousSideEffects": ["Serious side effect 1"],
  "interactions": ["Interaction 1"],
  "contraindications": ["Contraindication 1"],
  "storage": "Storage guidance",
  "missedDose": "Missed dose advice",
  "overdose": "Overdose guidance (advise emergency 1122/1023 in Pakistan)",
  "specialPopulations": ["Children", "Pregnancy", "Breastfeeding", "Renal"],
  "sources": ["Authoritative source or fallback notice"]
}`;

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DASHSCOPE_API_KEY}`
        },
        body: JSON.stringify({
            model: ALIBABA_TEXT_MODEL,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: `Provide structured general educational information for medicine: "${query}"` }
            ],
            response_format: { type: 'json_object' },
            temperature: 0.2
        })
    });

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Alibaba Cloud API returned HTTP ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const contentStr = data.choices?.[0]?.message?.content;
    if (!contentStr) {
        throw new Error('Received empty response content from Alibaba Cloud Qwen model.');
    }

    try {
        const parsed = JSON.parse(contentStr);
        parsed.isDemoMode = false;
        parsed.dosageLabel = "General dosage information — not a personalized prescription.";
        return parsed;
    } catch (err) {
        throw new Error(`Failed to parse Qwen JSON response: ${err.message}`);
    }
}

/**
 * Analyze packaging image using Qwen Vision-Language model
 */
export async function analyzePackagingWithQwen(imageBase64, mimeType = 'image/jpeg') {
    if (!isQwenConfigured()) {
        throw new Error('Alibaba DashScope API key is not configured.');
    }

    const endpoint = `${DASHSCOPE_BASE_URL.replace(/\/$/, '')}/chat/completions`;

    const systemPrompt = `You are a specialized computer vision packaging risk analysis AI for MedGuard AI in Pakistan.
Inspect visible medicine packaging in the image and perform a risk assessment.

CRITICAL SAFETY RULES:
1. NEVER state or imply with certainty that a medicine is authentic or counterfeit.
2. Packaging image analysis cannot prove counterfeit or genuine status. Always state this limitation.
3. Classify riskLevel into EXACTLY ONE OF: "LOW_CONCERN", "NEEDS_VERIFICATION", "HIGH_CONCERN".
   - LOW_CONCERN: No obvious packaging anomalies identified. (Authenticity cannot be confirmed from an image alone).
   - NEEDS_VERIFICATION: Information is unclear, blurry, missing, or unusual labeling requires verification.
   - HIGH_CONCERN: Significant visible layout inconsistencies or suspicious packaging characteristics detected.
4. Confidence MUST be labeled as "LOW", "MODERATE", or "HIGH" and explicitly explained as confidence in packaging visual reading, NOT probability of counterfeit status.
5. Return strictly valid JSON.

Return JSON schema:
{
  "riskLevel": "LOW_CONCERN | NEEDS_VERIFICATION | HIGH_CONCERN",
  "riskTitle": "Summary title of risk assessment",
  "confidence": "LOW | MODERATE | HIGH",
  "confidenceExplanation": "This reflects confidence in visual packaging reading, not probability of counterfeit status.",
  "authenticityDisclaimer": "Packaging analysis cannot confirm authenticity. Potential concern detected — professional verification recommended.",
  "medicineName": "Extracted medicine name",
  "genericName": "Extracted generic name if visible",
  "activeIngredients": ["Extracted ingredients"],
  "strength": "Extracted strength",
  "dosageForm": "Extracted form",
  "manufacturer": "Extracted manufacturer",
  "batchNumber": "Extracted batch/lot number",
  "expiryDate": "Extracted expiry date",
  "manufacturingDate": "Extracted manufacturing date",
  "observations": ["Observed visual fact 1", "Observed visual fact 2"],
  "concerns": ["Potential packaging inconsistency 1"],
  "verificationRecommendations": ["Recommendation 1", "Recommendation 2"],
  "imageQuality": "GOOD | FAIR | POOR",
  "explanation": "Detailed rationale based on visible packaging features."
}`;

    const imageUrl = imageBase64.startsWith('data:')
        ? imageBase64
        : `data:${mimeType};base64,${imageBase64}`;

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DASHSCOPE_API_KEY}`
        },
        body: JSON.stringify({
            model: ALIBABA_VISION_MODEL,
            messages: [
                { role: 'system', content: systemPrompt },
                {
                    role: 'user',
                    content: [
                        { type: 'image_url', image_url: { url: imageUrl } },
                        { type: 'text', text: 'Analyze this medicine packaging photo. Extract all visible details and evaluate potential packaging concerns.' }
                    ]
                }
            ],
            response_format: { type: 'json_object' },
            temperature: 0.2
        })
    });

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Alibaba Cloud Vision API returned HTTP ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const contentStr = data.choices?.[0]?.message?.content;
    if (!contentStr) {
        throw new Error('Received empty response from Qwen Vision model.');
    }

    try {
        const parsed = JSON.parse(contentStr);
        parsed.isDemoMode = false;
        parsed.authenticityDisclaimer = "Packaging analysis cannot confirm authenticity. Potential concern detected — professional verification recommended.";
        return parsed;
    } catch (err) {
        throw new Error(`Failed to parse Qwen Vision JSON response: ${err.message}`);
    }
}
