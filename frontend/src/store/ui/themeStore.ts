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
    (set) => ({
      isDarkMode: false,

      toggleTheme: () => {
        set((state) => {
          const newDarkMode = !state.isDarkMode;
          
          // Aplicăm tema la nivel de document
          if (newDarkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          
          return { isDarkMode: newDarkMode };
        });
      },

      setDarkMode: (isDark) => {
        set({ isDarkMode: isDark });
        
        // Aplicăm tema la nivel de document
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
    }),
    {
      name: 'theme-storage', // Numele pentru localStorage
    }
  )
);
