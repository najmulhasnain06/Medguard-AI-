import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import {
  Search,
  Camera,
  ShieldCheck,
  AlertTriangle,
  Award,
  Thermometer,
  Layers,
  ArrowRight,
  X,
  ExternalLink
} from 'lucide-react';

export default function SearchPage() {
  const { t, language, isRTL } = useLanguage();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initial fetch of curated medicines
  useEffect(() => {
    fetchMedicines('');
  }, []);

  const fetchMedicines = async (searchQuery) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/search-medicine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery, lang: language }),
      });

      if (!res.ok) {
        throw new Error(`Failed to load medicine database (${res.status})`);
      }

      const data = await res.json();
      setMedicines(data.results || []);
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMedicines(query);
  };

  const handleClear = () => {
    setQuery('');
    fetchMedicines('');
  };

  // Filter medicines by therapeutic category pill
  const filteredMedicines = medicines.filter((med) => {
    if (activeFilter === 'ALL') return true;
    const cat = (med.category || '').toLowerCase();
    if (activeFilter === 'ANALGESIC') return cat.includes('analgesic') || cat.includes('antipyretic');
    if (activeFilter === 'MUSCLE') return cat.includes('muscle');
    if (activeFilter === 'NSAID') return cat.includes('nsaid') || cat.includes('anti-inflammatory');
    if (activeFilter === 'ANTIBIOTIC') return cat.includes('antibiotic');
    return true;
  });

  const handleInspectMedicine = (medName) => {
    navigate(`/analyze?sample=${encodeURIComponent(medName.toLowerCase())}`);
  };

  return (
    <div className="search-page" style={{ padding: '2.5rem 0 4rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.5rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
            {t('search.pageTitle')}
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
            {t('search.pageSubtitle')}
          </p>
        </div>

        {/* Search Input & Category Filters */}
        <div className="search-header-box">
          <form onSubmit={handleSearchSubmit} className="search-input-wrapper">
            <Search className="search-icon-pos" size={20} />
            <input
              type="text"
              className="search-input"
              placeholder={t('search.searchPlaceholder')}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                fetchMedicines(e.target.value);
              }}
            />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                style={{
                  position: 'absolute',
                  top: '50%',
                  insetInlineEnd: '1rem',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)'
                }}
              >
                <X size={18} />
              </button>
            )}
          </form>

          {/* Filter Pills */}
          <div className="filter-pills">
            <button
              className={`filter-btn ${activeFilter === 'ALL' ? 'active' : ''}`}
              onClick={() => setActiveFilter('ALL')}
            >
              {t('search.filterAll')}
            </button>
            <button
              className={`filter-btn ${activeFilter === 'ANALGESIC' ? 'active' : ''}`}
              onClick={() => setActiveFilter('ANALGESIC')}
            >
              {t('search.filterAnalgesic')}
            </button>
            <button
              className={`filter-btn ${activeFilter === 'MUSCLE' ? 'active' : ''}`}
              onClick={() => setActiveFilter('MUSCLE')}
            >
              {t('search.filterMuscle')}
            </button>
            <button
              className={`filter-btn ${activeFilter === 'NSAID' ? 'active' : ''}`}
              onClick={() => setActiveFilter('NSAID')}
            >
              {t('search.filterNsaid')}
            </button>
            <button
              className={`filter-btn ${activeFilter === 'ANTIBIOTIC' ? 'active' : ''}`}
              onClick={() => setActiveFilter('ANTIBIOTIC')}
            >
              {t('search.filterAntibiotic')}
            </button>
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
          <span>
            {filteredMedicines.length} {t('search.resultsCount')}
          </span>
          <span style={{ fontSize: '0.8rem' }}>
            {t('app.drapReference')}
          </span>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        {/* Medicine Directory Cards Grid */}
        {filteredMedicines.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.75rem' }}>
            {filteredMedicines.map((med) => (
              <div className="med-card" key={med.id || med.name}>
                {/* Card Top: Names + DRAP Badge */}
                <div>
                  <div className="med-card-top">
                    <div>
                      <h2 className="med-name">
                        {language === 'ur' && med.nameUrdu ? med.nameUrdu : med.name}
                      </h2>
                      <div className="med-generic">
                        {language === 'ur' && med.genericNameUrdu ? med.genericNameUrdu : med.genericName}
                      </div>
                    </div>
                    {med.drapRegNo && (
                      <span className="med-badge-drap">
                        DRAP #{med.drapRegNo}
                      </span>
                    )}
                  </div>

                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                    <strong>{language === 'ur' ? 'ادویہ ساز:' : 'Manufacturer:'}</strong>{' '}
                    {language === 'ur' && med.manufacturerUrdu ? med.manufacturerUrdu : med.manufacturer}
                  </div>
                </div>

                {/* Therapeutic Indication */}
                <div style={{ fontSize: '0.875rem', color: 'var(--text-main)', background: 'var(--bg-subtle)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                    {t('search.category')} {language === 'ur' && med.categoryUrdu ? med.categoryUrdu : med.category}
                  </div>
                  <div>
                    {language === 'ur' && med.typicalIndicationsUrdu ? med.typicalIndicationsUrdu : med.typicalIndications}
                  </div>
                </div>

                {/* Packaging Authenticity Features */}
                {Array.isArray(med.packagingSecurityFeatures) && (
                  <div className="med-section-block">
                    <div className="med-section-label">
                      <ShieldCheck size={14} style={{ display: 'inline', verticalAlign: '-2px', marginInlineEnd: '4px' }} color="#059669" />
                      {t('search.packagingFeatures')}
                    </div>
                    <ul className="security-checklist-pills">
                      {(language === 'ur' && Array.isArray(med.packagingSecurityFeaturesUrdu) && med.packagingSecurityFeaturesUrdu.length > 0
                        ? med.packagingSecurityFeaturesUrdu
                        : med.packagingSecurityFeatures
                      ).slice(0, 3).map((feat, idx) => (
                        <li key={idx}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Safety Warning */}
                {med.safetyWarning && (
                  <div className="warning-box">
                    <div style={{ fontWeight: 700, marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <AlertTriangle size={14} />
                      <span>{t('search.safetyWarning')}</span>
                    </div>
                    <div>
                      {language === 'ur' && med.safetyWarningUrdu ? med.safetyWarningUrdu : med.safetyWarning}
                    </div>
                  </div>
                )}

                {/* Storage */}
                {med.storageAdvice && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Thermometer size={14} color="#0284c7" />
                    <span>{language === 'ur' && med.storageAdviceUrdu ? med.storageAdviceUrdu : med.storageAdvice}</span>
                  </div>
                )}

                {/* Action: Inspect Packaging */}
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: 'auto', width: '100%' }}
                  onClick={() => handleInspectMedicine(med.id)}
                >
                  <Camera size={15} />
                  <span>{t('search.inspectBtn')}</span>
                  <ArrowRight size={14} style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3.5rem 1rem', background: '#ffffff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
              {t('search.noResults')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
