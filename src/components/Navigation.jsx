import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ role, setRole }) => {
  const handleLogout = () => {
    localStorage.removeItem('role');
    setRole(null);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/assets/indonesia-logo.png" 
            alt="Indonesia Logo" 
            className="h-8 mr-3"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/32'; }}
          />
          <span className="font-semibold text-xl">COPPA Risk Assessment</span>
        </div>
        
        <div className="flex items-center">
          {role === 'developer' && (
            <Link to="/developer" className="px-3 py-2 rounded hover:bg-gray-700 mr-2">
              <i className="fas fa-code mr-1"></i> Developer Dashboard
            </Link>
          )}
          
          {role === 'government' && (
            <Link to="/government" className="px-3 py-2 rounded hover:bg-gray-700 mr-2">
              <i className="fas fa-chart-line mr-1"></i> Government Dashboard
            </Link>
          )}
          
          <button 
            onClick={handleLogout}
            className="px-3 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
          >
            <i className="fas fa-sign-out-alt mr-1"></i> Change Role
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;