import { useStore } from '..';

/**
 * Hook for accessing user state and actions
 */
export const useUser = () => {
  const store = useStore();
  
  return {
    // State
    profile: store.profile,
    loading: store.loading,
    error: store.error,
    
    // Actions
    loadUserProfile: store.loadUserProfile,
    setUserProfile: store.setUserProfile,
    updateUserProfile: store.updateUserProfile,
    clearUserProfile: store.clearUserProfile,
  };
};
