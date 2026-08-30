import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { ShieldAlert, CheckCircle, AlertTriangle, XCircle, Home, Camera, ListChecks, FileText, Eye, HelpCircle } from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Disclaimer from '../components/ui/Disclaimer'
import { DISCLAIMER_SCREENING, RISK_COLORS } from '../utils/constants'

/**
 * Risk Result page -- displays the AI risk assessment after analysis.
 * Data is passed via React Router's location.state from the AnalysisPage.
 */
export default function RiskResultPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const result = location.state?.analysisResult

  // If user navigates here directly without data, redirect to scan
  useEffect(() => {
    if (!result) {
      navigate('/scan', { replace: true })
    }
  }, [result, navigate])

  if (!result) return null

  const colors = RISK_COLORS[result.riskLevel] || {}

  // Choose an icon based on risk level
  const RiskIcon = {
    LOW_CONCERN: CheckCircle,
    NEEDS_VERIFICATION: AlertTriangle,
    HIGH_CONCERN: XCircle,
  }[result.riskLevel] || ShieldAlert

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Risk level header */}
      <Card className={`text-center mb-6 border-t-4 ${colors.border}`}>
        <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <RiskIcon className={`w-8 h-8 ${colors.text}`} />
        </div>

        <h1 className="text-xl font-bold text-slate-800 mb-3">
          Risk Assessment Result
        </h1>

        <Badge riskLevel={result.riskLevel} size="lg" className="mb-4" />

        <p className="text-sm text-slate-500 mt-2">
          {result.confidence}
        </p>
      </Card>

      {/* Extracted Information */}
      {result.extractedInfo && Object.keys(result.extractedInfo).length > 0 && (
        <Card className="mb-6">
          <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary-600" />
            Extracted Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {[
              { label: 'Medicine Name',      value: result.extractedInfo.medicineName },
              { label: 'Active Ingredient',  value: result.extractedInfo.activeIngredient },
              { label: 'Strength',           value: result.extractedInfo.strength },
              { label: 'Manufacturer',       value: result.extractedInfo.manufacturer },
              { label: 'Batch / Lot Number', value: result.extractedInfo.batchNumber },
              { label: 'Manufacturing Date', value: result.extractedInfo.manufacturingDate },
              { label: 'Expiry Date',        value: result.extractedInfo.expiryDate },
              { label: 'Registration Info',  value: result.extractedInfo.registrationInfo },
              { label: 'Barcode Visible',    value: result.extractedInfo.barcodeVisible ? 'Yes' : 'No' },
              { label: 'QR Code Visible',    value: result.extractedInfo.qrCodeVisible ? 'Yes' : 'No' },
            ].map((item, i) => (
              <div key={i} className="flex justify-between py-1.5 border-b border-gray-50">
                <span className="text-slate-500">{item.label}</span>
                <span className="text-slate-800 font-medium text-right ml-2">{item.value || 'N/A'}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Observations */}
      <Card className="mb-6">
        <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5 text-primary-600" />
          Observations
        </h2>
        <ul className="space-y-2">
          {(result.observations && result.observations.length > 0 ? result.observations : result.reasons || []).map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </Card>

      {/* Concerns */}
      {result.concerns && result.concerns.length > 0 && (
        <Card className="mb-6">
          <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning-600" />
            Concerns
          </h2>
          <ul className="space-y-2">
            {result.concerns.map((concern, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-warning-500 mt-1.5 flex-shrink-0" />
                {concern}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Missing Information */}
      {result.missingInfo && result.missingInfo.length > 0 && (
        <Card className="mb-6">
          <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-slate-500" />
            Information Not Visible
          </h2>
          <ul className="space-y-2">
            {result.missingInfo.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Recommendations */}
      <Card className="mb-6">
        <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <ListChecks className="w-5 h-5 text-primary-600" />
          Recommended Actions
        </h2>
        <ul className="space-y-2">
          {result.recommendations.map((rec, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <CheckCircle className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
              {rec}
            </li>
          ))}
        </ul>
      </Card>

      {/* Disclaimer */}
      <Disclaimer text={DISCLAIMER_SCREENING} className="mb-6" />

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Button
          variant="primary"
          size="lg"
          className="w-full sm:w-auto"
          onClick={() => navigate('/scan')}
        >
          <Camera className="w-5 h-5" />
          Scan Another
        </Button>
        <Link to="/" className="w-full sm:w-auto">
          <Button variant="secondary" size="lg" className="w-full">
            <Home className="w-5 h-5" />
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
