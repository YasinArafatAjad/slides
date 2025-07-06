class GA4Service {
  constructor() {
    this.baseUrl = import.meta.env.VITE_ANALYTICS_API_URL || 'http://localhost:3001/api/analytics';
  }

  // Get real-time active users
  async getRealtimeData() {
    try {
      const response = await fetch(`${this.baseUrl}/realtime`);
      if (!response.ok) throw new Error('Failed to fetch realtime data');
      return await response.json();
    } catch (error) {
      console.error('Error fetching realtime data:', error);
      return this.getFallbackRealtimeData();
    }
  }

  // Get visitor trends for the specified date range
  async getVisitorTrends(dateRange = '7d') {
    try {
      const response = await fetch(`${this.baseUrl}/visitors?range=${dateRange}`);
      if (!response.ok) throw new Error('Failed to fetch visitor trends');
      return await response.json();
    } catch (error) {
      console.error('Error fetching visitor trends:', error);
      return this.getFallbackVisitorData();
    }
  }

  // Get page views data
  async getPageViews(dateRange = '7d') {
    try {
      const response = await fetch(`${this.baseUrl}/pageviews?range=${dateRange}`);
      if (!response.ok) throw new Error('Failed to fetch page views');
      return await response.json();
    } catch (error) {
      console.error('Error fetching page views:', error);
      return this.getFallbackPageViewsData();
    }
  }

  // Get device breakdown
  async getDeviceData(dateRange = '7d') {
    try {
      const response = await fetch(`${this.baseUrl}/devices?range=${dateRange}`);
      if (!response.ok) throw new Error('Failed to fetch device data');
      return await response.json();
    } catch (error) {
      console.error('Error fetching device data:', error);
      return this.getFallbackDeviceData();
    }
  }

  // Get traffic sources
  async getTrafficSources(dateRange = '7d') {
    try {
      const response = await fetch(`${this.baseUrl}/traffic-sources?range=${dateRange}`);
      if (!response.ok) throw new Error('Failed to fetch traffic sources');
      return await response.json();
    } catch (error) {
      console.error('Error fetching traffic sources:', error);
      return this.getFallbackTrafficSourcesData();
    }
  }

  // Get key metrics
  async getKeyMetrics(dateRange = '7d') {
    try {
      const response = await fetch(`${this.baseUrl}/metrics?range=${dateRange}`);
      if (!response.ok) throw new Error('Failed to fetch key metrics');
      return await response.json();
    } catch (error) {
      console.error('Error fetching key metrics:', error);
      return this.getFallbackKeyMetrics();
    }
  }

  // Check server health and GA4 connection
  async checkHealth() {
    try {
      const response = await fetch(`${this.baseUrl.replace('/analytics', '')}/health`);
      if (!response.ok) throw new Error('Server not responding');
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      return { status: 'ERROR', ga4Connected: false, error: error.message };
    }
  }

  // Fallback data methods (for when GA4 is not available)
  getFallbackRealtimeData() {
    return [
      { page: '/portfolio', visitors: Math.floor(Math.random() * 50) + 10, time: '2 min ago' },
      { page: '/services', visitors: Math.floor(Math.random() * 30) + 5, time: '3 min ago' },
      { page: '/', visitors: Math.floor(Math.random() * 60) + 20, time: '1 min ago' },
      { page: '/contact', visitors: Math.floor(Math.random() * 20) + 5, time: '4 min ago' },
      { page: '/blog', visitors: Math.floor(Math.random() * 15) + 3, time: '5 min ago' },
    ];
  }

  getFallbackVisitorData() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
      name: day,
      value: Math.floor(Math.random() * 1000) + 500
    }));
  }

  getFallbackPageViewsData() {
    const pages = ['Home', 'Portfolio', 'Services', 'About', 'Contact', 'Blog'];
    return pages.map(page => ({
      name: page,
      value: Math.floor(Math.random() * 3000) + 1000
    }));
  }

  getFallbackDeviceData() {
    return [
      { name: 'Desktop', value: Math.floor(Math.random() * 5) + 3 },
      { name: 'Mobile', value: Math.floor(Math.random() * 8) + 4 },
      { name: 'Tablet', value: Math.floor(Math.random() * 3) + 1 },
    ];
  }

  getFallbackTrafficSourcesData() {
    return [
      { name: 'Organic Search', value: Math.floor(Math.random() * 20) + 30 },
      { name: 'Direct', value: Math.floor(Math.random() * 15) + 20 },
      { name: 'Social Media', value: Math.floor(Math.random() * 15) + 15 },
      { name: 'Referral', value: Math.floor(Math.random() * 10) + 5 },
      { name: 'Email', value: Math.floor(Math.random() * 8) + 2 },
    ];
  }

  getFallbackKeyMetrics() {
    return {
      totalVisitors: (Math.floor(Math.random() * 5000) + 10000).toLocaleString(),
      pageViews: (Math.floor(Math.random() * 10000) + 20000).toLocaleString(),
      avgSessionDuration: `${Math.floor(Math.random() * 2) + 2}m ${Math.floor(Math.random() * 60)}s`,
      bounceRate: `${Math.floor(Math.random() * 20) + 25}.${Math.floor(Math.random() * 10)}%`,
      changes: {
        visitors: `+${(Math.random() * 20 + 5).toFixed(1)}%`,
        pageViews: `+${(Math.random() * 15 + 3).toFixed(1)}%`,
        duration: `+${(Math.random() * 25 + 8).toFixed(1)}%`,
        bounceRate: `-${(Math.random() * 10 + 2).toFixed(1)}%`
      }
    };
  }
}

export default new GA4Service();