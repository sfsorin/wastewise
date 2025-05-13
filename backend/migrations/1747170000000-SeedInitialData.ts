import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedInitialData1747170000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Inserare roluri
    await queryRunner.query(`
            INSERT INTO "roles" ("name", "description", "createdAt", "updatedAt") VALUES
            ('admin', 'Administrator cu acces complet la sistem', NOW(), NOW()),
            ('manager', 'Manager cu acces limitat la sistem', NOW(), NOW()),
            ('user', 'Utilizator obișnuit', NOW(), NOW())
        `);

    // Inserare permisiuni
    await queryRunner.query(`
            INSERT INTO "permissions" ("name", "description", "createdAt", "updatedAt") VALUES
            ('create:users', 'Poate crea utilizatori', NOW(), NOW()),
            ('update:users', 'Poate actualiza utilizatori', NOW(), NOW()),
            ('delete:users', 'Poate șterge utilizatori', NOW(), NOW()),
            ('view:users', 'Poate vizualiza utilizatori', NOW(), NOW()),
            ('create:clients', 'Poate crea clienți', NOW(), NOW()),
            ('update:clients', 'Poate actualiza clienți', NOW(), NOW()),
            ('delete:clients', 'Poate șterge clienți', NOW(), NOW()),
            ('view:clients', 'Poate vizualiza clienți', NOW(), NOW()),
            ('create:contracts', 'Poate crea contracte', NOW(), NOW()),
            ('update:contracts', 'Poate actualiza contracte', NOW(), NOW()),
            ('delete:contracts', 'Poate șterge contracte', NOW(), NOW()),
            ('view:contracts', 'Poate vizualiza contracte', NOW(), NOW())
        `);

    // Asociere permisiuni la roluri pentru admin
    await queryRunner.query(`
            INSERT INTO "role_permissions" ("role_id", "permission_id")
            SELECT r.id, p.id
            FROM "roles" r, "permissions" p
            WHERE r.name = 'admin'
        `);

    // Asociere permisiuni la roluri pentru manager
    await queryRunner.query(`
            INSERT INTO "role_permissions" ("role_id", "permission_id")
            SELECT r.id, p.id
            FROM "roles" r, "permissions" p
            WHERE r.name = 'manager' AND p.name IN ('view:users', 'create:clients', 'update:clients', 'view:clients', 'create:contracts', 'update:contracts', 'view:contracts')
        `);

    // Asociere permisiuni la roluri pentru user
    await queryRunner.query(`
            INSERT INTO "role_permissions" ("role_id", "permission_id")
            SELECT r.id, p.id
            FROM "roles" r, "permissions" p
            WHERE r.name = 'user' AND p.name IN ('view:users', 'view:clients', 'view:contracts')
        `);

    // Inserare utilizator admin
    const hashedPassword = '$2b$10$6Bnv9t7Vd.ykJK2Vd6A/QOyBQFXWVJXZEMGqIWY/OBMh1qj.8v.Oe'; // "Admin123!"
    await queryRunner.query(`
            INSERT INTO "users" ("username", "firstName", "lastName", "fullName", "email", "password", "role", "status", "isActive", "createdAt", "updatedAt") VALUES
            ('admin', 'Admin', 'System', 'Admin System', 'admin@wastewise.ro', '${hashedPassword}', 'admin', 'active', true, NOW(), NOW())
        `);

    // Asociere utilizator la rol
    await queryRunner.query(`
            INSERT INTO "user_roles" ("user_id", "role_id")
            SELECT u.id, r.id
            FROM "users" u, "roles" r
            WHERE u.username = 'admin' AND r.name = 'admin'
        `);

    // Inserare zone ADI
    await queryRunner.query(`
            INSERT INTO "zone_adi" ("nume", "descriere", "createdAt", "updatedAt") VALUES
            ('Zona ADI Nord', 'Zona de gestionare a deșeurilor din partea de nord a județului', NOW(), NOW()),
            ('Zona ADI Sud', 'Zona de gestionare a deșeurilor din partea de sud a județului', NOW(), NOW()),
            ('Zona ADI Est', 'Zona de gestionare a deșeurilor din partea de est a județului', NOW(), NOW()),
            ('Zona ADI Vest', 'Zona de gestionare a deșeurilor din partea de vest a județului', NOW(), NOW()),
            ('Zona ADI Centru', 'Zona de gestionare a deșeurilor din partea centrală a județului', NOW(), NOW())
        `);

    // Inserare zone Iridex
    await queryRunner.query(`
            INSERT INTO "zone_iridex" ("nume", "descriere", "createdAt", "updatedAt") VALUES
            ('Zona Iridex 1', 'Zona de colectare și transport deșeuri 1', NOW(), NOW()),
            ('Zona Iridex 2', 'Zona de colectare și transport deșeuri 2', NOW(), NOW()),
            ('Zona Iridex 3', 'Zona de colectare și transport deșeuri 3', NOW(), NOW())
        `);

    // Inserare județe (primele 5 din România)
    await queryRunner.query(`
            INSERT INTO "judete" ("nume", "codAuto", "createdAt", "updatedAt") VALUES
            ('Alba', 'AB', NOW(), NOW()),
            ('Arad', 'AR', NOW(), NOW()),
            ('Argeș', 'AG', NOW(), NOW()),
            ('Bacău', 'BC', NOW(), NOW()),
            ('Bihor', 'BH', NOW(), NOW())
        `);

    // Inserare localități pentru județul Alba (primele 10)
    await queryRunner.query(`
            INSERT INTO "localitati" ("nume", "judet_id", "createdAt", "updatedAt")
            SELECT 'Alba Iulia', j.id, NOW(), NOW() FROM "judete" j WHERE j.nume = 'Alba'
            UNION ALL
            SELECT 'Cugir', j.id, NOW(), NOW() FROM "judete" j WHERE j.nume = 'Alba'
            UNION ALL
            SELECT 'Aiud', j.id, NOW(), NOW() FROM "judete" j WHERE j.nume = 'Alba'
            UNION ALL
            SELECT 'Sebeș', j.id, NOW(), NOW() FROM "judete" j WHERE j.nume = 'Alba'
            UNION ALL
            SELECT 'Blaj', j.id, NOW(), NOW() FROM "judete" j WHERE j.nume = 'Alba'
            UNION ALL
            SELECT 'Ocna Mureș', j.id, NOW(), NOW() FROM "judete" j WHERE j.nume = 'Alba'
            UNION ALL
            SELECT 'Teiuș', j.id, NOW(), NOW() FROM "judete" j WHERE j.nume = 'Alba'
            UNION ALL
            SELECT 'Câmpeni', j.id, NOW(), NOW() FROM "judete" j WHERE j.nume = 'Alba'
            UNION ALL
            SELECT 'Abrud', j.id, NOW(), NOW() FROM "judete" j WHERE j.nume = 'Alba'
            UNION ALL
            SELECT 'Zlatna', j.id, NOW(), NOW() FROM "judete" j WHERE j.nume = 'Alba'
        `);

    // Inserare UAT-uri pentru județul Alba
    await queryRunner.query(`
            INSERT INTO "uat" ("nume", "judet_id", "zona_adi_id", "zona_iridex_id", "createdAt", "updatedAt")
            SELECT 'UAT Alba Iulia', j.id, za.id, zi.id, NOW(), NOW()
            FROM "judete" j, "zone_adi" za, "zone_iridex" zi
            WHERE j.nume = 'Alba' AND za.nume = 'Zona ADI Centru' AND zi.nume = 'Zona Iridex 1'
            UNION ALL
            SELECT 'UAT Cugir', j.id, za.id, zi.id, NOW(), NOW()
            FROM "judete" j, "zone_adi" za, "zone_iridex" zi
            WHERE j.nume = 'Alba' AND za.nume = 'Zona ADI Vest' AND zi.nume = 'Zona Iridex 2'
            UNION ALL
            SELECT 'UAT Aiud', j.id, za.id, zi.id, NOW(), NOW()
            FROM "judete" j, "zone_adi" za, "zone_iridex" zi
            WHERE j.nume = 'Alba' AND za.nume = 'Zona ADI Nord' AND zi.nume = 'Zona Iridex 1'
            UNION ALL
            SELECT 'UAT Sebeș', j.id, za.id, zi.id, NOW(), NOW()
            FROM "judete" j, "zone_adi" za, "zone_iridex" zi
            WHERE j.nume = 'Alba' AND za.nume = 'Zona ADI Vest' AND zi.nume = 'Zona Iridex 2'
            UNION ALL
            SELECT 'UAT Blaj', j.id, za.id, zi.id, NOW(), NOW()
            FROM "judete" j, "zone_adi" za, "zone_iridex" zi
            WHERE j.nume = 'Alba' AND za.nume = 'Zona ADI Est' AND zi.nume = 'Zona Iridex 3'
        `);

    // Inserare tipuri client
    await queryRunner.query(`
            INSERT INTO "tipuri_client" ("nume", "descriere", "createdAt", "updatedAt") VALUES
            ('Persoană fizică', 'Client persoană fizică', NOW(), NOW()),
            ('Persoană juridică', 'Client persoană juridică', NOW(), NOW()),
            ('Instituție publică', 'Client instituție publică', NOW(), NOW()),
            ('Asociație de proprietari', 'Client asociație de proprietari', NOW(), NOW())
        `);

    // Inserare clienți
    await queryRunner.query(`
            INSERT INTO "clienti" ("nume", "cui", "adresa", "telefon", "email", "tip_client_id", "tipClientId", "createdAt", "updatedAt")
            SELECT 'Primăria Alba Iulia', 'RO12345678', 'Str. Calea Moților nr. 5A, Alba Iulia', '0258123456', 'contact@primariaalba.ro', tc.id, tc.id, NOW(), NOW()
            FROM "tipuri_client" tc
            WHERE tc.nume = 'Instituție publică'
            UNION ALL
            SELECT 'SC Eco Recycling SRL', 'RO87654321', 'Str. Industriei nr. 10, Alba Iulia', '0258654321', 'office@ecorecycling.ro', tc.id, tc.id, NOW(), NOW()
            FROM "tipuri_client" tc
            WHERE tc.nume = 'Persoană juridică'
            UNION ALL
            SELECT 'Asociația de Proprietari nr. 5', NULL, 'Str. Lalelelor nr. 7, Alba Iulia', '0258111222', 'ap5@gmail.com', tc.id, tc.id, NOW(), NOW()
            FROM "tipuri_client" tc
            WHERE tc.nume = 'Asociație de proprietari'
            UNION ALL
            SELECT 'Popescu Ion', NULL, 'Str. Zorilor nr. 15, Aiud', '0745123456', 'ion.popescu@gmail.com', tc.id, tc.id, NOW(), NOW()
            FROM "tipuri_client" tc
            WHERE tc.nume = 'Persoană fizică'
            UNION ALL
            SELECT 'SC Green Solutions SRL', 'RO11223344', 'Str. Principală nr. 25, Sebeș', '0258333444', 'office@greensolutions.ro', tc.id, tc.id, NOW(), NOW()
            FROM "tipuri_client" tc
            WHERE tc.nume = 'Persoană juridică'
        `);

    // Inserare puncte de colectare
    await queryRunner.query(`
            INSERT INTO "puncte_colectare" ("nume", "adresa", "latitudine", "longitudine", "client_id", "createdAt", "updatedAt")
            SELECT 'Punct colectare Primăria Alba Iulia', 'Str. Calea Moților nr. 5A, Alba Iulia', 46.07, 23.57, c.id, NOW(), NOW()
            FROM "clienti" c
            WHERE c.nume = 'Primăria Alba Iulia'
            UNION ALL
            SELECT 'Punct colectare Eco Recycling', 'Str. Industriei nr. 10, Alba Iulia', 46.08, 23.58, c.id, NOW(), NOW()
            FROM "clienti" c
            WHERE c.nume = 'SC Eco Recycling SRL'
            UNION ALL
            SELECT 'Punct colectare Asociația nr. 5', 'Str. Lalelelor nr. 7, Alba Iulia', 46.06, 23.56, c.id, NOW(), NOW()
            FROM "clienti" c
            WHERE c.nume = 'Asociația de Proprietari nr. 5'
            UNION ALL
            SELECT 'Punct colectare Popescu Ion', 'Str. Zorilor nr. 15, Aiud', 46.31, 23.72, c.id, NOW(), NOW()
            FROM "clienti" c
            WHERE c.nume = 'Popescu Ion'
            UNION ALL
            SELECT 'Punct colectare Green Solutions', 'Str. Principală nr. 25, Sebeș', 45.96, 23.57, c.id, NOW(), NOW()
            FROM "clienti" c
            WHERE c.nume = 'SC Green Solutions SRL'
        `);

    // Inserare categorii deșeuri
    await queryRunner.query(`
            INSERT INTO "categorii_deseuri" ("nume", "descriere", "cod", "createdAt", "updatedAt") VALUES
            ('Hârtie și carton', 'Deșeuri de hârtie și carton', '20 01 01', NOW(), NOW()),
            ('Plastic', 'Deșeuri de plastic', '20 01 39', NOW(), NOW()),
            ('Sticlă', 'Deșeuri de sticlă', '20 01 02', NOW(), NOW()),
            ('Metal', 'Deșeuri metalice', '20 01 40', NOW(), NOW()),
            ('Biodegradabile', 'Deșeuri biodegradabile', '20 01 08', NOW(), NOW()),
            ('Reziduale', 'Deșeuri reziduale', '20 03 01', NOW(), NOW())
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Ștergere date în ordine inversă pentru a respecta constrângerile de integritate
    await queryRunner.query(`DELETE FROM "categorii_deseuri"`);
    await queryRunner.query(`DELETE FROM "puncte_colectare"`);
    await queryRunner.query(`DELETE FROM "clienti"`);
    await queryRunner.query(`DELETE FROM "tipuri_client"`);
    await queryRunner.query(`DELETE FROM "uat"`);
    await queryRunner.query(`DELETE FROM "localitati"`);
    await queryRunner.query(`DELETE FROM "judete"`);
    await queryRunner.query(`DELETE FROM "zone_iridex"`);
    await queryRunner.query(`DELETE FROM "zone_adi"`);
    await queryRunner.query(`DELETE FROM "user_roles"`);
    await queryRunner.query(
      `DELETE FROM "users" WHERE "id" = '99999999-9999-9999-9999-999999999999'`,
    );
    await queryRunner.query(`DELETE FROM "role_permissions"`);
    await queryRunner.query(`DELETE FROM "permissions"`);
    await queryRunner.query(`DELETE FROM "roles"`);
  }
}
