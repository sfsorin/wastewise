# Deployment în Mediul de Staging

Acest document descrie procesul de deployment al aplicației WasteWise în mediul de staging.

## Arhitectură

Mediul de staging este configurat pentru a fi cât mai apropiat posibil de mediul de producție, cu următoarele componente:

- **Server de staging**: Un server dedicat pentru rularea aplicației
- **Bază de date PostgreSQL**: O instanță separată pentru mediul de staging
- **Redis**: Pentru cache și sesiuni
- **MinIO**: Pentru stocare documente
- **Nginx**: Pentru reverse proxy și load balancing

## Workflow de Deployment

Procesul de deployment în staging este automatizat folosind GitHub Actions și este configurat în fișierul `.github/workflows/staging-deployment.yml`.

### Declanșare

Workflow-ul de deployment poate fi declanșat în două moduri:

1. **Automat**: La fiecare push în branch-ul `develop`
2. **Manual**: Prin declanșarea manuală a workflow-ului din interfața GitHub Actions

### Pași

Workflow-ul de deployment include următorii pași:

1. **Pregătire**: Configurare variabile și generare versiune
2. **Build Backend**: Construire și push imagine Docker pentru backend
3. **Build Frontend**: Construire și push imagine Docker pentru frontend
4. **Deploy**: Deployment pe serverul de staging
5. **Verificare**: Verificare disponibilitate și sănătate aplicație

## Configurare

### Secrets GitHub

Pentru ca workflow-ul să funcționeze corect, trebuie configurate următoarele secrets în repository-ul GitHub:

- `STAGING_SERVER`: Adresa serverului de staging
- `STAGING_SSH_PORT`: Portul SSH al serverului de staging
- `STAGING_SSH_USER`: Utilizatorul SSH pentru deployment
- `STAGING_SSH_PRIVATE_KEY`: Cheia SSH privată pentru autentificare
- `STAGING_DEPLOY_PATH`: Calea pe server unde va fi deployată aplicația
- `STAGING_DB_HOST`: Adresa bazei de date PostgreSQL
- `STAGING_DB_PORT`: Portul bazei de date PostgreSQL
- `STAGING_DB_USERNAME`: Utilizatorul bazei de date PostgreSQL
- `STAGING_DB_PASSWORD`: Parola bazei de date PostgreSQL
- `STAGING_DB_DATABASE`: Numele bazei de date PostgreSQL
- `STAGING_DB_SSL`: Dacă se folosește SSL pentru conexiunea la baza de date
- `STAGING_REDIS_HOST`: Adresa serverului Redis
- `STAGING_REDIS_PORT`: Portul serverului Redis
- `STAGING_REDIS_PASSWORD`: Parola serverului Redis
- `STAGING_JWT_SECRET`: Secret-ul JWT pentru mediul de staging
- `STAGING_JWT_EXPIRATION`: Durata de expirare a token-urilor JWT
- `STAGING_FRONTEND_URL`: URL-ul frontend-ului în mediul de staging
- `STAGING_API_URL`: URL-ul API-ului în mediul de staging
- `STAGING_MINIO_ROOT_USER`: Utilizatorul root pentru MinIO
- `STAGING_MINIO_ROOT_PASSWORD`: Parola utilizatorului root pentru MinIO
- `SLACK_WEBHOOK`: URL-ul webhook pentru notificări Slack

### Configurare Server

Serverul de staging trebuie să aibă următoarele componente instalate:

- Docker
- Docker Compose
- Git
- SSH Server

## Deployment Manual

În cazul în care este necesar un deployment manual, urmați acești pași:

1. Conectați-vă la serverul de staging:
   ```bash
   ssh user@staging-server
   ```

2. Navigați la directorul de deployment:
   ```bash
   cd /var/www/wastewise-staging
   ```

3. Actualizați codul sursă:
   ```bash
   git pull origin develop
   ```

4. Construiți și porniți containerele:
   ```bash
   docker-compose -f docker-compose.prod.yml build
   docker-compose -f docker-compose.prod.yml up -d
   ```

5. Verificați starea containerelor:
   ```bash
   docker-compose ps
   ```

## Rollback

În cazul în care este necesar un rollback la o versiune anterioară:

1. Conectați-vă la serverul de staging
2. Navigați la directorul de deployment
3. Rulați comanda de rollback:
   ```bash
   docker-compose down
   docker tag ghcr.io/sfsorin/wastewise/backend:VERSION_ANTERIOARA ghcr.io/sfsorin/wastewise/backend:staging
   docker tag ghcr.io/sfsorin/wastewise/frontend:VERSION_ANTERIOARA ghcr.io/sfsorin/wastewise/frontend:staging
   docker-compose up -d
   ```

## Monitorizare

După deployment, aplicația poate fi monitorizată prin:

- **Logs**: `docker-compose logs -f`
- **Metrics**: Prometheus + Grafana
- **Alerting**: Configurare alerte în Grafana sau integrare cu Slack

## Troubleshooting

### Probleme Comune

1. **Containerele nu pornesc**:
   - Verificați logs-urile: `docker-compose logs`
   - Verificați configurarea în fișierul `.env`

2. **Aplicația nu este accesibilă**:
   - Verificați configurarea Nginx
   - Verificați firewall-ul serverului

3. **Erori de bază de date**:
   - Verificați conexiunea la baza de date
   - Verificați migrările: `docker-compose run --rm backend npm run migration:status`
