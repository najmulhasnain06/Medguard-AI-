import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'
import { APP_NAME, HACKATHON_NAME, DISCLAIMER_GENERAL } from '../../utils/constants'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Disclaimer */}
        <p className="text-xs text-slate-500 text-center mb-4 max-w-2xl mx-auto leading-relaxed">
          {DISCLAIMER_GENERAL}
        </p>

        {/* Links row */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 mb-4">
          <Link to="/about" className="hover:text-primary-600 transition-colors">About</Link>
          <span className="text-gray-300">|</span>
          <Link to="/scan" className="hover:text-primary-600 transition-colors">Scan Medicine</Link>
          <span className="text-gray-300">|</span>
          <Link to="/search" className="hover:text-primary-600 transition-colors">Search Medicine</Link>
        </div>

        {/* Branding + hackathon credit */}
        <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
          <Shield className="w-4 h-4" />
          <span>{APP_NAME} &mdash; Built for {HACKATHON_NAME}</span>
        </div>
      </div>
    </footer>
  )
}
