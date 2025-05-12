@echo off
setlocal enabledelayedexpansion

:: Script pentru gestionarea volumelor Docker pentru persistența datelor în Windows

:: Culori pentru output
set "RED=[91m"
set "GREEN=[92m"
set "YELLOW=[93m"
set "BLUE=[94m"
set "NC=[0m"

:: Directorul de bază pentru date
if not defined DATA_PATH (
    set "DATA_PATH=.\data"
)

:: Volumele disponibile
set "VOLUMES=postgres redis rabbitmq minio logs backups"

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

:: Funcție pentru crearea directoarelor pentru volume
:create_volume_directories
    call :log_message "INFO" "Crearea directoarelor pentru volume in %DATA_PATH%..."
    
    :: Crearea directorului de bază dacă nu există
    if not exist "%DATA_PATH%" (
        mkdir "%DATA_PATH%"
        call :log_message "INFO" "Directorul de baza %DATA_PATH% a fost creat."
    )
    
    :: Crearea directoarelor pentru fiecare volum
    for %%v in (%VOLUMES%) do (
        if not exist "%DATA_PATH%\%%v" (
            mkdir "%DATA_PATH%\%%v"
            call :log_message "SUCCESS" "Directorul pentru volumul %%v a fost creat: %DATA_PATH%\%%v"
        ) else (
            call :log_message "INFO" "Directorul pentru volumul %%v exista deja: %DATA_PATH%\%%v"
        )
    )
    
    call :log_message "SUCCESS" "Directoarele pentru volume au fost create."
    exit /b

:: Funcție pentru backup-ul volumelor
:backup_volumes
    set "timestamp=%date:~6,4%%date:~3,2%%date:~0,2%_%time:~0,2%%time:~3,2%%time:~6,2%"
    set "timestamp=!timestamp: =0!"
    set "backup_dir=%DATA_PATH%\backups\!timestamp!"
    
    call :log_message "INFO" "Backup-ul volumelor in !backup_dir!..."
    
    :: Crearea directorului de backup
    if not exist "!backup_dir!" (
        mkdir "!backup_dir!"
    )
    
    :: Backup pentru fiecare volum (exceptând directorul de backup-uri)
    for %%v in (%VOLUMES%) do (
        if not "%%v"=="backups" (
            if exist "%DATA_PATH%\%%v" (
                call :log_message "INFO" "Backup pentru volumul %%v..."
                powershell -Command "Compress-Archive -Path '%DATA_PATH%\%%v\*' -DestinationPath '!backup_dir!\%%v.zip' -Force"
                call :log_message "SUCCESS" "Backup creat pentru volumul %%v: !backup_dir!\%%v.zip"
            ) else (
                call :log_message "WARNING" "Directorul pentru volumul %%v nu exista, se omite backup-ul."
            )
        )
    )
    
    call :log_message "SUCCESS" "Backup-ul volumelor a fost finalizat in !backup_dir!"
    exit /b

:: Funcție pentru restaurarea volumelor dintr-un backup
:restore_volumes
    set "backup_dir=%~1"
    
    if "%backup_dir%"=="" (
        call :log_message "ERROR" "Trebuie sa specificati directorul de backup pentru restaurare."
        exit /b 1
    )
    
    if not exist "%backup_dir%" (
        call :log_message "ERROR" "Directorul de backup %backup_dir% nu exista."
        exit /b 1
    )
    
    call :log_message "INFO" "Restaurarea volumelor din %backup_dir%..."
    
    :: Restaurare pentru fiecare volum
    for %%v in (%VOLUMES%) do (
        if not "%%v"=="backups" (
            set "backup_file=%backup_dir%\%%v.zip"
            if exist "!backup_file!" (
                call :log_message "INFO" "Restaurare pentru volumul %%v..."
                
                :: Oprirea containerelor care folosesc volumul
                call :log_message "INFO" "Oprirea containerelor care folosesc volumul %%v..."
                docker compose down
                
                :: Restaurarea datelor
                if exist "%DATA_PATH%\%%v" (
                    rmdir /s /q "%DATA_PATH%\%%v"
                )
                mkdir "%DATA_PATH%\%%v"
                powershell -Command "Expand-Archive -Path '!backup_file!' -DestinationPath '%DATA_PATH%\%%v' -Force"
                
                call :log_message "SUCCESS" "Volumul %%v a fost restaurat din !backup_file!"
            ) else (
                call :log_message "WARNING" "Fisierul de backup pentru volumul %%v nu exista: !backup_file!"
            )
        )
    )
    
    call :log_message "SUCCESS" "Restaurarea volumelor a fost finalizata."
    call :log_message "INFO" "Puteti porni containerele din nou cu 'docker compose up -d'"
    exit /b

:: Funcție pentru afișarea informațiilor despre volume
:show_volume_info
    call :log_message "INFO" "Informatii despre volumele configurate:"
    call :log_message "INFO" "Directorul de baza pentru date: %DATA_PATH%"
    
    echo.
    echo %BLUE%Volumele disponibile:%NC%
    echo VOLUM            DIRECTOR                                  DIMENSIUNE
    echo --------------- ---------------------------------------- ---------------
    
    for %%v in (%VOLUMES%) do (
        set "volume_path=%DATA_PATH%\%%v"
        set "size=N/A"
        
        if exist "!volume_path!" (
            for /f "tokens=*" %%s in ('powershell -Command "Get-ChildItem -Path '!volume_path!' -Recurse | Measure-Object -Property Length -Sum | Select-Object -ExpandProperty Sum"') do (
                set "size_bytes=%%s"
                if "!size_bytes!"=="" (
                    set "size=0 B"
                ) else (
                    for /f "tokens=*" %%m in ('powershell -Command "[math]::Round(!size_bytes! / 1MB, 2)"') do (
                        set "size=%%m MB"
                    )
                )
            )
        ) else (
            set "size=Nu exista"
        )
        
        echo %%v              !volume_path!                  !size!
    )
    
    echo.
    echo %BLUE%Backup-uri disponibile:%NC%
    if exist "%DATA_PATH%\backups" (
        set "backup_count=0"
        for /f %%i in ('dir /b "%DATA_PATH%\backups" ^| find /c /v ""') do (
            set "backup_count=%%i"
        )
        
        if !backup_count! gtr 0 (
            echo DATA BACKUP               DIMENSIUNE
            echo ------------------------- --------------------
            
            for /d %%b in ("%DATA_PATH%\backups\*") do (
                set "backup_name=%%~nxb"
                set "backup_size=N/A"
                
                for /f "tokens=*" %%s in ('powershell -Command "Get-ChildItem -Path '%%b' -Recurse | Measure-Object -Property Length -Sum | Select-Object -ExpandProperty Sum"') do (
                    set "size_bytes=%%s"
                    if "!size_bytes!"=="" (
                        set "backup_size=0 B"
                    ) else (
                        for /f "tokens=*" %%m in ('powershell -Command "[math]::Round(!size_bytes! / 1MB, 2)"') do (
                            set "backup_size=%%m MB"
                        )
                    )
                )
                
                echo !backup_name!          !backup_size!
            )
        ) else (
            echo Nu exista backup-uri disponibile.
        )
    ) else (
        echo Directorul de backup-uri nu exista.
    )
    exit /b

:: Funcție pentru curățarea volumelor
:clean_volumes
    call :log_message "WARNING" "Aceasta operatiune va sterge toate datele din volumele configurate."
    set /p "confirm=Sunteti sigur ca doriti sa continuati? (y/n): "
    
    if /i "%confirm%"=="y" (
        call :log_message "INFO" "Curatarea volumelor..."
        
        :: Oprirea containerelor
        call :log_message "INFO" "Oprirea containerelor..."
        docker compose down
        
        :: Ștergerea datelor din fiecare volum
        for %%v in (%VOLUMES%) do (
            if not "%%v"=="backups" (
                if exist "%DATA_PATH%\%%v" (
                    call :log_message "INFO" "Curatarea volumului %%v..."
                    del /q /s "%DATA_PATH%\%%v\*" >nul 2>&1
                    call :log_message "SUCCESS" "Volumul %%v a fost curatat."
                ) else (
                    call :log_message "WARNING" "Directorul pentru volumul %%v nu exista."
                )
            )
        )
        
        call :log_message "SUCCESS" "Curatarea volumelor a fost finalizata."
        call :log_message "INFO" "Puteti porni containerele din nou cu 'docker compose up -d'"
    ) else (
        call :log_message "INFO" "Operatiunea a fost anulata."
    )
    exit /b

:: Afișare meniu
:show_menu
    echo.
    echo %BLUE%=== Gestionare Volume pentru Persistenta Datelor ===%NC%
    echo 1. Creare directoare pentru volume
    echo 2. Backup volume
    echo 3. Restaurare volume din backup
    echo 4. Afisare informatii despre volume
    echo 5. Curatare volume
    echo 0. Iesire
    echo %BLUE%=================================================%NC%
    
    set /p "option=Alegeti o optiune: "
    
    if "%option%"=="1" (
        call :create_volume_directories
    ) else if "%option%"=="2" (
        call :backup_volumes
    ) else if "%option%"=="3" (
        echo.
        echo %BLUE%Backup-uri disponibile:%NC%
        if exist "%DATA_PATH%\backups" (
            dir /b "%DATA_PATH%\backups"
            echo.
            set /p "backup_name=Introduceti numele directorului de backup: "
            call :restore_volumes "%DATA_PATH%\backups\%backup_name%"
        ) else (
            call :log_message "ERROR" "Nu exista backup-uri disponibile."
        )
    ) else if "%option%"=="4" (
        call :show_volume_info
    ) else if "%option%"=="5" (
        call :clean_volumes
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
    if "%~1"=="create" (
        call :create_volume_directories
    ) else if "%~1"=="backup" (
        call :backup_volumes
    ) else if "%~1"=="restore" (
        if "%~2"=="" (
            call :log_message "ERROR" "Trebuie sa specificati directorul de backup pentru restaurare."
            exit /b 1
        )
        call :restore_volumes "%~2"
    ) else if "%~1"=="info" (
        call :show_volume_info
    ) else if "%~1"=="clean" (
        call :clean_volumes
    ) else (
        call :log_message "ERROR" "Comanda necunoscuta: %~1"
        echo Comenzi disponibile: create, backup, restore, info, clean
        exit /b 1
    )
)
