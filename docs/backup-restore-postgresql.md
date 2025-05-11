# Backup și Restore pentru Baza de Date PostgreSQL

Acest document descrie procesul de backup și restore pentru baza de date PostgreSQL utilizată în aplicația WasteWise.

## Configurare Backup Automat

Aplicația WasteWise include un sistem de backup automat pentru baza de date PostgreSQL. Acesta constă din:

1. Script de backup (`backup-database.sh`)
2. Script de restore (`restore-database.sh`)
3. Script pentru configurarea cron job-ului (`setup-backup-cron.sh`)

### Locația Scripturilor

Toate scripturile se găsesc în directorul:

```
backend/src/database/scripts/
```

## Configurare Inițială

Pentru a configura backup-ul automat, urmați acești pași:

1. Asigurați-vă că aveți instalate utilitarele PostgreSQL (`pg_dump`, `pg_restore`)
2. Acordați permisiuni de execuție pentru scripturi:

```bash
chmod +x backend/src/database/scripts/*.sh
```

3. Rulați scriptul de configurare:

```bash
cd backend/src/database/scripts
./setup-backup-cron.sh
```

Acest script va:
- Configura un cron job pentru backup automat zilnic la ora 2:00 AM
- Crea directorul pentru backup-uri dacă nu există
- Configura retenția backup-urilor (implicit 7 zile)

## Parametri Configurabili

Puteți personaliza configurația backup-ului prin setarea următorilor parametri:

### Pentru scriptul de backup (`backup-database.sh`):

| Parametru | Descriere | Valoare implicită |
|-----------|-----------|-------------------|
| DB_HOST | Adresa serverului PostgreSQL | 10.10.10.116 |
| DB_PORT | Portul serverului PostgreSQL | 5432 |
| DB_NAME | Numele bazei de date | wastewise |
| DB_USER | Utilizatorul pentru conectare | postgres |
| DB_PASSWORD | Parola utilizatorului | postgres |
| BACKUP_DIR | Directorul pentru backup-uri | /var/backups/postgresql/wastewise |
| RETENTION_DAYS | Numărul de zile pentru păstrarea backup-urilor | 7 |

### Pentru scriptul de configurare cron (`setup-backup-cron.sh`):

| Parametru | Descriere | Valoare implicită |
|-----------|-----------|-------------------|
| CRON_SCHEDULE | Programarea cron job-ului | 0 2 * * * (zilnic la 2:00 AM) |
| CRON_USER | Utilizatorul sub care rulează cron job-ul | Utilizatorul curent |
| BACKUP_DIR | Directorul pentru backup-uri | /var/backups/postgresql/wastewise |

## Backup Manual

Pentru a efectua un backup manual, rulați:

```bash
cd backend/src/database/scripts
./backup-database.sh
```

Backup-ul va fi salvat în directorul configurat (`BACKUP_DIR`) cu numele format din timestamp-ul curent:

```
wastewise_YYYYMMDD_HHMMSS.dump.gz
```

## Restore din Backup

Pentru a restaura baza de date din backup, utilizați scriptul `restore-database.sh`:

### Restaurare din cel mai recent backup:

```bash
cd backend/src/database/scripts
./restore-database.sh
```

### Restaurare dintr-un backup specific:

```bash
cd backend/src/database/scripts
./restore-database.sh wastewise_20230101_120000.dump.gz
```

## Verificare Backup-uri

Pentru a verifica backup-urile existente:

```bash
ls -la /var/backups/postgresql/wastewise/
```

## Logs

Scripturile generează log-uri în directorul de backup:

- `backup_log.txt`: Log pentru operațiunile de backup
- `restore_log.txt`: Log pentru operațiunile de restore
- `cron_execution.log`: Log pentru execuțiile programate prin cron

## Retenție Backup-uri

Implicit, backup-urile mai vechi de 7 zile sunt șterse automat. Puteți modifica această perioadă prin setarea parametrului `RETENTION_DAYS` în scriptul de backup sau prin variabila de mediu cu același nume.

## Troubleshooting

### Probleme Comune

1. **Eroare de permisiuni**:
   - Verificați dacă utilizatorul are drepturi de scriere în directorul de backup
   - Verificați dacă scripturile au permisiuni de execuție

2. **Eroare de conectare la baza de date**:
   - Verificați dacă serverul PostgreSQL rulează
   - Verificați credențialele de conectare

3. **Backup-urile nu se execută automat**:
   - Verificați configurația cron: `crontab -l`
   - Verificați log-ul cron: `/var/log/syslog` sau `/var/log/cron`
   - Verificați log-ul de execuție: `cron_execution.log`

## Note Importante

- În mediul de producție, se recomandă stocarea backup-urilor pe un sistem de stocare separat sau în cloud
- Parola bazei de date nu ar trebui stocată în text clar în scripturi; utilizați variabile de mediu sau un sistem de gestionare a secretelor
- Testați periodic procesul de restore pentru a vă asigura că backup-urile sunt funcționale
- Considerați implementarea unui sistem de monitorizare pentru a verifica succesul backup-urilor
