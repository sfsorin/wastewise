# WasteWise - Aplicație de Management al Deșeurilor

## Descriere

WasteWise este o aplicație completă pentru managementul deșeurilor, concepută pentru a optimiza procesele de colectare, transport, procesare și facturare a deșeurilor. Aplicația oferă funcționalități avansate pentru gestionarea clienților, contractelor, rutelor de colectare, și include module de analiză și predicție bazate pe machine learning.

## Funcționalități Principale

- **Management Geografic**: Gestionare județe, localități, UAT-uri
- **Management Entități**: Gestionare clienți, puncte de colectare, operatori
- **Management Operațional**: Gestionare categorii deșeuri, servicii, colectări
- **Management Autospeciale**: Gestionare vehicule, șoferi, rute, programări
- **Management Contracte și Prețuri**: Gestionare contracte, liste de prețuri, termene și condiții
- **Facturare**: Generare automată facturi, înregistrare plăți, rapoarte financiare
- **Raportare și Analiză**: Rapoarte operaționale, financiare, de conformitate
- **Gestionare Documente**: Stocare, procesare și indexare documente
- **Analiză Date și Machine Learning**: Predicții cantități, optimizare rute, analiză financiară
- **Dashboard și Vizualizări**: Grafice interactive, hărți de densitate, analize comparative

## Tehnologii Utilizate

- **Backend**: NestJS, TypeScript, TypeORM, PostgreSQL
- **Frontend**: React, TypeScript, Tailwind CSS, Zustand
- **Machine Learning**: Python, scikit-learn, TensorFlow, FastAPI
- **Infrastructură**: Docker, Kubernetes, CI/CD (GitHub Actions)
- **Stocare Documente**: MinIO/S3
- **Monitorizare**: Prometheus, Grafana, ELK Stack

## Structura Proiectului

```
wastewise/
├── backend/               # Codul backend (NestJS)
├── frontend/              # Codul frontend (React)
├── ml-service/            # Serviciul de Machine Learning (Python)
├── docs/                  # Documentație
├── docker-compose.yml     # Configurație Docker Compose
└── README.md              # Documentație principală
```

## Instalare și Rulare

### Cerințe Preliminare

- Node.js (v22.13.1 sau mai recent)
- Docker și Docker Compose
- PostgreSQL (pentru dezvoltare locală fără Docker)

### Instalare cu Docker

1. Clonează repository-ul:
   ```
   git clone https://github.com/your-username/wastewise.git
   cd wastewise
   ```

2. Configurează fișierele de mediu:
   - Copiază `backend/.env.example` în `backend/.env`
   - Copiază `frontend/.env.example` în `frontend/.env`

3. Construiește și pornește containerele:
   ```
   docker compose up --build
   ```

4. Accesează aplicația:
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:3000
   - Documentație API: http://localhost:3000/api

### Instalare pentru Dezvoltare Locală

#### Backend

1. Navighează în directorul backend:
   ```
   cd backend
   ```

2. Instalează dependențele:
   ```
   npm install
   ```

3. Configurează variabilele de mediu:
   ```
   cp .env.example .env
   ```

4. Pornește serverul în modul dezvoltare:
   ```
   npm run start:dev
   ```

#### Frontend

1. Navighează în directorul frontend:
   ```
   cd frontend
   ```

2. Instalează dependențele:
   ```
   npm install
   ```

3. Configurează variabilele de mediu:
   ```
   cp .env.example .env
   ```

4. Pornește aplicația în modul dezvoltare:
   ```
   npm run dev
   ```

## Workflow Git

### Structură Branch-uri (GitFlow)

- `main`: Branch-ul principal pentru versiuni stabile
- `develop`: Branch-ul de dezvoltare
- `feature/*`: Branch-uri pentru funcționalități noi
- `bugfix/*`: Branch-uri pentru rezolvarea bug-urilor
- `release/*`: Branch-uri pentru pregătirea versiunilor
- `hotfix/*`: Branch-uri pentru rezolvarea urgentă a bug-urilor în producție

### Proces de Creare Branch-uri

1. Sincronizează branch-ul develop:
   ```
   git checkout develop
   git pull origin develop
   ```

2. Creează un branch nou:
   ```
   git checkout -b feature/nume-functionalitate
   ```

3. Lucrează pe branch-ul tău și fă commit-uri regulate.

### Proces de Creare Pull Requests

1. Asigură-te că branch-ul tău este actualizat cu develop:
   ```
   git checkout develop
   git pull origin develop
   git checkout feature/nume-functionalitate
   git merge develop
   ```

2. Rezolvă orice conflicte de merge.

3. Creează un Pull Request pe GitHub/GitLab.

## Licență

[Licență specifică proiectului]

## Contact

[Informații de contact]
