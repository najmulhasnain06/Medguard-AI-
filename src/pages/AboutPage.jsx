import { Shield, ShieldCheck, ShieldAlert, Heart, Users, Mail } from 'lucide-react'
import Card from '../components/ui/Card'
import Disclaimer from '../components/ui/Disclaimer'
import { APP_NAME, HACKATHON_NAME } from '../utils/constants'
import { useLanguage } from '../contexts/LanguageContext'

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-7 h-7 text-primary-600" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          {t('about.title')} {APP_NAME}
        </h1>
        <p className="text-slate-500">
          {t('about.subtitle')}
        </p>
      </div>

      {/* What MedGuard AI Is */}
      <Card className="mb-6">
        <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-success-500" aria-hidden="true" />
          {t('about.whatIs')}
        </h2>
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-success-500 mt-1.5 flex-shrink-0" />
            {t('about.isItem1')}
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-success-500 mt-1.5 flex-shrink-0" />
            {t('about.isItem2')}
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-success-500 mt-1.5 flex-shrink-0" />
            {t('about.isItem3')}
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-success-500 mt-1.5 flex-shrink-0" />
            {t('about.isItem4')}
          </li>
        </ul>
      </Card>

      {/* What MedGuard AI Is NOT */}
      <Card className="mb-6">
        <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-danger-500" aria-hidden="true" />
          {t('about.whatIsNot')}
        </h2>
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-danger-500 mt-1.5 flex-shrink-0" />
            <strong>{t('about.notItem1')}</strong> -- {t('about.notItem1Desc')}
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-danger-500 mt-1.5 flex-shrink-0" />
            <strong>{t('about.notItem2')}</strong> -- {t('about.notItem2Desc')}
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-danger-500 mt-1.5 flex-shrink-0" />
            <strong>{t('about.notItem3')}</strong> -- {t('about.notItem3Desc')}
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-danger-500 mt-1.5 flex-shrink-0" />
            <strong>{t('about.notItem4')}</strong> -- {t('about.notItem4Desc')}
          </li>
        </ul>
      </Card>

      {/* Safety Guidelines */}
      <Card className="mb-6">
        <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary-600" aria-hidden="true" />
          {t('about.safetyGuidelines')}
        </h2>
        <ol className="space-y-2 text-sm text-slate-600 list-decimal list-inside">
          <li>{t('about.safetyItem1')}</li>
          <li>{t('about.safetyItem2')}</li>
          <li>{t('about.safetyItem3')}</li>
          <li>{t('about.safetyItem4')}</li>
          <li>{t('about.safetyItem5')}</li>
          <li>{t('about.safetyItem6')}</li>
        </ol>
      </Card>

      {/* Hackathon Info */}
      <Card className="mb-6">
        <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary-600" aria-hidden="true" />
          {t('about.projectInfo')}
        </h2>
        <p className="text-sm text-slate-600 mb-3">
          {APP_NAME} {t('about.projectDesc1')} <strong>{HACKATHON_NAME}</strong>.
          {t('about.projectDesc2')}
        </p>
        <p className="text-sm text-slate-600">
          {t('about.projectDesc3')}
        </p>
      </Card>

      {/* Team placeholder */}
      <Card className="mb-6">
        <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary-600" aria-hidden="true" />
          {t('about.team')}
        </h2>
        <div className="text-center py-6 text-slate-400">
          <Users className="w-10 h-10 mx-auto mb-2" aria-hidden="true" />
          <p className="text-sm">{t('about.teamPlaceholder')}</p>
        </div>
      </Card>

      {/* Contact placeholder */}
      <Card className="mb-6">
        <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5 text-primary-600" aria-hidden="true" />
          {t('about.contact')}
        </h2>
        <p className="text-sm text-slate-600">
          {t('about.contactDesc')}
        </p>
      </Card>

      {/* Disclaimer */}
      <Disclaimer text={t('disclaimer.general')} />
    </div>
  )
}
