import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import authService, {
  type User,
  type LoginCredentials,
  type RegisterData,
} from '../services/authService';

/**
 * Interfață pentru starea de autentificare
 */
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  loadUser: () => Promise<void>;
}

/**
 * Store pentru gestionarea stării de autentificare
 */
const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: authService.getCurrentUser(),
        token: authService.getToken(),
        isAuthenticated: authService.isAuthenticated(),
        isLoading: false,
        error: null,

        /**
         * Autentificare utilizator
         * @param credentials Credențialele de autentificare
         */
        login: async (credentials: LoginCredentials) => {
          set({ isLoading: true, error: null });
          try {
            const response = await authService.login(credentials);
            set({
              isAuthenticated: true,
              user: response.user,
              token: response.access_token,
              isLoading: false,
            });
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Eroare la autentificare';
            set({
              isLoading: false,
              error: errorMessage,
              isAuthenticated: false,
              user: null,
              token: null,
            });
          }
        },

        /**
         * Înregistrare utilizator
         * @param data Datele de înregistrare
         */
        register: async (data: RegisterData) => {
          set({ isLoading: true, error: null });
          try {
            const response = await authService.register(data);
            set({
              isAuthenticated: true,
              user: response.user,
              token: response.access_token,
              isLoading: false,
            });
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Eroare la înregistrare';
            set({
              isLoading: false,
              error: errorMessage,
              isAuthenticated: false,
              user: null,
              token: null,
            });
          }
        },

        /**
         * Deconectare utilizator
         */
        logout: () => {
          authService.logout();
          set({
            isAuthenticated: false,
            user: null,
            token: null,
          });
        },

        /**
         * Ștergere eroare
         */
        clearError: () => {
          set({ error: null });
        },

        /**
         * Încărcare utilizator curent
         */
        loadUser: async () => {
          if (!get().token) return;

          set({ isLoading: true });
          try {
            const user = await authService.getProfile();
            set({
              user,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch {
            authService.logout();
            set({
              isAuthenticated: false,
              user: null,
              token: null,
              isLoading: false,
            });
          }
        },
      }),
      {
        name: 'auth-storage',
        partialize: state => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        }),
      },
    ),
  ),
);

export default useAuthStore;
