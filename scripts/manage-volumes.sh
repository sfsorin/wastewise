#!/bin/bash

# Script pentru gestionarea volumelor Docker pentru persistența datelor

# Culori pentru output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Directorul de bază pentru date
DATA_PATH=${DATA_PATH:-"./data"}

# Volumele disponibile
VOLUMES=("postgres" "redis" "rabbitmq" "minio" "logs" "backups")

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

# Funcție pentru crearea directoarelor pentru volume
create_volume_directories() {
    log_message "INFO" "Crearea directoarelor pentru volume în $DATA_PATH..."
    
    # Crearea directorului de bază dacă nu există
    if [ ! -d "$DATA_PATH" ]; then
        mkdir -p "$DATA_PATH"
        log_message "INFO" "Directorul de bază $DATA_PATH a fost creat."
    fi
    
    # Crearea directoarelor pentru fiecare volum
    for volume in "${VOLUMES[@]}"; do
        if [ ! -d "$DATA_PATH/$volume" ]; then
            mkdir -p "$DATA_PATH/$volume"
            log_message "SUCCESS" "Directorul pentru volumul $volume a fost creat: $DATA_PATH/$volume"
        else
            log_message "INFO" "Directorul pentru volumul $volume există deja: $DATA_PATH/$volume"
        fi
    done
    
    # Setarea permisiunilor corecte
    chmod -R 777 "$DATA_PATH"
    log_message "SUCCESS" "Permisiunile au fost setate pentru directoarele de volume."
}

# Funcție pentru backup-ul volumelor
backup_volumes() {
    local backup_dir="$DATA_PATH/backups/$(date +%Y%m%d_%H%M%S)"
    log_message "INFO" "Backup-ul volumelor în $backup_dir..."
    
    # Crearea directorului de backup
    mkdir -p "$backup_dir"
    
    # Backup pentru fiecare volum (exceptând directorul de backup-uri)
    for volume in "${VOLUMES[@]}"; do
        if [ "$volume" != "backups" ]; then
            if [ -d "$DATA_PATH/$volume" ]; then
                log_message "INFO" "Backup pentru volumul $volume..."
                tar -czf "$backup_dir/$volume.tar.gz" -C "$DATA_PATH" "$volume"
                log_message "SUCCESS" "Backup creat pentru volumul $volume: $backup_dir/$volume.tar.gz"
            else
                log_message "WARNING" "Directorul pentru volumul $volume nu există, se omite backup-ul."
            fi
        fi
    done
    
    log_message "SUCCESS" "Backup-ul volumelor a fost finalizat în $backup_dir"
}

# Funcție pentru restaurarea volumelor dintr-un backup
restore_volumes() {
    local backup_dir=$1
    
    if [ -z "$backup_dir" ]; then
        log_message "ERROR" "Trebuie să specificați directorul de backup pentru restaurare."
        return 1
    fi
    
    if [ ! -d "$backup_dir" ]; then
        log_message "ERROR" "Directorul de backup $backup_dir nu există."
        return 1
    fi
    
    log_message "INFO" "Restaurarea volumelor din $backup_dir..."
    
    # Restaurare pentru fiecare volum
    for volume in "${VOLUMES[@]}"; do
        if [ "$volume" != "backups" ]; then
            local backup_file="$backup_dir/$volume.tar.gz"
            if [ -f "$backup_file" ]; then
                log_message "INFO" "Restaurare pentru volumul $volume..."
                
                # Oprirea containerelor care folosesc volumul
                log_message "INFO" "Oprirea containerelor care folosesc volumul $volume..."
                docker compose down
                
                # Restaurarea datelor
                rm -rf "$DATA_PATH/$volume"
                mkdir -p "$DATA_PATH/$volume"
                tar -xzf "$backup_file" -C "$DATA_PATH"
                
                log_message "SUCCESS" "Volumul $volume a fost restaurat din $backup_file"
            else
                log_message "WARNING" "Fișierul de backup pentru volumul $volume nu există: $backup_file"
            fi
        fi
    done
    
    log_message "SUCCESS" "Restaurarea volumelor a fost finalizată."
    log_message "INFO" "Puteți porni containerele din nou cu 'docker compose up -d'"
}

# Funcție pentru afișarea informațiilor despre volume
show_volume_info() {
    log_message "INFO" "Informații despre volumele configurate:"
    log_message "INFO" "Directorul de bază pentru date: $DATA_PATH"
    
    echo -e "\n${BLUE}Volumele disponibile:${NC}"
    printf "%-15s %-40s %-15s\n" "VOLUM" "DIRECTOR" "DIMENSIUNE"
    printf "%-15s %-40s %-15s\n" "---------------" "----------------------------------------" "---------------"
    
    for volume in "${VOLUMES[@]}"; do
        local volume_path="$DATA_PATH/$volume"
        local size="N/A"
        
        if [ -d "$volume_path" ]; then
            size=$(du -sh "$volume_path" | cut -f1)
        else
            size="Nu există"
        fi
        
        printf "%-15s %-40s %-15s\n" "$volume" "$volume_path" "$size"
    done
    
    echo -e "\n${BLUE}Backup-uri disponibile:${NC}"
    if [ -d "$DATA_PATH/backups" ]; then
        local backup_count=$(ls -1 "$DATA_PATH/backups" | wc -l)
        
        if [ $backup_count -gt 0 ]; then
            printf "%-25s %-20s\n" "DATA BACKUP" "DIMENSIUNE"
            printf "%-25s %-20s\n" "-------------------------" "--------------------"
            
            for backup in $(ls -1 "$DATA_PATH/backups"); do
                local backup_path="$DATA_PATH/backups/$backup"
                local backup_size=$(du -sh "$backup_path" | cut -f1)
                printf "%-25s %-20s\n" "$backup" "$backup_size"
            done
        else
            echo "Nu există backup-uri disponibile."
        fi
    else
        echo "Directorul de backup-uri nu există."
    fi
}

# Funcție pentru curățarea volumelor
clean_volumes() {
    log_message "WARNING" "Această operațiune va șterge toate datele din volumele configurate."
    read -p "Sunteți sigur că doriți să continuați? (y/n): " confirm
    
    if [[ $confirm == "y" || $confirm == "Y" ]]; then
        log_message "INFO" "Curățarea volumelor..."
        
        # Oprirea containerelor
        log_message "INFO" "Oprirea containerelor..."
        docker compose down
        
        # Ștergerea datelor din fiecare volum
        for volume in "${VOLUMES[@]}"; do
            if [ "$volume" != "backups" ]; then
                if [ -d "$DATA_PATH/$volume" ]; then
                    log_message "INFO" "Curățarea volumului $volume..."
                    rm -rf "$DATA_PATH/$volume"/*
                    log_message "SUCCESS" "Volumul $volume a fost curățat."
                else
                    log_message "WARNING" "Directorul pentru volumul $volume nu există."
                fi
            fi
        done
        
        log_message "SUCCESS" "Curățarea volumelor a fost finalizată."
        log_message "INFO" "Puteți porni containerele din nou cu 'docker compose up -d'"
    else
        log_message "INFO" "Operațiunea a fost anulată."
    fi
}

# Afișare meniu
show_menu() {
    echo -e "\n${BLUE}=== Gestionare Volume pentru Persistența Datelor ===${NC}"
    echo "1. Creare directoare pentru volume"
    echo "2. Backup volume"
    echo "3. Restaurare volume din backup"
    echo "4. Afișare informații despre volume"
    echo "5. Curățare volume"
    echo "0. Ieșire"
    echo -e "${BLUE}=================================================${NC}"
    
    read -p "Alegeți o opțiune: " option
    
    case $option in
        1)
            create_volume_directories
            ;;
        2)
            backup_volumes
            ;;
        3)
            echo -e "\n${BLUE}Backup-uri disponibile:${NC}"
            if [ -d "$DATA_PATH/backups" ]; then
                ls -1 "$DATA_PATH/backups"
                echo ""
                read -p "Introduceți numele directorului de backup: " backup_name
                restore_volumes "$DATA_PATH/backups/$backup_name"
            else
                log_message "ERROR" "Nu există backup-uri disponibile."
            fi
            ;;
        4)
            show_volume_info
            ;;
        5)
            clean_volumes
            ;;
        0)
            log_message "INFO" "La revedere!"
            exit 0
            ;;
        *)
            log_message "ERROR" "Opțiune invalidă."
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
            create_volume_directories
            ;;
        "backup")
            backup_volumes
            ;;
        "restore")
            if [ -z "$2" ]; then
                log_message "ERROR" "Trebuie să specificați directorul de backup pentru restaurare."
                exit 1
            fi
            restore_volumes "$2"
            ;;
        "info")
            show_volume_info
            ;;
        "clean")
            clean_volumes
            ;;
        *)
            log_message "ERROR" "Comandă necunoscută: $1"
            echo "Comenzi disponibile: create, backup, restore, info, clean"
            exit 1
            ;;
    esac
fi
