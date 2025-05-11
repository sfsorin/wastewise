import { type StateCreator } from 'zustand';
import { StoreState } from '..';

// Define the auth slice state and actions
export interface AuthSlice {
  // State
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  clearAuthError: () => void;
}

/**
 * Create the auth slice
 */
export const createAuthSlice: StateCreator<
  StoreState,
  [['zustand/immer', never]],
  [],
  AuthSlice
> = (set, get) => ({
  // Initial state
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,

  // Actions
  login: async (email: string, password: string) => {
    try {
      set((state) => {
        state.loading = true;
        state.error = null;
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, this would be an API call to authenticate
      if (email === 'demo@example.com' && password === 'password') {
        const token = 'fake-jwt-token';

        set((state) => {
          state.isAuthenticated = true;
          state.token = token;
          state.loading = false;
        });

        // Load user profile after successful login
        get().loadUserProfile();

        return true;
      } else {
        set((state) => {
          state.error = 'Credențiale invalide';
          state.loading = false;
        });
        return false;
      }
    } catch (error) {
      set((state) => {
        state.error = 'Eroare la autentificare';
        state.loading = false;
      });
      return false;
    }
  },

  register: async (name: string, email: string, password: string) => {
    try {
      set((state) => {
        state.loading = true;
        state.error = null;
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, this would be an API call to register
      const token = 'fake-jwt-token';

      set((state) => {
        state.isAuthenticated = true;
        state.token = token;
        state.loading = false;
      });

      // Set user profile after registration
      get().setUserProfile({
        id: '1',
        name,
        email,
        role: 'user',
      });

      return true;
    } catch (error) {
      set((state) => {
        state.error = 'Eroare la înregistrare';
        state.loading = false;
      });
      return false;
    }
  },

  logout: () => {
    set((state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
    });

    // Clear user profile on logout
    get().clearUserProfile();
  },

  resetPassword: async (email: string) => {
    try {
      set((state) => {
        state.loading = true;
        state.error = null;
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      set((state) => {
        state.loading = false;
      });

      return true;
    } catch (error) {
      set((state) => {
        state.error = 'Eroare la resetarea parolei';
        state.loading = false;
      });
      return false;
    }
  },

  clearAuthError: () => {
    set((state) => {
      state.error = null;
    });
  },
});
