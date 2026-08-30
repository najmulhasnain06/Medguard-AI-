import { Link } from 'react-router-dom'
import { Camera, Search, ShieldCheck, ArrowRight, Stethoscope, AlertTriangle, Lock } from 'lucide-react'
import Card from '../components/ui/Card'
import Disclaimer from '../components/ui/Disclaimer'
import { APP_NAME, APP_TAGLINE } from '../utils/constants'
import { useLanguage } from '../contexts/LanguageContext'

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-4 py-1.5 text-sm mb-6">
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            <span>{t('home.trustedTool')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">
            {APP_NAME}
          </h1>
          <p className="text-lg sm:text-xl text-primary-100 max-w-2xl mx-auto mb-10">
            {APP_TAGLINE}
          </p>

          {/* Two action cards */}
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Link to="/scan" className="group">
              <Card className="text-left hover:shadow-lg transition-shadow">
                <Camera className="w-10 h-10 text-primary-600 mb-3" aria-hidden="true" />
                <h2 className="text-lg font-semibold text-slate-800 mb-1">
                  {t('home.scanTitle')}
                </h2>
                <p className="text-sm text-slate-500 mb-3">
                  {t('home.scanDesc')}
                </p>
                <span className="inline-flex items-center gap-1 text-primary-600 text-sm font-medium group-hover:gap-2 transition-all">
                  {t('home.startScan')} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </Card>
            </Link>

            <Link to="/search" className="group">
              <Card className="text-left hover:shadow-lg transition-shadow">
                <Search className="w-10 h-10 text-primary-600 mb-3" aria-hidden="true" />
                <h2 className="text-lg font-semibold text-slate-800 mb-1">
                  {t('home.searchTitle')}
                </h2>
                <p className="text-sm text-slate-500 mb-3">
                  {t('home.searchDesc')}
                </p>
                <span className="inline-flex items-center gap-1 text-primary-600 text-sm font-medium group-hover:gap-2 transition-all">
                  {t('home.searchNow')} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-10">
            {t('home.howItWorks')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-14 h-14 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-7 h-7 text-primary-600" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">{t('home.step1Title')}</h3>
              <p className="text-sm text-slate-500">
                {t('home.step1Desc')}
              </p>
            </div>
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-14 h-14 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-7 h-7 text-primary-600" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">{t('home.step2Title')}</h3>
              <p className="text-sm text-slate-500">
                {t('home.step2Desc')}
              </p>
            </div>
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-14 h-14 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-7 h-7 text-primary-600" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">{t('home.step3Title')}</h3>
              <p className="text-sm text-slate-500">
                {t('home.step3Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-sm text-slate-600 bg-white border border-gray-200 rounded-full px-4 py-2">
              <ShieldCheck className="w-5 h-5 text-primary-600" aria-hidden="true" />
              <span>{t('home.screeningOnly')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 bg-white border border-gray-200 rounded-full px-4 py-2">
              <Lock className="w-5 h-5 text-primary-600" aria-hidden="true" />
              <span>{t('home.privateSecure')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 bg-white border border-gray-200 rounded-full px-4 py-2">
              <AlertTriangle className="w-5 h-5 text-primary-600" aria-hidden="true" />
              <span>{t('home.notDiagnosis')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <Disclaimer />
        </div>
      </section>
    </div>
  )
}
