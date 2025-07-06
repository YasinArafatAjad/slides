# Development Guide

## 🚀 Running the Application

### Option 1: Run Both Servers Together (Recommended)
```bash
npm run dev
```
This command runs both the frontend and backend concurrently.

### Option 2: Run Servers Separately

#### Start Backend Server:
```bash
npm run server
```
- Runs on: `http://localhost:3001`
- Handles: GA4 API calls, analytics data

#### Start Frontend Server (in another terminal):
```bash
npm run frontend
```
- Runs on: `http://localhost:5173`
- Handles: React app, user interface

## 🌐 Server URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | `http://localhost:5173` | React application |
| Backend | `http://localhost:3001` | Express API server |
| Health Check | `http://localhost:3001/api/health` | Server status |

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend and backend |
| `npm run frontend` | Start only frontend (Vite) |
| `npm run server` | Start only backend (Express) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🔧 GA4 Setup URLs

When setting up Google Analytics 4:

### For Development:
- **Website URL**: `http://localhost:5173`
- **Stream Name**: `Development Environment`

### For API Configuration:
- **Backend URL**: `http://localhost:3001`
- **Health Check**: `http://localhost:3001/api/health`

## 🚨 Important Notes

1. **Both servers must be running** for full functionality
2. **Frontend** handles the user interface
3. **Backend** handles GA4 API calls and data processing
4. **CORS** is configured to allow frontend-backend communication
5. **Environment variables** are loaded by the backend server

## 🔍 Troubleshooting

### If analytics data isn't loading:
1. Check if backend is running: `http://localhost:3001/api/health`
2. Verify environment variables in `.env`
3. Check browser console for errors
4. Ensure GA4 is properly configured

### If frontend isn't loading:
1. Check if Vite dev server is running on port 5173
2. Look for any build errors in the terminal
3. Clear browser cache if needed

### Common Issues:
- **Port conflicts**: Make sure ports 3001 and 5173 are available
- **Environment variables**: Backend needs `.env` file with GA4 credentials
- **CORS errors**: Backend handles CORS automatically for localhost