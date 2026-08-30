import Header from './Header'
import Footer from './Footer'
import { useLanguage } from '../../contexts/LanguageContext'

/**
 * Layout wraps every page with a consistent Header and Footer.
 * Using flexbox so the footer stays at the bottom even on short pages.
 * Adds RTL direction when Urdu is selected.
 */
export default function Layout({ children }) {
  const { isRTL, language } = useLanguage()

  return (
    <div
      className={`min-h-screen flex flex-col bg-gray-50 ${isRTL ? 'font-urdu' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
      lang={language}
    >
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
