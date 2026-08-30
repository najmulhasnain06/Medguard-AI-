import Header from './Header'
import Footer from './Footer'

/**
 * Layout wraps every page with a consistent Header and Footer.
 * Using flexbox so the footer stays at the bottom even on short pages.
 */
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
