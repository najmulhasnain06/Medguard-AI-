import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { analyzeImage } from '../services/mockImageAnalysis'

/**
 * Custom hook for managing the image analysis workflow.
 * Handles loading state, progress messages, and navigation on completion.
 *
 * Usage:
 *   const { status, statusMessage, error, startAnalysis } = useAnalysis(imageFile, language)
 *
 * status: 'idle' | 'analyzing' | 'done' | 'error'
 */
export default function useAnalysis(imageFile, language = 'en') {
  const [status, setStatus] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)
  const intervalRef = useRef(null)
  const navigate = useNavigate()

  // Status messages that cycle during analysis
  const ANALYSIS_STEPS_EN = [
    'Uploading image to server...',
    'Sending to AI vision model...',
    'Analysing packaging details...',
    'Checking visible indicators...',
    'Generating risk assessment...',
  ]

  const ANALYSIS_STEPS_UR = [
    '...تصویر سرور پر اپ لوڈ ہو رہی ہے',
    '...AI ویژن ماڈل کو بھیج رہے ہیں',
    '...پیکنگ کی تفصیلات کا تجزیہ ہو رہا ہے',
    '...نظر آنے والے اشاروں کی جانچ ہو رہی ہے',
    '...رسک اسسمنٹ تیار ہو رہی ہے',
  ]

  const ANALYSIS_STEPS = language === 'ur' ? ANALYSIS_STEPS_UR : ANALYSIS_STEPS_EN

  function startAnalysis() {
    if (!imageFile) {
      setError('Please upload an image first.')
      setStatus('error')
      return
    }

    setStatus('analyzing')
    setError(null)
    setStatusMessage(ANALYSIS_STEPS[0])

    // Cycle through status messages every 1 second
    let stepIndex = 0
    intervalRef.current = setInterval(() => {
      stepIndex = (stepIndex + 1) % ANALYSIS_STEPS.length
      setStatusMessage(ANALYSIS_STEPS[stepIndex])
    }, 1000)

    // Call the mock analysis service with language
    analyzeImage(imageFile, language)
      .then((data) => {
        clearInterval(intervalRef.current)
        setResult(data)
        setStatus('done')
        // Navigate to result page, passing the result via router state
        navigate('/result', { state: { analysisResult: data } })
      })
      .catch((err) => {
        clearInterval(intervalRef.current)
        setError(err.message || 'Analysis failed. Please try again.')
        setStatus('error')
      })
  }

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return { status, statusMessage, error, result, startAnalysis }
}
