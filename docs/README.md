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

## Plan de Implementare

Implementarea este organizată în 8 faze:

1. **Configurare și Setup**: Configurare repository, proiecte, bază de date, Docker, CI/CD
2. **Implementare Core și Autentificare**: Schema bază de date, autentificare, layout principal
3. **Implementare Module de Bază**: Module geografice, entități, operaționale
4. **Implementare Module Complexe**: Autospeciale, contracte, facturare, rapoarte
5. **Implementare Gestionare Documente**: Stocare, procesare, indexare documente
6. **Implementare Analiză Date și Machine Learning**: Predicții, optimizări, vizualizări
7. **Optimizare și Finalizare**: Performanță, teste, documentație, securitate
8. **Monitorizare și Îmbunătățiri**: Suport, îmbunătățiri continue, scalare

Detalii complete despre fiecare fază se găsesc în fișierele checklist-faza\*.md.

## Running the Project with Docker

This project provides a full-stack setup with a TypeScript/NestJS backend, a React frontend, and a PostgreSQL database, all orchestrated via Docker Compose.

### Project-Specific Docker Requirements

- **Node.js Version:** 22.13.1 (as specified in both backend and frontend Dockerfiles)
- **Nginx Version:** 1.25.5-alpine (for serving the frontend)
- **PostgreSQL Version:** `postgres:latest` (can be pinned as needed)

### Environment Variables

- **Backend:**
  - Uses `./backend/.env` (ensure this file exists and is configured)
- **Frontend:**
  - Uses `./frontend/.env` (ensure this file exists and is configured)
- **PostgreSQL:**
  - `POSTGRES_USER=postgres`
  - `POSTGRES_PASSWORD=postgres`
  - `POSTGRES_DB=management_deseuri`

### Exposed Ports

- **Backend API:** `localhost:3000` (container `ts-backend`)
- **Frontend:** `localhost:8080` (container `ts-frontend`)
- **PostgreSQL:** `localhost:5432` (container `postgres`)

### Build and Run Instructions

1. **Ensure Docker and Docker Compose are installed.**
2. **Configure environment files:**
   - Place your environment variables in `./backend/.env` and `./frontend/.env` as needed.
3. **Build and start all services:**
   ```sh
   docker compose up --build
   ```
   This will build the backend and frontend images and start all services.
4. **Access the services:**
   - **Frontend:** http://localhost:8080
   - **Backend API:** http://localhost:3000
   - **PostgreSQL:** localhost:5432 (for development or admin tools)

### Special Configuration Notes

- **Persistent Database Storage:**
  - PostgreSQL data is stored in a Docker volume `pgdata` for persistence across restarts.
- **Custom Nginx Config:**
  - The frontend uses a custom `nginx.conf` (see `./frontend/nginx.conf`).
- **Non-root Users:**
  - Both backend and frontend containers run as non-root users for improved security.
- **Backend depends on PostgreSQL:**
  - The backend service will wait for the database to be ready before starting.

---

_This section was updated to reflect the current Docker-based setup for this project. For more details, see the individual `README.md` files in the `backend` and `frontend` directories._
