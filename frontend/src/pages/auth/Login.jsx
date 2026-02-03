import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 1500);
  };

  // Style constants based on image_65d046.png
  const bluePinkGradient = 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)';
  const lightBg = '#f8fafc';

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100vw',
      background: lightBg,
      padding: '20px',
      boxSizing: 'border-box',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div className="animate-enter" style={{
        width: '100%',
        maxWidth: '450px',
        textAlign: 'center'
      }}>
        {/* Visual Identity Icon (Kept for balance) */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{
            width: '70px',
            height: '70px',
            background: bluePinkGradient,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            boxShadow: '0 10px 20px -5px rgba(99, 102, 241, 0.4)'
          }}>
            <Lock size={32} color="white" />
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '1.5rem',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0',
            textAlign: 'left'
          }}>
            {/* Email Input */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: '600', color: '#334155' }}>Email Address</label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: '#f1f5f9',
                padding: '0.8rem 1rem',
                borderRadius: '0.75rem',
                border: '1px solid #e2e8f0'
              }}>
                <Mail size={20} color="#94a3b8" style={{ marginRight: '0.75rem' }} />
                <input
                  required
                  type="email"
                  placeholder="you@example.com"
                  style={{ background: 'transparent', border: 'none', color: '#1e293b', width: '100%', outline: 'none', fontSize: '1rem' }}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <label style={{ fontWeight: '600', color: '#334155' }}>Password</label>
                <Link to="/forgot-password" style={{ fontSize: '0.875rem', color: '#6366f1', fontWeight: '500', textDecoration: 'none' }}>
                  Forgot password?
                </Link>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: '#f1f5f9',
                padding: '0.8rem 1rem',
                borderRadius: '0.75rem',
                border: '1px solid #e2e8f0'
              }}>
                <Lock size={20} color="#94a3b8" style={{ marginRight: '0.75rem' }} />
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  style={{ background: 'transparent', border: 'none', color: '#1e293b', width: '100%', outline: 'none', fontSize: '1rem' }}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              background: bluePinkGradient,
              color: 'white',
              border: 'none',
              borderRadius: '0.75rem',
              fontWeight: '700',
              fontSize: '1.1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 10px 15px -3px rgba(236, 72, 153, 0.3)',
              transition: 'all 0.2s ease'
            }}
          >
            {loading ? 'Signing In...' : 'Login to Continue'}
          </button>

          <p style={{ marginTop: '0.5rem', color: '#64748b', fontSize: '0.95rem' }}>
            Don't have an account? <Link to="/signup" style={{ color: '#ec4899', fontWeight: '700', textDecoration: 'none' }}>Create Account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;