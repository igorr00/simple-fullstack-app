import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      if (data.role === 'admin') {
        navigate('/homeAdmin');
      } else if (data.role === 'customer') {
        navigate('/homeCustomer');
      } else {
        setError('Unknown user role');
      }

      localStorage.setItem('user', JSON.stringify(data));

    } catch {
      setError('Error connecting to server');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="blob blob-top-right">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad1" x1="50%" y1="25%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ffee00', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#c703ce', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path fill="url(#grad1)" d="M28.7,-38.5C34.6,-35.2,35.1,-23.4,38.9,-12.5C42.6,-1.6,49.6,8.4,50.1,19.2C50.6,30,44.6,41.6,35.2,42C25.8,42.5,12.9,31.7,-1.1,33.3C-15.2,34.8,-30.3,48.7,-45.2,50C-60,51.4,-74.6,40.2,-81.1,25.2C-87.6,10.2,-86.1,-8.7,-75.2,-19C-64.3,-29.2,-44.1,-31,-30,-31.7C-15.9,-32.4,-7.9,-32,1.7,-34.4C11.4,-36.8,22.7,-41.9,28.7,-38.5Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="blob blob-bottom-left">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad2" x1="10%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#e5e7eb', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path fill="url(#grad2)" d="M29.3,-43.4C39.2,-33,49.5,-26.2,52.9,-16.9C56.3,-7.6,52.9,4.2,50.6,18C48.3,31.8,47.1,47.5,38.9,55.3C30.6,63,15.3,62.9,0.7,61.9C-13.9,60.9,-27.7,59.1,-33.5,50.5C-39.3,41.9,-36.9,26.6,-32.8,16.1C-28.7,5.7,-22.8,0.1,-26.1,-14.2C-29.3,-28.5,-41.7,-51.5,-38.9,-64.1C-36.1,-76.8,-18,-79.1,-4.2,-73.3C9.6,-67.5,19.3,-53.7,29.3,-43.4Z" transform="translate(100 100)" />
        </svg>
      </div>
      <div className="login-card">
        <h2 className="gradient-title">Hello</h2>
        <p>Sign in to your account</p>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleLogin(e);
            }}
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </form>
        <p id='forgotpassword'>Forgot your password?</p>
        {error && <p className="login-error">{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
