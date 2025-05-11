#!/bin/bash
# Script pentru configurarea cron job-ului pentru backup automat al bazei de date
# Acest script configurează un cron job care va rula scriptul de backup la intervalul specificat

# Configurare
BACKUP_SCRIPT_PATH=$(realpath "$(dirname "$0")/backup-database.sh")
BACKUP_DIR=${BACKUP_DIR:-"/var/backups/postgresql/wastewise"}
CRON_USER=${CRON_USER:-$(whoami)}
CRON_SCHEDULE=${CRON_SCHEDULE:-"0 2 * * *"} # Implicit: în fiecare zi la ora 2:00 AM

# Verificare dacă scriptul de backup există
if [ ! -f "$BACKUP_SCRIPT_PATH" ]; then
    echo "EROARE: Scriptul de backup nu a fost găsit la calea: $BACKUP_SCRIPT_PATH"
    exit 1
fi

# Verificare și creare director backup dacă nu există
if [ ! -d "$BACKUP_DIR" ]; then
    mkdir -p "$BACKUP_DIR"
    echo "Directorul de backup $BACKUP_DIR a fost creat."
fi

# Acordare permisiuni de execuție pentru scripturile de backup și restore
chmod +x "$BACKUP_SCRIPT_PATH"
chmod +x "$(dirname "$0")/restore-database.sh"

# Creare fișier temporar pentru crontab
TEMP_CRONTAB=$(mktemp)

# Export crontab curent
crontab -l > "$TEMP_CRONTAB" 2>/dev/null || echo "# Crontab pentru backup-uri automate WasteWise" > "$TEMP_CRONTAB"

# Verificare dacă job-ul există deja
if grep -q "$BACKUP_SCRIPT_PATH" "$TEMP_CRONTAB"; then
    echo "Job-ul de backup există deja în crontab. Se actualizează..."
    sed -i "\|$BACKUP_SCRIPT_PATH|d" "$TEMP_CRONTAB"
fi

# Adăugare job nou
echo "# Backup automat pentru baza de date WasteWise" >> "$TEMP_CRONTAB"
echo "$CRON_SCHEDULE DB_HOST=10.10.10.116 DB_PORT=5432 DB_NAME=wastewise DB_USER=postgres DB_PASSWORD=postgres BACKUP_DIR=$BACKUP_DIR $BACKUP_SCRIPT_PATH >> $BACKUP_DIR/cron_execution.log 2>&1" >> "$TEMP_CRONTAB"

# Instalare crontab nou
crontab "$TEMP_CRONTAB"

# Ștergere fișier temporar
rm "$TEMP_CRONTAB"

echo "Cron job configurat cu succes pentru utilizatorul $CRON_USER."
echo "Programare: $CRON_SCHEDULE (${CRON_SCHEDULE/0 2 \* \* \*/în fiecare zi la ora 2:00 AM})"
echo "Script: $BACKUP_SCRIPT_PATH"
echo "Director backup: $BACKUP_DIR"
echo "Log execuție: $BACKUP_DIR/cron_execution.log"

# Afișare instrucțiuni pentru verificare
echo ""
echo "Pentru a verifica job-urile configurate, rulați:"
echo "crontab -l"
echo ""
echo "Pentru a testa manual scriptul de backup, rulați:"
echo "$BACKUP_SCRIPT_PATH"
echo ""
echo "Pentru a restaura din backup, rulați:"
echo "$(dirname "$0")/restore-database.sh [nume_backup_opțional]"

exit 0
