import { useEffect, useRef } from 'react';
import { useThemeStore, useUserStore } from '../stores';

/**
 * Hook personalizat pentru gestionarea temei
 * Sincronizează tema din store cu preferințele utilizatorului și tema sistemului
 */
export const useTheme = () => {
  const { isDarkMode, toggleTheme, setDarkMode } = useThemeStore();
  const { preferences, setTheme } = useUserStore();
  const isInitialized = useRef(false);

  // Efect pentru inițializarea temei
  useEffect(() => {
    if (isInitialized.current) return;

    // Verifică dacă există o temă salvată în localStorage
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      // Aplică tema salvată
      if (savedTheme === 'dark' && !isDarkMode) {
        setDarkMode(true);
      } else if (savedTheme === 'light' && isDarkMode) {
        setDarkMode(false);
      }
    } else {
      // Dacă nu există o temă salvată, folosește preferința sistemului
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark !== isDarkMode) {
        setDarkMode(prefersDark);
      }
    }

    isInitialized.current = true;
  }, [isDarkMode, setDarkMode]);

  // Adăugăm un listener pentru schimbările de temă ale sistemului
  useEffect(() => {
    if (preferences.theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [preferences.theme, setDarkMode]);

  // Funcție pentru a schimba tema
  const changeTheme = (theme: 'light' | 'dark' | 'system') => {
    // Evităm actualizări inutile
    if (theme === preferences.theme) return;

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
