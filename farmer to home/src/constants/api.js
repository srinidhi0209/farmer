const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/api/login`,
  REGISTER: `${API_BASE_URL}/api/register`,
  FARMER_REGISTER: `${API_BASE_URL}/api/farmer-register`,
  ORDERS: `${API_BASE_URL}/api/orders`,
  CUSTOMER_ORDERS: (customerId) => `${API_BASE_URL}/api/orders/customer/${customerId}`,
};

// No hardcoded credentials - use real authentication
export const APP_CONFIG = {
  API_BASE_URL,
  APP_NAME: 'Farm to Home',
  VERSION: '1.0.0'
};
