import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Tipul pentru preferințele utilizatorului
 */
interface UserPreferences {
  language: string;
  notifications: boolean;
  theme: 'light' | 'dark' | 'system';
}

/**
 * Tipul pentru starea utilizatorului
 */
interface UserState {
  preferences: UserPreferences;
  setLanguage: (language: string) => void;
  setNotifications: (enabled: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

/**
 * Store pentru preferințele utilizatorului
 */
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      preferences: {
        language: 'ro',
        notifications: true,
        theme: 'system',
      },

      setLanguage: (language) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            language,
          },
        }));
      },

      setNotifications: (enabled) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            notifications: enabled,
          },
        }));
      },

      setTheme: (theme) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            theme,
          },
        }));
      },
    }),
    {
      name: 'user-preferences', // Numele pentru localStorage
    }
  )
);
