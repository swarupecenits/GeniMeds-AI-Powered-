# GeniMeds Deployment Guide

## Authentication Deployment Fixes

This document outlines the changes made to fix authentication for deployment.

### Issues Fixed:

1. **Hardcoded API endpoints** - Now uses environment variables
2. **Firebase service account configuration** - Environment variable based
3. **Missing environment configuration** - Added for both dev and production

### Frontend Changes:

1. **API Configuration** (`src/config/api.js`)
   - Centralized API endpoint management
   - Environment-based URL configuration

2. **Firebase Configuration** (`src/firebase/firebase.js`)
   - Uses environment variables with fallbacks
   - Works in both development and production

3. **Component Updates**
   - LoginForm, RegisterForm, and Profile now use API_ENDPOINTS
   - No more hardcoded localhost URLs

### Backend Changes:

1. **Firebase Admin Configuration** (`config/firebaseAdmin.js`)
   - Uses environment variables in production
   - Falls back to service account file in development
   - Graceful error handling

2. **Environment Variables**
   - Added Firebase admin SDK environment variables
   - Production-ready configuration

### Deployment Steps:

#### Frontend Deployment:
1. Copy `.env.production` to `.env`
2. Update `VITE_API_BASE_URL` with your deployed backend URL
3. Build: `npm run build`
4. Deploy the `dist` folder

#### Backend Deployment:
1. Set up environment variables on your hosting platform:
   - Copy values from your Firebase `serviceAccountKey.json`
   - Set `FIREBASE_PRIVATE_KEY` with the full private key (including newlines)
   - Set `MONGO_URI` to your production MongoDB connection string
   
2. **Important:** For the `FIREBASE_PRIVATE_KEY` environment variable:
   ```
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_ACTUAL_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
   ```

3. Deploy your backend

### Environment Variables Needed:

#### Frontend (.env):
```
VITE_API_BASE_URL=https://your-backend-url.com
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

#### Backend (.env):
```
NODE_ENV=production
PORT=5000
MONGO_URI=your_production_mongodb_uri
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="your_private_key_with_newlines"
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=your_client_cert_url
FIREBASE_UNIVERSE_DOMAIN=googleapis.com
```

### Testing:

1. **Local Development**: Still works with existing setup
2. **Production**: Uses environment variables
3. **Both authentication methods** (Google and Email) should work in production

### Common Deployment Platforms:

#### Vercel (Frontend):
- Automatically reads environment variables from `.env.production`
- Set environment variables in Vercel dashboard

#### Heroku (Backend):
- Set environment variables using Heroku CLI or dashboard
- Make sure to properly escape the private key

#### Railway/Render (Backend):
- Set environment variables in platform dashboard
- Use the production environment variable template

The authentication system is now deployment-ready! 🚀
