import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import ScanMedicinePage from './pages/ScanMedicinePage'
import MedicineSearchPage from './pages/MedicineSearchPage'
import AnalysisPage from './pages/AnalysisPage'
import RiskResultPage from './pages/RiskResultPage'
import MedicineInfoPage from './pages/MedicineInfoPage'
import AboutPage from './pages/AboutPage'

/**
 * App component -- sets up all routes inside the shared Layout.
 *
 * Route map:
 *   /            -> Home
 *   /scan        -> Upload medicine photo
 *   /search      -> Search medicine by name
 *   /analysis    -> AI analysis loading screen
 *   /result      -> Risk assessment result
 *   /medicine/:id -> Medicine information page
 *   /about       -> About & safety info
 */
export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/"          element={<HomePage />} />
        <Route path="/scan"      element={<ScanMedicinePage />} />
        <Route path="/search"    element={<MedicineSearchPage />} />
        <Route path="/analysis"  element={<AnalysisPage />} />
        <Route path="/result"    element={<RiskResultPage />} />
        <Route path="/medicine/:identifier" element={<MedicineInfoPage />} />
        <Route path="/about"     element={<AboutPage />} />
      </Routes>
    </Layout>
  )
}
