const fs = require('fs');
const path = require('path');

// Helper script to prepare .env for deployment
// Run with: npm run setup-deploy

const serviceAccountPath = path.join(__dirname, '../config/serviceAccountKey.json');
const envPath = path.join(__dirname, '../.env');

try {
  if (!fs.existsSync(serviceAccountPath)) {
    console.error('❌ serviceAccountKey.json not found in config/ directory');
    console.log('📝 Please download it from Firebase Console > Project Settings > Service Accounts > Generate new private key');
    process.exit(1);
  }

  const serviceAccount = require(serviceAccountPath);
  
  // Read current .env file
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Uncomment and set Firebase variables
  envContent = envContent.replace(/# FIREBASE_TYPE=service_account/, `FIREBASE_TYPE=${serviceAccount.type}`);
  envContent = envContent.replace(/# FIREBASE_PROJECT_ID=genimeds-af666/, `FIREBASE_PROJECT_ID=${serviceAccount.project_id}`);
  envContent = envContent.replace(/# FIREBASE_PRIVATE_KEY_ID=/, `FIREBASE_PRIVATE_KEY_ID=${serviceAccount.private_key_id}`);
  envContent = envContent.replace(/# FIREBASE_PRIVATE_KEY=/, `FIREBASE_PRIVATE_KEY="${serviceAccount.private_key}"`);
  envContent = envContent.replace(/# FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@genimeds-af666.iam.gserviceaccount.com/, `FIREBASE_CLIENT_EMAIL=${serviceAccount.client_email}`);
  envContent = envContent.replace(/# FIREBASE_CLIENT_ID=/, `FIREBASE_CLIENT_ID=${serviceAccount.client_id}`);
  envContent = envContent.replace(/# FIREBASE_AUTH_URI=https:\/\/accounts.google.com\/o\/oauth2\/auth/, `FIREBASE_AUTH_URI=${serviceAccount.auth_uri}`);
  envContent = envContent.replace(/# FIREBASE_TOKEN_URI=https:\/\/oauth2.googleapis.com\/token/, `FIREBASE_TOKEN_URI=${serviceAccount.token_uri}`);
  envContent = envContent.replace(/# FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https:\/\/www.googleapis.com\/oauth2\/v1\/certs/, `FIREBASE_AUTH_PROVIDER_X509_CERT_URL=${serviceAccount.auth_provider_x509_cert_url}`);
  envContent = envContent.replace(/# FIREBASE_CLIENT_X509_CERT_URL=/, `FIREBASE_CLIENT_X509_CERT_URL=${serviceAccount.client_x509_cert_url}`);
  envContent = envContent.replace(/# FIREBASE_UNIVERSE_DOMAIN=googleapis.com/, `FIREBASE_UNIVERSE_DOMAIN=${serviceAccount.universe_domain}`);
  
  // Change NODE_ENV to production
  envContent = envContent.replace(/NODE_ENV=development/, 'NODE_ENV=production');
  
  // Write back to .env
  fs.writeFileSync(envPath, envContent);
  
  console.log('✅ .env file updated for deployment!');
  console.log('');
  console.log('📝 Next steps:');
  console.log('1. Update MONGO_URI in .env to your production database');
  console.log('2. Update VITE_API_BASE_URL in Frontend/.env to your deployed backend URL');
  console.log('3. Deploy your backend and frontend');
  console.log('');
  console.log('🔄 To reset for local development, run: npm run setup-local');

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
