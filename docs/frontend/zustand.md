# Configurare Zustand în WasteWise

Acest document descrie configurarea și utilizarea Zustand pentru state management în aplicația WasteWise.

## Instalare

Zustand și dependențele sale au fost instalate folosind:

```bash
npm install zustand immer zod zustand-persist --legacy-peer-deps
```

## Structura de state management

Aplicația folosește o structură modulară pentru state management, organizată în slice-uri:

### 1. Configurarea store-ului principal (`/src/store/index.ts`)

Fișierul principal de configurare a store-ului folosește `create` din Zustand pentru a defini store-ul global:

```tsx
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// Import slices
import { createAuthSlice, AuthSlice } from './slices/authSlice';
import { createThemeSlice, ThemeSlice } from './slices/themeSlice';
// ... alte slice-uri

// Define the store type
export type StoreState = AuthSlice & ThemeSlice & /* ... alte slice-uri */;

export const useStore = create<StoreState>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createAuthSlice(...a),
        ...createThemeSlice(...a),
        // ... alte slice-uri
      })),
      {
        name: 'wastewise-storage',
        partialize: (state) => ({
          // Specificăm ce părți ale state-ului să fie persistate
          auth: { isAuthenticated: state.isAuthenticated, token: state.token },
          theme: { darkMode: state.darkMode },
          // ... alte state-uri persistate
        }),
      }
    ),
    { name: 'WasteWise Store' }
  )
);
```

### 2. Slice-uri

Fiecare slice gestionează o parte specifică a state-ului aplicației:

- **authSlice**: Gestionează starea de autentificare (login, register, logout)
- **themeSlice**: Gestionează tema aplicației (light/dark mode)
- **userSlice**: Gestionează profilul utilizatorului
- **wasteSlice**: Gestionează colectările de deșeuri și statisticile
- **uiSlice**: Gestionează starea UI (sidebar, notificări)

Exemplu de slice:

```tsx
import { StateCreator } from 'zustand';
import { StoreState } from '..';

export interface ThemeSlice {
  // State
  darkMode: boolean;
  
  // Actions
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
}

export const createThemeSlice: StateCreator<
  StoreState,
  [['zustand/immer', never]],
  [],
  ThemeSlice
> = (set) => ({
  // Initial state
  darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  
  // Actions
  toggleDarkMode: () => {
    set((state) => {
      state.darkMode = !state.darkMode;
      
      // Update document class for Tailwind dark mode
      if (state.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
  },
  
  setDarkMode: (isDark: boolean) => {
    set((state) => {
      state.darkMode = isDark;
      
      // Update document class for Tailwind dark mode
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
  },
});
```

### 3. Hook-uri personalizate

Pentru a facilita accesul la state și acțiuni, am creat hook-uri personalizate pentru fiecare slice:

```tsx
import { useStore } from '..';

export const useTheme = () => {
  const store = useStore();
  
  return {
    // State
    darkMode: store.darkMode,
    
    // Actions
    toggleDarkMode: store.toggleDarkMode,
    setDarkMode: store.setDarkMode,
  };
};
```

## Middleware-uri utilizate

### 1. Immer

Immer permite actualizarea state-ului într-un mod "mutabil", dar de fapt creează o nouă stare imutabilă în spate:

```tsx
toggleDarkMode: () => {
  set((state) => {
    // Putem "muta" state-ul direct datorită Immer
    state.darkMode = !state.darkMode;
  });
}
```

### 2. Persist

Persist salvează automat state-ul în localStorage și îl restaurează la reîncărcarea paginii:

```tsx
persist(
  // store
  {
    name: 'wastewise-storage',
    partialize: (state) => ({
      // Specificăm ce părți ale state-ului să fie persistate
      auth: { isAuthenticated: state.isAuthenticated, token: state.token },
      theme: { darkMode: state.darkMode },
    }),
  }
)
```

### 3. DevTools

DevTools integrează store-ul cu Redux DevTools pentru debugging:

```tsx
devtools(
  // store
  { name: 'WasteWise Store' }
)
```

## Utilizare în componente

### Exemplu de utilizare a hook-urilor personalizate:

```tsx
import { useTheme } from '../store/hooks';

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  
  return (
    <button onClick={toggleDarkMode}>
      {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
};
```

### Exemplu de utilizare directă a store-ului:

```tsx
import { useStore } from '../store';

const UserProfile = () => {
  const profile = useStore((state) => state.profile);
  const updateProfile = useStore((state) => state.updateUserProfile);
  
  // ...
};
```

## Bune practici

1. **Folosiți slice-uri** pentru a organiza state-ul pe funcționalități
2. **Creați hook-uri personalizate** pentru a accesa state-ul și acțiunile
3. **Folosiți Immer** pentru actualizări mai simple ale state-ului
4. **Persistați doar datele necesare** pentru a evita probleme de performanță
5. **Folosiți TypeScript** pentru a defini tipurile state-ului și acțiunilor

## Resurse

- [Documentație oficială Zustand](https://github.com/pmndrs/zustand)
- [Documentație Immer](https://immerjs.github.io/immer/)
- [Documentație Zod](https://zod.dev/)
- [Tutorial Zustand](https://blog.logrocket.com/managing-react-state-zustand/)
