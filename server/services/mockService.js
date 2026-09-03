/**
 * MedGuard AI — Safe Demo & Fallback Mock Service
 * 
 * MANDATORY SAFETY RULE:
 * Demo / mock results MUST be clearly labeled with:
 * "DEMO MODE — SIMULATED RESULT — NOT AI ANALYSIS"
 * Never disguise simulated results as real AI analysis.
 */

export function getMockMedicineSearch(query) {
    const normalizedQuery = (query || "Medicine").trim();

    return {
        isDemoMode: true,
        demoBannerText: "DEMO MODE — SIMULATED RESULT — NOT AI ANALYSIS",
        name: normalizedQuery,
        genericName: `${normalizedQuery} (Generic Active Formula)`,
        activeIngredients: [`Active Ingredient (${normalizedQuery})`],
        drugClass: "General Reference Therapeutic Category",
        dosageForm: "Tablet / Capsule",
        strength: "Standard Adult Formulation",
        manufacturer: "Registered Pharmaceutical Manufacturer (Reference)",
        countryRegion: "Pakistan (DRAP Reference)",
        prescriptionStatus: "Consult Pharmacist / Doctor",

        description: `Educational reference summary for ${normalizedQuery}. This information is provided for general health awareness and education in Pakistan.`,

        uses: [
            `General symptomatic relief as indicated for ${normalizedQuery}`,
            "Educational reference use only"
        ],

        howItWorks: `Pharmacological action mechanism generally associated with ${normalizedQuery} as documented in standard medical reference literature.`,

        dosageLabel: "General dosage information — not a personalized prescription.",
        dosage: `Standard adult reference dosage as documented in medical literature for ${normalizedQuery}. Never calculate personalized dosage without healthcare consultation.`,

        howToTake: "Take as directed on official packaging or as prescribed by a licensed physician.",

        precautions: [
            "Check active ingredients for known drug allergies before use.",
            "Consult a doctor if symptoms persist or worsen.",
            "Avoid combining multiple medications containing the same active ingredient."
        ],

        sideEffects: [
            "Mild gastrointestinal disquiet (infrequent)",
            "Drowsiness or headache (depending on specific formulation)"
        ],

        seriousSideEffects: [
            "Severe allergic reaction (hives, breathing difficulty, swelling)",
            "Unusual symptoms requiring immediate emergency medical attention"
        ],

        interactions: [
            "Medicines: Check with a pharmacist before taking alongside prescription blood thinners or NSAIDs.",
            "Supplements: Exercise caution with high-dose dietary supplements.",
            "Alcohol: Alcohol consumption may increase side effect risks.",
            "Food: Refer to package insert for specific dietary guidance."
        ],

        contraindications: [
            "Known allergy or severe reaction to active ingredients",
            "Specific organ impairment conditions requiring prior medical clearance"
        ],

        storage: "Store below 30°C in a dry place protected from direct sunlight and out of reach of children.",

        missedDose: "Take when remembered unless near the next dose. Do not take double doses.",

        overdose: "In case of suspected overdose, seek immediate emergency medical care (1122 or 1023 in Pakistan).",

        specialPopulations: [
            "Children: Require specialized pediatric formulations and dosing.",
            "Pregnancy & Breastfeeding: Must be reviewed with an obstetrician/physician before use.",
            "Older Adults & Renal Impairment: Dose adjustment may be required."
        ],

        sources: [
            "Source unavailable — verify with a pharmacist or official medicine documentation."
        ]
    };
}

export function getMockPackagingAnalysis(filename = "packaging_sample.jpg") {
    const lowerName = filename.toLowerCase();

    let riskLevel = "LOW_CONCERN";
    let riskTitle = "No Obvious Packaging Concerns Detected";
    let summary = "No obvious visual anomalies were identified from the simulated packaging inspection.";
    let concerns = [];
    let imageQuality = "GOOD";

    if (lowerName.includes("blurry") || lowerName.includes("unclear")) {
        imageQuality = "POOR";
        riskLevel = "NEEDS_VERIFICATION";
        riskTitle = "Additional Verification Recommended (Image Quality)";
        summary = "Image quality is insufficient for reliable packaging assessment. Key details like batch number and expiry date are unreadable.";
        concerns = ["Batch/Lot number is unreadable due to blur", "Expiry date digits cannot be cleanly resolved"];
    } else if (lowerName.includes("suspicious") || lowerName.includes("fake") || lowerName.includes("bad")) {
        riskLevel = "HIGH_CONCERN";
        riskTitle = "Suspicious Packaging Characteristics Detected";
        summary = "Simulated inspection identified potential label layout inconsistencies and missing registration details.";
        concerns = [
            "Inconsistent font alignment on brand typography",
            "Missing or irregular registration details on visible label",
            "Packaging print quality exhibits visible color bleeding"
        ];
    } else if (lowerName.includes("missing") || lowerName.includes("verify")) {
        riskLevel = "NEEDS_VERIFICATION";
        riskTitle = "Additional Verification Recommended";
        summary = "Some visible packaging fields appear partially incomplete or require cross-verification with official distributor records.";
        concerns = ["Batch number requires confirmation with manufacturer database"];
    }

    return {
        isDemoMode: true,
        demoBannerText: "DEMO MODE — SIMULATED RESULT — NOT AI ANALYSIS",
        riskLevel,
        riskTitle,
        confidence: "MODERATE",
        confidenceExplanation: "This reflects confidence in the simulated packaging check parameters, not the probability that the medicine is counterfeit.",

        authenticityDisclaimer: "Packaging analysis cannot confirm authenticity. Potential concern detected — professional verification recommended.",

        medicineName: "Panadol (Simulated Demo)",
        genericName: "Paracetamol",
        activeIngredients: ["Paracetamol 500mg"],
        strength: "500mg",
        dosageForm: "Tablet Packaging Strip",
        manufacturer: "GlaxoSmithKline Pakistan (Simulated Label)",
        batchNumber: "LOT-2025-88A",
        expiryDate: "12/2027",
        manufacturingDate: "01/2025",

        observations: [
            "Brand name 'Panadol' is clearly printed on packaging strip",
            "Active ingredient 'Paracetamol 500mg' is stated",
            "Manufacturer logo and DRAP registration markings visible",
            "Expirations date stamp format matches standard Pakistani packaging convention"
        ],

        concerns: concerns.length > 0 ? concerns : ["No immediate packaging layout defects detected in visual check"],

        verificationRecommendations: [
            "Check the batch/lot number directly with the official manufacturer or distributor.",
            "Compare packaging print quality, foil seal, and embossed numbers with a verified pharmacy purchase.",
            "Ask a licensed pharmacist to inspect the medicine before consumption.",
            "Do not consume any medicine if packaging seal appears tampered with or damaged."
        ],

        imageQuality,
        explanation: summary,

        medicalDisclaimer: "MedGuard AI provides general educational information and packaging risk assessment. It does not provide medical diagnosis, personalized treatment, or proof of product authenticity."
    };
}
