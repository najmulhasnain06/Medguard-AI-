import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { CheckCircle2, AlertCircle, AlertOctagon } from 'lucide-react';

export default function RiskBadge({ level = 'NEEDS_VERIFICATION', showDetails = false }) {
  const { t, language } = useLanguage();

  const safeLevel = ['LOW_CONCERN', 'NEEDS_VERIFICATION', 'HIGH_CONCERN'].includes(level)
    ? level
    : 'NEEDS_VERIFICATION';

  const config = {
    LOW_CONCERN: {
      icon: CheckCircle2,
      class: 'LOW_CONCERN',
      title: t('risk.LOW_CONCERN.title'),
      desc: t('risk.LOW_CONCERN.desc'),
    },
    NEEDS_VERIFICATION: {
      icon: AlertCircle,
      class: 'NEEDS_VERIFICATION',
      title: t('risk.NEEDS_VERIFICATION.title'),
      desc: t('risk.NEEDS_VERIFICATION.desc'),
    },
    HIGH_CONCERN: {
      icon: AlertOctagon,
      class: 'HIGH_CONCERN',
      title: t('risk.HIGH_CONCERN.title'),
      desc: t('risk.HIGH_CONCERN.desc'),
    },
  }[safeLevel];

  const IconComponent = config.icon;

  return (
    <div className={`risk-badge-wrapper ${safeLevel.toLowerCase()}`}>
      <span className={`risk-badge ${config.class}`}>
        <span className="risk-badge-dot"></span>
        <IconComponent size={16} />
        <span>{config.title}</span>
      </span>
      {showDetails && (
        <p className="risk-badge-description" style={{ fontSize: '0.85rem', marginTop: '0.4rem', color: 'var(--text-muted)' }}>
          {config.desc}
        </p>
      )}
    </div>
  );
}
