import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { RiskBadge } from './RiskBadge';
import { DisclaimerBanner } from './DisclaimerBanner';
import { AlertOctagon, CheckCircle2, Eye, AlertTriangle, ShieldCheck, Camera } from 'lucide-react';

export function ScanResultView({ result, imagePreview }) {
    const { t } = useLanguage();

    if (!result) return null;

    return (
        <div className="card" style={{ padding: '2rem' }}>
            {/* 1. Mandatory Demo Banner if in Demo Mode */}
            {result.isDemoMode && (
                <div className="demo-banner">
                    <AlertOctagon size={20} />
                    <span>{result.demoBannerText || 'DEMO MODE — SIMULATED RESULT — NOT AI ANALYSIS'}</span>
                </div>
            )}

            {/* Header Grid: Image Preview & Risk Level Badge */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem', alignItems: 'center' }}>
                {imagePreview && (
                    <div style={{ textCenter: 'center' }}>
                        <div style={{ border: '2px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden', maxHeight: '280px', display: 'flex', justifyContent: 'center', background: '#000' }}>
                            <img src={imagePreview} alt="Scanned Packaging" style={{ maxWidth: '100%', maxHeight: '280px', objectFit: 'contain' }} />
                        </div>
                        <small style={{ color: 'var(--text-muted)', display: 'block', marginTop: '0.35rem' }}>Uploaded Packaging Image</small>
                    </div>
                )}

                <div>
                    <small style={{ textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, color: 'var(--text-muted)' }}>
                        {t('riskLevelLabel')}
                    </small>
                    <div style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
                        <RiskBadge level={result.riskLevel} />
                    </div>

                    <div style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.95rem' }}>
                            <ShieldCheck size={18} color="var(--primary)" />
                            <span>{t('confidenceLabel')}: {result.confidence || 'MODERATE'}</span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                            {result.confidenceExplanation || "This reflects confidence in visual packaging reading, not probability of counterfeit status."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Non-Counterfeit Authenticity Disclaimer Banner */}
            <div style={{ background: 'rgba(2, 132, 199, 0.08)', border: '1px solid var(--primary)', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem', marginBottom: '2rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                <strong>ℹ️ Authenticity Notice:</strong> {result.authenticityDisclaimer || "Packaging analysis cannot confirm authenticity. Potential concern detected — professional verification recommended."}
            </div>

            {/* 2. Detected Packaging Details */}
            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Eye size={20} color="var(--primary)" />
                    <span>{t('detectedInfoTitle')}</span>
                </h3>

                <div className="grid-3">
                    <div style={{ background: 'var(--bg-subtle)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                        <small style={{ color: 'var(--text-muted)' }}>Medicine Name</small>
                        <div style={{ fontWeight: 700 }}>{result.medicineName || 'Unspecified'}</div>
                    </div>
                    <div style={{ background: 'var(--bg-subtle)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                        <small style={{ color: 'var(--text-muted)' }}>Manufacturer</small>
                        <div style={{ fontWeight: 700 }}>{result.manufacturer || 'Unspecified'}</div>
                    </div>
                    <div style={{ background: 'var(--bg-subtle)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                        <small style={{ color: 'var(--text-muted)' }}>Batch / Lot Number</small>
                        <div style={{ fontWeight: 700 }}>{result.batchNumber || 'Unreadable / Not Visible'}</div>
                    </div>
                    <div style={{ background: 'var(--bg-subtle)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                        <small style={{ color: 'var(--text-muted)' }}>Expiry Date</small>
                        <div style={{ fontWeight: 700 }}>{result.expiryDate || 'Unreadable / Not Visible'}</div>
                    </div>
                    <div style={{ background: 'var(--bg-subtle)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                        <small style={{ color: 'var(--text-muted)' }}>Strength & Form</small>
                        <div style={{ fontWeight: 700 }}>{result.strength} {result.dosageForm}</div>
                    </div>
                    <div style={{ background: 'var(--bg-subtle)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                        <small style={{ color: 'var(--text-muted)' }}>{t('imageQualityTitle')}</small>
                        <div style={{ fontWeight: 700, color: result.imageQuality === 'POOR' ? '#b45309' : '#047857' }}>
                            {result.imageQuality || 'GOOD'}
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. AI Packaging Observations */}
            {result.observations && result.observations.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CheckCircle2 size={18} />
                        <span>{t('observationsTitle')}</span>
                    </h4>
                    <ul style={{ paddingLeft: '1.25rem', fontSize: '0.95rem' }}>
                        {result.observations.map((obs, idx) => (
                            <li key={idx} style={{ marginBottom: '0.35rem' }}>{obs}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 4. Potential Packaging Concerns */}
            {result.concerns && result.concerns.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem', color: '#b45309', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AlertTriangle size={18} />
                        <span>{t('concernsTitle')}</span>
                    </h4>
                    <ul style={{ paddingLeft: '1.25rem', fontSize: '0.95rem', color: '#b45309' }}>
                        {result.concerns.map((con, idx) => (
                            <li key={idx} style={{ marginBottom: '0.35rem' }}>{con}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 5. Verification Recommendations */}
            {result.verificationRecommendations && result.verificationRecommendations.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Camera size={18} />
                        <span>{t('recommendationsTitle')}</span>
                    </h4>
                    <ul style={{ paddingLeft: '1.25rem', fontSize: '0.95rem' }}>
                        {result.verificationRecommendations.map((rec, idx) => (
                            <li key={idx} style={{ marginBottom: '0.35rem' }}>{rec}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Safety Disclaimer Banner */}
            <DisclaimerBanner />
        </div>
    );
}
