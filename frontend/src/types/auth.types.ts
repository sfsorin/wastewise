/**
 * Tipuri pentru autentificare
 */

/**
 * Tipul pentru utilizator
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
  updatedAt: string;
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
 * Tipul pentru starea de autentificare
 */
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Acțiuni
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}
