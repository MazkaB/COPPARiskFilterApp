import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import Developer from './pages/Developer';
import Government from './pages/Government';
import Navigation from './components/Navigation';
import './styles.css';

const App = () => {
  // State to track current role (developer or government)
  const [role, setRole] = useState(localStorage.getItem('role') || null);

  const selectRole = (selectedRole) => {
    setRole(selectedRole);
    localStorage.setItem('role', selectedRole);
  };

  // Role selection screen
  const RoleSelection = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            COPPA Risk Assessment System
          </h1>
          <p className="text-gray-600 mt-2">
            Indonesian Government Application Safety Monitoring
          </p>
        </div>
        
        <h2 className="text-xl font-semibold mb-6 text-center">Select Your Role</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            className="bg-blue-50 border border-blue-200 rounded-lg p-6 hover:shadow-md cursor-pointer transition-all"
            onClick={() => selectRole('developer')}
          >
            <div className="text-center mb-4">
              <div className="inline-block p-3 bg-blue-100 rounded-full">
                <i className="fas fa-code text-blue-600 text-3xl"></i>
              </div>
            </div>
            <h3 className="text-lg font-medium text-center mb-2">Application Developer</h3>
            <p className="text-gray-600 text-sm text-center">
              Submit your application for COPPA risk assessment and get instant feedback
            </p>
          </div>
          
          <div 
            className="bg-green-50 border border-green-200 rounded-lg p-6 hover:shadow-md cursor-pointer transition-all"
            onClick={() => selectRole('government')}
          >
            <div className="text-center mb-4">
              <div className="inline-block p-3 bg-green-100 rounded-full">
                <i className="fas fa-landmark text-green-600 text-3xl"></i>
              </div>
            </div>
            <h3 className="text-lg font-medium text-center mb-2">Government Official</h3>
            <p className="text-gray-600 text-sm text-center">
              View application assessment results and analytics dashboard
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Official system of the Indonesian Government</p>
          <p>Ministry of Communications and Information Technology</p>
        </div>
      </div>
    </div>
  );

  return (
    <Router basename="/coppa-risk">
      <div className="app">
        {role && <Navigation role={role} setRole={setRole} />}
        
        <Switch>
          <Route exact path="/">
            {role ? <Redirect to={`/${role}`} /> : <RoleSelection />}
          </Route>
          
          <Route path="/developer">
            {role === 'developer' ? <Developer /> : <Redirect to="/" />}
          </Route>
          
          <Route path="/government">
            {role === 'government' ? <Government /> : <Redirect to="/" />}
          </Route>
          
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;