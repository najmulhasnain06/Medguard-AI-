import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { MedicineCard } from '../components/MedicineCard';
import { Search, Loader2, AlertCircle } from 'lucide-react';

export function SearchPage() {
    const { t } = useLanguage();
    const [searchParams, setSearchParams] = useSearchParams();
    const initialQuery = searchParams.get('q') || '';

    const [query, setQuery] = useState(initialQuery);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const sampleChips = ['Panadol', 'Aspirin', 'Paracetamol', 'Ibuprofen', 'Nuberol Forte', 'Amoxicillin'];

    const executeSearch = async (searchQuery) => {
        const q = (searchQuery || '').trim();
        if (!q) return;

        setLoading(true);
        setError(null);
        setResult(null);
        setSearchParams({ q });

        try {
            const baseUrl = import.meta.env.VITE_API_URL || '';
            const response = await fetch(`${baseUrl}/api/search-medicine`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: q })
            });

            const data = await response.json();

            if (!response.ok || data.error) {
                setError(data.message || t('searchNotFound'));
            } else {
                setResult(data);
            }
        } catch (err) {
            console.error('Search fetch error:', err);
            setError(t('searchNotFound'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (initialQuery) {
            executeSearch(initialQuery);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        executeSearch(query);
    };

    const handleChipClick = (chipText) => {
        setQuery(chipText);
        executeSearch(chipText);
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                    {t('searchCardTitle')}
                </h1>
                <p style={{ color: 'var(--text-muted)' }}>
                    {t('searchCardDesc')}
                </p>
            </div>

            {/* Search Input Box */}
            <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
                <div className="search-box-group">
                    <input
                        type="text"
                        className="search-input"
                        placeholder={t('searchPlaceholder')}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? <Loader2 className="spinner" size={20} /> : <Search size={20} />}
                        <span>{t('btnSearch')}</span>
                    </button>
                </div>
            </form>

            {/* Quick Sample Search Chips */}
            <div className="sample-chips">
                <span className="chip-label">{t('quickExamples')}</span>
                {sampleChips.map((chip, idx) => (
                    <button
                        key={idx}
                        type="button"
                        className="chip-btn"
                        onClick={() => handleChipClick(chip)}
                    >
                        {chip}
                    </button>
                ))}
            </div>

            {/* Loading State */}
            {loading && (
                <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
                    <Loader2 style={{ animation: 'spin 1s linear infinite', color: 'var(--primary)', marginBottom: '1rem' }} size={40} />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{t('searchingText')}</h3>
                </div>
            )}

            {/* Error / Not Found Message */}
            {error && !loading && (
                <div className="card" style={{ padding: '2rem', textAlign: 'center', borderColor: '#fecaca', background: 'var(--risk-high-bg)' }}>
                    <AlertCircle size={40} color="#b91c1c" style={{ marginBottom: '0.75rem' }} />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#b91c1c', marginBottom: '0.5rem' }}>
                        {error}
                    </h3>
                </div>
            )}

            {/* Structured Result Display */}
            {result && !loading && (
                <MedicineCard medicine={result} />
            )}
        </div>
    );
}
