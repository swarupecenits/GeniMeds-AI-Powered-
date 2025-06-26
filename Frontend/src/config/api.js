// API configuration based on environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.MODE === 'production' 
    ? 'https://your-deployed-backend-url.com' 
    : 'http://localhost:5000');

export const API_ENDPOINTS = {
  AUTH: {
    SYNC: `${API_BASE_URL}/api/auth/sync`,
    PROFILE: `${API_BASE_URL}/api/auth/profile`,
  },
  CHAT: `${API_BASE_URL}/api/ai-chat`,
  MEDICINES: `${API_BASE_URL}/api/medicines`,
  LAB_REPORTS: `${API_BASE_URL}/api/lab-reports`,
  LAB_ANALYSIS: `${API_BASE_URL}/api/lab-analysis`,
  PRESCRIPTIONS: `${API_BASE_URL}/api/prescriptions`,
  ANALYZE: `${API_BASE_URL}/api/analyze`
};

export default API_BASE_URL;
