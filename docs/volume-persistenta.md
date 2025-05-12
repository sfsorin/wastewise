# Configurare Volume pentru Persistența Datelor

Acest document descrie configurarea volumelor Docker pentru persistența datelor în aplicația WasteWise.

## Structură

Configurarea volumelor pentru persistența datelor include:

1. **docker-compose.volumes.yml** - Fișier de configurare pentru volumele Docker
2. **scripts/manage-volumes.sh** - Script pentru gestionarea volumelor în Linux/macOS
3. **scripts/manage-volumes.bat** - Script pentru gestionarea volumelor în Windows
4. **data/** - Director pentru stocarea datelor persistente

## Volume Configurate

Următoarele volume sunt configurate pentru persistența datelor:

1. **pgdata** - Date PostgreSQL
2. **redis-data** - Date Redis
3. **rabbitmq-data** - Date RabbitMQ
4. **minio-data** - Date MinIO/S3
5. **log-data** - Log-uri
6. **backup-data** - Backup-uri

## Utilizare

### Configurare Inițială

Pentru a configura volumele pentru persistența datelor:

```bash
# Linux/macOS
./scripts/manage-volumes.sh create

# Windows
scripts\manage-volumes.bat create
```

Această comandă va crea directoarele necesare pentru volumele configurate.

### Utilizare cu Docker Compose

Pentru a utiliza volumele configurate cu Docker Compose:

```bash
# Dezvoltare
docker compose -f docker-compose.volumes.yml -f docker-compose.dev.yml up -d

# Producție
docker compose -f docker-compose.volumes.yml -f docker-compose.prod.yml up -d
```

### Backup Volume

Pentru a crea un backup al volumelor:

```bash
# Linux/macOS
./scripts/manage-volumes.sh backup

# Windows
scripts\manage-volumes.bat backup
```

Această comandă va crea un backup al tuturor volumelor în directorul `data/backups/`.

### Restaurare Volume

Pentru a restaura volumele dintr-un backup:

```bash
# Linux/macOS
./scripts/manage-volumes.sh restore data/backups/20250512_123456

# Windows
scripts\manage-volumes.bat restore data\backups\20250512_123456
```

### Afișare Informații

Pentru a afișa informații despre volumele configurate:

```bash
# Linux/macOS
./scripts/manage-volumes.sh info

# Windows
scripts\manage-volumes.bat info
```

### Curățare Volume

Pentru a curăța volumele (șterge toate datele):

```bash
# Linux/macOS
./scripts/manage-volumes.sh clean

# Windows
scripts\manage-volumes.bat clean
```

## Configurare Avansată

### Modificare Director de Date

Directorul de bază pentru date poate fi modificat prin setarea variabilei de mediu `DATA_PATH`:

```bash
# Linux/macOS
export DATA_PATH=/path/to/data
./scripts/manage-volumes.sh create

# Windows
set DATA_PATH=D:\path\to\data
scripts\manage-volumes.bat create
```

### Integrare cu Docker Compose

Fișierul `docker-compose.volumes.yml` poate fi utilizat împreună cu alte fișiere Docker Compose pentru a configura volumele pentru diferite medii:

```bash
# Dezvoltare cu volume persistente
docker compose -f docker-compose.volumes.yml -f docker-compose.dev.yml up -d

# Producție cu volume persistente
docker compose -f docker-compose.volumes.yml -f docker-compose.prod.yml up -d
```

## Backup și Restaurare

### Strategia de Backup

Se recomandă crearea de backup-uri regulate pentru volumele de date:

1. **Backup zilnic** - Pentru date critice
2. **Backup săptămânal** - Pentru toate datele
3. **Backup înainte de actualizări** - Pentru a preveni pierderea datelor în caz de probleme

### Restaurare

Procesul de restaurare implică următorii pași:

1. Oprirea containerelor
2. Restaurarea datelor din backup
3. Pornirea containerelor

## Note Importante

1. **Permisiuni** - Asigurați-vă că directoarele pentru volume au permisiunile corecte
2. **Backup extern** - Se recomandă stocarea backup-urilor și în locații externe
3. **Testare restaurare** - Testați periodic procesul de restaurare pentru a vă asigura că backup-urile sunt funcționale
4. **Monitorizare spațiu** - Monitorizați spațiul disponibil pentru volume pentru a evita umplerea discului
