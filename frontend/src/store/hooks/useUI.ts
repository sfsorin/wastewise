import { useStore } from '..';

/**
 * Hook for accessing UI state and actions
 */
export const useUI = () => {
  const store = useStore();
  
  return {
    // State
    sidebarOpen: store.sidebarOpen,
    notifications: store.notifications,
    
    // Actions
    toggleSidebar: store.toggleSidebar,
    setSidebarOpen: store.setSidebarOpen,
    addNotification: store.addNotification,
    removeNotification: store.removeNotification,
    clearNotifications: store.clearNotifications,
  };
};
