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

**Option 1: Use the Helper Script (Recommended)**
1. Run the Firebase environment variable extraction script:
   ```bash
   cd Backend
   npm run extract-firebase-env
   ```
   This will read your `serviceAccountKey.json` and output properly formatted environment variables.

2. Copy the output environment variables to your deployment platform
3. Set `MONGO_URI` to your production MongoDB connection string
4. Deploy your backend

**Option 2: Manual Setup**
1. Set up environment variables manually on your hosting platform:
   - Copy values from your Firebase `serviceAccountKey.json`
   - Set `FIREBASE_PRIVATE_KEY` with the full private key (including newlines)
   - Set `MONGO_URI` to your production MongoDB connection string
   
2. **Important:** For the `FIREBASE_PRIVATE_KEY` environment variable:
   
   **Method 1 (Recommended): Copy directly from JSON file**
   ```bash
   # Open your serviceAccountKey.json and copy the "private_key" value exactly as is
   # Example:
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
   ```
   
   **Method 2: For command line setup**
   ```bash
   # If setting via CLI, escape the newlines properly
   export FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_ACTUAL_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
   ```

3. **Troubleshooting Private Key Issues:**
   - Ensure the key starts with `-----BEGIN PRIVATE KEY-----` and ends with `-----END PRIVATE KEY-----`
   - The key should be one continuous string with `\n` for newlines
   - Don't remove any characters from the original key
   - Test locally first by setting the environment variable

4. Deploy your backend

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

### Troubleshooting:

#### Firebase Private Key Issues:
1. **"Failed to parse private key" Error:**
   - Check that your private key is complete and includes `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
   - Ensure newlines are preserved as `\n` in the environment variable
   - Copy the exact value from your `serviceAccountKey.json` file

2. **Testing Private Key Locally:**
   ```bash
   # Windows PowerShell
   $env:FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"
   
   # Windows Command Prompt
   set FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"
   
   # macOS/Linux
   export FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"
   ```

3. **Alternative: Use Base64 Encoding (for problematic platforms):**
   ```javascript
   // In firebaseAdmin.js, you can decode base64 if needed
   const privateKeyBase64 = process.env.FIREBASE_PRIVATE_KEY_BASE64;
   const privateKey = Buffer.from(privateKeyBase64, 'base64').toString('utf-8');
   ```

#### API Connection Issues:
1. **CORS Errors:** Ensure your backend URL is correctly set in frontend
2. **404 Errors:** Check that API routes are deployed and accessible
3. **Authentication Errors:** Verify Firebase configuration matches between frontend and backend

#### MongoDB Connection Issues:
1. **Connection String:** Ensure MongoDB URI is correct for production
2. **Network Access:** Whitelist your deployment platform's IP ranges
3. **Database Permissions:** Ensure the MongoDB user has proper permissions

The authentication system is now deployment-ready! 🚀
