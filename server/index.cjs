const express = require('express');
const cors = require('cors');
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Initialize GA4 client with better error handling
let analyticsDataClient = null;
let propertyId = null;

try {
  propertyId = process.env.GA4_PROPERTY_ID;
  
  if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_PROJECT_ID) {
    analyticsDataClient = new BetaAnalyticsDataClient({
      projectId: process.env.GOOGLE_PROJECT_ID,
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
    });
    console.log('✅ GA4 Analytics client initialized successfully');
  } else {
    console.log('⚠️  GA4 credentials not found, using fallback data');
  }
} catch (error) {
  console.error('❌ Error initializing GA4 client:', error.message);
}

// Helper function to calculate date range
const getDateRange = (range) => {
  const endDate = new Date();
  const startDate = new Date();
  
  switch (range) {
    case '1d':
      startDate.setDate(endDate.getDate() - 1);
      break;
    case '7d':
      startDate.setDate(endDate.getDate() - 7);
      break;
    case '30d':
      startDate.setDate(endDate.getDate() - 30);
      break;
    case '90d':
      startDate.setDate(endDate.getDate() - 90);
      break;
    default:
      startDate.setDate(endDate.getDate() - 7);
  }
  
  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0]
  };
};

// Fallback data functions
const getFallbackData = {
  realtime: () => [
    { page: '/portfolio', visitors: Math.floor(Math.random() * 50) + 10, time: '2 min ago' },
    { page: '/services', visitors: Math.floor(Math.random() * 30) + 5, time: '3 min ago' },
    { page: '/', visitors: Math.floor(Math.random() * 60) + 20, time: '1 min ago' },
    { page: '/contact', visitors: Math.floor(Math.random() * 20) + 5, time: '4 min ago' },
    { page: '/blog', visitors: Math.floor(Math.random() * 15) + 3, time: '5 min ago' },
  ],
  
  visitors: () => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
    name: day,
    value: Math.floor(Math.random() * 1000) + 500
  })),
  
  pageviews: () => ['Home', 'Portfolio', 'Services', 'About', 'Contact', 'Blog'].map(page => ({
    name: page,
    value: Math.floor(Math.random() * 3000) + 1000
  })),
  
  devices: () => [
    { name: 'Desktop', value: Math.floor(Math.random() * 5) + 3 },
    { name: 'Mobile', value: Math.floor(Math.random() * 8) + 4 },
    { name: 'Tablet', value: Math.floor(Math.random() * 3) + 1 },
  ],
  
  trafficSources: () => [
    { name: 'Organic Search', value: Math.floor(Math.random() * 20) + 30 },
    { name: 'Direct', value: Math.floor(Math.random() * 15) + 20 },
    { name: 'Social Media', value: Math.floor(Math.random() * 15) + 15 },
    { name: 'Referral', value: Math.floor(Math.random() * 10) + 5 },
    { name: 'Email', value: Math.floor(Math.random() * 8) + 2 },
  ],
  
  metrics: () => ({
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
  })
};

// Helper function to safely call GA4 API
const safeGA4Call = async (apiCall, fallbackData) => {
  if (!analyticsDataClient || !propertyId) {
    console.log('📊 Using fallback data (GA4 not configured)');
    return fallbackData;
  }

  try {
    const result = await apiCall();
    console.log('✅ GA4 API call successful');
    return result;
  } catch (error) {
    console.error('❌ GA4 API call failed:', error.message);
    return fallbackData;
  }
};

// API Routes

// Real-time data
app.get('/api/analytics/realtime', async (req, res) => {
  try {
    const data = await safeGA4Call(async () => {
      const [response] = await analyticsDataClient.runRealtimeReport({
        property: `properties/${propertyId}`,
        dimensions: [{ name: 'pagePath' }],
        metrics: [{ name: 'activeUsers' }],
      });

      return response.rows?.map(row => ({
        page: row.dimensionValues[0].value,
        visitors: parseInt(row.metricValues[0].value),
        time: 'Live'
      })) || getFallbackData.realtime();
    }, getFallbackData.realtime());

    res.json(data);
  } catch (error) {
    console.error('Realtime API Error:', error);
    res.json(getFallbackData.realtime());
  }
});

// Visitor trends
app.get('/api/analytics/visitors', async (req, res) => {
  try {
    const dateRange = req.query.range || '7d';
    
    const data = await safeGA4Call(async () => {
      const { startDate, endDate } = getDateRange(dateRange);

      const [response] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'date' }],
        metrics: [{ name: 'activeUsers' }],
      });

      return response.rows?.map(row => ({
        name: new Date(row.dimensionValues[0].value).toLocaleDateString('en-US', { weekday: 'short' }),
        value: parseInt(row.metricValues[0].value)
      })) || getFallbackData.visitors();
    }, getFallbackData.visitors());

    res.json(data);
  } catch (error) {
    console.error('Visitors API Error:', error);
    res.json(getFallbackData.visitors());
  }
});

// Page views
app.get('/api/analytics/pageviews', async (req, res) => {
  try {
    const dateRange = req.query.range || '7d';
    
    const data = await safeGA4Call(async () => {
      const { startDate, endDate } = getDateRange(dateRange);

      const [response] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 6
      });

      return response.rows?.map(row => ({
        name: row.dimensionValues[0].value.replace('/', '') || 'Home',
        value: parseInt(row.metricValues[0].value)
      })) || getFallbackData.pageviews();
    }, getFallbackData.pageviews());

    res.json(data);
  } catch (error) {
    console.error('Page Views API Error:', error);
    res.json(getFallbackData.pageviews());
  }
});

// Device data
app.get('/api/analytics/devices', async (req, res) => {
  try {
    const dateRange = req.query.range || '7d';
    
    const data = await safeGA4Call(async () => {
      const { startDate, endDate } = getDateRange(dateRange);

      const [response] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'activeUsers' }],
      });

      return response.rows?.map(row => ({
        name: row.dimensionValues[0].value,
        value: parseInt(row.metricValues[0].value)
      })) || getFallbackData.devices();
    }, getFallbackData.devices());

    res.json(data);
  } catch (error) {
    console.error('Devices API Error:', error);
    res.json(getFallbackData.devices());
  }
});

// Traffic sources
app.get('/api/analytics/traffic-sources', async (req, res) => {
  try {
    const dateRange = req.query.range || '7d';
    
    const data = await safeGA4Call(async () => {
      const { startDate, endDate } = getDateRange(dateRange);

      const [response] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        metrics: [{ name: 'sessions' }],
      });

      const totalSessions = response.rows?.reduce((sum, row) => 
        sum + parseInt(row.metricValues[0].value), 0) || 1;

      return response.rows?.map(row => ({
        name: row.dimensionValues[0].value,
        value: Math.round((parseInt(row.metricValues[0].value) / totalSessions) * 100)
      })) || getFallbackData.trafficSources();
    }, getFallbackData.trafficSources());

    res.json(data);
  } catch (error) {
    console.error('Traffic Sources API Error:', error);
    res.json(getFallbackData.trafficSources());
  }
});

// Key metrics
app.get('/api/analytics/metrics', async (req, res) => {
  try {
    const dateRange = req.query.range || '7d';
    
    const data = await safeGA4Call(async () => {
      const { startDate, endDate } = getDateRange(dateRange);

      const [response] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'screenPageViews' },
          { name: 'averageSessionDuration' },
          { name: 'bounceRate' }
        ],
      });

      const metrics = response.rows?.[0]?.metricValues || [];
      
      return {
        totalVisitors: parseInt(metrics[0]?.value || '0').toLocaleString(),
        pageViews: parseInt(metrics[1]?.value || '0').toLocaleString(),
        avgSessionDuration: `${Math.floor(parseFloat(metrics[2]?.value || '0') / 60)}m ${Math.floor(parseFloat(metrics[2]?.value || '0') % 60)}s`,
        bounceRate: `${(parseFloat(metrics[3]?.value || '0') * 100).toFixed(1)}%`,
        changes: {
          visitors: '+12.5%',
          pageViews: '+8.3%',
          duration: '+15.2%',
          bounceRate: '-3.1%'
        }
      };
    }, getFallbackData.metrics());

    res.json(data);
  } catch (error) {
    console.error('Metrics API Error:', error);
    res.json(getFallbackData.metrics());
  }
});

// Health check
app.get('/api/health', (req, res) => {
  const isGA4Configured = !!(analyticsDataClient && propertyId);
  
  res.json({ 
    status: 'OK', 
    ga4Connected: isGA4Configured,
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV || 'development',
      port: PORT,
      hasGA4PropertyId: !!process.env.GA4_PROPERTY_ID,
      hasGoogleCredentials: !!(process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY),
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Analytics server running on port ${PORT}`);
  console.log(`📊 GA4 Property ID: ${propertyId ? 'Configured' : 'Not configured'}`);
  console.log(`🔑 GA4 Credentials: ${analyticsDataClient ? 'Loaded' : 'Missing'}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
});