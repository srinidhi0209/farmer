const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://farm-to-home-backend.onrender.com';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/api/login`,
  REGISTER: `${API_BASE_URL}/api/register`,
  ORDERS: `${API_BASE_URL}/api/orders`,
  CUSTOMER_ORDERS: (customerId) => `${API_BASE_URL}/api/orders/customer/${customerId}`,
};

export const FARMER_CREDENTIALS = {
  email: 'farmer@gmail.com',
  password: 'farmer123'
};
