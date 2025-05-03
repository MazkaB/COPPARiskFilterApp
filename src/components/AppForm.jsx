import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../api-config';

const AppForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    app_name: '',
    developerCountry: '',
    countryCode: '',
    userRatingCount: 0,
    primaryGenreName: '',
    downloads: '',
    deviceType: '',
    hasPrivacyLink: false,
    hasTermsOfServiceLink: false,
    hasTermsOfServiceLinkRating: 'low',
    isCorporateEmailScore: 0,
    adSpent: 0,
    appAge: 0,
    averageUserRating: 0,
    appContentBrandSafetyRating: 'low',
    appDescriptionBrandSafetyRating: 'low',
    mfaRating: 'low'
  });
  
  const [options, setOptions] = useState({
    developerCountry: [],
    countryCode: [],
    primaryGenreName: [],
    deviceType: [],
    safetyRatings: [],
    downloadRanges: []
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch form options
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(`${API_URL}/form-options`);
        setOptions(response.data);
      } catch (err) {
        console.error('Error fetching form options:', err);
        setError('Failed to load form options. Please try again later.');
      }
    };
    
    fetchOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API_URL}/submit`, formData);
      
      if (response.data) {
        onSubmitSuccess(response.data);
        
        // Reset form
        setFormData({
          app_name: '',
          developerCountry: '',
          countryCode: '',
          userRatingCount: 0,
          primaryGenreName: '',
          downloads: '',
          deviceType: '',
          hasPrivacyLink: false,
          hasTermsOfServiceLink: false,
          hasTermsOfServiceLinkRating: 'low',
          isCorporateEmailScore: 0,
          adSpent: 0,
          appAge: 0,
          averageUserRating: 0,
          appContentBrandSafetyRating: 'low',
          appDescriptionBrandSafetyRating: 'low',
          mfaRating: 'low'
        });
      }
    } catch (err) {
      console.error('Error submitting application:', err);
      setError(err.response?.data?.error || 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Submit Your Application</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Application Name */}
          <div className="col-span-2">
            <label className="block text-gray-700 mb-1">Application Name *</label>
            <input
              type="text"
              name="app_name"
              value={formData.app_name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Developer Country */}
          <div>
            <label className="block text-gray-700 mb-1">Developer Country *</label>
            <select
              name="developerCountry"
              value={formData.developerCountry}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Country</option>
              {options.developerCountry.map((country, idx) => (
                <option key={idx} value={country}>{country}</option>
              ))}
            </select>
          </div>
          
          {/* Country Code */}
          <div>
            <label className="block text-gray-700 mb-1">Target Region</label>
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Region</option>
              {options.countryCode.map((code, idx) => (
                <option key={idx} value={code}>{code}</option>
              ))}
            </select>
          </div>
          
          {/* Primary Genre */}
          <div>
            <label className="block text-gray-700 mb-1">Primary Genre *</label>
            <select
              name="primaryGenreName"
              value={formData.primaryGenreName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Genre</option>
              {options.primaryGenreName.map((genre, idx) => (
                <option key={idx} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
          
          {/* Device Type */}
          <div>
            <label className="block text-gray-700 mb-1">Device Type</label>
            <select
              name="deviceType"
              value={formData.deviceType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Device Type</option>
              {options.deviceType.map((type, idx) => (
                <option key={idx} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          {/* Downloads */}
          <div>
            <label className="block text-gray-700 mb-1">Download Range</label>
            <select
              name="downloads"
              value={formData.downloads}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Download Range</option>
              {options.downloadRanges.map((range, idx) => (
                <option key={idx} value={range}>{range}</option>
              ))}
            </select>
          </div>
          
          {/* User Rating Count */}
          <div>
            <label className="block text-gray-700 mb-1">User Rating Count</label>
            <input
              type="number"
              name="userRatingCount"
              value={formData.userRatingCount}
              onChange={handleChange}
              min="0"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Average User Rating */}
          <div>
            <label className="block text-gray-700 mb-1">Average User Rating</label>
            <input
              type="number"
              name="averageUserRating"
              value={formData.averageUserRating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* App Age */}
          <div>
            <label className="block text-gray-700 mb-1">App Age (days)</label>
            <input
              type="number"
              name="appAge"
              value={formData.appAge}
              onChange={handleChange}
              min="0"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Is Corporate Email Score */}
          <div>
            <label className="block text-gray-700 mb-1">Corporate Email Score (0-100)</label>
            <input
              type="number"
              name="isCorporateEmailScore"
              value={formData.isCorporateEmailScore}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Ad Spent */}
          <div>
            <label className="block text-gray-700 mb-1">Ad Spent (USD)</label>
            <input
              type="number"
              name="adSpent"
              value={formData.adSpent}
              onChange={handleChange}
              min="0"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* App Content Brand Safety Rating */}
          <div>
            <label className="block text-gray-700 mb-1">App Content Safety Rating</label>
            <select
              name="appContentBrandSafetyRating"
              value={formData.appContentBrandSafetyRating}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {options.safetyRatings.map((rating, idx) => (
                <option key={idx} value={rating}>{rating}</option>
              ))}
            </select>
          </div>
          
          {/* App Description Brand Safety Rating */}
          <div>
            <label className="block text-gray-700 mb-1">App Description Safety Rating</label>
            <select
              name="appDescriptionBrandSafetyRating"
              value={formData.appDescriptionBrandSafetyRating}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {options.safetyRatings.map((rating, idx) => (
                <option key={idx} value={rating}>{rating}</option>
              ))}
            </select>
          </div>
          
          {/* MFA Rating */}
          <div>
            <label className="block text-gray-700 mb-1">MFA Rating</label>
            <select
              name="mfaRating"
              value={formData.mfaRating}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {options.safetyRatings.map((rating, idx) => (
                <option key={idx} value={rating}>{rating}</option>
              ))}
            </select>
          </div>
          
          {/* Terms of Service Link Rating */}
          <div>
            <label className="block text-gray-700 mb-1">Terms of Service Quality</label>
            <select
              name="hasTermsOfServiceLinkRating"
              value={formData.hasTermsOfServiceLinkRating}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {options.safetyRatings.map((rating, idx) => (
                <option key={idx} value={rating}>{rating}</option>
              ))}
            </select>
          </div>
          
          {/* Privacy and Terms Checkboxes */}
          <div className="col-span-2 mt-4">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                name="hasPrivacyLink"
                id="hasPrivacyLink"
                checked={formData.hasPrivacyLink}
                onChange={handleChange}
                className="h-4 w-4 mr-2"
              />
              <label htmlFor="hasPrivacyLink" className="text-gray-700">
                App has a Privacy Policy link
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                name="hasTermsOfServiceLink"
                id="hasTermsOfServiceLink"
                checked={formData.hasTermsOfServiceLink}
                onChange={handleChange}
                className="h-4 w-4 mr-2"
              />
              <label htmlFor="hasTermsOfServiceLink" className="text-gray-700">
                App has a Terms of Service link
              </label>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white font-medium ${
              loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Submitting...' : 'Submit Application for Assessment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppForm;