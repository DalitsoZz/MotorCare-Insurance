import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Car, Shield, FileText, MessageCircle, ArrowRight, CheckCircle, Star, Users, Clock, Award } from 'lucide-react';
import { resetProgress } from '../utils/progressTracker';

const Home = () => {
  const history = useHistory();
  const [modalVisible, setModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const chatSteps = [
    {
      id: 1,
              message: "Welcome to MotorCare_Insurance! 🚗 I'm here to help you get a motor insurance quotation. Let's start by understanding your needs.",
      type: "bot"
    },
    {
      id: 2,
      message: "To provide you with an accurate quote, I'll need some information about your vehicle and driving history.",
      type: "bot"
    },
    {
      id: 3,
      message: "Would you like to proceed with getting a quotation?",
      type: "bot",
      options: ["Yes, let's start", "Tell me more about MotoCare"]
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([chatSteps[0]]);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Reset progress when user visits home page
    resetProgress();
  }, []);

  useEffect(() => {
    if (currentStep < chatSteps.length - 1) {
      const timer = setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setMessages(prev => [...prev, chatSteps[currentStep + 1]]);
          setCurrentStep(prev => prev + 1);
          setIsTyping(false);
        }, 1000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

          const handleOptionClick = (option) => {
          if (option === "Yes, let's start") {
            // Check if user is authenticated
            const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
            if (isAuthenticated) {
              history.push('/vehicle-details');
            } else {
              // Redirect to login with flag to return to vehicle details after login
              localStorage.setItem('pendingLoginAfterVehicle', 'true');
              history.push('/login');
            }
          } else {
            setModalVisible(true);
          }
        };

  const features = [
    {
      icon: <Shield size={24} color="#00c853" />,
      title: "ZRA Compliant",
      description: "All classifications comply with Zambia Revenue Authority standards"
    },
    {
      icon: <Clock size={24} color="#00c853" />,
      title: "Instant Quotes",
      description: "Get accurate quotes in seconds with our AI-powered system"
    },
    {
      icon: <Car size={24} color="#00c853" />,
      title: "Comprehensive Coverage",
      description: "From basic third-party to full comprehensive options"
    },
    {
      icon: <Users size={24} color="#00c853" />,
      title: "Expert Support",
      description: "Professional customer support throughout your journey"
    },
    {
      icon: <FileText size={24} color="#00c853" />,
      title: "PDF Downloads",
      description: "Download detailed quotes in professional PDF format"
    },
    {
      icon: <Award size={24} color="#00c853" />,
      title: "Best Rates",
      description: "Competitive rates with flexible payment options"
    }
  ];

  return (
    <div className="home-page">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <Car size={32} color="#667eea" />
                          <h1>MotorCare_Insurance</h1>
          </div>
          <nav className="nav">
            <Link to="/about" className="nav-link">About</Link>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Professional Motor Insurance Quotation System</h1>
            <p>Get instant, accurate motor insurance quotes with our AI-powered system. ZRA compliant and designed for Zambia's unique requirements.</p>
                         <div className="hero-buttons">
               <button 
                 className="btn btn-primary"
                 onClick={() => {
                   const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
                   if (isAuthenticated) {
                     history.push('/vehicle-details');
                   } else {
                     localStorage.setItem('pendingLoginAfterVehicle', 'true');
                     history.push('/login');
                   }
                 }}
               >
                 Get Started <ArrowRight size={16} />
               </button>
               <button className="btn btn-secondary" onClick={() => setModalVisible(true)}>
                 Learn More
               </button>
             </div>
          </div>
          <div className="hero-image">
            <div className="floating-card">
              <Car size={64} color="#667eea" />
              <h3>Smart Insurance</h3>
              <p>Powered by AI</p>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose MotoCare?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="chat-section">
        <div className="container">
          <div className="chat-container">
            <div className="chat-header">
              <MessageCircle size={20} />
              <h3>AI Assistant</h3>
            </div>
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.type}`}>
                  <div className="message-content">
                    <p>{message.message}</p>
                    {message.options && (
                      <div className="message-options">
                        {message.options.map((option, optIndex) => (
                          <button
                            key={optIndex}
                            className="option-btn"
                            onClick={() => handleOptionClick(option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="message bot">
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {modalVisible && (
        <div className="modal-overlay" onClick={() => setModalVisible(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>About MotorCare_Insurance</h2>
              <button className="modal-close" onClick={() => setModalVisible(false)}>×</button>
            </div>
            <div className="modal-content">
              <p>MotorCare_Insurance is a professional motor insurance quotation system designed specifically for the Zambian market. Our system provides:</p>
              <ul>
                <li>Instant, accurate quotes</li>
                <li>ZRA compliance</li>
                <li>Comprehensive coverage options</li>
                <li>Professional PDF downloads</li>
                <li>Expert customer support</li>
              </ul>
              <div className="modal-actions">
                <button className="btn btn-primary" onClick={() => setModalVisible(false)}>
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home; 