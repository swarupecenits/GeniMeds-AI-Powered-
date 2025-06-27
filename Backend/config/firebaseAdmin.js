const admin = require('firebase-admin');

// Simple approach: Use service account file if it exists, otherwise use environment variables
let credential;

try {
  // Try to use service account file first (for local development)
  try {
    const serviceAccount = require('./serviceAccountKey.json');
    credential = admin.credential.cert(serviceAccount);
    console.log('✅ Firebase Admin initialized with service account file');
  } catch (fileError) {
    // If service account file doesn't exist, use environment variables (for deployment)
    console.log('🔧 Service account file not found, using environment variables...');
    
    if (!process.env.FIREBASE_PRIVATE_KEY) {
      throw new Error('No Firebase credentials found. Either add serviceAccountKey.json or set environment variables.');
    }

    // Clean and format the private key
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;
    if (privateKey.includes('\\n')) {
      privateKey = privateKey.replace(/\\n/g, '\n');
    }

    const serviceAccountConfig = {
      type: process.env.FIREBASE_TYPE || 'service_account',
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: privateKey,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI || 'https://accounts.google.com/o/oauth2/auth',
      token_uri: process.env.FIREBASE_TOKEN_URI || 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL || 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
      universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN || 'googleapis.com'
    };

    credential = admin.credential.cert(serviceAccountConfig);
    console.log('✅ Firebase Admin initialized with environment variables');
  }

  // Initialize admin only if not already initialized
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: credential,
    });
  }

} catch (error) {
  console.error('❌ Firebase Admin initialization failed:', error.message);
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
}

module.exports = admin;
