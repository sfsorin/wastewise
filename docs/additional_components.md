# Componente Adiționale WasteWise

Acest document descrie componentele adiționale ale proiectului WasteWise care nu sunt menționate explicit în documentația inițială.

## Structura Generală Extinsă

Pe lângă structura de bază descrisă în [Structura Proiectului](./project_structure.md), proiectul include următoarele componente adiționale:

```
wastewise/
├── backend/               # Codul backend (NestJS)
├── frontend/              # Codul frontend (React)
├── ml-service/            # Serviciul de Machine Learning (Python)
├── docs/                  # Documentație
├── grafana/               # Configurații Grafana pentru monitorizare
├── nginx/                 # Configurații Nginx pentru server web
├── prometheus/            # Configurații Prometheus pentru monitorizare
├── promtail/              # Configurații Promtail pentru logging
├── scripts/               # Script-uri utilitare pentru proiect
├── docker-compose.yml     # Configurație Docker Compose
└── README.md              # Documentație principală
```

## Componente de Monitorizare și Logging

### Grafana (`grafana/`)

Grafana este utilizat pentru vizualizarea datelor de monitorizare. Structura directorului:

```
grafana/
├── dashboards/            # Dashboard-uri predefinite
│   └── node-exporter-dashboard.json
├── provisioning/          # Configurații pentru provisioning automat
│   ├── dashboards/        # Configurații pentru dashboard-uri
│   │   └── dashboard.yml
│   └── datasources/       # Configurații pentru surse de date
│       └── datasource.yml
```

### Prometheus (`prometheus/`)

Prometheus este utilizat pentru colectarea și stocarea metricilor de monitorizare. Structura directorului:

```
prometheus/
└── prometheus.yml         # Configurație Prometheus
```

### Promtail (`promtail/`)

Promtail este utilizat pentru colectarea și trimiterea log-urilor către un sistem centralizat de logging. Structura directorului:

```
promtail/
└── promtail-config.yml    # Configurație Promtail
```

## Componente de Infrastructură

### Nginx (`nginx/`)

Nginx este utilizat ca server web și proxy invers pentru aplicație. Structura directorului:

```
nginx/
├── conf.d/                # Configurații specifice site-urilor
│   └── default.conf
├── nginx.conf             # Configurație principală Nginx
└── ssl/                   # Certificate SSL
    └── .gitkeep
```

## Script-uri Utilitare

### Scripts (`scripts/`)

Directorul `scripts/` conține script-uri utilitare pentru diverse operațiuni:

```
scripts/
├── backup-database.bat    # Script pentru backup bază de date (Windows)
├── backup-database.sh     # Script pentru backup bază de date (Linux/Mac)
├── generate-admin-password.js # Script pentru generare parolă admin
├── manage-volumes.bat     # Script pentru gestionare volume Docker (Windows)
├── manage-volumes.sh      # Script pentru gestionare volume Docker (Linux/Mac)
├── onboarding.bat         # Script pentru onboarding (Windows)
├── onboarding.sh          # Script pentru onboarding (Linux/Mac)
├── startapp-detached.bat  # Script pentru pornire aplicație în mod detached (Windows)
├── startapp-detached.sh   # Script pentru pornire aplicație în mod detached (Linux/Mac)
├── test-containerization.bat # Script pentru testare containerizare (Windows)
├── test-containerization.sh # Script pentru testare containerizare (Linux/Mac)
└── update-admin-password.sql # Script SQL pentru actualizare parolă admin
```

## Componente Frontend Adiționale

### Directoare adiționale în `frontend/src/`

```
frontend/src/
├── __mocks__/             # Mock-uri pentru teste
├── providers/             # Provideri pentru context React
├── routes/                # Configurație rutare
│   ├── guards/            # Guards pentru rutare
│   └── layouts/           # Layout-uri pentru rutare
└── test/                  # Configurație teste
```

## Componente Backend Adiționale

### Directoare adiționale în `backend/`

```
backend/
├── scripts/               # Script-uri utilitare pentru backend
│   ├── backup-database.sh
│   ├── create-database.sql
│   ├── create-roles-permissions.sql
│   ├── create-schemas-users.sql
│   ├── drop-schemas-users.sql
│   ├── generate-password-hash.js
│   ├── restore-database.sh
│   ├── setup-backup-cron.sh
│   ├── update-admin-password.sql
│   └── update-admin-user.sql
```

## Integrarea Componentelor Adiționale

Aceste componente adiționale sunt integrate în proiect pentru a oferi funcționalități de monitorizare, logging, și infrastructură. Ele sunt configurate în fișierele Docker Compose și sunt utilizate în diverse etape ale dezvoltării și deployment-ului.

### Monitorizare și Logging

Componentele de monitorizare (Grafana, Prometheus) și logging (Promtail) sunt utilizate pentru a monitoriza performanța aplicației și pentru a colecta log-uri centralizat. Aceste componente sunt esențiale pentru detectarea și diagnosticarea problemelor în mediile de producție.

### Infrastructură

Nginx este utilizat ca server web și proxy invers pentru a ruta cererile către serviciile corespunzătoare (backend, frontend, ml-service). Acesta oferă și funcționalități de securitate și optimizare a performanței.

### Script-uri Utilitare

Script-urile utilitare sunt utilizate pentru diverse operațiuni de administrare și dezvoltare, cum ar fi backup-ul bazei de date, generarea de parole, și pornirea aplicației în diferite moduri.
