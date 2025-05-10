import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Acest hook va fi înlocuit cu un hook real de autentificare
const useAuth = () => {
  // Simulăm verificarea autentificării
  // În implementarea reală, acest hook ar verifica token-ul JWT sau sesiunea
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Simulăm un apel asincron pentru verificarea autentificării
    const checkAuth = async () => {
      // În implementarea reală, aici ar fi un apel către API sau verificarea token-ului
      const token = localStorage.getItem('auth_token');
      setIsAuthenticated(!!token);
    };
    
    checkAuth();
  }, []);
  
  return { isAuthenticated };
};

interface AuthGuardProps {
  children: ReactNode;
}

/**
 * Componenta AuthGuard protejează rutele care necesită autentificare
 * Redirecționează utilizatorul către pagina de login dacă nu este autentificat
 */
const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Afișăm un indicator de încărcare în timp ce verificăm autentificarea
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  // Redirecționăm către pagina de login dacă utilizatorul nu este autentificat
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  
  // Afișăm conținutul protejat dacă utilizatorul este autentificat
  return <>{children}</>;
};

export default AuthGuard;
