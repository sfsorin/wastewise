import { useStore } from '..';

/**
 * Custom hook for theme-related state and actions
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

export default useTheme;
