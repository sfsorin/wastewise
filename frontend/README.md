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

```bash
# Rulare teste
npm run test

# Rulare teste cu watch
npm run test:watch

# Acoperire cod
npm run test:coverage
```
