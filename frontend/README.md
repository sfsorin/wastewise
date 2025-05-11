# WasteWise Frontend

Frontend pentru aplicația WasteWise, implementat cu React, TypeScript, Vite și Tailwind CSS.

## Structură

```
frontend/
├── public/                # Fișiere statice
├── src/
│   ├── assets/            # Resurse (imagini, fonturi, etc.)
│   ├── components/        # Componente reutilizabile
│   │   ├── common/        # Componente comune
│   │   ├── layout/        # Componente de layout
│   │   └── ui/            # Componente UI
│   ├── hooks/             # Custom hooks
│   ├── pages/             # Pagini
│   ├── routes/            # Configurare rute
│   ├── services/          # Servicii pentru API
│   ├── store/             # State management (Zustand)
│   ├── types/             # Tipuri TypeScript
│   ├── utils/             # Utilități
│   ├── App.tsx            # Componenta principală
│   └── main.tsx           # Punct de intrare
├── .env.example           # Exemplu variabile de mediu
├── index.html             # HTML template
├── package.json           # Dependențe și script-uri
├── tailwind.config.js     # Configurație Tailwind CSS
├── tsconfig.json          # Configurație TypeScript
└── vite.config.ts         # Configurație Vite
```

## Instalare

```bash
# Instalare dependențe
npm install

# Copiere fișier .env
cp .env.example .env
```

## Rulare

```bash
# Dezvoltare
npm run dev

# Build pentru producție
npm run build

# Preview build
npm run preview
```

## Teste

Proiectul folosește Vitest și React Testing Library pentru testare.

```bash
# Rulare toate testele o singură dată
npm run test

# Rulare teste în mod watch (pentru dezvoltare)
npm run test:watch

# Rulare teste cu interfață UI
npm run test:ui

# Generare raport de acoperire cod
npm run test:coverage
```

### Structura testelor

- Testele sunt localizate lângă fișierele pe care le testează cu extensia `.test.tsx` sau `.test.ts`
- Fișierele de configurare pentru teste:
  - `vitest.config.ts` - Configurare Vitest
  - `src/test/setup.ts` - Setup global pentru teste
  - `src/__mocks__/` - Mock-uri pentru fișiere statice

### Exemple de teste

- Componente: `src/components/common/Button/Button.test.tsx`
- Hooks: `src/hooks/useLocalStorage.test.ts`
- Utilitare: `src/utils/formatters.test.ts`
