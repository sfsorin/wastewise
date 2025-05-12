import axios from 'axios';
import authService from '../services/authService';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

/**
 * Instanță Axios configurată pentru API
 */
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor pentru adăugarea token-ului de autentificare la cereri
 */
api.interceptors.request.use(
  config => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

/**
 * Interceptor pentru gestionarea erorilor de autentificare
 */
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response?.status === 401) {
      // Deconectare utilizator dacă token-ul a expirat
      authService.logout();
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  },
);

export default api;
