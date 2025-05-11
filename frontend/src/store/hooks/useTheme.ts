import { useStore } from '@store/index';

/**
 * Hook for accessing theme state and actions
 */
export const useTheme = () => {
  const store = useStore();

  return {
    // State
    darkMode: store.darkMode,

    // Actions
    toggleDarkMode: store.toggleDarkMode,
    setDarkMode: store.setDarkMode,
  };
};
