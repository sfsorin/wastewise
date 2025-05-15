/**
 * Constante utilizate în aplicație
 */

// Constante pentru autentificare
export const AUTH_TOKEN_KEY = 'auth_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';
export const AUTH_USER_KEY = 'auth_user';

// Constante pentru rute
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  USERS: '/users',
  ROLES: '/roles',
  CLIENTS: '/clients',
  CONTRACTS: '/contracts',
  REPORTS: '/reports',
  SETTINGS: '/settings',
};

// Constante pentru roluri
export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  OPERATOR: 'operator',
  USER: 'user',
};

// Constante pentru permisiuni
export const PERMISSIONS = {
  // Utilizatori
  VIEW_USERS: 'view_users',
  CREATE_USER: 'create_user',
  EDIT_USER: 'edit_user',
  DELETE_USER: 'delete_user',

  // Roluri
  VIEW_ROLES: 'view_roles',
  CREATE_ROLE: 'create_role',
  EDIT_ROLE: 'edit_role',
  DELETE_ROLE: 'delete_role',

  // Clienți
  VIEW_CLIENTS: 'view_clients',
  CREATE_CLIENT: 'create_client',
  EDIT_CLIENT: 'edit_client',
  DELETE_CLIENT: 'delete_client',

  // Contracte
  VIEW_CONTRACTS: 'view_contracts',
  CREATE_CONTRACT: 'create_contract',
  EDIT_CONTRACT: 'edit_contract',
  DELETE_CONTRACT: 'delete_contract',

  // Rapoarte
  VIEW_REPORTS: 'view_reports',
  EXPORT_REPORTS: 'export_reports',
};

// Constante pentru paginare
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
};

// Constante pentru tipuri de clienți
export const CLIENT_TYPES = {
  INDIVIDUAL: 'individual',
  COMPANY: 'company',
  INSTITUTION: 'institution',
  ASSOCIATION: 'association',
};

// Constante pentru statusuri
export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  SUSPENDED: 'suspended',
  DELETED: 'deleted',
};

// Constante pentru tipuri de notificări
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Constante pentru teme
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

// Constante pentru API
export const API = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 30000, // 30 secunde
  VERSION: 'v1',
};

// Constante pentru validare
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 64,
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 50,
  MAX_EMAIL_LENGTH: 100,
  MAX_NAME_LENGTH: 100,
};

// Constante pentru fișiere
export const FILE = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
  DOCUMENT_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
};

// Export toate constantele
export default {
  AUTH_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  AUTH_USER_KEY,
  ROUTES,
  ROLES,
  PERMISSIONS,
  PAGINATION,
  CLIENT_TYPES,
  STATUS,
  NOTIFICATION_TYPES,
  THEMES,
  API,
  VALIDATION,
  FILE,
};
