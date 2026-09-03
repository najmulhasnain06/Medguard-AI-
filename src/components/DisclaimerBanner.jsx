import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldAlert } from 'lucide-react';

export function DisclaimerBanner() {
    const { t } = useLanguage();

    return (
        <div className="disclaimer-card">
            <div className="disclaimer-title">
                <ShieldAlert size={20} />
                <span>{t('medicalDisclaimerTitle')}</span>
            </div>
            <p>{t('medicalDisclaimerText')}</p>
        </div>
    );
}
