#!/bin/bash
# Script pentru restaurarea bazei de date PostgreSQL pentru aplicația WasteWise
# Acest script restaurează baza de date din cel mai recent backup sau dintr-un backup specificat

# Configurare
DB_HOST=${DB_HOST:-"10.10.10.116"}
DB_PORT=${DB_PORT:-"5432"}
DB_NAME=${DB_NAME:-"wastewise"}
DB_USER=${DB_USER:-"postgres"}
DB_PASSWORD=${DB_PASSWORD:-"postgres"}

# Director pentru backup-uri
BACKUP_DIR=${BACKUP_DIR:-"/var/backups/postgresql/wastewise"}
# Log file
LOG_FILE="${BACKUP_DIR}/restore_log.txt"
# Backup specific (opțional)
SPECIFIC_BACKUP=$1

# Funcție pentru logging
log_message() {
    echo "[$(date +"%Y-%m-%d %H:%M:%S")] $1" | tee -a "$LOG_FILE"
}

# Verificare dacă directorul de backup există
if [ ! -d "$BACKUP_DIR" ]; then
    log_message "EROARE: Directorul de backup $BACKUP_DIR nu există."
    exit 1
fi

# Verificare dacă PGPASSWORD este setat, altfel îl setăm
if [ -z "$PGPASSWORD" ]; then
    export PGPASSWORD="$DB_PASSWORD"
fi

# Determinare backup pentru restaurare
if [ -z "$SPECIFIC_BACKUP" ]; then
    # Găsim cel mai recent backup
    BACKUP_FILE=$(find "$BACKUP_DIR" -name "wastewise_*.dump.gz" -type f -printf "%T@ %p\n" | sort -nr | head -1 | cut -d' ' -f2-)
    
    if [ -z "$BACKUP_FILE" ]; then
        log_message "EROARE: Nu s-a găsit niciun backup în directorul $BACKUP_DIR."
        exit 1
    fi
    
    log_message "Se va folosi cel mai recent backup: $(basename "$BACKUP_FILE")"
else
    # Verificăm dacă backup-ul specificat există
    BACKUP_FILE="${BACKUP_DIR}/${SPECIFIC_BACKUP}"
    
    if [ ! -f "$BACKUP_FILE" ]; then
        log_message "EROARE: Backup-ul specificat $SPECIFIC_BACKUP nu există în directorul $BACKUP_DIR."
        exit 1
    fi
    
    log_message "Se va folosi backup-ul specificat: $SPECIFIC_BACKUP"
fi

# Decomprimarea backup-ului dacă este comprimat
if [[ "$BACKUP_FILE" == *.gz ]]; then
    log_message "Decomprimarea backup-ului..."
    gunzip -c "$BACKUP_FILE" > "${BACKUP_FILE%.gz}"
    BACKUP_FILE="${BACKUP_FILE%.gz}"
    log_message "Backup decomprimat: $BACKUP_FILE"
fi

# Restaurare bază de date
log_message "Începere restaurare pentru baza de date $DB_NAME din backup-ul $(basename "$BACKUP_FILE")..."

# Verificăm dacă baza de date există, dacă nu o creăm
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -lqt | cut -d \| -f 1 | grep -qw "$DB_NAME"
if [ $? -ne 0 ]; then
    log_message "Baza de date $DB_NAME nu există. Se creează..."
    createdb -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" "$DB_NAME"
    if [ $? -ne 0 ]; then
        log_message "EROARE: Nu s-a putut crea baza de date $DB_NAME."
        exit 1
    fi
    log_message "Baza de date $DB_NAME a fost creată cu succes."
fi

# Restaurare cu opțiunea -c pentru a șterge obiectele existente
pg_restore -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "$BACKUP_FILE"

# Verificare rezultat
if [ $? -eq 0 ]; then
    log_message "Restaurare finalizată cu succes din backup-ul: $(basename "$BACKUP_FILE")"
else
    log_message "AVERTISMENT: Restaurarea a întâmpinat unele probleme. Verificați manual baza de date."
fi

# Ștergere fișier decomprimat dacă a fost creat temporar
if [[ "$BACKUP_FILE" != *.gz && -f "${BACKUP_FILE}.gz" ]]; then
    rm "$BACKUP_FILE"
    log_message "Fișierul temporar decomprimat a fost șters."
fi

# Resetare variabilă de mediu pentru securitate
unset PGPASSWORD

log_message "Proces de restaurare finalizat."
exit 0
