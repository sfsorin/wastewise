# Constante

Acest director conține constante utilizate în întreaga aplicație WasteWise.

## Structură

```
constants/
├── index.ts           # Export principal pentru toate constantele
└── README.md          # Acest fișier
```

## Utilizare

Constantele sunt organizate pe categorii și pot fi importate individual sau ca un întreg:

```tsx
// Import individual
import { ROUTES, ROLES } from '@/constants';

// Sau import complet
import constants from '@/constants';
```

## Categorii de Constante

### Autentificare
- `AUTH_TOKEN_KEY`: Cheia pentru token-ul de autentificare în localStorage
- `REFRESH_TOKEN_KEY`: Cheia pentru token-ul de refresh în localStorage
- `AUTH_USER_KEY`: Cheia pentru datele utilizatorului în localStorage

### Rute
- `ROUTES`: Obiect cu toate rutele din aplicație

### Roluri și Permisiuni
- `ROLES`: Rolurile disponibile în aplicație
- `PERMISSIONS`: Permisiunile disponibile în aplicație

### Paginare
- `PAGINATION`: Constante pentru paginare (pagină implicită, dimensiune pagină, etc.)

### Tipuri și Statusuri
- `CLIENT_TYPES`: Tipurile de clienți
- `STATUS`: Statusurile posibile pentru diverse entități

### Notificări și Teme
- `NOTIFICATION_TYPES`: Tipurile de notificări
- `THEMES`: Temele disponibile în aplicație

### API și Validare
- `API`: Configurări pentru API (URL de bază, timeout, versiune)
- `VALIDATION`: Constante pentru validare (lungimi minime/maxime, etc.)

### Fișiere
- `FILE`: Constante pentru manipularea fișierelor (dimensiune maximă, tipuri permise, etc.)
