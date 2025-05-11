/**
 * Configurare pentru API
 */

// URL-ul de bază pentru API
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

// Timeout pentru cereri API (în milisecunde)
export const API_TIMEOUT = 30000;

// Endpoint-uri API
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
  },
  WASTE: {
    BASE: '/waste',
  },
  COLLECTION: {
    BASE: '/collection-points',
  },
};

// Configurare pentru headers
export const API_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

// Configurare pentru autentificare
export const AUTH_CONFIG = {
  TOKEN_KEY: 'wastewise_token',
  REFRESH_TOKEN_KEY: 'wastewise_refresh_token',
  TOKEN_EXPIRY_KEY: 'wastewise_token_expiry',
};
