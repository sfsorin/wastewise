import { useEffect } from 'react';
import { useThemeStore } from '../store';
import { useUserStore } from '../store';

/**
 * Hook personalizat pentru gestionarea temei
 * Sincronizează tema din store cu preferințele utilizatorului și tema sistemului
 */
export const useTheme = () => {
  const { isDarkMode, toggleTheme, setDarkMode } = useThemeStore();
  const { preferences, setTheme } = useUserStore();

  // Efect pentru a sincroniza tema cu preferințele utilizatorului și tema sistemului
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Setăm tema în funcție de preferințele utilizatorului
    if (preferences.theme === 'system') {
      setDarkMode(prefersDark);
    } else {
      setDarkMode(preferences.theme === 'dark');
    }
    
    // Adăugăm un listener pentru schimbările de temă ale sistemului
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (preferences.theme === 'system') {
        setDarkMode(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [preferences.theme, setDarkMode]);

  // Funcție pentru a schimba tema
  const changeTheme = (theme: 'light' | 'dark' | 'system') => {
    setTheme(theme);
    
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    } else {
      setDarkMode(theme === 'dark');
    }
  };

  return {
    isDarkMode,
    toggleTheme,
    theme: preferences.theme,
    changeTheme,
  };
};

export default useTheme;
