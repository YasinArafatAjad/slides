# Google Analytics 4 Setup Guide

## 🚀 Complete Setup Instructions

### Step 1: Create Google Analytics 4 Property

1. **Go to Google Analytics**
   - Visit [Google Analytics](https://analytics.google.com/)
   - Sign in with your Google account

2. **Create a New Property**
   - Click "Admin" (gear icon) in the bottom left
   - In the "Property" column, click "Create Property"
   - Choose "GA4" (Google Analytics 4)
   - Enter your property details:
     - **Property name**: Your website/app name
     - **Reporting time zone**: Your local timezone
     - **Currency**: Your preferred currency

3. **Set Up Data Stream**
   - After creating the property, you'll be prompted to set up a data stream
   - Choose **"Web"** for website tracking
   - Enter your website details:
     - **Website URL**: Your website URL (e.g., https://yoursite.com)
     - **Stream name**: A descriptive name (e.g., "Main Website")
   - Click "Create stream"

4. **Get Your Measurement ID**
   - After creating the stream, you'll see your **Measurement ID** (starts with G-)
   - Copy this ID - you'll need it for the frontend tracking

### Step 2: Get GA4 Property ID for Backend

1. **Find Your Property ID**
   - In Google Analytics, go to Admin → Property Settings
   - Look for **"Property ID"** (this is a numeric value like 123456789)
   - This is different from the Measurement ID and is used for the Reporting API

### Step 3: Create Service Account for API Access

1. **Go to Google Cloud Console**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one

2. **Enable Google Analytics Reporting API**
   - Go to "APIs & Services" → "Library"
   - Search for "Google Analytics Reporting API"
   - Click on it and press "Enable"
   - Also enable "Google Analytics Data API"

3. **Create Service Account**
   - Go to "IAM & Admin" → "Service Accounts"
   - Click "Create Service Account"
   - Fill in details:
     - **Service account name**: analytics-service
     - **Description**: Service account for analytics reporting
   - Click "Create and Continue"
   - Skip role assignment for now
   - Click "Done"

4. **Generate Service Account Key**
   - Click on the created service account
   - Go to "Keys" tab
   - Click "Add Key" → "Create new key"
   - Choose "JSON" format
   - Download the JSON file

### Step 4: Grant Service Account Access to GA4

1. **Add Service Account to GA4**
   - Go back to Google Analytics
   - Go to Admin → Property → Property Access Management
   - Click "+" (Add users)
   - Enter the service account email (from the JSON file)
   - Select "Viewer" role
   - Click "Add"

### Step 5: Configure Environment Variables

Update your `.env` file with the following:

```env
# Google Analytics 4 Configuration
GA4_PROPERTY_ID=123456789
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PROJECT_ID=your-google-project-id
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----"

# Frontend GA4 Tracking
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Server Configuration
PORT=3001
VITE_ANALYTICS_API_URL=http://localhost:3001/api/analytics
```

### Step 6: Add Frontend Tracking Code

Update your `index.html` to include the GA4 tracking:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🔧 Configuration Details

### Required Information:

1. **GA4 Property ID** (numeric): For backend API calls
2. **Measurement ID** (G-XXXXXXXXXX): For frontend tracking
3. **Service Account Email**: From the JSON key file
4. **Private Key**: From the JSON key file
5. **Project ID**: Your Google Cloud project ID

### Data Stream Setup:

- **Stream Type**: Web
- **Stream Name**: Descriptive name for your website
- **Website URL**: Your actual website URL
- **Enhanced Measurement**: Enable for automatic event tracking

## 🚨 Important Notes

1. **Data Delay**: GA4 data has a 24-48 hour delay for most reports
2. **Real-time Data**: Only current active users are available in real-time
3. **Permissions**: Service account needs "Viewer" access to the GA4 property
4. **API Limits**: Google Analytics API has daily quotas and rate limits

## 🔍 Troubleshooting

### Common Issues:

1. **"Property not found" error**
   - Check that GA4_PROPERTY_ID is correct (numeric value)
   - Ensure service account has access to the property

2. **"Permission denied" error**
   - Verify service account email is added to GA4 property
   - Check that "Viewer" role is assigned

3. **"Invalid credentials" error**
   - Verify GOOGLE_PRIVATE_KEY format (include \n for line breaks)
   - Check GOOGLE_CLIENT_EMAIL matches the service account

4. **No data showing**
   - Ensure frontend tracking is implemented
   - Wait 24-48 hours for data to appear
   - Check that website has actual traffic

### Testing Connection:

1. Start your server: `npm run dev`
2. Visit: `http://localhost:3001/api/health`
3. Should show: `{"status":"OK","ga4Connected":true}`

## 📊 Data Available

Once connected, you'll get:

- **Real-time**: Active users by page
- **Historical**: Visitor trends, page views, device breakdown
- **Traffic Sources**: How users find your site
- **Key Metrics**: Sessions, bounce rate, duration

## 🎯 Next Steps

1. Set up the GA4 property and data stream
2. Create and configure the service account
3. Update your environment variables
4. Test the connection
5. Wait for data to populate (24-48 hours)

Your analytics dashboard will automatically switch from fallback data to real GA4 data once properly configured!