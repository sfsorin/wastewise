import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

export class CreateSchemasAndUsers1746973160488 implements MigrationInterface {
  name = 'CreateSchemasAndUsers1746973160488';

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      // Verificăm dacă baza de date există
      console.log('Verificăm dacă baza de date wastewise există...');

      // Citirea și executarea scriptului SQL pentru crearea schemelor și utilizatorilor
      const createScriptPath = path.join(
        __dirname,
        '..',
        'database',
        'scripts',
        'create-schemas-users.sql',
      );
      const createScript = fs.readFileSync(createScriptPath, 'utf8');

      // Executarea scriptului SQL
      await queryRunner.query(createScript);

      console.log('Schemele și utilizatorii au fost create cu succes.');
    } catch (error) {
      console.error('Eroare la crearea schemelor și utilizatorilor:', error);

      if (error.message && error.message.includes('database "wastewise" does not exist')) {
        console.error(
          '\nBaza de date "wastewise" nu există. Trebuie să o creați manual înainte de a rula migrările.',
        );
        console.error('Puteți crea baza de date folosind una din următoarele metode:');
        console.error('1. Folosind pgAdmin');
        console.error(
          '2. Folosind comanda: psql -h <host> -U postgres -c "CREATE DATABASE wastewise;"',
        );
        console.error(
          '3. Folosind scriptul: psql -h <host> -U postgres -f src/database/scripts/create-database.sql',
        );
      }

      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Citirea și executarea scriptului SQL pentru ștergerea schemelor și utilizatorilor
    const dropScriptPath = path.join(
      __dirname,
      '..',
      'database',
      'scripts',
      'drop-schemas-users.sql',
    );
    const dropScript = fs.readFileSync(dropScriptPath, 'utf8');

    // Executarea scriptului SQL
    await queryRunner.query(dropScript);

    console.log('Schemele și utilizatorii au fost șterse cu succes.');
  }
}
