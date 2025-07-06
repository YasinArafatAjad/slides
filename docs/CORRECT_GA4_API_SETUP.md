# Correct Google Analytics 4 API Setup Guide

## 🎯 APIs You Need to Enable

The Google Analytics Reporting API has been deprecated. You need these APIs instead:

### 1. Google Analytics Data API (Primary)
- **API Name**: `Google Analytics Data API`
- **Purpose**: For GA4 reporting and data extraction
- **Required**: Yes

### 2. Google Analytics Admin API (Optional)
- **API Name**: `Google Analytics Admin API`
- **Purpose**: For managing GA4 properties and accounts
- **Required**: Only if you need admin functions

## 📋 Step-by-Step API Setup

### Step 1: Go to Google Cloud Console
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project: `freefeel`

### Step 2: Enable APIs & Services
1. Go to **APIs & Services** → **Library**
2. Search for: `Google Analytics Data API`
3. Click on it and press **Enable**

### Step 3: Verify API is Enabled
1. Go to **APIs & Services** → **Enabled APIs**
2. You should see: `Google Analytics Data API`

## 🔍 What You DON'T Need

These APIs are NOT required for GA4:
- ❌ Google Analytics Reporting API (deprecated for GA4)
- ❌ Google Play Developer Reporting API (different service)
- ❌ Google Analytics Intelligence API (different purpose)

## 🧪 Test Your Setup

After enabling the API, restart your server and check:

```bash
# Restart the server
npm run server

# Check health endpoint
curl http://localhost:3001/api/health
```

## 🚨 Common Issues

### Issue 1: "API not enabled" error
**Solution**: Make sure you enabled `Google Analytics Data API` (not Reporting API)

### Issue 2: "Permission denied" error
**Solution**: Add your service account email to GA4 property with Viewer access

### Issue 3: "Property not found" error
**Solution**: Verify your GA4_PROPERTY_ID is the numeric property ID

## 📊 Your Current Setup

Based on your .env file:
- **Project ID**: `freefeel`
- **Property ID**: `495631579`
- **Service Account**: `freefeel-service@freefeel.iam.gserviceaccount.com`

## ✅ Verification Checklist

- [ ] Google Analytics Data API is enabled in Google Cloud Console
- [ ] Service account has access to GA4 property
- [ ] All environment variables are set correctly
- [ ] Server starts without errors
- [ ] Health check returns GA4 connected: true

## 🔗 Quick Links

- [Google Analytics Data API](https://console.cloud.google.com/apis/library/analyticsdata.googleapis.com)
- [Your Google Cloud Project](https://console.cloud.google.com/apis/dashboard?project=freefeel)
- [GA4 Property Access Management](https://analytics.google.com/analytics/web/#/a495631579p495631579/admin/suiteusermanagement/account)