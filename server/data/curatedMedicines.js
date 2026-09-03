/**
 * MedGuard AI — Curated Reference Database
 * 
 * IMPORTANT SAFETY RULE:
 * This dataset provides GENERAL educational reference information only.
 * It does NOT provide personalized medical advice or prescriptions.
 */

export const CURATED_MEDICINES = [
    {
        id: "panadol",
        name: "Panadol",
        genericName: "Paracetamol (Acetaminophen)",
        brandName: "Panadol",
        activeIngredients: ["Paracetamol 500mg"],
        drugClass: "Analgesic & Antipyretic (Pain reliever & fever reducer)",
        dosageForm: "Tablet",
        strength: "500mg",
        manufacturer: "GlaxoSmithKline (GSK) Pakistan Consumer Healthcare",
        countryRegion: "Pakistan (DRAP Registered)",
        prescriptionStatus: "Over-The-Counter (OTC)",

        description: "Panadol contains paracetamol, an analgesic (pain reliever) and antipyretic (fever reducer) widely used in Pakistan for relief from mild-to-moderate pain and fever.",

        uses: [
            "Headache and tension pain relief",
            "Fever reduction during viral illnesses or flu",
            "Toothache and dental pain relief",
            "Muscle aches and body pains",
            "Dysmenorrhea (period pain)"
        ],

        howItWorks: "Paracetamol acts primarily in the central nervous system to inhibit prostaglandin synthesis, thereby elevating the pain threshold and regulating body temperature in the hypothalamus.",

        dosageLabel: "General dosage information — not a personalized prescription.",
        dosage: "Adults and adolescents (12 years and above): 1 to 2 tablets (500mg to 1000mg) every 4 to 6 hours as needed. Do not exceed 8 tablets (4000mg) in a 24-hour period.",

        howToTake: "Swallow tablets whole with water. May be taken with or without food. Do not take alongside other products containing paracetamol.",

        precautions: [
            "Liver impairment: Use extreme caution; paracetamol toxicity can cause liver damage.",
            "Do not combine with other paracetamol-containing cold or pain remedies.",
            "Avoid chronic heavy alcohol consumption while taking paracetamol.",
            "Consult a doctor if pain persists for more than 5 days or fever lasts more than 3 days."
        ],

        sideEffects: [
            "Nausea (rare at recommended doses)",
            "Rash or mild skin irritation (uncommon)"
        ],

        seriousSideEffects: [
            "Severe allergic reaction (anaphylaxis, facial swelling, difficulty breathing)",
            "Signs of liver toxicity (yellowing of skin/eyes, dark urine, severe stomach pain)",
            "Unexplained bruising or bleeding (rare blood disorders)"
        ],

        interactions: [
            "Medicines: Warfarin / blood thinners (long-term daily use may increase bleeding risk)",
            "Supplements: Avoid taking with other liver-processed supplements without advice",
            "Alcohol: Chronic alcohol ingestion increases risk of paracetamol liver damage",
            "Food: Food may slightly delay absorption, but taking with food reduces stomach upset"
        ],

        contraindications: [
            "Hypersensitivity or severe allergy to paracetamol",
            "Severe active liver failure or severe acute hepatic impairment"
        ],

        storage: "Store below 30°C in a dry place. Protect from excessive heat, light, and moisture. Keep out of reach of children.",

        missedDose: "If taking on a regular schedule and a dose is missed, take it when remembered unless it is almost time for the next dose. Never double up doses.",

        overdose: "Suspected paracetamol overdose is a medical emergency due to catastrophic liver injury risk. Immediately contact emergency services (1122 or 1023 in Pakistan) or proceed to the nearest hospital casualty department.",

        specialPopulations: [
            "Children: Pediatric oral suspension formulations (e.g. Panadol Syrup) should be used under adult guidance; do not give adult 500mg tablets to young children.",
            "Pregnancy: Considered acceptable for short-term use at lowest effective dose under healthcare practitioner guidance.",
            "Breastfeeding: Excreted in breast milk in small quantities; generally considered safe at recommended doses.",
            "Kidney Impairment: Dose interval adjustment (e.g., 6 to 8 hours) may be required in severe renal failure."
        ],

        sources: [
            "Drug Regulatory Authority of Pakistan (DRAP) Official Registration Registry",
            "GSK Consumer Healthcare Product Leaflet & Documentation",
            "British National Formulary (BNF) Paracetamol Monograph"
        ]
    },
    {
        id: "aspirin",
        name: "Aspirin (Disprin)",
        genericName: "Acetylsalicylic Acid (ASA)",
        brandName: "Disprin / Aspirin",
        activeIngredients: ["Acetylsalicylic Acid 300mg / 75mg"],
        drugClass: "Nonsteroidal Anti-Inflammatory Drug (NSAID) & Antiplatelet",
        dosageForm: "Soluble Tablet / Enteric-Coated Tablet",
        strength: "300mg (Analgesic) / 75mg (Low-dose antiplatelet)",
        manufacturer: "Reckitt Benckiser / Various DRAP-licensed manufacturers",
        countryRegion: "Pakistan (DRAP Registered)",
        prescriptionStatus: "OTC / Prescription for cardio-protection",

        description: "Aspirin (often branded as Disprin in Pakistan) is a nonsteroidal anti-inflammatory drug used for pain relief, inflammation reduction, and low-dose cardiovascular protection under medical supervision.",

        uses: [
            "Temporary relief of mild to moderate pain (headache, toothache)",
            "Reduction of inflammation in rheumatoid conditions",
            "Low-dose antiplatelet therapy for cardiovascular protection (under strict physician advice)"
        ],

        howItWorks: "Irreversibly inhibits cyclooxygenase-1 and 2 (COX-1 and COX-2) enzymes, suppressing the production of prostaglandins and thromboxane A2.",

        dosageLabel: "General dosage information — not a personalized prescription.",
        dosage: "Analgesic dose (Adults): 300mg to 600mg dissolved in water every 4 to 6 hours as needed (max 3600mg daily). Low-dose antiplatelet: 75mg to 150mg daily ONLY as prescribed by a cardiologist.",

        howToTake: "Dissolve soluble tablets in half a glass of water. Take with or immediately after food to minimize stomach irritation.",

        precautions: [
            "Stomach Ulcers: High risk of gastrointestinal bleeding or ulceration.",
            "Asthma: May trigger severe bronchospasm in aspirin-sensitive asthma patients.",
            "Bleeding Disorders: Increases bleeding time; stop prior to elective surgeries."
        ],

        sideEffects: [
            "Heartburn, indigestion, or stomach pain",
            "Mild nausea",
            "Increased tendency to bleed (e.g. nosebleeds, bruising)"
        ],

        seriousSideEffects: [
            "Gastrointestinal bleeding (black tarry stools, vomiting blood)",
            "Tinnitus (ringing in the ears) or sudden hearing impairment",
            "Reye's syndrome (life-threatening condition in children with viral infections)"
        ],

        interactions: [
            "Medicines: Anticoagulants (Warfarin, Heparin), other NSAIDs (Ibuprofen), Systemic Steroids",
            "Supplements: Ginkgo biloba, Garlic supplements (may further increase bleeding risk)",
            "Alcohol: Alcohol significantly increases stomach bleeding risk with aspirin",
            "Food: Take with meals to protect gastric mucosa"
        ],

        contraindications: [
            "Children and teenagers under 16 years recovering from flu or chickenpox (Risk of Reye's Syndrome)",
            "Active peptic ulceration or history of severe GI bleeding",
            "Severe heart failure, severe liver, or severe renal impairment"
        ],

        storage: "Store below 25°C. Keep container tightly closed to protect from moisture.",

        missedDose: "Take when remembered unless close to next dose. Do not take double doses.",

        overdose: "Aspirin overdose causes severe metabolic acidosis, hyperventilation, vomiting, and confusion. Seek immediate emergency room care.",

        specialPopulations: [
            "Children: CONTRAINDICATED in children under 16 years due to Reye's syndrome risk.",
            "Pregnancy: Avoid during third trimester (risk of premature closure of ductus arteriosus and bleeding complications).",
            "Breastfeeding: Excreted in breast milk; high doses should be avoided.",
            "Older Adults: Higher risk of severe stomach bleeding; monitor closely."
        ],

        sources: [
            "DRAP Registered Drug List",
            "Reckitt Benckiser Disprin Package Insert",
            "WHO Model List of Essential Medicines"
        ]
    },
    {
        id: "ibuprofen",
        name: "Ibuprofen (Brufen)",
        genericName: "Ibuprofen",
        brandName: "Brufen",
        activeIngredients: ["Ibuprofen 200mg / 400mg"],
        drugClass: "Nonsteroidal Anti-Inflammatory Drug (NSAID)",
        dosageForm: "Film-Coated Tablet / Suspension",
        strength: "200mg / 400mg",
        manufacturer: "Abbott Laboratories Pakistan",
        countryRegion: "Pakistan (DRAP Registered)",
        prescriptionStatus: "Over-The-Counter (OTC)",

        description: "Ibuprofen (commonly known as Brufen in Pakistan) is a widely prescribed NSAID for reducing pain, swelling, inflammation, and fever.",

        uses: [
            "Arthritis and joint inflammation relief",
            "Menstrual cramps (dysmenorrhea)",
            "Post-dental pain and muscular sprains",
            "Fever reduction when paracetamol is inadequate"
        ],

        howItWorks: "Inhibits COX-1 and COX-2 enzymes to decrease the synthesis of inflammatory prostaglandins.",

        dosageLabel: "General dosage information — not a personalized prescription.",
        dosage: "Adults: 200mg to 400mg every 4 to 6 hours after food as needed (maximum 1200mg daily OTC, up to 2400mg under prescription).",

        howToTake: "Take tablets with a meal or full glass of water or milk to protect stomach lining.",

        precautions: [
            "Hypertension & Heart Disease: Long-term NSAID use can elevate blood pressure and cardiovascular risk.",
            "Kidney Function: NSAIDs decrease renal blood flow; use caution in dehydration or renal disease.",
            "Asthma: May trigger allergic reactions or asthma attacks in sensitive individuals."
        ],

        sideEffects: [
            "Stomach upset, heartburn, bloating, or diarrhea",
            "Dizziness or lightheadedness",
            "Mild headache"
        ],

        seriousSideEffects: [
            "Gastrointestinal ulceration or perforation (severe abdominal pain, vomiting blood)",
            "Renal toxicity (sudden decrease in urination, leg swelling)",
            "Severe allergic skin reactions (Stevens-Johnson syndrome risk)"
        ],

        interactions: [
            "Medicines: Antihypertensives (ACE inhibitors, beta blockers), Diuretics, Methotrexate, Lithium",
            "Supplements: Anti-platelet herbal products",
            "Alcohol: Increases risk of gastrointestinal irritation and bleeding",
            "Food: Food decreases peak concentration speed but improves GI tolerance"
        ],

        contraindications: [
            "History of asthma, urticaria, or allergic reactions to aspirin or other NSAIDs",
            "Active stomach bleeding or peptic ulcer",
            "Third trimester of pregnancy"
        ],

        storage: "Store below 30°C in a dry location out of direct sunlight.",

        missedDose: "If taken regularly and a dose is missed, take it as soon as remembered unless near next dose.",

        overdose: "Overdose causes abdominal pain, lethargy, drowsiness, nausea, and metabolic acidosis. Seek urgent emergency care.",

        specialPopulations: [
            "Children: Pediatric suspensions (e.g., Brufen Syrup) dosed by body weight under medical supervision.",
            "Pregnancy: Avoid in 3rd trimester. Consult doctor in 1st/2nd trimester.",
            "Breastfeeding: Appears in breast milk in very low concentrations; generally considered low risk for short term.",
            "Older Adults: Increased risk of adverse GI and renal reactions."
        ],

        sources: [
            "Abbott Laboratories Pakistan Product Summary",
            "DRAP Approved Product Guidelines",
            "BNF NSAID Reference Manual"
        ]
    },
    {
        id: "nuberol-forte",
        name: "Nuberol Forte",
        genericName: "Paracetamol + Orphenadrine Citrate",
        brandName: "Nuberol Forte",
        activeIngredients: ["Paracetamol 650mg", "Orphenadrine Citrate 50mg"],
        drugClass: "Skeletal Muscle Relaxant Combination Analgesic",
        dosageForm: "Tablet",
        strength: "650mg / 50mg",
        manufacturer: "Searle Company Limited Pakistan",
        countryRegion: "Pakistan (DRAP Registered)",
        prescriptionStatus: "Prescription Required",

        description: "Nuberol Forte is a combination formulation prescribed in Pakistan combining a high dose of paracetamol with orphenadrine citrate to relieve acute painful musculoskeletal spasms.",

        uses: [
            "Acute muscle spasms and back pain",
            "Tension headache with neck muscle stiffness",
            "Traumatic muscle injuries and sprains"
        ],

        howItWorks: "Paracetamol provides central analgesia, while orphenadrine acts as a central anticholinergic muscle relaxant by blocking central cholinergic receptors.",

        dosageLabel: "General dosage information — not a personalized prescription.",
        dosage: "Adults: Usually 1 tablet 2 to 3 times daily as prescribed by a medical doctor.",

        howToTake: "Swallow tablet whole with water after meals. Do not crush or chew.",

        precautions: [
            "Drowsiness: Causes sedation; do not drive or operate machinery.",
            "Anticholinergic effects: Dry mouth, blurred vision, urinary retention.",
            "Glaucoma & Prostate Enlargement: Avoid due to anticholinergic action."
        ],

        sideEffects: [
            "Dry mouth and thirst",
            "Drowsiness or dizziness",
            "Mild stomach disquiet"
        ],

        seriousSideEffects: [
            "Tachycardia (fast heart rate) or palpitations",
            "Urinary retention",
            "Severe confusion or hallucinations in elderly patients"
        ],

        interactions: [
            "Medicines: Other CNS depressants, sedatives, antihistamines, or anticholinergic drugs",
            "Supplements: Calming or sedative herbal supplements (e.g., Valerian)",
            "Alcohol: Strictly avoid alcohol; combined CNS depression causes severe sedation",
            "Food: Take after food to reduce gastric irritation"
        ],

        contraindications: [
            "Glaucoma (narrow angle)",
            "Prostatic hypertrophy or bladder neck obstruction",
            "Myasthenia gravis",
            "Severe hepatic failure"
        ],

        storage: "Store below 30°C in a dry place.",

        missedDose: "Take as soon as remembered unless near next dose.",

        overdose: "Orphenadrine overdose causes rapid anticholinergic toxicity (dilated pupils, agitation, fast heart rate, seizures) plus paracetamol liver injury risk. Requires immediate ICU emergency treatment.",

        specialPopulations: [
            "Children: Not recommended for pediatric use.",
            "Pregnancy: Consult prescribing physician; safety not established in pregnancy.",
            "Breastfeeding: Avoid unless prescribed by doctor.",
            "Older Adults: High sensitivity to anticholinergic side effects (confusion, urinary retention, falls)."
        ],

        sources: [
            "Searle Company Limited Official Product Insert",
            "DRAP Formulary Register"
        ]
    },
    {
        id: "amoxicillin",
        name: "Amoxicillin (Amoxil / Augmentin component)",
        genericName: "Amoxicillin Trihydrate",
        brandName: "Amoxil",
        activeIngredients: ["Amoxicillin 250mg / 500mg"],
        drugClass: "Beta-Lactam Antibiotic (Penicillin class)",
        dosageForm: "Capsule / Oral Suspension",
        strength: "250mg / 500mg",
        manufacturer: "GSK Pakistan / Various DRAP-registered manufacturers",
        countryRegion: "Pakistan (DRAP Registered)",
        prescriptionStatus: "Prescription Required",

        description: "Amoxicillin is a broad-spectrum penicillin antibiotic used to treat bacterial infections of the respiratory tract, ears, throat, skin, and urinary tract.",

        uses: [
            "Bacterial chest and respiratory infections (bronchitis, pneumonia)",
            "Acute bacterial sinusitis and otitis media (ear infections)",
            "Bacterial throat infections (strep throat)",
            "Urinary tract bacterial infections"
        ],

        howItWorks: "Binds to penicillin-binding proteins in bacterial cell walls, inhibiting cell wall synthesis and causing bacterial cell lysis.",

        dosageLabel: "General dosage information — not a personalized prescription.",
        dosage: "Adults: Typically 250mg to 500mg every 8 hours (or 875mg every 12 hours) for the duration specified by the prescribing doctor. Complete full course.",

        howToTake: "Take at evenly spaced intervals with or without food. Complete the full prescribed course even if symptoms improve early.",

        precautions: [
            "Antibiotic Resistance: Do not use for viral infections (flu, common cold).",
            "Penicillin Allergy: High risk of severe allergic response in penicillin-sensitive individuals.",
            "Superinfections: Prolonged use may lead to fungal thrush or C. difficile diarrhea."
        ],

        sideEffects: [
            "Diarrhea or loose stools",
            "Nausea or mild stomach discomfort",
            "Mild skin rash"
        ],

        seriousSideEffects: [
            "Anaphylactic allergic reaction (difficulty breathing, throat swelling, hives)",
            "Severe persistent watery diarrhea with abdominal cramping (C. difficile colitis)",
            "Jaundice or liver dysfunction"
        ],

        interactions: [
            "Medicines: Allopurinol (increases rash risk), Oral Anticoagulants, Probenecid",
            "Supplements: Probiotics should be spaced 2 hours apart from antibiotic dose",
            "Alcohol: Moderate alcohol does not directly deactivate amoxicillin, but rest is advised",
            "Food: Can be taken with or without food"
        ],

        contraindications: [
            "Known severe hypersensitivity or anaphylactic reaction to penicillins or cephalosporins"
        ],

        storage: "Store dry capsules below 25°C. Reconstituted liquid suspension must be stored in refrigerator (2°C-8°C) and used within 7 to 14 days.",

        missedDose: "Take missed dose as soon as remembered. If close to next dose, skip and resume regular schedule. Do not double doses.",

        overdose: "May cause severe nausea, vomiting, diarrhea, and electrolyte imbalance. Contact emergency medical center.",

        specialPopulations: [
            "Children: Administered as oral suspension calculated strictly by body weight by pediatrician.",
            "Pregnancy: Commonly prescribed when indicated; category B safety profile under doctor supervision.",
            "Breastfeeding: Passes into breast milk in small amounts; monitor infant for rash or diarrhea.",
            "Kidney Impairment: Dose adjustment required in renal failure."
        ],

        sources: [
            "DRAP Antibiotic Stewardship Guidelines",
            "GSK Amoxil Product Monograph",
            "WHO Model List of Essential Antibiotics"
        ]
    }
];

export function findCuratedMedicine(query) {
    if (!query || typeof query !== "string") return null;
    const q = query.trim().toLowerCase();

    return CURATED_MEDICINES.find(med =>
        med.name.toLowerCase().includes(q) ||
        med.genericName.toLowerCase().includes(q) ||
        med.brandName.toLowerCase().includes(q) ||
        med.id.toLowerCase() === q
    ) || null;
}
