import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1746973160489 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS 'users' (
        'id' UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        'username' VARCHAR(50) NOT NULL UNIQUE,
        'firstName' VARCHAR(100),
        'lastName' VARCHAR(100),
        'email' VARCHAR(255) NOT NULL UNIQUE,
        'password' VARCHAR(255) NOT NULL,
        'fullName' VARCHAR(100),
        'role' VARCHAR(20) NOT NULL DEFAULT 'user',
        'status' VARCHAR(20) NOT NULL DEFAULT 'active',
        'isActive' BOOLEAN NOT NULL DEFAULT true,
        'lastLogin' TIMESTAMP WITH TIME ZONE,
        'createdAt' TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        'updatedAt' TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
      )
    `);

    // Creare utilizator admin implicit
    await queryRunner.query(`
      INSERT INTO 'users' ('username', 'email', 'password', 'fullName', 'role', 'status')
      VALUES (
        'admin',
        'admin@wastewise.ro',
        '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', -- parola: 'Password123!'
        'Administrator',
        'admin',
        'active'
      )
      ON CONFLICT DO NOTHING
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS 'users'`);
  }
}
