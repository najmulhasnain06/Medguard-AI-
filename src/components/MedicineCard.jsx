import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DisclaimerBanner } from './DisclaimerBanner';
import {
    Pill, Info, Activity, ShieldAlert, AlertCircle, FileText,
    HelpCircle, ChevronDown, ChevronUp, BookOpen, Clock, HeartHandshake, CheckSquare
} from 'lucide-react';

export function MedicineCard({ medicine }) {
    const { t } = useLanguage();
    const [openSections, setOpenSections] = useState({
        description: true,
        uses: true,
        dosage: true,
        precautions: true,
        sideEffects: true
    });

    if (!medicine) return null;

    const toggleSection = (key) => {
        setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const renderSection = (id, icon, title, content) => {
        if (!content || (Array.isArray(content) && content.length === 0)) return null;
        const isOpen = openSections[id] !== false;

        return (
            <div className="detail-section" key={id}>
                <div className="detail-header" onClick={() => toggleSection(id)} style={{ cursor: 'pointer', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {icon}
                        <span>{title}</span>
                    </div>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
                {isOpen && (
                    <div className="detail-body">
                        {Array.isArray(content) ? (
                            <ul style={{ paddingLeft: '1.25rem' }}>
                                {content.map((item, idx) => (
                                    <li key={idx} style={{ marginBottom: '0.35rem' }}>{item}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>{content}</p>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="card" style={{ padding: '2rem' }}>
            {/* Header Fact Card */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '1.5rem' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }}>{medicine.name}</h2>
                        {medicine.prescriptionStatus && (
                            <span style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700 }}>
                                {medicine.prescriptionStatus}
                            </span>
                        )}
                        {medicine.isCuratedData && (
                            <span style={{ background: 'var(--accent-light)', color: 'var(--accent)', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700 }}>
                                🇵🇰 Curated Reference Data
                            </span>
                        )}
                    </div>
                    <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        <strong>Generic Formula:</strong> {medicine.genericName}
                    </p>
                </div>
            </div>

            {/* Quick Facts Grid */}
            <div className="grid-3" style={{ marginBottom: '1.5rem' }}>
                <div style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                    <small style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Active Ingredients</small>
                    <div style={{ fontWeight: 700, marginTop: '0.2rem' }}>
                        {Array.isArray(medicine.activeIngredients) ? medicine.activeIngredients.join(', ') : medicine.activeIngredients || 'N/A'}
                    </div>
                </div>

                <div style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                    <small style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Drug Class</small>
                    <div style={{ fontWeight: 700, marginTop: '0.2rem' }}>{medicine.drugClass || 'N/A'}</div>
                </div>

                <div style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                    <small style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Dosage Form & Strength</small>
                    <div style={{ fontWeight: 700, marginTop: '0.2rem' }}>{medicine.dosageForm} ({medicine.strength || 'N/A'})</div>
                </div>
            </div>

            {/* 16 Accordion / Card Sections */}
            {renderSection('description', <Info size={18} color="var(--primary)" />, t('secWhat'), medicine.description)}
            {renderSection('uses', <CheckSquare size={18} color="var(--accent)" />, t('secUses'), medicine.uses)}
            {renderSection('howItWorks', <Activity size={18} color="var(--primary)" />, t('secWorks'), medicine.howItWorks)}

            {/* Dosage Section with Mandatory Safety Label */}
            <div className="detail-section">
                <div className="detail-header" onClick={() => toggleSection('dosage')} style={{ cursor: 'pointer', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Pill size={18} color="var(--primary)" />
                        <span>{t('secDosage')}</span>
                    </div>
                    {openSections.dosage !== false ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
                {openSections.dosage !== false && (
                    <div className="detail-body">
                        <div className="dosage-badge">
                            ⚠️ General dosage information — not a personalized prescription.
                        </div>
                        <p>{medicine.dosage}</p>
                    </div>
                )}
            </div>

            {renderSection('howToTake', <Clock size={18} color="var(--primary)" />, t('secTake'), medicine.howToTake)}
            {renderSection('precautions', <AlertCircle size={18} color="#b45309" />, t('secPrecautions'), medicine.precautions)}
            {renderSection('sideEffects', <HelpCircle size={18} color="var(--text-muted)" />, t('secSideEffects'), medicine.sideEffects)}
            {renderSection('seriousSideEffects', <ShieldAlert size={18} color="#b91c1c" />, t('secSerious'), medicine.seriousSideEffects)}
            {renderSection('interactions', <FileText size={18} color="var(--primary)" />, t('secInteractions'), medicine.interactions)}
            {renderSection('contraindications', <ShieldAlert size={18} color="#b91c1c" />, t('secContraindications'), medicine.contraindications)}
            {renderSection('storage', <BookOpen size={18} color="var(--text-muted)" />, t('secStorage'), medicine.storage)}
            {renderSection('missedDose', <Clock size={18} color="var(--text-muted)" />, t('secMissed'), medicine.missedDose)}
            {renderSection('overdose', <ShieldAlert size={18} color="#b91c1c" />, t('secOverdose'), medicine.overdose)}
            {renderSection('specialPopulations', <HeartHandshake size={18} color="var(--accent)" />, t('secSpecial'), medicine.specialPopulations)}
            {renderSection('sources', <BookOpen size={18} color="var(--primary)" />, t('secSources'), medicine.sources)}

            {/* Mandatory Safety Disclaimer */}
            <div style={{ marginTop: '1.5rem' }}>
                <DisclaimerBanner />
            </div>
        </div>
    );
}
