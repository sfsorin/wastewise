import { type StateCreator } from 'zustand';
import { type StoreState } from '../types';

// Define user profile type
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  phone?: string;
  company?: string;
  address?: string;
}

// Define the user slice state and actions
export interface UserSlice {
  // State
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;

  // Actions
  loadUserProfile: () => Promise<void>;
  setUserProfile: (profile: UserProfile) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<boolean>;
  clearUserProfile: () => void;
}

/**
 * Create the user slice
 */
export const createUserSlice: StateCreator<
  StoreState,
  [['zustand/immer', never]],
  [],
  UserSlice
> = set => ({
  // Initial state
  profile: null,
  loading: false,
  error: null,

  // Actions
  loadUserProfile: async () => {
    try {
      set(state => {
        state.loading = true;
        state.error = null;
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user data
      const userData: UserProfile = {
        id: '1',
        name: 'John Smith',
        email: 'demo@example.com',
        role: 'admin',
        avatar: 'https://i.pravatar.cc/150?u=demo@example.com',
        phone: '+40 123 456 789',
        company: 'WasteWise SRL',
        address: 'Strada Exemplu 123, București',
      };

      set(state => {
        state.profile = userData;
        state.loading = false;
      });
    } catch (error) {
      set(state => {
        state.error = 'Eroare la încărcarea profilului';
        state.loading = false;
      });
    }
  },

  setUserProfile: (profile: UserProfile) => {
    set(state => {
      state.profile = profile;
    });
  },

  updateUserProfile: async (updates: Partial<UserProfile>) => {
    try {
      set(state => {
        state.loading = true;
        state.error = null;
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      set(state => {
        if (state.profile) {
          state.profile = {
            ...state.profile,
            ...updates,
          };
        }
        state.loading = false;
      });

      return true;
    } catch (error) {
      set(state => {
        state.error = 'Eroare la actualizarea profilului';
        state.loading = false;
      });
      return false;
    }
  },

  clearUserProfile: () => {
    set(state => {
      state.profile = null;
    });
  },
});
