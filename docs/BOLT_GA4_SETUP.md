# GA4 Setup for Bolt Development Environment

## 🎯 Quick Setup for Bolt

### Step 1: GA4 Data Stream Configuration

When setting up your GA4 data stream, use these settings:

**For Development:**
- **Website URL**: `http://localhost:5173`
- **Stream Name**: `Bolt Development`
- **Enhanced Measurement**: Enable all options

**For Preview (Alternative):**
- **Website URL**: Your Bolt preview URL (from the preview panel)
- **Stream Name**: `Bolt Preview Environment`

### Step 2: Environment Variables for Bolt

Update your `.env` file with:

```env
# Google Analytics 4 Configuration
GA4_PROPERTY_ID=your_numeric_property_id
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PROJECT_ID=your-google-project-id
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----"

# Frontend GA4 Tracking (for Bolt)
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Server Configuration (Bolt specific)
PORT=3001
VITE_ANALYTICS_API_URL=http://localhost:3001/api/analytics
```

### Step 3: Testing in Bolt

1. **Start the development server**: Already running in Bolt
2. **Test backend connection**: 
   - Open a new terminal in Bolt
   - Run: `curl http://localhost:3001/api/health`
3. **Check frontend tracking**: Open browser dev tools and look for GA4 events

### Step 4: Deployment Considerations

When you deploy this project to production:

1. **Update the GA4 data stream** with your production URL
2. **Update environment variables** for production
3. **Test the connection** in the production environment

## 🔧 Bolt-Specific Notes

- **Development URLs**: Use localhost URLs for development
- **Preview URLs**: Bolt preview URLs change, so use localhost for consistency
- **Environment**: The `.env` file in Bolt is already configured for development
- **Testing**: Use the browser's network tab to verify GA4 calls

## 🚨 Important for Bolt

- **CORS**: The backend already handles CORS for localhost
- **Ports**: Frontend (5173) and Backend (3001) are pre-configured
- **Hot Reload**: Changes to environment variables require server restart
- **Preview**: Bolt's preview URL can be used but may change between sessions

## 📊 Expected Behavior

Once configured:
- **Development**: Real GA4 data will flow from localhost:5173
- **Fallback**: If GA4 isn't connected, demo data will display
- **Real-time**: Active users will show immediately
- **Historical**: Data appears after 24-48 hours

## 🔍 Troubleshooting in Bolt

1. **Check server logs**: Look at the terminal running the backend
2. **Verify environment**: Ensure `.env` variables are loaded
3. **Test endpoints**: Use the browser or curl to test API endpoints
4. **Check network**: Use browser dev tools to see API calls

Your Bolt environment is ready for GA4 integration!