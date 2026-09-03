import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ScanResultView } from '../components/ScanResultView';
import { Camera, Upload, Loader2, Info, AlertTriangle } from 'lucide-react';

export function ScanPage() {
    const { t } = useLanguage();
    const fileInputRef = useRef(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFileSelect = (file) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            setError('Please upload a valid image file (JPG, PNG, WEBP).');
            return;
        }

        setSelectedFile(file);
        setError(null);
        setResult(null);

        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result);
            uploadAndAnalyze(reader.result, file.name);
        };
        reader.readAsDataURL(file);
    };

    const uploadAndAnalyze = async (base64Image, filename) => {
        setLoading(true);
        setError(null);

        try {
            const baseUrl = import.meta.env.VITE_API_URL || '';
            const response = await fetch(`${baseUrl}/api/analyze`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: base64Image, filename })
            });

            const data = await response.json();

            if (!response.ok || data.error) {
                setError(data.message || 'Failed to analyze packaging photo.');
            } else {
                setResult(data);
            }
        } catch (err) {
            console.error('Scan fetch error:', err);
            setError('Network error while analyzing medicine packaging. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const triggerDemoScan = (demoType = 'clear_panadol_packaging.jpg') => {
        setSelectedFile(null);
        setImagePreview('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=60');
        uploadAndAnalyze('dummy_base64', demoType);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Camera color="var(--primary)" size={32} />
                    <span>{t('scanCardTitle')}</span>
                </h1>
                <p style={{ color: 'var(--text-muted)' }}>
                    {t('scanInstruction')}
                </p>
            </div>

            {/* Recommended Photographing Guidance Cards */}
            <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
                <div style={{ background: 'var(--primary-light)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(2, 132, 199, 0.3)', fontSize: '0.88rem' }}>
                    <strong style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                        <Info size={16} /> Best Photo Results
                    </strong>
                    <span>For best results, upload a clear photo showing the medicine name, manufacturer, batch number, and expiry date.</span>
                </div>

                <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(245, 158, 11, 0.4)', fontSize: '0.88rem' }}>
                    <strong style={{ color: '#b45309', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                        <AlertTriangle size={16} /> Important Limitation
                    </strong>
                    <span>AI analysis cannot confirm authenticity from packaging alone. Professional verification is always recommended.</span>
                </div>
            </div>

            {/* Drag & Drop Upload Zone */}
            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => handleFileSelect(e.target.files?.[0])}
            />

            <div
                className={`dropzone ${dragActive ? 'active' : ''}`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                style={{ marginBottom: '2rem' }}
            >
                <Upload size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    {t('scanDropzoneText')}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                    {t('scanDropzoneSub')}
                </p>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }} onClick={(e) => e.stopPropagation()}>
                    <button type="button" className="btn-primary" onClick={() => fileInputRef.current?.click()}>
                        <Upload size={18} />
                        <span>{t('btnChooseFile')}</span>
                    </button>

                    <button type="button" className="btn-secondary" onClick={() => triggerDemoScan('sample_panadol_packaging.jpg')}>
                        <Camera size={18} />
                        <span>{t('btnCamera')}</span>
                    </button>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="card" style={{ padding: '3rem', textAlign: 'center', marginBottom: '2rem' }}>
                    <Loader2 style={{ animation: 'spin 1s linear infinite', color: 'var(--primary)', marginBottom: '1rem' }} size={40} />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{t('analyzingText')}</h3>
                </div>
            )}

            {/* Error Message */}
            {error && !loading && (
                <div className="card" style={{ padding: '2rem', textAlign: 'center', borderColor: '#fecaca', background: 'var(--risk-high-bg)', marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#b91c1c' }}>{error}</h3>
                </div>
            )}

            {/* Structured Result Display */}
            {result && !loading && (
                <ScanResultView result={result} imagePreview={imagePreview} />
            )}
        </div>
    );
}
