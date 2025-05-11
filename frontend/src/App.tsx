import { useEffect } from 'react';
import AppRouter from './routes';
import { useAuth } from './store/hooks';
import useThemeEffect from './hooks/useThemeEffect';

/**
 * Componenta principală a aplicației
 * Folosește React Router pentru navigare și Zustand pentru state management
 */
function App() {
  const { isAuthenticated } = useAuth();

  // Utilizăm hook-ul personalizat pentru gestionarea temei
  useThemeEffect();

  // Logică pentru autentificare automată (dacă există un token valid)
  useEffect(() => {
    if (isAuthenticated) {
      console.log('Utilizator autentificat');
    }
  }, [isAuthenticated]);

  return <AppRouter />;
}

export default App;
