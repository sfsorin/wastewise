import { type StateCreator } from 'zustand';
import { type StoreState } from '..';

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
> = set => ({
  // Initial state - va fi suprascris de ThemeProvider
  darkMode: false,

  // Actions
  toggleDarkMode: () => {
    set(state => {
      state.darkMode = !state.darkMode;
      // Nu mai aplicăm tema aici, este gestionată de useThemeEffect
    });
  },

  setDarkMode: (isDark: boolean) => {
    set(state => {
      state.darkMode = isDark;
      // Nu mai aplicăm tema aici, este gestionată de useThemeEffect
    });
  },
});
