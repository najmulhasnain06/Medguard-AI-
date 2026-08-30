import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, Info } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import FileUpload from '../components/ui/FileUpload'
import Disclaimer from '../components/ui/Disclaimer'

export default function ScanMedicinePage() {
  const [selectedFile, setSelectedFile] = useState(null)
  const navigate = useNavigate()

  function handleAnalyze() {
    if (!selectedFile) return
    // Navigate to analysis page, passing the file via router state
    navigate('/analysis', { state: { imageFile: selectedFile } })
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Page header */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Camera className="w-7 h-7 text-primary-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Scan Medicine Packaging
        </h1>
        <p className="text-slate-500">
          Upload a clear photo of medicine packaging for an AI risk assessment
        </p>
      </div>

      {/* Upload area */}
      <Card className="mb-6">
        <FileUpload onFileSelect={setSelectedFile} />
      </Card>

      {/* Tips */}
      <Card className="mb-6" padding="p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-slate-700 text-sm mb-2">Tips for best results:</p>
            <ul className="text-sm text-slate-500 space-y-1">
              <li>&#8226; Take a clear photo of the full package in good lighting</li>
              <li>&#8226; Make sure text, brand name, and barcode are visible</li>
              <li>&#8226; Include the expiry date and batch number area if possible</li>
              <li>&#8226; Avoid blurry or dark images</li>
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
        <Camera className="w-5 h-5" />
        Analyse Packaging
      </Button>

      {/* Disclaimer */}
      <div className="mt-6">
        <Disclaimer text="This tool provides screening-level risk assessment only. It cannot confirm whether a medicine is genuine or counterfeit." />
      </div>
    </div>
  )
}
