/**
 * Configurare pentru aplicație
 */

// Informații despre aplicație
export const APP_INFO = {
  NAME: 'WasteWise',
  VERSION: '0.1.0',
  DESCRIPTION: 'Aplicație de Management al Deșeurilor',
};

// Configurare pentru rute
export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  WASTE: {
    LIST: '/waste',
    DETAILS: '/waste/:id',
    ADD: '/waste/add',
    EDIT: '/waste/:id/edit',
  },
  COLLECTION: {
    LIST: '/collection-points',
    DETAILS: '/collection-points/:id',
    ADD: '/collection-points/add',
    EDIT: '/collection-points/:id/edit',
  },
  ADMIN: {
    DASHBOARD: '/admin',
    USERS: '/admin/users',
    WASTE: '/admin/waste',
    COLLECTION: '/admin/collection-points',
  },
  NOT_FOUND: '*',
};

// Configurare pentru paginare
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
};

// Configurare pentru localizare
export const LOCALE = {
  DEFAULT: 'ro-RO',
  DATE_FORMAT: 'dd.MM.yyyy',
  TIME_FORMAT: 'HH:mm',
  DATETIME_FORMAT: 'dd.MM.yyyy HH:mm',
};
