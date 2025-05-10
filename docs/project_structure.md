# Structura Proiectului WasteWise

Acest document descrie structura de foldere și organizarea codului pentru aplicația WasteWise.

## Structura Generală

```
wastewise/
├── backend/               # Codul backend (NestJS)
├── frontend/              # Codul frontend (React)
├── ml-service/            # Serviciul de Machine Learning (Python)
├── docs/                  # Documentație
├── docker-compose.yml     # Configurație Docker Compose
└── README.md              # Documentație principală
```

## Backend (NestJS)

```
backend/
├── src/
│   ├── config/            # Configurații aplicație
│   │   ├── app.config.ts
│   │   ├── database.config.ts
│   │   └── jwt.config.ts
│   ├── modules/           # Module NestJS organizate pe funcționalități
│   │   ├── auth/          # Autentificare și autorizare
│   │   │   ├── controllers/
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   ├── guards/
│   │   │   ├── services/
│   │   │   └── auth.module.ts
│   │   ├── users/         # Gestionare utilizatori
│   │   ├── geographic/    # Module geografice (județe, localități, UAT-uri)
│   │   ├── entities/      # Module entități (clienți, puncte colectare)
│   │   ├── operational/   # Module operaționale (categorii deșeuri, servicii)
│   │   ├── vehicles/      # Module autospeciale și șoferi
│   │   ├── contracts/     # Module contracte și prețuri
│   │   ├── invoicing/     # Module facturare
│   │   ├── reports/       # Module rapoarte
│   │   └── documents/     # Module gestionare documente
│   ├── shared/            # Cod partajat între module
│   │   ├── decorators/    # Decoratori custom
│   │   ├── filters/       # Filtre excepții
│   │   ├── guards/        # Guards comune
│   │   ├── interceptors/  # Interceptori
│   │   ├── interfaces/    # Interfețe comune
│   │   ├── pipes/         # Pipes de validare
│   │   └── utils/         # Utilități
│   ├── app.module.ts      # Modulul principal
│   └── main.ts            # Punct de intrare aplicație
├── test/                  # Teste
│   ├── e2e/               # Teste end-to-end
│   └── unit/              # Teste unitare
├── migration/             # Migrări bază de date
├── .env                   # Variabile de mediu
├── .env.example           # Exemplu variabile de mediu
├── nest-cli.json          # Configurație NestJS CLI
├── package.json           # Dependențe și script-uri
├── tsconfig.json          # Configurație TypeScript
├── Dockerfile             # Configurație Docker
└── README.md              # Documentație backend
```

## Frontend (React)

```
frontend/
├── public/                # Fișiere statice
│   ├── assets/            # Imagini, fonturi, etc.
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── components/        # Componente React reutilizabile
│   │   ├── common/        # Componente comune (Button, Input, etc.)
│   │   ├── layout/        # Componente layout (Header, Sidebar, etc.)
│   │   ├── forms/         # Componente formulare
│   │   ├── tables/        # Componente tabele
│   │   ├── charts/        # Componente grafice
│   │   └── maps/          # Componente hărți
│   ├── hooks/             # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useFetch.ts
│   │   └── useForm.ts
│   ├── pages/             # Pagini aplicație
│   │   ├── auth/          # Pagini autentificare
│   │   ├── dashboard/     # Dashboard
│   │   ├── geographic/    # Pagini module geografice
│   │   ├── entities/      # Pagini module entități
│   │   ├── operational/   # Pagini module operaționale
│   │   ├── vehicles/      # Pagini module autospeciale
│   │   ├── contracts/     # Pagini module contracte
│   │   ├── invoicing/     # Pagini module facturare
│   │   ├── reports/       # Pagini module rapoarte
│   │   └── documents/     # Pagini module documente
│   ├── stores/            # State management (Zustand)
│   │   ├── authStore.ts
│   │   ├── uiStore.ts
│   │   └── entityStores/  # Store-uri pentru entități
│   ├── services/          # Servicii API
│   │   ├── api.ts         # Client API de bază
│   │   ├── authService.ts
│   │   └── entityServices/# Servicii pentru entități
│   ├── utils/             # Utilități
│   │   ├── formatters.ts  # Formatare date
│   │   ├── validators.ts  # Validatori
│   │   └── helpers.ts     # Funcții helper
│   ├── types/             # Tipuri TypeScript
│   ├── constants/         # Constante
│   ├── styles/            # Stiluri globale
│   ├── App.tsx            # Componenta principală
│   ├── main.tsx           # Punct de intrare
│   └── vite-env.d.ts      # Declarații tipuri Vite
├── .env                   # Variabile de mediu
├── .env.example           # Exemplu variabile de mediu
├── package.json           # Dependențe și script-uri
├── tsconfig.json          # Configurație TypeScript
├── vite.config.ts         # Configurație Vite
├── tailwind.config.js     # Configurație Tailwind CSS
├── postcss.config.js      # Configurație PostCSS
├── Dockerfile             # Configurație Docker
└── README.md              # Documentație frontend
```

## ML Service (Python)

```
ml-service/
├── app/
│   ├── api/               # API FastAPI
│   │   ├── endpoints/     # Endpoint-uri API
│   │   │   ├── predictions.py
│   │   │   ├── training.py
│   │   │   └── health.py
│   │   ├── dependencies.py# Dependențe API
│   │   ├── security.py    # Securitate API
│   │   └── router.py      # Router API
│   ├── core/              # Configurații de bază
│   │   ├── config.py      # Configurație aplicație
│   │   ├── security.py    # Utilități securitate
│   │   └── logging.py     # Configurație logging
│   ├── db/                # Acces bază de date
│   │   ├── session.py     # Sesiune bază de date
│   │   └── crud/          # Operațiuni CRUD
│   ├── models/            # Modele ML
│   │   ├── prediction/    # Modele pentru predicții
│   │   │   ├── quantity_prediction.py
│   │   │   ├── financial_prediction.py
│   │   │   └── route_optimization.py
│   │   ├── training/      # Logică antrenare modele
│   │   └── evaluation/    # Evaluare modele
│   ├── schemas/           # Scheme Pydantic
│   │   ├── prediction.py
│   │   ├── training.py
│   │   └── common.py
│   ├── services/          # Servicii business logic
│   │   ├── prediction_service.py
│   │   ├── training_service.py
│   │   └── data_service.py
│   ├── utils/             # Utilități
│   │   ├── preprocessing.py
│   │   ├── feature_engineering.py
│   │   └── visualization.py
│   └── main.py            # Punct de intrare aplicație
├── tests/                 # Teste
│   ├── api/               # Teste API
│   ├── models/            # Teste modele
│   └── conftest.py        # Configurație pytest
├── data/                  # Date pentru modele
│   ├── raw/               # Date brute
│   ├── processed/         # Date procesate
│   └── models/            # Modele salvate
├── notebooks/             # Jupyter notebooks pentru explorare
├── .env                   # Variabile de mediu
├── .env.example           # Exemplu variabile de mediu
├── requirements.txt       # Dependențe Python
├── Dockerfile             # Configurație Docker
└── README.md              # Documentație ML service
```

## Documentație

```
docs/
├── checklist-faza1.md     # Checklist Faza 1: Configurare și Setup
├── checklist-faza2.md     # Checklist Faza 2: Implementare Core și Autentificare
├── checklist-faza3.md     # Checklist Faza 3: Implementare Module de Bază
├── checklist-faza4.md     # Checklist Faza 4: Implementare Module Complexe
├── checklist-faza5.md     # Checklist Faza 5: Implementare Gestionare Documente
├── checklist-faza6.md     # Checklist Faza 6: Implementare Analiză Date și ML
├── checklist-faza7-8.md   # Checklist Faza 7-8: Optimizare, Finalizare, Monitorizare
├── architecture/          # Diagrame de arhitectură
│   ├── system_architecture.png
│   ├── database_schema.png
│   └── component_diagram.png
├── api/                   # Documentație API
│   ├── auth.md
│   ├── geographic.md
│   ├── entities.md
│   └── ...
├── guides/                # Ghiduri utilizare
│   ├── installation.md
│   ├── development.md
│   └── deployment.md
├── CONTRIBUTING.md        # Ghid de contribuție
└── project_structure.md   # Structura proiectului (acest document)
```

## Docker și Configurație

```
docker-compose.yml         # Configurație Docker Compose pentru toate serviciile
.dockerignore              # Fișiere ignorate de Docker
.gitignore                 # Fișiere ignorate de Git
.editorconfig              # Configurație editor
.prettierrc                # Configurație Prettier
.eslintrc                  # Configurație ESLint
```

Această structură de proiect este concepută pentru a fi modulară, scalabilă și ușor de întreținut, urmând principiile de dezvoltare moderne și best practices pentru fiecare tehnologie utilizată.
