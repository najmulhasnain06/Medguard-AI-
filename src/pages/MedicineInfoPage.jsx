import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Pill, Stethoscope, Clock, AlertTriangle, AlertCircle,
  Thermometer, ExternalLink, ArrowLeft, Loader2, Sparkles,
} from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Disclaimer from '../components/ui/Disclaimer'
import { getMedicineByIdentifier } from '../services/mockMedicineSearch'
import { DISCLAIMER_MEDICINE_INFO } from '../utils/constants'
import { useLanguage } from '../contexts/LanguageContext'

/**
 * Medicine Information page.
 * Displays general information about a specific medicine.
 * Route: /medicine/:identifier
 */
export default function MedicineInfoPage() {
  const { identifier } = useParams()
  const [medicine, setMedicine] = useState(null)
  const [loading, setLoading] = useState(true)
  const { t, language } = useLanguage()

  useEffect(() => {
    setLoading(true)
    getMedicineByIdentifier(identifier, language).then((data) => {
      setMedicine(data)
      setLoading(false)
    })
  }, [identifier, language])

  // Loading state
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <Card className="text-center py-12">
          <Loader2 className="w-10 h-10 text-primary-600 animate-spin mx-auto mb-4" aria-hidden="true" />
          <p className="text-slate-500">{t('analysis.loadingResults')}</p>
        </Card>
      </div>
    )
  }

  // Not found state
  if (!medicine) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 animate-fade-in">
        <Card className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" aria-hidden="true" />
          <h2 className="text-xl font-semibold text-slate-800 mb-2">{t('medicineInfo.notFound')}</h2>
          <p className="text-slate-500 mb-6">
            {t('medicineInfo.notFoundMessage')} "{identifier}" {t('medicineInfo.inDatabase')}
          </p>
          <Link to="/search">
            <Button variant="primary">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              {t('medicineInfo.backToSearch')}
            </Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Back link */}
      <Link
        to="/search"
        className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        {t('medicineInfo.backToSearch')}
      </Link>

      {/* AI-generated badge */}
      {medicine.aiGenerated && (
        <div className="mb-4 flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <Sparkles className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium text-amber-800">
              {t('medicineInfo.aiGeneratedTitle')}
            </p>
            <p className="text-xs text-amber-600 mt-0.5">
              {t('medicineInfo.aiGeneratedDesc')}
            </p>
          </div>
        </div>
      )}

      {/* Not confidently identified warning */}
      {medicine.identified === false && (
        <div className="mb-4 flex items-start gap-3 p-4 bg-danger-50 border border-danger-200 rounded-xl">
          <AlertCircle className="w-5 h-5 text-danger-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium text-danger-700">
              {t('medicineInfo.notIdentifiedTitle')}
            </p>
            <p className="text-xs text-danger-500 mt-0.5">
              {t('medicineInfo.notIdentifiedDesc')}
            </p>
          </div>
        </div>
      )}

      {/* Medicine header */}
      <Card className="mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <Pill className="w-6 h-6 text-primary-600" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-1">{medicine.name}</h1>
            <p className="text-sm text-slate-500">
              <span className="font-medium">{t('medicineInfo.activeIngredient')}</span>{' '}
              {medicine.activeIngredient}
            </p>
          </div>
        </div>
      </Card>

      {/* Uses */}
      <Card className="mb-4">
        <h2 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-primary-600" aria-hidden="true" />
          {t('medicineInfo.generalUses')}
        </h2>
        <ul className="space-y-1.5">
          {medicine.uses.map((use, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-1.5 flex-shrink-0" />
              {use}
            </li>
          ))}
        </ul>
      </Card>

      {/* Dosage */}
      <Card className="mb-4">
        <h2 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary-600" aria-hidden="true" />
          {t('medicineInfo.dosageTitle')}
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">{medicine.dosage}</p>
      </Card>

      {/* Precautions */}
      <Card className="mb-4">
        <h2 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-warning-600" aria-hidden="true" />
          {t('medicineInfo.precautions')}
        </h2>
        <ul className="space-y-1.5">
          {medicine.precautions.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-warning-500 mt-1.5 flex-shrink-0" />
              {p}
            </li>
          ))}
        </ul>
      </Card>

      {/* Side Effects */}
      <Card className="mb-4">
        <h2 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-danger-500" aria-hidden="true" />
          {t('medicineInfo.sideEffects')}
        </h2>
        <ul className="space-y-1.5">
          {medicine.sideEffects.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-danger-500 mt-1.5 flex-shrink-0" />
              {s}
            </li>
          ))}
        </ul>
      </Card>

      {/* Interactions */}
      <Card className="mb-4">
        <h2 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <Pill className="w-5 h-5 text-primary-600" aria-hidden="true" />
          {t('medicineInfo.interactions')}
        </h2>
        <ul className="space-y-1.5">
          {medicine.interactions.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </Card>

      {/* Storage */}
      <Card className="mb-4">
        <h2 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-primary-600" aria-hidden="true" />
          {t('medicineInfo.storage')}
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">{medicine.storage}</p>
      </Card>

      {/* Sources */}
      {medicine.sources && medicine.sources.length > 0 && (
        <Card className="mb-6">
          <h2 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-primary-600" aria-hidden="true" />
            {t('medicineInfo.sources')}
          </h2>
          <div className="space-y-2">
            {medicine.sources.map((source, i) => (
              <a
                key={i}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                {source.name}
              </a>
            ))}
          </div>
        </Card>
      )}

      {/* Disclaimer */}
      <Disclaimer text={t('disclaimer.medicineInfo')} />
    </div>
  )
}
