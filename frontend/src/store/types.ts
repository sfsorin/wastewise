// Import slice interfaces
import type { AuthSlice } from './slices/authSlice';
import type { ThemeSlice } from './slices/themeSlice';
import type { UserSlice } from './slices/userSlice';
import type { WasteSlice } from './slices/wasteSlice';
import type { UiSlice } from './slices/uiSlice';

// Define the store type
export type StoreState = AuthSlice & ThemeSlice & UserSlice & WasteSlice & UiSlice;
