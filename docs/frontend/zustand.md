# Configurare Zustand în WasteWise

Acest document descrie configurarea și utilizarea Zustand pentru gestionarea stării în aplicația WasteWise.

## Instalare

Zustand a fost instalat folosind:

```bash
npm install zustand --save --legacy-peer-deps
npm install immer --save --legacy-peer-deps
```

## Structura Store-urilor

Aplicația folosește o structură modulară pentru store-uri:

```
src/store/
├── index.ts                # Export-uri pentru toate store-urile
├── auth/                   # Store pentru autentificare
│   ├── authStore.ts        # Implementare store autentificare
│   ├── authStore.test.ts   # Teste pentru store
│   └── types.ts            # Tipuri pentru store
├── ui/                     # Store pentru UI
│   └── themeStore.ts       # Store pentru tema aplicației
└── slices/                 # Slice-uri pentru diferite funcționalități
    └── userSlice.ts        # Store pentru preferințele utilizatorului
```

## Store-uri Implementate

### 1. AuthStore

Store-ul de autentificare gestionează starea de autentificare a utilizatorului:

```tsx
// Exemplu de utilizare
import { useAuthStore } from '@store';

const LoginPage = () => {
  const { login, isLoading, error } = useAuthStore();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };
  
  return (
    // ...
  );
};
```

Funcționalități:
- Login/Logout
- Înregistrare utilizator
- Verificare autentificare
- Persistență token în localStorage

### 2. ThemeStore

Store-ul pentru temă gestionează tema aplicației (light/dark):

```tsx
// Exemplu de utilizare
import { useThemeStore } from '@store';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  
  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};
```

Funcționalități:
- Comutare între modurile light și dark
- Persistență preferință în localStorage
- Aplicare automată a temei la nivel de document

### 3. UserStore

Store-ul pentru utilizator gestionează preferințele utilizatorului:

```tsx
// Exemplu de utilizare
import { useUserStore } from '@store';

const SettingsPage = () => {
  const { preferences, setLanguage } = useUserStore();
  
  return (
    <select 
      value={preferences.language} 
      onChange={(e) => setLanguage(e.target.value)}
    >
      <option value="ro">Română</option>
      <option value="en">English</option>
    </select>
  );
};
```

Funcționalități:
- Gestionare preferințe utilizator (limbă, notificări, temă)
- Persistență preferințe în localStorage

## Middleware-uri

### 1. Persist

Middleware-ul `persist` este folosit pentru a persista starea în localStorage:

```tsx
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // state și acțiuni
    }),
    {
      name: 'auth-storage', // Numele pentru localStorage
      partialize: (state) => ({ 
        // Selectăm ce anume să persistăm
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
```

## Hook-uri Personalizate

### useTheme

Hook-ul `useTheme` combină funcționalitățile din `ThemeStore` și `UserStore` pentru a oferi o gestionare avansată a temei:

```tsx
// Exemplu de utilizare
import { useTheme } from '@hooks';

const ThemeSelector = () => {
  const { isDarkMode, theme, changeTheme } = useTheme();
  
  return (
    <div>
      <button onClick={() => changeTheme('light')}>Light</button>
      <button onClick={() => changeTheme('dark')}>Dark</button>
      <button onClick={() => changeTheme('system')}>System</button>
    </div>
  );
};
```

Funcționalități:
- Sincronizare cu preferințele sistemului
- Opțiuni pentru light, dark și system
- Aplicare automată a temei
