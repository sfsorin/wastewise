@echo off
setlocal enabledelayedexpansion

:: Script pentru backup automat al bazei de date PostgreSQL

:: Culori pentru output
set "RED=[91m"
set "GREEN=[92m"
set "YELLOW=[93m"
set "BLUE=[94m"
set "NC=[0m"

:: Configurare
if not defined BACKUP_DIR (
    set "BACKUP_DIR=.\data\backups"
)
if not defined POSTGRES_USER (
    set "POSTGRES_USER=postgres"
)
if not defined POSTGRES_PASSWORD (
    set "POSTGRES_PASSWORD=postgres"
)
if not defined POSTGRES_DB (
    set "POSTGRES_DB=wastewise"
)
if not defined POSTGRES_HOST (
    set "POSTGRES_HOST=postgres"
)
if not defined POSTGRES_PORT (
    set "POSTGRES_PORT=5432"
)
if not defined RETENTION_DAYS (
    set "RETENTION_DAYS=7"
)

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

:: Funcție pentru crearea backup-ului
:create_backup
    set "timestamp=%date:~6,4%%date:~3,2%%date:~0,2%_%time:~0,2%%time:~3,2%%time:~6,2%"
    set "timestamp=!timestamp: =0!"
    set "backup_file=%BACKUP_DIR%\wastewise_!timestamp!.sql.gz"
    
    call :log_message "INFO" "Crearea backup-ului in !backup_file!..."
    
    :: Crearea directorului de backup dacă nu există
    if not exist "%BACKUP_DIR%" (
        mkdir "%BACKUP_DIR%"
    )
    
    :: Crearea backup-ului
    set "PGPASSWORD=%POSTGRES_PASSWORD%"
    pg_dump -h "%POSTGRES_HOST%" -p "%POSTGRES_PORT%" -U "%POSTGRES_USER%" -d "%POSTGRES_DB%" | gzip > "!backup_file!"
    
    if !errorlevel! equ 0 (
        call :log_message "SUCCESS" "Backup creat cu succes: !backup_file!"
        exit /b 0
    ) else (
        call :log_message "ERROR" "Eroare la crearea backup-ului"
        exit /b 1
    )

:: Funcție pentru curățarea backup-urilor vechi
:cleanup_old_backups
    call :log_message "INFO" "Curatarea backup-urilor mai vechi de %RETENTION_DAYS% zile..."
    
    for /f "tokens=*" %%f in ('forfiles /p "%BACKUP_DIR%" /m "wastewise_*.sql.gz" /d -%RETENTION_DAYS% /c "cmd /c echo @path"') do (
        del "%%f"
    )
    
    if !errorlevel! equ 0 (
        call :log_message "SUCCESS" "Backup-urile vechi au fost curatate"
        exit /b 0
    ) else (
        call :log_message "ERROR" "Eroare la curatarea backup-urilor vechi"
        exit /b 1
    )

:: Funcție pentru listarea backup-urilor disponibile
:list_backups
    call :log_message "INFO" "Backup-uri disponibile:"
    
    if exist "%BACKUP_DIR%" (
        set "count=0"
        for %%f in ("%BACKUP_DIR%\wastewise_*.sql.gz") do (
            set /a "count+=1"
        )
        
        if !count! gtr 0 (
            echo NUME                            DIMENSIUNE
            echo ------------------------------ ---------------
            
            for %%f in ("%BACKUP_DIR%\wastewise_*.sql.gz") do (
                set "name=%%~nxf"
                for /f "tokens=*" %%s in ('dir /q "%%f" ^| findstr /r /c:"[0-9].*"') do (
                    set "size=%%s"
                    set "size=!size:~0,20!"
                    echo !name!                !size!
                )
            )
        ) else (
            call :log_message "INFO" "Nu exista backup-uri disponibile"
        )
    ) else (
        call :log_message "WARNING" "Directorul de backup nu exista"
    )
    exit /b

:: Funcție pentru restaurarea unui backup
:restore_backup
    set "backup_file=%~1"
    
    if "%backup_file%"=="" (
        call :log_message "ERROR" "Trebuie sa specificati fisierul de backup pentru restaurare"
        exit /b 1
    )
    
    if not exist "%backup_file%" (
        call :log_message "ERROR" "Fisierul de backup %backup_file% nu exista"
        exit /b 1
    )
    
    call :log_message "WARNING" "Restaurarea va sterge toate datele existente din baza de date %POSTGRES_DB%"
    set /p "confirm=Sunteti sigur ca doriti sa continuati? (y/n): "
    
    if /i "%confirm%"=="y" (
        call :log_message "INFO" "Restaurarea backup-ului din %backup_file%..."
        
        :: Restaurarea backup-ului
        set "PGPASSWORD=%POSTGRES_PASSWORD%"
        gzip -d -c "%backup_file%" | psql -h "%POSTGRES_HOST%" -p "%POSTGRES_PORT%" -U "%POSTGRES_USER%" -d "%POSTGRES_DB%"
        
        if !errorlevel! equ 0 (
            call :log_message "SUCCESS" "Backup restaurat cu succes"
            exit /b 0
        ) else (
            call :log_message "ERROR" "Eroare la restaurarea backup-ului"
            exit /b 1
        )
    ) else (
        call :log_message "INFO" "Restaurarea a fost anulata"
        exit /b 0
    )

:: Afișare meniu
:show_menu
    echo.
    echo %BLUE%=== Backup Baza de Date PostgreSQL ===%NC%
    echo 1. Creare backup
    echo 2. Listare backup-uri disponibile
    echo 3. Restaurare backup
    echo 4. Curatare backup-uri vechi
    echo 0. Iesire
    echo %BLUE%=======================================%NC%
    
    set /p "option=Alegeti o optiune: "
    
    if "%option%"=="1" (
        call :create_backup
    ) else if "%option%"=="2" (
        call :list_backups
    ) else if "%option%"=="3" (
        call :list_backups
        echo.
        set /p "backup_name=Introduceti numele fisierului de backup pentru restaurare: "
        call :restore_backup "%BACKUP_DIR%\%backup_name%"
    ) else if "%option%"=="4" (
        call :cleanup_old_backups
    ) else if "%option%"=="0" (
        call :log_message "INFO" "La revedere!"
        exit /b 0
    ) else (
        call :log_message "ERROR" "Optiune invalida"
    )
    
    pause
    goto :show_menu

:: Verificare argumente
if "%~1"=="" (
    goto :show_menu
) else (
    if "%~1"=="create" (
        call :create_backup
    ) else if "%~1"=="list" (
        call :list_backups
    ) else if "%~1"=="restore" (
        if "%~2"=="" (
            call :log_message "ERROR" "Trebuie sa specificati fisierul de backup pentru restaurare"
            exit /b 1
        )
        call :restore_backup "%~2"
    ) else if "%~1"=="cleanup" (
        call :cleanup_old_backups
    ) else (
        call :log_message "ERROR" "Comanda necunoscuta: %~1"
        echo Comenzi disponibile: create, list, restore, cleanup
        exit /b 1
    )
)
