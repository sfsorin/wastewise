import { useEffect } from 'react';
import AppRouter from './routes';
import useTheme from './hooks/useTheme';

/**
 * Componenta principală a aplicației
 * Folosește React Router pentru navigare
 * Inițializează tema aplicației
 */
function App() {
  const { isDarkMode } = useTheme();

  // Efect pentru aplicarea temei când se schimbă
  useEffect(() => {
    // Aplicăm tema la nivel de document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return <AppRouter />;
}

export default App;
