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
    <div className="login-background">
      {/* Animated Background Elements */}
      <div className="background-overlay">
        <div className="background-blob background-blob-1"></div>
        <div className="background-blob background-blob-2"></div>
        <div className="background-blob background-blob-3"></div>
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            🍽️
          </div>
        ))}
      </div>

      {/* Login Card */}
      <div className="login-card">
        <div className="login-card-inner">
          {/* Header */}
          <div className=" cardss text-center mb-8">
            <div className="header-logo">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <h1 className="header-title">
              Keerthi Foods
            </h1>
            <p className="header-subtitle">
              {isLogin ? 'Authentic flavors, delivered fresh' : 'Join our culinary community'}
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
            <div className={`message ${msg.includes('successful') ? 'success' : 'error'} animate-fade-in`}>
              <p className="text-sm font-medium">{msg}</p>
            </div>
          )}

          {/* Form */}
          <div className="rigister">
            {/* Registration Fields */}
            {!isLogin && (
              <>
                {/* Full Name Field */}
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <div className="input-group">
                    <User className="input-icon" />
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
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <div className="input-group">
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
                <div className="form-group">
                  <label className="form-label">Address</label>
                  <div className="input-group">
                    <MapPin className="input-icon textarea-icon" />
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
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-group">
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
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-group">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input"
                  style={{ paddingRight: '1.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field (Registration only) */}
            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="input-group">
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
                    className="password-toggle focus:outline-none focus:ring-0 border-none bg-transparent"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="submit-btn"
            >
              <div className="submit-btn-overlay"></div>
              <span className="submit-btn-content">
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
          <div className="footer">
            {isLogin ? (
              <div className="space-y-2">
                <div>
                  <a href="#" className="footer-link">
                    Forgot your password?
                  </a>
                </div>
                <p className="footer-text">
                  Don't have an account?{' '}
                  <button 
                    onClick={toggleMode}
                    className="footer-btn"
                  >
                    Register here
                  </button>
                </p>
              </div>
            ) : (
              <div className="space-y-2">
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
                    className="footer-btn"
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;