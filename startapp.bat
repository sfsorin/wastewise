@echo off
:: Script unificat pentru aplicația WasteWise
:: Acest script permite instalarea dependențelor, rularea testelor și pornirea serviciilor

setlocal enabledelayedexpansion

:: Culori pentru output
set "RED=[91m"
set "GREEN=[92m"
set "YELLOW=[93m"
set "BLUE=[94m"
set "NC=[0m"

:: Configurare
:: Obținem calea absolută a directorului curent
set "SCRIPT_DIR=%~dp0"
set "BACKEND_DIR=%SCRIPT_DIR%backend"
set "FRONTEND_DIR=%SCRIPT_DIR%frontend"
set "DB_HOST=10.10.10.116"
set "DB_PORT=5432"
set "DB_USER=postgres"
set "DB_PASSWORD=postgres"
set "DB_NAME=wastewise"
set "BACKEND_PORT=3000"
set "FRONTEND_PORT=5173"
set "MAX_RETRIES=15"
set "RETRY_INTERVAL=3"

:: Funcție pentru afișarea mesajelor
:log_message
set "level=%~1"
set "message=%~2"
set "color=%NC%"

if "%level%"=="INFO" set "color=%BLUE%"
if "%level%"=="SUCCESS" set "color=%GREEN%"
if "%level%"=="WARNING" set "color=%YELLOW%"
if "%level%"=="ERROR" set "color=%RED%"

echo %color%[%date% %time%] [%level%] %message%%NC%
exit /b

:: Funcție pentru afișarea meniului principal
:show_main_menu
cls
echo ========================================
echo       WasteWise - Meniu Principal
echo ========================================
echo 1. Instalare dependențe
echo 2. Rulare teste
echo 3. Pornire servicii
echo 4. Verificare bază de date
echo 5. Rulare migrări
echo 0. Ieșire
echo ========================================
set /p main_option="Alegeți o opțiune: "

if "%main_option%"=="1" goto :show_install_menu
if "%main_option%"=="2" goto :show_test_menu
if "%main_option%"=="3" goto :start_services
if "%main_option%"=="4" goto :check_database
if "%main_option%"=="5" call :run_migrations "true" & goto :eof
if "%main_option%"=="0" exit /b 0

call :log_message "ERROR" "Opțiune invalidă."
pause
goto :show_main_menu

:: Funcție pentru afișarea meniului de instalare
:show_install_menu
cls
echo ========================================
echo     WasteWise - Instalare Dependențe
echo ========================================
echo 1. Instalare dependențe backend
echo 2. Instalare dependențe frontend
echo 3. Instalare toate dependențele
echo 0. Înapoi la meniul principal
echo ========================================
set /p install_option="Alegeți o opțiune: "

if "%install_option%"=="1" call :install_dependencies "backend" "%BACKEND_DIR%"
if "%install_option%"=="2" call :install_dependencies "frontend" "%FRONTEND_DIR%"
if "%install_option%"=="3" (
    call :install_dependencies "backend" "%BACKEND_DIR%"
    call :install_dependencies "frontend" "%FRONTEND_DIR%"
)
if "%install_option%"=="0" goto :show_main_menu

call :log_message "ERROR" "Opțiune invalidă."
pause
goto :show_install_menu

:: Funcție pentru afișarea meniului de teste
:show_test_menu
cls
echo ========================================
echo       WasteWise - Rulare Teste
echo ========================================
echo 1. Rulare teste backend
echo 2. Rulare teste frontend
echo 3. Rulare toate testele
echo 4. Rulare teste backend cu coverage
echo 5. Rulare teste frontend cu coverage
echo 6. Rulare toate testele cu coverage
echo 0. Înapoi la meniul principal
echo ========================================
set /p test_option="Alegeți o opțiune: "

if "%test_option%"=="1" call :run_tests "backend" "%BACKEND_DIR%" "test"
if "%test_option%"=="2" call :run_tests "frontend" "%FRONTEND_DIR%" "test"
if "%test_option%"=="3" (
    call :run_tests "backend" "%BACKEND_DIR%" "test"
    call :run_tests "frontend" "%FRONTEND_DIR%" "test"
)
if "%test_option%"=="4" call :run_tests "backend" "%BACKEND_DIR%" "test:cov"
if "%test_option%"=="5" call :run_tests "frontend" "%FRONTEND_DIR%" "test:coverage"
if "%test_option%"=="6" (
    call :run_tests "backend" "%BACKEND_DIR%" "test:cov"
    call :run_tests "frontend" "%FRONTEND_DIR%" "test:coverage"
)
if "%test_option%"=="0" goto :show_main_menu

call :log_message "ERROR" "Opțiune invalidă."
pause
goto :show_test_menu

:: Funcție pentru instalarea dependențelor
:install_dependencies
set "project=%~1"
set "directory=%~2"

call :log_message "INFO" "Instalare dependențe pentru %project%..."

:: Verificăm dacă directorul există
if not exist "%directory%" (
    call :log_message "ERROR" "Directorul %directory% nu există."
    pause
    goto :show_install_menu
)

:: Verificăm dacă package.json există
if not exist "%directory%\package.json" (
    call :log_message "ERROR" "Fișierul package.json nu există în directorul %directory%."
    pause
    goto :show_install_menu
)

:: Instalăm dependențele
pushd "%directory%"
call npm install
if %errorlevel% equ 0 (
    call :log_message "SUCCESS" "Dependențele pentru %project% au fost instalate cu succes."
    popd
    pause
    goto :show_install_menu
) else (
    call :log_message "ERROR" "A apărut o eroare la instalarea dependențelor pentru %project%."

    :: Întrebăm utilizatorul dacă dorește să încerce cu --legacy-peer-deps
    set /p use_legacy="Doriți să încercați instalarea cu --legacy-peer-deps? (y/n): "
    if /i "!use_legacy!"=="y" (
        call :log_message "INFO" "Instalare dependențe pentru %project% cu --legacy-peer-deps..."
        call npm install --legacy-peer-deps

        if %errorlevel% equ 0 (
            call :log_message "SUCCESS" "Dependențele pentru %project% au fost instalate cu succes (cu --legacy-peer-deps)."
        ) else (
            call :log_message "ERROR" "A apărut o eroare la instalarea dependențelor pentru %project% (cu --legacy-peer-deps)."
        )
    )
    popd
    pause
    goto :show_install_menu
)

:: Funcție pentru rularea testelor
:run_tests
set "project=%~1"
set "directory=%~2"
set "command=%~3"

call :log_message "INFO" "Rulare teste pentru %project%..."

:: Verificăm dacă directorul există
if not exist "%directory%" (
    call :log_message "ERROR" "Directorul %directory% nu există."
    pause
    goto :show_test_menu
)

:: Verificăm dacă package.json există
if not exist "%directory%\package.json" (
    call :log_message "ERROR" "Fișierul package.json nu există în directorul %directory%."
    pause
    goto :show_test_menu
)

:: Rulăm testele
pushd "%directory%"
call npm run %command%
if %errorlevel% equ 0 (
    call :log_message "SUCCESS" "Testele pentru %project% au fost rulate cu succes."
) else (
    call :log_message "ERROR" "A apărut o eroare la rularea testelor pentru %project%."
)
popd
pause
goto :show_test_menu

:: Funcție pentru verificarea disponibilității bazei de date
:check_database
call :log_message "INFO" "Verificare conexiune la baza de date PostgreSQL (%DB_HOST%:%DB_PORT%/%DB_NAME%)..."

:: Verificăm dacă psql este disponibil
where psql >nul 2>&1
if %errorlevel% neq 0 (
    call :log_message "ERROR" "Comanda psql nu este disponibilă. Asigurați-vă că PostgreSQL este instalat și adăugat în PATH."
    pause
    goto :show_main_menu
)

:: Încercăm să ne conectăm la baza de date
set PGPASSWORD=%DB_PASSWORD%
psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -d %DB_NAME% -c "SELECT 1" >nul 2>&1
if %errorlevel% equ 0 (
    call :log_message "SUCCESS" "Conexiune reușită la baza de date."
) else (
    call :log_message "ERROR" "Nu s-a putut conecta la baza de date."

    :: Verificăm dacă serverul PostgreSQL este disponibil
    psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -c "SELECT 1" >nul 2>&1
    if %errorlevel% equ 0 (
        call :log_message "INFO" "Serverul PostgreSQL este disponibil, dar baza de date '%DB_NAME%' nu există."

        :: Întrebăm utilizatorul dacă dorește să creăm baza de date
        set /p create_db="Doriți să creați baza de date '%DB_NAME%'? (y/n): "
        if /i "!create_db!"=="y" (
            call :log_message "INFO" "Se creează baza de date '%DB_NAME%'..."
            psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -c "CREATE DATABASE %DB_NAME%" >nul 2>&1
            if %errorlevel% equ 0 (
                call :log_message "SUCCESS" "Baza de date '%DB_NAME%' a fost creată cu succes."
            ) else (
                call :log_message "ERROR" "Nu s-a putut crea baza de date '%DB_NAME%'."
            )
        )
    ) else (
        call :log_message "ERROR" "Serverul PostgreSQL nu este disponibil."
    )
)
pause
goto :show_main_menu

:: Funcție pentru rularea migrărilor
:run_migrations
set "return_to_menu=%~1"
call :log_message "INFO" "Rulare migrări pentru baza de date..."

:: Verificăm dacă directorul backend există
if not exist "%BACKEND_DIR%" (
    call :log_message "ERROR" "Directorul %BACKEND_DIR% nu există."
    if "%return_to_menu%"=="true" (
        pause
        goto :show_main_menu
    )
    exit /b 1
)

:: Rulăm migrările (actualizat pentru noua structură cu directorul migration)
pushd "%BACKEND_DIR%"
call npm run migration:run
if %errorlevel% equ 0 (
    call :log_message "SUCCESS" "Migrările au fost rulate cu succes."
    popd
    if "%return_to_menu%"=="true" (
        pause
        goto :show_main_menu
    )
    exit /b 0
) else (
    call :log_message "ERROR" "A apărut o eroare la rularea migrărilor."
    popd
    if "%return_to_menu%"=="true" (
        pause
        goto :show_main_menu
    )
    exit /b 1
)

:: Funcție pentru pornirea serviciilor
:start_services
call :log_message "INFO" "Pornire servicii WasteWise..."

:: Verificăm baza de date
set PGPASSWORD=%DB_PASSWORD%
psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -d %DB_NAME% -c "SELECT 1" >nul 2>&1
if %errorlevel% neq 0 (
    call :log_message "ERROR" "Nu se pot porni serviciile fără o bază de date funcțională."
    set /p check_db="Doriți să verificați baza de date? (y/n): "
    if /i "!check_db!"=="y" goto :check_database
    pause
    goto :show_main_menu
)

:: Rulăm migrările automat
call :log_message "INFO" "Rulare automată a migrărilor pentru baza de date..."
call :run_migrations "false"

:: Pornire backend
call :log_message "INFO" "Pornire server backend..."

:: Verificăm dacă portul backend-ului este disponibil
netstat -ano | findstr ":%BACKEND_PORT%" >nul
if %errorlevel% equ 0 (
    call :log_message "WARNING" "Portul %BACKEND_PORT% este deja în uz. Backend-ul ar putea fi deja pornit."
    call :log_message "INFO" "Continuare automată..."
)

:: Pornim backend-ul în fundal
start "WasteWise Backend" cmd /c "cd %BACKEND_DIR% && npm run start:dev"

:: Verificăm dacă backend-ul a pornit cu succes
call :log_message "INFO" "Așteptare pornire backend (max %MAX_RETRIES%x%RETRY_INTERVAL%s)..."
set "retry_count=0"
:check_backend
set /a "retry_count+=1"
timeout /t %RETRY_INTERVAL% >nul
curl -s "http://localhost:%BACKEND_PORT%" >nul 2>&1
if %errorlevel% equ 0 (
    call :log_message "SUCCESS" "Backend-ul a pornit cu succes."
    goto :start_frontend
)
if %retry_count% lss %MAX_RETRIES% (
    call :log_message "INFO" "Așteptare pornire backend... (%retry_count%/%MAX_RETRIES%)"
    goto :check_backend
)
call :log_message "ERROR" "Backend-ul nu a pornit în timpul alocat."
pause
goto :show_main_menu

:: Pornire frontend
:start_frontend
call :log_message "INFO" "Pornire server frontend..."

:: Verificăm dacă directorul frontend există
if not exist "%FRONTEND_DIR%" (
    call :log_message "ERROR" "Directorul %FRONTEND_DIR% nu există."
    taskkill /fi "WINDOWTITLE eq WasteWise Backend*" /f >nul 2>&1
    pause
    goto :show_main_menu
)

:: Verificăm dacă portul frontend-ului este disponibil
netstat -ano | findstr ":%FRONTEND_PORT%" >nul
if %errorlevel% equ 0 (
    call :log_message "WARNING" "Portul %FRONTEND_PORT% este deja în uz. Frontend-ul ar putea fi deja pornit."
    call :log_message "INFO" "Continuare automată..."
)

:: Pornim frontend-ul în fundal
start "WasteWise Frontend" cmd /c "cd %FRONTEND_DIR% && npm run dev"

:: Verificăm dacă frontend-ul a pornit cu succes
call :log_message "INFO" "Așteptare pornire frontend (max %MAX_RETRIES%x%RETRY_INTERVAL%s)..."
set "retry_count=0"
:check_frontend
set /a "retry_count+=1"
timeout /t %RETRY_INTERVAL% >nul
curl -s "http://localhost:%FRONTEND_PORT%" >nul 2>&1
if %errorlevel% equ 0 (
    call :log_message "SUCCESS" "Frontend-ul a pornit cu succes."
    goto :services_started
)
if %retry_count% lss %MAX_RETRIES% (
    call :log_message "INFO" "Așteptare pornire frontend... (%retry_count%/%MAX_RETRIES%)"
    goto :check_frontend
)
call :log_message "ERROR" "Frontend-ul nu a pornit în timpul alocat."
taskkill /fi "WINDOWTITLE eq WasteWise Backend*" /f >nul 2>&1
pause
goto :show_main_menu

:services_started
call :log_message "SUCCESS" "Toate serviciile au pornit cu succes!"
call :log_message "INFO" "Backend: http://localhost:%BACKEND_PORT%"
call :log_message "INFO" "Frontend: http://localhost:%FRONTEND_PORT%"

:: Afișăm informații despre cum să acceseze aplicația
call :log_message "INFO" "Pentru a accesa aplicația, deschideți browser-ul la adresa http://localhost:%FRONTEND_PORT%"

call :log_message "INFO" "Apăsați orice tastă pentru a opri toate serviciile."
pause >nul

:: Oprire servicii
call :log_message "INFO" "Oprire servicii..."
taskkill /fi "WINDOWTITLE eq WasteWise Backend*" /f >nul 2>&1
taskkill /fi "WINDOWTITLE eq WasteWise Frontend*" /f >nul 2>&1
call :log_message "SUCCESS" "Toate serviciile au fost oprite."
pause
goto :show_main_menu

:: Punct de intrare
:main
goto :show_main_menu

endlocal
