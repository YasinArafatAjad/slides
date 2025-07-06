# React + Vite with Dynamic GA4 Analytics (No Supabase)

This template provides a minimal setup to get React working in Vite with HMR, ESLint rules, and dynamic Google Analytics 4 integration using a simple Express.js backend.

## Features

- **Dynamic Analytics Dashboard**: Real-time GA4 data integration
- **Express.js Backend**: Simple Node.js server for GA4 API calls
- **No External Dependencies**: No Supabase or other third-party services required
- **Responsive Design**: Works on all device sizes
- **Dark Mode Support**: Automatic theme switching
- **Real-time Updates**: Live data refresh every 30 seconds
- **Fallback Data**: Graceful degradation when GA4 is unavailable
- **Export Functionality**: Download analytics data as JSON

## Google Analytics 4 Setup

### 1. Create a Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google Analytics Reporting API
4. Create a Service Account:
   - Go to IAM & Admin > Service Accounts
   - Click "Create Service Account"
   - Fill in the details and create
   - Generate a JSON key file

### 2. Configure GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Add the service account email to your GA4 property:
   - Go to Admin > Property > Property Access Management
   - Add the service account email with "Viewer" permissions

### 3. Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```env
# Google Analytics 4 Configuration
GA4_PROPERTY_ID=your_ga4_property_id
GOOGLE_CLIENT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY=your_service_account_private_key
GOOGLE_PROJECT_ID=your_google_project_id

# Server Configuration
PORT=3001

# Frontend Configuration
VITE_ANALYTICS_API_URL=http://localhost:3001/api/analytics
```

## Available Scripts

- `npm run dev` - Start both frontend and backend servers concurrently
- `npm run server` - Start only the backend server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Architecture

### Frontend (React + Vite)
- `useAnalytics` hook for data fetching
- Responsive charts using Recharts
- Real-time updates with intervals
- Error handling with fallback data

### Backend (Express.js)
- Simple REST API for GA4 data
- CORS enabled for frontend communication
- Error handling with fallback responses
- Health check endpoint

### Security
- Service account credentials stored server-side only
- No sensitive data exposed to client
- Simple API structure for easy deployment

## API Endpoints

The backend provides the following endpoints:

- `GET /api/analytics/realtime` - Real-time active users
- `GET /api/analytics/visitors?range=7d` - Visitor trends
- `GET /api/analytics/pageviews?range=7d` - Page view data
- `GET /api/analytics/devices?range=7d` - Device breakdown
- `GET /api/analytics/traffic-sources?range=7d` - Traffic sources
- `GET /api/analytics/metrics?range=7d` - Key metrics
- `GET /api/health` - Server health and GA4 connection status

## Analytics Features

### Real-time Data
- Active users by page
- Live visitor count
- Real-time page views

### Historical Data
- Visitor trends (1d, 7d, 30d, 90d)
- Page view analytics
- Device breakdown
- Traffic source analysis

### Key Metrics
- Total visitors with growth percentage
- Page views with trends
- Average session duration
- Bounce rate analysis

## Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Set Up Environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your GA4 credentials
   ```

3. **Start Development**:
   ```bash
   npm run dev
   ```

This will start both the frontend (Vite) and backend (Express) servers concurrently.

## Production Deployment

### Frontend
Build the frontend for production:
```bash
npm run build
```

Deploy the `dist` folder to any static hosting service (Netlify, Vercel, etc.).

### Backend
Deploy the Express server to any Node.js hosting service:
- Heroku
- Railway
- DigitalOcean App Platform
- AWS EC2
- Google Cloud Run

Make sure to set the environment variables in your hosting platform.

## Troubleshooting

### Common Issues

1. **GA4 Data Not Loading**
   - Check service account permissions
   - Verify property ID is correct
   - Check backend server logs

2. **CORS Errors**
   - Backend handles CORS automatically
   - Check if backend server is running

3. **Fallback Data Showing**
   - This is normal when GA4 is not configured
   - Check browser console for specific errors
   - Visit `/api/health` to check server status

### Debug Mode

The application automatically shows fallback data when:
- GA4 credentials are not configured
- GA4 API calls fail
- Backend server is not running

Check the browser console and network tab for detailed error messages.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.