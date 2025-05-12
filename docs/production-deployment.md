# Deployment în Mediul de Producție

Acest document descrie procesul de deployment al aplicației WasteWise în mediul de producție.

## Arhitectură

Mediul de producție este configurat cu următoarele componente:

- **Server de producție**: Un server dedicat pentru rularea aplicației
- **Bază de date PostgreSQL**: O instanță dedicată pentru mediul de producție
- **Redis**: Pentru cache și sesiuni
- **MinIO**: Pentru stocare documente
- **Nginx**: Pentru reverse proxy și load balancing
- **Prometheus & Grafana**: Pentru monitorizare
- **Loki & Promtail**: Pentru logging centralizat

## Workflow de Deployment

Procesul de deployment în producție este automatizat folosind GitHub Actions și este configurat în fișierul `.github/workflows/production-deployment.yml`.

### Declanșare

Workflow-ul de deployment poate fi declanșat în trei moduri:

1. **Automat**: La fiecare push în branch-ul `main`
2. **Automat**: La fiecare tag de versiune (ex: `v1.0.0`)
3. **Manual**: Prin declanșarea manuală a workflow-ului din interfața GitHub Actions

### Pași

Workflow-ul de deployment include următorii pași:

1. **Pregătire**: Configurare variabile și generare versiune
2. **Build Backend**: Construire și push imagine Docker pentru backend
3. **Build Frontend**: Construire și push imagine Docker pentru frontend
4. **Aprobare Manuală**: Solicitare aprobare pentru deployment în producție
5. **Deploy**: Deployment pe serverul de producție
6. **Verificare**: Verificare disponibilitate și sănătate aplicație
7. **Rollback Automat**: Rollback automat în caz de eșec

## Configurare

### Secrets GitHub

Pentru ca workflow-ul să funcționeze corect, trebuie configurate următoarele secrets în repository-ul GitHub:

- `PRODUCTION_SERVER`: Adresa serverului de producție
- `PRODUCTION_SSH_PORT`: Portul SSH al serverului de producție
- `PRODUCTION_SSH_USER`: Utilizatorul SSH pentru deployment
- `PRODUCTION_SSH_PRIVATE_KEY`: Cheia SSH privată pentru autentificare
- `PRODUCTION_DEPLOY_PATH`: Calea pe server unde va fi deployată aplicația
- `PRODUCTION_DB_HOST`: Adresa bazei de date PostgreSQL
- `PRODUCTION_DB_PORT`: Portul bazei de date PostgreSQL
- `PRODUCTION_DB_USERNAME`: Utilizatorul bazei de date PostgreSQL
- `PRODUCTION_DB_PASSWORD`: Parola bazei de date PostgreSQL
- `PRODUCTION_DB_DATABASE`: Numele bazei de date PostgreSQL
- `PRODUCTION_DB_SSL`: Dacă se folosește SSL pentru conexiunea la baza de date
- `PRODUCTION_REDIS_HOST`: Adresa serverului Redis
- `PRODUCTION_REDIS_PORT`: Portul serverului Redis
- `PRODUCTION_REDIS_PASSWORD`: Parola serverului Redis
- `PRODUCTION_JWT_SECRET`: Secret-ul JWT pentru mediul de producție
- `PRODUCTION_JWT_EXPIRATION`: Durata de expirare a token-urilor JWT
- `PRODUCTION_FRONTEND_URL`: URL-ul frontend-ului în mediul de producție
- `PRODUCTION_API_URL`: URL-ul API-ului în mediul de producție
- `PRODUCTION_MINIO_ROOT_USER`: Utilizatorul root pentru MinIO
- `PRODUCTION_MINIO_ROOT_PASSWORD`: Parola utilizatorului root pentru MinIO
- `SLACK_WEBHOOK`: URL-ul webhook pentru notificări Slack

### Configurare Server

Serverul de producție trebuie să aibă următoarele componente instalate:

- Docker
- Docker Compose
- Git
- SSH Server

## Proces de Deployment

### Aprobare Manuală

Înainte de a face deployment în producție, workflow-ul solicită o aprobare manuală. Acest pas este crucial pentru a preveni deployments accidentale sau problematice.

Procesul de aprobare:

1. Workflow-ul creează un issue în repository cu detalii despre versiunea care urmează să fie deployată
2. Utilizatorii cu drepturi de aprobare primesc o notificare
3. Deployment-ul continuă doar după ce issue-ul este aprobat

### Rollback Automat

În cazul în care verificările post-deployment eșuează, workflow-ul va efectua automat un rollback la versiunea anterioară. Acest mecanism asigură că aplicația rămâne funcțională chiar și în cazul unor probleme cu noua versiune.

Procesul de rollback:

1. Workflow-ul detectează că verificările post-deployment au eșuat
2. Se restaurează imaginile Docker anterioare
3. Se repornesc serviciile cu versiunea anterioară
4. Se trimite o notificare despre rollback

## Deployment Manual

În cazul în care este necesar un deployment manual, urmați acești pași:

1. Conectați-vă la serverul de producție:
   ```bash
   ssh user@production-server
   ```

2. Navigați la directorul de deployment:
   ```bash
   cd /var/www/wastewise-production
   ```

3. Actualizați codul sursă:
   ```bash
   git pull origin main
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

## Rollback Manual

În cazul în care este necesar un rollback manual la o versiune anterioară:

1. Conectați-vă la serverul de producție
2. Navigați la directorul de deployment
3. Rulați comanda de rollback:
   ```bash
   docker tag ghcr.io/sfsorin/wastewise/backend:rollback ghcr.io/sfsorin/wastewise/backend:production
   docker tag ghcr.io/sfsorin/wastewise/frontend:rollback ghcr.io/sfsorin/wastewise/frontend:production
   docker-compose down
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

4. **Rollback eșuat**:
   - Verificați dacă există imagini de backup: `docker images | grep rollback`
   - Restaurați manual din backup-ul bazei de date
