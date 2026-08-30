import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Loader2, AlertCircle } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import useAnalysis from '../hooks/useAnalysis'
import { useLanguage } from '../contexts/LanguageContext'

/**
 * Analysis / loading page.
 * Shows animated progress messages while AI processes the image.
 * Automatically navigates to /result when analysis is complete.
 */
export default function AnalysisPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useLanguage()
  const imageFile = location.state?.imageFile
  const language = location.state?.language || 'en'

  // If user navigated here directly (no file), redirect to scan page
  useEffect(() => {
    if (!imageFile) {
      navigate('/scan', { replace: true })
    }
  }, [imageFile, navigate])

  const { status, statusMessage, error, startAnalysis } = useAnalysis(imageFile, language)

  // Start analysis automatically when the page loads
  useEffect(() => {
    if (imageFile && status === 'idle') {
      startAnalysis()
    }
  }, [imageFile, status, startAnalysis])

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-16 animate-fade-in">
      <Card className="text-center">
        {/* Analyzing state */}
        {status === 'analyzing' && (
          <div className="py-8">
            <Loader2 className="w-16 h-16 text-primary-600 animate-spin mx-auto mb-6" aria-hidden="true" />
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              {t('analysis.title')}
            </h2>
            <p className="text-primary-600 font-medium mb-6 animate-pulse-soft">
              {statusMessage}
            </p>
            <p className="text-sm text-slate-400">
              {t('analysis.statusMessage')}
            </p>

            {/* Progress bar animation */}
            <div className="mt-8 mx-auto max-w-xs">
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-500 rounded-full transition-all duration-1000"
                  style={{
                    animation: 'progress 15s ease-in-out forwards',
                  }}
                />
              </div>
            </div>

            <style>{`
              @keyframes progress {
                0% { width: 0%; }
                20% { width: 20%; }
                50% { width: 50%; }
                80% { width: 75%; }
                100% { width: 90%; }
              }
            `}</style>
          </div>
        )}

        {/* Error state */}
        {status === 'error' && (
          <div className="py-8">
            <AlertCircle className="w-16 h-16 text-danger-500 mx-auto mb-6" aria-hidden="true" />
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              {t('analysis.failed')}
            </h2>
            <p className="text-slate-500 mb-6">
              {error || t('analysis.errorDefault')}
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button variant="primary" onClick={startAnalysis}>
                {t('analysis.tryAgain')}
              </Button>
              <Button variant="secondary" onClick={() => navigate('/scan')}>
                {t('analysis.uploadNew')}
              </Button>
            </div>
          </div>
        )}

        {/* Done state (brief flash before navigation) */}
        {status === 'done' && (
          <div className="py-8">
            <div className="w-16 h-16 bg-success-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-8 h-8 text-success-500 animate-spin" aria-hidden="true" />
            </div>
            <p className="text-slate-600">{t('analysis.loadingResults')}</p>
          </div>
        )}

        {/* Idle state (brief flash before analysis starts) */}
        {status === 'idle' && imageFile && (
          <div className="py-8">
            <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" aria-hidden="true" />
            <p className="text-slate-500">{t('analysis.preparing')}</p>
          </div>
        )}
      </Card>
    </div>
  )
}
