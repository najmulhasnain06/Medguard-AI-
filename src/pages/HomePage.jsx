import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import RiskBadge from '../components/RiskBadge.jsx';
import {
  Camera,
  Search,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
  Eye,
  FileCheck,
  Globe2,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function HomePage() {
  const { t, language, isRTL } = useLanguage();
  const navigate = useNavigate();

  const handleQuickSample = (sampleId) => {
    navigate(`/analyze?sample=${sampleId}`);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>{t('home.heroBadge')}</span>
          </div>

          <h1 className="hero-title">{t('home.heroTitle')}</h1>
          <p className="hero-subtitle">{t('home.heroSubtitle')}</p>

          <div className="hero-actions">
            <Link to="/analyze" className="btn btn-primary">
              <Camera size={19} />
              <span>{t('home.ctaAnalyze')}</span>
              <ArrowRight size={18} style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
            </Link>
            <Link to="/search" className="btn btn-secondary">
              <Search size={19} />
              <span>{t('home.ctaSearch')}</span>
            </Link>
          </div>

          {/* Quick Presets for Demo / Testing */}
          <div className="sample-presets-box">
            <span className="sample-presets-label">{t('home.sampleHeadline')}</span>
            <button
              onClick={() => handleQuickSample('panadol')}
              className="sample-pill"
              type="button"
            >
              <CheckCircle2 size={15} color="#059669" />
              <span>{t('home.samplePanadol')}</span>
            </button>
            <button
              onClick={() => handleQuickSample('nuberol')}
              className="sample-pill"
              type="button"
            >
              <Eye size={15} color="#0284c7" />
              <span>{t('home.sampleNuberol')}</span>
            </button>
            <button
              onClick={() => handleQuickSample('flagged')}
              className="sample-pill"
              type="button"
            >
              <AlertTriangle size={15} color="#e11d48" />
              <span>{t('home.sampleSuspicious')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('home.howItWorksTitle')}</h2>
            <p className="section-subtitle">{t('home.howItWorksSubtitle')}</p>
          </div>

          <div className="steps-container">
            <div className="step-card">
              <span className="step-number">01</span>
              <div className="card-icon">
                <Camera size={24} />
              </div>
              <h3 className="card-title">{t('home.step1Title')}</h3>
              <p className="card-text">{t('home.step1Desc')}</p>
            </div>

            <div className="step-card">
              <span className="step-number">02</span>
              <div className="card-icon" style={{ backgroundColor: '#e0f2fe', color: '#0284c7' }}>
                <Eye size={24} />
              </div>
              <h3 className="card-title">{t('home.step2Title')}</h3>
              <p className="card-text">{t('home.step2Desc')}</p>
            </div>

            <div className="step-card">
              <span className="step-number">03</span>
              <div className="card-icon" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
                <FileCheck size={24} />
              </div>
              <h3 className="card-title">{t('home.step3Title')}</h3>
              <p className="card-text">{t('home.step3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Levels Guide */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              {language === 'ur' ? 'حفاظتی رسک لیولز کی درجہ بندی' : 'Understanding Risk Levels'}
            </h2>
            <p className="section-subtitle">
              {language === 'ur'
                ? 'میڈ گارڈ اے آئی پیکیجنگ کی حالت کے مطابق تین واضح درجوں میں رپورٹ تیار کرتا ہے'
                : 'MedGuard AI classifies visual packaging inspection into three transparent categories'}
            </p>
          </div>

          <div className="risk-guide-grid">
            <div className="risk-guide-card low">
              <div style={{ marginBottom: '1rem' }}>
                <RiskBadge level="LOW_CONCERN" />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#065f46', marginBottom: '0.4rem' }}>
                {t('risk.LOW_CONCERN.title')}
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#047857', fontWeight: 600, marginBottom: '0.5rem' }}>
                {t('risk.LOW_CONCERN.subtitle')}
              </p>
              <p style={{ fontSize: '0.85rem', color: '#064e3b', lineHeight: 1.6 }}>
                {t('risk.LOW_CONCERN.desc')}
              </p>
            </div>

            <div className="risk-guide-card medium">
              <div style={{ marginBottom: '1rem' }}>
                <RiskBadge level="NEEDS_VERIFICATION" />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#92400e', marginBottom: '0.4rem' }}>
                {t('risk.NEEDS_VERIFICATION.title')}
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#b45309', fontWeight: 600, marginBottom: '0.5rem' }}>
                {t('risk.NEEDS_VERIFICATION.subtitle')}
              </p>
              <p style={{ fontSize: '0.85rem', color: '#78350f', lineHeight: 1.6 }}>
                {t('risk.NEEDS_VERIFICATION.desc')}
              </p>
            </div>

            <div className="risk-guide-card high">
              <div style={{ marginBottom: '1rem' }}>
                <RiskBadge level="HIGH_CONCERN" />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#9f1239', marginBottom: '0.4rem' }}>
                {t('risk.HIGH_CONCERN.title')}
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#be123c', fontWeight: 600, marginBottom: '0.5rem' }}>
                {t('risk.HIGH_CONCERN.subtitle')}
              </p>
              <p style={{ fontSize: '0.85rem', color: '#881337', lineHeight: 1.6 }}>
                {t('risk.HIGH_CONCERN.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Capabilities */}
      <section className="section" style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              {language === 'ur' ? 'اہم ٹیکنالوجی خصوصیات' : 'Core Capabilities'}
            </h2>
            <p className="section-subtitle">
              {language === 'ur'
                ? 'جدید کمپیوٹر ویژن اور طبی اخلاقی اصولوں کے تحت تیار کردہ نظام'
                : 'Built with frontier multi-modal vision models and healthcare safety constraints'}
            </p>
          </div>

          <div className="card-grid">
            <div className="card">
              <div className="card-icon">
                <Sparkles size={24} />
              </div>
              <h3 className="card-title">{t('home.feature1Title')}</h3>
              <p className="card-text">{t('home.feature1Desc')}</p>
            </div>

            <div className="card">
              <div className="card-icon" style={{ backgroundColor: '#ccfbf1', color: '#0f766e' }}>
                <FileCheck size={24} />
              </div>
              <h3 className="card-title">{t('home.feature2Title')}</h3>
              <p className="card-text">{t('home.feature2Desc')}</p>
            </div>

            <div className="card">
              <div className="card-icon" style={{ backgroundColor: '#fef3c7', color: '#b45309' }}>
                <Globe2 size={24} />
              </div>
              <h3 className="card-title">{t('home.feature3Title')}</h3>
              <p className="card-text">{t('home.feature3Desc')}</p>
            </div>

            <div className="card">
              <div className="card-icon" style={{ backgroundColor: '#fee2e2', color: '#be123c' }}>
                <ShieldAlert size={24} />
              </div>
              <h3 className="card-title">{t('home.feature4Title')}</h3>
              <p className="card-text">{t('home.feature4Desc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
