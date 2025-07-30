import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { User, Lock, Eye, EyeOff, ArrowRight, Shield, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react';

const Login = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isFromVehicleDetails, setIsFromVehicleDetails] = useState(false);

  useEffect(() => {
    const pendingLoginAfterVehicle = localStorage.getItem('pendingLoginAfterVehicle');
    if (pendingLoginAfterVehicle === 'true') {
      setIsFromVehicleDetails(true);
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (showError) {
      setShowError(false);
    }
  };

  const validateForm = () => {
    if (!formData.email) {
      setErrorMessage('Email is required');
      return false;
    }
    if (!formData.password) {
      setErrorMessage('Password is required');
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept any valid email/password combination
      if (formData.email && formData.password) {
        // Store user session
        const userData = {
          id: Date.now(),
          email: formData.email,
          name: formData.email.split('@')[0],
          loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('userSession', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');
        
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          // Check if user was redirected from vehicle details
          const pendingLoginAfterVehicle = localStorage.getItem('pendingLoginAfterVehicle');
          if (pendingLoginAfterVehicle === 'true') {
            localStorage.removeItem('pendingLoginAfterVehicle');
            history.push('/driver-details');
          } else {
            history.push('/vehicle-details');
          }
        }, 1000);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setErrorMessage('Invalid email or password. Please try again.');
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterClick = () => {
    history.push('/register');
  };

  return (
    <div className="page-container">
      {showSuccess && (
        <div className="notification success">
          <CheckCircle size={20} />
          <span>Login successful! Redirecting...</span>
        </div>
      )}
      
      {showError && (
        <div className="notification error">
          <AlertCircle size={20} />
          <span>{errorMessage}</span>
        </div>
      )}

      <main className="page-content">
        <div className="container">
          <div className="auth-card">
            <div className="auth-header">
              <div className="auth-icon">
                <Shield size={48} />
              </div>
              <h1>Welcome to MotorCare_Insurance</h1>
              <p>Sign in to your account to continue</p>
              {isFromVehicleDetails && (
                <div className="ai-assistant-message">
                  <MessageCircle size={16} />
                  <span>Oh wait, just one more thing! Please log in to continue with your quote.</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-with-icon">
                  <User size={16} className="input-icon" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="form-input"
                    placeholder="Enter your email address"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-with-icon">
                  <Lock size={16} className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="form-input"
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="auth-footer">
              <p>Don't have an account?</p>
              <button 
                className="btn btn-secondary" 
                onClick={handleRegisterClick}
                disabled={isLoading}
              >
                Create Account
              </button>
            </div>

            <div className="demo-note">
              <div className="demo-badge">
                <span>Demo Mode</span>
              </div>
              <p>For demonstration purposes, you can use any valid email and password combination to sign in.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;