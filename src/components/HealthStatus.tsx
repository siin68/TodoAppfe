import React from 'react';
import { useHealth } from '../hooks/useHealth';
import LoadingSpinner from './LoadingSpinner';

const HealthStatus: React.FC = () => {
  const { health, dbTest, loading, error, refetch } = useHealth();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">System Health</h2>
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner size="lg" />
          <span className="ml-3 text-gray-600">Checking system health...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">System Health</h2>
        <div className="text-red-600 p-4 bg-red-50 rounded-lg">
          <p className="font-medium">Error: {error}</p>
          <button
            onClick={refetch}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">System Health</h2>
        <button
          onClick={refetch}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-4">
        {/* Server Status */}
        {health && (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="font-medium text-gray-700">Server Status</span>
              <div className="text-sm text-gray-500">
                Uptime: {Math.floor(health.uptime / 60)} minutes
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-green-600 font-medium">{health.status}</span>
            </div>
          </div>
        )}

        {/* Database Status */}
        {health && (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">Database</span>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                health.database === 'Connected' ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span className={`font-medium ${
                health.database === 'Connected' ? 'text-green-600' : 'text-red-600'
              }`}>
                {health.database}
              </span>
            </div>
          </div>
        )}

        {/* Database Test */}
        {dbTest && (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="font-medium text-gray-700">Database Test</span>
              {dbTest.version && (
                <div className="text-sm text-gray-500">
                  Version: {dbTest.version.split(' ')[0]}
                </div>
              )}
            </div>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                dbTest.success ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span className={`font-medium ${
                dbTest.success ? 'text-green-600' : 'text-red-600'
              }`}>
                {dbTest.success ? 'Success' : 'Failed'}
              </span>
            </div>
          </div>
        )}
      </div>

      {health && (
        <div className="mt-4 text-xs text-gray-500">
          Last updated: {new Date(health.timestamp).toLocaleString()}
        </div>
      )}
    </div>
  );
};

export default HealthStatus;
