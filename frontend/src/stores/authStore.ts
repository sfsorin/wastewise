import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { RegisterData, AuthState } from '../../types/auth.types';

// Importăm serviciul real de autentificare
import authService from '../services/authService';

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

      login: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login({ username, password });
          // Stocăm token-ul și utilizatorul în localStorage
          // Notă: authService.login face deja acest lucru, dar îl facem și aici pentru consistență
          localStorage.setItem('auth_token', response.access_token);
          localStorage.setItem('user', JSON.stringify(response.user));

          set({
            user: response.user,
            token: response.access_token,
            isAuthenticated: true,
            isLoading: false,
          });
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
          const response = await authService.register(userData);
          // Stocăm token-ul și utilizatorul în localStorage
          localStorage.setItem('auth_token', response.access_token);
          localStorage.setItem('user', JSON.stringify(response.user));

          set({
            user: response.user,
            token: response.access_token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Eroare la înregistrare',
            isLoading: false,
          });
        }
      },

      logout: () => {
        authService.logout();
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        set({ user: null, token: null, isAuthenticated: false });
      },

      checkAuth: async () => {
        set({ isLoading: true });
        try {
          // Verificăm dacă există token în localStorage
          const token = localStorage.getItem('auth_token') || localStorage.getItem('token');
          const userStr = localStorage.getItem('user');

          if (!token || !userStr) {
            throw new Error('Nu sunteți autentificat');
          }

          const user = JSON.parse(userStr);

          // Verificăm dacă token-ul este valid prin obținerea profilului
          await authService.getProfile();

          set({ user, token, isAuthenticated: true, isLoading: false });
        } catch {
          // Dacă apare o eroare, ștergem datele de autentificare
          localStorage.removeItem('auth_token');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
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
