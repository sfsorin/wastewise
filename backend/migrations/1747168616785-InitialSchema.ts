import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1747168616785 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Crearea tipurilor enum dacă nu există
    await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'users_role_enum') THEN
                    CREATE TYPE "users_role_enum" AS ENUM ('admin', 'manager', 'user');
                END IF;

                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'users_status_enum') THEN
                    CREATE TYPE "users_status_enum" AS ENUM ('active', 'inactive', 'blocked');
                END IF;
            END
            $$;
        `);

    // Crearea extensiei pentru UUID
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    // Crearea tabelelor pentru utilizatori și roluri
    await queryRunner.query(`
            CREATE TABLE "permissions" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(100) NOT NULL,
                "description" character varying(255),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_permissions_name" UNIQUE ("name"),
                CONSTRAINT "PK_permissions" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            CREATE TABLE "roles" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(50) NOT NULL,
                "description" character varying(255),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_roles_name" UNIQUE ("name"),
                CONSTRAINT "PK_roles" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "username" character varying(50) NOT NULL,
                "firstName" character varying(100),
                "lastName" character varying(100),
                "fullName" character varying(100),
                "email" character varying(255) NOT NULL,
                "password" character varying(255) NOT NULL,
                "role" "users_role_enum" NOT NULL DEFAULT 'user',
                "status" "users_status_enum" NOT NULL DEFAULT 'active',
                "isActive" boolean NOT NULL DEFAULT true,
                "lastLogin" TIMESTAMP,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_users_username" UNIQUE ("username"),
                CONSTRAINT "UQ_users_email" UNIQUE ("email"),
                CONSTRAINT "PK_users" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            CREATE TABLE "role_permissions" (
                "role_id" uuid NOT NULL,
                "permission_id" uuid NOT NULL,
                CONSTRAINT "PK_role_permissions" PRIMARY KEY ("role_id", "permission_id")
            )
        `);

    await queryRunner.query(`
            CREATE TABLE "user_roles" (
                "user_id" uuid NOT NULL,
                "role_id" uuid NOT NULL,
                CONSTRAINT "PK_user_roles" PRIMARY KEY ("user_id", "role_id")
            )
        `);

    await queryRunner.query(`
            CREATE TABLE "password_reset_tokens" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "userId" uuid NOT NULL,
                "token" character varying(255) NOT NULL,
                "expiresAt" TIMESTAMP NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_password_reset_tokens_token" UNIQUE ("token"),
                CONSTRAINT "PK_password_reset_tokens" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            CREATE TABLE "profiles" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "userId" uuid NOT NULL,
                "avatar" character varying(255),
                "bio" text,
                "phone" character varying(20),
                "address" character varying(255),
                "city" character varying(100),
                "country" character varying(100),
                "preferences" jsonb,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_profiles_userId" UNIQUE ("userId"),
                CONSTRAINT "PK_profiles" PRIMARY KEY ("id")
            )
        `);

    // Crearea tabelelor pentru entitățile geografice
    await queryRunner.query(`
            CREATE TABLE "judete" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "nume" character varying(100) NOT NULL,
                "cod" character varying(10) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_judete_cod" UNIQUE ("cod"),
                CONSTRAINT "PK_judete" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            CREATE TABLE "localitati" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "nume" character varying(100) NOT NULL,
                "judetId" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_localitati" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            CREATE TABLE "zone_adi" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "nume" character varying(100) NOT NULL,
                "descriere" text,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_zone_adi" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            CREATE TABLE "zone_iridex" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "nume" character varying(100) NOT NULL,
                "descriere" text,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_zone_iridex" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            CREATE TABLE "uat" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "nume" character varying(100) NOT NULL,
                "judetId" uuid NOT NULL,
                "zonaAdiId" uuid NOT NULL,
                "zonaIridexId" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_uat" PRIMARY KEY ("id")
            )
        `);

    // Crearea tabelelor pentru clienți și puncte de colectare
    await queryRunner.query(`
            CREATE TABLE "tipuri_client" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "nume" character varying(100) NOT NULL,
                "descriere" text,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_tipuri_client" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            CREATE TABLE "clienti" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "nume" character varying(100) NOT NULL,
                "cui" character varying(20),
                "adresa" character varying(255),
                "telefon" character varying(20),
                "email" character varying(255),
                "tipClientId" uuid NOT NULL,
                "uatId" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_clienti" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            CREATE TABLE "puncte_colectare" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "nume" character varying(100) NOT NULL,
                "adresa" character varying(255) NOT NULL,
                "latitudine" numeric(10,8),
                "longitudine" numeric(11,8),
                "clientId" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_puncte_colectare" PRIMARY KEY ("id")
            )
        `);

    // Crearea tabelelor pentru categorii de deșeuri
    await queryRunner.query(`
            CREATE TABLE "categorii_deseuri" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "nume" character varying(100) NOT NULL,
                "descriere" text,
                "cod" character varying(20) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_categorii_deseuri_cod" UNIQUE ("cod"),
                CONSTRAINT "PK_categorii_deseuri" PRIMARY KEY ("id")
            )
        `);

    // Crearea tabelelor pentru contracte și servicii
    await queryRunner.query(`
            CREATE TABLE "servicii" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "nume" character varying(100) NOT NULL,
                "descriere" text,
                "pret" numeric(10,2) NOT NULL,
                "categorieDeseuId" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_servicii" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            CREATE TABLE "contracte" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "numar" character varying(50) NOT NULL,
                "dataStart" TIMESTAMP NOT NULL,
                "dataFinal" TIMESTAMP NOT NULL,
                "valoare" numeric(10,2) NOT NULL,
                "clientId" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_contracte_numar" UNIQUE ("numar"),
                CONSTRAINT "PK_contracte" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            CREATE TABLE "servicii_contractate" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "contractId" uuid NOT NULL,
                "serviciuId" uuid NOT NULL,
                "cantitate" numeric(10,2) NOT NULL,
                "frecventa" character varying(50) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_servicii_contractate" PRIMARY KEY ("id")
            )
        `);

    // Crearea tabelelor pentru date istorice și predicții
    await queryRunner.query(`
            CREATE TABLE "date_istorice" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "data" TIMESTAMP NOT NULL,
                "cantitate" numeric(10,2) NOT NULL,
                "punctColectareId" uuid NOT NULL,
                "categorieDeseuId" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_date_istorice" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            CREATE TABLE "predictii_cantitati" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "data" TIMESTAMP NOT NULL,
                "cantitate" numeric(10,2) NOT NULL,
                "acuratete" numeric(5,2),
                "punctColectareId" uuid NOT NULL,
                "categorieDeseuId" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_predictii_cantitati" PRIMARY KEY ("id")
            )
        `);

    // Adăugarea cheilor străine
    await queryRunner.query(`
            ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_role_permissions_role" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
            ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_role_permissions_permission" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

            ALTER TABLE "user_roles" ADD CONSTRAINT "FK_user_roles_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
            ALTER TABLE "user_roles" ADD CONSTRAINT "FK_user_roles_role" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

            ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "FK_password_reset_tokens_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE;

            ALTER TABLE "profiles" ADD CONSTRAINT "FK_profiles_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE;

            ALTER TABLE "localitati" ADD CONSTRAINT "FK_localitati_judet" FOREIGN KEY ("judetId") REFERENCES "judete"("id") ON DELETE CASCADE;

            ALTER TABLE "uat" ADD CONSTRAINT "FK_uat_judet" FOREIGN KEY ("judetId") REFERENCES "judete"("id") ON DELETE CASCADE;
            ALTER TABLE "uat" ADD CONSTRAINT "FK_uat_zona_adi" FOREIGN KEY ("zonaAdiId") REFERENCES "zone_adi"("id") ON DELETE CASCADE;
            ALTER TABLE "uat" ADD CONSTRAINT "FK_uat_zona_iridex" FOREIGN KEY ("zonaIridexId") REFERENCES "zone_iridex"("id") ON DELETE CASCADE;

            ALTER TABLE "clienti" ADD CONSTRAINT "FK_clienti_tip_client" FOREIGN KEY ("tipClientId") REFERENCES "tipuri_client"("id") ON DELETE CASCADE;
            ALTER TABLE "clienti" ADD CONSTRAINT "FK_clienti_uat" FOREIGN KEY ("uatId") REFERENCES "uat"("id") ON DELETE CASCADE;

            ALTER TABLE "puncte_colectare" ADD CONSTRAINT "FK_puncte_colectare_client" FOREIGN KEY ("clientId") REFERENCES "clienti"("id") ON DELETE CASCADE;

            ALTER TABLE "servicii" ADD CONSTRAINT "FK_servicii_categorie_deseu" FOREIGN KEY ("categorieDeseuId") REFERENCES "categorii_deseuri"("id") ON DELETE CASCADE;

            ALTER TABLE "contracte" ADD CONSTRAINT "FK_contracte_client" FOREIGN KEY ("clientId") REFERENCES "clienti"("id") ON DELETE CASCADE;

            ALTER TABLE "servicii_contractate" ADD CONSTRAINT "FK_servicii_contractate_contract" FOREIGN KEY ("contractId") REFERENCES "contracte"("id") ON DELETE CASCADE;
            ALTER TABLE "servicii_contractate" ADD CONSTRAINT "FK_servicii_contractate_serviciu" FOREIGN KEY ("serviciuId") REFERENCES "servicii"("id") ON DELETE CASCADE;

            ALTER TABLE "date_istorice" ADD CONSTRAINT "FK_date_istorice_punct_colectare" FOREIGN KEY ("punctColectareId") REFERENCES "puncte_colectare"("id") ON DELETE CASCADE;
            ALTER TABLE "date_istorice" ADD CONSTRAINT "FK_date_istorice_categorie_deseu" FOREIGN KEY ("categorieDeseuId") REFERENCES "categorii_deseuri"("id") ON DELETE CASCADE;

            ALTER TABLE "predictii_cantitati" ADD CONSTRAINT "FK_predictii_cantitati_punct_colectare" FOREIGN KEY ("punctColectareId") REFERENCES "puncte_colectare"("id") ON DELETE CASCADE;
            ALTER TABLE "predictii_cantitati" ADD CONSTRAINT "FK_predictii_cantitati_categorie_deseu" FOREIGN KEY ("categorieDeseuId") REFERENCES "categorii_deseuri"("id") ON DELETE CASCADE;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Eliminarea cheilor străine
    await queryRunner.query(`
            ALTER TABLE "predictii_cantitati" DROP CONSTRAINT "FK_predictii_cantitati_categorie_deseu";
            ALTER TABLE "predictii_cantitati" DROP CONSTRAINT "FK_predictii_cantitati_punct_colectare";

            ALTER TABLE "date_istorice" DROP CONSTRAINT "FK_date_istorice_categorie_deseu";
            ALTER TABLE "date_istorice" DROP CONSTRAINT "FK_date_istorice_punct_colectare";

            ALTER TABLE "servicii_contractate" DROP CONSTRAINT "FK_servicii_contractate_serviciu";
            ALTER TABLE "servicii_contractate" DROP CONSTRAINT "FK_servicii_contractate_contract";

            ALTER TABLE "contracte" DROP CONSTRAINT "FK_contracte_client";

            ALTER TABLE "servicii" DROP CONSTRAINT "FK_servicii_categorie_deseu";

            ALTER TABLE "puncte_colectare" DROP CONSTRAINT "FK_puncte_colectare_client";

            ALTER TABLE "clienti" DROP CONSTRAINT "FK_clienti_uat";
            ALTER TABLE "clienti" DROP CONSTRAINT "FK_clienti_tip_client";

            ALTER TABLE "uat" DROP CONSTRAINT "FK_uat_zona_iridex";
            ALTER TABLE "uat" DROP CONSTRAINT "FK_uat_zona_adi";
            ALTER TABLE "uat" DROP CONSTRAINT "FK_uat_judet";

            ALTER TABLE "localitati" DROP CONSTRAINT "FK_localitati_judet";

            ALTER TABLE "profiles" DROP CONSTRAINT "FK_profiles_user";

            ALTER TABLE "password_reset_tokens" DROP CONSTRAINT "FK_password_reset_tokens_user";

            ALTER TABLE "user_roles" DROP CONSTRAINT "FK_user_roles_role";
            ALTER TABLE "user_roles" DROP CONSTRAINT "FK_user_roles_user";

            ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_role_permissions_permission";
            ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_role_permissions_role";
        `);

    // Eliminarea tabelelor
    await queryRunner.query(`
            DROP TABLE "predictii_cantitati";
            DROP TABLE "date_istorice";
            DROP TABLE "servicii_contractate";
            DROP TABLE "contracte";
            DROP TABLE "servicii";
            DROP TABLE "categorii_deseuri";
            DROP TABLE "puncte_colectare";
            DROP TABLE "clienti";
            DROP TABLE "tipuri_client";
            DROP TABLE "uat";
            DROP TABLE "zone_iridex";
            DROP TABLE "zone_adi";
            DROP TABLE "localitati";
            DROP TABLE "judete";
            DROP TABLE "profiles";
            DROP TABLE "password_reset_tokens";
            DROP TABLE "user_roles";
            DROP TABLE "role_permissions";
            DROP TABLE "users";
            DROP TABLE "roles";
            DROP TABLE "permissions";
        `);

    // Eliminarea tipurilor enum dacă există
    await queryRunner.query(`
            DO $$
            BEGIN
                IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'users_status_enum') THEN
                    DROP TYPE "users_status_enum";
                END IF;

                IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'users_role_enum') THEN
                    DROP TYPE "users_role_enum";
                END IF;
            END
            $$;
        `);
  }
}
