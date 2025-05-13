import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { RegisterData, AuthState } from '../../types/auth.types';

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
        firstName: userData.fullName?.split(' ')[0] || '',
        lastName: userData.fullName?.split(' ').slice(1).join(' ') || '',
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
    set => ({
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
        } catch {
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
