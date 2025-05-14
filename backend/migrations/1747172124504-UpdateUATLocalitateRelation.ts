import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUATLocalitateRelation1747172124504 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Adăugare coloană uatId în tabela localitati
    await queryRunner.query(`
            ALTER TABLE "localitati" ADD COLUMN IF NOT EXISTS "uat_id" UUID;
        `);

    // Adăugare constraint foreign key pentru uatId
    await queryRunner.query(`
            ALTER TABLE "localitati" ADD CONSTRAINT "FK_localitati_uat"
            FOREIGN KEY ("uat_id") REFERENCES "uat"("id")
            ON DELETE SET NULL ON UPDATE CASCADE;
        `);

    // Populare coloana uat_id în tabela localitati pe baza relației inverse din uat
    await queryRunner.query(`
            UPDATE "localitati" l
            SET "uat_id" = u.id
            FROM "uat" u
            WHERE u."localitate_id" = l.id;
        `);

    // Eliminare coloana localitate_id din tabela uat
    await queryRunner.query(`
            ALTER TABLE "uat" DROP CONSTRAINT IF EXISTS "FK_uat_localitate";
            ALTER TABLE "uat" DROP COLUMN IF EXISTS "localitate_id";
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Adăugare coloana localitate_id în tabela uat
    await queryRunner.query(`
            ALTER TABLE "uat" ADD COLUMN IF NOT EXISTS "localitate_id" UUID;
        `);

    // Adăugare constraint foreign key pentru localitate_id
    await queryRunner.query(`
            ALTER TABLE "uat" ADD CONSTRAINT "FK_uat_localitate"
            FOREIGN KEY ("localitate_id") REFERENCES "localitati"("id")
            ON DELETE SET NULL ON UPDATE CASCADE;
        `);

    // Populare coloana localitate_id în tabela uat pe baza relației inverse din localitati
    await queryRunner.query(`
            UPDATE "uat" u
            SET "localitate_id" = l.id
            FROM "localitati" l
            WHERE l."uat_id" = u.id
            AND l.id = (
                SELECT MIN(l2.id)
                FROM "localitati" l2
                WHERE l2."uat_id" = u.id
            );
        `);

    // Eliminare coloana uat_id din tabela localitati
    await queryRunner.query(`
            ALTER TABLE "localitati" DROP CONSTRAINT IF EXISTS "FK_localitati_uat";
            ALTER TABLE "localitati" DROP COLUMN IF EXISTS "uat_id";
        `);
  }
}
