import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import ExperienceDetail from './pages/ExperienceDetail';
import Checkout from './pages/Checkout';
import Onboarding from './pages/Onboarding';
import MerchantDashboard from './pages/MerchantDashboard';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import Signup from './pages/Signup';

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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
