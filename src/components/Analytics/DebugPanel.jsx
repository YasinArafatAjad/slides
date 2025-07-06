import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  Settings,
  Database,
  Wifi,
  WifiOff
} from 'lucide-react';

const DebugPanel = () => {
  const [debugInfo, setDebugInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkConnection = async () => {
    setLoading(true);
    try {
      // Check backend health
      const healthResponse = await fetch('http://localhost:3001/api/health');
      const healthData = await healthResponse.json();
      
      // Test each endpoint
      const endpoints = [
        { name: 'Health Check', url: '/api/health' },
        { name: 'Real-time Data', url: '/api/analytics/realtime' },
        { name: 'Visitor Trends', url: '/api/analytics/visitors?range=7d' },
        { name: 'Key Metrics', url: '/api/analytics/metrics?range=7d' }
      ];

      const endpointTests = await Promise.all(
        endpoints.map(async (endpoint) => {
          try {
            const response = await fetch(`http://localhost:3001${endpoint.url}`);
            const data = await response.json();
            return {
              ...endpoint,
              status: response.ok ? 'success' : 'error',
              data: data,
              error: response.ok ? null : `HTTP ${response.status}`
            };
          } catch (error) {
            return {
              ...endpoint,
              status: 'error',
              data: null,
              error: error.message
            };
          }
        })
      );

      setDebugInfo({
        health: healthData,
        endpoints: endpointTests,
        environment: {
          GA4_PROPERTY_ID: import.meta.env.VITE_GA4_PROPERTY_ID || 'Not set',
          ANALYTICS_API_URL: import.meta.env.VITE_ANALYTICS_API_URL || 'Not set',
          NODE_ENV: import.meta.env.NODE_ENV || 'development'
        }
      });
    } catch (error) {
      setDebugInfo({
        error: error.message,
        health: { status: 'ERROR', error: 'Cannot connect to backend' }
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  if (!debugInfo && loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center">
          <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
          <span className="ml-2">Checking connection...</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Connection Debug Panel
        </h3>
        <button
          onClick={checkConnection}
          disabled={loading}
          className="flex items-center space-x-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {debugInfo && (
        <div className="space-y-6">
          {/* Server Health */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
              <Database className="w-4 h-4 mr-2" />
              Server Health
            </h4>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                {debugInfo.health?.status === 'OK' ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <span className="font-medium">
                  Status: {debugInfo.health?.status || 'Unknown'}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                {debugInfo.health?.ga4Connected ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <span>
                  GA4 Connected: {debugInfo.health?.ga4Connected ? 'Yes' : 'No'}
                </span>
              </div>
              {debugInfo.health?.error && (
                <div className="mt-2 text-red-600 dark:text-red-400 text-sm">
                  Error: {debugInfo.health.error}
                </div>
              )}
            </div>
          </div>

          {/* Environment Variables */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
              Environment Configuration
            </h4>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
              {Object.entries(debugInfo.environment || {}).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                    {key}:
                  </span>
                  <span className="text-sm font-mono text-gray-900 dark:text-white">
                    {value === 'Not set' ? (
                      <span className="text-red-500">Not set</span>
                    ) : (
                      value.length > 20 ? `${value.substring(0, 20)}...` : value
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* API Endpoints */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
              API Endpoints Status
            </h4>
            <div className="space-y-3">
              {debugInfo.endpoints?.map((endpoint, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{endpoint.name}</span>
                    <div className="flex items-center space-x-2">
                      {endpoint.status === 'success' ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className="text-sm capitalize">{endpoint.status}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    URL: {endpoint.url}
                  </div>
                  {endpoint.error && (
                    <div className="text-sm text-red-600 dark:text-red-400 mt-1">
                      Error: {endpoint.error}
                    </div>
                  )}
                  {endpoint.data && (
                    <details className="mt-2">
                      <summary className="text-sm text-blue-600 dark:text-blue-400 cursor-pointer">
                        View Response Data
                      </summary>
                      <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
                        {JSON.stringify(endpoint.data, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Troubleshooting Steps */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              Troubleshooting Steps
            </h4>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <ol className="list-decimal list-inside space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
                <li>Check if the backend server is running on port 3001</li>
                <li>Verify your .env file contains all required GA4 credentials</li>
                <li>Ensure GA4_PROPERTY_ID is set correctly (numeric value)</li>
                <li>Check that the service account has access to your GA4 property</li>
                <li>Verify GOOGLE_PRIVATE_KEY format (should include \n for line breaks)</li>
                <li>Test the health endpoint: <code>http://localhost:3001/api/health</code></li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DebugPanel;