import { Link, useLocation } from 'react-router-dom'
import { Shield, Menu, X, Globe } from 'lucide-react'
import { useState } from 'react'
import { APP_NAME } from '../../utils/constants'
import { useLanguage } from '../../contexts/LanguageContext'

// Navigation links used in the header (keys for translations)
const NAV_LINKS = [
  { to: '/',        key: 'nav.home'   },
  { to: '/scan',    key: 'nav.scan'   },
  { to: '/search',  key: 'nav.search' },
  { to: '/about',   key: 'nav.about'  },
]

export default function Header() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  function toggleLanguage() {
    setLanguage(language === 'en' ? 'ur' : 'en')
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo + app name */}
          <Link to="/" className="flex items-center gap-2 group">
            <Shield className="w-8 h-8 text-primary-600" aria-hidden="true" />
            <span className="text-xl font-bold text-primary-700 group-hover:text-primary-500 transition-colors">
              {APP_NAME}
            </span>
          </Link>

          {/* Desktop navigation + language toggle */}
          <div className="hidden md:flex items-center gap-1">
            <nav className="flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.to
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                      ${isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-slate-600 hover:bg-gray-100 hover:text-slate-800'
                      }`}
                  >
                    {t(link.key)}
                  </Link>
                )
              })}
            </nav>

            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-gray-100 transition-colors border border-gray-200 ms-2"
              aria-label={language === 'en' ? 'Switch to Urdu' : 'Switch to English'}
            >
              <Globe className="w-4 h-4" aria-hidden="true" />
              <span>{language === 'en' ? 'اردو' : 'English'}</span>
            </button>
          </div>

          {/* Mobile menu toggle + language toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-gray-100 border border-gray-200"
              aria-label={language === 'en' ? 'Switch to Urdu' : 'Switch to English'}
            >
              <Globe className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{language === 'en' ? 'اردو' : 'EN'}</span>
            </button>
            <button
              className="p-2 rounded-lg text-slate-600 hover:bg-gray-100"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation dropdown */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-gray-100 bg-white animate-fade-in">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-6 py-3 text-sm font-medium border-b border-gray-50 transition-colors
                  ${isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:bg-gray-50'
                  }`}
              >
                {t(link.key)}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}
