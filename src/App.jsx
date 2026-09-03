import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { ScanPage } from './pages/ScanPage';
import { AboutPage } from './pages/AboutPage';

export function App() {
    return (
        <LanguageProvider>
            <BrowserRouter>
                <div className="app-container">
                    <Navbar />
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/search" element={<SearchPage />} />
                            <Route path="/scan" element={<ScanPage />} />
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

export default App;
