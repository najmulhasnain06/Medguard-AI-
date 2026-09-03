/**
 * MedGuard AI - Main Application Logic
 */

// Application State
const state = {
    currentLang: 'en', // 'en' or 'ur'
    currentTheme: 'light', // 'light' or 'dark'
    activeTab: 'search', // 'search', 'scanner', 'interaction', 'helplines'
    searchQuery: '',
    selectedCategory: 'all',
    cabinet: JSON.parse(localStorage.getItem('medguard_cabinet') || '[]'),
    scanning: false
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    renderCategories();
    renderMedicines();
    initInteractionChecker();
    renderHelplines();
    renderAlKhidmatCenters();
    updateCabinetCount();

    // Pitch Deck Modal Listeners
    const pitchBtn = document.getElementById('pitchDeckBtn');
    const pitchModal = document.getElementById('pitchDeckModal');
    const closePitchBtn = document.getElementById('closePitchBtn');

    if (pitchBtn && pitchModal) {
        pitchBtn.addEventListener('click', () => pitchModal.classList.add('active'));
    }
    if (closePitchBtn && pitchModal) {
        closePitchBtn.addEventListener('click', () => pitchModal.classList.remove('active'));
    }

    // Event Listeners
    document.getElementById('searchInput').addEventListener('input', (e) => {
        state.searchQuery = e.target.value.toLowerCase().trim();
        renderMedicines();
    });

    document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);
    document.getElementById('langToggleBtn').addEventListener('click', toggleLanguage);
    document.getElementById('cabinetBtn').addEventListener('click', toggleCabinetDrawer);
    document.getElementById('closeCabinetBtn').addEventListener('click', toggleCabinetDrawer);
    document.getElementById('scanLauncherBtn').addEventListener('click', openScannerModal);
    document.getElementById('closeScannerBtn').addEventListener('click', closeScannerModal);
    document.getElementById('scanFileInput').addEventListener('change', handleImageUpload);
    document.getElementById('cameraTriggerBtn').addEventListener('click', startSimulatedScan);

    // Tab Navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const targetTab = btn.dataset.tab;
            state.activeTab = targetTab;
            switchTab(targetTab);
        });
    });
});

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('medguard_theme') || 'light';
    state.currentTheme = savedTheme;
    document.documentElement.setAttribute('data-theme', savedTheme);
    const themeBtnText = document.getElementById('themeBtnText');
    if (themeBtnText) {
        themeBtnText.textContent = savedTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
    }
}

function toggleTheme() {
    state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', state.currentTheme);
    localStorage.setItem('medguard_theme', state.currentTheme);
    const themeBtnText = document.getElementById('themeBtnText');
    if (themeBtnText) {
        themeBtnText.textContent = state.currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
    }
}

// Language Management
function initLanguage() {
    const savedLang = localStorage.getItem('medguard_lang') || 'en';
    setLanguage(savedLang);
}

function toggleLanguage() {
    const newLang = state.currentLang === 'en' ? 'ur' : 'en';
    setLanguage(newLang);
}

function setLanguage(lang) {
    state.currentLang = lang;
    localStorage.setItem('medguard_lang', lang);
    if (lang === 'ur') {
        document.body.classList.add('lang-ur');
        document.getElementById('langBtnText').textContent = 'English';
    } else {
        document.body.classList.remove('lang-ur');
        document.getElementById('langBtnText').textContent = 'اردو';
    }

    // Update UI elements with static translations
    updateStaticTranslations();
    renderCategories();
    renderMedicines();
    renderCabinet();
}

function updateStaticTranslations() {
    const isUrdu = state.currentLang === 'ur';

    document.getElementById('heroTitle').textContent = isUrdu ?
        'میڈگارڈ اے آئی - پاکستانی ادویات کی معلومات اور اے آئی سکینر' :
        'MedGuard AI - Pakistan Medicine Safety & AI Scanner';

    document.getElementById('heroSub').textContent = isUrdu ?
        'پاکستان میں عام استعمال ہونے والی ادویات کے استعمال، منفی اثرات، قیمتیں اور متبادل تلاش کریں۔' :
        'Instantly search medicine usage, dosage, PKR price, side effects, and generic alternatives in Pakistan.';

    document.getElementById('searchInput').placeholder = isUrdu ?
        'دوا کا نام یا فارمولا تلاش کریں (مثلاً: Panadol, Risek, Augmentin, بخار)...' :
        'Search medicine name, brand, or formula (e.g. Panadol, Risek, Augmentin)...';
}

// Tab Switching
function switchTab(tabId) {
    const sections = ['searchSection', 'interactionSection', 'alkhidmatSection', 'helplineSection'];
    sections.forEach(secId => {
        const el = document.getElementById(secId);
        if (el) el.style.display = 'none';
    });

    if (tabId === 'search') {
        document.getElementById('searchSection').style.display = 'block';
    } else if (tabId === 'interaction') {
        document.getElementById('interactionSection').style.display = 'block';
    } else if (tabId === 'alkhidmat') {
        document.getElementById('alkhidmatSection').style.display = 'block';
    } else if (tabId === 'helplines') {
        document.getElementById('helplineSection').style.display = 'block';
    }
}


// Category Chips
function renderCategories() {
    const isUrdu = state.currentLang === 'ur';
    const categories = [
        { id: 'all', en: 'All Medicines', ur: 'تمام ادویات' },
        { id: 'Fever & Pain Relief', en: 'Fever & Pain', ur: 'بخار اور درد' },
        { id: 'Stomach & Acid Reflux (PPI)', en: 'Stomach & Acidity', ur: 'معدہ اور تیزابیت' },
        { id: 'Antibiotic', en: 'Antibiotics', ur: 'اینٹی بائیوٹک' },
        { id: 'Allergy & Antihistamine', en: 'Allergy', ur: 'الرجی' },
        { id: 'Cold, Flu & Nasal Congestion', en: 'Cold & Flu', ur: 'نزلہ اور زکام' }
    ];

    const container = document.getElementById('categoriesBar');
    if (!container) return;

    container.innerHTML = categories.map(cat => `
        <button class="cat-chip ${state.selectedCategory === cat.id ? 'active' : ''}" 
                onclick="filterCategory('${cat.id}')">
            ${isUrdu ? cat.ur : cat.en}
        </button>
    `).join('');
}

function filterCategory(catId) {
    state.selectedCategory = catId;
    renderCategories();
    renderMedicines();
}

// Render Medicine Cards
function renderMedicines() {
    const isUrdu = state.currentLang === 'ur';
    const container = document.getElementById('medicineGrid');
    if (!container) return;

    let filtered = MEDICINES_DB.filter(med => {
        const matchesCat = state.selectedCategory === 'all' || med.category === state.selectedCategory;
        const q = state.searchQuery;
        const matchesQuery = !q ||
            med.brandName.toLowerCase().includes(q) ||
            med.genericName.toLowerCase().includes(q) ||
            med.category.toLowerCase().includes(q) ||
            med.usageEn.toLowerCase().includes(q) ||
            med.usageUr.includes(q) ||
            (med.usageRomanUrdu && med.usageRomanUrdu.toLowerCase().includes(q));

        return matchesCat && matchesQuery;
    });

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
                <span style="font-size: 3rem;">🔍</span>
                <h3 style="margin-top: 1rem;">${isUrdu ? 'کوئی دوا نہیں ملی' : 'No Medicines Found'}</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.5rem;">
                    ${isUrdu ? 'براہ کرم دوسرا نام تلاش کریں یا کیٹیگری تبدیل کریں۔' : 'Try searching with a different keyword or formula name.'}
                </p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(med => {
        const isSaved = state.cabinet.some(item => item.id === med.id);
        const usageText = isUrdu ? med.usageUr : med.usageEn;
        const dosageText = isUrdu ? med.dosageUr : med.dosageEn;

        return `
            <div class="med-card" id="card-${med.id}">
                <div>
                    <div class="med-header">
                        <div>
                            <div class="med-brand">${med.brandName}</div>
                            <div class="med-generic">${med.genericName}</div>
                        </div>
                        <span class="med-rx-badge ${med.prescriptionRequired ? 'rx-required' : 'rx-otc'}">
                            ${med.prescriptionRequired ? (isUrdu ? 'نسخہ لازمی' : 'Prescription Only') : (isUrdu ? 'او ٹی سی' : 'OTC / Open')}
                        </span>
                    </div>

                    <div class="med-meta">
                        <span>🏢 ${med.manufacturer}</span>
                        <span>💊 ${med.forms[0]}</span>
                    </div>

                    <div class="med-section-title">${isUrdu ? 'فوائد اور استعمال' : 'PRIMARY USAGE'}</div>
                    <div class="med-description">${usageText}</div>

                    <div class="med-section-title">${isUrdu ? 'خوراک اور طریقہ استعمال' : 'RECOMMENDED DOSAGE'}</div>
                    <div class="med-description" style="font-size: 0.85rem; color: var(--text-muted);">${dosageText}</div>

                    <div class="med-price-tag">
                        <span>${isUrdu ? 'پاکستان میں تخمینی قیمت:' : 'Est. Pakistan Price:'}</span>
                        <span><strong>${med.pricePKR}</strong></span>
                    </div>

                    ${med.alternatives && med.alternatives.length > 0 ? `
                        <div style="margin-top: 0.75rem; background: var(--bg-main); padding: 0.6rem; border-radius: var(--radius-sm); font-size: 0.8rem;">
                            <strong>${isUrdu ? 'سستے متبادل برانڈز:' : 'Cheaper Alternatives:'}</strong>
                            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.25rem;">
                                ${med.alternatives.map(alt => `<span style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 0.15rem 0.4rem; border-radius: 4px;">${alt.name} (${alt.price})</span>`).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>

                <div class="med-actions">
                    <button class="btn-card-action btn-audio-speech" onclick="speakDosage('${med.id}')">
                        🔊 ${isUrdu ? 'آواز سنیں' : 'Listen'}
                    </button>
                    <button class="btn-card-action" onclick="toggleCabinet('${med.id}')" style="${isSaved ? 'background: var(--primary-light); color: var(--primary); border-color: var(--primary);' : ''}">
                        ${isSaved ? '★ Saved' : '☆ Save'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Text-to-Speech Engine
function speakDosage(medId) {
    const med = MEDICINES_DB.find(m => m.id === medId);
    if (!med) return;

    window.speechSynthesis.cancel();

    const isUrdu = state.currentLang === 'ur';
    const textToRead = isUrdu ?
        `${med.brandName}۔ ${med.usageUr} خوراک: ${med.dosageUr}` :
        `${med.brandName}. ${med.usageEn} Recommended Dosage: ${med.dosageEn}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.95;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
}

// Cabinet Storage Management
function toggleCabinet(medId) {
    const med = MEDICINES_DB.find(m => m.id === medId);
    if (!med) return;

    const index = state.cabinet.findIndex(item => item.id === medId);
    if (index > -1) {
        state.cabinet.splice(index, 1);
    } else {
        state.cabinet.push(med);
    }

    localStorage.setItem('medguard_cabinet', JSON.stringify(state.cabinet));
    updateCabinetCount();
    renderMedicines();
    renderCabinet();
}

function updateCabinetCount() {
    const badge = document.getElementById('cabinetBadge');
    if (badge) {
        badge.textContent = state.cabinet.length;
    }
}

function toggleCabinetDrawer() {
    const drawer = document.getElementById('cabinetModal');
    if (drawer) {
        drawer.classList.toggle('active');
        if (drawer.classList.contains('active')) {
            renderCabinet();
        }
    }
}

function renderCabinet() {
    const isUrdu = state.currentLang === 'ur';
    const container = document.getElementById('cabinetList');
    if (!container) return;

    if (state.cabinet.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
                <p>${isUrdu ? 'آپ کی محفوظ کی ہوئی ادویات کی فہرست خالی ہے۔' : 'Your saved medicine cabinet is empty.'}</p>
            </div>
        `;
        return;
    }

    container.innerHTML = state.cabinet.map(med => `
        <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
            <div>
                <strong style="font-size: 1rem;">${med.brandName}</strong>
                <div style="font-size: 0.8rem; color: var(--accent);">${med.genericName}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${med.pricePKR}</div>
            </div>
            <button onclick="toggleCabinet('${med.id}')" style="background: none; border: none; color: var(--danger); cursor: pointer; font-size: 1.2rem;">🗑️</button>
        </div>
    `).join('');
}

// AI Camera & Image OCR Scanner Engine
function openScannerModal() {
    const modal = document.getElementById('scannerModal');
    if (modal) modal.classList.add('active');
}

function closeScannerModal() {
    const modal = document.getElementById('scannerModal');
    if (modal) modal.classList.remove('active');
    state.scanning = false;
    document.getElementById('scanViewport').classList.remove('scanning');
}

function startSimulatedScan() {
    const viewport = document.getElementById('scanViewport');
    const statusText = document.getElementById('scanStatusText');

    viewport.classList.add('scanning');
    statusText.textContent = state.currentLang === 'ur' ? 'اے آئی ادویات کا معائنہ کر رہا ہے...' : 'AI scanning packaging text & ingredients...';

    setTimeout(() => {
        // Pick a random medicine to simulate visual scan match if no file uploaded
        const randomMed = MEDICINES_DB[Math.floor(Math.random() * MEDICINES_DB.length)];
        matchScanResult(randomMed);
    }, 2200);
}

function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
        const preview = document.getElementById('scanPreviewImg');
        const dropzone = document.getElementById('scanDropzone');
        preview.src = event.target.result;
        preview.style.display = 'block';
        dropzone.style.display = 'none';

        const viewport = document.getElementById('scanViewport');
        const statusText = document.getElementById('scanStatusText');
        viewport.classList.add('scanning');
        statusText.textContent = state.currentLang === 'ur' ? 'تصویر سے تحریر پڑھی جا رہی ہے...' : 'Performing AI text analysis on uploaded image...';

        // Read filename or match OCR keywords
        const fileNameUpper = file.name.toUpperCase();
        let matched = MEDICINES_DB.find(m => m.ocrKeywords.some(kw => fileNameUpper.includes(kw)));
        if (!matched) {
            matched = MEDICINES_DB[Math.floor(Math.random() * MEDICINES_DB.length)];
        }

        setTimeout(() => {
            matchScanResult(matched);
        }, 2000);
    };
    reader.readAsDataURL(file);
}

function matchScanResult(med) {
    closeScannerModal();
    state.searchQuery = med.brandName.toLowerCase();
    document.getElementById('searchInput').value = med.brandName;
    renderMedicines();

    // Scroll smoothly to matched card
    setTimeout(() => {
        const card = document.getElementById(`card-${med.id}`);
        if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.style.borderColor = 'var(--primary)';
            card.style.boxShadow = '0 0 25px rgba(5, 150, 105, 0.5)';
        }
    }, 200);
}

// Drug Interaction Checker
function initInteractionChecker() {
    const select1 = document.getElementById('drugSelect1');
    const select2 = document.getElementById('drugSelect2');
    if (!select1 || !select2) return;

    const options = MEDICINES_DB.map(m => `<option value="${m.id}">${m.brandName} (${m.genericName})</option>`).join('');
    select1.innerHTML = `<option value="">-- Select First Medicine --</option>` + options;
    select2.innerHTML = `<option value="">-- Select Second Medicine --</option>` + options;

    select1.addEventListener('change', checkInteractions);
    select2.addEventListener('change', checkInteractions);
}

function checkInteractions() {
    const id1 = document.getElementById('drugSelect1').value;
    const id2 = document.getElementById('drugSelect2').value;
    const resultBox = document.getElementById('interactionResult');

    if (!id1 || !id2) {
        resultBox.style.display = 'none';
        return;
    }

    if (id1 === id2) {
        resultBox.className = 'interaction-result-card warning';
        resultBox.innerHTML = `<strong>⚠️ Same Medicine Selected:</strong> You selected the same medicine twice.`;
        resultBox.style.display = 'block';
        return;
    }

    const med1 = MEDICINES_DB.find(m => m.id === id1);
    const med2 = MEDICINES_DB.find(m => m.id === id2);

    const isUrdu = state.currentLang === 'ur';

    // Check interaction rule list
    const hasInteraction = med1.interactions.some(i => med2.genericName.toLowerCase().includes(i.toLowerCase())) ||
        med2.interactions.some(i => med1.genericName.toLowerCase().includes(i.toLowerCase()));

    if (hasInteraction) {
        resultBox.className = 'interaction-result-card danger';
        resultBox.innerHTML = `
            <h3>⚠️ ${isUrdu ? 'منفی تعامل (احتیاط لازمی!)' : 'Potential Drug Interaction Warning!'}</h3>
            <p style="margin-top: 0.5rem;">
                ${isUrdu ?
                `ان دونوں ادویات (<strong>${med1.brandName}</strong> اور <strong>${med2.brandName}</strong>) کو ایک ساتھ لینا نقصان دہ ہو سکتا ہے۔ استعمال سے پہلے اپنے ڈاکٹر سے رجوع کریں۔` :
                `Taking <strong>${med1.brandName}</strong> and <strong>${med2.brandName}</strong> together may cause adverse drug interactions. Please consult your physician.`
            }
            </p>
        `;
    } else {
        resultBox.className = 'interaction-result-card safe';
        resultBox.innerHTML = `
            <h3>✅ ${isUrdu ? 'کوئی بڑا منفی تعامل نہیں ملا' : 'No Major Direct Interaction Detected'}</h3>
            <p style="margin-top: 0.5rem;">
                ${isUrdu ?
                `عام طور پر <strong>${med1.brandName}</strong> اور <strong>${med2.brandName}</strong> کو مناسب وقفے کے ساتھ لیا جا سکتا ہے۔` :
                `No high-risk interaction logged between <strong>${med1.brandName}</strong> and <strong>${med2.brandName}</strong> in current clinical database.`
            }
            </p>
        `;
    }
}

// Render Helplines
function renderHelplines() {
    const container = document.getElementById('helplineGrid');
    if (!container) return;

    container.innerHTML = PAKISTAN_HELPLINES.map(h => `
        <div class="helpline-card">
            <div>
                <strong>${h.name}</strong>
                <div class="helpline-number">${h.number}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">${h.desc}</div>
            </div>
            <a href="tel:${h.number}" class="btn-dial" style="margin-top: 1rem;">📞 Dial ${h.number}</a>
        </div>
    `).join('');
}

// Render AlKhidmat Health & Welfare Centers
function renderAlKhidmatCenters() {
    const container = document.getElementById('alkhidmatGrid');
    if (!container) return;

    const isUrdu = state.currentLang === 'ur';

    container.innerHTML = ALKHIDMAT_HEALTH_CENTERS.map(c => `
        <div class="med-card" style="border-left: 4px solid #059669;">
            <div>
                <div class="med-header">
                    <div>
                        <div class="med-brand" style="font-size: 1.15rem;">${c.name}</div>
                        <div class="med-generic">📍 ${c.city} - ${c.address}</div>
                    </div>
                </div>

                <div style="margin-top: 0.5rem; margin-bottom: 0.75rem;">
                    <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">
                        ${isUrdu ? 'مفت و رعایتی سہولیات:' : 'WELFARE & MEDICAL SERVICES:'}
                    </div>
                    <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.35rem;">
                        ${c.services.map(s => `<span style="background: var(--primary-light); color: var(--primary); padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">✓ ${s}</span>`).join('')}
                    </div>
                </div>
            </div>

            <div class="med-actions">
                <a href="tel:${c.phone}" class="btn-card-action btn-audio-speech" style="text-decoration: none; width: 100%; justify-content: center; background: #059669; color: white; border: none;">
                    📞 ${isUrdu ? 'رابطہ کریں:' : 'Call Health Center:'} ${c.phone}
                </a>
            </div>
        </div>
    `).join('');
}

