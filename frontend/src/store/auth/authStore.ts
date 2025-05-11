import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Definim tipurile direct în fișier pentru a evita probleme de import
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
  email: string;
  password: string;
  firstName: string;
  lastName: string;
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
 * Serviciu pentru autentificare (simulat)
 * În implementarea reală, acesta ar face apeluri către API
 */
const AuthService = {
  login: async (email: string, password: string) => {
    // Simulăm un apel către API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Verificăm credențialele (simulat)
    if (email === 'test@example.com' && password === 'password') {
      return {
        user: {
          id: '1',
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          role: 'user',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        token: 'dummy_token',
      };
    }

    throw new Error('Credențiale invalide');
  },

  register: async (userData: RegisterData) => {
    // Simulăm un apel către API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulăm înregistrarea reușită
    return {
      user: {
        id: '2',
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      token: 'dummy_token',
    };
  },

  logout: () => {
    // Simulăm un logout
    localStorage.removeItem('auth_token');
  },

  checkAuth: async () => {
    // Simulăm verificarea autentificării
    await new Promise(resolve => setTimeout(resolve, 500));

    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('Nu sunteți autentificat');
    }

    return {
      user: {
        id: '1',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      token,
    };
  },
};

/**
 * Store pentru autentificare
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { user, token } = await AuthService.login(email, password);
          localStorage.setItem('auth_token', token);
          set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Eroare de autentificare',
            isLoading: false,
          });
        }
      },

      register: async userData => {
        set({ isLoading: true, error: null });
        try {
          const { user, token } = await AuthService.register(userData);
          localStorage.setItem('auth_token', token);
          set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Eroare la înregistrare',
            isLoading: false,
          });
        }
      },

      logout: () => {
        AuthService.logout();
        set({ user: null, token: null, isAuthenticated: false });
      },

      checkAuth: async () => {
        set({ isLoading: true });
        try {
          const { user, token } = await AuthService.checkAuth();
          set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ user: null, token: null, isAuthenticated: false, isLoading: false });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage', // Numele pentru localStorage
      partialize: state => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
