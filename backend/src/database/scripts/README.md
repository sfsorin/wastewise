# Scripturi SQL pentru Baza de Date WasteWise

Acest director conține scripturi SQL utilizate pentru configurarea și gestionarea bazei de date PostgreSQL pentru aplicația WasteWise.

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

## Note Importante

- Scripturile trebuie rulate ca utilizator `postgres` sau alt utilizator cu drepturi de superuser
- Parola utilizatorului aplicației (`wastewise_app`) este setată la `app_password_secure` și ar trebui schimbată în mediul de producție
- În mediul de producție, se recomandă utilizarea utilizatorului `wastewise_app` în loc de `postgres` pentru conexiunea aplicației la baza de date
