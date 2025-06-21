import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, User, Shield } from 'lucide-react';
import './app.css'; // use the same login CSS for consistency

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <ChefHat size={32} />
          <span className="logo-text">QuickBite</span>
        </div>
        <h2 className="login-title">Welcome to QuickBite</h2>
        <p className="login-subtitle">Choose your portal to continue</p>

        <div className="login-options">
          {/* User Login Section */}
          <div className="login-option-card">
            <User size={28} />
            <h3>User Login</h3>
            <p>Order your favorite food</p>
            <button className="primary-button" onClick={() => navigate('/login')}>
              Go to User Login
            </button>
          </div>

          {/* Admin Login Section */}
          <div className="login-option-card">
            <Shield size={28} />
            <h3>Admin Login</h3>
            <p>Manage food items & orders</p>
            <button className="primary-button" onClick={() => navigate('/admin-login')}>
              Go to Admin Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
