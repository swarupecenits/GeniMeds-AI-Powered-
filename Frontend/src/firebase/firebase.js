// src/firebase/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDW1zwVADhn7mBJjJW6NxisfpNvg3p_hcY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "genimeds-af666.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "genimeds-af666",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "genimeds-af666.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1065521569540",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1065521569540:web:9a94a86c5d13b0d07e7a51",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-FS31Q07HE5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(); 

export { auth, provider };
