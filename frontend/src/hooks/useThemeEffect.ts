import { useEffect } from 'react';
import { useTheme } from '@store/hooks/useTheme';

/**
 * Hook personalizat pentru gestionarea temei aplicației
 * - Inițializează tema la încărcarea aplicației
 * - Aplică tema când se schimbă
 * - Salvează tema în localStorage
 */
export const useThemeEffect = () => {
  const { darkMode, setDarkMode } = useTheme();
  
  // Efect pentru inițializarea temei
  useEffect(() => {
    // Verifică dacă există o temă salvată în localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      // Aplică tema salvată
      setDarkMode(savedTheme === 'dark');
    } else {
      // Dacă nu există o temă salvată, folosește preferința sistemului
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, [setDarkMode]);
  
  // Efect pentru aplicarea temei când se schimbă
  useEffect(() => {
    // Aplică tema la elementul HTML
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);
  
  return null; // Hook-ul nu returnează nimic, doar are efecte secundare
};

export default useThemeEffect;
