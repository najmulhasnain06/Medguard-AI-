import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { ShieldCheck, PhoneCall, Award } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <ShieldCheck size={20} color="#38bdf8" />
              <h3>{t('app.name')}</h3>
            </div>
            <p className="footer-text">
              {t('app.tagline')}
            </p>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>
              {t('app.poweredBy')}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#38bdf8', fontSize: '0.875rem', fontWeight: 600 }}>
              <PhoneCall size={16} />
              <span>{t('footer.contactDrap')}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.825rem' }}>
              <Award size={15} />
              <span>{t('app.drapReference')}</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} {t('footer.rights')}</span>
          <span>{t('footer.disclaimerShort')}</span>
        </div>
      </div>
    </footer>
  );
}
