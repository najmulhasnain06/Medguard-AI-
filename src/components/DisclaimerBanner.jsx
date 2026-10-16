import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { AlertTriangle } from 'lucide-react';

export default function DisclaimerBanner() {
  const { t } = useLanguage();

  return (
    <aside className="disclaimer-banner" role="alert" aria-label="Medical safety disclaimer">
      <span className="disclaimer-badge">{t('banner.criticalNotice')}</span>
      <AlertTriangle size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
      <span>{t('banner.disclaimerText')}</span>
    </aside>
  );
}
