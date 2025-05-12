@echo off
setlocal enabledelayedexpansion

:: Script de onboarding pentru dezvoltatori

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
    exit /b

:: Funcție pentru verificarea dependențelor
:check_dependencies
    call :log_message "INFO" "Verificare dependente..."
    
    :: Verificare Docker
    docker --version >nul 2>&1
    if !errorlevel! neq 0 (
        call :log_message "ERROR" "Docker nu este instalat. Va rugam sa instalati Docker."
        exit /b 1
    ) else (
        call :log_message "SUCCESS" "Docker este instalat."
    )
    
    :: Verificare Docker Compose
    docker-compose --version >nul 2>&1 || docker compose version >nul 2>&1
    if !errorlevel! neq 0 (
        call :log_message "ERROR" "Docker Compose nu este instalat. Va rugam sa instalati Docker Compose."
        exit /b 1
    ) else (
        call :log_message "SUCCESS" "Docker Compose este instalat."
    )
    
    :: Verificare Node.js
    node --version >nul 2>&1
    if !errorlevel! neq 0 (
        call :log_message "ERROR" "Node.js nu este instalat. Va rugam sa instalati Node.js."
        exit /b 1
    ) else (
        for /f "tokens=*" %%v in ('node --version') do (
            call :log_message "SUCCESS" "Node.js este instalat: %%v"
        )
    )
    
    :: Verificare npm
    npm --version >nul 2>&1
    if !errorlevel! neq 0 (
        call :log_message "ERROR" "npm nu este instalat. Va rugam sa instalati npm."
        exit /b 1
    ) else (
        for /f "tokens=*" %%v in ('npm --version') do (
            call :log_message "SUCCESS" "npm este instalat: %%v"
        )
    )
    
    :: Verificare Git
    git --version >nul 2>&1
    if !errorlevel! neq 0 (
        call :log_message "ERROR" "Git nu este instalat. Va rugam sa instalati Git."
        exit /b 1
    ) else (
        for /f "tokens=*" %%v in ('git --version') do (
            call :log_message "SUCCESS" "Git este instalat: %%v"
        )
    )
    
    exit /b 0

:: Funcție pentru configurarea mediului de dezvoltare
:setup_environment
    call :log_message "INFO" "Configurare mediu de dezvoltare..."
    
    :: Creare fișiere .env pentru backend și frontend
    if not exist "backend\.env" (
        if exist "backend\.env.example" (
            copy "backend\.env.example" "backend\.env" >nul
            call :log_message "SUCCESS" "Fisierul backend\.env a fost creat."
        ) else (
            call :log_message "ERROR" "Fisierul backend\.env.example nu exista."
        )
    ) else (
        call :log_message "INFO" "Fisierul backend\.env exista deja."
    )
    
    if not exist "frontend\.env" (
        if exist "frontend\.env.example" (
            copy "frontend\.env.example" "frontend\.env" >nul
            call :log_message "SUCCESS" "Fisierul frontend\.env a fost creat."
        ) else (
            call :log_message "ERROR" "Fisierul frontend\.env.example nu exista."
        )
    ) else (
        call :log_message "INFO" "Fisierul frontend\.env exista deja."
    )
    
    :: Creare directoare pentru volume
    call :log_message "INFO" "Creare directoare pentru volume..."
    if not exist "data\postgres" mkdir "data\postgres"
    if not exist "data\redis" mkdir "data\redis"
    if not exist "data\rabbitmq" mkdir "data\rabbitmq"
    if not exist "data\minio" mkdir "data\minio"
    if not exist "data\logs" mkdir "data\logs"
    if not exist "data\backups" mkdir "data\backups"
    call :log_message "SUCCESS" "Directoarele pentru volume au fost create."
    
    :: Instalare dependențe
    call :log_message "INFO" "Instalare dependente pentru backend..."
    cd backend && npm install && cd ..
    
    call :log_message "INFO" "Instalare dependente pentru frontend..."
    cd frontend && npm install && cd ..
    
    :: Configurare Git hooks
    call :log_message "INFO" "Configurare Git hooks..."
    npm install
    npx husky install
    call :log_message "SUCCESS" "Git hooks au fost configurate."
    
    exit /b 0

:: Funcție pentru pornirea containerelor
:start_containers
    call :log_message "INFO" "Pornire containere..."
    
    :: Pornire containere cu volume
    docker compose -f docker-compose.volumes.yml -f docker-compose.dev.yml up -d
    
    if !errorlevel! equ 0 (
        call :log_message "SUCCESS" "Containerele au fost pornite cu succes."
        exit /b 0
    ) else (
        call :log_message "ERROR" "A aparut o eroare la pornirea containerelor."
        exit /b 1
    )

:: Funcție pentru afișarea informațiilor despre proiect
:show_project_info
    call :log_message "INFO" "Informatii despre proiect:"
    
    echo.
    echo %BLUE%=== WasteWise ===%NC%
    echo WasteWise este o aplicatie pentru gestionarea deseurilor.
    
    echo.
    echo %BLUE%Structura proiectului:%NC%
    echo - backend/ - API-ul backend (NestJS)
    echo - frontend/ - Aplicatia frontend (React)
    echo - docs/ - Documentatie
    echo - scripts/ - Scripturi utilitare
    
    echo.
    echo %BLUE%Accesare servicii:%NC%
    echo - Backend API: http://localhost:3000
    echo - Frontend: http://localhost:5173
    echo - Swagger API Docs: http://localhost:3000/api/docs
    echo - Adminer: http://localhost:8081
    echo - MinIO Console: http://localhost:9091
    echo - Grafana: http://localhost:3001
    echo - Prometheus: http://localhost:9092
    
    echo.
    echo %BLUE%Comenzi utile:%NC%
    echo - Pornire containere: docker compose -f docker-compose.volumes.yml -f docker-compose.dev.yml up -d
    echo - Oprire containere: docker compose -f docker-compose.volumes.yml -f docker-compose.dev.yml down
    echo - Backup baza de date: scripts\backup-database.bat
    echo - Testare containerizare: scripts\test-containerization.bat
    
    echo.
    echo %BLUE%Documentatie:%NC%
    echo - Consultati directorul docs/ pentru documentatie detaliata.
    
    exit /b 0

:: Funcție pentru rularea tuturor pașilor
:run_all_steps
    call :log_message "INFO" "Rulare toti pasii de onboarding..."
    
    :: Verificare dependențe
    call :check_dependencies
    if !errorlevel! neq 0 (
        call :log_message "ERROR" "Verificarea dependentelor a esuat."
        exit /b 1
    )
    
    :: Configurare mediu de dezvoltare
    call :setup_environment
    if !errorlevel! neq 0 (
        call :log_message "ERROR" "Configurarea mediului de dezvoltare a esuat."
        exit /b 1
    )
    
    :: Pornire containere
    call :start_containers
    if !errorlevel! neq 0 (
        call :log_message "ERROR" "Pornirea containerelor a esuat."
        exit /b 1
    )
    
    :: Afișare informații despre proiect
    call :show_project_info
    
    call :log_message "SUCCESS" "Onboarding finalizat cu succes!"
    call :log_message "INFO" "Puteti accesa aplicatia la http://localhost:5173"
    
    exit /b 0

:: Afișare meniu
:show_menu
    echo.
    echo %BLUE%=== Onboarding WasteWise ===%NC%
    echo 1. Verificare dependente
    echo 2. Configurare mediu de dezvoltare
    echo 3. Pornire containere
    echo 4. Afisare informatii despre proiect
    echo 5. Rulare toti pasii
    echo 0. Iesire
    echo %BLUE%=========================%NC%
    
    set /p "option=Alegeti o optiune: "
    
    if "%option%"=="1" (
        call :check_dependencies
    ) else if "%option%"=="2" (
        call :setup_environment
    ) else if "%option%"=="3" (
        call :start_containers
    ) else if "%option%"=="4" (
        call :show_project_info
    ) else if "%option%"=="5" (
        call :run_all_steps
    ) else if "%option%"=="0" (
        call :log_message "INFO" "La revedere!"
        exit /b 0
    ) else (
        call :log_message "ERROR" "Optiune invalida."
    )
    
    pause
    goto :show_menu

:: Verificare argumente
if "%~1"=="" (
    goto :show_menu
) else (
    if "%~1"=="check" (
        call :check_dependencies
    ) else if "%~1"=="setup" (
        call :setup_environment
    ) else if "%~1"=="start" (
        call :start_containers
    ) else if "%~1"=="info" (
        call :show_project_info
    ) else if "%~1"=="all" (
        call :run_all_steps
    ) else (
        call :log_message "ERROR" "Comanda necunoscuta: %~1"
        echo Comenzi disponibile: check, setup, start, info, all
        exit /b 1
    )
)
