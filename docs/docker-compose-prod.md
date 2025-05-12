# Docker Compose pentru Producție

Acest document descrie configurarea Docker Compose pentru mediul de producție al aplicației WasteWise.

## Structură

Configurarea Docker Compose pentru producție include următoarele servicii:

1. **postgres** - Baza de date PostgreSQL (versiune Alpine pentru dimensiune redusă)
2. **backend** - API-ul backend (NestJS) optimizat pentru producție
3. **frontend** - Aplicația frontend (React) servită prin Nginx
4. **redis** - Cache și sesiuni
5. **minio** - Stocare documente
6. **nginx** - Reverse proxy și load balancing

## Utilizare

### Pregătire

1. **Creați fișierul .env pentru variabilele de mediu**

```bash
cp .env.prod.example .env
```

Editați fișierul `.env` pentru a configura variabilele de mediu conform mediului dumneavoastră de producție.

2. **Configurați certificatele SSL (pentru HTTPS)**

Plasați certificatele SSL în directorul `nginx/ssl/`:
- `server.crt` - Certificatul SSL
- `server.key` - Cheia privată SSL

Pentru producție, decomentați secțiunea HTTPS din `nginx/conf.d/default.conf`.

### Pornire

Pentru a construi și porni toate serviciile:

```bash
docker compose -f docker-compose.prod.yml up -d
```

### Oprire

Pentru a opri toate serviciile:

```bash
docker compose -f docker-compose.prod.yml down
```

## Optimizări pentru Producție

### Securitate

1. **Variabile de Mediu**
   - Toate parolele și secretele sunt configurate prin variabile de mediu
   - Fișierul `.env` nu trebuie inclus în repository

2. **Nginx**
   - Configurare HTTPS cu TLS 1.2/1.3
   - Headers de securitate (X-Frame-Options, Content-Security-Policy, etc.)
   - Rate limiting pentru a preveni atacurile DoS

3. **Servicii**
   - Toate serviciile rulează cu permisiuni minime
   - Expunere minimă a porturilor (doar Nginx expune porturile 80/443)

### Performanță

1. **Replicare**
   - Backend și frontend configurate cu multiple replici
   - Nginx realizează load balancing între replici

2. **Resurse**
   - Limitare CPU și memorie pentru fiecare serviciu
   - Optimizare imagini Docker (Alpine pentru dimensiune redusă)

3. **Caching**
   - Redis pentru caching
   - Nginx configurare pentru caching static assets
   - Compresie gzip pentru reducerea traficului

### Monitorizare și Logging

1. **Logging**
   - Configurare json-file driver cu rotație
   - Limitare dimensiune log-uri (max 10MB per fișier, max 3 fișiere)

2. **Health Checks**
   - Configurare health checks pentru toate serviciile
   - Repornire automată în caz de eșec

## Volume

Configurarea folosește următoarele volume pentru persistența datelor:

- **pgdata-prod**: Date PostgreSQL
- **redis-data-prod**: Date Redis
- **minio-data-prod**: Date MinIO
- **nginx-logs**: Log-uri Nginx

## Rețele

Toate serviciile sunt conectate la rețeaua `wastewise-network-prod`.

## Note pentru Deployment

1. **Backup**
   - Configurați backup regulat pentru volumele de date
   - Testați procesul de restore periodic

2. **Scalare**
   - Pentru scalare orizontală, considerați utilizarea unui orchestrator precum Kubernetes
   - Pentru scalare verticală, ajustați limitele de resurse din docker-compose.prod.yml

3. **Monitorizare**
   - Considerați adăugarea unui stack de monitorizare (Prometheus + Grafana)
   - Configurați alerte pentru evenimente critice
