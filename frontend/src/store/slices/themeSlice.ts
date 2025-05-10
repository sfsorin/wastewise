import { StateCreator } from 'zustand';
import { StoreState } from '..';

// Define the theme slice state and actions
export interface ThemeSlice {
  // State
  darkMode: boolean;
  
  // Actions
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
}

/**
 * Create the theme slice
 */
export const createThemeSlice: StateCreator<
  StoreState,
  [['zustand/immer', never]],
  [],
  ThemeSlice
> = (set) => ({
  // Initial state - check system preference
  darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  
  // Actions
  toggleDarkMode: () => {
    set((state) => {
      state.darkMode = !state.darkMode;
      
      // Update document class for Tailwind dark mode
      if (state.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
  },
  
  setDarkMode: (isDark: boolean) => {
    set((state) => {
      state.darkMode = isDark;
      
      // Update document class for Tailwind dark mode
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
  },
});
