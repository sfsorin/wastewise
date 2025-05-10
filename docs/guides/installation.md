# Ghid de Instalare și Dezvoltare WasteWise

Acest document oferă instrucțiuni detaliate pentru instalarea, configurarea și dezvoltarea aplicației WasteWise.

## Cuprins

- [Cerințe Preliminare](#cerințe-preliminare)
- [Instalare cu Docker](#instalare-cu-docker)
- [Instalare Manuală](#instalare-manuală)
- [Configurare](#configurare)
- [Dezvoltare](#dezvoltare)
- [Testare](#testare)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Cerințe Preliminare

Pentru a dezvolta și rula aplicația WasteWise, aveți nevoie de următoarele:

### Pentru Instalare cu Docker

- Docker (versiunea 20.10.0 sau mai recentă)
- Docker Compose (versiunea 2.0.0 sau mai recentă)
- Git

### Pentru Instalare Manuală

- Node.js (versiunea 16.x sau mai recentă)
- npm (versiunea 8.x sau mai recentă) sau yarn (versiunea 1.22.x sau mai recentă)
- PostgreSQL (versiunea 13.x sau mai recentă)
- Python (versiunea 3.9.x sau mai recentă)
- pip (versiunea 21.x sau mai recentă)
- Git

## Instalare cu Docker

Instalarea cu Docker este cea mai simplă metodă de a rula aplicația WasteWise, deoarece configurează automat toate serviciile necesare.

### Pași de Instalare

1. **Clonați repository-ul**

```bash
git clone https://github.com/your-organization/wastewise.git
cd wastewise
```

2. **Configurați variabilele de mediu**

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
cp ml-service/.env.example ml-service/.env
```

Editați fișierele `.env` pentru a configura variabilele de mediu conform mediului dumneavoastră.

3. **Construiți și porniți containerele Docker**

```bash
docker-compose up --build
```

Acest comandă va construi și porni toate serviciile definite în `docker-compose.yml`.

4. **Verificați instalarea**

După ce toate containerele sunt pornite, puteți accesa:

- Frontend: http://localhost:8080
- Backend API: http://localhost:3000
- Swagger API Docs: http://localhost:3000/api/docs
- ML Service API: http://localhost:5000
- ML Service Docs: http://localhost:5000/docs

## Instalare Manuală

Instalarea manuală este utilă pentru dezvoltare sau când aveți nevoie de mai mult control asupra configurației.

### Backend (NestJS)

1. **Instalați dependențele**

```bash
cd backend
npm install
```

2. **Configurați variabilele de mediu**

```bash
cp .env.example .env
```

Editați fișierul `.env` pentru a configura conexiunea la baza de date și alte setări.

3. **Rulați migrările bazei de date**

```bash
npm run migration:run
```

4. **Porniți serverul în modul dezvoltare**

```bash
npm run start:dev
```

Serverul va rula pe http://localhost:3000.

### Frontend (React)

1. **Instalați dependențele**

```bash
cd frontend
npm install
```

2. **Configurați variabilele de mediu**

```bash
cp .env.example .env
```

Editați fișierul `.env` pentru a configura URL-ul API-ului și alte setări.

3. **Porniți serverul de dezvoltare**

```bash
npm run dev
```

Aplicația va rula pe http://localhost:5173.

### ML Service (Python/FastAPI)

1. **Creați și activați un mediu virtual**

```bash
cd ml-service
python -m venv venv
source venv/bin/activate  # Pe Windows: venv\Scripts\activate
```

2. **Instalați dependențele**

```bash
pip install -r requirements.txt
```

3. **Configurați variabilele de mediu**

```bash
cp .env.example .env
```

Editați fișierul `.env` pentru a configura conexiunea la baza de date și alte setări.

4. **Porniți serverul de dezvoltare**

```bash
uvicorn app.main:app --reload
```

Serviciul va rula pe http://localhost:8000.

## Configurare

### Configurare Bază de Date

Aplicația WasteWise utilizează PostgreSQL ca bază de date principală. Puteți configura conexiunea la baza de date în fișierul `.env` din directorul `backend`:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=wastewise
```

### Configurare JWT

Pentru autentificare, aplicația utilizează JWT (JSON Web Tokens). Configurați secretul JWT și durata de viață a token-urilor în fișierul `.env` din directorul `backend`:

```
JWT_SECRET=your-secret-key
JWT_EXPIRATION=3600
```

### Configurare MinIO/S3

Pentru stocarea documentelor, aplicația utilizează MinIO sau S3. Configurați conexiunea în fișierul `.env` din directorul `backend`:

```
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET=wastewise
```

### Configurare ML Service

Configurați conexiunea la serviciul ML în fișierul `.env` din directorul `backend`:

```
ML_SERVICE_URL=http://localhost:8000
ML_SERVICE_API_KEY=your-api-key
```

## Dezvoltare

### Structura Proiectului

Consultați [Structura Proiectului](../project_structure.md) pentru o descriere detaliată a structurii de foldere și organizării codului.

### Convenții de Cod

Consultați [Ghidul de Contribuție](../CONTRIBUTING.md) pentru informații despre convențiile de cod și procesul de dezvoltare.

### Workflow de Dezvoltare

1. **Creați un branch nou pentru funcționalitatea sau bug-ul la care lucrați**

```bash
git checkout -b feature/nume-functionalitate
```

2. **Implementați modificările**

3. **Rulați testele pentru a verifica că totul funcționează corect**

```bash
# Backend
cd backend
npm run test

# Frontend
cd frontend
npm run test
```

4. **Formatați codul conform convențiilor**

```bash
# Backend
cd backend
npm run format

# Frontend
cd frontend
npm run format
```

5. **Creați un commit cu modificările**

```bash
git add .
git commit -m "feat: adaugare functionalitate X"
```

6. **Împingeți modificările în repository**

```bash
git push origin feature/nume-functionalitate
```

7. **Creați un Pull Request**

## Testare

### Teste Unitare

```bash
# Backend
cd backend
npm run test

# Frontend
cd frontend
npm run test
```

### Teste de Integrare

```bash
# Backend
cd backend
npm run test:e2e
```

### Teste End-to-End

```bash
# Cu Cypress
cd frontend
npm run test:e2e
```

## Deployment

### Deployment cu Docker

Pentru deployment în producție, recomandăm utilizarea Docker și Docker Compose:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Deployment Manual

Pentru deployment manual, urmați acești pași:

1. **Construiți aplicația frontend**

```bash
cd frontend
npm run build
```

2. **Copiați fișierele build pe serverul web**

3. **Construiți și porniți aplicația backend**

```bash
cd backend
npm run build
npm run start:prod
```

4. **Construiți și porniți serviciul ML**

```bash
cd ml-service
uvicorn app.main:app
```

## Troubleshooting

### Probleme Comune

#### Eroare de Conexiune la Baza de Date

Verificați:
- Dacă baza de date este pornită
- Dacă credențialele din fișierul `.env` sunt corecte
- Dacă firewall-ul permite conexiuni pe portul bazei de date

#### Eroare CORS

Verificați:
- Dacă URL-ul frontend-ului este configurat corect în backend
- Dacă headerele CORS sunt configurate corect

#### Eroare JWT

Verificați:
- Dacă secretul JWT este configurat corect
- Dacă token-ul nu a expirat
- Dacă token-ul este trimis corect în header-ul Authorization

#### Probleme Docker

Verificați:
- Dacă Docker și Docker Compose sunt instalate corect
- Dacă porturile necesare nu sunt deja utilizate
- Logurile containerelor pentru a identifica probleme specifice:

```bash
docker-compose logs -f
```

Pentru mai multe informații sau asistență, consultați documentația detaliată sau contactați echipa de dezvoltare.
