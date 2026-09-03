/**
 * MedGuard AI - Pakistan Medicines Database
 * Comprehensive database of commonly prescribed and OTC medicines in Pakistan.
 */

const MEDICINES_DB = [
    {
        id: "med-001",
        brandName: "Panadol",
        genericName: "Paracetamol (Acetaminophen)",
        manufacturer: "GSK Pakistan",
        category: "Fever & Pain Relief",
        forms: ["Tablet (500mg)", "Extra Tablet (500mg + 65mg Caffeine)", "Syrup (120mg/5ml)", "Drops"],
        pricePKR: "Rs. 35 - Rs. 90 (per pack)",
        prescriptionRequired: false,
        usageEn: "Used for quick relief from fever, headache, body ache, toothache, earache, and mild to moderate arthritis pain.",
        usageUr: "بخار، سر درد، جسم کے درد، دانت کے درد اور ہلکے درد کو دور کرنے کے لیے استعمال ہوتی ہے۔",
        usageRomanUrdu: "Buhar, sar dard, jism ke dard aur dant ke dard ko door karne ke liye istemal hoti hai.",
        dosageEn: "Adults: 1 to 2 tablets every 4-6 hours as needed. Maximum 8 tablets (4000mg) per day. Children: Use syrup as per weight/age guidelines.",
        dosageUr: "بالغ افراد: ضرورت کے وقت 1 سے 2 گولیاں ہر 4 سے 6 گھنٹے بعد۔ 24 گھنٹے میں 8 گولیوں سے زیادہ نہ لیں۔ بچوں کے لیے شربت ان کے وزن کے مطابق دیں۔",
        sideEffectsEn: ["Rare skin allergic reactions", "Liver damage if taken in excessive dosage", "Nausea (rare)"],
        sideEffectsUr: ["جلد پر الرجی (شاذ و نادر)", "زیادہ خوراک کی صورت میں جگر کو نقصان", "متلی"],
        precautionsEn: "Do not exceed recommended dose. Avoid alcohol while taking paracetamol. Consult doctor if fever lasts > 3 days.",
        precautionsUr: "تجویز کردہ خوراک سے زیادہ نہ لیں۔ الکحل سے پرہیز کریں۔ اگر بخار 3 دن سے زیادہ رہے تو ڈاکٹر سے رجوع کریں۔",
        alternatives: [
            { name: "Calpol", price: "Rs. 30", manufacturer: "GSK" },
            { name: "Febrol", price: "Rs. 28", manufacturer: "Searle Pakistan" },
            { name: "Disprol", price: "Rs. 32", manufacturer: "Reckitt Benckiser" },
            { name: "Paraco", price: "Rs. 25", manufacturer: "Hilton Pharma" }
        ],
        interactions: ["Warfarin", "Alcohol", "Isoniazid"],
        ocrKeywords: ["PANADOL", "PARACETAMOL", "ACETAMINOPHEN", "500MG", "GSK", "EXTRA", "FEVER", "PAIN"]
    },
    {
        id: "med-002",
        brandName: "Risek",
        genericName: "Omeprazole",
        manufacturer: "Getz Pharma Pakistan",
        category: "Stomach & Acid Reflux (PPI)",
        forms: ["Capsule (20mg)", "Capsule (40mg)", "Sachet (20mg, 40mg)", "IV Injection"],
        pricePKR: "Rs. 280 - Rs. 450 (per 14 capsules)",
        prescriptionRequired: false,
        usageEn: "Used to treat acidity, heart burn, stomach ulcers, GERD (gastroesophageal reflux), and gastritis.",
        usageUr: "تیزابیت، سینے کی جلن، معدے کے السر اور معدے کے مسائل کے علاج کے لیے استعمال ہوتی ہے۔",
        usageRomanUrdu: "Teezabiyaat, seene ki jalan, maiday ke ulcer aur teezabi maday ke liye istemal hoti hai.",
        dosageEn: "Adults: Take 1 capsule (20mg or 40mg) daily in the morning 30 minutes BEFORE breakfast with water.",
        dosageUr: "بالغ افراد: روزانہ صبح ناشتے سے 30 منٹ پہلے خالی پیٹ پانی کے ساتھ 1 کیپسول لیں۔",
        sideEffectsEn: ["Headache", "Abdominal pain or constipation", "Diarrhea", "Flatulence"],
        sideEffectsUr: ["سر درد", "پیٹ کا درد یا قبض", "اسہال (دست)", "گیس بننا"],
        precautionsEn: "Do not crush or chew capsules. Swallow whole. Long-term use can reduce Vitamin B12 and Magnesium levels.",
        precautionsUr: "کیپسول کو نہ توڑیں اور نہ چبائیں۔ لمبے عرصے تک بغیر ڈاکٹر کی صلاح کے استعمال نہ کریں۔",
        alternatives: [
            { name: "Omez", price: "Rs. 180", manufacturer: "Searle" },
            { name: "Proton", price: "Rs. 210", manufacturer: "Martin Dow" },
            { name: "Zolgel", price: "Rs. 195", manufacturer: "High-Q" },
            { name: "Omeptec", price: "Rs. 175", manufacturer: "Bosch Pharma" }
        ],
        interactions: ["Clopidogrel", "Ketoconazole", "Methotrexate", "Digoxin"],
        ocrKeywords: ["RISEK", "OMEPRAZOLE", "GETZ", "20MG", "40MG", "ACIDITY", "CAPSULES"]
    },
    {
        id: "med-003",
        brandName: "Augmentin",
        genericName: "Amoxicillin + Clavulanic Acid",
        manufacturer: "GSK Pakistan",
        category: "Antibiotic",
        forms: ["Tablet 625mg", "Tablet 1g (1000mg)", "Syrup (156mg/5ml, 312mg/5ml, 457mg/5ml)"],
        pricePKR: "Rs. 240 - Rs. 420 (per strip)",
        prescriptionRequired: true,
        usageEn: "Broad-spectrum antibiotic used to treat bacterial infections of throat, lungs, ear, sinuses, urinary tract, and skin.",
        usageUr: "گلے، پھیپھڑوں، کان، سائنَس، پیشاب کی نالی اور جلد کے بیکٹیریل انفیکشن کا علاج کرتی ہے۔",
        usageRomanUrdu: "Galay, phepdon, kaan aur jild ke infection ke ilaj ke liye zaroori antibiotic hai.",
        dosageEn: "Adults: 625mg or 1g every 12 hours after meals for 5-7 days or as prescribed by a doctor. Complete the full course!",
        dosageUr: "بالغ افراد: 1 گولی ہر 12 گھنٹے بعد کھانے کے بعد 5 سے 7 دن تک۔ ڈاکٹر کے بتائے گئے مکمل کورس کو لازمی پورا کریں۔",
        sideEffectsEn: ["Nausea and vomiting", "Diarrhea", "Mild skin rash", "Fungal/thrush infection"],
        sideEffectsUr: ["متلی اور الٹی", "دست (ڈائریا)", "جلد پر ہلکی خارش"],
        precautionsEn: "Must be prescribed by a physician. Complete the full antibiotic course even if feeling better to avoid resistance.",
        precautionsUr: "یہ صرف ڈاکٹر کی ہدایت پر لیں۔ بیمار ٹھیک ہونے پر بھی کورس ادھورا نہ چھوڑیں۔",
        alternatives: [
            { name: "Calamox", price: "Rs. 310", manufacturer: "Bosch Pharma" },
            { name: "Klavax", price: "Rs. 290", manufacturer: "Getz Pharma" },
            { name: "Amoxi-Clav", price: "Rs. 270", manufacturer: "Hilton" },
            { name: "Co-Amoxiclav", price: "Rs. 250", manufacturer: "Sami Pharma" }
        ],
        interactions: ["Allopurinol", "Probenecid", "Oral Contraceptive Pills", "Warfarin"],
        ocrKeywords: ["AUGMENTIN", "AMOXICILLIN", "CLAVULANIC", "625MG", "1G", "GSK", "ANTIBIOTIC"]
    },
    {
        id: "med-004",
        brandName: "Brufen",
        genericName: "Ibuprofen",
        manufacturer: "Abbott Pakistan",
        category: "Pain, Inflammation & Fever (NSAID)",
        forms: ["Tablet (200mg, 400mg, 600mg)", "Syrup (100mg/5ml)", "DS Syrup"],
        pricePKR: "Rs. 40 - Rs. 110 (per pack)",
        prescriptionRequired: false,
        usageEn: "Reduces pain, swelling, fever, menstrual cramps, dental pain, joint inflammation, and muscle aches.",
        usageUr: "سوجن، بخار، جوڑوں کے درد، پٹھوں کی کھچاؤ اور دانت کے درد میں کمی کے لیے استعمال ہوتی ہے۔",
        usageRomanUrdu: "Soojan, buhar, jodon ke dard aur patthon ki takleef ko kam karti hai.",
        dosageEn: "Adults: 200mg to 400mg every 6 to 8 hours with food or milk. Do not take on an empty stomach.",
        dosageUr: "بالغ افراد: 1 گولی (400mg) ہر 6 سے 8 گھنٹے بعد کھانے کے ساتھ یا دودھ کے بعد۔ خالی پیٹ ہرگز نہ لیں۔",
        sideEffectsEn: ["Stomach upset/heartburn", "Gastric ulcer risk with frequent use", "Dizziness"],
        sideEffectsUr: ["معدے میں تپش یا جلن", "زیادہ استعمال سے معدے کے السر کا خطرہ", "چکر آنا"],
        precautionsEn: "Avoid if you have stomach ulcers, severe kidney disease, or asthma. Always take with food.",
        precautionsUr: "معدے کے السر، گردے کی بیماری یا دمے کے مریض احتیاط کے ساتھ لیں۔ ہمیشہ کھانے کے بعد لیں۔",
        alternatives: [
            { name: "Profen", price: "Rs. 35", manufacturer: "Sami Pharma" },
            { name: "Ibu", price: "Rs. 30", manufacturer: "High-Q" },
            { name: "Dolofen", price: "Rs. 38", manufacturer: "Searle" }
        ],
        interactions: ["Aspirin", "Blood Thinners (Warfarin)", "ACE Inhibitors", "Steroids"],
        ocrKeywords: ["BRUFEN", "IBUPROFEN", "ABBOTT", "400MG", "200MG", "PAIN", "SYRUP"]
    },
    {
        id: "med-005",
        brandName: "Arinac",
        genericName: "Ibuprofen + Pseudoephedrine HCl",
        manufacturer: "Abbott Pakistan",
        category: "Cold, Flu & Nasal Congestion",
        forms: ["Tablet (200mg/30mg)", "Forte Tablet", "Syrup"],
        pricePKR: "Rs. 60 - Rs. 130 (per pack)",
        prescriptionRequired: false,
        usageEn: "Relieves sinus pain, nasal congestion, runny nose, fever, and body aches caused by cold or flu.",
        usageUr: "نزلہ، زکام، بند ناک، سینے کی جکڑن، بخار اور جسم کے درد کو ٹھیک کرتی ہے۔",
        usageRomanUrdu: "Nazla, zukam, band naak aur buhar ke liye behtareen dava hai.",
        dosageEn: "Adults: 1 tablet every 6 hours. Do not exceed 4 tablets in 24 hours.",
        dosageUr: "بالغ افراد: 1 گولی ہر 6 گھنٹے بعد۔ 24 گھنٹے میں 4 گولیوں سے زیادہ نہ لیں۔",
        sideEffectsEn: ["Insomnia / Difficulty sleeping", "Elevated blood pressure & heart rate", "Dry mouth"],
        sideEffectsUr: ["نیند نہ آنا یا بے چینی", "بلڈ پریشر اور دل کی دھڑکن تیز ہونا", "منہ کا سوکھنا"],
        precautionsEn: "Patients with high blood pressure, heart disease, or glaucoma should consult doctor before taking.",
        precautionsUr: "ہائی بلڈ پریشر یا دل کی بیماری والے افراد استعمال سے پہلے ڈاکٹر سے مشورہ کریں۔",
        alternatives: [
            { name: "Sinutab", price: "Rs. 50", manufacturer: "J&J" },
            { name: "Actifed Cold", price: "Rs. 55", manufacturer: "GSK" },
            { name: "Coldrex", price: "Rs. 65", manufacturer: "GSK" }
        ],
        interactions: ["MAO Inhibitors", "Blood Pressure Medication", "Decongestants"],
        ocrKeywords: ["ARINAC", "IBUPROFEN", "PSEUDOEPHEDRINE", "ABBOTT", "COLD", "FLU", "FORTE"]
    },
    {
        id: "med-006",
        brandName: "Softin",
        genericName: "Loratadine",
        manufacturer: "Getz Pharma Pakistan",
        category: "Allergy & Antihistamine",
        forms: ["Tablet (10mg)", "Syrup (5mg/5ml)"],
        pricePKR: "Rs. 120 - Rs. 180 (per 10 tablets)",
        prescriptionRequired: false,
        usageEn: "Provides relief from allergy symptoms such as sneezing, runny nose, watery eyes, itching, and skin hives.",
        usageUr: "چھینکیں، زکام، آنکھوں سے پانی بہنا، کھجلی اور الرجی کی علامات کو کنٹرول کرتی ہے۔",
        usageRomanUrdu: "Cheenkein, zukam, jild ki khujli aur allergy ko khatam karti hai.",
        dosageEn: "Adults & Children > 12 yrs: 1 tablet (10mg) once daily.",
        dosageUr: "بالغ اور 12 سال سے بڑے بچے: دن میں صرف 1 گولی (10mg) لیں۔",
        sideEffectsEn: ["Drowsiness (rare)", "Headache", "Dry mouth"],
        sideEffectsUr: ["ہلکی غنودگی (بہت کم)", "سر میں درد", "خشک منہ"],
        precautionsEn: "Non-drowsy for most people, but evaluate your reaction before driving heavy vehicles.",
        precautionsUr: "عام طور پر غنودگی نہیں کرتی، لیکن اگر پہلی بار لے رہے ہیں تو گاڑی چلاتے وقت احتیاط کریں۔",
        alternatives: [
            { name: "Claritin", price: "Rs. 210", manufacturer: "Bayer" },
            { name: "Lora", price: "Rs. 95", manufacturer: "Searle" },
            { name: "Allergetz", price: "Rs. 110", manufacturer: "Getz" }
        ],
        interactions: ["Ketoconazole", "Erythromycin", "Cimetidine"],
        ocrKeywords: ["SOFTIN", "LORATADINE", "GETZ", "10MG", "ALLERGY", "TABLET"]
    },
    {
        id: "med-007",
        brandName: "Rigix",
        genericName: "Cetirizine Dihydrochloride",
        manufacturer: "AGP Limited Pakistan",
        category: "Allergy & Antihistamine",
        forms: ["Tablet (10mg)", "Syrup (5mg/5ml)", "Oral Drops"],
        pricePKR: "Rs. 90 - Rs. 140 (per pack)",
        prescriptionRequired: false,
        usageEn: "Effective relief for seasonal allergic rhinitis, dusty allergy, insect bites, itching, and chronic hives.",
        usageUr: "موسمی الرجی، گردو غبار کی الرجی، خارش اور جسم پر سرخ دھبوں کی روک تھام۔",
        usageRomanUrdu: "Mausami allergy, dhool mitti ki allergy aur khujli ke liye behtareen.",
        dosageEn: "Adults: 1 tablet (10mg) daily at bedtime.",
        dosageUr: "بالغ افراد: روزانہ رات سونے سے پہلے 1 گولی (10mg)۔",
        sideEffectsEn: ["Mild drowsiness/sleepiness", "Fatigue", "Dry mouth"],
        sideEffectsUr: ["غفلت یا نیند آنا", "تھکاوٹ", "منہ خشک ہونا"],
        precautionsEn: "May cause drowsiness. Avoid driving or operating machinery after taking.",
        precautionsUr: "نیند آسکتی ہے، دوا لینے کے بعد گاڑی یا بھاری مشینری چلانے سے گریز کریں۔",
        alternatives: [
            { name: "Zyrtec", price: "Rs. 160", manufacturer: "GSK" },
            { name: "Cetron", price: "Rs. 75", manufacturer: "Hilton" },
            { name: "Allertek", price: "Rs. 80", manufacturer: "Searle" }
        ],
        interactions: ["Sedatives", "Alcohol", "Tranquilizers"],
        ocrKeywords: ["RIGIX", "CETIRIZINE", "AGP", "10MG", "ALLERGY"]
    },
    {
        id: "med-008",
        brandName: "Flagyl",
        genericName: "Metronidazole",
        manufacturer: "Sanofi Pakistan",
        category: "Stomach Infection & Anti-protozoal",
        forms: ["Tablet (200mg, 400mg)", "Syrup (200mg/5ml)", "Infusion"],
        pricePKR: "Rs. 45 - Rs. 120 (per pack)",
        prescriptionRequired: true,
        usageEn: "Treats bacterial stomach infections, diarrhea, amoebic dysentery, dental infections, and abdominal infections.",
        usageUr: "پیٹ کے انفیکشن، پیچش (دست)، روٹی اور دانتوں کے انفیکشن کے علاج کے لیے۔",
        usageRomanUrdu: "Peet ke infection, pechish (dast) aur dant ke zakham ke ilaj ke liye.",
        dosageEn: "Adults: 400mg 3 times a day (every 8 hours) after food for 5 to 7 days.",
        dosageUr: "بالغ افراد: 1 گولی (400mg) دن میں 3 بار (ہر 8 گھنٹے بعد) کھانے کے بعد 5 سے 7 دن تک۔",
        sideEffectsEn: ["Metallic taste in mouth", "Nausea", "Dark colored urine (harmless)", "Stomach cramps"],
        sideEffectsUr: ["منہ کا ذائقہ کڑوا/دھاتی ہونا", "متلی", "پیشاب کا رنگ گہرا ہونا"],
        precautionsEn: "STRICTLY avoid alcohol and alcohol-containing cough syrups while taking Flagyl and 48 hours after stopping.",
        precautionsUr: "فلیجل کے استعمال کے دوران الکحل یا اس پر مبنی ادویات کا استعمال سخت منع ہے۔",
        alternatives: [
            { name: "Metrozil", price: "Rs. 35", manufacturer: "Searle" },
            { name: "Entamizole", price: "Rs. 85", manufacturer: "Abbott (Combination)" },
            { name: "Nidazol", price: "Rs. 40", manufacturer: "Hilton" }
        ],
        interactions: ["Alcohol", "Warfarin", "Lithium", "Disulfiram"],
        ocrKeywords: ["FLAGYL", "METRONIDAZOLE", "SANOFI", "400MG", "200MG", "INFRACTION"]
    },
    {
        id: "med-009",
        brandName: "Disprin",
        genericName: "Aspirin (Acetylsalicylic Acid)",
        manufacturer: "Reckitt Benckiser Pakistan",
        category: "Blood Thinning & Emergency Heart Care / Pain",
        forms: ["Soluble Tablet (300mg)", "Low Dose (75mg / 150mg Cardio)"],
        pricePKR: "Rs. 25 - Rs. 50 (per strip)",
        prescriptionRequired: false,
        usageEn: "Used for quick relief of headache, toothache. Low dose used under medical advice for heart attack prevention & blood thinning.",
        usageUr: "سر درد کا فوری حل۔ دل کے دورے اور خون کے تھکے جمنے سے بچاؤ کے لیے استعمال ہوتی ہے۔",
        usageRomanUrdu: "Sar dard ke liye aur dil ke mareezon ke liye khoon patla karne ki dawa.",
        dosageEn: "Dissolve 1-2 soluble tablets in half a glass of water. Take with or after food. Emergency heart advice: Chew 300mg immediately if suspecting heart attack & call 1122.",
        dosageUr: "1 سے 2 گولیاں آدھے گلاس پانی میں گھول کر لیں۔ ہارٹ اٹیک کے شائبے پر 1 گولی چبا کر لیں اور 1122 پر کال کریں۔",
        sideEffectsEn: ["Stomach irritation or bleeding risk", "Ringing in ears (tinnitus)", "Allergic wheezing"],
        sideEffectsUr: ["معدے میں تکلیف یا خون بہنا", "کانوں میں سائیں سائیں کی آوازیں"],
        precautionsEn: "DO NOT give to children under 16 years (risk of Reye's syndrome). Avoid if asthmatic or ulcer patient.",
        precautionsUr: "16 سال سے کم عمر بچوں کو ہرگز نہ دیں۔ معدے کے السر والے افراد پرہیز کریں۔",
        alternatives: [
            { name: "Ascard", price: "Rs. 40", manufacturer: "Atco Pharma" },
            { name: "Loprin", price: "Rs. 35", manufacturer: "High-Q" },
            { name: "Zestril Cardio", price: "Rs. 30", manufacturer: "GSK" }
        ],
        interactions: ["Warfarin", "Ibuprofen", "Methotrexate", "Steroids"],
        ocrKeywords: ["DISPRIN", "ASPIRIN", "RECKITT", "SOLUBLE", "300MG", "HEADACHE"]
    },
    {
        id: "med-0010",
        brandName: "Calamox",
        genericName: "Amoxicillin + Potassium Clavulanate",
        manufacturer: "Bosch Pharmaceuticals",
        category: "Antibiotic",
        forms: ["Tablet (375mg, 625mg, 1g)", "Suspension (228mg, 457mg/5ml)"],
        pricePKR: "Rs. 290 - Rs. 440 (per pack)",
        prescriptionRequired: true,
        usageEn: "High-potency antibiotic for chest infections, bronchitis, severe sinusitis, dental abscesses, and urinary infections.",
        usageUr: "سینے کی جکڑن، نیومونیا، گلے کے انفیکشن اور دانت کے ورم کا مؤثر علاج۔",
        usageRomanUrdu: "Seene ke infection, pneumonia aur galay ki takleef ke ilaj ke liye.",
        dosageEn: "As prescribed by doctor. Usually 625mg twice daily after meals for 5 to 7 days.",
        dosageUr: "ڈاکٹر کی ہدایت کے مطابق۔ عام طور پر 1 گولی دن میں 2 بار کھانے کے بعد۔",
        sideEffectsEn: ["Loose stools / diarrhea", "Mild stomach pain", "Skin rash"],
        sideEffectsUr: ["دست (ڈائریا)", "پیٹ درد", "جلد کی الرجی"],
        precautionsEn: "Do not stop treatment early. Inform doctor if liver problems exist.",
        precautionsUr: "علاج کا وقت پورا کریں۔ جگر کے مسائل کی صورت میں ڈاکٹر کو بتائیں۔",
        alternatives: [
            { name: "Augmentin", price: "Rs. 380", manufacturer: "GSK" },
            { name: "Klavax", price: "Rs. 290", manufacturer: "Getz Pharma" }
        ],
        interactions: ["Warfarin", "Allopurinol"],
        ocrKeywords: ["CALAMOX", "BOSCH", "AMOXICILLIN", "CLAVULANATE", "625MG"]
    }
];

// Pakistan Emergency Helplines
const PAKISTAN_HELPLINES = [
    { name: "AlKhidmat Health & Disaster Helpline", number: "1023", desc: "AlKhidmat Foundation Pakistan 24/7 National Emergency" },
    { name: "Rescue 1122 (Ambulance & Medical Emergency)", number: "1122", desc: "Government Emergency Service (Nationwide)" },
    { name: "Edhi Foundation Emergency Service", number: "115", desc: "Ambulance & Hospital Network" },
    { name: "Chhipa Ambulance Service", number: "1020", desc: "Emergency Transport" },
    { name: "Poison Control & Drug Information (Karachi)", number: "021-99215740", desc: "JPMC Poisoning Advisory" },
    { name: "Agha Khan University Hospital Helpline", number: "021-111-911-911", desc: "24/7 Medical Advice" },
    { name: "Shaukat Khanum Hospital Helpline", number: "042-35905000", desc: "Lahore Medical Center" }
];

// AlKhidmat Foundation Health Network (Hackathon Integration)
const ALKHIDMAT_HEALTH_CENTERS = [
    {
        city: "Lahore",
        name: "AlKhidmat Hospital Surayya Azim",
        address: "Chauburji, Multan Road, Lahore",
        phone: "042-37418281",
        services: ["Free Medicine Assistance", "24/7 Pharmacy", "Outpatient Care", "Diagnostic Lab"]
    },
    {
        city: "Karachi",
        name: "AlKhidmat Farah Naz Hospital",
        address: "Nazimabad No. 3, Karachi",
        phone: "021-36612000",
        services: ["Subsidized Medicines", "Maternity Care", "Laboratory Tests", "Ultrasound"]
    },
    {
        city: "Peshawar",
        name: "AlKhidmat Hospital Nishtarabad",
        address: "Nishtarabad, GT Road, Peshawar",
        phone: "091-2216000",
        services: ["Free Medical Dispensary", "Emergency Response", "Dialysis Unit"]
    },
    {
        city: "Islamabad / Rawalpindi",
        name: "AlKhidmat Raazi Hospital",
        address: "C-Block, Satellite Town, Rawalpindi",
        phone: "051-4417770",
        services: ["Diagnostic Center", "Pharmacies Network", "Free Blood Bank"]
    },
    {
        city: "Quetta",
        name: "AlKhidmat Medical Complex Quetta",
        address: "Zarghoon Road, Quetta",
        phone: "081-2824000",
        services: ["Ambulance Base", "Welfare Pharmacy", "Consultant Clinics"]
    }
];

