import axios from 'axios';

// Get API Base URL - Priority: .env → fallback to localhost
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

console.log('🔧 API Configuration:');
console.log('  Base URL:', API_BASE_URL);
console.log('  Mode:', import.meta.env.MODE);

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 second timeout
});

// ✅ Request interceptor - Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('📤 Request with auth token:', config.url);
    } else {
      console.log('📤 Request without token:', config.url);
    }
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// ✅ Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response success:', response.config.url);
    return response;
  },
  (error) => {
    // Detailed error logging
    console.error('❌ API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    // Handle 401 Unauthorized for admin routes
    if (error.response?.status === 401) {
      if (window.location.pathname.startsWith('/admin')) {
        console.warn('⚠️  Unauthorized - Clearing auth and redirecting to login');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        window.location.href = '/admin/login';
      }
    }

    // Handle 404 - Route not found
    if (error.response?.status === 404) {
      console.error('❌ 404 Not Found - Check if API URL is correct');
      console.error('   Expected URL:', error.config?.url);
      console.error('   Base URL:', API_BASE_URL);
    }

    // Handle 500 - Server error
    if (error.response?.status === 500) {
      console.error('❌ Server Error - Check backend logs');
    }

    // Handle network error
    if (!error.response) {
      console.error('❌ Network Error - Backend may be offline');
      console.error('   Trying to reach:', API_BASE_URL);
    }

    return Promise.reject(error);
  }
);

// Generate or get session ID (for public cart)
export const getSessionId = () => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

// ✅ Auth API (Admin)
export const authAPI = {
  login: (credentials) => {
    console.log('🔑 Logging in with email:', credentials.email);
    return api.post('/api/auth/login', credentials);
  },
  register: (data) => api.post('/api/auth/register', data),
  getMe: () => api.get('/api/auth/me'),
  updatePassword: (data) => api.put('/api/auth/updatepassword', data)
};

// ✅ Dashboard API (Admin)
export const dashboardAPI = {
  getStats: (params) => api.get('/api/dashboard/stats', { params }),
  getRecentOrders: (limit) => api.get('/api/dashboard/recent-orders', { params: { limit } }),
  getLowStock: (threshold) => api.get('/api/dashboard/low-stock', { params: { threshold } })
};

// ✅ Products API
export const productsAPI = {
  getAll: (filters = {}) => api.get('/api/products', { params: filters }),
  getById: (id) => api.get(`/api/products/${id}`),
  getFeatured: () => api.get('/api/products/featured'),
  getByCategory: (category) => api.get(`/api/products/category/${category}`),
  // Admin only
  create: (data) => api.post('/api/products', data),
  update: (id, data) => api.put(`/api/products/${id}`, data),
  delete: (id) => api.delete(`/api/products/${id}`)
};

// ✅ Cart API (Public)
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

// ✅ Orders API
export const ordersAPI = {
  // Public
  create: (billingDetails, paymentMethod) => 
    api.post('/api/orders', { sessionId: getSessionId(), billingDetails, paymentMethod }),
  getByNumber: (orderNumber) => api.get(`/api/orders/number/${orderNumber}`),
  // Admin only
  getAll: (filters = {}) => api.get('/api/orders', { params: filters }),
  getById: (id) => api.get(`/api/orders/${id}`),
  updateStatus: (id, status) => api.put(`/api/orders/${id}/status`, { status }),
  delete: (id) => api.delete(`/api/orders/${id}`)
};

// ✅ Contact API
export const contactAPI = {
  // Public
  submit: (data) => api.post('/api/contact', data),
  // Admin only
  getAll: () => api.get('/api/contact'),
  getById: (id) => api.get(`/api/contact/${id}`),
  delete: (id) => api.delete(`/api/contact/${id}`)
};

export default api;