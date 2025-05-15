import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

/**
 * Hook personalizat pentru autentificare
 * Oferă funcții pentru login, logout și verificare stare autentificare
 */
export const useAuth = () => {
  const navigate = useNavigate();
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login: storeLogin,
    logout: storeLogout,
    clearError,
  } = useAuthStore();

  /**
   * Funcție pentru autentificare
   * @param email Email-ul utilizatorului
   * @param password Parola utilizatorului
   * @param redirectTo Ruta către care se face redirect după autentificare
   */
  const login = useCallback(
    async (email: string, password: string, redirectTo?: string) => {
      try {
        await storeLogin(email, password);
        if (redirectTo) {
          navigate(redirectTo);
        } else {
          navigate('/dashboard');
        }
        return true;
      } catch {
        return false;
      }
    },
    [storeLogin, navigate],
  );

  /**
   * Funcție pentru delogare
   * @param redirectTo Ruta către care se face redirect după delogare
   */
  const logout = useCallback(
    (redirectTo?: string) => {
      storeLogout();
      if (redirectTo) {
        navigate(redirectTo);
      } else {
        navigate('/login');
      }
    },
    [storeLogout, navigate],
  );

  /**
   * Verifică dacă utilizatorul are un anumit rol
   * @param role Rolul care trebuie verificat
   * @returns true dacă utilizatorul are rolul specificat, false în caz contrar
   */
  const hasRole = useCallback(
    (role: string) => {
      if (!user || !user.roles) return false;
      return user.roles.includes(role);
    },
    [user],
  );

  /**
   * Verifică dacă utilizatorul are o anumită permisiune
   * @param permission Permisiunea care trebuie verificată
   * @returns true dacă utilizatorul are permisiunea specificată, false în caz contrar
   */
  const hasPermission = useCallback(
    (permission: string) => {
      if (!user || !user.permissions) return false;
      return user.permissions.includes(permission);
    },
    [user],
  );

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    clearError,
    hasRole,
    hasPermission,
  };
};

export default useAuth;
