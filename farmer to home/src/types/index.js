// User types
export const USER_ROLES = {
  FARMER: 'farmer',
  CUSTOMER: 'customer'
};

// Product type
export const ProductType = {
  id: 'string',
  name: 'string',
  price: 'number',
  image: 'string',
  description: 'string',
  category: 'string'
};

// User type
export const UserType = {
  _id: 'string',
  name: 'string',
  email: 'string',
  phone: 'string',
  role: 'string',
  createdAt: 'date',
  updatedAt: 'date'
};

// Order type
export const OrderType = {
  _id: 'string',
  customerId: 'string',
  customerName: 'string',
  customerEmail: 'string',
  phone: 'string',
  address: 'string',
  items: 'array',
  totalCost: 'number',
  date: 'date',
  status: 'string'
};

// Cart item type
export const CartItemType = {
  id: 'string',
  name: 'string',
  price: 'number',
  image: 'string',
  quantity: 'number'
};

// API Response types
export const ApiResponse = {
  success: 'boolean',
  message: 'string',
  data: 'object',
  error: 'string'
};
