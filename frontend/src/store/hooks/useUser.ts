import { useStore } from '..';
import { UserProfile } from '../slices/userSlice';

/**
 * Custom hook for user-related state and actions
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

export default useUser;
