import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import {
  ShieldAlert,
  AlertTriangle,
  Stethoscope,
  Pill,
  Camera,
  Cpu,
  Layers,
  PhoneCall,
  CheckCircle2,
  FileText
} from 'lucide-react';

export default function AboutPage() {
  const { t, language } = useLanguage();

  return (
    <div className="about-page" style={{ padding: '2.5rem 0 4rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
            {t('about.pageTitle')}
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
            {t('about.pageSubtitle')}
          </p>
        </div>

        {/* Mission Card */}
        <div className="card" style={{ marginBottom: '2rem', padding: '2.25rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={22} color="#0284c7" />
            <span>{t('about.missionTitle')}</span>
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-main)', lineHeight: 1.7 }}>
            {t('about.missionDesc')}
          </p>
        </div>

        {/* The Three Safety Pillars */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem', textAlign: 'center' }}>
            {t('about.threePillarsTitle')}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {/* Pillar 1 */}
            <div className="card" style={{ borderTop: '4px solid #0284c7' }}>
              <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '50%', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Stethoscope size={22} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem', color: '#0f172a' }}>
                {t('about.pillar1Title')}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {t('about.pillar1Desc')}
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="card" style={{ borderTop: '4px solid #0d9488' }}>
              <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '50%', background: '#ccfbf1', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Pill size={22} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem', color: '#0f172a' }}>
                {t('about.pillar2Title')}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {t('about.pillar2Desc')}
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="card" style={{ borderTop: '4px solid #e11d48' }}>
              <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '50%', background: '#ffe4e6', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Camera size={22} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem', color: '#0f172a' }}>
                {t('about.pillar3Title')}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {t('about.pillar3Desc')}
              </p>
            </div>
          </div>
        </div>

        {/* Technology Architecture Section */}
        <div className="card" style={{ marginBottom: '2rem', padding: '2.25rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={22} color="#0284c7" />
            <span>{t('about.techStackTitle')}</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <div style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary-dark)', marginBottom: '0.2rem' }}>
                Frontend Client
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                React 18, Vite 6, React Router 6, Pure Vanilla CSS with native Urdu RTL support.
              </div>
            </div>

            <div style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary-dark)', marginBottom: '0.2rem' }}>
                Backend API Server
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Node.js & Express, Multer memory buffer image processing, CORS, dotenv.
              </div>
            </div>

            <div style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary-dark)', marginBottom: '0.2rem' }}>
                Alibaba Vision AI
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Qwen3-VL-Plus multi-modal model via Alibaba Cloud Model Studio OpenAI-compatible endpoint.
              </div>
            </div>

            <div style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary-dark)', marginBottom: '0.2rem' }}>
                Alibaba Text Model
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Qwen-Plus text model for automated medicine knowledge retrieval and safety verification.
              </div>
            </div>
          </div>
        </div>

        {/* DRAP Reporting Callout */}
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          flexWrap: 'wrap'
        }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.4rem', color: '#38bdf8' }}>
              {t('about.drapNoticeTitle')}
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#cbd5e1', maxWidth: '650px', lineHeight: 1.6 }}>
              {t('about.drapNoticeDesc')}
            </p>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <PhoneCall size={20} color="#38bdf8" />
            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700 }}>DRAP Helpline</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>0800-03727</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
