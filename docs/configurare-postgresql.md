# Configurare PostgreSQL pentru WasteWise

Acest document descrie configurarea bazei de date PostgreSQL pentru aplicația WasteWise.

## Informații Generale

- **Versiune PostgreSQL**: PostgreSQL 14 (rulează în Docker)
- **Server**: 10.10.10.116
- **Port**: 5432
- **Bază de date**: wastewise
- **Utilizator**: postgres
- **Parolă**: postgres

## Acces prin pgAdmin

Baza de date este gestionată prin pgAdmin cu următoarele credențiale:

- **Email**: sf.stanciu@gmail.com
- **Parolă**: 213213213

## Creare Bază de Date

Pentru a crea baza de date `wastewise`, urmați acești pași:

1. Conectați-vă la pgAdmin folosind credențialele de mai sus
2. Faceți click dreapta pe "Servers" și selectați "Create" > "Server..."
3. În tab-ul "General", introduceți un nume pentru server (ex: "WasteWise DB")
4. În tab-ul "Connection", introduceți:
   - Host: 10.10.10.116
   - Port: 5432
   - Maintenance database: postgres
   - Username: postgres
   - Password: postgres
5. Faceți click pe "Save"
6. Faceți click dreapta pe noul server > "Databases" și selectați "Create" > "Database..."
7. Introduceți numele bazei de date: `wastewise`
8. Faceți click pe "Save"

Alternativ, puteți crea baza de date folosind linia de comandă (dacă aveți psql instalat):

```bash
psql -h 10.10.10.116 -U postgres -c "CREATE DATABASE wastewise;"
```

> **Notă**: Dacă nu aveți psql instalat, folosiți pgAdmin pentru a crea baza de date.

## Configurare în Aplicație

Conexiunea la baza de date este configurată în fișierul `.env` din directorul `backend`:

```
DB_HOST=10.10.10.116
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=wastewise
```

## Structura Bazei de Date

Baza de date `wastewise` conține următoarele scheme:

- **public**: Schema principală pentru tabelele aplicației
- **audit**: Schema pentru loguri de audit
- **geo**: Schema pentru date geografice

## Backup și Restore

### Backup Manual

Pentru a crea un backup manual al bazei de date:

```bash
pg_dump -h 10.10.10.116 -U postgres -d wastewise -F c -f wastewise_backup.dump
```

### Restore Manual

Pentru a restaura baza de date dintr-un backup:

```bash
pg_restore -h 10.10.10.116 -U postgres -d wastewise -c wastewise_backup.dump
```

## Migrări

Migrările sunt gestionate prin TypeORM. Pentru a rula migrările:

```bash
cd backend
npm run migration:run
```

Pentru a crea o nouă migrare:

```bash
cd backend
npm run migration:create -- -n NumeMigrare
```

## Troubleshooting

### Probleme de Conexiune

Dacă întâmpinați probleme de conexiune la baza de date:

1. Verificați dacă serverul PostgreSQL rulează:

   ```bash
   ping 10.10.10.116
   ```

2. Verificați dacă portul 5432 este deschis:

   ```bash
   telnet 10.10.10.116 5432
   ```

3. Verificați credențialele în fișierul `.env`

4. Verificați dacă baza de date `wastewise` există:
   ```bash
   psql -h 10.10.10.116 -U postgres -c "\l"
   ```

### Erori Comune

- **ECONNREFUSED**: Serverul nu este disponibil sau portul nu este deschis
- **Authentication failed**: Credențiale incorecte
- **Database does not exist**: Baza de date nu există

## Note Importante

- Baza de date rulează într-un container Docker, deci poate fi necesară repornirea containerului în caz de probleme
- Datele sunt persistente datorită volumului Docker configurat
- Pentru mediul de producție, se recomandă configurarea unui utilizator cu drepturi limitate în loc de utilizatorul postgres
