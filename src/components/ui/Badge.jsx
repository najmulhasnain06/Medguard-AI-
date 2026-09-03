import { RISK_LABELS, RISK_COLORS } from '../../utils/constants'

/**
 * Badge for displaying risk levels with color coding.
 * Pass a riskLevel value (LOW_CONCERN, NEEDS_VERIFICATION, HIGH_CONCERN).
 */
export default function Badge({ riskLevel, size = 'md', className = '' }) {
  const label = RISK_LABELS[riskLevel] || 'Unknown'
  const colors = RISK_COLORS[riskLevel]

  const sizeClasses = size === 'lg'
    ? 'px-5 py-2.5 text-lg font-bold'
    : 'px-3 py-1 text-sm font-semibold'

  return (
    <span
      className={`inline-flex items-center rounded-full ${colors?.badge || 'bg-gray-200 text-gray-700'} ${sizeClasses} ${className}`}
    >
      {label}
    </span>
  )
}
