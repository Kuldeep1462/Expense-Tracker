import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Expense API functions
export const expenseAPI = {
  // Get all expenses
  getExpenses: () => api.get('/expenses'),
  
  // Create new expense
  createExpense: (expenseData) => api.post('/expenses', expenseData),
  
  // Update expense
  updateExpense: (id, expenseData) => api.put(`/expenses/${id}`, expenseData),
  
  // Delete expense
  deleteExpense: (id) => api.delete(`/expenses/${id}`),
  
  // Get expense statistics
  getExpenseStats: () => api.get('/expenses/stats'),
};

// Auth API functions
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export default api;