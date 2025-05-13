import { useEffect, type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner';

interface AuthGuardProps {
  children: ReactNode;
}

/**
 * Componenta AuthGuard protejează rutele care necesită autentificare
 * Redirecționează utilizatorul către pagina de login dacă nu este autentificat
 * Folosește Zustand pentru gestionarea stării de autentificare
 */
const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated, isLoading, loadUser } = useAuthStore();
  const location = useLocation();

  // Verificăm autentificarea la încărcarea componentei
  useEffect(() => {
    if (isAuthenticated) {
      loadUser();
    }
  }, [isAuthenticated, loadUser]);

  // Afișăm un indicator de încărcare în timp ce verificăm autentificarea
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
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
