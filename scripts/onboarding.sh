#!/bin/bash

# Script de onboarding pentru dezvoltatori

# Culori pentru output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Funcție pentru verificarea dependențelor
check_dependencies() {
    log_message "INFO" "Verificare dependențe..."
    
    # Verificare Docker
    if ! command -v docker &> /dev/null; then
        log_message "ERROR" "Docker nu este instalat. Vă rugăm să instalați Docker."
        return 1
    else
        log_message "SUCCESS" "Docker este instalat."
    fi
    
    # Verificare Docker Compose
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        log_message "ERROR" "Docker Compose nu este instalat. Vă rugăm să instalați Docker Compose."
        return 1
    else
        log_message "SUCCESS" "Docker Compose este instalat."
    fi
    
    # Verificare Node.js
    if ! command -v node &> /dev/null; then
        log_message "ERROR" "Node.js nu este instalat. Vă rugăm să instalați Node.js."
        return 1
    else
        log_message "SUCCESS" "Node.js este instalat: $(node --version)"
    fi
    
    # Verificare npm
    if ! command -v npm &> /dev/null; then
        log_message "ERROR" "npm nu este instalat. Vă rugăm să instalați npm."
        return 1
    else
        log_message "SUCCESS" "npm este instalat: $(npm --version)"
    fi
    
    # Verificare Git
    if ! command -v git &> /dev/null; then
        log_message "ERROR" "Git nu este instalat. Vă rugăm să instalați Git."
        return 1
    else
        log_message "SUCCESS" "Git este instalat: $(git --version)"
    fi
    
    return 0
}

# Funcție pentru configurarea mediului de dezvoltare
setup_environment() {
    log_message "INFO" "Configurare mediu de dezvoltare..."
    
    # Creare fișiere .env pentru backend și frontend
    if [ ! -f "backend/.env" ]; then
        if [ -f "backend/.env.example" ]; then
            cp backend/.env.example backend/.env
            log_message "SUCCESS" "Fișierul backend/.env a fost creat."
        else
            log_message "ERROR" "Fișierul backend/.env.example nu există."
        fi
    else
        log_message "INFO" "Fișierul backend/.env există deja."
    fi
    
    if [ ! -f "frontend/.env" ]; then
        if [ -f "frontend/.env.example" ]; then
            cp frontend/.env.example frontend/.env
            log_message "SUCCESS" "Fișierul frontend/.env a fost creat."
        else
            log_message "ERROR" "Fișierul frontend/.env.example nu există."
        fi
    else
        log_message "INFO" "Fișierul frontend/.env există deja."
    fi
    
    # Creare directoare pentru volume
    log_message "INFO" "Creare directoare pentru volume..."
    mkdir -p data/postgres data/redis data/rabbitmq data/minio data/logs data/backups
    log_message "SUCCESS" "Directoarele pentru volume au fost create."
    
    # Instalare dependențe
    log_message "INFO" "Instalare dependențe pentru backend..."
    (cd backend && npm install)
    
    log_message "INFO" "Instalare dependențe pentru frontend..."
    (cd frontend && npm install)
    
    # Configurare Git hooks
    log_message "INFO" "Configurare Git hooks..."
    npm install
    npx husky install
    log_message "SUCCESS" "Git hooks au fost configurate."
    
    return 0
}

# Funcție pentru pornirea containerelor
start_containers() {
    log_message "INFO" "Pornire containere..."
    
    # Pornire containere cu volume
    docker compose -f docker-compose.volumes.yml -f docker-compose.dev.yml up -d
    
    if [ $? -eq 0 ]; then
        log_message "SUCCESS" "Containerele au fost pornite cu succes."
        return 0
    else
        log_message "ERROR" "A apărut o eroare la pornirea containerelor."
        return 1
    fi
}

# Funcție pentru afișarea informațiilor despre proiect
show_project_info() {
    log_message "INFO" "Informații despre proiect:"
    
    echo -e "\n${BLUE}=== WasteWise ===${NC}"
    echo "WasteWise este o aplicație pentru gestionarea deșeurilor."
    
    echo -e "\n${BLUE}Structura proiectului:${NC}"
    echo "- backend/ - API-ul backend (NestJS)"
    echo "- frontend/ - Aplicația frontend (React)"
    echo "- docs/ - Documentație"
    echo "- scripts/ - Scripturi utilitare"
    
    echo -e "\n${BLUE}Accesare servicii:${NC}"
    echo "- Backend API: http://localhost:3000"
    echo "- Frontend: http://localhost:5173"
    echo "- Swagger API Docs: http://localhost:3000/api/docs"
    echo "- Adminer: http://localhost:8081"
    echo "- MinIO Console: http://localhost:9091"
    echo "- Grafana: http://localhost:3001"
    echo "- Prometheus: http://localhost:9092"
    
    echo -e "\n${BLUE}Comenzi utile:${NC}"
    echo "- Pornire containere: docker compose -f docker-compose.volumes.yml -f docker-compose.dev.yml up -d"
    echo "- Oprire containere: docker compose -f docker-compose.volumes.yml -f docker-compose.dev.yml down"
    echo "- Backup bază de date: ./scripts/backup-database.sh"
    echo "- Testare containerizare: ./scripts/test-containerization.sh"
    
    echo -e "\n${BLUE}Documentație:${NC}"
    echo "- Consultați directorul docs/ pentru documentație detaliată."
    
    return 0
}

# Funcție pentru rularea tuturor pașilor
run_all_steps() {
    log_message "INFO" "Rulare toți pașii de onboarding..."
    
    # Verificare dependențe
    if ! check_dependencies; then
        log_message "ERROR" "Verificarea dependențelor a eșuat."
        return 1
    fi
    
    # Configurare mediu de dezvoltare
    if ! setup_environment; then
        log_message "ERROR" "Configurarea mediului de dezvoltare a eșuat."
        return 1
    fi
    
    # Pornire containere
    if ! start_containers; then
        log_message "ERROR" "Pornirea containerelor a eșuat."
        return 1
    fi
    
    # Afișare informații despre proiect
    show_project_info
    
    log_message "SUCCESS" "Onboarding finalizat cu succes!"
    log_message "INFO" "Puteți accesa aplicația la http://localhost:5173"
    
    return 0
}

# Afișare meniu
show_menu() {
    echo -e "\n${BLUE}=== Onboarding WasteWise ===${NC}"
    echo "1. Verificare dependențe"
    echo "2. Configurare mediu de dezvoltare"
    echo "3. Pornire containere"
    echo "4. Afișare informații despre proiect"
    echo "5. Rulare toți pașii"
    echo "0. Ieșire"
    echo -e "${BLUE}=========================${NC}"
    
    read -p "Alegeți o opțiune: " option
    
    case $option in
        1)
            check_dependencies
            ;;
        2)
            setup_environment
            ;;
        3)
            start_containers
            ;;
        4)
            show_project_info
            ;;
        5)
            run_all_steps
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
        "check")
            check_dependencies
            ;;
        "setup")
            setup_environment
            ;;
        "start")
            start_containers
            ;;
        "info")
            show_project_info
            ;;
        "all")
            run_all_steps
            ;;
        *)
            log_message "ERROR" "Comandă necunoscută: $1"
            echo "Comenzi disponibile: check, setup, start, info, all"
            exit 1
            ;;
    esac
fi
