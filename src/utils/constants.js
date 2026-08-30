/**
 * App-wide constants for MedGuard AI.
 * Risk levels, color mappings, and UI strings live here
 * so they are easy to update and later translate to Urdu.
 */

// --- Risk Levels ---
export const RISK_LEVELS = {
  LOW_CONCERN: 'LOW_CONCERN',
  NEEDS_VERIFICATION: 'NEEDS_VERIFICATION',
  HIGH_CONCERN: 'HIGH_CONCERN',
}

// Human-readable labels for each risk level
export const RISK_LABELS = {
  LOW_CONCERN: 'Low Concern',
  NEEDS_VERIFICATION: 'Needs Verification',
  HIGH_CONCERN: 'High Concern',
}

// Tailwind color classes mapped to each risk level
export const RISK_COLORS = {
  LOW_CONCERN: {
    bg:      'bg-success-50',
    text:    'text-success-600',
    border:  'border-success-500',
    badge:   'bg-success-500 text-white',
  },
  NEEDS_VERIFICATION: {
    bg:      'bg-warning-50',
    text:    'text-warning-600',
    border:  'border-warning-500',
    badge:   'bg-warning-500 text-white',
  },
  HIGH_CONCERN: {
    bg:      'bg-danger-50',
    text:    'text-danger-600',
    border:  'border-danger-500',
    badge:   'bg-danger-500 text-white',
  },
}

// --- Disclaimers ---
export const DISCLAIMER_SCREENING =
  'This is a screening assessment only. This tool cannot confirm whether a medicine is genuine or counterfeit. Always consult a qualified healthcare professional or pharmacist.'

export const DISCLAIMER_GENERAL =
  'MedGuard AI is a screening tool and does not provide medical diagnosis or treatment advice. Always consult a qualified healthcare professional for health decisions.'

export const DISCLAIMER_MEDICINE_INFO =
  'This is general information only and is not a substitute for professional medical advice. Consult a healthcare professional for personalized diagnosis or treatment.'

// --- App Info ---
export const APP_NAME = 'MedGuard AI'
export const APP_TAGLINE = 'AI-Powered Medicine Safety Assistant for Pakistan'
export const HACKATHON_NAME = 'Alibaba Cloud AI Hackathon Pakistan 2026'
