
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ChefHat, Shield } from 'lucide-react';
import "../Login/app.css"

const RestaurantAdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (isLoginMode) {
        if (email === 'admin@quickbite.com' && password === 'admin123') {
          setMessage('Login successful! Redirecting...');
          // In real app: navigate to admin dashboard
        } else {
          setMessage('Invalid credentials. Please try again.');
        }
      } else {
        // Registration logic
        if (email && password) {
          setMessage('Admin account created successfully!');
          setIsLoginMode(true);
        } else {
          setMessage('Please fill in all fields.');
        }
      }
    } catch (error) {
      setMessage(isLoginMode ? 'Login failed. Please check your connection.' : 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      {/* Background Elements */}
      <div className="admin-login-container">
        <div className="admin-login-card">
          {/* Header Section */}
          <div className="admin-header">
            <div className="admin-logo-wrapper">
              <div className="admin-logo-circle">
                <ChefHat className="admin-logo-icon" />
              </div>
              <Shield className="admin-shield-icon" />
            </div>
            <h1 className="admin-title">QuickBite Admin</h1>
            <p className="admin-subtitle">
              {isLoginMode ? 'Secure Management Portal' : 'Create Admin Account'}
            </p>
            <div className="admin-divider"></div>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`admin-message ${message.includes('successful') ? 'admin-message-success' : 'admin-message-error'}`}>
              <div className="admin-message-content">
                {message}
              </div>
            </div>
          )}

          {/* Login Form */}
          <div className="admin-form">
            <div className="admin-form-group">
              <label className="admin-form-label">
                Administrator Email
              </label>
              <div className="admin-input-wrapper">
                <Mail className="admin-input-icon" />
                <input
                  type="email"
                  placeholder="Enter your admin email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="admin-form-input"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">
                Password
              </label>
              <div className="admin-input-wrapper">
                <Lock className="admin-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="admin-form-input"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="admin-password-toggle"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="admin-toggle-icon" />
                  ) : (
                    <Eye className="admin-toggle-icon" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogin}
              disabled={isLoading || !email || !password}
              className="admin-submit-button"
            >
              <div className="admin-button-background"></div>
              <span className="admin-button-text">
                {isLoading ? (
                  <>
                    <div className="admin-loading-spinner"></div>
                    {isLoginMode ? 'Authenticating...' : 'Creating Account...'}
                  </>
                ) : (
                  <>
                    <Shield className="admin-button-icon" />
                    {isLoginMode ? 'Access Admin Dashboard' : 'Create Admin Account'}
                  </>
                )}
              </span>
            </button>

            <div className="admin-mode-toggle">
              <button
                type="button"
                onClick={() => {
                  setIsLoginMode(!isLoginMode);
                  setMessage('');
                  setEmail('');
                  setPassword('');
                }}
                className="admin-toggle-mode-button"
                disabled={isLoading}
              >
                {isLoginMode ? "Don't have an admin account? Register" : 'Already have an account? Login'}
              </button>
            </div>
          </div>

          {/* Footer Links */}
          <div className="admin-footer">
            <div className="admin-footer-links">
              <a href="#" className="admin-footer-link">
                Forgot Password?
              </a>
              <span className="admin-footer-separator">•</span>
              <a href="#" className="admin-footer-link">
                Need Help?
              </a>
            </div>
            <div className="admin-footer-note">
              <p>Authorized personnel only. All access is monitored.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantAdminLogin;