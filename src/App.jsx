import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext.jsx';

import DisclaimerBanner from './components/DisclaimerBanner.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

import HomePage from './pages/HomePage.jsx';
import AnalyzePage from './pages/AnalyzePage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import AboutPage from './pages/AboutPage.jsx';

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="app-container">
          <DisclaimerBanner />
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/analyze" element={<AnalyzePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}
