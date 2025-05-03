import React from 'react';

const ResultCard = ({ result }) => {
  if (!result) return null;
  
  const { app_name, prediction, passed } = result;
  const score = prediction?.prediction_score || 0;
  const riskLevel = prediction?.risk_level || 'Unknown';
  
  // Calculate percentage for progress bar
  const percentage = Math.round(score * 100);
  
  // Determine colors based on risk level
  const getColorClasses = () => {
    if (riskLevel === 'Low') {
      return {
        bg: 'bg-green-100',
        border: 'border-green-300',
        text: 'text-green-800',
        progressBg: 'bg-green-200',
        progressFill: 'bg-green-500',
        statusBg: 'bg-green-500'
      };
    } else if (riskLevel === 'Medium') {
      return {
        bg: 'bg-yellow-100',
        border: 'border-yellow-300',
        text: 'text-yellow-800',
        progressBg: 'bg-yellow-200',
        progressFill: 'bg-yellow-500',
        statusBg: 'bg-yellow-500'
      };
    } else {
      return {
        bg: 'bg-red-100',
        border: 'border-red-300',
        text: 'text-red-800',
        progressBg: 'bg-red-200',
        progressFill: 'bg-red-500',
        statusBg: 'bg-red-500'
      };
    }
  };
  
  const colors = getColorClasses();
  
  return (
    <div className={`${colors.bg} ${colors.border} border rounded-lg p-6 shadow-md`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">{app_name}</h3>
        <div className={`${passed ? 'bg-green-500' : 'bg-red-500'} text-white px-3 py-1 rounded-full text-sm font-medium`}>
          {passed ? 'PASSED' : 'FAILED'}
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className={`${colors.text} font-medium text-sm`}>COPPA Risk Score</span>
          <span className={`${colors.text} font-medium text-sm`}>{percentage}%</span>
        </div>
        <div className={`w-full ${colors.progressBg} rounded-full h-2.5`}>
          <div
            className={`${colors.progressFill} h-2.5 rounded-full`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <span className="text-gray-600 text-sm block">Risk Level</span>
          <span className={`${colors.text} font-semibold`}>{riskLevel}</span>
        </div>
        
        <div>
          <span className="text-gray-600 text-sm block">Exact Score</span>
          <span className={`${colors.text} font-semibold`}>{score.toFixed(4)}</span>
        </div>
      </div>
      
      <div className="mt-4 border-t pt-4">
        <p className="text-gray-700 text-sm">
          {passed ? (
            <span>
              <span className="font-medium text-green-600">Congratulations!</span> Your application has passed our COPPA Risk Assessment. It is eligible for distribution in Indonesia.
            </span>
          ) : (
            <span>
              <span className="font-medium text-red-600">Action Required:</span> Your application did not pass our COPPA Risk Assessment. Please review your privacy practices and resubmit.
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ResultCard;