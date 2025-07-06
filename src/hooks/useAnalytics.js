import { useState, useEffect, useCallback } from 'react';
import ga4Service from '../services/ga4Service';

export const useAnalytics = (dateRange = '7d') => {
  const [data, setData] = useState({
    keyMetrics: null,
    visitorTrends: [],
    pageViews: [],
    deviceData: [],
    trafficSources: [],
    detailedTrafficSources: [],
    realtimeData: [],
    loading: true,
    error: null,
    lastUpdated: null,
    serverStatus: null
  });

  const [refreshInterval, setRefreshInterval] = useState(null);

  const fetchAnalyticsData = useCallback(async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }));

      // Check server health first
      const health = await ga4Service.checkHealth();
      
      const [
        keyMetrics,
        visitorTrends,
        pageViews,
        deviceData,
        trafficSources,
        detailedTrafficSources,
        realtimeData
      ] = await Promise.all([
        ga4Service.getKeyMetrics(dateRange),
        ga4Service.getVisitorTrends(dateRange),
        ga4Service.getPageViews(dateRange),
        ga4Service.getDeviceData(dateRange),
        ga4Service.getTrafficSources(dateRange),
        ga4Service.getDetailedTrafficSources(dateRange),
        ga4Service.getRealtimeData()
      ]);

      setData({
        keyMetrics,
        visitorTrends,
        pageViews,
        deviceData,
        trafficSources,
        detailedTrafficSources,
        realtimeData,
        loading: false,
        error: health.status === 'ERROR' ? `Server: ${health.error}` : null,
        lastUpdated: new Date(),
        serverStatus: health
      });
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      setData(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to connect to analytics server. Using fallback data.',
        lastUpdated: new Date(),
        serverStatus: { status: 'ERROR', ga4Connected: false, error: error.message }
      }));
    }
  }, [dateRange]);

  // Initial data fetch
  useEffect(() => {
    fetchAnalyticsData();
  }, [fetchAnalyticsData]);

  // Set up auto-refresh for real-time data
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        // Only refresh real-time data more frequently
        const realtimeData = await ga4Service.getRealtimeData();
        setData(prev => ({
          ...prev,
          realtimeData,
          lastUpdated: new Date()
        }));
      } catch (error) {
        console.error('Error refreshing real-time data:', error);
      }
    }, 30000); // Refresh every 30 seconds

    setRefreshInterval(interval);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  // Refresh all data when date range changes
  useEffect(() => {
    fetchAnalyticsData();
  }, [dateRange, fetchAnalyticsData]);

  const refreshData = useCallback(() => {
    fetchAnalyticsData();
  }, [fetchAnalyticsData]);

  return {
    ...data,
    refreshData,
    isLive: data.serverStatus?.status === 'OK' && !!refreshInterval,
    isGA4Connected: data.serverStatus?.ga4Connected || false
  };
};

export default useAnalytics;