import { Shield, ShieldCheck, ShieldAlert, Heart, Users, Mail } from 'lucide-react'
import Card from '../components/ui/Card'
import Disclaimer from '../components/ui/Disclaimer'
import { APP_NAME, HACKATHON_NAME } from '../utils/constants'

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-7 h-7 text-primary-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          About {APP_NAME}
        </h1>
        <p className="text-slate-500">
          AI-powered medicine safety screening for Pakistan
        </p>
      </div>

      {/* What MedGuard AI Is */}
      <Card className="mb-6">
        <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-success-500" />
          What MedGuard AI Is
        </h2>
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-success-500 mt-1.5 flex-shrink-0" />
            A screening tool that helps identify potential warning signs in medicine packaging
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-success-500 mt-1.5 flex-shrink-0" />
            A source of general, publicly available medicine information (uses, dosage, side effects)
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-success-500 mt-1.5 flex-shrink-0" />
            A tool to guide users toward proper verification by qualified professionals
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-success-500 mt-1.5 flex-shrink-0" />
            Designed for the public health context of Pakistan
          </li>
        </ul>
      </Card>

      {/* What MedGuard AI Is NOT */}
      <Card className="mb-6">
        <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-danger-500" />
          What MedGuard AI Is NOT
        </h2>
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-danger-500 mt-1.5 flex-shrink-0" />
            <strong>Not a diagnostic tool</strong> -- it cannot diagnose any medical condition
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-danger-500 mt-1.5 flex-shrink-0" />
            <strong>Not a counterfeit detector</strong> -- it cannot confirm whether a medicine is genuine or fake
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-danger-500 mt-1.5 flex-shrink-0" />
            <strong>Not a substitute for professional advice</strong> -- always consult a doctor or pharmacist
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-danger-500 mt-1.5 flex-shrink-0" />
            <strong>Not a treatment recommendation engine</strong> -- it does not recommend specific treatments
          </li>
        </ul>
      </Card>

      {/* Safety Guidelines */}
      <Card className="mb-6">
        <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary-600" />
          Safety Guidelines for Users
        </h2>
        <ol className="space-y-2 text-sm text-slate-600 list-decimal list-inside">
          <li>Always purchase medicines from licensed, registered pharmacies</li>
          <li>If you suspect a medicine may be substandard, do not use it -- consult a pharmacist</li>
          <li>Report suspicious medicines to the Drug Regulatory Authority of Pakistan (DRAP)</li>
          <li>Never self-medicate for serious conditions -- always see a qualified doctor</li>
          <li>Keep all medicines out of reach of children</li>
          <li>Check expiry dates before using any medicine</li>
        </ol>
      </Card>

      {/* Hackathon Info */}
      <Card className="mb-6">
        <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary-600" />
          Project Info
        </h2>
        <p className="text-sm text-slate-600 mb-3">
          {APP_NAME} was built for the <strong>{HACKATHON_NAME}</strong>.
          The project aims to leverage AI technology to help address the public health challenge
          of substandard and counterfeit medicines in Pakistan.
        </p>
        <p className="text-sm text-slate-600">
          This prototype demonstrates the concept. Future versions plan to integrate
          Alibaba Cloud AI services for real image analysis and medicine verification.
        </p>
      </Card>

      {/* Team placeholder */}
      <Card className="mb-6">
        <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary-600" />
          Team
        </h2>
        <div className="text-center py-6 text-slate-400">
          <Users className="w-10 h-10 mx-auto mb-2" />
          <p className="text-sm">Team members will be listed here</p>
        </div>
      </Card>

      {/* Contact placeholder */}
      <Card className="mb-6">
        <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5 text-primary-600" />
          Contact &amp; Feedback
        </h2>
        <p className="text-sm text-slate-600">
          We welcome feedback and suggestions. Contact details will be added here.
        </p>
      </Card>

      {/* Disclaimer */}
      <Disclaimer />
    </div>
  )
}
