import { createConnection } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

// Încărcăm variabilele de mediu
config();

const configService = new ConfigService();

async function main() {
  console.log('Verificare migrări în baza de date...');

  const connection = await createConnection({
    type: 'postgres',
    host: configService.get('DB_HOST') || 'localhost',
    port: parseInt(configService.get('DB_PORT') || '5432', 10),
    username: configService.get('DB_USERNAME') || 'postgres',
    password: configService.get('DB_PASSWORD') || 'postgres',
    database: configService.get('DB_DATABASE') || 'wastewise',
    synchronize: false,
  });

  try {
    // Verificăm tabelul de migrări
    const migrationsResult = await connection.query('SELECT * FROM migrations ORDER BY id ASC');

    if (migrationsResult.length === 0) {
      console.log('Nu există migrări aplicate în baza de date.');
    } else {
      console.log(`Există ${migrationsResult.length} migrări aplicate în baza de date:`);
      migrationsResult.forEach((migration: any, index: number) => {
        console.log(`\nMigrare ${index + 1}:`);
        console.log(`ID: ${migration.id}`);
        console.log(`Timestamp: ${migration.timestamp}`);
        console.log(`Nume: ${migration.name}`);
      });
    }

    // Verificăm tabelele existente
    const tablesResult = await connection.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);

    console.log(`\n\nExistă ${tablesResult.length} tabele în baza de date:`);
    tablesResult.forEach((table: any, index: number) => {
      console.log(`${index + 1}. ${table.table_name}`);
    });

    // Verificăm dacă există tabelul users
    if (tablesResult.some((table: any) => table.table_name === 'users')) {
      const usersCount = await connection.query('SELECT COUNT(*) FROM users');
      console.log(`\nNumăr de utilizatori în tabelul users: ${usersCount[0].count}`);

      if (parseInt(usersCount[0].count) > 0) {
        const users = await connection.query('SELECT id, username, email, role, status FROM users');
        console.log('\nUtilizatori existenți:');
        users.forEach((user: any, index: number) => {
          console.log(`\nUtilizator ${index + 1}:`);
          console.log(`ID: ${user.id}`);
          console.log(`Username: ${user.username}`);
          console.log(`Email: ${user.email}`);
          console.log(`Rol: ${user.role}`);
          console.log(`Status: ${user.status}`);
        });
      }
    }

    // Verificăm dacă există tabelul roles
    if (tablesResult.some((table: any) => table.table_name === 'roles')) {
      const rolesCount = await connection.query('SELECT COUNT(*) FROM roles');
      console.log(`\nNumăr de roluri în tabelul roles: ${rolesCount[0].count}`);

      if (parseInt(rolesCount[0].count) > 0) {
        const roles = await connection.query('SELECT id, name, description FROM roles');
        console.log('\nRoluri existente:');
        roles.forEach((role: any, index: number) => {
          console.log(`\nRol ${index + 1}:`);
          console.log(`ID: ${role.id}`);
          console.log(`Nume: ${role.name}`);
          console.log(`Descriere: ${role.description}`);
        });
      }
    }
  } catch (error) {
    console.error('Eroare la verificarea migrărilor:', error);
  } finally {
    await connection.close();
  }
}

main().catch(error => {
  console.error('Eroare la executarea scriptului:', error);
  process.exit(1);
});
