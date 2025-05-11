import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// Import slices
import { createAuthSlice } from './slices/authSlice';
import { createThemeSlice } from './slices/themeSlice';
import { createUserSlice } from './slices/userSlice';
import { createWasteSlice } from './slices/wasteSlice';
import { createUiSlice } from './slices/uiSlice';

// Define the store type
import type { AuthSlice } from './slices/authSlice';
import type { ThemeSlice } from './slices/themeSlice';
import type { UserSlice } from './slices/userSlice';
import type { WasteSlice } from './slices/wasteSlice';
import type { UiSlice } from './slices/uiSlice';

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
        partialize: state => ({
          auth: { isAuthenticated: state.isAuthenticated, token: state.token },
          theme: { darkMode: state.darkMode },
          user: { profile: state.profile },
        }),
        // Asigură-te că starea este disponibilă imediat
        skipHydration: false,
      },
    ),
    { name: 'WasteWise Store' },
  ),
);

export default useStore;
