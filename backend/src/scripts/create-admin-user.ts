import { createConnection } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

// Încărcăm variabilele de mediu
config();

const configService = new ConfigService();

async function main() {
  console.log('Crearea utilizatorului admin...');

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
    // Verificăm dacă există tabelul users
    const usersTableExists = await connection.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      )
    `);

    if (!usersTableExists[0].exists) {
      console.log('Tabelul users nu există. Creăm tabelul...');
      
      // Creăm tabelul users
      await connection.query(`
        CREATE TABLE IF NOT EXISTS "users" (
          "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          "username" VARCHAR(50) NOT NULL UNIQUE,
          "firstName" VARCHAR(100),
          "lastName" VARCHAR(100),
          "email" VARCHAR(255) NOT NULL UNIQUE,
          "password" VARCHAR(255) NOT NULL,
          "fullName" VARCHAR(100),
          "role" VARCHAR(20) NOT NULL DEFAULT 'user',
          "status" VARCHAR(20) NOT NULL DEFAULT 'active',
          "isActive" BOOLEAN NOT NULL DEFAULT true,
          "lastLogin" TIMESTAMP WITH TIME ZONE,
          "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
          "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        )
      `);
      
      console.log('Tabelul users a fost creat cu succes.');
    }

    // Verificăm dacă există utilizatorul admin
    const adminExists = await connection.query(`
      SELECT EXISTS (
        SELECT FROM "users" 
        WHERE "username" = 'admin'
      )
    `);

    if (adminExists[0].exists) {
      console.log('Utilizatorul admin există deja.');
    } else {
      console.log('Utilizatorul admin nu există. Creăm utilizatorul...');
      
      // Generăm hash-ul parolei
      const saltRounds = 10;
      const password = 'Password123!';
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      
      // Creăm utilizatorul admin
      await connection.query(`
        INSERT INTO "users" (
          "id",
          "username", 
          "email", 
          "password", 
          "fullName", 
          "role", 
          "status"
        )
        VALUES (
          $1,
          'admin',
          'admin@wastewise.ro',
          $2,
          'Administrator',
          'admin',
          'active'
        )
      `, [uuidv4(), hashedPassword]);
      
      console.log('Utilizatorul admin a fost creat cu succes.');
      console.log('Username: admin');
      console.log('Parola: Password123!');
    }

    // Verificăm dacă există tabelul roles
    const rolesTableExists = await connection.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'roles'
      )
    `);

    if (!rolesTableExists[0].exists) {
      console.log('Tabelul roles nu există. Creăm tabelul...');
      
      // Creăm tabelul roles
      await connection.query(`
        CREATE TABLE IF NOT EXISTS "roles" (
          "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          "name" VARCHAR(50) NOT NULL UNIQUE,
          "description" TEXT,
          "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        )
      `);
      
      console.log('Tabelul roles a fost creat cu succes.');
      
      // Creăm rolul admin
      await connection.query(`
        INSERT INTO "roles" ("id", "name", "description")
        VALUES (
          $1,
          'admin',
          'Administrator cu acces complet la sistem'
        )
      `, [uuidv4()]);
      
      console.log('Rolul admin a fost creat cu succes.');
    }

    // Verificăm dacă există tabelul user_roles
    const userRolesTableExists = await connection.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'user_roles'
      )
    `);

    if (!userRolesTableExists[0].exists) {
      console.log('Tabelul user_roles nu există. Creăm tabelul...');
      
      // Creăm tabelul user_roles
      await connection.query(`
        CREATE TABLE IF NOT EXISTS "user_roles" (
          "user_id" UUID NOT NULL,
          "role_id" UUID NOT NULL,
          PRIMARY KEY ("user_id", "role_id"),
          CONSTRAINT "FK_user_roles_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE,
          CONSTRAINT "FK_user_roles_role" FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON DELETE CASCADE
        )
      `);
      
      console.log('Tabelul user_roles a fost creat cu succes.');
    }

    // Asignăm rolul admin utilizatorului admin
    await connection.query(`
      INSERT INTO "user_roles" ("user_id", "role_id")
      SELECT u.id, r.id
      FROM "users" u, "roles" r
      WHERE u.username = 'admin' AND r.name = 'admin'
      ON CONFLICT DO NOTHING
    `);
    
    console.log('Rolul admin a fost asignat utilizatorului admin.');

  } catch (error) {
    console.error('Eroare la crearea utilizatorului admin:', error);
  } finally {
    await connection.close();
  }
}

main().catch(error => {
  console.error('Eroare la executarea scriptului:', error);
  process.exit(1);
});
