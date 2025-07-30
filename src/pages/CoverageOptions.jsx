import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { 
  Button, 
  Page, 
  Text, 
  Card, 
  Grid, 
  Spacer,
  Checkbox,
  Input,
  Select,
  Divider
} from '@geist-ui/core';
import { Shield, ArrowLeft, ArrowRight, DollarSign, Info, CheckCircle, Car, Users, Clock, Zap } from 'lucide-react';
import { updateStepProgress, QUOTE_STEPS } from '../utils/progressTracker';

const CoverageOptions = () => {
  const history = useHistory();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [selectedCoverages, setSelectedCoverages] = useState([]);
  const [excessAmount, setExcessAmount] = useState('5000');
  const [policyPeriod, setPolicyPeriod] = useState('12');
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [driverDetails, setDriverDetails] = useState(null);
  const [premium, setPremium] = useState(0);

  const coverageOptions = [
    {
      id: 'comprehensive',
      name: 'Comprehensive Coverage',
      description: 'Complete protection for your vehicle including own damage, third-party liability, and additional benefits',
      basePremium: 15000,
      icon: Shield,
      color: '#1e3a8a',
      features: [
        'Damage to your vehicle (own damage)',
        'Third-party liability coverage',
        'Medical expenses for all parties',
        'Personal accident cover',
        '24/7 roadside assistance',
        'Windscreen and glass cover',
        'Natural disaster protection'
      ],
      recommended: true
    },
    {
      id: 'third_party_fire_theft',
      name: 'Third Party, Fire & Theft',
      description: 'Essential coverage for third-party liability plus protection against fire and theft',
      basePremium: 8000,
      icon: Shield,
      color: '#1e40af',
      features: [
        'Third-party liability coverage',
        'Fire damage protection',
        'Theft and attempted theft',
        'Medical expenses',
        'Legal defense costs'
      ]
    },
    {
      id: 'third_party_only',
      name: 'Third Party Only',
      description: 'Basic coverage meeting legal requirements for third-party liability',
      basePremium: 5000,
      icon: Shield,
      color: '#1d4ed8',
      features: [
        'Third-party liability coverage',
        'Medical expenses for third parties',
        'Legal defense costs',
        'Property damage to third parties'
      ]
    },
    {
      id: 'personal_accident',
      name: 'Personal Accident Cover',
      description: 'Additional protection for driver and passengers in case of accidents',
      basePremium: 2000,
      icon: Users,
      color: '#7c3aed',
      features: [
        'Driver personal accident coverage',
        'Passenger personal accident',
        'Medical expenses for occupants',
        'Disability benefits',
        'Death benefits'
      ]
    },
    {
      id: 'roadside_assistance',
      name: 'Roadside Assistance',
      description: '24/7 emergency roadside assistance and towing services',
      basePremium: 1500,
      icon: Zap,
      color: '#059669',
      features: [
        '24/7 roadside assistance',
        'Emergency towing services',
        'Battery jump-start',
        'Fuel delivery service',
        'Flat tire assistance',
        'Lockout service',
        'Emergency accommodation'
      ]
    }
  ];

  const policyPeriods = [
    { value: '6', label: '6 Months', discount: '5%' },
    { value: '12', label: '12 Months', discount: '0%' },
    { value: '24', label: '24 Months', discount: '10%' }
  ];

  useEffect(() => {
    const vehicleData = localStorage.getItem('vehicleDetails');
    const driverData = localStorage.getItem('driverDetails');
    
    if (vehicleData) {
      setVehicleDetails(JSON.parse(vehicleData));
    }
    if (driverData) {
      setDriverDetails(JSON.parse(driverData));
    }
  }, []);

  useEffect(() => {
    calculatePremium();
  }, [selectedCoverages, excessAmount, policyPeriod, vehicleDetails]);

  const calculatePremium = () => {
    let totalPremium = 0;
    
    let vehicleMultiplier = 1;
    if (vehicleDetails) {
      switch (vehicleDetails.vehicleType) {
        case 'private_car':
          vehicleMultiplier = 1;
          break;
        case 'commercial_vehicle':
          vehicleMultiplier = 1.3;
          break;
        case 'motorcycle':
          vehicleMultiplier = 0.8;
          break;
        case 'truck':
          vehicleMultiplier = 1.5;
          break;
        case 'bus':
          vehicleMultiplier = 1.8;
          break;
        default:
          vehicleMultiplier = 1.2;
      }
    }

    selectedCoverages.forEach(coverageId => {
      const coverage = coverageOptions.find(c => c.id === coverageId);
      if (coverage) {
        totalPremium += coverage.basePremium * vehicleMultiplier;
      }
    });

    // Excess discount calculation
    const excessDiscount = (parseInt(excessAmount) - 5000) * 0.01;
    totalPremium = Math.max(totalPremium - excessDiscount, totalPremium * 0.8);

    // Policy period multiplier
    const periodMultiplier = policyPeriod === '6' ? 0.55 : policyPeriod === '24' ? 1.8 : 1;
    totalPremium *= periodMultiplier;

    setPremium(Math.round(totalPremium));
  };

  const handleCoverageToggle = (coverageId) => {
    setSelectedCoverages(prev => {
      if (prev.includes(coverageId)) {
        return prev.filter(id => id !== coverageId);
      } else {
        return [...prev, coverageId];
      }
    });
    
    setTimeout(() => {
      const progress = selectedCoverages.length > 0 ? 100 : 0;
      updateStepProgress(QUOTE_STEPS.COVERAGE_OPTIONS, progress);
    }, 300);
  };

  const handleSubmit = () => {
    if (selectedCoverages.length === 0) {
      setErrorMessage('Please select at least one coverage option');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    const coverageData = {
      selectedCoverages,
      excessAmount,
      policyPeriod,
      calculatedPremium: premium
    };
    
    localStorage.setItem('coverageOptions', JSON.stringify(coverageData));
    updateStepProgress(QUOTE_STEPS.COVERAGE_OPTIONS, 100);
    
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      history.push('/quote-summary');
    }, 1000);
  };

  const getIconComponent = (iconName) => {
    const iconMap = {
      Shield: Shield,
      Users: Users,
      Zap: Zap,
      Car: Car,
      Clock: Clock
    };
    return iconMap[iconName] || Shield;
  };

  return (
    <Page>
      {/* Success/Error Messages */}
      {showSuccess && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#10b981',
          color: 'white',
          padding: '16px 20px',
          borderRadius: '12px',
          zIndex: 1000,
          boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'slideInRight 0.3s ease-out'
        }}>
          <CheckCircle size={20} />
          <Text style={{ color: 'white', margin: 0, fontWeight: '500' }}>
            Coverage options saved successfully!
          </Text>
        </div>
      )}
      
      {showError && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#ef4444',
          color: 'white',
          padding: '16px 20px',
          borderRadius: '12px',
          zIndex: 1000,
          boxShadow: '0 8px 25px rgba(239, 68, 68, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'slideInRight 0.3s ease-out'
        }}>
          <Info size={20} />
          <Text style={{ color: 'white', margin: 0, fontWeight: '500' }}>
            {errorMessage}
          </Text>
        </div>
      )}

      {/* Page Header */}
      <Page.Header>
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 0',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
          borderRadius: '24px',
          marginBottom: '40px',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><defs><pattern id=\'grain\' width=\'100\' height=\'100\' patternUnits=\'userSpaceOnUse\'><circle cx=\'25\' cy=\'25\' r=\'1\' fill=\'rgba(255,255,255,0.1)\'/><circle cx=\'75\' cy=\'75\' r=\'1\' fill=\'rgba(255,255,255,0.1)\'/><circle cx=\'50\' cy=\'10\' r=\'0.5\' fill=\'rgba(255,255,255,0.1)\'/><circle cx=\'10\' cy=\'60\' r=\'0.5\' fill=\'rgba(255,255,255,0.1)\'/><circle cx=\'90\' cy=\'40\' r=\'0.5\' fill=\'rgba(255,255,255,0.1)\'/></pattern></defs><rect width=\'100\' height=\'100\' fill=\'url(%23grain)\'/></svg>")',
            opacity: 0.3
          }} />
          
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.3)'
              }}>
                <Shield size={48} color="white" />
              </div>
              <div>
                <Text h1 style={{ margin: 0, color: 'white', fontSize: '3.5rem', fontWeight: '700', lineHeight: '1.2' }}>
                  Coverage Options
                </Text>
                <Text p style={{ margin: '8px 0 0 0', color: 'rgba(255,255,255,0.9)', fontSize: '1.3rem', fontWeight: '400' }}>
                  Step 3 of 4 - Choose your protection plan
                </Text>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '40px',
              marginTop: '30px',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                <Text small style={{ color: 'rgba(255,255,255,0.9)' }}>Vehicle Details</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                <Text small style={{ color: 'rgba(255,255,255,0.9)' }}>Driver Details</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#3b82f6' }} />
                <Text small style={{ color: 'rgba(255,255,255,0.9)', fontWeight: '600' }}>Coverage Options</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#e5e7eb' }} />
                <Text small style={{ color: 'rgba(255,255,255,0.7)' }}>Quote Summary</Text>
              </div>
            </div>
          </div>
        </div>
      </Page.Header>

      <Grid.Container gap={2} justify="center">
        {/* Main Content */}
        <Grid xs={24} lg={16}>
          <Card shadow>
            <div style={{ padding: '32px' }}>
              {/* Coverage Options Section */}
              <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                    color: 'white'
                  }}>
                    <Shield size={24} />
                  </div>
                  <div>
                    <Text h3 style={{ margin: 0, color: '#1e3a8a', fontWeight: '700' }}>
                      Available Coverage Options
                    </Text>
                    <Text p style={{ margin: '4px 0 0 0', color: '#6b7280', fontSize: '1rem' }}>
                      Select the coverage options that best suit your needs
                    </Text>
                  </div>
                </div>

                <Grid.Container gap={2}>
                  {coverageOptions.map((coverage) => {
                    const IconComponent = getIconComponent(coverage.icon);
                    const isSelected = selectedCoverages.includes(coverage.id);
                    
                    return (
                      <Grid xs={24} md={12} key={coverage.id}>
                        <div 
                          className={`coverage-option-card ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleCoverageToggle(coverage.id)}
                          style={{
                            position: 'relative',
                            cursor: 'pointer',
                            border: `2px solid ${isSelected ? coverage.color : '#e5e7eb'}`,
                            borderRadius: '20px',
                            padding: '28px',
                            marginBottom: '20px',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            background: isSelected 
                              ? `linear-gradient(135deg, ${coverage.color}15 0%, ${coverage.color}25 100%)`
                              : 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(10px)',
                            transform: isSelected ? 'translateY(-4px)' : 'translateY(0)',
                            boxShadow: isSelected 
                              ? `0 12px 32px ${coverage.color}30`
                              : '0 4px 12px rgba(0, 0, 0, 0.05)'
                          }}
                        >
                          {/* Recommended Badge */}
                          {coverage.recommended && (
                            <div style={{
                              position: 'absolute',
                              top: '16px',
                              right: '16px',
                              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                              color: 'white',
                              padding: '6px 12px',
                              borderRadius: '20px',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                            }}>
                              RECOMMENDED
                            </div>
                          )}

                          {/* Header */}
                          <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'flex-start', 
                            marginBottom: '20px' 
                          }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: '48px',
                                  height: '48px',
                                  borderRadius: '50%',
                                  background: `linear-gradient(135deg, ${coverage.color} 0%, ${coverage.color}dd 100%)`,
                                  color: 'white',
                                  boxShadow: `0 4px 12px ${coverage.color}40`
                                }}>
                                  <IconComponent size={24} />
                                </div>
                                <Text h4 style={{ 
                                  margin: 0,
                                  color: isSelected ? coverage.color : '#1f2937',
                                  fontWeight: '700',
                                  fontSize: '1.25rem'
                                }}>
                                  {coverage.name}
                                </Text>
                              </div>
                              <Text type="secondary" style={{ 
                                marginBottom: '20px',
                                lineHeight: '1.6',
                                fontSize: '0.95rem',
                                color: '#6b7280'
                              }}>
                                {coverage.description}
                              </Text>
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              marginLeft: '16px'
                            }}>
                              <div style={{ textAlign: 'right' }}>
                                <Text h4 style={{ 
                                  margin: 0, 
                                  color: coverage.color,
                                  fontWeight: '700',
                                  fontSize: '1.5rem'
                                }}>
                                  ZMW {coverage.basePremium.toLocaleString()}
                                </Text>
                                <Text small style={{ color: '#6b7280', margin: 0 }}>
                                  Base Premium
                                </Text>
                              </div>
                              {isSelected && (
                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '50%',
                                  backgroundColor: coverage.color,
                                  color: 'white',
                                  animation: 'checkmark 0.5s ease-in-out',
                                  boxShadow: `0 4px 12px ${coverage.color}40`
                                }}>
                                  <CheckCircle size={20} />
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Features */}
                          <div style={{
                            backgroundColor: isSelected ? `${coverage.color}10` : '#f9fafb',
                            padding: '20px',
                            borderRadius: '16px',
                            border: `1px solid ${isSelected ? `${coverage.color}30` : '#e5e7eb'}`
                          }}>
                            <Text b small style={{ 
                              display: 'block', 
                              marginBottom: '16px',
                              color: isSelected ? coverage.color : '#374151',
                              fontSize: '0.9rem',
                              fontWeight: '600',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}>
                              Coverage Features:
                            </Text>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                              {coverage.features.map((feature, index) => (
                                <li key={index} style={{ marginBottom: '10px' }}>
                                  <Text small style={{ 
                                    lineHeight: '1.5',
                                    color: '#4b5563',
                                    fontSize: '0.9rem'
                                  }}>
                                    {feature}
                                  </Text>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Grid>
                    );
                  })}
                </Grid.Container>
              </div>

              <Divider />
              
              {/* Policy Settings Section */}
              <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    color: 'white'
                  }}>
                    <DollarSign size={24} />
                  </div>
                  <div>
                    <Text h3 style={{ margin: 0, color: '#059669', fontWeight: '700' }}>
                      Policy Settings
                    </Text>
                    <Text p style={{ margin: '4px 0 0 0', color: '#6b7280', fontSize: '1rem' }}>
                      Customize your policy parameters
                    </Text>
                  </div>
                </div>

                <Grid.Container gap={2}>
                  <Grid xs={24} md={12}>
                    <div style={{ marginBottom: '20px' }}>
                      <Text b style={{ display: 'block', marginBottom: '8px', color: '#374151', fontSize: '1rem' }}>
                        Excess Amount (ZMW)
                      </Text>
                      <Input
                        placeholder="5000"
                        value={excessAmount}
                        onChange={(e) => setExcessAmount(e.target.value)}
                        width="100%"
                        style={{ fontSize: '1rem' }}
                      />
                      <Text small type="secondary" style={{ marginTop: '8px', display: 'block' }}>
                        Higher excess reduces your premium but increases your out-of-pocket costs
                      </Text>
                    </div>
                  </Grid>

                  <Grid xs={24} md={12}>
                    <div style={{ marginBottom: '20px' }}>
                      <Text b style={{ display: 'block', marginBottom: '8px', color: '#374151', fontSize: '1rem' }}>
                        Policy Period
                      </Text>
                      <Select
                        placeholder="Select period"
                        value={policyPeriod}
                        onChange={(value) => setPolicyPeriod(value)}
                        width="100%"
                      >
                        {policyPeriods.map(period => (
                          <Select.Option key={period.value} value={period.value}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span>{period.label}</span>
                              {period.discount !== '0%' && (
                                <span style={{ 
                                  color: period.discount.startsWith('-') ? '#ef4444' : '#10b981',
                                  fontSize: '0.8rem',
                                  fontWeight: '600'
                                }}>
                                  {period.discount}
                                </span>
                              )}
                            </div>
                          </Select.Option>
                        ))}
                      </Select>
                      <Text small type="secondary" style={{ marginTop: '8px', display: 'block' }}>
                        Choose your policy duration - longer periods may offer discounts
                      </Text>
                    </div>
                  </Grid>
                </Grid.Container>
              </div>

              <Divider />
              
              {/* Navigation Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button 
                  icon={<ArrowLeft />} 
                  onClick={() => history.push('/driver-details')}
                  type="abort"
                  style={{ padding: '12px 24px', fontSize: '1rem' }}
                >
                  Back to Driver Details
                </Button>
                
                <Button 
                  icon={<ArrowRight />} 
                  onClick={handleSubmit}
                  type="success"
                  style={{ padding: '12px 32px', fontSize: '1rem' }}
                  disabled={selectedCoverages.length === 0}
                >
                  Continue to Quote Summary
                </Button>
              </div>
            </div>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid xs={24} lg={8}>
          <Card shadow>
            <div style={{ padding: '32px' }}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  margin: '0 auto 16px'
                }}>
                  <DollarSign size={32} />
                </div>
                <Text h4 style={{ margin: 0, color: '#059669', fontWeight: '700' }}>
                  Premium Summary
                </Text>
              </div>
              
              <div style={{ 
                backgroundColor: '#f8fafc', 
                padding: '24px', 
                borderRadius: '16px',
                marginBottom: '24px',
                border: '2px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <Text style={{ color: '#6b7280' }}>Selected Coverages:</Text>
                  <Text b style={{ color: '#374151' }}>{selectedCoverages.length}</Text>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <Text style={{ color: '#6b7280' }}>Excess Amount:</Text>
                  <Text b style={{ color: '#374151' }}>ZMW {parseInt(excessAmount).toLocaleString()}</Text>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <Text style={{ color: '#6b7280' }}>Policy Period:</Text>
                  <Text b style={{ color: '#374151' }}>
                    {policyPeriods.find(p => p.value === policyPeriod)?.label}
                  </Text>
                </div>
                
                <Divider />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text h5 style={{ margin: 0, color: '#1f2937', fontWeight: '700' }}>
                    Estimated Premium:
                  </Text>
                  <Text h4 style={{ 
                    margin: 0, 
                    color: '#10b981',
                    fontWeight: '700',
                    fontSize: '1.75rem'
                  }}>
                    ZMW {premium.toLocaleString()}
                  </Text>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <Text b small style={{ display: 'block', marginBottom: '12px', color: '#374151' }}>
                  Selected Coverages:
                </Text>
                {selectedCoverages.length === 0 ? (
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '12px',
                    textAlign: 'center'
                  }}>
                    <Text small style={{ color: '#6b7280', margin: 0 }}>
                      No coverages selected yet
                    </Text>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedCoverages.map(coverageId => {
                      const coverage = coverageOptions.find(c => c.id === coverageId);
                      return (
                        <div key={coverageId} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 12px',
                          backgroundColor: '#f8fafc',
                          borderRadius: '8px',
                          border: `1px solid ${coverage.color}30`
                        }}>
                          <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: coverage.color
                          }} />
                          <Text small style={{ color: '#374151', margin: 0 }}>
                            {coverage?.name}
                          </Text>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div style={{
                padding: '16px',
                backgroundColor: '#fef3c7',
                borderRadius: '12px',
                border: '1px solid #f59e0b'
              }}>
                <Text small style={{ color: '#92400e', margin: 0, lineHeight: '1.5' }}>
                  <strong>Note:</strong> Premium is an estimate and may vary based on final assessment and additional factors.
                </Text>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid.Container>
    </Page>
  );
};

export default CoverageOptions; 