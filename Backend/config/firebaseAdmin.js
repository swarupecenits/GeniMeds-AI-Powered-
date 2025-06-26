const admin = require('firebase-admin');

// Use environment variables for production or service account file for development
let credential;

if (process.env.FIREBASE_PRIVATE_KEY) {
  // Production: Use environment variables
  credential = admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
  });
} else {
  // Development: Use service account file
  try {
    const serviceAccount = require('./serviceAccountKey.json');
    credential = admin.credential.cert(serviceAccount);
  } catch (error) {
    console.error('Firebase service account file not found. Please set environment variables for production or add serviceAccountKey.json for development.');
    process.exit(1);
  }
}

admin.initializeApp({
  credential: credential,
});

module.exports = admin;
