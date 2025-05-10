import { StateCreator } from 'zustand';
import { StoreState } from '..';

// Define user profile type
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  avatar?: string;
  phone?: string;
  company?: string;
  bio?: string;
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
> = (set, get) => ({
  // Initial state
  profile: null,
  loading: false,
  error: null,
  
  // Actions
  loadUserProfile: async () => {
    try {
      set((state) => {
        state.loading = true;
        state.error = null;
      });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to get the user profile
      const profile: UserProfile = {
        id: '1',
        name: 'John Smith',
        email: 'demo@example.com',
        role: 'manager',
        avatar: '',
        phone: '+40 123 456 789',
        company: 'Exemplu SRL',
        bio: 'Manager cu experiență în domeniul managementului deșeurilor.',
      };
      
      set((state) => {
        state.profile = profile;
        state.loading = false;
      });
    } catch (error) {
      set((state) => {
        state.error = 'Eroare la încărcarea profilului';
        state.loading = false;
      });
    }
  },
  
  setUserProfile: (profile: UserProfile) => {
    set((state) => {
      state.profile = profile;
    });
  },
  
  updateUserProfile: async (updates: Partial<UserProfile>) => {
    try {
      set((state) => {
        state.loading = true;
        state.error = null;
      });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call to update the user profile
      set((state) => {
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
      set((state) => {
        state.error = 'Eroare la actualizarea profilului';
        state.loading = false;
      });
      return false;
    }
  },
  
  clearUserProfile: () => {
    set((state) => {
      state.profile = null;
    });
  },
});
