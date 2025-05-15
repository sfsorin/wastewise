import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Tipul pentru starea temei
 */
interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setDarkMode: (isDark: boolean) => void;
}

/**
 * Store pentru tema aplicației
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      isDarkMode: false,

      toggleTheme: () => {
        set(state => ({
          isDarkMode: !state.isDarkMode,
        }));
      },

      setDarkMode: isDark => {
        set({ isDarkMode: isDark });
      },
    }),
    {
      name: 'theme-storage', // Numele pentru localStorage
    },
  ),
);
