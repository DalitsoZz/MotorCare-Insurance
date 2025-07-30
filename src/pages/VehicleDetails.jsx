import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Car, ArrowLeft, ArrowRight, Info, CheckCircle, AlertCircle, Shield, FileText, Calendar, Clock } from 'lucide-react';
import { updateStepProgress, QUOTE_STEPS } from '../utils/progressTracker';

const VehicleDetails = () => {
  const history = useHistory();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [fieldErrors, setFieldErrors] = useState({});
  
  const currentYear = new Date().getFullYear();
  
  const [formData, setFormData] = useState({
    vehicleType: '',
    make: '',
    model: '',
    year: currentYear.toString(), // Default to current year
    engineCapacity: '',
    fuelType: '',
    registrationNumber: '',
    estimatedValue: '',
    usage: 'personal', // Default to personal use
    additionalInfo: '',
    registrationDate: ''
  });
  const minYear = 1950;
  const maxYear = currentYear + 1;
  const minRegistrationYear = 1990;
  const maxRegistrationYear = currentYear + 1;
  
  // Popular vehicle makes and models
  const popularMakes = [
    { value: 'toyota', label: 'Toyota' },
    { value: 'honda', label: 'Honda' },
    { value: 'ford', label: 'Ford' },
    { value: 'nissan', label: 'Nissan' },
    { value: 'mazda', label: 'Mazda' },
    { value: 'mitsubishi', label: 'Mitsubishi' },
    { value: 'suzuki', label: 'Suzuki' },
    { value: 'hyundai', label: 'Hyundai' },
    { value: 'kia', label: 'Kia' },
    { value: 'volkswagen', label: 'Volkswagen' },
    { value: 'bmw', label: 'BMW' },
    { value: 'mercedes', label: 'Mercedes-Benz' },
    { value: 'audi', label: 'Audi' },
    { value: 'other', label: 'Other' }
  ];

  const vehicleModels = {
    toyota: [
      { value: 'corolla', label: 'Corolla' },
      { value: 'camry', label: 'Camry' },
      { value: 'hilux', label: 'Hilux' },
      { value: 'land_cruiser', label: 'Land Cruiser' },
      { value: 'prado', label: 'Prado' },
      { value: 'rav4', label: 'RAV4' },
      { value: 'fortuner', label: 'Fortuner' },
      { value: 'other', label: 'Other' }
    ],
    honda: [
      { value: 'civic', label: 'Civic' },
      { value: 'accord', label: 'Accord' },
      { value: 'crv', label: 'CR-V' },
      { value: 'pilot', label: 'Pilot' },
      { value: 'fit', label: 'Fit' },
      { value: 'other', label: 'Other' }
    ],
    ford: [
      { value: 'focus', label: 'Focus' },
      { value: 'fiesta', label: 'Fiesta' },
      { value: 'ranger', label: 'Ranger' },
      { value: 'everest', label: 'Everest' },
      { value: 'escape', label: 'Escape' },
      { value: 'other', label: 'Other' }
    ],
    nissan: [
      { value: 'sentra', label: 'Sentra' },
      { value: 'altima', label: 'Altima' },
      { value: 'x_trail', label: 'X-Trail' },
      { value: 'navara', label: 'Navara' },
      { value: 'patrol', label: 'Patrol' },
      { value: 'other', label: 'Other' }
    ],
    mazda: [
      { value: '3', label: 'Mazda 3' },
      { value: '6', label: 'Mazda 6' },
      { value: 'cx5', label: 'CX-5' },
      { value: 'cx30', label: 'CX-30' },
      { value: 'bt50', label: 'BT-50' },
      { value: 'other', label: 'Other' }
    ],
    mitsubishi: [
      { value: 'lancer', label: 'Lancer' },
      { value: 'asx', label: 'ASX' },
      { value: 'outlander', label: 'Outlander' },
      { value: 'pajero', label: 'Pajero' },
      { value: 'triton', label: 'Triton' },
      { value: 'other', label: 'Other' }
    ],
    suzuki: [
      { value: 'swift', label: 'Swift' },
      { value: 'vitara', label: 'Vitara' },
      { value: 'sx4', label: 'SX4' },
      { value: 'grand_vitara', label: 'Grand Vitara' },
      { value: 'other', label: 'Other' }
    ],
    hyundai: [
      { value: 'i10', label: 'i10' },
      { value: 'i20', label: 'i20' },
      { value: 'i30', label: 'i30' },
      { value: 'tucson', label: 'Tucson' },
      { value: 'santa_fe', label: 'Santa Fe' },
      { value: 'other', label: 'Other' }
    ],
    kia: [
      { value: 'picanto', label: 'Picanto' },
      { value: 'rio', label: 'Rio' },
      { value: 'cerato', label: 'Cerato' },
      { value: 'sportage', label: 'Sportage' },
      { value: 'sorento', label: 'Sorento' },
      { value: 'other', label: 'Other' }
    ],
    volkswagen: [
      { value: 'golf', label: 'Golf' },
      { value: 'polo', label: 'Polo' },
      { value: 'passat', label: 'Passat' },
      { value: 'tiguan', label: 'Tiguan' },
      { value: 'touareg', label: 'Touareg' },
      { value: 'other', label: 'Other' }
    ],
    bmw: [
      { value: '1_series', label: '1 Series' },
      { value: '3_series', label: '3 Series' },
      { value: '5_series', label: '5 Series' },
      { value: 'x1', label: 'X1' },
      { value: 'x3', label: 'X3' },
      { value: 'x5', label: 'X5' },
      { value: 'other', label: 'Other' }
    ],
    mercedes: [
      { value: 'a_class', label: 'A-Class' },
      { value: 'c_class', label: 'C-Class' },
      { value: 'e_class', label: 'E-Class' },
      { value: 'gla', label: 'GLA' },
      { value: 'glc', label: 'GLC' },
      { value: 'gle', label: 'GLE' },
      { value: 'other', label: 'Other' }
    ],
    audi: [
      { value: 'a1', label: 'A1' },
      { value: 'a3', label: 'A3' },
      { value: 'a4', label: 'A4' },
      { value: 'a6', label: 'A6' },
      { value: 'q3', label: 'Q3' },
      { value: 'q5', label: 'Q5' },
      { value: 'other', label: 'Other' }
    ]
  };

  const vehicleTypes = [
    { value: 'private_car', label: 'Private Car (Class A)', icon: '🚗' },
    { value: 'commercial_vehicle', label: 'Commercial Vehicle (Class B)', icon: '🚐' },
    { value: 'motorcycle', label: 'Motorcycle (Class C)', icon: '🏍️' },
    { value: 'truck', label: 'Truck (Class D)', icon: '🚛' },
    { value: 'bus', label: 'Bus (Class E)', icon: '🚌' },
    { value: 'trailer', label: 'Trailer (Class F)', icon: '🚛' },
    { value: 'tractor', label: 'Tractor (Class G)', icon: '🚜' },
    { value: 'special_purpose', label: 'Special Purpose Vehicle (Class H)', icon: '🚑' }
  ];

  const fuelTypes = [
    { value: 'petrol', label: 'Petrol' },
    { value: 'diesel', label: 'Diesel' },
    { value: 'electric', label: 'Electric' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'lpg', label: 'LPG' }
  ];

  const usageTypes = [
    { value: 'personal', label: 'Personal Use' },
    { value: 'business', label: 'Business Use' },
    { value: 'commercial', label: 'Commercial Transport' },
    { value: 'public_transport', label: 'Public Transport' },
    { value: 'agricultural', label: 'Agricultural' }
  ];

  const validateYear = (year) => {
    const yearNum = parseInt(year);
    if (!year || isNaN(yearNum)) {
      return 'Year is required';
    }
    if (yearNum < minYear) {
      return `Year cannot be earlier than ${minYear}`;
    }
    if (yearNum > maxYear) {
      return `Year cannot be later than ${maxYear}`;
    }
    return null;
  };

  const validateRegistrationDate = (date) => {
    if (!date) return null;
    
    const selectedDate = new Date(date);
    const currentDate = new Date();
    const minDate = new Date(minRegistrationYear, 0, 1);
    const maxDate = new Date(maxRegistrationYear, 11, 31);
    
    if (selectedDate < minDate) {
      return `Registration date cannot be earlier than ${minRegistrationYear}`;
    }
    if (selectedDate > maxDate) {
      return `Registration date cannot be later than ${maxRegistrationYear}`;
    }
    if (selectedDate > currentDate) {
      return 'Registration date cannot be in the future';
    }
    return null;
  };

  const validateRegistrationNumber = (regNumber) => {
    if (!regNumber) {
      return 'Registration number is required';
    }
    
    // Remove spaces and convert to uppercase for validation
    const cleanRegNumber = regNumber.replace(/\s/g, '').toUpperCase();
    
    // More flexible pattern that accepts various Zambian registration formats
    // Allows: 2-4 letters + 2-4 numbers + optional 1-3 letters
    const regPattern = /^[A-Z]{2,4}\d{2,4}[A-Z]{0,3}$/;
    
    if (!regPattern.test(cleanRegNumber)) {
      return 'Please enter a valid registration number (e.g., ABC123, ABC123ZM, ABC1234)';
    }
    
    // Additional check: must be at least 6 characters total
    if (cleanRegNumber.length < 6) {
      return 'Registration number must be at least 6 characters';
    }
    
    return null;
  };

  const validateField = (field, value) => {
    switch (field) {
      case 'year':
        return validateYear(value);
      case 'registrationDate':
        return validateRegistrationDate(value);
      case 'registrationNumber':
        return validateRegistrationNumber(value);
      case 'vehicleType':
        return !value ? 'Vehicle type is required' : null;
      case 'make':
        return !value ? 'Vehicle make is required' : null;
      case 'model':
        return !value ? 'Vehicle model is required' : null;
      default:
        return null;
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Reset model when make changes
    if (field === 'make') {
      setFormData(prev => ({
        ...prev,
        model: ''
      }));
    }

    const error = validateField(field, value);
    setFieldErrors(prev => ({
      ...prev,
      [field]: error
    }));

    // Update global progress after a short delay to avoid too frequent updates
    setTimeout(() => {
      const progress = getProgressPercentage();
      updateStepProgress(QUOTE_STEPS.VEHICLE_DETAILS, progress);
    }, 300);
  };

  const handleSubmit = () => {
    const requiredFields = ['vehicleType', 'make', 'model', 'year', 'registrationNumber'];
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

    if (formData.registrationDate) {
      const dateError = validateField('registrationDate', formData.registrationDate);
      if (dateError) {
        newErrors.registrationDate = dateError;
      }
    }

    setFieldErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      if (missingFields.length > 0) {
        const fieldLabels = {
          vehicleType: 'Vehicle Type',
          make: 'Make',
          model: 'Model',
          year: 'Year',
          registrationNumber: 'Registration Number'
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

    localStorage.setItem('vehicleDetails', JSON.stringify(formData));
    
    // Mark vehicle details as 100% complete
    updateStepProgress(QUOTE_STEPS.VEHICLE_DETAILS, 100);
    
    // Since this is now a protected route, user is already authenticated
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      history.push('/driver-details');
    }, 1000);
  };

  const getVehicleTypeInfo = (type) => {
    const info = {
      private_car: 'Personal vehicles for private use, typically seating up to 8 passengers',
      commercial_vehicle: 'Vehicles used for commercial purposes, including delivery vans and pickup trucks',
      motorcycle: 'Two or three-wheeled motor vehicles',
      truck: 'Heavy goods vehicles for transporting cargo',
      bus: 'Passenger vehicles designed to carry multiple passengers',
      trailer: 'Non-motorized vehicles towed by motor vehicles',
      tractor: 'Agricultural vehicles used for farming purposes',
      special_purpose: 'Vehicles designed for specific purposes (ambulances, fire trucks, etc.)'
    };
    return info[type] || '';
  };





  return (
    <div className="page-container">
      {showSuccess && (
        <div className="notification success">
          <CheckCircle size={20} />
          <span>Vehicle details saved successfully!</span>
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
          <h1>Vehicle Details</h1>
          <div className="header-icon">
            <Car size={24} />
          </div>
        </div>
      </header>



      <main className="page-content">
        <div className="container">
          <div className="form-card">
            <div className="card-header">
              <h2>Vehicle Information</h2>
              <p>Please provide accurate information about your vehicle for an accurate quote</p>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  Vehicle Type <span className="required">*</span>
                </label>
                <div className="select-wrapper">
                  <select
                    value={formData.vehicleType}
                    onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                    className={`form-select ${fieldErrors.vehicleType ? 'error' : ''}`}
                  >
                    <option value="">Select vehicle type</option>
                    {vehicleTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.icon} {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                {fieldErrors.vehicleType && (
                  <div className="field-error">
                    <AlertCircle size={14} />
                    <span>{fieldErrors.vehicleType}</span>
                  </div>
                )}
                {formData.vehicleType && !fieldErrors.vehicleType && (
                  <div className="info-box">
                    <Info size={16} />
                    <span>{getVehicleTypeInfo(formData.vehicleType)}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Vehicle Make <span className="required">*</span>
                </label>
                <div className="select-wrapper">
                  <select
                    value={formData.make}
                    onChange={(e) => handleInputChange('make', e.target.value)}
                    className={`form-select ${fieldErrors.make ? 'error' : ''}`}
                  >
                    <option value="">Select vehicle make</option>
                    {popularMakes.map((make) => (
                      <option key={make.value} value={make.value}>
                        {make.label}
                      </option>
                    ))}
                  </select>
                </div>
                {fieldErrors.make && (
                  <div className="field-error">
                    <AlertCircle size={14} />
                    <span>{fieldErrors.make}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Vehicle Model <span className="required">*</span>
                </label>
                <div className="select-wrapper">
                  <select
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    className={`form-select ${fieldErrors.model ? 'error' : ''}`}
                    disabled={!formData.make || formData.make === 'other'}
                  >
                    <option value="">
                      {!formData.make ? 'Select vehicle make first' : 
                       formData.make === 'other' ? 'Enter model manually' : 'Select vehicle model'}
                    </option>
                    {formData.make && formData.make !== 'other' && vehicleModels[formData.make]?.map((model) => (
                      <option key={model.value} value={model.value}>
                        {model.label}
                      </option>
                    ))}
                  </select>
                </div>
                {formData.make === 'other' && (
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    className={`form-input ${fieldErrors.model ? 'error' : ''}`}
                    placeholder="Enter vehicle model"
                  />
                )}
                {fieldErrors.model && (
                  <div className="field-error">
                    <AlertCircle size={14} />
                    <span>{fieldErrors.model}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Year of Manufacture <span className="required">*</span>
                </label>
                <div className="input-with-icon">
                  <Calendar size={16} className="input-icon" />
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                    className={`form-input ${fieldErrors.year ? 'error' : ''}`}
                    placeholder={`e.g., ${currentYear}`}
                    min={minYear}
                    max={maxYear}
                  />
                </div>
                {fieldErrors.year && (
                  <div className="field-error">
                    <AlertCircle size={14} />
                    <span>{fieldErrors.year}</span>
                  </div>
                )}
                <div className="field-hint">
                  <Clock size={12} />
                  <span>Acceptable range: {minYear} - {maxYear}</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Engine Capacity (cc)</label>
                <input
                  type="number"
                  value={formData.engineCapacity}
                  onChange={(e) => handleInputChange('engineCapacity', e.target.value)}
                  className="form-input"
                  placeholder="e.g., 1500"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Fuel Type</label>
                <div className="select-wrapper">
                  <select
                    value={formData.fuelType}
                    onChange={(e) => handleInputChange('fuelType', e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select fuel type</option>
                    {fuelTypes.map((fuel) => (
                      <option key={fuel.value} value={fuel.value}>
                        {fuel.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Registration Number <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={formData.registrationNumber}
                  onChange={(e) => handleInputChange('registrationNumber', e.target.value.toUpperCase())}
                  className={`form-input ${fieldErrors.registrationNumber ? 'error' : ''}`}
                  placeholder="e.g., ABC 123 ZM"
                />
                {fieldErrors.registrationNumber && (
                  <div className="field-error">
                    <AlertCircle size={14} />
                    <span>{fieldErrors.registrationNumber}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Registration Date</label>
                <div className="input-with-icon">
                  <Calendar size={16} className="input-icon" />
                  <input
                    type="date"
                    value={formData.registrationDate}
                    onChange={(e) => handleInputChange('registrationDate', e.target.value)}
                    className={`form-input ${fieldErrors.registrationDate ? 'error' : ''}`}
                    min={`${minRegistrationYear}-01-01`}
                    max={`${maxRegistrationYear}-12-31`}
                  />
                </div>
                {fieldErrors.registrationDate && (
                  <div className="field-error">
                    <AlertCircle size={14} />
                    <span>{fieldErrors.registrationDate}</span>
                  </div>
                )}
                <div className="field-hint">
                  <Clock size={12} />
                  <span>Acceptable range: {minRegistrationYear} - {maxRegistrationYear}</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Estimated Value (ZMW)</label>
                <input
                  type="number"
                  value={formData.estimatedValue}
                  onChange={(e) => handleInputChange('estimatedValue', e.target.value)}
                  className="form-input"
                  placeholder="e.g., 150000"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Primary Usage</label>
                <div className="select-wrapper">
                  <select
                    value={formData.usage}
                    onChange={(e) => handleInputChange('usage', e.target.value)}
                    className="form-select"
                  >
                    {usageTypes.map((usage) => (
                      <option key={usage.value} value={usage.value}>
                        {usage.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <label className="form-label">Additional Information</label>
                <textarea
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  className="form-textarea"
                  placeholder="Any additional details about your vehicle..."
                  rows="4"
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

export default VehicleDetails; 