import { useEffect } from 'react';
import AppRouter from './routes';
import useTheme from './hooks/useTheme';

/**
 * Componenta principală a aplicației
 * Folosește React Router pentru navigare
 * Inițializează tema aplicației
 */
function App() {
  const { isDarkMode, changeTheme } = useTheme();

  // Efect pentru inițializarea temei
  useEffect(() => {
    // Verifică dacă există o temă salvată în localStorage
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      // Aplică tema salvată
      changeTheme(savedTheme === 'dark' ? 'dark' : 'light');
    } else {
      // Dacă nu există o temă salvată, folosește preferința sistemului
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      changeTheme(prefersDark ? 'dark' : 'light');
    }
  }, [changeTheme]);

  // Efect pentru aplicarea temei când se schimbă
  useEffect(() => {
    // Aplică tema la elementul HTML
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return <AppRouter />;
}

export default App;
