import { Link, useLocation } from 'react-router-dom'
import { Shield, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { APP_NAME } from '../../utils/constants'

// Navigation links used in the header
const NAV_LINKS = [
  { to: '/',        label: 'Home'   },
  { to: '/scan',    label: 'Scan'   },
  { to: '/search',  label: 'Search' },
  { to: '/about',   label: 'About'  },
]

export default function Header() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo + app name */}
          <Link to="/" className="flex items-center gap-2 group">
            <Shield className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-bold text-primary-700 group-hover:text-primary-500 transition-colors">
              {APP_NAME}
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-1">
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
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
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
                {link.label}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}
