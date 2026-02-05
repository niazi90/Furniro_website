import axios from 'axios';

/* =========================
   🔧 API BASE URL
========================= */
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

console.log('🔧 API Configuration');
console.log('Base URL:', API_BASE_URL);
console.log('Mode:', import.meta.env.MODE);

/* =========================
   ✅ AXIOS INSTANCE
========================= */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true, // 🔥 REQUIRED for Vercel ↔ Railway
  timeout: 10000
});

/* =========================
   🔑 REQUEST INTERCEPTOR
========================= */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('📤 Auth request:', config.url);
    } else {
      console.log('📤 Public request:', config.url);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================
   ⚠️ RESPONSE INTERCEPTOR
========================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });

    // 🔒 Admin unauthorized
    if (
      error.response?.status === 401 &&
      window.location.pathname.startsWith('/admin')
    ) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
      window.location.href = '/admin/login';
    }

    return Promise.reject(error);
  }
);

/* =========================
   🆔 SESSION ID (PUBLIC CART)
========================= */
export const getSessionId = () => {
  let sessionId = localStorage.getItem('sessionId');

  if (!sessionId) {
    sessionId =
      'session_' +
      Date.now() +
      '_' +
      Math.random().toString(36).slice(2, 10);

    localStorage.setItem('sessionId', sessionId);
  }

  return sessionId;
};

/* =========================
   🔑 AUTH API (ADMIN)
========================= */
export const authAPI = {
  login: (credentials) =>
    api.post('/api/auth/admin/login', credentials),

  register: (data) =>
    api.post('/api/auth/register', data),

  getMe: () =>
    api.get('/api/auth/me'),

  updatePassword: (data) =>
    api.put('/api/auth/updatepassword', data)
};

/* =========================
   📊 DASHBOARD API
========================= */
export const dashboardAPI = {
  getStats: () =>
    api.get('/api/dashboard/stats'),

  getRecentOrders: (limit = 5) =>
    api.get('/api/dashboard/recent-orders', {
      params: { limit }
    }),

  getLowStock: (threshold = 5) =>
    api.get('/api/dashboard/low-stock', {
      params: { threshold }
    })
};

/* =========================
   🪑 PRODUCTS API
========================= */
export const productsAPI = {
  getAll: (filters = {}) =>
    api.get('/api/products', { params: filters }),

  getById: (id) =>
    api.get(`/api/products/${id}`),

  getFeatured: () =>
    api.get('/api/products/featured'),

  getByCategory: (category) =>
    api.get(`/api/products/category/${category}`),

  // Admin
  create: (data) =>
    api.post('/api/products', data),

  update: (id, data) =>
    api.put(`/api/products/${id}`, data),

  delete: (id) =>
    api.delete(`/api/products/${id}`)
};

/* =========================
   🛒 CART API (PUBLIC)
========================= */
export const cartAPI = {
  get: () =>
    api.get(`/api/cart/${getSessionId()}`),

  addItem: (productId, quantity = 1, size = 'L', color = 'blue') =>
    api.post(`/api/cart/${getSessionId()}/items`, {
      productId,
      quantity,
      size,
      color
    }),

  updateItem: (itemId, quantity) =>
    api.put(
      `/api/cart/${getSessionId()}/items/${itemId}`,
      { quantity }
    ),

  removeItem: (itemId) =>
    api.delete(
      `/api/cart/${getSessionId()}/items/${itemId}`
    ),

  clear: () =>
    api.delete(`/api/cart/${getSessionId()}`)
};

/* =========================
   📦 ORDERS API
========================= */
export const ordersAPI = {
  create: (billingDetails, paymentMethod) =>
    api.post('/api/orders', {
      sessionId: getSessionId(),
      billingDetails,
      paymentMethod
    }),

  getByNumber: (orderNumber) =>
    api.get(`/api/orders/number/${orderNumber}`),

  // Admin
  getAll: (filters = {}) =>
    api.get('/api/orders', { params: filters }),

  getById: (id) =>
    api.get(`/api/orders/${id}`),

  updateStatus: (id, status) =>
    api.put(`/api/orders/${id}/status`, { status }),

  delete: (id) =>
    api.delete(`/api/orders/${id}`)
};

/* =========================
   📩 CONTACT API
========================= */
export const contactAPI = {
  submit: (data) =>
    api.post('/api/contact', data),

  // Admin
  getAll: () =>
    api.get('/api/contact'),

  getById: (id) =>
    api.get(`/api/contact/${id}`),

  delete: (id) =>
    api.delete(`/api/contact/${id}`)
};

export default api;
