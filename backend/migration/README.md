# Migrări pentru Baza de Date WasteWise

Acest director conține migrările TypeORM pentru baza de date PostgreSQL a aplicației WasteWise.

## Structura Migrărilor

Migrările sunt organizate în fișiere separate, fiecare reprezentând o schimbare în structura bazei de date. Fiecare migrare are două metode principale:

- `up()`: Conține instrucțiunile pentru aplicarea migrării
- `down()`: Conține instrucțiunile pentru revenirea la starea anterioară migrării

## Migrări Disponibile

### `1746973160488-CreateSchemasAndUsers`

Această migrare creează:

- Utilizatorul aplicației (`wastewise_app`) cu drepturi limitate
- Schemele necesare pentru aplicație (`public`, `audit`, `geo`)
- Permisiunile necesare pentru utilizatorul aplicației

### `1746975670121-CreateBaseTables`

Această migrare creează tabelele de bază pentru aplicație:

- `tipuri_client`: Tipuri de clienți (persoană fizică, persoană juridică, etc.)
- `judete`: Județele din România
- `localitati`: Localitățile din România
- `uat`: Unitățile Administrativ-Teritoriale din România
- `clienti`: Clienții aplicației WasteWise
- `categorii_deseuri`: Categoriile de deșeuri gestionate
- `puncte_colectare`: Punctele de colectare a deșeurilor
- `contracte`: Contractele încheiate cu clienții
- `servicii`: Serviciile oferite de aplicația WasteWise
- `servicii_contractate`: Serviciile contractate de clienți
- `date_istorice`: Date istorice pentru antrenarea modelelor ML
- `predictii_cantitati`: Predicții pentru cantitățile de deșeuri

### `1746975676049-SeedInitialData`

Această migrare populează tabelele cu date inițiale:

- `tipuri_client`: Tipuri de clienți (persoană fizică, persoană juridică, etc.)
- `judete`: Primele 10 județe din România
- `localitati`: Câteva localități pentru fiecare județ
- `uat`: Câteva UAT-uri
- `categorii_deseuri`: Categorii de deșeuri
- `servicii`: Servicii oferite

## Utilizare

### Rulare Migrări

Pentru a rula toate migrările disponibile:

```bash
npm run migration:run
```

### Revenire la Starea Anterioară

Pentru a reveni la starea anterioară ultimei migrări:

```bash
npm run migration:revert
```

### Verificare Status Migrări

Pentru a verifica statusul migrărilor:

```bash
npm run migration:show
```

### Creare Migrare Nouă

Pentru a crea o nouă migrare:

```bash
npm run migration:create -- src/migration/NumeMigrare
```

### Generare Migrare Automată

Pentru a genera o migrare automată bazată pe schimbările din entități:

```bash
npm run migration:generate -- src/migration/NumeMigrare
```

## Ordinea de Rulare a Migrărilor

Migrările sunt rulate în ordinea timestamp-ului din numele fișierului. Este important să se respecte următoarea ordine:

1. `CreateSchemasAndUsers`: Creează schemele și utilizatorii
2. `CreateBaseTables`: Creează tabelele de bază
3. `SeedInitialData`: Populează tabelele cu date inițiale

## Troubleshooting

### Eroare: Baza de date nu există

Dacă primiți eroarea "database 'wastewise' does not exist", trebuie să creați manual baza de date înainte de a rula migrările:

```bash
psql -h <host> -U postgres -f src/database/scripts/create-database.sql
```

### Eroare: Relație deja existentă

Dacă primiți eroarea "relation already exists", înseamnă că tabelul a fost deja creat. Puteți:

1. Reveni la starea anterioară migrării: `npm run migration:revert`
2. Șterge manual tabelul: `DROP TABLE nume_tabel CASCADE;`
3. Rula din nou migrarea: `npm run migration:run`

### Eroare: Dependență circulară

Dacă primiți eroarea "circular dependency", trebuie să restructurați migrările pentru a evita dependențele circulare între tabele.

## Bune Practici

1. Testați întotdeauna migrările într-un mediu de dezvoltare înainte de a le aplica în producție
2. Faceți backup la baza de date înainte de a rula migrări în producție
3. Verificați întotdeauna metoda `down()` pentru a vă asigura că revenirea funcționează corect
4. Păstrați migrările mici și focalizate pe o singură schimbare
5. Documentați schimbările în comentarii în codul migrării
