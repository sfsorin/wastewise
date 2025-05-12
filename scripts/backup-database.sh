#!/bin/bash

# Script pentru backup automat al bazei de date PostgreSQL

# Culori pentru output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configurare
BACKUP_DIR=${BACKUP_DIR:-"./data/backups"}
POSTGRES_USER=${POSTGRES_USER:-"postgres"}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-"postgres"}
POSTGRES_DB=${POSTGRES_DB:-"wastewise"}
POSTGRES_HOST=${POSTGRES_HOST:-"postgres"}
POSTGRES_PORT=${POSTGRES_PORT:-"5432"}
RETENTION_DAYS=${RETENTION_DAYS:-7}

# Funcție pentru afișarea mesajelor
log_message() {
    local type=$1
    local message=$2
    
    case $type in
        "INFO")
            echo -e "${BLUE}[INFO]${NC} $message"
            ;;
        "SUCCESS")
            echo -e "${GREEN}[SUCCESS]${NC} $message"
            ;;
        "WARNING")
            echo -e "${YELLOW}[WARNING]${NC} $message"
            ;;
        "ERROR")
            echo -e "${RED}[ERROR]${NC} $message"
            ;;
        *)
            echo -e "$message"
            ;;
    esac
}

# Funcție pentru crearea backup-ului
create_backup() {
    local timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_file="${BACKUP_DIR}/wastewise_${timestamp}.sql.gz"
    
    log_message "INFO" "Crearea backup-ului în ${backup_file}..."
    
    # Crearea directorului de backup dacă nu există
    mkdir -p "${BACKUP_DIR}"
    
    # Crearea backup-ului
    PGPASSWORD="${POSTGRES_PASSWORD}" pg_dump -h "${POSTGRES_HOST}" -p "${POSTGRES_PORT}" -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" | gzip > "${backup_file}"
    
    if [ $? -eq 0 ]; then
        log_message "SUCCESS" "Backup creat cu succes: ${backup_file}"
        return 0
    else
        log_message "ERROR" "Eroare la crearea backup-ului"
        return 1
    fi
}

# Funcție pentru curățarea backup-urilor vechi
cleanup_old_backups() {
    log_message "INFO" "Curățarea backup-urilor mai vechi de ${RETENTION_DAYS} zile..."
    
    find "${BACKUP_DIR}" -name "wastewise_*.sql.gz" -type f -mtime +${RETENTION_DAYS} -delete
    
    if [ $? -eq 0 ]; then
        log_message "SUCCESS" "Backup-urile vechi au fost curățate"
        return 0
    else
        log_message "ERROR" "Eroare la curățarea backup-urilor vechi"
        return 1
    fi
}

# Funcție pentru listarea backup-urilor disponibile
list_backups() {
    log_message "INFO" "Backup-uri disponibile:"
    
    if [ -d "${BACKUP_DIR}" ]; then
        local count=$(ls -1 "${BACKUP_DIR}"/wastewise_*.sql.gz 2>/dev/null | wc -l)
        
        if [ "${count}" -gt 0 ]; then
            printf "%-30s %-15s\n" "NUME" "DIMENSIUNE"
            printf "%-30s %-15s\n" "------------------------------" "---------------"
            
            for backup in "${BACKUP_DIR}"/wastewise_*.sql.gz; do
                local name=$(basename "${backup}")
                local size=$(du -h "${backup}" | cut -f1)
                printf "%-30s %-15s\n" "${name}" "${size}"
            done
        else
            log_message "INFO" "Nu există backup-uri disponibile"
        fi
    else
        log_message "WARNING" "Directorul de backup nu există"
    fi
}

# Funcție pentru restaurarea unui backup
restore_backup() {
    local backup_file=$1
    
    if [ -z "${backup_file}" ]; then
        log_message "ERROR" "Trebuie să specificați fișierul de backup pentru restaurare"
        return 1
    fi
    
    if [ ! -f "${backup_file}" ]; then
        log_message "ERROR" "Fișierul de backup ${backup_file} nu există"
        return 1
    fi
    
    log_message "WARNING" "Restaurarea va șterge toate datele existente din baza de date ${POSTGRES_DB}"
    read -p "Sunteți sigur că doriți să continuați? (y/n): " confirm
    
    if [[ "${confirm}" == "y" || "${confirm}" == "Y" ]]; then
        log_message "INFO" "Restaurarea backup-ului din ${backup_file}..."
        
        # Restaurarea backup-ului
        PGPASSWORD="${POSTGRES_PASSWORD}" gunzip -c "${backup_file}" | PGPASSWORD="${POSTGRES_PASSWORD}" psql -h "${POSTGRES_HOST}" -p "${POSTGRES_PORT}" -U "${POSTGRES_USER}" -d "${POSTGRES_DB}"
        
        if [ $? -eq 0 ]; then
            log_message "SUCCESS" "Backup restaurat cu succes"
            return 0
        else
            log_message "ERROR" "Eroare la restaurarea backup-ului"
            return 1
        fi
    else
        log_message "INFO" "Restaurarea a fost anulată"
        return 0
    fi
}

# Afișare meniu
show_menu() {
    echo -e "\n${BLUE}=== Backup Bază de Date PostgreSQL ===${NC}"
    echo "1. Creare backup"
    echo "2. Listare backup-uri disponibile"
    echo "3. Restaurare backup"
    echo "4. Curățare backup-uri vechi"
    echo "0. Ieșire"
    echo -e "${BLUE}=======================================${NC}"
    
    read -p "Alegeți o opțiune: " option
    
    case $option in
        1)
            create_backup
            ;;
        2)
            list_backups
            ;;
        3)
            list_backups
            echo ""
            read -p "Introduceți numele fișierului de backup pentru restaurare: " backup_name
            restore_backup "${BACKUP_DIR}/${backup_name}"
            ;;
        4)
            cleanup_old_backups
            ;;
        0)
            log_message "INFO" "La revedere!"
            exit 0
            ;;
        *)
            log_message "ERROR" "Opțiune invalidă"
            ;;
    esac
    
    read -p "Apăsați Enter pentru a continua..."
    show_menu
}

# Verificare argumente
if [ $# -eq 0 ]; then
    show_menu
else
    case $1 in
        "create")
            create_backup
            ;;
        "list")
            list_backups
            ;;
        "restore")
            if [ -z "$2" ]; then
                log_message "ERROR" "Trebuie să specificați fișierul de backup pentru restaurare"
                exit 1
            fi
            restore_backup "$2"
            ;;
        "cleanup")
            cleanup_old_backups
            ;;
        *)
            log_message "ERROR" "Comandă necunoscută: $1"
            echo "Comenzi disponibile: create, list, restore, cleanup"
            exit 1
            ;;
    esac
fi
