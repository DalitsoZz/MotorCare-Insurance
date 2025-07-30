import React from "react";
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
import { Shield, Car, User, FileText, ArrowLeft, Award, Globe, Phone, Mail } from 'lucide-react';

const About = () => {
  const history = useHistory();

  return (
    <Page>
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
                <Shield size={40} color="white" />
              </div>
              <Text h1 style={{ margin: 0, color: 'white', fontSize: '3rem', fontWeight: '700' }}>About MotorCare_Insurance</Text>
            </div>
            <Text p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', fontWeight: '400' }}>
              Professional Motor Insurance Solutions for Zambia
            </Text>
          </div>
        </div>
      </Page.Header>

      <Grid.Container gap={2} justify="center">
        <Grid xs={24} md={16}>
          <Card shadow>
            <div style={{ padding: '20px' }}>
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '15px' }}>
                  <Shield size={40} color="#0070f3" />
                  <Text h1 style={{ margin: 0, color: '#0070f3' }}>MotorCare_Insurance</Text>
                </div>
                <Text h4 style={{ margin: '10px 0', color: '#333' }}>
                  Leading Motor Insurance Provider in Zambia
                </Text>
                <Text type="secondary" style={{ fontSize: '16px' }}>
                  Comprehensive coverage solutions tailored to local market needs
                </Text>
              </div>

              <Divider />

              <div style={{ marginBottom: '30px' }}>
                <Text h3 style={{ marginBottom: '20px' }}>Our Mission</Text>
                <Text p style={{ fontSize: '16px', lineHeight: '1.6' }}>
                  At MotorCare Insurance, we are committed to providing accessible, reliable, and comprehensive 
                  motor insurance solutions to the people of Zambia. Our mission is to protect what matters most 
                  to our customers while offering competitive premiums and exceptional service.
                </Text>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <Text h3 style={{ marginBottom: '20px' }}>Why Choose MotorCare?</Text>
                
                <Grid.Container gap={2}>
                  <Grid xs={24} md={12}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '20px' }}>
                      <Shield size={24} color="#00c853" style={{ marginTop: '4px' }} />
                      <div>
                        <Text b>ZRA Compliant</Text>
                        <Text small type="secondary" style={{ display: 'block' }}>
                          All our classifications and processes comply with Zambia Revenue Authority standards
                        </Text>
                      </div>
                    </div>
                  </Grid>
                  
                  <Grid xs={24} md={12}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '20px' }}>
                      <Car size={24} color="#00c853" style={{ marginTop: '4px' }} />
                      <div>
                        <Text b>Comprehensive Coverage</Text>
                        <Text small type="secondary" style={{ display: 'block' }}>
                          From basic third-party to full comprehensive coverage options
                        </Text>
                      </div>
                    </div>
                  </Grid>
                  
                  <Grid xs={24} md={12}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '20px' }}>
                      <User size={24} color="#00c853" style={{ marginTop: '4px' }} />
                      <div>
                        <Text b>Customer-Focused</Text>
                        <Text small type="secondary" style={{ display: 'block' }}>
                          Personalized service and support throughout your insurance journey
                        </Text>
                      </div>
                    </div>
                  </Grid>
                  
                  <Grid xs={24} md={12}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '20px' }}>
                      <FileText size={24} color="#00c853" style={{ marginTop: '4px' }} />
                      <div>
                        <Text b>Instant Quotes</Text>
                        <Text small type="secondary" style={{ display: 'block' }}>
                          Get accurate quotes instantly with our advanced calculation system
                        </Text>
                      </div>
                    </div>
                  </Grid>
                </Grid.Container>
              </div>

              <Divider />

              <div style={{ marginBottom: '30px' }}>
                <Text h3 style={{ marginBottom: '20px' }}>Our Services</Text>
                
                <div style={{ 
                  backgroundColor: '#f8f9fa', 
                  padding: '20px', 
                  borderRadius: '8px',
                  marginBottom: '20px'
                }}>
                  <Text h4 style={{ marginBottom: '15px' }}>Motor Insurance Coverage</Text>
                  
                  <Grid.Container gap={2}>
                    <Grid xs={24} md={8}>
                      <div style={{ textAlign: 'center', padding: '15px' }}>
                        <Shield size={32} color="#0070f3" style={{ marginBottom: '10px' }} />
                        <Text b>Comprehensive</Text>
                        <Text small type="secondary" style={{ display: 'block' }}>
                          Full coverage including own damage and third-party liability
                        </Text>
                      </div>
                    </Grid>
                    
                    <Grid xs={24} md={8}>
                      <div style={{ textAlign: 'center', padding: '15px' }}>
                        <Shield size={32} color="#0070f3" style={{ marginBottom: '10px' }} />
                        <Text b>Third Party + Fire & Theft</Text>
                        <Text small type="secondary" style={{ display: 'block' }}>
                          Covers third-party liability plus fire and theft damage
                        </Text>
                      </div>
                    </Grid>
                    
                    <Grid xs={24} md={8}>
                      <div style={{ textAlign: 'center', padding: '15px' }}>
                        <Shield size={32} color="#0070f3" style={{ marginBottom: '10px' }} />
                        <Text b>Third Party Only</Text>
                        <Text small type="secondary" style={{ display: 'block' }}>
                          Basic coverage for third-party liability
                        </Text>
                      </div>
                    </Grid>
                  </Grid.Container>
                </div>

                <div style={{ 
                  backgroundColor: '#f0f8ff', 
                  padding: '20px', 
                  borderRadius: '8px',
                  border: '1px solid #0070f3'
                }}>
                  <Text h4 style={{ marginBottom: '15px', color: '#0070f3' }}>Additional Benefits</Text>
                  
                  <Grid.Container gap={2}>
                    <Grid xs={24} md={12}>
                      <ul style={{ margin: '0', paddingLeft: '20px' }}>
                        <li><Text>Personal Accident Cover</Text></li>
                        <li><Text>Roadside Assistance</Text></li>
                        <li><Text>Medical Expenses</Text></li>
                        <li><Text>Windscreen Cover</Text></li>
                      </ul>
                    </Grid>
                    
                    <Grid xs={24} md={12}>
                      <ul style={{ margin: '0', paddingLeft: '20px' }}>
                        <li><Text>24/7 Customer Support</Text></li>
                        <li><Text>Fast Claims Processing</Text></li>
                        <li><Text>Flexible Payment Options</Text></li>
                        <li><Text>Online Policy Management</Text></li>
                      </ul>
                    </Grid>
                  </Grid.Container>
                </div>
              </div>

              <Divider />

              <div style={{ marginBottom: '30px' }}>
                <Text h3 style={{ marginBottom: '20px' }}>Project Information</Text>
                
                <div style={{ 
                  backgroundColor: '#fff3e0', 
                  padding: '20px', 
                  borderRadius: '8px',
                  border: '1px solid #ff9800'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                    <Award size={24} color="#ff9800" />
                    <Text h4 style={{ margin: 0, color: '#ff9800' }}>Hobbiton Technologies Challenge</Text>
                  </div>
                  
                  <Text p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '15px' }}>
                    This motor insurance quotation system was developed by <Text b>Dalitso Zulu</Text> as part of the 
                    <Text b> Hobbiton Technologies Challenge</Text>. The project demonstrates the creation of a 
                    professional web application for motor insurance quotation flow, incorporating:
                  </Text>
                  
                  <ul style={{ margin: '0', paddingLeft: '20px' }}>
                    <li><Text>ZRA-compliant vehicle classifications</Text></li>
                    <li><Text>Professional user interface design</Text></li>
                    <li><Text>Dynamic chat-like user guidance</Text></li>
                    <li><Text>Comprehensive coverage options</Text></li>
                    <li><Text>PDF quote generation and download</Text></li>
                    <li><Text>Responsive and intuitive user experience</Text></li>
                  </ul>
                </div>
              </div>

              <Divider />

              <div style={{ marginBottom: '20px' }}>
                <Text h3 style={{ marginBottom: '20px' }}>Contact Information</Text>
                
                <Grid.Container gap={2}>
                  <Grid xs={24} md={8}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                      <Globe size={20} color="#0070f3" />
                      <div>
                        <Text b>Website</Text>
                        <Text small type="secondary" style={{ display: 'block' }}>
                          www.motocare.co.zm
                        </Text>
                      </div>
                    </div>
                  </Grid>
                  
                  <Grid xs={24} md={8}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                      <Phone size={20} color="#0070f3" />
                      <div>
                        <Text b>Phone</Text>
                        <Text small type="secondary" style={{ display: 'block' }}>
                          +260 955 123 456
                        </Text>
                      </div>
                    </div>
                  </Grid>
                  
                  <Grid xs={24} md={8}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                      <Mail size={20} color="#0070f3" />
                      <div>
                        <Text b>Email</Text>
                        <Text small type="secondary" style={{ display: 'block' }}>
                          info@motocare.co.zm
                        </Text>
                      </div>
                    </div>
                  </Grid>
                </Grid.Container>
              </div>
            </div>
          </Card>
        </Grid>

        <Grid xs={24} md={8}>
          <Card shadow>
            <div style={{ padding: '20px' }}>
              <Text h4>Quick Actions</Text>
              <Spacer y={1} />
              
              <Button 
                onClick={() => history.push('/')}
                type="success"
                style={{ width: '100%', marginBottom: '12px' }}
              >
                Get Insurance Quote
              </Button>
              
              <Button 
                onClick={() => history.push('/vehicle-details')}
                type="secondary"
                style={{ width: '100%', marginBottom: '12px' }}
              >
                Start New Quote
              </Button>
              
              <Button 
                icon={<ArrowLeft />} 
                onClick={() => history.push('/')}
                type="abort"
                style={{ width: '100%' }}
              >
                Back to Home
              </Button>

              <Spacer y={2} />
              
              <div style={{ 
                backgroundColor: '#e8f5e8', 
                padding: '16px', 
                borderRadius: '8px',
                border: '1px solid #4caf50'
              }}>
                <Text b small style={{ color: '#4caf50', marginBottom: '8px' }}>
                  Why Choose MotoCare?
                </Text>
                <Text small type="secondary" style={{ display: 'block', marginBottom: '4px' }}>
                  • ZRA Compliant Classifications
                </Text>
                <Text small type="secondary" style={{ display: 'block', marginBottom: '4px' }}>
                  • Instant Quote Generation
                </Text>
                <Text small type="secondary" style={{ display: 'block', marginBottom: '4px' }}>
                  • Professional Customer Support
                </Text>
                <Text small type="secondary" style={{ display: 'block' }}>
                  • Comprehensive Coverage Options
                </Text>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid.Container>
    </Page>
  );
};

export default About; 