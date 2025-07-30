import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { 
  Button, 
  Page, 
  Text, 
  Card, 
  Grid, 
  Spacer,
  Divider
} from '@geist-ui/core';
import { FileText, Download, ArrowLeft, CheckCircle, Shield, Car, User } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { updateStepProgress, QUOTE_STEPS } from '../utils/progressTracker';

const QuoteSummary = () => {
  const history = useHistory();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [driverDetails, setDriverDetails] = useState(null);
  const [coverageOptions, setCoverageOptions] = useState(null);
  const [quoteNumber, setQuoteNumber] = useState('');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const coverageOptionsList = [
    {
      id: 'comprehensive',
      name: 'Comprehensive Coverage',
      description: 'Full coverage including damage to your vehicle, third-party liability, and additional benefits'
    },
    {
      id: 'third_party_fire_theft',
      name: 'Third Party, Fire & Theft',
      description: 'Covers third-party liability plus damage from fire and theft'
    },
    {
      id: 'third_party_only',
      name: 'Third Party Only',
      description: 'Basic coverage for third-party liability only'
    },
    {
      id: 'personal_accident',
      name: 'Personal Accident Cover',
      description: 'Additional coverage for driver and passengers'
    },
    {
      id: 'roadside_assistance',
      name: 'Roadside Assistance',
      description: '24/7 roadside assistance and towing services'
    }
  ];

  useEffect(() => {
    const vehicleData = localStorage.getItem('vehicleDetails');
    const driverData = localStorage.getItem('driverDetails');
    const coverageData = localStorage.getItem('coverageOptions');
    
    if (vehicleData) {
      setVehicleDetails(JSON.parse(vehicleData));
    }
    if (driverData) {
      setDriverDetails(JSON.parse(driverData));
    }
    if (coverageData) {
      setCoverageOptions(JSON.parse(coverageData));
    }

    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    setQuoteNumber(`MC-${timestamp}-${randomNum}`);
    
    // Mark quote summary as 100% complete when page loads
    updateStepProgress(QUOTE_STEPS.QUOTE_SUMMARY, 100);
  }, []);

  const getVehicleTypeLabel = (type) => {
    const types = {
      'private_car': 'Private Car (Class A)',
      'commercial_vehicle': 'Commercial Vehicle (Class B)',
      'motorcycle': 'Motorcycle (Class C)',
      'truck': 'Truck (Class D)',
      'bus': 'Bus (Class E)',
      'trailer': 'Trailer (Class F)',
      'tractor': 'Tractor (Class G)',
      'special_purpose': 'Special Purpose Vehicle (Class H)'
    };
    return types[type] || type;
  };

  const getCoverageName = (coverageId) => {
    const coverage = coverageOptionsList.find(c => c.id === coverageId);
    return coverage ? coverage.name : coverageId;
  };

  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    
    try {
      const element = document.getElementById('quote-summary');
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
              pdf.save(`MotorCare_Quote_${quoteNumber}.pdf`);
      
      // Mark download as 100% complete
      updateStepProgress(QUOTE_STEPS.DOWNLOAD, 100);
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setErrorMessage('Error generating PDF. Please try again.');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const startNewQuote = () => {
    localStorage.removeItem('vehicleDetails');
    localStorage.removeItem('driverDetails');
    localStorage.removeItem('coverageOptions');
    
    // Reset global progress
    import('../utils/progressTracker').then(({ resetProgress }) => {
      resetProgress();
    });
    
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      history.push('/');
    }, 1000);
  };

  if (!vehicleDetails || !driverDetails || !coverageOptions) {
    return (
      <Page>
        <Text h3>Loading quote summary...</Text>
      </Page>
    );
  }

  return (
    <Page>
      {showSuccess && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#00c853',
          color: 'white',
          padding: '16px',
          borderRadius: '8px',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}>
          <Text style={{ color: 'white', margin: 0 }}>PDF downloaded successfully!</Text>
        </div>
      )}
      
      {showError && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#f44336',
          color: 'white',
          padding: '16px',
          borderRadius: '8px',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}>
          <Text style={{ color: 'white', margin: 0 }}>{errorMessage}</Text>
        </div>
      )}

      <Page.Header>
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 0',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '16px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)'
              }}>
                <FileText size={40} color="white" />
              </div>
              <Text h1 style={{ margin: 0, color: 'white', fontSize: '3rem', fontWeight: '700' }}>Quote Summary</Text>
            </div>
            <Text p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', fontWeight: '400' }}>
              Step 4 of 4 - Review your comprehensive insurance quote
            </Text>
          </div>
        </div>
      </Page.Header>

      <Grid.Container gap={2} justify="center">
        <Grid xs={24} md={16}>
          <Card shadow>
            <div id="quote-summary" style={{ padding: '20px' }}>
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
                  <Shield size={32} color="#0070f3" />
                  <Text h2 style={{ margin: 0, color: '#0070f3' }}>MotorCare_Insurance</Text>
                </div>
                <Text h4 style={{ margin: '10px 0', color: '#333' }}>Motor Insurance Quotation</Text>
                <Text type="secondary">Quote Number: {quoteNumber}</Text>
                <Text type="secondary">Date: {new Date().toLocaleDateString()}</Text>
              </div>

              <Divider />

              <div style={{ marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                  <Car size={20} color="#0070f3" />
                  <Text h4>Vehicle Information</Text>
                </div>
                
                <Grid.Container gap={2}>
                  <Grid xs={24} md={12}>
                    <Text b>Vehicle Type:</Text>
                    <Text style={{ display: 'block', marginBottom: '8px' }}>
                      {getVehicleTypeLabel(vehicleDetails.vehicleType)}
                    </Text>
                  </Grid>
                  <Grid xs={24} md={12}>
                    <Text b>Registration Number:</Text>
                    <Text style={{ display: 'block', marginBottom: '8px' }}>
                      {vehicleDetails.registrationNumber}
                    </Text>
                  </Grid>
                  <Grid xs={24} md={8}>
                    <Text b>Make:</Text>
                    <Text style={{ display: 'block', marginBottom: '8px' }}>
                      {vehicleDetails.make}
                    </Text>
                  </Grid>
                  <Grid xs={24} md={8}>
                    <Text b>Model:</Text>
                    <Text style={{ display: 'block', marginBottom: '8px' }}>
                      {vehicleDetails.model}
                    </Text>
                  </Grid>
                  <Grid xs={24} md={8}>
                    <Text b>Year:</Text>
                    <Text style={{ display: 'block', marginBottom: '8px' }}>
                      {vehicleDetails.year}
                    </Text>
                  </Grid>
                  {vehicleDetails.engineCapacity && (
                    <Grid xs={24} md={12}>
                      <Text b>Engine Capacity:</Text>
                      <Text style={{ display: 'block', marginBottom: '8px' }}>
                        {vehicleDetails.engineCapacity} cc
                      </Text>
                    </Grid>
                  )}
                  {vehicleDetails.fuelType && (
                    <Grid xs={24} md={12}>
                      <Text b>Fuel Type:</Text>
                      <Text style={{ display: 'block', marginBottom: '8px' }}>
                        {vehicleDetails.fuelType}
                      </Text>
                    </Grid>
                  )}
                </Grid.Container>
              </div>

              <Divider />

              <div style={{ marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                  <User size={20} color="#0070f3" />
                  <Text h4>Driver Information</Text>
                </div>
                
                <Grid.Container gap={2}>
                  <Grid xs={24} md={12}>
                    <Text b>Name:</Text>
                    <Text style={{ display: 'block', marginBottom: '8px' }}>
                      {driverDetails.firstName} {driverDetails.lastName}
                    </Text>
                  </Grid>
                  <Grid xs={24} md={12}>
                    <Text b>Email:</Text>
                    <Text style={{ display: 'block', marginBottom: '8px' }}>
                      {driverDetails.email}
                    </Text>
                  </Grid>
                  <Grid xs={24} md={12}>
                    <Text b>Phone:</Text>
                    <Text style={{ display: 'block', marginBottom: '8px' }}>
                      {driverDetails.phone}
                    </Text>
                  </Grid>
                  <Grid xs={24} md={12}>
                    <Text b>License Number:</Text>
                    <Text style={{ display: 'block', marginBottom: '8px' }}>
                      {driverDetails.licenseNumber}
                    </Text>
                  </Grid>
                </Grid.Container>
              </div>

              <Divider />

              <div style={{ marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                  <Shield size={20} color="#0070f3" />
                  <Text h4>Coverage Information</Text>
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <Text b>Selected Coverages:</Text>
                  <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                    {coverageOptions.selectedCoverages.map(coverageId => (
                      <li key={coverageId}>
                        <Text>{getCoverageName(coverageId)}</Text>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Grid.Container gap={2}>
                  <Grid xs={24} md={12}>
                    <Text b>Excess Amount:</Text>
                    <Text style={{ display: 'block', marginBottom: '8px' }}>
                      ZMW {parseInt(coverageOptions.excessAmount).toLocaleString()}
                    </Text>
                  </Grid>
                  <Grid xs={24} md={12}>
                    <Text b>Policy Period:</Text>
                    <Text style={{ display: 'block', marginBottom: '8px' }}>
                      {coverageOptions.policyPeriod} months
                    </Text>
                  </Grid>
                </Grid.Container>
              </div>

              <Divider />

              <div className="premium-summary">
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <Text h3 style={{ marginBottom: '20px', textAlign: 'center', color: '#2d3748' }}>
                    Premium Summary
                  </Text>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '16px'
                  }}>
                    <Text h2 style={{ color: '#2d3748', fontWeight: '600' }}>Total Premium:</Text>
                    <div className="premium-amount">
                      ZMW {coverageOptions.calculatedPremium.toLocaleString()}
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    marginBottom: '16px'
                  }}>
                    <div className="badge badge-success">
                      Quote Generated
                    </div>
                    <div className="badge badge-info">
                      Valid for 30 days
                    </div>
                  </div>
                  
                  <Text small type="secondary" style={{ textAlign: 'center', display: 'block' }}>
                    * This is an estimated premium. Final premium may vary based on final assessment.
                  </Text>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <Text h5>Terms and Conditions:</Text>
                <Text small type="secondary" style={{ display: 'block', marginBottom: '8px' }}>
                  • This quote is valid for 30 days from the date of issue
                </Text>
                <Text small type="secondary" style={{ display: 'block', marginBottom: '8px' }}>
                  • Premium is subject to change based on final risk assessment
                </Text>
                <Text small type="secondary" style={{ display: 'block', marginBottom: '8px' }}>
                  • Coverage is subject to policy terms and conditions
                </Text>
                <Text small type="secondary" style={{ display: 'block', marginBottom: '8px' }}>
                  • This quote is based on information provided and may be subject to verification
                </Text>
              </div>

              <div style={{ textAlign: 'center', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #eaeaea' }}>
                <Text small type="secondary">
                  MotorCare_Insurance - Professional Motor Insurance Solutions for Zambia
                </Text>
                <br />
                <Text small type="secondary">
                  Developed by Dalitso Zulu for Hobbiton Technologies Challenge
                </Text>
              </div>
            </div>
          </Card>
        </Grid>

        <Grid xs={24} md={8}>
          <Card shadow>
            <div style={{ padding: '20px' }}>
              <Text h4>Quote Actions</Text>
              <Spacer y={1} />
              
              <Button 
                icon={<Download />} 
                onClick={generatePDF}
                type="success"
                loading={isGeneratingPDF}
                style={{ width: '100%', marginBottom: '12px' }}
              >
                Download PDF Quote
              </Button>
              
              <Button 
                icon={<CheckCircle />} 
                onClick={startNewQuote}
                type="secondary"
                style={{ width: '100%', marginBottom: '12px' }}
              >
                Start New Quote
              </Button>
              
              <Button 
                icon={<ArrowLeft />} 
                onClick={() => history.push('/coverage-options')}
                type="abort"
                style={{ width: '100%' }}
              >
                Back to Coverage Options
              </Button>

              <Spacer y={2} />
              
              <div style={{ 
                backgroundColor: '#f0f8ff', 
                padding: '16px', 
                borderRadius: '8px',
                border: '1px solid #0070f3'
              }}>
                <Text b small style={{ color: '#0070f3', marginBottom: '8px' }}>
                  Next Steps:
                </Text>
                <Text small type="secondary" style={{ display: 'block', marginBottom: '4px' }}>
                  1. Review your quote details
                </Text>
                <Text small type="secondary" style={{ display: 'block', marginBottom: '4px' }}>
                  2. Download PDF for your records
                </Text>
                <Text small type="secondary" style={{ display: 'block', marginBottom: '4px' }}>
                  3. Contact us to proceed with policy
                </Text>
                <Text small type="secondary" style={{ display: 'block' }}>
                  4. Our team will assist with finalization
                </Text>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid.Container>
    </Page>
  );
};

export default QuoteSummary; 