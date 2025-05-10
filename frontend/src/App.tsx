import { useEffect } from 'react';
import AppRouter from './routes';
import { useTheme, useAuth } from './store/hooks';

/**
 * Componenta principală a aplicației
 * Folosește React Router pentru navigare și Zustand pentru state management
 */
function App() {
  const { darkMode } = useTheme();
  const { isAuthenticated } = useAuth();

  // Aplicăm tema la încărcarea aplicației
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Logică pentru autentificare automată (dacă există un token valid)
  useEffect(() => {
    if (isAuthenticated) {
      console.log('Utilizator autentificat');
    }
  }, [isAuthenticated]);

  return <AppRouter />;
}

export default App;
