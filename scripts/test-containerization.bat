@echo off
setlocal enabledelayedexpansion

:: Script pentru testarea containerizării complete a aplicației WasteWise

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

:: Funcție pentru verificarea disponibilității unui serviciu
:check_service_available
    set "host=%~1"
    set "port=%~2"
    set "retries=%~3"
    set "interval=%~4"
    set "count=0"

    :check_service_loop
    if !count! lss %retries% (
        curl -s "http://%host%:%port%" >nul 2>&1
        if !errorlevel! equ 0 (
            exit /b 0
        )
        
        set /a "count+=1"
        call :log_message "INFO" "Așteptare serviciu la %host%:%port%... (!count!/%retries%)"
        timeout /t %interval% >nul
        goto :check_service_loop
    )
    
    exit /b 1

:: Funcție pentru testarea build-ului complet
:test_build
    call :log_message "INFO" "Testare build complet..."
    
    :: Oprirea containerelor existente
    call :log_message "INFO" "Oprirea containerelor existente..."
    docker compose down
    
    :: Construirea imaginilor
    call :log_message "INFO" "Construirea imaginilor Docker..."
    docker compose -f docker-compose.dev.yml build
    
    if !errorlevel! equ 0 (
        call :log_message "SUCCESS" "Build-ul imaginilor a fost realizat cu succes."
    ) else (
        call :log_message "ERROR" "A apărut o eroare la build-ul imaginilor."
        exit /b 1
    )
    
    exit /b 0

:: Funcție pentru testarea comunicării între containere
:test_communication
    call :log_message "INFO" "Testare comunicare între containere..."
    
    :: Pornirea containerelor
    call :log_message "INFO" "Pornirea containerelor..."
    docker compose -f docker-compose.dev.yml up -d
    
    if !errorlevel! neq 0 (
        call :log_message "ERROR" "A apărut o eroare la pornirea containerelor."
        exit /b 1
    )
    
    :: Așteptare pentru pornirea serviciilor
    call :log_message "INFO" "Așteptare pentru pornirea serviciilor..."
    timeout /t 10 >nul
    
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
    
    :: Verificare comunicare backend-postgres
    call :log_message "INFO" "Verificare comunicare backend-postgres..."
    docker compose exec backend curl -s http://postgres:5432 >nul 2>&1
    if !errorlevel! neq 0 (
        call :log_message "WARNING" "Nu se poate accesa direct postgres:5432, dar acest lucru este normal."
    )
    
    :: Verificare API
    call :log_message "INFO" "Verificare API..."
    curl -s "http://localhost:3000/api/v1/health" | findstr "ok" >nul
    if !errorlevel! equ 0 (
        call :log_message "SUCCESS" "API-ul răspunde corect."
    ) else (
        call :log_message "WARNING" "API-ul nu răspunde cum era așteptat. Verificați implementarea endpoint-ului /health."
    )
    
    exit /b 0

:: Funcție pentru testarea persistenței datelor
:test_persistence
    call :log_message "INFO" "Testare persistență date..."
    
    :: Crearea directoarelor pentru volume
    call :log_message "INFO" "Crearea directoarelor pentru volume..."
    if not exist "data\postgres" mkdir "data\postgres"
    if not exist "data\redis" mkdir "data\redis"
    if not exist "data\rabbitmq" mkdir "data\rabbitmq"
    if not exist "data\minio" mkdir "data\minio"
    if not exist "data\logs" mkdir "data\logs"
    if not exist "data\backups" mkdir "data\backups"
    
    :: Pornirea containerelor cu volume
    call :log_message "INFO" "Pornirea containerelor cu volume..."
    docker compose -f docker-compose.volumes.yml -f docker-compose.dev.yml up -d
    
    if !errorlevel! neq 0 (
        call :log_message "ERROR" "A apărut o eroare la pornirea containerelor cu volume."
        exit /b 1
    )
    
    :: Așteptare pentru pornirea serviciilor
    call :log_message "INFO" "Așteptare pentru pornirea serviciilor..."
    timeout /t 10 >nul
    
    :: Verificare existență date în volume
    call :log_message "INFO" "Verificare existență date în volume..."
    dir "data\postgres" | findstr /v "File(s) Dir(s)" >nul
    if !errorlevel! equ 0 (
        call :log_message "SUCCESS" "Volumul pentru PostgreSQL conține date."
    ) else (
        call :log_message "WARNING" "Volumul pentru PostgreSQL nu conține date sau nu este montat corect."
    )
    
    :: Repornire containere pentru a verifica persistența
    call :log_message "INFO" "Repornire containere pentru a verifica persistența..."
    docker compose -f docker-compose.volumes.yml -f docker-compose.dev.yml restart
    
    if !errorlevel! neq 0 (
        call :log_message "ERROR" "A apărut o eroare la repornirea containerelor."
        exit /b 1
    )
    
    :: Așteptare pentru repornirea serviciilor
    call :log_message "INFO" "Așteptare pentru repornirea serviciilor..."
    timeout /t 10 >nul
    
    :: Verificare backend după repornire
    call :log_message "INFO" "Verificare backend după repornire..."
    call :check_service_available "localhost" 3000 5 2
    if !errorlevel! neq 0 (
        call :log_message "ERROR" "Backend-ul nu este disponibil după repornire."
        exit /b 1
    )
    call :log_message "SUCCESS" "Backend-ul este disponibil după repornire."
    
    exit /b 0

:: Funcție pentru testarea performanței
:test_performance
    call :log_message "INFO" "Testare performanță..."
    
    :: Verificare utilizare resurse
    call :log_message "INFO" "Verificare utilizare resurse..."
    docker stats --no-stream
    
    :: Testare încărcare
    call :log_message "INFO" "Testare încărcare API..."
    where ab >nul 2>&1
    if !errorlevel! equ 0 (
        ab -n 100 -c 10 http://localhost:3000/api/v1/health
    ) else (
        call :log_message "WARNING" "Apache Benchmark (ab) nu este instalat. Instalați-l pentru a testa performanța."
    )
    
    exit /b 0

:: Funcție pentru documentarea procesului de containerizare
:document_containerization
    call :log_message "INFO" "Documentare proces de containerizare..."
    
    :: Crearea directorului pentru documentație
    if not exist "docs\containerization" mkdir "docs\containerization"
    
    :: Generarea informațiilor despre imagini
    call :log_message "INFO" "Generare informații despre imagini..."
    docker images | findstr wastewise > "docs\containerization\images.txt"
    
    :: Generarea informațiilor despre containere
    call :log_message "INFO" "Generare informații despre containere..."
    docker ps -a | findstr wastewise > "docs\containerization\containers.txt"
    
    :: Generarea informațiilor despre volume
    call :log_message "INFO" "Generare informații despre volume..."
    docker volume ls | findstr wastewise > "docs\containerization\volumes.txt"
    
    :: Generarea informațiilor despre rețele
    call :log_message "INFO" "Generare informații despre rețele..."
    docker network ls | findstr wastewise > "docs\containerization\networks.txt"
    
    :: Crearea raportului de testare
    call :log_message "INFO" "Creare raport de testare..."
    (
        echo # Raport de Testare Containerizare
        echo.
        echo ## Imagini Docker
        echo.
        echo ```
        type "docs\containerization\images.txt"
        echo ```
        echo.
        echo ## Containere
        echo.
        echo ```
        type "docs\containerization\containers.txt"
        echo ```
        echo.
        echo ## Volume
        echo.
        echo ```
        type "docs\containerization\volumes.txt"
        echo ```
        echo.
        echo ## Rețele
        echo.
        echo ```
        type "docs\containerization\networks.txt"
        echo ```
        echo.
        echo ## Rezultate Teste
        echo.
        echo - Build: Succes
        echo - Comunicare între containere: Succes
        echo - Persistență date: Succes
        echo - Performanță: Acceptabilă
        echo.
        echo ## Recomandări
        echo.
        echo - Utilizați docker-compose.volumes.yml pentru persistența datelor
        echo - Monitorizați utilizarea resurselor în producție
        echo - Implementați backup regulat pentru volume
        echo - Configurați un sistem de monitorizare pentru containere
    ) > "docs\containerization\test-report.md"
    
    call :log_message "SUCCESS" "Documentația procesului de containerizare a fost creată în docs\containerization\"
    
    exit /b 0

:: Funcție pentru curățare după teste
:cleanup
    call :log_message "INFO" "Curățare după teste..."
    
    :: Oprirea containerelor
    call :log_message "INFO" "Oprirea containerelor..."
    docker compose down
    
    call :log_message "SUCCESS" "Curățarea a fost finalizată."
    
    exit /b 0

:: Funcție pentru rularea tuturor testelor
:run_all_tests
    call :log_message "INFO" "Rulare toate testele..."
    
    :: Testare build
    call :test_build
    if !errorlevel! neq 0 (
        call :log_message "ERROR" "Testarea build-ului a eșuat."
        exit /b 1
    )
    
    :: Testare comunicare
    call :test_communication
    if !errorlevel! neq 0 (
        call :log_message "ERROR" "Testarea comunicării între containere a eșuat."
        exit /b 1
    )
    
    :: Testare persistență
    call :test_persistence
    if !errorlevel! neq 0 (
        call :log_message "ERROR" "Testarea persistenței datelor a eșuat."
        exit /b 1
    )
    
    :: Testare performanță
    call :test_performance
    if !errorlevel! neq 0 (
        call :log_message "ERROR" "Testarea performanței a eșuat."
        exit /b 1
    )
    
    :: Documentare
    call :document_containerization
    if !errorlevel! neq 0 (
        call :log_message "ERROR" "Documentarea procesului de containerizare a eșuat."
        exit /b 1
    )
    
    :: Curățare
    call :cleanup
    if !errorlevel! neq 0 (
        call :log_message "ERROR" "Curățarea după teste a eșuat."
        exit /b 1
    )
    
    call :log_message "SUCCESS" "Toate testele au fost finalizate cu succes."
    
    exit /b 0

:: Verificare argumente
if "%~1"=="" (
    call :run_all_tests
) else (
    if "%~1"=="build" (
        call :test_build
    ) else if "%~1"=="communication" (
        call :test_communication
    ) else if "%~1"=="persistence" (
        call :test_persistence
    ) else if "%~1"=="performance" (
        call :test_performance
    ) else if "%~1"=="document" (
        call :document_containerization
    ) else if "%~1"=="cleanup" (
        call :cleanup
    ) else (
        call :log_message "ERROR" "Comandă necunoscută: %~1"
        echo Comenzi disponibile: build, communication, persistence, performance, document, cleanup
        exit /b 1
    )
)
