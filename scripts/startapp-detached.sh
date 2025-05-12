#!/bin/bash

# Script pentru pornirea aplicației WasteWise în mod detașat

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

# Funcție pentru verificarea disponibilității unui serviciu
check_service_available() {
    local host=$1
    local port=$2
    local retries=$3
    local interval=$4
    local count=0

    while [ $count -lt $retries ]; do
        if curl -s "http://$host:$port" >/dev/null 2>&1; then
            return 0
        fi

        count=$((count + 1))
        log_message "INFO" "Așteptare serviciu la $host:$port... ($count/$retries)"
        sleep $interval
    done

    return 1
}

# Funcție pentru pornirea aplicației în mod detașat
start_detached() {
    log_message "INFO" "Pornirea aplicației în mod detașat..."

    # Oprirea containerelor existente
    log_message "INFO" "Oprirea containerelor existente..."
    docker compose down

    # Ștergerea containerelor existente pentru a evita sufixul "-1"
    log_message "INFO" "Ștergerea containerelor existente..."
    docker container prune -f

    # Pornirea containerelor în mod detașat
    log_message "INFO" "Pornirea containerelor în mod detașat..."
    docker compose -f docker-compose.dev.yml up -d

    if [ $? -ne 0 ]; then
        log_message "ERROR" "A apărut o eroare la pornirea containerelor."
        return 1
    fi

    # Așteptare pentru pornirea serviciilor
    log_message "INFO" "Așteptare pentru pornirea serviciilor..."
    sleep 5

    # Verificare backend
    log_message "INFO" "Verificare backend..."
    if ! check_service_available "localhost" 3000 5 2; then
        log_message "ERROR" "Backend-ul nu este disponibil."
        return 1
    fi
    log_message "SUCCESS" "Backend-ul este disponibil."

    # Verificare frontend
    log_message "INFO" "Verificare frontend..."
    if ! check_service_available "localhost" 5173 5 2; then
        log_message "ERROR" "Frontend-ul nu este disponibil."
        return 1
    fi
    log_message "SUCCESS" "Frontend-ul este disponibil."

    # Verificare API
    log_message "INFO" "Verificare API..."
    if curl -s "http://localhost:3000/api/v1/health" | grep -q "ok"; then
        log_message "SUCCESS" "API-ul răspunde corect."
    else
        log_message "WARNING" "API-ul nu răspunde cum era așteptat. Verificați implementarea endpoint-ului /health."
    fi

    log_message "SUCCESS" "Aplicația a fost pornită cu succes în mod detașat."
    log_message "INFO" "Pentru a vedea log-urile, folosiți comanda: docker compose logs -f"
    log_message "INFO" "Pentru a opri aplicația, folosiți comanda: docker compose down"

    return 0
}

# Pornirea aplicației în mod detașat
start_detached
