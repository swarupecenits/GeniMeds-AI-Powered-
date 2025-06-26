const fs = require('fs');
const path = require('path');

// Helper script to reset .env for local development
// Run with: npm run setup-local

const envPath = path.join(__dirname, '../.env');

try {
  // Read current .env file
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Comment out Firebase variables and reset NODE_ENV
  envContent = envContent.replace(/FIREBASE_TYPE=.*/, '# FIREBASE_TYPE=service_account');
  envContent = envContent.replace(/FIREBASE_PROJECT_ID=.*/, '# FIREBASE_PROJECT_ID=genimeds-af666');
  envContent = envContent.replace(/FIREBASE_PRIVATE_KEY_ID=.*/, '# FIREBASE_PRIVATE_KEY_ID=');
  envContent = envContent.replace(/FIREBASE_PRIVATE_KEY=.*/, '# FIREBASE_PRIVATE_KEY=');
  envContent = envContent.replace(/FIREBASE_CLIENT_EMAIL=.*/, '# FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@genimeds-af666.iam.gserviceaccount.com');
  envContent = envContent.replace(/FIREBASE_CLIENT_ID=.*/, '# FIREBASE_CLIENT_ID=');
  envContent = envContent.replace(/FIREBASE_AUTH_URI=.*/, '# FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth');
  envContent = envContent.replace(/FIREBASE_TOKEN_URI=.*/, '# FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token');
  envContent = envContent.replace(/FIREBASE_AUTH_PROVIDER_X509_CERT_URL=.*/, '# FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs');
  envContent = envContent.replace(/FIREBASE_CLIENT_X509_CERT_URL=.*/, '# FIREBASE_CLIENT_X509_CERT_URL=');
  envContent = envContent.replace(/FIREBASE_UNIVERSE_DOMAIN=.*/, '# FIREBASE_UNIVERSE_DOMAIN=googleapis.com');
  
  // Reset NODE_ENV to development
  envContent = envContent.replace(/NODE_ENV=production/, 'NODE_ENV=development');
  
  // Write back to .env
  fs.writeFileSync(envPath, envContent);
  
  console.log('✅ .env file reset for local development!');
  console.log('📝 Now using serviceAccountKey.json for Firebase authentication');

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
