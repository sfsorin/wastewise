# Configurare React Router în WasteWise

Acest document descrie configurarea și utilizarea React Router în aplicația WasteWise.

## Instalare

React Router a fost instalat folosind:

```bash
npm install react-router-dom @types/react-router-dom --legacy-peer-deps
```

## Structura de rutare

Aplicația folosește o structură de rutare ierarhică cu următoarele componente principale:

### 1. Configurarea rutelor (`/src/routes/index.tsx`)

Fișierul principal de configurare a rutelor folosește `createBrowserRouter` pentru a defini rutele aplicației:

```tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Layouts
import RootLayout from './layouts/RootLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages (lazy loaded)
const HomePage = lazy(() => import('../pages/Home/HomePage'));
// ... alte pagini

// Router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <HomePage />
          </Suspense>
        ),
      },
      // ... alte rute
    ],
  },
  // ... alte grupuri de rute
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
```

### 2. Layout-uri

Aplicația folosește trei layout-uri principale:

- **RootLayout**: Pentru paginile publice (Home, About)
- **AuthLayout**: Pentru paginile de autentificare (Login, Register, ForgotPassword)
- **DashboardLayout**: Pentru paginile din dashboard (protejate prin autentificare)

Fiecare layout folosește componenta `<Outlet />` pentru a afișa conținutul rutei active.

### 3. Protecția rutelor

Rutele care necesită autentificare sunt protejate folosind un guard:

```tsx
// AuthGuard.tsx
const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  if (isAuthenticated === null) {
    return <LoadingSpinner />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};
```

Acest guard este aplicat în configurarea rutelor:

```tsx
{
  path: '/dashboard',
  element: (
    <AuthGuard>
      <DashboardLayout />
    </AuthGuard>
  ),
  children: [
    // Rute protejate
  ],
}
```

## Structura de fișiere

```
src/
├── routes/
│   ├── index.tsx           # Configurarea principală a rutelor
│   ├── guards/
│   │   └── AuthGuard.tsx   # Guard pentru protecția rutelor
│   └── layouts/
│       ├── RootLayout.tsx      # Layout pentru paginile publice
│       ├── AuthLayout.tsx      # Layout pentru paginile de autentificare
│       └── DashboardLayout.tsx # Layout pentru dashboard
├── pages/
│   ├── Home/
│   │   └── HomePage.tsx
│   ├── About/
│   │   └── AboutPage.tsx
│   ├── Auth/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── ForgotPasswordPage.tsx
│   ├── Dashboard/
│   │   ├── DashboardPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── SettingsPage.tsx
│   └── NotFound/
│       └── NotFoundPage.tsx
└── components/
    └── layout/
        ├── Header/
        ├── Footer/
        ├── Sidebar/
        └── DashboardHeader/
```

## Funcționalități implementate

### 1. Lazy Loading

Paginile sunt încărcate folosind `lazy` și `Suspense` pentru a îmbunătăți performanța aplicației:

```tsx
const HomePage = lazy(() => import('../pages/Home/HomePage'));

// ...

<Suspense fallback={<LoadingSpinner />}>
  <HomePage />
</Suspense>
```

### 2. Navigare

Navigarea se face folosind componentele `Link` și `NavLink`:

```tsx
<Link to="/auth/login">Autentificare</Link>

<NavLink 
  to="/dashboard" 
  className={({ isActive }) => 
    `text-gray-700 hover:text-primary-600 ${
      isActive ? 'text-primary-600 font-medium' : ''
    }`
  }
>
  Dashboard
</NavLink>
```

Pentru navigare programatică, se folosește hook-ul `useNavigate`:

```tsx
const navigate = useNavigate();

// Navigare către o rută specifică
navigate('/dashboard');

// Navigare înapoi
navigate(-1);
```

### 3. Parametri și state

Pentru a transmite parametri între rute, se pot folosi:

- **URL Parameters**: `/users/:userId`
- **Query Parameters**: `/search?q=term`
- **Location State**: `navigate('/dashboard', { state: { from: 'login' } })`

## Bune practici

1. **Folosiți layout-uri** pentru a reutiliza structura comună între pagini
2. **Implementați lazy loading** pentru a îmbunătăți performanța
3. **Protejați rutele** care necesită autentificare
4. **Folosiți NavLink** pentru a evidenția link-ul activ
5. **Implementați o pagină 404** pentru rutele inexistente

## Resurse

- [Documentație oficială React Router](https://reactrouter.com/en/main)
- [Tutorial React Router](https://reactrouter.com/en/main/start/tutorial)
- [Ghid de migrare la React Router v6](https://reactrouter.com/en/main/upgrading/v5)
