# Scripturi pentru Baza de Date WasteWise

Acest director conține scripturi utilizate pentru configurarea, gestionarea și backup-ul bazei de date PostgreSQL pentru aplicația WasteWise.

## Scripturi Disponibile

### `create-database.sql`

Acest script creează baza de date `wastewise` dacă nu există deja.

**Utilizare:**

```bash
psql -h <host> -U postgres -f create-database.sql
```

**Notă:** Acest script trebuie rulat înainte de a rula migrările TypeORM sau scriptul `create-schemas-users.sql`.

### `create-schemas-users.sql`

Acest script creează:

- Utilizatorul aplicației (`wastewise_app`) cu drepturi limitate
- Schemele necesare pentru aplicație (`public`, `audit`, `geo`)
- Permisiunile necesare pentru utilizatorul aplicației

**Utilizare:**

```bash
psql -h <host> -U postgres -d wastewise -f create-schemas-users.sql
```

### `drop-schemas-users.sql`

Acest script șterge:

- Schemele create de scriptul `create-schemas-users.sql` (cu excepția schemei `public`)
- Utilizatorul aplicației (`wastewise_app`)
- Toate permisiunile acordate

**Utilizare:**

```bash
psql -h <host> -U postgres -d wastewise -f drop-schemas-users.sql
```

## Utilizare cu Migrări TypeORM

Aceste scripturi sunt utilizate în migrările TypeORM pentru a configura baza de date. Migrarea `CreateSchemasAndUsers` utilizează aceste scripturi pentru a crea și șterge schemele și utilizatorii.

Pentru a rula migrarea:

```bash
npm run migration:run
```

Pentru a reveni la starea anterioară:

```bash
npm run migration:revert
```

### `backup-database.sh`

Acest script realizează backup-ul bazei de date `wastewise` și îl salvează într-un director configurat.

**Utilizare:**

```bash
./backup-database.sh
```

**Notă:** Scriptul comprimă backup-ul și implementează o politică de retenție pentru a șterge backup-urile vechi.

### `restore-database.sh`

Acest script restaurează baza de date `wastewise` din cel mai recent backup sau dintr-un backup specificat.

**Utilizare:**

```bash
# Restaurare din cel mai recent backup
./restore-database.sh

# Restaurare dintr-un backup specific
./restore-database.sh wastewise_20230101_120000.dump.gz
```

### `setup-backup-cron.sh`

Acest script configurează un cron job pentru backup automat al bazei de date.

**Utilizare:**

```bash
./setup-backup-cron.sh
```

**Notă:** Implicit, backup-ul este programat să ruleze zilnic la ora 2:00 AM.

## Backup și Restore

Pentru informații detaliate despre procesul de backup și restore, consultați documentul [backup-restore-postgresql.md](../../../docs/backup-restore-postgresql.md) din directorul `docs`.

## Note Importante

- Scripturile trebuie rulate ca utilizator `postgres` sau alt utilizator cu drepturi de superuser
- Parola utilizatorului aplicației (`wastewise_app`) este setată la `app_password_secure` și ar trebui schimbată în mediul de producție
- În mediul de producție, se recomandă utilizarea utilizatorului `wastewise_app` în loc de `postgres` pentru conexiunea aplicației la baza de date
- Backup-urile ar trebui stocate pe un sistem de stocare separat sau în cloud în mediul de producție
- Testați periodic procesul de restore pentru a vă asigura că backup-urile sunt funcționale
