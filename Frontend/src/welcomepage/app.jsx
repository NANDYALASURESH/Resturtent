import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, User, Shield, ArrowRight } from 'lucide-react';
import './app.css';

const WelcomePage = () => {

    const navigate = useNavigate();

  const handleNavigation = (path) => {
    // Replace with actual navigation logic
    console.log(`Navigating to: ${path}`);
       navigate(`${path}`, { replace: true });
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        {/* Header Section */}
        <div className="header-section">
          <div className="logo-container">
            <div className="logo-icon">
              <ChefHat />
            </div>
            <div className="logo-text">
              <h1 className="logo-title">QuickBite</h1>
              <p className="logo-subtitle">Food Delivery Platform</p>
            </div>
          </div>
          <div>
            <h2 className="welcome-title">Welcome to QuickBite</h2>
            <p className="welcome-description">
              Choose your access portal to continue with our professional food delivery management system
            </p>
          </div>
        </div>

        {/* Portal Selection Cards */}
        <div className="portal-grid">
          {/* User Portal Card */}
          <div className="portal-card customer">
            <div className="card-content">
              <div className="card-icon customer">
                <User />
              </div>
              
              <div>
                <h3 className="card-title">Customer Portal</h3>
                <p className="card-description">
                  Browse our delicious menu, place orders, and track your food delivery in real-time
                </p>
              </div>

              <div>
                <div className="feature-tags">
                  <span className="feature-tag">Browse Menu</span>
                  <span className="feature-tag">Order Food</span>
                  <span className="feature-tag">Track Orders</span>
                </div>
                
                <button
                  onClick={() => handleNavigation('/login')}
                  className="portal-button customer"
                >
                  <span>Access Customer Portal</span>
                  <ArrowRight className="button-arrow" />
                </button>
              </div>
            </div>
          </div>

          {/* Admin Portal Card */}
          <div className="portal-card admin">
            <div className="card-content">
              <div className="card-icon admin">
                <Shield />
              </div>
              
              <div>
                <h3 className="card-title">Admin Portal</h3>
                <p className="card-description">
                  Manage menu items, process orders, and oversee your restaurant operations efficiently
                </p>
              </div>

              <div>
                <div className="feature-tags">
                  <span className="feature-tag">Manage Menu</span>
                  <span className="feature-tag">Process Orders</span>
                  <span className="feature-tag">Analytics</span>
                </div>
                
                <button
                  onClick={() => handleNavigation('/admin-login')}
                  className="portal-button admin"
                >
                  <span>Access Admin Portal</span>
                  <ArrowRight className="button-arrow" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="footer-section">
          <div className="footer-status">
            <span className="status-item">
              <div className="status-dot"></div>
              <span>System Online</span>
            </span>
            <span>24/7 Support Available</span>
            <span>Secure & Reliable</span>
          </div>
          <p className="footer-copyright">
            © 2024 QuickBite. Professional food delivery management platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;