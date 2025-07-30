import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { User, ArrowLeft, ArrowRight, Calendar, Award, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { updateStepProgress, QUOTE_STEPS } from '../utils/progressTracker';

const DriverDetails = () => {
  const history = useHistory();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    licenseNumber: '',
    licenseType: 'full', // Default to full license
    licenseIssueDate: '',
    licenseExpiryDate: '',
    yearsOfExperience: '',
    claimsHistory: '',
    convictions: '',
    occupation: 'employed', // Default to employed
    address: ''
  });

  // Load user email from session if available
  useEffect(() => {
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      try {
        const userData = JSON.parse(userSession);
        if (userData.email) {
          setFormData(prev => ({
            ...prev,
            email: userData.email
          }));
        }
      } catch (error) {
        console.log('Could not parse user session');
      }
    }
  }, []);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const minAge = 18;
  const maxAge = 80;
  const minBirthYear = currentYear - maxAge;
  const maxBirthYear = currentYear - minAge;
  const minLicenseYear = 1990;
  const maxLicenseYear = currentYear + 1;

  const licenseTypes = [
    { value: 'learner', label: 'Learner License' },
    { value: 'provisional', label: 'Provisional License' },
    { value: 'full', label: 'Full License' },
    { value: 'professional', label: 'Professional License' }
  ];

  const occupationTypes = [
    { value: 'employed', label: 'Employed' },
    { value: 'self_employed', label: 'Self Employed' },
    { value: 'student', label: 'Student' },
    { value: 'retired', label: 'Retired' },
    { value: 'unemployed', label: 'Unemployed' },
    { value: 'business_owner', label: 'Business Owner' },
    { value: 'government_employee', label: 'Government Employee' },
    { value: 'healthcare_worker', label: 'Healthcare Worker' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'engineer', label: 'Engineer' },
    { value: 'accountant', label: 'Accountant' },
    { value: 'lawyer', label: 'Lawyer' },
    { value: 'sales_representative', label: 'Sales Representative' },
    { value: 'driver', label: 'Driver' },
    { value: 'mechanic', label: 'Mechanic' },
    { value: 'farmer', label: 'Farmer' },
    { value: 'other', label: 'Other' }
  ];

  const validateDateOfBirth = (date) => {
    if (!date) return null;
    
    const birthDate = new Date(date);
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    
    const actualAge = monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate()) 
      ? age - 1 
      : age;
    
    if (actualAge < minAge) {
      return `Driver must be at least ${minAge} years old`;
    }
    if (actualAge > maxAge) {
      return `Driver age cannot exceed ${maxAge} years`;
    }
    if (birthDate > currentDate) {
      return 'Date of birth cannot be in the future';
    }
    return null;
  };

  const validateLicenseIssueDate = (date) => {
    if (!date) return null;
    
    const issueDate = new Date(date);
    const minDate = new Date(minLicenseYear, 0, 1);
    const maxDate = new Date(maxLicenseYear, 11, 31);
    
    if (issueDate < minDate) {
      return `License issue date cannot be earlier than ${minLicenseYear}`;
    }
    if (issueDate > maxDate) {
      return `License issue date cannot be later than ${maxLicenseYear}`;
    }
    if (issueDate > currentDate) {
      return 'License issue date cannot be in the future';
    }
    return null;
  };

  const validateLicenseExpiryDate = (date) => {
    if (!date) return null;
    
    const expiryDate = new Date(date);
    const minDate = new Date(minLicenseYear, 0, 1);
    const maxDate = new Date(maxLicenseYear + 10, 11, 31);
    
    if (expiryDate < minDate) {
      return `License expiry date cannot be earlier than ${minLicenseYear}`;
    }
    if (expiryDate > maxDate) {
      return `License expiry date cannot be later than ${maxLicenseYear + 10}`;
    }
    return null;
  };

  const validateYearsOfExperience = (years) => {
    if (!years) return null;
    
    const yearsNum = parseInt(years);
    if (isNaN(yearsNum)) {
      return 'Please enter a valid number';
    }
    if (yearsNum < 0) {
      return 'Years of experience cannot be negative';
    }
    if (yearsNum > 50) {
      return 'Years of experience cannot exceed 50';
    }
    
    if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth);
      const age = currentDate.getFullYear() - birthDate.getFullYear();
      const maxPossibleExperience = Math.max(0, age - 16);
      
      if (yearsNum > maxPossibleExperience) {
        return `Years of experience cannot exceed ${maxPossibleExperience} for your age`;
      }
    }
    
    return null;
  };

  const validateEmail = (email) => {
    if (!email) return 'Email is required';
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return 'Please enter a valid email address';
    }
    return null;
  };

  const validatePhone = (phone) => {
    if (!phone) return 'Phone number is required';
    
    const phonePattern = /^(\+260\s?)?(9\d{2}\s?\d{3}\s?\d{3}|0\d{2}\s?\d{3}\s?\d{3})$/;
    if (!phonePattern.test(phone.replace(/\s/g, ''))) {
      return 'Please enter a valid Zambian phone number';
    }
    return null;
  };

  const validateField = (field, value) => {
    switch (field) {
      case 'dateOfBirth':
        return validateDateOfBirth(value);
      case 'licenseIssueDate':
        return validateLicenseIssueDate(value);
      case 'licenseExpiryDate':
        return validateLicenseExpiryDate(value);
      case 'yearsOfExperience':
        return validateYearsOfExperience(value);
      case 'email':
        return validateEmail(value);
      case 'phone':
        return validatePhone(value);
      case 'firstName':
        return !value ? 'First name is required' : null;
      case 'lastName':
        return !value ? 'Last name is required' : null;
      case 'licenseNumber':
        return !value ? 'License number is required' : null;
      case 'licenseType':
        return !value ? 'License type is required' : null;
      default:
        return null;
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    const error = validateField(field, value);
    setFieldErrors(prev => ({
      ...prev,
      [field]: error
    }));

    if (field === 'dateOfBirth' && formData.yearsOfExperience) {
      const experienceError = validateYearsOfExperience(formData.yearsOfExperience);
      setFieldErrors(prev => ({
        ...prev,
        yearsOfExperience: experienceError
      }));
    }

    // Update global progress after a short delay to avoid too frequent updates
    setTimeout(() => {
      const progress = getProgressPercentage();
      updateStepProgress(QUOTE_STEPS.DRIVER_DETAILS, progress);
    }, 300);
  };

  const handleSubmit = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'licenseNumber', 'licenseType'];
    const newErrors = {};
    const missingFields = [];
    
    requiredFields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        if (!formData[field]) {
          missingFields.push(field);
        }
      }
    });

    const optionalFields = ['dateOfBirth', 'licenseIssueDate', 'licenseExpiryDate', 'yearsOfExperience'];
    optionalFields.forEach(field => {
      if (formData[field]) {
        const error = validateField(field, formData[field]);
        if (error) {
          newErrors[field] = error;
        }
      }
    });

    setFieldErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      if (missingFields.length > 0) {
        const fieldLabels = {
          firstName: 'First Name',
          lastName: 'Last Name',
          email: 'Email',
          phone: 'Phone Number',
          licenseNumber: 'License Number',
          licenseType: 'License Type'
        };
        const missingFieldNames = missingFields.map(field => fieldLabels[field]).join(', ');
        setErrorMessage(`Please fill in the following required fields: ${missingFieldNames}`);
      } else {
        setErrorMessage('Please correct the errors before continuing');
      }
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    localStorage.setItem('driverDetails', JSON.stringify(formData));
    
    // Mark driver details as 100% complete
    updateStepProgress(QUOTE_STEPS.DRIVER_DETAILS, 100);
    
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      history.push('/coverage-options');
    }, 1000);
  };





  return (
    <div className="page-container">
      {showSuccess && (
        <div className="notification success">
          <CheckCircle size={20} />
          <span>Driver details saved successfully!</span>
        </div>
      )}
      
      {showError && (
        <div className="notification error">
          <AlertCircle size={20} />
          <span>{errorMessage}</span>
        </div>
      )}

      <header className="page-header">
        <div className="header-content">
          <button className="btn btn-icon" onClick={() => history.goBack()}>
            <ArrowLeft size={20} />
          </button>
          <h1>Driver Details</h1>
          <div className="header-icon">
            <User size={24} />
          </div>
        </div>
      </header>



      <main className="page-content">
        <div className="container">
          <div className="form-card">
            <div className="card-header">
              <h2>Driver Information</h2>
              <p>Please provide accurate information about the primary driver for an accurate quote</p>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  First Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={`form-input ${fieldErrors.firstName ? 'error' : ''}`}
                  placeholder="Enter first name"
                />
                {fieldErrors.firstName && (
                  <div className="field-error">
                    <AlertCircle size={14} />
                    <span>{fieldErrors.firstName}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Last Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`form-input ${fieldErrors.lastName ? 'error' : ''}`}
                  placeholder="Enter last name"
                />
                {fieldErrors.lastName && (
                  <div className="field-error">
                    <AlertCircle size={14} />
                    <span>{fieldErrors.lastName}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`form-input ${fieldErrors.email ? 'error' : ''}`}
                  placeholder="Enter email address"
                />
                {fieldErrors.email && (
                  <div className="field-error">
                    <AlertCircle size={14} />
                    <span>{fieldErrors.email}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Phone Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`form-input ${fieldErrors.phone ? 'error' : ''}`}
                  placeholder="e.g., +260 955 123 456 or 0955 123 456"
                />
                {fieldErrors.phone && (
                  <div className="field-error">
                    <AlertCircle size={14} />
                    <span>{fieldErrors.phone}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <div className="input-with-icon">
                  <Calendar size={16} className="input-icon" />
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className={`form-input ${fieldErrors.dateOfBirth ? 'error' : ''}`}
                    max={`${maxBirthYear}-12-31`}
                    min={`${minBirthYear}-01-01`}
                  />
                </div>
                {fieldErrors.dateOfBirth && (
                  <div className="field-error">
                    <AlertCircle size={14} />
                    <span>{fieldErrors.dateOfBirth}</span>
                  </div>
                )}
                <div className="field-hint">
                  <Clock size={12} />
                  <span>Minimum age: {minAge} years, Maximum age: {maxAge} years</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Occupation</label>
                <div className="select-wrapper">
                  <select
                    value={formData.occupation}
                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                    className="form-select"
                  >
                    {occupationTypes.map((occupation) => (
                      <option key={occupation.value} value={occupation.value}>
                        {occupation.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  License Number <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={formData.licenseNumber}
                  onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                  className={`form-input ${fieldErrors.licenseNumber ? 'error' : ''}`}
                  placeholder="Enter license number"
                />
                {fieldErrors.licenseNumber && (
                  <div className="field-error">
                    <AlertCircle size={14} />
                    <span>{fieldErrors.licenseNumber}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  License Type <span className="required">*</span>
                </label>
                <div className="select-wrapper">
                  <select
                    value={formData.licenseType}
                    onChange={(e) => handleInputChange('licenseType', e.target.value)}
                    className={`form-select ${fieldErrors.licenseType ? 'error' : ''}`}
                  >
                    {licenseTypes.map((license) => (
                      <option key={license.value} value={license.value}>
                        {license.label}
                      </option>
                    ))}
                  </select>
                </div>
                {fieldErrors.licenseType && (
                  <div className="field-error">
                    <AlertCircle size={14} />
                    <span>{fieldErrors.licenseType}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">License Issue Date</label>
                <div className="input-with-icon">
                  <Calendar size={16} className="input-icon" />
                  <input
                    type="date"
                    value={formData.licenseIssueDate}
                    onChange={(e) => handleInputChange('licenseIssueDate', e.target.value)}
                    className={`form-input ${fieldErrors.licenseIssueDate ? 'error' : ''}`}
                    min={`${minLicenseYear}-01-01`}
                    max={`${maxLicenseYear}-12-31`}
                  />
                </div>
                {fieldErrors.licenseIssueDate && (
                  <div className="field-error">
                    <AlertCircle size={14} />
                    <span>{fieldErrors.licenseIssueDate}</span>
                  </div>
                )}
                <div className="field-hint">
                  <Clock size={12} />
                  <span>Acceptable range: {minLicenseYear} - {maxLicenseYear}</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">License Expiry Date</label>
                <div className="input-with-icon">
                  <Calendar size={16} className="input-icon" />
                  <input
                    type="date"
                    value={formData.licenseExpiryDate}
                    onChange={(e) => handleInputChange('licenseExpiryDate', e.target.value)}
                    className={`form-input ${fieldErrors.licenseExpiryDate ? 'error' : ''}`}
                    min={`${minLicenseYear}-01-01`}
                    max={`${maxLicenseYear + 10}-12-31`}
                  />
                </div>
                {fieldErrors.licenseExpiryDate && (
                  <div className="field-error">
                    <AlertCircle size={14} />
                    <span>{fieldErrors.licenseExpiryDate}</span>
                  </div>
                )}
                <div className="field-hint">
                  <Clock size={12} />
                  <span>Acceptable range: {minLicenseYear} - {maxLicenseYear + 10}</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Years of Driving Experience</label>
                <input
                  type="number"
                  value={formData.yearsOfExperience}
                  onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
                  className={`form-input ${fieldErrors.yearsOfExperience ? 'error' : ''}`}
                  placeholder="Enter years of experience"
                  min="0"
                  max="50"
                />
                {fieldErrors.yearsOfExperience && (
                  <div className="field-error">
                    <AlertCircle size={14} />
                    <span>{fieldErrors.yearsOfExperience}</span>
                  </div>
                )}
                <div className="field-hint">
                  <Clock size={12} />
                  <span>Maximum: 50 years</span>
                </div>
              </div>

              <div className="form-group full-width">
                <label className="form-label">Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="form-textarea"
                  placeholder="Enter your full address"
                  rows="3"
                />
              </div>

              <div className="form-group full-width">
                <label className="form-label">Claims History</label>
                <textarea
                  value={formData.claimsHistory}
                  onChange={(e) => handleInputChange('claimsHistory', e.target.value)}
                  className="form-textarea"
                  placeholder="Describe any previous insurance claims (if any)"
                  rows="3"
                />
              </div>

              <div className="form-group full-width">
                <label className="form-label">Traffic Convictions</label>
                <textarea
                  value={formData.convictions}
                  onChange={(e) => handleInputChange('convictions', e.target.value)}
                  className="form-textarea"
                  placeholder="Describe any traffic convictions or violations (if any)"
                  rows="3"
                />
              </div>
            </div>

            <div className="form-actions">
              <button className="btn btn-secondary" onClick={() => history.goBack()}>
                <ArrowLeft size={16} />
                Back
              </button>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Continue
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DriverDetails; 