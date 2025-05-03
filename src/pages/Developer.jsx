import React, { useState } from 'react';
import AppForm from '../components/AppForm';
import ResultCard from '../components/ResultCard';

const Developer = () => {
  const [result, setResult] = useState(null);
  const [showForm, setShowForm] = useState(true);
  
  const handleSubmitSuccess = (data) => {
    setResult(data);
    setShowForm(false);
  };
  
  const handleReset = () => {
    setResult(null);
    setShowForm(true);
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">App Developer Portal</h1>
        <p className="text-gray-600">
          Submit your application for COPPA risk assessment before distribution in Indonesia
        </p>
      </div>
      
      {showForm ? (
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <i className="fas fa-info-circle text-blue-500"></i>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  As per Indonesian regulations, all mobile applications must pass the COPPA Risk Assessment
                  before being distributed in Indonesia. Please provide accurate information about your app.
                </p>
              </div>
            </div>
          </div>
          
          <AppForm onSubmitSuccess={handleSubmitSuccess} />
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Assessment Result</h2>
          <ResultCard result={result} />
          
          <div className="mt-6 text-center">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-800"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Developer;