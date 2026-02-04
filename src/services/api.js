import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

console.log('🔧 API Base URL:', API_BASE_URL); // Debug log

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Generate or get session ID
export const getSessionId = () => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

// Products API
export const productsAPI = {
  getAll: (filters = {}) => api.get('/api/products', { params: filters }),
  getById: (id) => api.get(`/api/products/${id}`),
  getFeatured: () => api.get('/api/products/featured'),
  getByCategory: (category) => api.get(`/api/products/category/${category}`)
};

// Cart API
export const cartAPI = {
  get: () => api.get(`/api/cart/${getSessionId()}`),
  addItem: (productId, quantity = 1, size = 'L', color = 'blue') => 
    api.post(`/api/cart/${getSessionId()}/items`, { productId, quantity, size, color }),
  updateItem: (itemId, quantity) => 
    api.put(`/api/cart/${getSessionId()}/items/${itemId}`, { quantity }),
  updateQuantity: (itemId, quantity) => 
    api.put(`/api/cart/${getSessionId()}/items/${itemId}`, { quantity }),
  removeItem: (itemId) => 
    api.delete(`/api/cart/${getSessionId()}/items/${itemId}`),
  clear: () => 
    api.delete(`/api/cart/${getSessionId()}`)
};

// Orders API
export const ordersAPI = {
  create: (billingDetails, paymentMethod) => 
    api.post('/api/orders', { sessionId: getSessionId(), billingDetails, paymentMethod }),
  getAll: (filters = {}) => api.get('/api/orders', { params: filters }),
  getById: (id) => api.get(`/api/orders/${id}`),
  getByNumber: (orderNumber) => api.get(`/api/orders/number/${orderNumber}`)
};

// Contact API
export const contactAPI = {
  submit: (data) => api.post('/api/contact', data),
  getAll: () => api.get('/api/contact'),
  getById: (id) => api.get(`/api/contact/${id}`),
  delete: (id) => api.delete(`/api/contact/${id}`)
};

export default api;