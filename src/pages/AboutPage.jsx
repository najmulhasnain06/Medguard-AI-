import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { Shield, Globe, Lock, AlertTriangle, CheckCircle } from 'lucide-react';

export function AboutPage() {
    const { t } = useLanguage();

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="card" style={{ padding: '2.5rem 2rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <Shield size={32} color="var(--primary)" />
                    <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>{t('aboutTitle')}</h1>
                </div>

                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1.5rem', leading: '1.7' }}>
                    {t('aboutMission')}
                </p>

                <p style={{ marginBottom: '1.5rem', fontSize: '0.98rem' }}>
                    <strong>MedGuard AI</strong> is an AI-powered medicine information and packaging-risk assessment platform designed especially for users in Pakistan. It combines general educational medicine search with computer vision packaging inspection to encourage safer decisions and healthcare verification.
                </p>
            </div>

            {/* Safety Principles & Core Principles */}
            <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Lock size={22} />
                    <span>{t('aboutLimitationTitle')}</span>
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                        <CheckCircle size={20} color="var(--accent)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                        <div>
                            <strong>Information Tool, Not a Healthcare Provider:</strong> MedGuard AI provides general educational reference information. It is NOT a doctor, pharmacist, diagnostic tool, or replacement for professional medical advice.
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                        <CheckCircle size={20} color="var(--accent)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                        <div>
                            <strong>General Dosage Reference Only:</strong> Dosage details are strictly educational and non-personalized. The platform never calculates a personalized dose based on age, weight, symptoms, pregnancy, or medical history.
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                        <CheckCircle size={20} color="var(--accent)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                        <div>
                            <strong>Non-Counterfeit Vision Assessment:</strong> The packaging vision model evaluates visual label layout and readability. It NEVER claims that an image proves a medicine is genuine or counterfeit.
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                        <CheckCircle size={20} color="var(--accent)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                        <div>
                            <strong>Verified Sources & No Fabrication:</strong> MedGuard AI does not fabricate medical references or sources. If an exact source is unavailable, it explicitly directs users to official documentation and licensed pharmacists.
                        </div>
                    </div>
                </div>
            </div>

            {/* Safety Banner */}
            <DisclaimerBanner />
        </div>
    );
}
