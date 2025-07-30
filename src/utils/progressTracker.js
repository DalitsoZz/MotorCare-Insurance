export const QUOTE_STEPS = {
  VEHICLE_DETAILS: 'vehicle_details',
  DRIVER_DETAILS: 'driver_details', 
  COVERAGE_OPTIONS: 'coverage_options',
  QUOTE_SUMMARY: 'quote_summary',
  DOWNLOAD: 'download'
};

export const STEP_WEIGHTS = {
  [QUOTE_STEPS.VEHICLE_DETAILS]: 25, // 25% of total progress
  [QUOTE_STEPS.DRIVER_DETAILS]: 25,  // 25% of total progress
  [QUOTE_STEPS.COVERAGE_OPTIONS]: 25, // 25% of total progress
  [QUOTE_STEPS.QUOTE_SUMMARY]: 15,   // 15% of total progress
  [QUOTE_STEPS.DOWNLOAD]: 10         // 10% of total progress
};

export const getGlobalProgress = () => {
  const progressData = JSON.parse(localStorage.getItem('quoteProgress') || '{}');
  let totalProgress = 0;
  
  Object.keys(STEP_WEIGHTS).forEach(step => {
    const stepProgress = progressData[step] || 0;
    totalProgress += (stepProgress * STEP_WEIGHTS[step]) / 100;
  });
  
  return Math.min(100, Math.round(totalProgress));
};

export const updateStepProgress = (step, progress) => {
  const progressData = JSON.parse(localStorage.getItem('quoteProgress') || '{}');
  progressData[step] = Math.min(100, Math.max(0, progress));
  localStorage.setItem('quoteProgress', JSON.stringify(progressData));
};

export const resetProgress = () => {
  localStorage.removeItem('quoteProgress');
};

export const getStepProgress = (step) => {
  const progressData = JSON.parse(localStorage.getItem('quoteProgress') || '{}');
  return progressData[step] || 0;
}; 