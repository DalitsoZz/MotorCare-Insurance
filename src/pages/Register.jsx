import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { User, Lock, Eye, EyeOff, ArrowRight, Shield, CheckCircle, AlertCircle, Mail, Phone } from 'lucide-react';

const Register = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
    
    if (showError) {
      setShowError(false);
    }
  };

  const validateField = (field, value) => {
    switch (field) {
      case 'firstName':
        return !value ? 'First name is required' : value.length < 2 ? 'First name must be at least 2 characters' : null;
      case 'lastName':
        return !value ? 'Last name is required' : value.length < 2 ? 'Last name must be at least 2 characters' : null;
      case 'email':
        if (!value) return 'Email is required';
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailPattern.test(value) ? 'Please enter a valid email address' : null;
      case 'phone':
        if (!value) return 'Phone number is required';
        const phonePattern = /^(\+260\s?)?(9\d{2}\s?\d{3}\s?\d{3}|0\d{2}\s?\d{3}\s?\d{3})$/;
        return !phonePattern.test(value.replace(/\s/g, '')) ? 'Please enter a valid Zambian phone number' : null;
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters long';
        if (!/(?=.*[a-z])/.test(value)) return 'Password must contain at least one lowercase letter';
        if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain at least one uppercase letter';
        if (!/(?=.*\d)/.test(value)) return 'Password must contain at least one number';
        return null;
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        return value !== formData.password ? 'Passwords do not match' : null;
      default:
        return null;
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        errors[field] = error;
        isValid = false;
      }
    });

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setErrorMessage('Please correct the errors before continuing');
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store user session
      const userData = {
        id: Date.now(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        name: `${formData.firstName} ${formData.lastName}`,
        registrationTime: new Date().toISOString()
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
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    history.push('/login');
  };

  return (
    <div className="page-container">
      {showSuccess && (
        <div className="notification success">
          <CheckCircle size={20} />
          <span>Registration successful! Redirecting...</span>
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
              <h1>Create Your Account</h1>
              <p>Join MotorCare_Insurance to get started</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <div className="input-with-icon">
                    <User size={16} className="input-icon" />
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`form-input ${fieldErrors.firstName ? 'error' : ''}`}
                      placeholder="Enter your first name"
                      disabled={isLoading}
                    />
                  </div>
                  {fieldErrors.firstName && (
                    <div className="field-error">
                      <AlertCircle size={14} />
                      <span>{fieldErrors.firstName}</span>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <div className="input-with-icon">
                    <User size={16} className="input-icon" />
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={`form-input ${fieldErrors.lastName ? 'error' : ''}`}
                      placeholder="Enter your last name"
                      disabled={isLoading}
                    />
                  </div>
                  {fieldErrors.lastName && (
                    <div className="field-error">
                      <AlertCircle size={14} />
                      <span>{fieldErrors.lastName}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-with-icon">
                  <Mail size={16} className="input-icon" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`form-input ${fieldErrors.email ? 'error' : ''}`}
                    placeholder="Enter your email address"
                    disabled={isLoading}
                  />
                </div>
                {fieldErrors.email && (
                  <div className="field-error">
                    <AlertCircle size={14} />
                    <span>{fieldErrors.email}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <div className="input-with-icon">
                  <Phone size={16} className="input-icon" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`form-input ${fieldErrors.phone ? 'error' : ''}`}
                    placeholder="e.g., +260 955 123 456 or 0955 123 456"
                    disabled={isLoading}
                  />
                </div>
                {fieldErrors.phone && (
                  <div className="field-error">
                    <AlertCircle size={14} />
                    <span>{fieldErrors.phone}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-with-icon">
                  <Lock size={16} className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`form-input ${fieldErrors.password ? 'error' : ''}`}
                    placeholder="Create a strong password"
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
                {fieldErrors.password && (
                  <div className="field-error">
                    <AlertCircle size={14} />
                    <span>{fieldErrors.password}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="input-with-icon">
                  <Lock size={16} className="input-icon" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`form-input ${fieldErrors.confirmPassword ? 'error' : ''}`}
                    placeholder="Confirm your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {fieldErrors.confirmPassword && (
                  <div className="field-error">
                    <AlertCircle size={14} />
                    <span>{fieldErrors.confirmPassword}</span>
                  </div>
                )}
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
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="auth-footer">
              <p>Already have an account?</p>
              <button 
                className="btn btn-secondary" 
                onClick={handleLoginClick}
                disabled={isLoading}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register; 