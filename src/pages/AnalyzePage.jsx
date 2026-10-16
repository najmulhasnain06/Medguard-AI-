import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import RiskBadge from '../components/RiskBadge.jsx';
import {
  UploadCloud,
  FileImage,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  Trash2,
  RefreshCw,
  Printer,
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  Info,
  CheckCircle2,
  Cpu
} from 'lucide-react';

// Generates a mock canvas image if user selects one of the quick test presets
function createPresetBlob(label, color = '#0284c7') {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 600, 400);

  // Border & Box
  ctx.strokeStyle = color;
  ctx.lineWidth = 6;
  ctx.strokeRect(30, 30, 540, 340);

  // Header band
  ctx.fillStyle = color;
  ctx.fillRect(30, 30, 540, 75);

  // Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText(label, 50, 78);

  // Details
  ctx.fillStyle = '#0f172a';
  ctx.font = '16px sans-serif';
  ctx.fillText('MedGuard AI Packaging Inspection Specimen', 50, 150);
  ctx.fillText(`Batch No: BNT-${Math.floor(100000 + Math.random() * 900000)}`, 50, 190);
  ctx.fillText('Mfg Date: 01/2025 | Exp Date: 12/2027', 50, 225);
  ctx.fillText('DRAP Reg. No: 000142 | Licensed Pharmaceutical Packaging', 50, 260);

  // Barcode simulation
  ctx.fillStyle = '#334155';
  for (let i = 50; i < 350; i += 8) {
    const barWidth = (i % 16 === 0) ? 5 : 2;
    ctx.fillRect(i, 300, barWidth, 40);
  }

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(new File([blob], `${label.toLowerCase().replace(/\s+/g, '_')}.png`, { type: 'image/png' }));
    }, 'image/png');
  });
}

export default function AnalyzePage() {
  const { t, language, isRTL } = useLanguage();
  const [searchParams] = useSearchParams();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [medicineName, setMedicineName] = useState('');
  const [notes, setNotes] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const fileInputRef = useRef(null);

  // Handle URL preset parameter
  useEffect(() => {
    const sampleParam = searchParams.get('sample');
    if (sampleParam) {
      if (sampleParam === 'panadol') {
        loadPreset('Panadol 500mg (Authentic GSK Specimen)', '#0284c7');
      } else if (sampleParam === 'nuberol') {
        loadPreset('Nuberol Forte (Searle Specimen)', '#9333ea');
      } else if (sampleParam === 'flagged') {
        loadPreset('Suspicious Blister Packaging (Smudged Ink)', '#dc2626');
      }
    }
  }, [searchParams]);

  const loadPreset = async (title, color) => {
    try {
      const file = await createPresetBlob(title, color);
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setMedicineName(title);
      setResult(null);
      setError(null);
    } catch (e) {
      console.error('Failed to create sample image:', e);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setError(language === 'ur' ? 'صرف JPG, JPEG, PNG, اور WEBP تصاویر قبول کی جاتی ہیں۔' : 'Only JPG, JPEG, PNG, and WEBP images are supported.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError(language === 'ur' ? 'تصویر کا سائز 10MB سے کم ہونا چاہیے۔' : 'Image size must be under 10MB.');
      return;
    }

    setError(null);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type.toLowerCase())) {
        setError(language === 'ur' ? 'صرف JPG, JPEG, PNG, اور WEBP تصاویر قبول کی جاتی ہیں۔' : 'Only JPG, JPEG, PNG, and WEBP images are supported.');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError(language === 'ur' ? 'برائے مہربانی پہلے دوا کی پیکیجنگ کی تصویر منتخب کریں۔' : 'Please upload or select a medicine packaging image first.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    // Multi-step progress visualizer
    setLoadingStep(1);
    const stepTimer1 = setTimeout(() => setLoadingStep(2), 700);
    const stepTimer2 = setTimeout(() => setLoadingStep(3), 1600);

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('medicineName', medicineName);
    formData.append('notes', notes);
    formData.append('lang', language);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Server error (${response.status})`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Analysis failed:', err);
      setError(err.message || 'Failed to complete packaging analysis. Please check server connection.');
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setLoading(false);
      setLoadingStep(0);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="analyze-page" style={{ padding: '2.5rem 0 4rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.5rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
            {t('analyze.pageTitle')}
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
            {t('analyze.pageSubtitle')}
          </p>
        </div>

        {/* Preset quick buttons */}
        <div className="sample-presets-box" style={{ marginBottom: '2rem' }}>
          <span className="sample-presets-label">{t('analyze.trySamplesTitle')}</span>
          <button
            onClick={() => loadPreset('Panadol 500mg (Authentic GSK)', '#0284c7')}
            className="sample-pill"
            type="button"
          >
            <CheckCircle2 size={15} color="#059669" />
            <span>{language === 'ur' ? 'پیناڈول 500 ملی گرام (اصل نمونہ)' : 'Panadol 500mg (Authentic)'}</span>
          </button>
          <button
            onClick={() => loadPreset('Nuberol Forte (Searle)', '#9333ea')}
            className="sample-pill"
            type="button"
          >
            <CheckCircle2 size={15} color="#9333ea" />
            <span>{language === 'ur' ? 'نیوبرول فورٹ (سیرل)' : 'Nuberol Forte (Searle)'}</span>
          </button>
          <button
            onClick={() => loadPreset('Suspected Irregular Packaging', '#dc2626')}
            className="sample-pill"
            type="button"
          >
            <AlertTriangle size={15} color="#dc2626" />
            <span>{language === 'ur' ? 'مشتبہ پیکیجنگ (خامیاں)' : 'Suspected Packaging (Irregular)'}</span>
          </button>
        </div>

        {error && (
          <div style={{
            background: '#fee2e2',
            border: '1px solid #fecdd3',
            color: '#991b1b',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <AlertTriangle size={20} />
            <span style={{ fontWeight: 600 }}>{error}</span>
          </div>
        )}

        {/* Workspace Grid */}
        <div className={`analyze-workspace ${result ? 'has-results' : ''}`}>
          {/* Upload & Form Column */}
          <div className="upload-panel">
            {!previewUrl ? (
              <div
                className="dropzone"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="dropzone-icon">
                  <UploadCloud size={32} />
                </div>
                <h3 className="dropzone-title">{t('analyze.uploadTitle')}</h3>
                <p className="dropzone-subtitle">{t('analyze.uploadSubtitle')}</p>
                <button type="button" className="btn btn-secondary btn-sm">
                  <FileImage size={16} />
                  <span>{t('analyze.browseButton')}</span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  className="file-input-hidden"
                />
              </div>
            ) : (
              <div className="preview-container">
                <img src={previewUrl} alt="Uploaded packaging preview" className="preview-img" />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="remove-img-btn"
                  title={t('analyze.changePhoto')}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}

            {/* Optional Metadata Inputs */}
            <div style={{ marginTop: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label">{t('analyze.medicineNameLabel')}</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder={t('analyze.medicineNamePlaceholder')}
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t('analyze.notesLabel')}</label>
                <textarea
                  className="form-textarea"
                  rows={2}
                  placeholder={t('analyze.notesPlaceholder')}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem' }}
                onClick={handleAnalyze}
                disabled={loading || !selectedFile}
              >
                {loading ? (
                  <>
                    <RefreshCw size={18} className="spinner" style={{ width: '18px', height: '18px', margin: 0, borderWidth: '2px' }} />
                    <span>{t('analyze.analyzingBtn')}</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    <span>{t('analyze.analyzeBtn')}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Loading Laser Scan State */}
          {loading && (
            <div className="scanning-card">
              <div className="scanning-laser"></div>
              <div className="spinner"></div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: '#0f172a' }}>
                {t('analyze.analyzingBtn')}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {loadingStep === 1 && t('analyze.stepInit')}
                {loadingStep === 2 && t('analyze.stepVision')}
                {loadingStep >= 3 && t('analyze.stepInspect')}
              </p>
            </div>
          )}

          {/* Inspection Results Report */}
          {result && !loading && (
            <div className="results-card">
              {/* Demo Mode / Live Mode Notification */}
              {result.isDemo ? (
                <div style={{
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  color: '#1e40af',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.25rem',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Cpu size={16} style={{ flexShrink: 0 }} />
                  <span>{result.demoNotice || t('analyze.demoModeNotice')}</span>
                </div>
              ) : (
                <div style={{
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  color: '#065f46',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.25rem',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Sparkles size={16} color="#059669" style={{ flexShrink: 0 }} />
                  <span>{t('analyze.liveModeNotice')} ({result.model})</span>
                </div>
              )}

              {/* Report Header: Risk Level + Confidence */}
              <div className="report-header">
                <div className="report-title-area">
                  <h2>{t('analyze.resultsTitle')}</h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    {new Date(result.timestamp || Date.now()).toLocaleString()}
                  </p>
                </div>
                <div>
                  <RiskBadge level={result.riskLevel} />
                </div>
              </div>

              {/* Confidence Score Bar */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600 }}>
                  <span style={{ color: 'var(--text-muted)' }}>{t('analyze.confidenceScore')}</span>
                  <span style={{ color: 'var(--primary-dark)' }}>{result.confidenceScore || 90}%</span>
                </div>
                <div className="confidence-meter">
                  <div className="confidence-fill" style={{ width: `${result.confidenceScore || 90}%` }}></div>
                </div>
              </div>

              {/* Executive Summary */}
              <div style={{
                background: result.riskLevel === 'HIGH_CONCERN' ? '#fff1f2' : (result.riskLevel === 'LOW_CONCERN' ? '#f0fdf4' : '#fffbeb'),
                border: '1px solid',
                borderColor: result.riskLevel === 'HIGH_CONCERN' ? '#fecdd3' : (result.riskLevel === 'LOW_CONCERN' ? '#bbf7d0' : '#fde68a'),
                padding: '1.2rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                fontWeight: 500,
                color: result.riskLevel === 'HIGH_CONCERN' ? '#881337' : (result.riskLevel === 'LOW_CONCERN' ? '#14532d' : '#78350f')
              }}>
                {language === 'ur' && result.summaryUrdu ? result.summaryUrdu : result.summary}
              </div>

              {/* Product Metadata Info */}
              <div className="metadata-grid">
                <div>
                  <div className="meta-item-label">{t('analyze.identifiedProduct')}</div>
                  <div className="meta-item-val">
                    {language === 'ur' && result.identifiedMedicineUrdu ? result.identifiedMedicineUrdu : result.identifiedMedicine}
                  </div>
                </div>
                <div>
                  <div className="meta-item-label">{t('analyze.activeIngredient')}</div>
                  <div className="meta-item-val">
                    {language === 'ur' && result.genericNameUrdu ? result.genericNameUrdu : (result.genericName || 'N/A')}
                  </div>
                </div>
                <div>
                  <div className="meta-item-label">{t('analyze.manufacturer')}</div>
                  <div className="meta-item-val">
                    {language === 'ur' && result.manufacturerUrdu ? result.manufacturerUrdu : (result.manufacturer || 'Unknown')}
                  </div>
                </div>
              </div>

              {/* Verification Checklist */}
              {Array.isArray(result.checklist) && result.checklist.length > 0 && (
                <div className="checklist-container">
                  <h3 className="checklist-title">
                    <ShieldCheck size={20} color="#0284c7" />
                    <span>{t('analyze.checklistTitle')}</span>
                  </h3>
                  <div className="checklist-list">
                    {result.checklist.map((item, idx) => (
                      <div className="checklist-item" key={idx}>
                        <span className={`check-status-badge ${item.status || 'PASS'}`}>
                          {item.status === 'PASS' && (language === 'ur' ? 'درست' : 'PASS')}
                          {item.status === 'FLAGGED' && (language === 'ur' ? 'مشتبہ' : 'FLAGGED')}
                          {item.status === 'INDETERMINATE' && (language === 'ur' ? 'غیر حتمی' : 'INDETERMINATE')}
                        </span>
                        <div className="check-info">
                          <div className="check-name">
                            {language === 'ur' && item.itemUrdu ? item.itemUrdu : item.item}
                          </div>
                          <div className="check-note">
                            {language === 'ur' && item.notesUrdu ? item.notesUrdu : item.notes}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Observations & Recommendations Grid */}
              <div className="findings-grid">
                {/* Observations */}
                {Array.isArray(result.observations) && result.observations.length > 0 && (
                  <div className="findings-box">
                    <h4>
                      <Info size={18} color="#0284c7" />
                      <span>{t('analyze.observationsTitle')}</span>
                    </h4>
                    <ul className="findings-list">
                      {(language === 'ur' && Array.isArray(result.observationsUrdu) && result.observationsUrdu.length > 0
                        ? result.observationsUrdu
                        : result.observations
                      ).map((obs, idx) => (
                        <li key={idx}>{obs}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations */}
                {Array.isArray(result.recommendations) && result.recommendations.length > 0 && (
                  <div className="findings-box">
                    <h4>
                      <CheckCircle size={18} color="#059669" />
                      <span>{t('analyze.recommendationsTitle')}</span>
                    </h4>
                    <ul className="findings-list">
                      {(language === 'ur' && Array.isArray(result.recommendationsUrdu) && result.recommendationsUrdu.length > 0
                        ? result.recommendationsUrdu
                        : result.recommendations
                      ).map((rec, idx) => (
                        <li key={idx}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Mandatory Medical & Regulatory Disclaimers Box */}
              <div className="safety-alert-box">
                <div className="safety-alert-title">
                  <ShieldAlert size={18} />
                  <span>{t('analyze.disclaimersTitle')}</span>
                </div>
                {(language === 'ur' && Array.isArray(result.disclaimersUrdu) && result.disclaimersUrdu.length > 0
                  ? result.disclaimersUrdu
                  : (result.disclaimers || [])
                ).map((disc, idx) => (
                  <p key={idx} className="safety-alert-item">
                    • {disc}
                  </p>
                ))}
              </div>

              {/* Report Actions */}
              <div style={{ marginTop: '1.75rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button type="button" className="btn btn-secondary" onClick={handlePrint}>
                  <Printer size={16} />
                  <span>{t('analyze.printReport')}</span>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setResult(null);
                    setSelectedFile(null);
                    setPreviewUrl(null);
                  }}
                >
                  <RefreshCw size={16} />
                  <span>{t('analyze.analyzeAnother')}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
