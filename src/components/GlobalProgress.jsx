import React, { useState, useEffect } from 'react';
import { getGlobalProgress, QUOTE_STEPS } from '../utils/progressTracker';

const GlobalProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      setProgress(getGlobalProgress());
    };

    updateProgress();
    
    // Listen for storage changes to update progress in real-time
    const handleStorageChange = () => {
      updateProgress();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check for changes every second (for same-tab updates)
    const interval = setInterval(updateProgress, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const getStepStatus = (stepKey) => {
    const stepProgress = getGlobalProgress();
    const stepOrder = Object.values(QUOTE_STEPS);
    const currentStepIndex = stepOrder.indexOf(stepKey);
    
    if (stepProgress >= (currentStepIndex + 1) * 20) {
      return 'completed';
    } else if (stepProgress >= currentStepIndex * 20) {
      return 'active';
    } else {
      return 'pending';
    }
  };

  return (
    <div className="global-progress">
      <div className="progress-header">
        <h3>Quote Progress</h3>
        <div className="progress-percentage">{progress}% Complete</div>
      </div>
      
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="progress-steps">
        <div className={`step ${getStepStatus(QUOTE_STEPS.VEHICLE_DETAILS)}`}>
          <div className="step-number">1</div>
          <span className="step-label">Vehicle</span>
        </div>
        <div className={`step ${getStepStatus(QUOTE_STEPS.DRIVER_DETAILS)}`}>
          <div className="step-number">2</div>
          <span className="step-label">Driver</span>
        </div>
        <div className={`step ${getStepStatus(QUOTE_STEPS.COVERAGE_OPTIONS)}`}>
          <div className="step-number">3</div>
          <span className="step-label">Coverage</span>
        </div>
        <div className={`step ${getStepStatus(QUOTE_STEPS.QUOTE_SUMMARY)}`}>
          <div className="step-number">4</div>
          <span className="step-label">Quote</span>
        </div>
        <div className={`step ${getStepStatus(QUOTE_STEPS.DOWNLOAD)}`}>
          <div className="step-number">5</div>
          <span className="step-label">Download</span>
        </div>
      </div>
    </div>
  );
};

export default GlobalProgress; 