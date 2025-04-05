// Configuration file for API endpoints
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Common API endpoints
const API_ENDPOINTS = {
  // Landlord endpoints
  LANDLORD: {
    LOGIN: `${API_BASE_URL}/landlord/login`,
    SIGNUP: `${API_BASE_URL}/landlord/signup`,
    PROFILE: `${API_BASE_URL}/landlord/profile`,
    DASHBOARD: `${API_BASE_URL}/landlord/dashboard`,
    HOSTELS: `${API_BASE_URL}/landlord/hostels`,
  },
  
  // Student endpoints
  STUDENT: {
    LOGIN: `${API_BASE_URL}/student/login`,
    SIGNUP: `${API_BASE_URL}/student/signup`,
    PROFILE: `${API_BASE_URL}/student/profile`,
    HOSTELS: `${API_BASE_URL}/hostels`,
    REVIEWS: `${API_BASE_URL}/reviews`,
  },
  
  // General endpoints
  GENERAL: {
    HOSTELS: `${API_BASE_URL}/hostels`,
    UNIVERSITIES: `${API_BASE_URL}/universities`,
  }
};

export { API_BASE_URL, API_ENDPOINTS };
