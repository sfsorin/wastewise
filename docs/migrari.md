# Documentație Migrări TypeORM

## Introducere

Migrările reprezintă un sistem de versionare a schemei bazei de date, permițând modificări controlate și reversibile ale structurii bazei de date. În aplicația WasteWise, folosim TypeORM pentru gestionarea migrărilor.

## Configurare

Configurarea migrărilor este realizată în două fișiere principale:

1. **backend/src/config/database.config.ts** - Configurarea conexiunii la baza de date și a opțiunilor pentru migrări în aplicație
2. **backend/typeorm.config.ts** - Configurarea DataSource pentru CLI-ul TypeORM

## Comenzi pentru migrări

Următoarele comenzi sunt disponibile pentru gestionarea migrărilor:

```bash
# Generare migrare automată bazată pe diferențele dintre entități și schema bazei de date
npm run migration:generate -- migrations/NumeMigrare

# Creare migrare goală (pentru a fi completată manual)
npm run migration:create migrations/NumeMigrare

# Rulare migrări
npm run migration:run

# Revenire la versiunea anterioară (rollback)
npm run migration:revert

# Afișare migrări aplicate și disponibile
npm run migration:show
```

## Structura unei migrări

O migrare TypeORM constă într-o clasă care implementează interfața `MigrationInterface` și conține două metode:

1. **up()** - Conține instrucțiunile pentru aplicarea migrării (creare tabele, adăugare coloane, etc.)
2. **down()** - Conține instrucțiunile pentru revenirea la starea anterioară (ștergere tabele, eliminare coloane, etc.)

Exemplu:

```typescript
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1234567890123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "username" character varying(50) NOT NULL,
        "email" character varying(255) NOT NULL,
        "password" character varying(255) NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_users_username" UNIQUE ("username"),
        CONSTRAINT "UQ_users_email" UNIQUE ("email"),
        CONSTRAINT "PK_users" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
```

## Migrarea inițială

Migrarea inițială (`InitialSchema`) a fost creată pentru a defini schema inițială a bazei de date. Aceasta include:

1. Crearea tipurilor enum
2. Crearea extensiei UUID
3. Crearea tabelelor pentru utilizatori și roluri
4. Crearea tabelelor pentru entitățile geografice
5. Crearea tabelelor pentru clienți și puncte de colectare
6. Crearea tabelelor pentru categorii de deșeuri
7. Crearea tabelelor pentru contracte și servicii
8. Crearea tabelelor pentru date istorice și predicții
9. Adăugarea cheilor străine și a relațiilor între tabele

## Bune practici

1. **Testare migrări**: Testați întotdeauna migrările într-un mediu de dezvoltare înainte de a le aplica în producție.
2. **Migrări atomice**: Fiecare migrare ar trebui să facă o singură modificare logică a schemei.
3. **Metoda down() completă**: Asigurați-vă că metoda `down()` reface complet schimbările făcute de metoda `up()`.
4. **Evitați modificarea migrărilor aplicate**: Nu modificați niciodată o migrare care a fost deja aplicată în orice mediu.
5. **Verificare înainte de aplicare**: Folosiți `migration:show` pentru a verifica ce migrări vor fi aplicate.

## Gestionarea datelor de seed

Pentru popularea bazei de date cu date inițiale (seed), puteți:

1. Crea o migrare separată pentru inserarea datelor
2. Utiliza un script separat pentru inserarea datelor

Exemplu de migrare pentru date de seed:

```typescript
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedInitialData1234567890123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Inserare roluri
    await queryRunner.query(`
      INSERT INTO "roles" ("name", "description") VALUES
      ('admin', 'Administrator cu acces complet'),
      ('manager', 'Manager cu acces limitat'),
      ('user', 'Utilizator obișnuit')
    `);

    // Inserare permisiuni
    await queryRunner.query(`
      INSERT INTO "permissions" ("name", "description") VALUES
      ('create:users', 'Poate crea utilizatori'),
      ('update:users', 'Poate actualiza utilizatori'),
      ('delete:users', 'Poate șterge utilizatori')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "permissions"`);
    await queryRunner.query(`DELETE FROM "roles"`);
  }
}
```

## Troubleshooting

### Erori comune și soluții

1. **Migrare eșuată**: Dacă o migrare eșuează, baza de date rămâne într-o stare inconsistentă. Folosiți `migration:revert` pentru a reveni la starea anterioară.

2. **Conflict între synchronize și migrări**: Setați `synchronize: false` în configurarea TypeORM atunci când folosiți migrări pentru a evita modificări automate ale schemei.

3. **Entități care nu sunt găsite**: Asigurați-vă că calea către entități este corectă în configurarea TypeORM.

4. **Migrări care nu sunt găsite**: Verificați calea către migrări în configurarea TypeORM.

5. **Erori la compilare**: Asigurați-vă că migrările sunt compilate înainte de a le rula (folosiți `npm run build`).

## Concluzie

Migrările TypeORM oferă un mod sigur și controlat de a gestiona schema bazei de date. Prin utilizarea migrărilor, puteți:

1. Versiona schema bazei de date
2. Aplica modificări în mod controlat
3. Reveni la versiuni anterioare în caz de probleme
4. Sincroniza schema între medii diferite (dezvoltare, testare, producție)
