import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedInitialData1746975676049 implements MigrationInterface {
  name = 'SeedInitialData1746975676049';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Inserare date în tabela tipuri_client
    await queryRunner.query(`
            INSERT INTO "tipuri_client" ("nume", "descriere") VALUES
            ('Persoană Fizică', 'Client persoană fizică'),
            ('Persoană Juridică', 'Client persoană juridică'),
            ('Instituție Publică', 'Instituție publică (primărie, școală, etc.)'),
            ('ONG', 'Organizație non-guvernamentală')
        `);

    // Inserare date în tabela judete (primele 10 județe din România, în ordine alfabetică)
    await queryRunner.query(`
            INSERT INTO "judete" ("nume", "cod_siruta", "cod_auto") VALUES
            ('Alba', '1', 'AB'),
            ('Arad', '2', 'AR'),
            ('Argeș', '3', 'AG'),
            ('Bacău', '4', 'BC'),
            ('Bihor', '5', 'BH'),
            ('Bistrița-Năsăud', '6', 'BN'),
            ('Botoșani', '7', 'BT'),
            ('Brașov', '8', 'BV'),
            ('Brăila', '9', 'BR'),
            ('Buzău', '10', 'BZ')
        `);

    // Inserare date în tabela localitati (câteva localități pentru fiecare județ)
    await queryRunner.query(`
            INSERT INTO "localitati" ("judet_id", "nume", "cod_siruta", "tip") VALUES
            ((SELECT id FROM "judete" WHERE "nume" = 'Alba'), 'Alba Iulia', '1001', 'municipiu'),
            ((SELECT id FROM "judete" WHERE "nume" = 'Alba'), 'Aiud', '1002', 'municipiu'),
            ((SELECT id FROM "judete" WHERE "nume" = 'Alba'), 'Sebeș', '1003', 'municipiu'),
            ((SELECT id FROM "judete" WHERE "nume" = 'Arad'), 'Arad', '2001', 'municipiu'),
            ((SELECT id FROM "judete" WHERE "nume" = 'Arad'), 'Lipova', '2002', 'oraș'),
            ((SELECT id FROM "judete" WHERE "nume" = 'Argeș'), 'Pitești', '3001', 'municipiu'),
            ((SELECT id FROM "judete" WHERE "nume" = 'Argeș'), 'Curtea de Argeș', '3002', 'municipiu'),
            ((SELECT id FROM "judete" WHERE "nume" = 'Bacău'), 'Bacău', '4001', 'municipiu'),
            ((SELECT id FROM "judete" WHERE "nume" = 'Bacău'), 'Onești', '4002', 'municipiu'),
            ((SELECT id FROM "judete" WHERE "nume" = 'Bihor'), 'Oradea', '5001', 'municipiu')
        `);

    // Inserare date în tabela uat (Unități Administrativ-Teritoriale)
    await queryRunner.query(`
            INSERT INTO "uat" ("judet_id", "nume", "cod_siruta", "populatie", "suprafata") VALUES
            ((SELECT id FROM "judete" WHERE "nume" = 'Alba'), 'Alba Iulia', '1001', 74000, 103.65),
            ((SELECT id FROM "judete" WHERE "nume" = 'Arad'), 'Arad', '2001', 159000, 252.85),
            ((SELECT id FROM "judete" WHERE "nume" = 'Argeș'), 'Pitești', '3001', 155000, 40.7),
            ((SELECT id FROM "judete" WHERE "nume" = 'Bacău'), 'Bacău', '4001', 144000, 43.19),
            ((SELECT id FROM "judete" WHERE "nume" = 'Bihor'), 'Oradea', '5001', 196000, 115.56)
        `);

    // Inserare date în tabela categorii_deseuri
    await queryRunner.query(`
            INSERT INTO "categorii_deseuri" ("nume", "descriere", "cod") VALUES
            ('Hârtie și carton', 'Deșeuri de hârtie și carton', 'H01'),
            ('Plastic', 'Deșeuri de plastic', 'P01'),
            ('Sticlă', 'Deșeuri de sticlă', 'S01'),
            ('Metal', 'Deșeuri metalice', 'M01'),
            ('Biodegradabile', 'Deșeuri biodegradabile', 'B01'),
            ('Electrice și electronice', 'Deșeuri de echipamente electrice și electronice', 'E01'),
            ('Periculoase', 'Deșeuri periculoase', 'P02'),
            ('Voluminoase', 'Deșeuri voluminoase', 'V01'),
            ('Construcții și demolări', 'Deșeuri din construcții și demolări', 'C01'),
            ('Textile', 'Deșeuri textile', 'T01')
        `);

    // Inserare date în tabela servicii
    await queryRunner.query(`
            INSERT INTO "servicii" ("nume", "descriere", "pret_unitar", "unitate_masura") VALUES
            ('Colectare deșeuri menajere', 'Serviciu de colectare a deșeurilor menajere', 100.00, 'tonă'),
            ('Colectare deșeuri reciclabile', 'Serviciu de colectare a deșeurilor reciclabile', 50.00, 'tonă'),
            ('Colectare deșeuri voluminoase', 'Serviciu de colectare a deșeurilor voluminoase', 200.00, 'tonă'),
            ('Colectare deșeuri periculoase', 'Serviciu de colectare a deșeurilor periculoase', 500.00, 'tonă'),
            ('Transport deșeuri', 'Serviciu de transport al deșeurilor', 10.00, 'km'),
            ('Sortare deșeuri', 'Serviciu de sortare a deșeurilor', 150.00, 'tonă'),
            ('Consultanță de mediu', 'Serviciu de consultanță în domeniul protecției mediului', 200.00, 'oră'),
            ('Raportare lunară', 'Serviciu de raportare lunară a cantităților de deșeuri', 300.00, 'raport')
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Ștergere date în ordinea inversă inserării
    await queryRunner.query(`DELETE FROM "servicii"`);
    await queryRunner.query(`DELETE FROM "categorii_deseuri"`);
    await queryRunner.query(`DELETE FROM "uat"`);
    await queryRunner.query(`DELETE FROM "localitati"`);
    await queryRunner.query(`DELETE FROM "judete"`);
    await queryRunner.query(`DELETE FROM "tipuri_client"`);
  }
}
