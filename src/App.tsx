import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaCashRegister, FaHistory, FaGlobe } from 'react-icons/fa';
import { AppProvider } from './context/AppContext';
import { CartProvider } from './context/CartContext';
import POSTerminal from './components/POS/POSTerminal';
import TransactionHistory from './components/POS/TransactionHistory';
import './i18n';
import './styles/App.css';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'zh', name: '中文' },
];

const App: React.FC = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <AppProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <header className="app-header">
              <div className="header-content">
                <h1 className="app-title">{t('app.title')}</h1>
                <p className="app-subtitle">{t('app.subtitle')}</p>
              </div>
              <div className="language-selector">
                <FaGlobe className="globe-icon" />
                <select
                  value={i18n.language}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="language-select"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </header>

            <nav className="app-nav">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                <FaCashRegister />
                <span>{t('nav.pos')}</span>
              </NavLink>
              <NavLink
                to="/transactions"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                <FaHistory />
                <span>{t('nav.transactions')}</span>
              </NavLink>
            </nav>

            <main className="app-main">
              <Routes>
                <Route path="/" element={<POSTerminal />} />
                <Route path="/transactions" element={<TransactionHistory />} />
              </Routes>
            </main>

            <footer className="app-footer">
              <p>&copy; 2024 Smart Card POS System. All rights reserved.</p>
            </footer>
          </div>
        </Router>
      </CartProvider>
    </AppProvider>
  );
};

export default App;
