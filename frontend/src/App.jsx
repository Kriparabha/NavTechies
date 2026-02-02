import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import ExperienceDetail from './pages/ExperienceDetail';
import Checkout from './pages/Checkout';
import Onboarding from './pages/Onboarding';
import MerchantDashboard from './pages/MerchantDashboard';
import Feedback from './pages/Feedback';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience/:id" element={<ExperienceDetail />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/merchant-dashboard" element={<MerchantDashboard />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/feedback/:id" element={<Feedback />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
