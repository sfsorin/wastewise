import AppRouter from './routes';
import useThemeEffect from './hooks/useThemeEffect';

/**
 * Componenta principală a aplicației
 * Folosește React Router pentru navigare
 * Inițializează tema aplicației
 */
function App() {
  // Utilizăm hook-ul pentru gestionarea temei
  useThemeEffect();

  return <AppRouter />;
}

export default App;
