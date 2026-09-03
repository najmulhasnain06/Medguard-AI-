import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Shield } from 'lucide-react';

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer>
            <div className="footer-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', marginBottom: '1.5rem' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <Shield color="var(--primary)" size={22} />
                            <strong style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>{t('appName')}</strong>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '400px' }}>
                            {t('subTagline')}
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 600 }}>{t('navHome')}</Link>
                        <Link to="/search" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 600 }}>{t('navSearch')}</Link>
                        <Link to="/scan" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 600 }}>{t('navScan')}</Link>
                        <Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 600 }}>{t('navAbout')}</Link>
                    </div>
                </div>

                <div className="disclaimer-card" style={{ marginBottom: '1.5rem' }}>
                    <div className="disclaimer-title">⚠️ {t('medicalDisclaimerTitle')}</div>
                    <div>{t('medicalDisclaimerText')}</div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 {t('footerRights')}</p>
                </div>
            </div>
        </footer>
    );
}
