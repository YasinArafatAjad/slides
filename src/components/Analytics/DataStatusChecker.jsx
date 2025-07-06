import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationTriangle, FaSpinner, FaDatabase, FaChartLine } from 'react-icons/fa';

const DataStatusChecker = () => {
  const [status, setStatus] = useState({
    serverHealth: null,
    ga4Connection: null,
    dataSource: 'checking',
    lastCheck: null,
    loading: true
  });

  const checkDataStatus = async () => {
    setStatus(prev => ({ ...prev, loading: true }));
    
    try {
      // Check server health
      const healthResponse = await fetch(`${import.meta.env.VITE_ANALYTICS_API_URL?.replace('/analytics', '')}/health`);
      const healthData = await healthResponse.json();
      
      // Check if we can get real analytics data
      const analyticsResponse = await fetch(`${import.meta.env.VITE_ANALYTICS_API_URL}/realtime`);
      const analyticsData = await analyticsResponse.json();
      
      // Determine if data is real or fallback
      const isRealData = healthData.ga4Connected && !healthData.ga4Error;
      
      setStatus({
        serverHealth: healthData,
        ga4Connection: healthData.ga4Connected,
        dataSource: isRealData ? 'real' : 'fallback',
        lastCheck: new Date(),
        loading: false,
        analyticsData: analyticsData
      });
      
    } catch (error) {
      setStatus({
        serverHealth: { status: 'ERROR', error: error.message },
        ga4Connection: false,
        dataSource: 'fallback',
        lastCheck: new Date(),
        loading: false
      });
    }
  };

  useEffect(() => {
    checkDataStatus();
    // Check every 30 seconds
    const interval = setInterval(checkDataStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (isConnected) => {
    if (status.loading) return <FaSpinner className="animate-spin" />;
    return isConnected ? <FaCheckCircle className="text-green-500" /> : <FaExclamationTriangle className="text-yellow-500" />;
  };

  const getDataSourceInfo = () => {
    switch (status.dataSource) {
      case 'real':
        return {
          icon: <FaChartLine className="text-green-500" />,
          text: 'Real GA4 Data',
          description: 'Connected to Google Analytics 4 - showing actual website data',
          color: 'border-green-500 bg-green-50 dark:bg-green-900/20'
        };
      case 'fallback':
        return {
          icon: <FaDatabase className="text-yellow-500" />,
          text: 'Demo Data',
          description: 'Using fallback data - GA4 connection not established',
          color: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
        };
      default:
        return {
          icon: <FaSpinner className="animate-spin text-blue-500" />,
          text: 'Checking...',
          description: 'Verifying data source connection',
          color: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
        };
    }
  };

  const dataInfo = getDataSourceInfo();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-xl border-2 ${dataInfo.color} mb-8`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-2xl">
            {dataInfo.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {dataInfo.text}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {dataInfo.description}
            </p>
            {status.lastCheck && (
              <p className="text-xs text-gray-500 mt-1">
                Last checked: {status.lastCheck.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
        
        <button
          onClick={checkDataStatus}
          disabled={status.loading}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg transition-colors"
        >
          {status.loading ? <FaSpinner className="animate-spin" /> : 'Refresh'}
        </button>
      </div>

      {/* Detailed Status */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-2">
          {getStatusIcon(status.serverHealth?.status === 'OK')}
          <span className="text-sm">
            Server: {status.serverHealth?.status || 'Unknown'}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {getStatusIcon(status.ga4Connection)}
          <span className="text-sm">
            GA4: {status.ga4Connection ? 'Connected' : 'Disconnected'}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <FaDatabase className={status.dataSource === 'real' ? 'text-green-500' : 'text-yellow-500'} />
          <span className="text-sm">
            Data: {status.dataSource === 'real' ? 'Live' : 'Demo'}
          </span>
        </div>
      </div>

      {/* GA4 Configuration Info */}
      {status.serverHealth?.environment && (
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Configuration:</h4>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
            <div>Property ID: {status.serverHealth.environment.propertyId}</div>
            <div>Project: {status.serverHealth.environment.projectId}</div>
            <div>Client Email: {status.serverHealth.environment.clientEmail}</div>
            <div>Measurement ID: {import.meta.env.VITE_GA4_MEASUREMENT_ID}</div>
          </div>
        </div>
      )}

      {/* Error Details */}
      {status.serverHealth?.ga4Error && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
          <h4 className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">GA4 Connection Error:</h4>
          <p className="text-xs text-red-600 dark:text-red-400">
            {status.serverHealth.ga4Error.message}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default DataStatusChecker;