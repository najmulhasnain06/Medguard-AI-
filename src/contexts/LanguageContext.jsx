import { createContext, useContext, useState, useCallback } from 'react'
import { getTranslation } from '../utils/translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')

  const t = useCallback((key) => getTranslation(language, key), [language])

  const isRTL = language === 'ur'

  const value = {
    language,
    setLanguage,
    t,
    isRTL,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
