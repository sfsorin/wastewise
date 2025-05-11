# Documentație Migrări Bază de Date WasteWise

Acest document descrie migrările create pentru baza de date PostgreSQL a aplicației WasteWise.

## Cuprins

- [Introducere](#introducere)
- [Structura Migrărilor](#structura-migrărilor)
- [Tabele Create](#tabele-create)
- [Date Inițiale](#date-inițiale)
- [Relații între Tabele](#relații-între-tabele)
- [Utilizare](#utilizare)
- [Extindere](#extindere)

## Introducere

Migrările bazei de date sunt gestionate prin TypeORM și sunt organizate în trei fișiere principale:

1. `1746973160488-CreateSchemasAndUsers.ts`: Creează schemele și utilizatorii
2. `1746975670121-CreateBaseTables.ts`: Creează tabelele de bază
3. `1746975676049-SeedInitialData.ts`: Populează tabelele cu date inițiale

## Structura Migrărilor

Fiecare migrare implementează interfața `MigrationInterface` din TypeORM și conține două metode:

- `up()`: Conține instrucțiunile pentru aplicarea migrării
- `down()`: Conține instrucțiunile pentru revenirea la starea anterioară migrării

## Tabele Create

### Tabele Geografice

#### `judete`

Tabel pentru județele din România.

| Coloană | Tip | Descriere |
|---------|-----|-----------|
| id | UUID | Identificator unic (cheie primară) |
| nume | VARCHAR(100) | Numele județului |
| cod_siruta | VARCHAR(10) | Codul SIRUTA al județului |
| cod_auto | VARCHAR(2) | Codul auto al județului |
| created_at | TIMESTAMP | Data creării înregistrării |
| updated_at | TIMESTAMP | Data ultimei actualizări |

#### `localitati`

Tabel pentru localitățile din România.

| Coloană | Tip | Descriere |
|---------|-----|-----------|
| id | UUID | Identificator unic (cheie primară) |
| judet_id | UUID | ID-ul județului (cheie străină) |
| nume | VARCHAR(100) | Numele localității |
| cod_siruta | VARCHAR(10) | Codul SIRUTA al localității |
| tip | VARCHAR(50) | Tipul localității (municipiu, oraș, comună) |
| created_at | TIMESTAMP | Data creării înregistrării |
| updated_at | TIMESTAMP | Data ultimei actualizări |

#### `uat`

Tabel pentru Unitățile Administrativ-Teritoriale din România.

| Coloană | Tip | Descriere |
|---------|-----|-----------|
| id | UUID | Identificator unic (cheie primară) |
| judet_id | UUID | ID-ul județului (cheie străină) |
| nume | VARCHAR(100) | Numele UAT-ului |
| cod_siruta | VARCHAR(10) | Codul SIRUTA al UAT-ului |
| populatie | INTEGER | Populația UAT-ului |
| suprafata | DECIMAL(10, 2) | Suprafața UAT-ului (km²) |
| created_at | TIMESTAMP | Data creării înregistrării |
| updated_at | TIMESTAMP | Data ultimei actualizări |

### Tabele pentru Clienți

#### `tipuri_client`

Tabel pentru tipurile de clienți.

| Coloană | Tip | Descriere |
|---------|-----|-----------|
| id | UUID | Identificator unic (cheie primară) |
| nume | VARCHAR(100) | Numele tipului de client |
| descriere | TEXT | Descrierea tipului de client |
| created_at | TIMESTAMP | Data creării înregistrării |
| updated_at | TIMESTAMP | Data ultimei actualizări |

#### `clienti`

Tabel pentru clienții aplicației.

| Coloană | Tip | Descriere |
|---------|-----|-----------|
| id | UUID | Identificator unic (cheie primară) |
| tip_client_id | UUID | ID-ul tipului de client (cheie străină) |
| nume | VARCHAR(200) | Numele clientului |
| cui | VARCHAR(20) | Codul Unic de Identificare (pentru persoane juridice) |
| cnp | VARCHAR(13) | Codul Numeric Personal (pentru persoane fizice) |
| adresa | TEXT | Adresa clientului |
| judet_id | UUID | ID-ul județului (cheie străină) |
| localitate_id | UUID | ID-ul localității (cheie străină) |
| cod_postal | VARCHAR(10) | Codul poștal |
| email | VARCHAR(255) | Adresa de email |
| telefon | VARCHAR(20) | Numărul de telefon |
| persoana_contact | VARCHAR(100) | Persoana de contact |
| telefon_contact | VARCHAR(20) | Telefonul persoanei de contact |
| email_contact | VARCHAR(255) | Email-ul persoanei de contact |
| cod_client | VARCHAR(50) | Codul unic al clientului |
| status | VARCHAR(20) | Statusul clientului (active, inactive) |
| created_at | TIMESTAMP | Data creării înregistrării |
| updated_at | TIMESTAMP | Data ultimei actualizări |

### Tabele pentru Operațiuni

#### `categorii_deseuri`

Tabel pentru categoriile de deșeuri.

| Coloană | Tip | Descriere |
|---------|-----|-----------|
| id | UUID | Identificator unic (cheie primară) |
| nume | VARCHAR(100) | Numele categoriei |
| descriere | TEXT | Descrierea categoriei |
| cod | VARCHAR(20) | Codul categoriei |
| created_at | TIMESTAMP | Data creării înregistrării |
| updated_at | TIMESTAMP | Data ultimei actualizări |

#### `puncte_colectare`

Tabel pentru punctele de colectare a deșeurilor.

| Coloană | Tip | Descriere |
|---------|-----|-----------|
| id | UUID | Identificator unic (cheie primară) |
| client_id | UUID | ID-ul clientului (cheie străină) |
| nume | VARCHAR(100) | Numele punctului de colectare |
| adresa | TEXT | Adresa punctului de colectare |
| judet_id | UUID | ID-ul județului (cheie străină) |
| localitate_id | UUID | ID-ul localității (cheie străină) |
| latitudine | DECIMAL(10, 8) | Latitudinea geografică |
| longitudine | DECIMAL(11, 8) | Longitudinea geografică |
| program | TEXT | Programul de funcționare |
| status | VARCHAR(20) | Statusul punctului de colectare |
| created_at | TIMESTAMP | Data creării înregistrării |
| updated_at | TIMESTAMP | Data ultimei actualizări |

### Tabele pentru Contracte și Servicii

#### `contracte`

Tabel pentru contractele încheiate cu clienții.

| Coloană | Tip | Descriere |
|---------|-----|-----------|
| id | UUID | Identificator unic (cheie primară) |
| client_id | UUID | ID-ul clientului (cheie străină) |
| numar_contract | VARCHAR(50) | Numărul contractului |
| data_inceput | DATE | Data de început a contractului |
| data_sfarsit | DATE | Data de sfârșit a contractului |
| valoare | DECIMAL(12, 2) | Valoarea contractului |
| moneda | VARCHAR(3) | Moneda (RON, EUR, etc.) |
| status | VARCHAR(20) | Statusul contractului |
| detalii | TEXT | Detalii suplimentare |
| created_at | TIMESTAMP | Data creării înregistrării |
| updated_at | TIMESTAMP | Data ultimei actualizări |

#### `servicii`

Tabel pentru serviciile oferite.

| Coloană | Tip | Descriere |
|---------|-----|-----------|
| id | UUID | Identificator unic (cheie primară) |
| nume | VARCHAR(100) | Numele serviciului |
| descriere | TEXT | Descrierea serviciului |
| pret_unitar | DECIMAL(10, 2) | Prețul unitar |
| unitate_masura | VARCHAR(20) | Unitatea de măsură |
| created_at | TIMESTAMP | Data creării înregistrării |
| updated_at | TIMESTAMP | Data ultimei actualizări |

#### `servicii_contractate`

Tabel pentru serviciile contractate de clienți.

| Coloană | Tip | Descriere |
|---------|-----|-----------|
| id | UUID | Identificator unic (cheie primară) |
| contract_id | UUID | ID-ul contractului (cheie străină) |
| serviciu_id | UUID | ID-ul serviciului (cheie străină) |
| cantitate | DECIMAL(10, 2) | Cantitatea contractată |
| pret_unitar | DECIMAL(10, 2) | Prețul unitar negociat |
| discount | DECIMAL(5, 2) | Discount-ul aplicat |
| created_at | TIMESTAMP | Data creării înregistrării |
| updated_at | TIMESTAMP | Data ultimei actualizări |

### Tabele pentru Machine Learning

#### `date_istorice`

Tabel pentru datele istorice utilizate în antrenarea modelelor ML.

| Coloană | Tip | Descriere |
|---------|-----|-----------|
| id | UUID | Identificator unic (cheie primară) |
| uat_id | UUID | ID-ul UAT-ului (cheie străină) |
| categorie_id | UUID | ID-ul categoriei de deșeuri (cheie străină) |
| data | DATE | Data înregistrării |
| cantitate | DECIMAL(10, 2) | Cantitatea de deșeuri |
| unitate_masura | VARCHAR(10) | Unitatea de măsură |
| temperatura | DECIMAL(5, 2) | Temperatura medie în ziua respectivă |
| precipitatii | DECIMAL(5, 2) | Cantitatea de precipitații |
| sezon | VARCHAR(20) | Sezonul (primăvară, vară, toamnă, iarnă) |
| eveniment_special | BOOLEAN | Indicator pentru evenimente speciale |
| descriere_eveniment | TEXT | Descrierea evenimentului special |
| created_at | TIMESTAMP | Data creării înregistrării |
| updated_at | TIMESTAMP | Data ultimei actualizări |

#### `predictii_cantitati`

Tabel pentru predicțiile cantităților de deșeuri.

| Coloană | Tip | Descriere |
|---------|-----|-----------|
| id | UUID | Identificator unic (cheie primară) |
| uat_id | UUID | ID-ul UAT-ului (cheie străină) |
| client_id | UUID | ID-ul clientului (cheie străină) |
| punct_colectare_id | UUID | ID-ul punctului de colectare (cheie străină) |
| categorie_id | UUID | ID-ul categoriei de deșeuri (cheie străină) |
| data_predictie | DATE | Data efectuării predicției |
| perioada_start | DATE | Data de început a perioadei de predicție |
| perioada_end | DATE | Data de sfârșit a perioadei de predicție |
| cantitate_estimata | DECIMAL(10, 2) | Cantitatea estimată de deșeuri |
| unitate_masura | VARCHAR(10) | Unitatea de măsură |
| interval_incredere_min | DECIMAL(10, 2) | Limita inferioară a intervalului de încredere |
| interval_incredere_max | DECIMAL(10, 2) | Limita superioară a intervalului de încredere |
| acuratete_predictie | DECIMAL(5, 2) | Acuratețea predicției (%) |
| model_utilizat | VARCHAR(100) | Modelul ML utilizat |
| parametri_model | JSONB | Parametrii modelului |
| created_at | TIMESTAMP | Data creării înregistrării |
| updated_at | TIMESTAMP | Data ultimei actualizări |

## Date Inițiale

Migrarea `SeedInitialData` populează tabelele cu date inițiale:

- `tipuri_client`: 4 tipuri de clienți (Persoană Fizică, Persoană Juridică, Instituție Publică, ONG)
- `judete`: Primele 10 județe din România, în ordine alfabetică
- `localitati`: 10 localități pentru județele adăugate
- `uat`: 5 UAT-uri pentru județele adăugate
- `categorii_deseuri`: 10 categorii de deșeuri
- `servicii`: 8 servicii oferite

## Relații între Tabele

Diagrama relațiilor între tabele poate fi vizualizată în fișierul `docs/diagrama-baza-date.png`.

## Utilizare

Pentru a rula migrările:

```bash
cd backend
npm run migration:run
```

Pentru a reveni la starea anterioară:

```bash
cd backend
npm run migration:revert
```

## Extindere

Pentru a extinde schema bazei de date:

1. Creați o nouă migrare: `npm run migration:create -- src/migrations/NumeMigrare`
2. Implementați metodele `up()` și `down()`
3. Rulați migrarea: `npm run migration:run`
