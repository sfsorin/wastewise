# Ghid Docker pentru WasteWise

Acest document descrie configurarea Docker pentru aplicația WasteWise, incluzând instrucțiuni pentru dezvoltare, producție, backup și troubleshooting.

## Cuprins

1. [Configurare inițială](#configurare-inițială)
2. [Mediul de dezvoltare](#mediul-de-dezvoltare)
3. [Mediul de producție](#mediul-de-producție)
4. [Persistența datelor](#persistența-datelor)
5. [Backup și recuperare](#backup-și-recuperare)
6. [Monitorizare și logging](#monitorizare-și-logging)
7. [Securitate](#securitate)
8. [Troubleshooting](#troubleshooting)
9. [Comenzi utile](#comenzi-utile)

## Configurare inițială

### Cerințe preliminare

- Docker (versiunea 20.10.0 sau mai nouă)
- Docker Compose (versiunea 2.0.0 sau mai nouă)
- Git

### Instalare

1. Clonați repository-ul:

```bash
git clone https://github.com/sfsorin/wastewise.git
cd wastewise
```

2. Rulați scriptul de onboarding:

```bash
# Linux/macOS
./scripts/onboarding.sh

# Windows
scripts\onboarding.bat
```

Acest script va:
- Verifica dependențele necesare
- Configura fișierele .env
- Crea directoarele pentru volume
- Instala dependențele pentru backend și frontend
- Configura Git hooks
- Porni containerele Docker

## Mediul de dezvoltare

### Structura Docker

Mediul de dezvoltare folosește următoarele fișiere:
- `docker-compose.dev.yml` - Configurare pentru dezvoltare
- `docker-compose.volumes.yml` - Configurare pentru volume
- `backend/Dockerfile.dev` - Dockerfile pentru backend în dezvoltare
- `frontend/Dockerfile.dev` - Dockerfile pentru frontend în dezvoltare

### Pornire și oprire

```bash
# Pornire
docker compose -f docker-compose.volumes.yml -f docker-compose.dev.yml up -d

# Oprire
docker compose -f docker-compose.volumes.yml -f docker-compose.dev.yml down

# Oprire și ștergere volume
docker compose -f docker-compose.volumes.yml -f docker-compose.dev.yml down -v
```

### Servicii disponibile

- **Backend API**: http://localhost:3000
- **Frontend**: http://localhost:5173
- **Swagger API Docs**: http://localhost:3000/api/docs
- **Adminer**: http://localhost:8081
- **MinIO Console**: http://localhost:9091
- **MinIO API**: http://localhost:9090
- **Grafana**: http://localhost:3001
- **Prometheus**: http://localhost:9092

### Hot Reloading

Configurarea include suport pentru hot reloading:
- **Backend**: Codul sursă este montat ca volum, iar nodemon va reporni serverul la modificări
- **Frontend**: Codul sursă este montat ca volum, iar Vite va actualiza aplicația la modificări

## Mediul de producție

### Structura Docker

Mediul de producție folosește următoarele fișiere:
- `docker-compose.prod.yml` - Configurare pentru producție
- `docker-compose.volumes.yml` - Configurare pentru volume
- `backend/Dockerfile.prod` - Dockerfile pentru backend în producție
- `frontend/Dockerfile.prod` - Dockerfile pentru frontend în producție

### Pornire și oprire

```bash
# Pornire
docker compose -f docker-compose.volumes.yml -f docker-compose.prod.yml up -d

# Oprire
docker compose -f docker-compose.volumes.yml -f docker-compose.prod.yml down

# Oprire și ștergere volume
docker compose -f docker-compose.volumes.yml -f docker-compose.prod.yml down -v
```

### Configurare SSL

Pentru a configura HTTPS:

1. Plasați certificatele SSL în directorul `nginx/ssl/`:
   - `server.crt` - Certificatul SSL
   - `server.key` - Cheia privată SSL

2. Decomentați secțiunea HTTPS din `nginx/conf.d/default.conf`.

### Scalare

Pentru a scala serviciile:

```bash
# Scalare backend la 3 instanțe
docker compose -f docker-compose.volumes.yml -f docker-compose.prod.yml up -d --scale backend=3
```

## Persistența datelor

### Volume configurate

- **pgdata**: Date PostgreSQL
- **redis-data**: Date Redis
- **minio-data**: Date MinIO
- **nginx-logs**: Log-uri Nginx
- **prometheus-data**: Date Prometheus
- **grafana-data**: Date Grafana
- **loki-data**: Date Loki

### Gestionare volume

Utilizați scriptul `manage-volumes.sh` pentru a gestiona volumele:

```bash
# Linux/macOS
./scripts/manage-volumes.sh

# Windows
scripts\manage-volumes.bat
```

Acest script permite:
- Crearea directoarelor pentru volume
- Backup-ul volumelor
- Restaurarea volumelor din backup
- Curățarea volumelor

## Backup și recuperare

### Backup bază de date

Utilizați scriptul `backup-database.sh` pentru a gestiona backup-urile bazei de date:

```bash
# Linux/macOS
./scripts/backup-database.sh

# Windows
scripts\backup-database.bat
```

Acest script permite:
- Crearea backup-urilor
- Listarea backup-urilor disponibile
- Restaurarea backup-urilor
- Curățarea backup-urilor vechi

### Backup automat

Pentru a configura backup-ul automat, adăugați un cron job:

```bash
# Backup zilnic la ora 2:00 AM
0 2 * * * /path/to/wastewise/scripts/backup-database.sh create
```

## Monitorizare și logging

### Servicii de monitorizare

- **Prometheus**: Colectare metrici
- **Grafana**: Vizualizare metrici
- **Node Exporter**: Metrici sistem
- **cAdvisor**: Metrici containere
- **Loki**: Colectare log-uri
- **Promtail**: Agent pentru log-uri

### Accesare dashboard-uri

- **Grafana**: http://localhost:3001 (admin/admin)
- **Prometheus**: http://localhost:9092

### Vizualizare log-uri

```bash
# Vizualizare log-uri pentru un serviciu
docker compose -f docker-compose.dev.yml logs -f backend
```

## Securitate

### Utilizatori non-root

Toate containerele sunt configurate pentru a rula ca utilizatori non-root pentru a îmbunătăți securitatea.

### Variabile de mediu

Toate secretele și parolele sunt configurate prin variabile de mediu. Copiați fișierul `.env.prod.example` în `.env` și configurați variabilele de mediu conform mediului dumneavoastră.

### Rate limiting

Nginx este configurat cu rate limiting pentru a preveni atacurile DoS.

## Troubleshooting

### Probleme comune

1. **Containere care nu pornesc**:
   - Verificați log-urile containerelor: `docker logs <container_id>`
   - Verificați configurația în fișierele docker-compose

2. **Probleme de comunicare între containere**:
   - Verificați rețelele Docker: `docker network ls`
   - Verificați configurația rețelelor în fișierele docker-compose

3. **Probleme de persistență date**:
   - Verificați volumele Docker: `docker volume ls`
   - Verificați permisiunile directoarelor pentru volume

4. **Probleme de performanță**:
   - Verificați utilizarea resurselor: `docker stats`
   - Optimizați configurația containerelor

### Testare containerizare

Utilizați scriptul `test-containerization.sh` pentru a testa containerizarea:

```bash
# Linux/macOS
./scripts/test-containerization.sh

# Windows
scripts\test-containerization.bat
```

## Comenzi utile

### Docker

```bash
# Listare containere
docker ps

# Listare imagini
docker images

# Listare volume
docker volume ls

# Listare rețele
docker network ls

# Vizualizare log-uri
docker logs <container_id>

# Intrare în container
docker exec -it <container_id> bash
```

### Docker Compose

```bash
# Vizualizare log-uri
docker compose -f docker-compose.dev.yml logs -f

# Restart serviciu
docker compose -f docker-compose.dev.yml restart backend

# Verificare configurație
docker compose -f docker-compose.dev.yml config

# Vizualizare utilizare resurse
docker compose -f docker-compose.dev.yml top
```
