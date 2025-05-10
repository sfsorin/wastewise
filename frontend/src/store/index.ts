import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// Import slices
import { createAuthSlice, AuthSlice } from './slices/authSlice';
import { createThemeSlice, ThemeSlice } from './slices/themeSlice';
import { createUserSlice, UserSlice } from './slices/userSlice';
import { createWasteSlice, WasteSlice } from './slices/wasteSlice';
import { createUiSlice, UiSlice } from './slices/uiSlice';

// Define the store type
export type StoreState = AuthSlice & ThemeSlice & UserSlice & WasteSlice & UiSlice;

/**
 * Create the store with all slices
 * Using immer for easier state updates
 * Using persist for local storage persistence
 * Using devtools for Redux DevTools integration
 */
export const useStore = create<StoreState>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createAuthSlice(...a),
        ...createThemeSlice(...a),
        ...createUserSlice(...a),
        ...createWasteSlice(...a),
        ...createUiSlice(...a),
      })),
      {
        name: 'wastewise-storage',
        // Only persist specific parts of the state
        partialize: (state) => ({
          auth: { isAuthenticated: state.isAuthenticated, token: state.token },
          theme: { darkMode: state.darkMode },
          user: { profile: state.profile },
        }),
      }
    ),
    { name: 'WasteWise Store' }
  )
);

export default useStore;
