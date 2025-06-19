import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff, Mail, Lock, ChefHat, User, Phone, MapPin } from 'lucide-react';
import '../Login/app.css';


const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [msg, setMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

    const onSubmitSuccess = (jwtToken) => {
    Cookies.set('jwt_token', jwtToken, { expires:30 });
    navigate('/home', { replace: true });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setMsg('');
    
    try {
      // Simulating API call - replace with your actual axios call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (isLogin) {
        // Login logic
        const res = await axios.post("http://localhost:3000/api/login", {
        email,
         password
        }, { withCredentials: true });
        console.log(res.data.token)
        
        if (res.status) {
          setMsg('Login successful! Welcome to Keerthi Foods dashboard...');
          onSubmitSuccess(res.data.token);
        } else {
          setMsg('Invalid credentials. Please check your email and password.');
        }
      } else {
        // Registration logic
        if (password !== confirmPassword) {
          setMsg('Passwords do not match. Please try again.');
          setIsLoading(false);
          return;
        }
        
        if (password.length < 6) {
          setMsg('Password must be at least 6 characters long.');
          setIsLoading(false);
          return;
        }
        console.log(true)
        const res = await axios.post("http://localhost:3000/api/register", {
           fullName,
           email,
           phone,
           address,
           password
         });
         console.log(res)
        
        alert('Registration successful! Please login with your credentials.');
        setTimeout(() => {
          setIsLogin(true);
          setPassword('');
          setConfirmPassword('');
          setMsg('');
        }, 2000);
      }
    } catch (err) {
      setMsg(isLogin ? "Login failed. Please try again." : "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setMsg('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
    setPhone('');
    setAddress('');
  };


  return (
    <div className="login-container">
      
      {/* Food delivery themed background elements */}
      <div className="background-elements">
        {/* Delivery truck animation */}
        <div className="food-icon truck pulse">
          🚚
        </div>
        
        {/* Pizza slice floating */}
        <div className="food-icon pizza bounce">
          🍕
        </div>
        
        {/* Burger floating */}
        <div className="food-icon burger pulse">
          🍔
        </div>
        
        {/* French fries */}
        <div className="food-icon fries bounce">
          🍟
        </div>
        
        {/* Taco */}
        <div className="food-icon taco pulse">
          🌮
        </div>
        
        {/* Delivery box */}
        <div className="food-icon delivery-box bounce">
          📦
        </div>
        
        {/* Hot dog */}
        <div className="food-icon hotdog pulse">
          🌭
        </div>
        
        {/* Ice cream */}
        <div className="food-icon ice-cream bounce">
          🍦
        </div>
        
        {/* Soda */}
        <div className="food-icon soda pulse">
          🥤
        </div>
        
        {/* Donut */}
        <div className="food-icon donut bounce">
          🍩
        </div>
        
        {/* Chicken */}
        <div className="food-icon chicken pulse">
          🍗
        </div>
        
        {/* Location pin for delivery */}
        <div className="food-icon location bounce">
          📍
        </div>
        
        {/* Clock for fast delivery */}
        <div className="food-icon clock pulse">
          ⏰
        </div>
        
        {/* Money/payment */}
        <div className="food-icon payment bounce">
          💳
        </div>
        
        {/* Phone for ordering */}
        <div className="food-icon phone pulse">
          📱
        </div>
        
        {/* Animated gradient blobs for visual appeal */}
        <div className="gradient-blob top-left"></div>
        <div className="gradient-blob bottom-right"></div>
        <div className="gradient-blob center"></div>
      </div>

      {/* Login Card */}
      <div className="login-card-container">
        <div className="login-card">
          
          {/* Header */}
          <div className="header">
            <div className="logo-container">
              <ChefHat className="logo-icon" />
            </div>
            <h1 className="app-title">
              QuickBite
            </h1>
            <p className="app-subtitle">
              {isLogin ? 'Fast food, delivered faster' : 'Join our food community'}
            </p>
            <p className="app-features">
              🚀 30 min delivery • 🍕 Fresh & Hot • 📱 Easy ordering
            </p>
            
            {/* Mode Toggle */}
            <div className="mode-toggle">
              <button
                onClick={() => !isLoading && setIsLogin(true)}
                className={`mode-toggle-btn ${isLogin ? 'active' : 'inactive'}`}
              >
                Sign In
              </button>
              <button
                onClick={() => !isLoading && setIsLogin(false)}
                className={`mode-toggle-btn ${!isLogin ? 'active' : 'inactive'}`}
              >
                Register
              </button>
            </div>
          </div>

          {/* Error/Success Message */}
          {msg && (
            <div className={`message ${msg.includes('successful') ? 'success' : 'error'}`}>
              <p>{msg}</p>
            </div>
          )}

          {/* Form */}
          <div className="form-container">
            
            {/* Registration Fields */}
            {!isLogin && (
              <>
                {/* Full Name Field */}
                <div className="form-field">
                  <label className="form-label">Full Name</label>
                  <div className="input-container">
                    <User className="input-icon"  />
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required={!isLogin}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div className="form-field">
                  <label className="form-label">Phone Number</label>
                  <div className="input-container">
                    <Phone className="input-icon" />
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required={!isLogin}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Address Field */}
                <div className="form-field">
                  <label className="form-label">Address</label>
                  <div className="input-container">
                    <MapPin className="input-icon textarea" />
                    <textarea
                      placeholder="Enter your address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required={!isLogin}
                      rows="3"
                      className="form-input form-textarea"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email Field */}
            <div className="form-field">
              <label className="form-label">Email Address</label>
              <div className="input-container">
                <Mail className="input-icon" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-field">
              <label className="form-label">Password</label>
              <div className="input-container">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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
                  {showPassword ? <EyeOff className="password-toggle-icon" /> : <Eye className="password-toggle-icon" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field (Registration only) */}
            {!isLogin && (
              <div className="form-field">
                <label className="form-label">Confirm Password</label>
                <div className="input-container">
                  <Lock className="input-icon" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required={!isLogin}
                    className="form-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="password-toggle"
                  >
                    {showConfirmPassword ? <EyeOff className="password-toggle-icon" /> : <Eye className="password-toggle-icon" />}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="submit-button"
            >
              <div className="submit-button-overlay"></div>
              <span className="submit-button-content">
                {isLoading ? (
                  <>
                    <div className="loading-spinner"></div>
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </>
                ) : (
                  isLogin ? 'Sign In to Dashboard' : 'Create Account'
                )}
              </span>
            </button>
          </div>

          {/* Footer Links */}
          <div className="footer-links">
            {isLogin ? (
              <>
                <div>
                  <a href="#" className="footer-link">
                    Forgot your password?
                  </a>
                </div>
                <p className="footer-text">
                  Don't have an account?{' '}
                  <button 
                    onClick={toggleMode}
                    className="footer-button"
                  >
                    Register here
                  </button>
                </p>
              </>
            ) : (
              <>
                <p className="footer-text">
                  By registering, you agree to our{' '}
                  <a href="#" className="footer-link">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="footer-link">
                    Privacy Policy
                  </a>
                </p>
                <p className="footer-text">
                  Already have an account?{' '}
                  <button 
                    onClick={toggleMode}
                    className="footer-button"
                  >
                    Sign in here
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;