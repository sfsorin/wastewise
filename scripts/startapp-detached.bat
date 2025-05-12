@echo off
setlocal enabledelayedexpansion

:: Script pentru pornirea aplicației WasteWise în mod detașat

:: Culori pentru output
set "RED=[91m"
set "GREEN=[92m"
set "YELLOW=[93m"
set "BLUE=[94m"
set "NC=[0m"

:: Funcție pentru afișarea mesajelor
:log_message
    set "type=%~1"
    set "message=%~2"
    
    if "%type%"=="INFO" (
        echo %BLUE%[INFO]%NC% %message%
    ) else if "%type%"=="SUCCESS" (
        echo %GREEN%[SUCCESS]%NC% %message%
    ) else if "%type%"=="WARNING" (
        echo %YELLOW%[WARNING]%NC% %message%
    ) else if "%type%"=="ERROR" (
        echo %RED%[ERROR]%NC% %message%
    ) else (
        echo %message%
    )
    exit /b 0

:: Funcție pentru verificarea disponibilității unui serviciu
:check_service_available
    set "host=%~1"
    set "port=%~2"
    set "retries=%~3"
    set "interval=%~4"
    set "count=0"

    :check_loop
    if !count! lss !retries! (
        curl -s "http://%host%:%port%" >nul 2>&1
        if !errorlevel! equ 0 (
            exit /b 0
        )

        set /a "count+=1"
        call :log_message "INFO" "Așteptare serviciu la %host%:%port%... (!count!/%retries%)"
        timeout /t %interval% >nul
        goto :check_loop
    )

    exit /b 1

:: Funcție pentru pornirea aplicației în mod detașat
:start_detached
    call :log_message "INFO" "Pornirea aplicației în mod detașat..."
    
    :: Oprirea containerelor existente
    call :log_message "INFO" "Oprirea containerelor existente..."
    docker compose down
    
    :: Pornirea containerelor în mod detașat
    call :log_message "INFO" "Pornirea containerelor în mod detașat..."
    docker compose -f docker-compose.dev.yml up -d
    
    if !errorlevel! neq 0 (
        call :log_message "ERROR" "A apărut o eroare la pornirea containerelor."
        exit /b 1
    )
    
    :: Așteptare pentru pornirea serviciilor
    call :log_message "INFO" "Așteptare pentru pornirea serviciilor..."
    timeout /t 5 >nul
    
    :: Verificare backend
    call :log_message "INFO" "Verificare backend..."
    call :check_service_available "localhost" 3000 5 2
    if !errorlevel! neq 0 (
        call :log_message "ERROR" "Backend-ul nu este disponibil."
        exit /b 1
    )
    call :log_message "SUCCESS" "Backend-ul este disponibil."
    
    :: Verificare frontend
    call :log_message "INFO" "Verificare frontend..."
    call :check_service_available "localhost" 5173 5 2
    if !errorlevel! neq 0 (
        call :log_message "ERROR" "Frontend-ul nu este disponibil."
        exit /b 1
    )
    call :log_message "SUCCESS" "Frontend-ul este disponibil."
    
    :: Verificare API
    call :log_message "INFO" "Verificare API..."
    curl -s "http://localhost:3000/api/v1/health" | findstr "ok" >nul
    if !errorlevel! equ 0 (
        call :log_message "SUCCESS" "API-ul răspunde corect."
    ) else (
        call :log_message "WARNING" "API-ul nu răspunde cum era așteptat. Verificați implementarea endpoint-ului /health."
    )
    
    call :log_message "SUCCESS" "Aplicația a fost pornită cu succes în mod detașat."
    call :log_message "INFO" "Pentru a vedea log-urile, folosiți comanda: docker compose logs -f"
    call :log_message "INFO" "Pentru a opri aplicația, folosiți comanda: docker compose down"
    
    exit /b 0

:: Pornirea aplicației în mod detașat
call :start_detached
