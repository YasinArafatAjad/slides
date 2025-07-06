import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Clock, 
  Globe, 
  Smartphone, 
  Monitor, 
  Tablet,
  Calendar,
  Download,
  Share2,
  MapPin,
  RefreshCw,
  Wifi,
  WifiOff,
  Settings,
  HelpCircle,
  Bug,
  ExternalLink
} from 'lucide-react';
import StatsCard from './StatsCard';
import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import PieChart from './charts/PieChart';
import DetailedTrafficChart from './charts/DetailedTrafficChart';
import SetupGuide from './SetupGuide';
import DebugPanel from './DebugPanel';
import DataStatusChecker from './DataStatusChecker';
import useAnalytics from '../../hooks/useAnalytics';

const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState('7d');
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const {
    keyMetrics,
    visitorTrends,
    pageViews,
    deviceData,
    trafficSources,
    detailedTrafficSources,
    realtimeData,
    loading,
    error,
    lastUpdated,
    refreshData,
    isLive,
    isGA4Connected
  } = useAnalytics(dateRange);

  const dateRanges = [
    { value: '1d', label: 'Last 24 hours' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
  ];

  const formatLastUpdated = (date) => {
    if (!date) return '';
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  const handleExportClick = () => {
    // Just show an alert for now - no actual PDF generation
    alert('Export functionality coming soon!');
  };

  if (loading && !keyMetrics) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 dark:text-gray-400">Loading analytics data...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" id="analytics-content">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 pt-8 px-8">
        <div className="flex items-center space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {dateRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {isLive ? 'Live' : 'Offline'}
            </span>
          </div>

          {lastUpdated && (
            <span className="text-xs text-gray-500 dark:text-gray-500">
              Updated {formatLastUpdated(lastUpdated)}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.button
            onClick={() => setShowDebugPanel(!showDebugPanel)}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200"
          >
            <Bug className="w-4 h-4" />
            <span>Debug</span>
          </motion.button>

          <motion.button
            onClick={refreshData}
            disabled={loading}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg transition-colors duration-200"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </motion.button>

          <motion.button
            onClick={handleExportClick}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
          >
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </motion.button>
        </div>
      </div>

      {/* Data Status Checker */}
      <div className="px-8 mb-8">
        <DataStatusChecker />
      </div>

      {/* Debug Panel */}
      {showDebugPanel && (
        <div className="px-8 mb-8">
          <DebugPanel />
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-8 mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl"
        >
          <div className="flex items-center space-x-2">
            <WifiOff className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            <span className="text-yellow-800 dark:text-yellow-200">{error}</span>
          </div>
        </motion.div>
      )}

      {/* Key Metrics */}
      {keyMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-8" id="key-metrics">
          <StatsCard
            title="Total Visitors"
            value={keyMetrics.totalVisitors}
            change={keyMetrics.changes?.visitors}
            changeType="increase"
            icon={Users}
            color="primary"
          />
          <StatsCard
            title="Page Views"
            value={keyMetrics.pageViews}
            change={keyMetrics.changes?.pageViews}
            changeType="increase"
            icon={Eye}
            color="blue"
          />
          <StatsCard
            title="Avg. Session Duration"
            value={keyMetrics.avgSessionDuration}
            change={keyMetrics.changes?.duration}
            changeType="increase"
            icon={Clock}
            color="green"
          />
          <StatsCard
            title="Bounce Rate"
            value={keyMetrics.bounceRate}
            change={keyMetrics.changes?.bounceRate}
            changeType="decrease"
            icon={TrendingUp}
            color="purple"
          />
        </div>
      )}

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 px-8" id="charts-row-1">
        <LineChart data={visitorTrends} title="Visitor Trends" loading={loading} />
        <BarChart data={pageViews} title="Top Pages" loading={loading} />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 px-8" id="charts-row-2">
        <PieChart data={deviceData} title="Device Types" loading={loading} />
        <PieChart data={trafficSources} title="Traffic Sources Overview" loading={loading} />
      </div>

      {/* Enhanced Traffic Sources Section */}
      <div className="px-8 mb-8" id="detailed-traffic-sources">
        <DetailedTrafficChart 
          data={detailedTrafficSources || []} 
          title="Detailed Traffic Sources - Where Your Users Come From" 
          loading={loading} 
        />
      </div>

      {/* Real-time Activity */}
      <div className="px-8 mb-8" id="realtime-activity">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-3"></div>
              Real-time Activity
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Live users on your site
            </span>
          </div>
          
          <div className="space-y-3">
            {realtimeData?.slice(0, 5).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {item.page}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    {item.visitors} users
                  </span>
                  <span className="text-gray-500 dark:text-gray-500 text-xs">
                    {item.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* GA4 Connection Status */}
      <div className="px-8 pb-8" id="connection-status">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            Google Analytics 4 Integration
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${isGA4Connected ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Connection Status
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {isGA4Connected ? 'Connected to GA4' : 'Using demo data'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Wifi className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Data Freshness
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {lastUpdated ? formatLastUpdated(lastUpdated) : 'Never updated'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Calendar className="w-4 h-4 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Date Range
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {dateRanges.find(r => r.value === dateRange)?.label}
                </p>
              </div>
            </div>
          </div>

          {!isGA4Connected && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowSetupGuide(true)}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Setup Google Analytics</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Setup Guide Modal */}
      <SetupGuide 
        isOpen={showSetupGuide} 
        onClose={() => setShowSetupGuide(false)} 
      />
    </div>
  );
};

export default AnalyticsPage;