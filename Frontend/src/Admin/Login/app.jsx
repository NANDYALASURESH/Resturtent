import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff, Mail, Lock, ChefHat } from 'lucide-react';
import './app.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set('admin_jwt_token', jwtToken, { expires: 30 });
    navigate('/admin/home', { replace: true });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg('');

    try {
      const res = await axios.post("http://localhost:3000/api/admin/login", {
        email,
        password
      }, { withCredentials: true });

      if (res.status) {
        setMsg('Admin login successful!');
        onSubmitSuccess(res.data.token);
      } else {
        setMsg('Invalid admin credentials.');
      }
    } catch (err) {
      setMsg('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card-container">
        <div className="login-card">
          <div className="header">
            <div className="logo-container">
              <ChefHat className="logo-icon" />
            </div>
            <h1 className="app-title">Admin Panel</h1>
            <p className="app-subtitle">Manage orders, users and items</p>
          </div>

          {msg && (
            <div className={`message ${msg.includes('successful') ? 'success' : 'error'}`}>
              <p>{msg}</p>
            </div>
          )}

          <div className="form-container">
            <div className="form-field">
              <label className="form-label">Admin Email</label>
              <div className="input-container">
                <Mail className="input-icon" />
                <input
                  type="email"
                  placeholder="Enter admin email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Password</label>
              <div className="input-container">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? (
                    <EyeOff className="password-toggle-icon" />
                  ) : (
                    <Eye className="password-toggle-icon" />
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="submit-button"
            >
              <div className="submit-button-overlay"></div>
              <span className="submit-button-content">
                {isLoading ? (
                  <>
                    <div className="loading-spinner"></div>
                    Signing In...
                  </>
                ) : (
                  'Login to Admin Dashboard'
                )}
              </span>
            </button>
          </div>

          <div className="footer-links">
            <div>
              <a href="#" className="footer-link">Forgot password?</a>
            </div>
            <p className="footer-text">
              Not an admin?{' '}
              <a href="/login" className="footer-button">Go to user login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
