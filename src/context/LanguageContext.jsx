import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../translations/en';
import { ur } from '../translations/ur';

const LanguageContext = createContext();

const translations = { en, ur };

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(() => {
        return localStorage.getItem('medguard_lang') || 'en';
    });

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('medguard_theme') || 'light';
    });

    useEffect(() => {
        localStorage.setItem('medguard_lang', lang);
        const dir = lang === 'ur' ? 'rtl' : 'ltr';
        document.documentElement.dir = dir;
        document.documentElement.lang = lang;
    }, [lang]);

    useEffect(() => {
        localStorage.setItem('medguard_theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleLanguage = () => {
        setLang(prev => (prev === 'en' ? 'ur' : 'en'));
    };

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    const t = (key) => {
        return translations[lang]?.[key] || translations['en']?.[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, theme, toggleTheme, t }}>
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
