import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

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
  getAll: (filters = {}) => api.get('/products', { params: filters }),
  getById: (id) => api.get(`/products/${id}`),
  getFeatured: () => api.get('/products/featured'),
  getByCategory: (category) => api.get(`/products/category/${category}`)
};

// Cart API
export const cartAPI = {
  get: () => api.get(`/cart/${getSessionId()}`),
  addItem: (productId, quantity = 1, size = 'L', color = 'blue') => 
    api.post(`/cart/${getSessionId()}/items`, { productId, quantity, size, color }),
  updateItem: (itemId, quantity) => 
    api.put(`/cart/${getSessionId()}/items/${itemId}`, { quantity }),
  updateQuantity: (itemId, quantity) => 
    api.put(`/cart/${getSessionId()}/items/${itemId}`, { quantity }),
  removeItem: (itemId) => 
    api.delete(`/cart/${getSessionId()}/items/${itemId}`),
  clear: () => 
    api.delete(`/cart/${getSessionId()}`)
};

// Orders API
export const ordersAPI = {
  create: (billingDetails, paymentMethod) => 
    api.post('/orders', { sessionId: getSessionId(), billingDetails, paymentMethod }),
  getAll: (filters = {}) => api.get('/orders', { params: filters }),
  getById: (id) => api.get(`/orders/${id}`),
  getByNumber: (orderNumber) => api.get(`/orders/number/${orderNumber}`)
};

// Contact API - NEW
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAll: () => api.get('/contact'),
  getById: (id) => api.get(`/contact/${id}`),
  delete: (id) => api.delete(`/contact/${id}`)
};

export default api;