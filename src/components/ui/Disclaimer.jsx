import { AlertTriangle } from 'lucide-react'
import { DISCLAIMER_GENERAL } from '../../utils/constants'

/**
 * Medical disclaimer banner shown on key pages.
 * Can override the default text via the "text" prop.
 */
export default function Disclaimer({ text, className = '' }) {
  return (
    <div className={`flex items-start gap-3 bg-warning-50 border border-warning-500/30 rounded-xl p-4 ${className}`}>
      <AlertTriangle className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-warning-600 leading-relaxed">
        {text || DISCLAIMER_GENERAL}
      </p>
    </div>
  )
}
