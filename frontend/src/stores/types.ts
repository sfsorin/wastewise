/**
 * Tipuri pentru store-ul de autentificare
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
 * Tipul pentru răspunsul de autentificare
 */
export interface AuthResponse {
  user: User;
  token: string;
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

/**
 * Tipul pentru datele de înregistrare
 */
export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
