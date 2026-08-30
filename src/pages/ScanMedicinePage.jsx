import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, Info } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import FileUpload from '../components/ui/FileUpload'
import Disclaimer from '../components/ui/Disclaimer'
import { useLanguage } from '../contexts/LanguageContext'

export default function ScanMedicinePage() {
  const [selectedFile, setSelectedFile] = useState(null)
  const navigate = useNavigate()
  const { t, language } = useLanguage()

  function handleAnalyze() {
    if (!selectedFile) return
    // Navigate to analysis page, passing the file and language via router state
    navigate('/analysis', { state: { imageFile: selectedFile, language } })
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Page header */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Camera className="w-7 h-7 text-primary-600" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          {t('scan.title')}
        </h1>
        <p className="text-slate-500">
          {t('scan.subtitle')}
        </p>
      </div>

      {/* Upload area */}
      <Card className="mb-6">
        <FileUpload onFileSelect={setSelectedFile} />
      </Card>

      {/* Tips */}
      <Card className="mb-6" padding="p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-medium text-slate-700 text-sm mb-2">{t('scan.tipsTitle')}</p>
            <ul className="text-sm text-slate-500 space-y-1">
              <li>&#8226; {t('scan.tip1')}</li>
              <li>&#8226; {t('scan.tip2')}</li>
              <li>&#8226; {t('scan.tip3')}</li>
              <li>&#8226; {t('scan.tip4')}</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Analyze button */}
      <Button
        size="lg"
        onClick={handleAnalyze}
        disabled={!selectedFile}
        className="w-full"
      >
        <Camera className="w-5 h-5" aria-hidden="true" />
        {t('scan.analyseButton')}
      </Button>

      {/* Disclaimer */}
      <div className="mt-6">
        <Disclaimer text={t('scan.disclaimer')} />
      </div>
    </div>
  )
}
