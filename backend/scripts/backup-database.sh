#!/bin/bash
# Script pentru backup automat al bazei de date PostgreSQL pentru aplicația WasteWise
# Acest script creează un backup complet al bazei de date și îl salvează într-un director configurat
# Backupurile sunt păstrate conform politicii de retenție configurată

# Configurare
DB_HOST=${DB_HOST:-"10.10.10.116"}
DB_PORT=${DB_PORT:-"5432"}
DB_NAME=${DB_NAME:-"wastewise"}
DB_USER=${DB_USER:-"postgres"}
DB_PASSWORD=${DB_PASSWORD:-"postgres"}

# Director pentru backup-uri
BACKUP_DIR=${BACKUP_DIR:-"/var/backups/postgresql/wastewise"}
# Număr de zile pentru păstrarea backup-urilor (retenție)
RETENTION_DAYS=${RETENTION_DAYS:-"7"}
# Format timestamp pentru numele fișierului
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
# Numele fișierului de backup
BACKUP_FILE="${BACKUP_DIR}/wastewise_${TIMESTAMP}.dump"
# Log file
LOG_FILE="${BACKUP_DIR}/backup_log.txt"

# Funcție pentru logging
log_message() {
    echo "[$(date +"%Y-%m-%d %H:%M:%S")] $1" | tee -a "$LOG_FILE"
}

# Verificare și creare director backup dacă nu există
if [ ! -d "$BACKUP_DIR" ]; then
    mkdir -p "$BACKUP_DIR"
    log_message "Directorul de backup $BACKUP_DIR a fost creat."
fi

# Verificare dacă PGPASSWORD este setat, altfel îl setăm
if [ -z "$PGPASSWORD" ]; then
    export PGPASSWORD="$DB_PASSWORD"
fi

# Creare backup
log_message "Începere backup pentru baza de date $DB_NAME..."
pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -F c -f "$BACKUP_FILE"

# Verificare rezultat
if [ $? -eq 0 ]; then
    log_message "Backup creat cu succes: $BACKUP_FILE"
    # Compresie backup pentru a economisi spațiu
    gzip "$BACKUP_FILE"
    log_message "Backup comprimat: ${BACKUP_FILE}.gz"
else
    log_message "EROARE: Backup eșuat pentru baza de date $DB_NAME"
    exit 1
fi

# Ștergere backup-uri vechi (conform politicii de retenție)
log_message "Ștergere backup-uri mai vechi de $RETENTION_DAYS zile..."
find "$BACKUP_DIR" -name "wastewise_*.dump.gz" -type f -mtime +$RETENTION_DAYS -delete
log_message "Curățare backup-uri vechi finalizată."

# Afișare statistici
BACKUP_COUNT=$(find "$BACKUP_DIR" -name "wastewise_*.dump.gz" | wc -l)
BACKUP_SIZE=$(du -sh "$BACKUP_DIR" | cut -f1)
log_message "Statistici backup:"
log_message "- Număr total backup-uri: $BACKUP_COUNT"
log_message "- Dimensiune totală backup-uri: $BACKUP_SIZE"

# Resetare variabilă de mediu pentru securitate
unset PGPASSWORD

log_message "Proces de backup finalizat cu succes."
exit 0
