import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

export function RiskBadge({ level }) {
    const { t } = useLanguage();

    let badgeClass = 'LOW_CONCERN';
    let labelText = t('riskLow');
    let Icon = CheckCircle2;

    if (level === 'NEEDS_VERIFICATION') {
        badgeClass = 'NEEDS_VERIFICATION';
        labelText = t('riskVerify');
        Icon = AlertTriangle;
    } else if (level === 'HIGH_CONCERN') {
        badgeClass = 'HIGH_CONCERN';
        labelText = t('riskHigh');
        Icon = ShieldAlert;
    }

    return (
        <div className={`risk-badge ${badgeClass}`}>
            <Icon size={22} />
            <span>{labelText}</span>
        </div>
    );
}
