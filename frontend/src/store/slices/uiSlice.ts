import { type StateCreator } from 'zustand';
import { type StoreState } from '..';

// Define notification type
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  title?: string;
  autoClose?: boolean;
  duration?: number;
}

// Define the UI slice state and actions
export interface UiSlice {
  // State
  sidebarOpen: boolean;
  notifications: Notification[];

  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

/**
 * Create the UI slice
 */
export const createUiSlice: StateCreator<
  StoreState,
  [['zustand/immer', never]],
  [],
  UiSlice
> = set => ({
  // Initial state
  sidebarOpen: false,
  notifications: [],

  // Actions
  toggleSidebar: () => {
    set(state => {
      state.sidebarOpen = !state.sidebarOpen;
    });
  },

  setSidebarOpen: (isOpen: boolean) => {
    set(state => {
      state.sidebarOpen = isOpen;
    });
  },

  addNotification: (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);

    set(state => {
      state.notifications.push({
        ...notification,
        id,
        autoClose: notification.autoClose ?? true,
        duration: notification.duration ?? 5000,
      });
    });

    // Auto-close notification if enabled
    if (notification.autoClose !== false) {
      const duration = notification.duration ?? 5000;
      setTimeout(() => {
        set(state => {
          state.notifications = state.notifications.filter(n => n.id !== id);
        });
      }, duration);
    }
  },

  removeNotification: (id: string) => {
    set(state => {
      state.notifications = state.notifications.filter(n => n.id !== id);
    });
  },

  clearNotifications: () => {
    set(state => {
      state.notifications = [];
    });
  },
});
