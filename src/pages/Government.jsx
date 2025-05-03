import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from '../components/Dashboard';
import API_URL from '../api-config';

const Government = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Fetch dashboard data and applications
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch dashboard data
        const dashboardResponse = await axios.get(`${API_URL}/dashboard`);
        setDashboardData(dashboardResponse.data);
        
        // Fetch all applications
        const appsResponse = await axios.get(`${API_URL}/applications`);
        setApplications(appsResponse.data);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
    // Set up polling for real-time updates
    const interval = setInterval(fetchData, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Fetch application details
  const fetchAppDetails = async (appId) => {
    try {
      const response = await axios.get(`${API_URL}/applications/${appId}`);
      setSelectedApp(response.data);
    } catch (err) {
      console.error('Error fetching app details:', err);
      setError('Failed to load application details.');
    }
  };
  
  // Handle app row click
  const handleAppClick = (appId) => {
    fetchAppDetails(appId);
    setActiveTab('details');
  };
  
  // Render loading state
  if (loading && !dashboardData) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
            <p className="mt-3 text-gray-700">Loading dashboard data...</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Render error state
  if (error && !dashboardData) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button 
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Government COPPA Risk Assessment Portal</h1>
          <p className="text-gray-600">
            Monitor and assess applications for COPPA compliance
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-gray-600">Last updated</div>
          <div className="text-gray-800 font-medium">
            {new Date().toLocaleString()}
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`mr-8 py-4 px-1 ${
              activeTab === 'dashboard'
                ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <i className="fas fa-chart-line mr-2"></i>
            Dashboard
          </button>
          
          <button
            onClick={() => setActiveTab('applications')}
            className={`mr-8 py-4 px-1 ${
              activeTab === 'applications'
                ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <i className="fas fa-mobile-alt mr-2"></i>
            All Applications
          </button>
          
          {selectedApp && (
            <button
              onClick={() => setActiveTab('details')}
              className={`mr-8 py-4 px-1 ${
                activeTab === 'details'
                  ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <i className="fas fa-info-circle mr-2"></i>
              Application Details
            </button>
          )}
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="tab-content">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <Dashboard data={dashboardData} />
        )}
        
        {/* All Applications Tab */}
        {activeTab === 'applications' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">All Submitted Applications</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      App Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Developer Country
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Genre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submission Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Risk Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((app) => (
                    <tr 
                      key={app.id}
                      onClick={() => handleAppClick(app.id)}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900">{app.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{app.app_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">{app.developer_country}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">{app.primary_genre_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">
                          {new Date(app.submission_date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">{(app.prediction_score * 100).toFixed(1)}%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          app.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {app.passed ? 'PASSED' : 'FAILED'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Application Details Tab */}
        {activeTab === 'details' && selectedApp && (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Application Details</h2>
              <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                selectedApp.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {selectedApp.passed ? 'PASSED' : 'FAILED'}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium border-b pb-2 mb-3">Basic Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">App Name</p>
                    <p className="font-medium">{selectedApp.app_name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Primary Genre</p>
                    <p className="font-medium">{selectedApp.primary_genre_name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Developer Country</p>
                    <p className="font-medium">{selectedApp.developer_country}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Target Region</p>
                    <p className="font-medium">{selectedApp.country_code || 'Not specified'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Device Type</p>
                    <p className="font-medium">{selectedApp.device_type || 'Not specified'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Downloads</p>
                    <p className="font-medium">{selectedApp.downloads || 'Not specified'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">App Age (days)</p>
                    <p className="font-medium">{selectedApp.app_age || 'Not specified'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Average Rating</p>
                    <p className="font-medium">{selectedApp.average_user_rating || 'Not rated'}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium border-b pb-2 mb-3">Privacy & Safety</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Privacy Policy</p>
                    <p className="font-medium">
                      {selectedApp.has_privacy_link ? 'Yes' : 'No'}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Terms of Service</p>
                    <p className="font-medium">
                      {selectedApp.has_terms_of_service_link ? 'Yes' : 'No'}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">ToS Quality Rating</p>
                    <p className="font-medium">{selectedApp.has_terms_of_service_link_rating}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Corporate Email Score</p>
                    <p className="font-medium">{selectedApp.is_corporate_email_score}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Content Safety Rating</p>
                    <p className="font-medium">{selectedApp.app_content_brand_safety_rating}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Description Safety Rating</p>
                    <p className="font-medium">{selectedApp.app_description_brand_safety_rating}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">MFA Rating</p>
                    <p className="font-medium">{selectedApp.mfa_rating}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Ad Spent (USD)</p>
                    <p className="font-medium">{selectedApp.ad_spent || 'Not specified'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 border-t pt-6">
              <h3 className="text-lg font-medium mb-3">Risk Assessment</h3>
              
              <div className="flex items-center mb-3">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full ${
                      selectedApp.prediction_score < 0.3 ? 'bg-green-500' :
                      selectedApp.prediction_score < 0.7 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${selectedApp.prediction_score * 100}%` }}
                  ></div>
                </div>
                <span className="ml-3 font-medium">{(selectedApp.prediction_score * 100).toFixed(1)}%</span>
              </div>
              
              <div className="bg-gray-50 rounded p-4 mt-4">
                <h4 className="font-medium mb-2">Assessment Result</h4>
                <p>
                  {selectedApp.passed 
                    ? `This application has passed our COPPA risk assessment with a score of ${(selectedApp.prediction_score * 100).toFixed(1)}%, indicating a lower risk of COPPA violations. It is approved for distribution in Indonesia.`
                    : `This application has failed our COPPA risk assessment with a score of ${(selectedApp.prediction_score * 100).toFixed(1)}%, indicating a higher risk of COPPA violations. It is not approved for distribution in Indonesia.`
                  }
                </p>
                
                {!selectedApp.passed && (
                  <div className="mt-3">
                    <h4 className="font-medium mb-1">Improvement Recommendations:</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                      {!selectedApp.has_privacy_link && (
                        <li>Add a comprehensive privacy policy to the application</li>
                      )}
                      {!selectedApp.has_terms_of_service_link && (
                        <li>Include terms of service documentation</li>
                      )}
                      {selectedApp.app_content_brand_safety_rating === 'low' && (
                        <li>Improve content safety measures</li>
                      )}
                      {selectedApp.primary_genre_name === 'Games' && (
                        <li>Games targeting children require additional privacy protections</li>
                      )}
                      <li>Ensure clear parental consent mechanisms are in place</li>
                      <li>Limit data collection to only what is necessary</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Government;