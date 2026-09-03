import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Globe, Moon, Sun, Menu, X } from 'lucide-react';

export function Navbar() {
    const { lang, toggleLanguage, theme, toggleTheme, t } = useLanguage();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    return (
        <header className="navbar">
            <div className="nav-container">
                <Link to="/" className="brand-logo" onClick={() => setMobileOpen(false)}>
                    <div className="logo-badge">
                        <Shield size={24} />
                    </div>
                    <div>
                        <div className="brand-title">{t('appName')}</div>
                        <div className="brand-tagline">{t('tagline')}</div>
                    </div>
                </Link>

                <nav className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
                    <Link
                        to="/"
                        className={`nav-link ${isActive('/') ? 'active' : ''}`}
                        onClick={() => setMobileOpen(false)}
                    >
                        {t('navHome')}
                    </Link>
                    <Link
                        to="/search"
                        className={`nav-link ${isActive('/search') ? 'active' : ''}`}
                        onClick={() => setMobileOpen(false)}
                    >
                        {t('navSearch')}
                    </Link>
                    <Link
                        to="/scan"
                        className={`nav-link ${isActive('/scan') ? 'active' : ''}`}
                        onClick={() => setMobileOpen(false)}
                    >
                        {t('navScan')}
                    </Link>
                    <Link
                        to="/about"
                        className={`nav-link ${isActive('/about') ? 'active' : ''}`}
                        onClick={() => setMobileOpen(false)}
                    >
                        {t('navAbout')}
                    </Link>
                </nav>

                <div className="nav-actions">
                    <button className="btn-lang" onClick={toggleLanguage} title="Switch Language / زبان تبدیل کریں">
                        <Globe size={18} />
                        <span>{lang === 'en' ? 'اردو' : 'English'}</span>
                    </button>

                    <button className="btn-theme" onClick={toggleTheme} title="Toggle Theme">
                        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                    </button>

                    <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
        </header>
    );
}
