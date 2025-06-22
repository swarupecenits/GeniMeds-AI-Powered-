// src/firebase/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDW1zwVADhn7mBJjJW6NxisfpNvg3p_hcY",
  authDomain: "genimeds-af666.firebaseapp.com",
  projectId: "genimeds-af666",
  storageBucket: "genimeds-af666.firebasestorage.app",
  messagingSenderId: "1065521569540",
  appId: "1:1065521569540:web:9a94a86c5d13b0d07e7a51",
  measurementId: "G-FS31Q07HE5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(); 

export { auth, provider };
