import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { ShieldCheck, Search, Camera, Info, Languages, Menu, X, Cpu } from 'lucide-react';

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [backendStatus, setBackendStatus] = useState({
    configured: false,
    mode: 'FALLBACK_DEMO_MODE',
    checked: false
  });

  useEffect(() => {
    // Check backend health and model mode
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        setBackendStatus({
          configured: Boolean(data.alibaba_api_configured),
          mode: data.mode || 'FALLBACK_DEMO_MODE',
          checked: true
        });
      })
      .catch(err => {
        console.warn('Backend health check error:', err);
        setBackendStatus({
          configured: false,
          mode: 'FALLBACK_DEMO_MODE',
          checked: true
        });
      });
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="navbar" aria-label="Main Navigation">
      <div className="container">
        <div className="nav-inner">
          {/* Logo & Brand */}
          <NavLink to="/" className="nav-brand" onClick={closeMobile}>
            <div className="brand-icon-wrapper">
              <ShieldCheck size={26} strokeWidth={2.3} />
            </div>
            <div className="brand-text">
              <h1>
                {t('app.name')}
              </h1>
              <span className="brand-tagline">{t('app.tagline')}</span>
            </div>
          </NavLink>

          {/* Navigation Links */}
          <ul className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
            <li className="nav-item">
              <NavLink to="/" end onClick={closeMobile} className={({ isActive }) => isActive ? 'active' : ''}>
                {t('nav.home')}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/analyze" onClick={closeMobile} className={({ isActive }) => isActive ? 'active' : ''}>
                <Camera size={16} />
                <span>{t('nav.analyze')}</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/search" onClick={closeMobile} className={({ isActive }) => isActive ? 'active' : ''}>
                <Search size={16} />
                <span>{t('nav.search')}</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" onClick={closeMobile} className={({ isActive }) => isActive ? 'active' : ''}>
                <Info size={16} />
                <span>{t('nav.about')}</span>
              </NavLink>
            </li>
          </ul>

          {/* Actions: Mode Pill + Language Toggle + Mobile Menu */}
          <div className="nav-actions">
            {/* Mode indicator pill */}
            <span
              className={`mode-pill ${backendStatus.configured ? 'live' : 'demo'}`}
              title={backendStatus.configured ? 'Alibaba Qwen3-VL-Plus Vision Active' : 'Fallback Demo Simulation Active'}
            >
              <Cpu size={13} />
              <span>{backendStatus.configured ? t('nav.liveBadge') : t('nav.demoBadge')}</span>
            </span>

            {/* Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              className="lang-toggle-btn"
              title={language === 'en' ? 'اردو میں تبدیل کریں' : 'Switch to English'}
              aria-label="Toggle language"
            >
              <Languages size={16} />
              <span>{language === 'en' ? 'اردو' : 'English'}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(prev => !prev)}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
