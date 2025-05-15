/**
 * Tipuri pentru autentificare
 */

/**
 * Tipul pentru utilizator
 */
export interface User {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  role: string;
  permissions?: string[];
}

/**
 * Tipul pentru datele de înregistrare
 */
export interface RegisterData {
  username: string;
  email: string;
  password: string;
  fullName?: string;
}

/**
 * Tipul pentru răspunsul de autentificare
 */
export interface AuthResponse {
  access_token: string;
  refresh_token?: string;
  user: User;
}

/**
 * Tipul pentru starea de autentificare
 */
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Acțiuni
  login: (username: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}
