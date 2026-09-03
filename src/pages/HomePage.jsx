import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { Search, Camera, ShieldCheck, Globe, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

export function HomePage() {
    const { t } = useLanguage();

    return (
        <div>
            {/* Hero Card */}
            <div className="hero-card">
                <div className="hero-badge">
                    {t('hackathonBadge')}
                </div>
                <h1 className="hero-heading">{t('heroHeading')}</h1>
                <p className="hero-subheading">{t('heroSubheading')}</p>

                <div className="hero-actions">
                    <Link to="/search" className="btn-primary">
                        <Search size={20} />
                        <span>{t('searchCardTitle')}</span>
                    </Link>
                    <Link to="/scan" className="btn-secondary">
                        <Camera size={20} />
                        <span>{t('scanCardTitle')}</span>
                    </Link>
                </div>
            </div>

            {/* Two Main Function Cards */}
            <div className="grid-2">
                <div className="card card-hover" style={{ padding: '2rem' }}>
                    <div style={{ background: 'var(--primary-light)', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                        <Search size={28} color="var(--primary)" />
                    </div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>{t('searchCardTitle')}</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                        {t('searchCardDesc')}
                    </p>
                    <Link to="/search" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                        <span>{t('btnSearch')}</span>
                        <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="card card-hover" style={{ padding: '2rem' }}>
                    <div style={{ background: 'var(--accent-light)', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                        <Camera size={28} color="var(--accent)" />
                    </div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>{t('scanCardTitle')}</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                        {t('scanCardDesc')}
                    </p>
                    <Link to="/scan" className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #0f766e, #0d9488)' }}>
                        <span>{t('navScan')}</span>
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="card" style={{ padding: '2.5rem 2rem', marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, textAlign: 'center', marginBottom: '2rem' }}>
                    {t('howItWorksTitle')}
                </h2>

                <div className="grid-3">
                    <div style={{ textAlign: 'center', padding: '1rem' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 800, fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                            1
                        </div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.35rem' }}>{t('step1Title')}</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('step1Desc')}</p>
                    </div>

                    <div style={{ textAlign: 'center', padding: '1rem' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 800, fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                            2
                        </div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.35rem' }}>{t('step2Title')}</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('step2Desc')}</p>
                    </div>

                    <div style={{ textAlign: 'center', padding: '1rem' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 800, fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                            3
                        </div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.35rem' }}>{t('step3Title')}</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('step3Desc')}</p>
                    </div>
                </div>
            </div>

            {/* Why MedGuard AI Features */}
            <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.5rem', textAlign: 'center' }}>
                    {t('whyTitle')}
                </h2>

                <div className="grid-3">
                    <div className="card" style={{ padding: '1.5rem' }}>
                        <Globe size={32} color="var(--primary)" style={{ marginBottom: '0.75rem' }} />
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.35rem' }}>{t('why1Title')}</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('why1Desc')}</p>
                    </div>

                    <div className="card" style={{ padding: '1.5rem' }}>
                        <Zap size={32} color="var(--accent)" style={{ marginBottom: '0.75rem' }} />
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.35rem' }}>{t('why2Title')}</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('why2Desc')}</p>
                    </div>

                    <div className="card" style={{ padding: '1.5rem' }}>
                        <ShieldCheck size={32} color="#047857" style={{ marginBottom: '0.75rem' }} />
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.35rem' }}>{t('why3Title')}</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('why3Desc')}</p>
                    </div>
                </div>
            </div>

            {/* Disclaimer Banner */}
            <DisclaimerBanner />
        </div>
    );
}
