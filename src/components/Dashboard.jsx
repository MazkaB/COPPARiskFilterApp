import React from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

const Dashboard = ({ data }) => {
  if (!data) return <div>Loading dashboard data...</div>;
  
  const { stats, recent_submissions, pass_rate_over_time } = data;
  
  // Format data for pie chart
  const pieData = [
    { name: 'Passed', value: stats.passed_count },
    { name: 'Failed', value: stats.failed_count }
  ];
  
  // Colors for charts
  const COLORS = ['#10B981', '#EF4444', '#3B82F6', '#F59E0B', '#8B5CF6'];
  
  // Format data for genre distribution chart
  const genreData = Object.entries(stats.data.genre_distribution || {})
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
  
  // Format data for country distribution chart
  const countryData = Object.entries(stats.data.country_distribution || {})
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
  
  return (
    <div className="dashboard">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-500 text-sm font-medium">Total Applications</h3>
          <p className="text-2xl font-bold text-gray-800">{stats.total_submissions}</p>
          <div className="flex items-center mt-1">
            <div className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium">
              Submissions
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-500 text-sm font-medium">Passed</h3>
          <p className="text-2xl font-bold text-green-600">{stats.passed_count}</p>
          <div className="flex items-center mt-1">
            <div className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">
              {((stats.passed_count / (stats.total_submissions || 1)) * 100).toFixed(1)}% Pass Rate
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-500 text-sm font-medium">Failed</h3>
          <p className="text-2xl font-bold text-red-600">{stats.failed_count}</p>
          <div className="flex items-center mt-1">
            <div className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-medium">
              {((stats.failed_count / (stats.total_submissions || 1)) * 100).toFixed(1)}% Fail Rate
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-500 text-sm font-medium">Average Risk Score</h3>
          <p className="text-2xl font-bold text-gray-800">{(stats.average_risk_score * 100).toFixed(1)}%</p>
          <div className="flex items-center mt-1">
            <div className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-medium">
              Risk Level
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Pass/Fail Distribution */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-700 font-medium mb-3">Pass/Fail Distribution</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Pass Rate Over Time */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-700 font-medium mb-3">Pass Rate Over Time</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={pass_rate_over_time}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="pass_rate" 
                  stroke="#10B981" 
                  name="Pass Rate (%)"
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* More Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Top Genres */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-700 font-medium mb-3">Top App Genres</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={genreData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#3B82F6" name="Number of Apps" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Top Developer Countries */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-700 font-medium mb-3">Top Developer Countries</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={countryData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8B5CF6" name="Number of Apps" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Recent Submissions */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="text-gray-700 font-medium mb-3">Recent Submissions</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  App Name
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
              {recent_submissions.map((app) => (
                <tr key={app.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{app.app_name}</div>
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
    </div>
  );
};

export default Dashboard;