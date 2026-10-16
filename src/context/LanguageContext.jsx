import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations/translations.js';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('medguard_lang') || 'en';
  });

  const isRTL = language === 'ur';

  useEffect(() => {
    localStorage.setItem('medguard_lang', language);
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    if (isRTL) {
      document.body.classList.add('rtl-layout');
    } else {
      document.body.classList.remove('rtl-layout');
    }
  }, [language, isRTL]);

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'en' ? 'ur' : 'en'));
  };

  const setLanguage = (lang) => {
    if (lang === 'en' || lang === 'ur') {
      setLanguageState(lang);
    }
  };

  /**
   * Helper function to look up nested translation key (e.g., 'home.heroTitle')
   */
  const t = (path) => {
    const keys = path.split('.');
    let current = translations[language];
    for (const k of keys) {
      if (current && current[k] !== undefined) {
        current = current[k];
      } else {
        // Fallback to English if translation is missing
        let fallback = translations.en;
        for (const fbKey of keys) {
          if (fallback && fallback[fbKey] !== undefined) {
            fallback = fallback[fbKey];
          } else {
            return path;
          }
        }
        return fallback;
      }
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
