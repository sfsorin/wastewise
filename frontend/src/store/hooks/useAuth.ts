import { useStore } from '..';

/**
 * Hook for accessing auth state and actions
 */
export const useAuth = () => {
  const store = useStore();
  
  return {
    // State
    isAuthenticated: store.isAuthenticated,
    token: store.token,
    loading: store.loading,
    error: store.error,
    
    // Actions
    login: store.login,
    register: store.register,
    logout: store.logout,
    resetPassword: store.resetPassword,
    clearAuthError: store.clearAuthError,
  };
};
