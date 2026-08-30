import { Loader2 } from 'lucide-react'

/**
 * Loading spinner with optional message text.
 * Used on the AnalysisPage while mock AI is "thinking".
 */
export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
      <p className="text-slate-600 font-medium animate-pulse-soft">{message}</p>
    </div>
  )
}
