import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBaseTables1746975670121 implements MigrationInterface {
  name = 'CreateBaseTables1746975670121';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Activare extensie uuid-ossp pentru generarea UUID-urilor
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    // Tabela pentru tipuri de clienți
    await queryRunner.query(`
            CREATE TABLE "tipuri_client" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "nume" VARCHAR(100) NOT NULL,
                "descriere" TEXT,
                "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `);

    // Tabela pentru județe
    await queryRunner.query(`
            CREATE TABLE "judete" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "nume" VARCHAR(100) NOT NULL,
                "cod_siruta" VARCHAR(10) UNIQUE,
                "cod_auto" VARCHAR(2) UNIQUE,
                "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `);

    // Tabela pentru localități
    await queryRunner.query(`
            CREATE TABLE "localitati" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "judet_id" UUID REFERENCES "judete"("id") ON DELETE CASCADE,
                "nume" VARCHAR(100) NOT NULL,
                "cod_siruta" VARCHAR(10) UNIQUE,
                "tip" VARCHAR(50),
                "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `);

    // Tabela pentru UAT-uri (Unități Administrativ-Teritoriale)
    await queryRunner.query(`
            CREATE TABLE "uat" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "judet_id" UUID REFERENCES "judete"("id") ON DELETE CASCADE,
                "nume" VARCHAR(100) NOT NULL,
                "cod_siruta" VARCHAR(10) UNIQUE,
                "populatie" INTEGER,
                "suprafata" DECIMAL(10, 2),
                "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `);

    // Tabela pentru clienți
    await queryRunner.query(`
            CREATE TABLE "clienti" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "tip_client_id" UUID NOT NULL REFERENCES "tipuri_client"("id"),
                "nume" VARCHAR(200) NOT NULL,
                "cui" VARCHAR(20) UNIQUE,
                "cnp" VARCHAR(13) UNIQUE,
                "adresa" TEXT NOT NULL,
                "judet_id" UUID REFERENCES "judete"("id"),
                "localitate_id" UUID REFERENCES "localitati"("id"),
                "cod_postal" VARCHAR(10),
                "email" VARCHAR(255),
                "telefon" VARCHAR(20),
                "persoana_contact" VARCHAR(100),
                "telefon_contact" VARCHAR(20),
                "email_contact" VARCHAR(255),
                "cod_client" VARCHAR(50) UNIQUE,
                "status" VARCHAR(20) NOT NULL DEFAULT 'active',
                "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `);

    // Tabela pentru categorii de deșeuri
    await queryRunner.query(`
            CREATE TABLE "categorii_deseuri" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "nume" VARCHAR(100) NOT NULL,
                "descriere" TEXT,
                "cod" VARCHAR(20) UNIQUE,
                "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `);

    // Tabela pentru puncte de colectare
    await queryRunner.query(`
            CREATE TABLE "puncte_colectare" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "client_id" UUID REFERENCES "clienti"("id") ON DELETE CASCADE,
                "nume" VARCHAR(100) NOT NULL,
                "adresa" TEXT NOT NULL,
                "judet_id" UUID REFERENCES "judete"("id"),
                "localitate_id" UUID REFERENCES "localitati"("id"),
                "latitudine" DECIMAL(10, 8),
                "longitudine" DECIMAL(11, 8),
                "program" TEXT,
                "status" VARCHAR(20) NOT NULL DEFAULT 'active',
                "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `);

    // Tabela pentru contracte
    await queryRunner.query(`
            CREATE TABLE "contracte" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "client_id" UUID NOT NULL REFERENCES "clienti"("id") ON DELETE CASCADE,
                "numar_contract" VARCHAR(50) NOT NULL UNIQUE,
                "data_inceput" DATE NOT NULL,
                "data_sfarsit" DATE,
                "valoare" DECIMAL(12, 2),
                "moneda" VARCHAR(3) DEFAULT 'RON',
                "status" VARCHAR(20) NOT NULL DEFAULT 'active',
                "detalii" TEXT,
                "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `);

    // Tabela pentru servicii
    await queryRunner.query(`
            CREATE TABLE "servicii" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "nume" VARCHAR(100) NOT NULL,
                "descriere" TEXT,
                "pret_unitar" DECIMAL(10, 2),
                "unitate_masura" VARCHAR(20),
                "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `);

    // Tabela pentru servicii contractate
    await queryRunner.query(`
            CREATE TABLE "servicii_contractate" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "contract_id" UUID NOT NULL REFERENCES "contracte"("id") ON DELETE CASCADE,
                "serviciu_id" UUID NOT NULL REFERENCES "servicii"("id"),
                "cantitate" DECIMAL(10, 2),
                "pret_unitar" DECIMAL(10, 2) NOT NULL,
                "discount" DECIMAL(5, 2) DEFAULT 0,
                "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `);

    // Tabela pentru date istorice (pentru ML)
    await queryRunner.query(`
            CREATE TABLE "date_istorice" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "uat_id" UUID NOT NULL REFERENCES "uat"("id"),
                "categorie_id" UUID NOT NULL REFERENCES "categorii_deseuri"("id"),
                "data" DATE NOT NULL,
                "cantitate" DECIMAL(10, 2) NOT NULL,
                "unitate_masura" VARCHAR(10) NOT NULL DEFAULT 'kg',
                "temperatura" DECIMAL(5, 2),
                "precipitatii" DECIMAL(5, 2),
                "sezon" VARCHAR(20),
                "eveniment_special" BOOLEAN DEFAULT FALSE,
                "descriere_eveniment" TEXT,
                "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `);

    // Tabela pentru predicții cantități
    await queryRunner.query(`
            CREATE TABLE "predictii_cantitati" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "uat_id" UUID REFERENCES "uat"("id"),
                "client_id" UUID REFERENCES "clienti"("id"),
                "punct_colectare_id" UUID REFERENCES "puncte_colectare"("id"),
                "categorie_id" UUID NOT NULL REFERENCES "categorii_deseuri"("id"),
                "data_predictie" DATE NOT NULL,
                "perioada_start" DATE NOT NULL,
                "perioada_end" DATE NOT NULL,
                "cantitate_estimata" DECIMAL(10, 2) NOT NULL,
                "unitate_masura" VARCHAR(10) NOT NULL DEFAULT 'kg',
                "interval_incredere_min" DECIMAL(10, 2),
                "interval_incredere_max" DECIMAL(10, 2),
                "acuratete_predictie" DECIMAL(5, 2),
                "model_utilizat" VARCHAR(100),
                "parametri_model" JSONB,
                "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `);

    // Adăugare comentarii pentru tabele
    await queryRunner.query(
      'COMMENT ON TABLE "tipuri_client" IS \'Tipuri de clienți (persoană fizică, persoană juridică, etc.)\'',
    );
    await queryRunner.query('COMMENT ON TABLE "judete" IS \'Județele din România\'');
    await queryRunner.query('COMMENT ON TABLE "localitati" IS \'Localitățile din România\'');
    await queryRunner.query(
      'COMMENT ON TABLE "uat" IS \'Unitățile Administrativ-Teritoriale din România\'',
    );
    await queryRunner.query('COMMENT ON TABLE "clienti" IS \'Clienții aplicației WasteWise\'');
    await queryRunner.query(
      'COMMENT ON TABLE "categorii_deseuri" IS \'Categoriile de deșeuri gestionate\'',
    );
    await queryRunner.query(
      'COMMENT ON TABLE "puncte_colectare" IS \'Punctele de colectare a deșeurilor\'',
    );
    await queryRunner.query(
      'COMMENT ON TABLE "contracte" IS \'Contractele încheiate cu clienții\'',
    );
    await queryRunner.query(
      'COMMENT ON TABLE "servicii" IS \'Serviciile oferite de aplicația WasteWise\'',
    );
    await queryRunner.query(
      'COMMENT ON TABLE "servicii_contractate" IS \'Serviciile contractate de clienți\'',
    );
    await queryRunner.query(
      'COMMENT ON TABLE "date_istorice" IS \'Date istorice pentru antrenarea modelelor ML\'',
    );
    await queryRunner.query(
      'COMMENT ON TABLE "predictii_cantitati" IS \'Predicții pentru cantitățile de deșeuri\'',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Ștergere tabele în ordinea inversă creării (pentru a respecta constrângerile de cheie străină)
    await queryRunner.query('DROP TABLE "predictii_cantitati"');
    await queryRunner.query('DROP TABLE "date_istorice"');
    await queryRunner.query('DROP TABLE "servicii_contractate"');
    await queryRunner.query('DROP TABLE "servicii"');
    await queryRunner.query('DROP TABLE "contracte"');
    await queryRunner.query('DROP TABLE "puncte_colectare"');
    await queryRunner.query('DROP TABLE "categorii_deseuri"');
    await queryRunner.query('DROP TABLE "clienti"');
    await queryRunner.query('DROP TABLE "uat"');
    await queryRunner.query('DROP TABLE "localitati"');
    await queryRunner.query('DROP TABLE "judete"');
    await queryRunner.query('DROP TABLE "tipuri_client"');
  }
}
