import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRolesAndPermissions1747073299668 implements MigrationInterface {
  name = 'CreateRolesAndPermissions1747073299668';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "localitati" DROP CONSTRAINT "localitati_judet_id_fkey"');
    await queryRunner.query('ALTER TABLE "uat" DROP CONSTRAINT "uat_judet_id_fkey"');
    await queryRunner.query(
      'CREATE TABLE "permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_48ce552495d14eae9b187bb6716" UNIQUE ("name"), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "avatar" character varying, "phoneNumber" character varying, "address" character varying, "city" character varying, "county" character varying, "postalCode" character varying, "bio" character varying, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_315ecd98bd1a42dcf2ec4e2e98" UNIQUE ("userId"), CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "predictii_cantitati" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "uatId" character varying, "clientId" character varying, "punctColectareId" character varying, "categorieId" character varying NOT NULL, "dataPredictie" date NOT NULL, "perioadaStart" date NOT NULL, "perioadaEnd" date NOT NULL, "cantitateEstimata" numeric(10,2) NOT NULL, "unitateMasura" character varying(10) NOT NULL DEFAULT \'kg\', "intervalIncredereMin" numeric(10,2), "intervalIncredereMax" numeric(10,2), "acuratetePredictie" numeric(5,2), "modelUtilizat" character varying(100), "parametriModel" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "uat_id" uuid, "client_id" uuid, "punct_colectare_id" uuid, "categorie_id" uuid, CONSTRAINT "PK_199adce44eaee8b0c95466f3749" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "categorii_deseuri" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nume" character varying(100) NOT NULL, "descriere" text, "cod" character varying(20), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_1a892b4a467f24175314311a8d0" UNIQUE ("cod"), CONSTRAINT "PK_652a57f8e05fc3c2e48abfb4f0e" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "date_istorice" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "uatId" character varying NOT NULL, "categorieId" character varying NOT NULL, "data" date NOT NULL, "cantitate" numeric(10,2) NOT NULL, "unitateMasura" character varying(10) NOT NULL DEFAULT \'kg\', "temperatura" numeric(5,2), "precipitatii" numeric(5,2), "sezon" character varying(20), "evenimentSpecial" boolean NOT NULL DEFAULT false, "descriereEveniment" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "uat_id" uuid, "categorie_id" uuid, CONSTRAINT "PK_2d32b964b8cc1776c346bde2281" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "servicii" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nume" character varying(100) NOT NULL, "descriere" text, "pretUnitar" numeric(10,2), "unitateMasura" character varying(20), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c26acd709a52686a5c7b4554f35" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "servicii_contractate" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "contractId" character varying NOT NULL, "serviciuId" character varying NOT NULL, "cantitate" numeric(10,2), "pretUnitar" numeric(10,2) NOT NULL, "discount" numeric(5,2) NOT NULL DEFAULT \'0\', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "contract_id" uuid, "serviciu_id" uuid, CONSTRAINT "PK_9c0a03ed444d0830d670732c44d" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "contracte" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "clientId" character varying NOT NULL, "numarContract" character varying(50) NOT NULL, "dataInceput" date NOT NULL, "dataSfarsit" date, "valoare" numeric(12,2), "moneda" character varying(3) NOT NULL DEFAULT \'RON\', "status" character varying(20) NOT NULL DEFAULT \'active\', "detalii" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "client_id" uuid, CONSTRAINT "UQ_291d1ba7454ecf60beae6624bfe" UNIQUE ("numarContract"), CONSTRAINT "PK_a592edd4777ea280a6b2b45dbee" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "clienti" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tipClientId" character varying NOT NULL, "nume" character varying(200) NOT NULL, "cui" character varying(20), "cnp" character varying(13), "adresa" text NOT NULL, "judetId" character varying, "localitateId" character varying, "codPostal" character varying(10), "email" character varying(255), "telefon" character varying(20), "persoanaContact" character varying(100), "telefonContact" character varying(20), "emailContact" character varying(255), "codClient" character varying(50), "status" character varying(20) NOT NULL DEFAULT \'active\', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "tip_client_id" uuid, "judet_id" uuid, "localitate_id" uuid, CONSTRAINT "UQ_181d59a2c3c9aedce14301f8439" UNIQUE ("cui"), CONSTRAINT "UQ_5a76aba45b7b94e5d1fce783b96" UNIQUE ("cnp"), CONSTRAINT "UQ_348184becf2fe95f0947895749e" UNIQUE ("codClient"), CONSTRAINT "PK_72af4bdad6069bd9a4755a54feb" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "puncte_colectare" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "clientId" character varying, "nume" character varying(100) NOT NULL, "adresa" text NOT NULL, "judetId" character varying, "localitateId" character varying, "latitudine" numeric(10,8), "longitudine" numeric(11,8), "program" text, "status" character varying(20) NOT NULL DEFAULT \'active\', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "client_id" uuid, "judet_id" uuid, "localitate_id" uuid, CONSTRAINT "PK_f198c4650c9f87f6f35c5333dc6" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "user_roles" ("user_id" uuid NOT NULL, "role_id" uuid NOT NULL, CONSTRAINT "PK_23ed6f04fe43066df08379fd034" PRIMARY KEY ("user_id", "role_id"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_87b8888186ca9769c960e92687" ON "user_roles" ("user_id") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_b23c65e50a758245a33ee35fda" ON "user_roles" ("role_id") ',
    );
    await queryRunner.query(
      'CREATE TABLE "role_permissions" ("role_id" uuid NOT NULL, "permission_id" uuid NOT NULL, CONSTRAINT "PK_25d24010f53bb80b78e412c9656" PRIMARY KEY ("role_id", "permission_id"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_178199805b901ccd220ab7740e" ON "role_permissions" ("role_id") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_17022daf3f885f7d35423e9971" ON "role_permissions" ("permission_id") ',
    );
    await queryRunner.query('ALTER TABLE "tipuri_client" DROP COLUMN "created_at"');
    await queryRunner.query('ALTER TABLE "tipuri_client" DROP COLUMN "updated_at"');
    await queryRunner.query('ALTER TABLE "localitati" DROP CONSTRAINT "localitati_cod_siruta_key"');
    await queryRunner.query('ALTER TABLE "localitati" DROP COLUMN "cod_siruta"');
    await queryRunner.query('ALTER TABLE "localitati" DROP COLUMN "created_at"');
    await queryRunner.query('ALTER TABLE "localitati" DROP COLUMN "updated_at"');
    await queryRunner.query('ALTER TABLE "uat" DROP CONSTRAINT "uat_cod_siruta_key"');
    await queryRunner.query('ALTER TABLE "uat" DROP COLUMN "cod_siruta"');
    await queryRunner.query('ALTER TABLE "uat" DROP COLUMN "created_at"');
    await queryRunner.query('ALTER TABLE "uat" DROP COLUMN "updated_at"');
    await queryRunner.query('ALTER TABLE "judete" DROP CONSTRAINT "judete_cod_siruta_key"');
    await queryRunner.query('ALTER TABLE "judete" DROP COLUMN "cod_siruta"');
    await queryRunner.query('ALTER TABLE "judete" DROP CONSTRAINT "judete_cod_auto_key"');
    await queryRunner.query('ALTER TABLE "judete" DROP COLUMN "cod_auto"');
    await queryRunner.query('ALTER TABLE "judete" DROP COLUMN "created_at"');
    await queryRunner.query('ALTER TABLE "judete" DROP COLUMN "updated_at"');
    await queryRunner.query('ALTER TABLE "users" ADD "firstName" character varying(100)');
    await queryRunner.query('ALTER TABLE "users" ADD "lastName" character varying(100)');
    await queryRunner.query('ALTER TABLE "users" ADD "isActive" boolean NOT NULL DEFAULT true');
    await queryRunner.query(
      'ALTER TABLE "tipuri_client" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "tipuri_client" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query('ALTER TABLE "localitati" ADD "judetId" character varying');
    await queryRunner.query('ALTER TABLE "localitati" ADD "codSiruta" character varying(10)');
    await queryRunner.query(
      'ALTER TABLE "localitati" ADD CONSTRAINT "UQ_16cbe45135b5d71c4fa76cfe91c" UNIQUE ("codSiruta")',
    );
    await queryRunner.query(
      'ALTER TABLE "localitati" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "localitati" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query('ALTER TABLE "uat" ADD "judetId" character varying');
    await queryRunner.query('ALTER TABLE "uat" ADD "codSiruta" character varying(10)');
    await queryRunner.query(
      'ALTER TABLE "uat" ADD CONSTRAINT "UQ_77275b17492312fceb2b5bdbf37" UNIQUE ("codSiruta")',
    );
    await queryRunner.query('ALTER TABLE "uat" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()');
    await queryRunner.query('ALTER TABLE "uat" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()');
    await queryRunner.query('ALTER TABLE "judete" ADD "codSiruta" character varying(10)');
    await queryRunner.query(
      'ALTER TABLE "judete" ADD CONSTRAINT "UQ_300a9766ac3a30c1d6025e4e69a" UNIQUE ("codSiruta")',
    );
    await queryRunner.query('ALTER TABLE "judete" ADD "codAuto" character varying(2)');
    await queryRunner.query(
      'ALTER TABLE "judete" ADD CONSTRAINT "UQ_d6b94ecbe6de1e30c4fd6218399" UNIQUE ("codAuto")',
    );
    await queryRunner.query(
      'ALTER TABLE "judete" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "judete" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "role"');
    await queryRunner.query(
      "CREATE TYPE \"public\".\"users_role_enum\" AS ENUM('admin', 'user', 'operator')",
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT \'user\'',
    );
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "status"');
    await queryRunner.query(
      "CREATE TYPE \"public\".\"users_status_enum\" AS ENUM('active', 'inactive', 'suspended', 'pending')",
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD "status" "public"."users_status_enum" NOT NULL DEFAULT \'active\'',
    );
    await queryRunner.query(
      'ALTER TABLE "profiles" ADD CONSTRAINT "FK_315ecd98bd1a42dcf2ec4e2e985" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "localitati" ADD CONSTRAINT "FK_0fb934dc67d7ea3c202897521f8" FOREIGN KEY ("judet_id") REFERENCES "judete"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "predictii_cantitati" ADD CONSTRAINT "FK_b774d8658d611c49c004b69483b" FOREIGN KEY ("uat_id") REFERENCES "uat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "predictii_cantitati" ADD CONSTRAINT "FK_ccfb8acd84cfd75673124afb8f1" FOREIGN KEY ("client_id") REFERENCES "clienti"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "predictii_cantitati" ADD CONSTRAINT "FK_30312b9537e8dfbe26e8bf23f88" FOREIGN KEY ("punct_colectare_id") REFERENCES "puncte_colectare"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "predictii_cantitati" ADD CONSTRAINT "FK_9e4db1ec8a64312c798df8356aa" FOREIGN KEY ("categorie_id") REFERENCES "categorii_deseuri"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "date_istorice" ADD CONSTRAINT "FK_a66b8c0149b5fc0b180013b92ee" FOREIGN KEY ("uat_id") REFERENCES "uat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "date_istorice" ADD CONSTRAINT "FK_21b9c97470c3bad55100ef5fdc3" FOREIGN KEY ("categorie_id") REFERENCES "categorii_deseuri"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "uat" ADD CONSTRAINT "FK_650d93fdaf2d417890ba11dc42a" FOREIGN KEY ("judet_id") REFERENCES "judete"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "servicii_contractate" ADD CONSTRAINT "FK_c21de6ebfc3fc10091be81fd955" FOREIGN KEY ("contract_id") REFERENCES "contracte"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "servicii_contractate" ADD CONSTRAINT "FK_9ee2a734a35ac33509c644b01e1" FOREIGN KEY ("serviciu_id") REFERENCES "servicii"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "contracte" ADD CONSTRAINT "FK_e75db9ed747cec234d72d97763e" FOREIGN KEY ("client_id") REFERENCES "clienti"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "clienti" ADD CONSTRAINT "FK_ab47380c0fa72c2fa53c82f2c0b" FOREIGN KEY ("tip_client_id") REFERENCES "tipuri_client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "clienti" ADD CONSTRAINT "FK_25e9ad92acfb44c89141cab32e7" FOREIGN KEY ("judet_id") REFERENCES "judete"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "clienti" ADD CONSTRAINT "FK_84188214e6d40036af506797cb5" FOREIGN KEY ("localitate_id") REFERENCES "localitati"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "puncte_colectare" ADD CONSTRAINT "FK_ddb823ccb94eeb30a656fdde43c" FOREIGN KEY ("client_id") REFERENCES "clienti"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "puncte_colectare" ADD CONSTRAINT "FK_b981a687e4291f470ba5dcaaf56" FOREIGN KEY ("judet_id") REFERENCES "judete"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "puncte_colectare" ADD CONSTRAINT "FK_361f38a57df475ce204a85dfcb0" FOREIGN KEY ("localitate_id") REFERENCES "localitati"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "user_roles" ADD CONSTRAINT "FK_87b8888186ca9769c960e926870" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "user_roles" ADD CONSTRAINT "FK_b23c65e50a758245a33ee35fda1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_178199805b901ccd220ab7740ec" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_17022daf3f885f7d35423e9971e" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_17022daf3f885f7d35423e9971e"',
    );
    await queryRunner.query(
      'ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_178199805b901ccd220ab7740ec"',
    );
    await queryRunner.query(
      'ALTER TABLE "user_roles" DROP CONSTRAINT "FK_b23c65e50a758245a33ee35fda1"',
    );
    await queryRunner.query(
      'ALTER TABLE "user_roles" DROP CONSTRAINT "FK_87b8888186ca9769c960e926870"',
    );
    await queryRunner.query(
      'ALTER TABLE "puncte_colectare" DROP CONSTRAINT "FK_361f38a57df475ce204a85dfcb0"',
    );
    await queryRunner.query(
      'ALTER TABLE "puncte_colectare" DROP CONSTRAINT "FK_b981a687e4291f470ba5dcaaf56"',
    );
    await queryRunner.query(
      'ALTER TABLE "puncte_colectare" DROP CONSTRAINT "FK_ddb823ccb94eeb30a656fdde43c"',
    );
    await queryRunner.query(
      'ALTER TABLE "clienti" DROP CONSTRAINT "FK_84188214e6d40036af506797cb5"',
    );
    await queryRunner.query(
      'ALTER TABLE "clienti" DROP CONSTRAINT "FK_25e9ad92acfb44c89141cab32e7"',
    );
    await queryRunner.query(
      'ALTER TABLE "clienti" DROP CONSTRAINT "FK_ab47380c0fa72c2fa53c82f2c0b"',
    );
    await queryRunner.query(
      'ALTER TABLE "contracte" DROP CONSTRAINT "FK_e75db9ed747cec234d72d97763e"',
    );
    await queryRunner.query(
      'ALTER TABLE "servicii_contractate" DROP CONSTRAINT "FK_9ee2a734a35ac33509c644b01e1"',
    );
    await queryRunner.query(
      'ALTER TABLE "servicii_contractate" DROP CONSTRAINT "FK_c21de6ebfc3fc10091be81fd955"',
    );
    await queryRunner.query('ALTER TABLE "uat" DROP CONSTRAINT "FK_650d93fdaf2d417890ba11dc42a"');
    await queryRunner.query(
      'ALTER TABLE "date_istorice" DROP CONSTRAINT "FK_21b9c97470c3bad55100ef5fdc3"',
    );
    await queryRunner.query(
      'ALTER TABLE "date_istorice" DROP CONSTRAINT "FK_a66b8c0149b5fc0b180013b92ee"',
    );
    await queryRunner.query(
      'ALTER TABLE "predictii_cantitati" DROP CONSTRAINT "FK_9e4db1ec8a64312c798df8356aa"',
    );
    await queryRunner.query(
      'ALTER TABLE "predictii_cantitati" DROP CONSTRAINT "FK_30312b9537e8dfbe26e8bf23f88"',
    );
    await queryRunner.query(
      'ALTER TABLE "predictii_cantitati" DROP CONSTRAINT "FK_ccfb8acd84cfd75673124afb8f1"',
    );
    await queryRunner.query(
      'ALTER TABLE "predictii_cantitati" DROP CONSTRAINT "FK_b774d8658d611c49c004b69483b"',
    );
    await queryRunner.query(
      'ALTER TABLE "localitati" DROP CONSTRAINT "FK_0fb934dc67d7ea3c202897521f8"',
    );
    await queryRunner.query(
      'ALTER TABLE "profiles" DROP CONSTRAINT "FK_315ecd98bd1a42dcf2ec4e2e985"',
    );
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "status"');
    await queryRunner.query('DROP TYPE "public"."users_status_enum"');
    await queryRunner.query(
      'ALTER TABLE "users" ADD "status" character varying(20) NOT NULL DEFAULT \'active\'',
    );
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "role"');
    await queryRunner.query('DROP TYPE "public"."users_role_enum"');
    await queryRunner.query(
      'ALTER TABLE "users" ADD "role" character varying(20) NOT NULL DEFAULT \'user\'',
    );
    await queryRunner.query('ALTER TABLE "judete" DROP COLUMN "updatedAt"');
    await queryRunner.query('ALTER TABLE "judete" DROP COLUMN "createdAt"');
    await queryRunner.query(
      'ALTER TABLE "judete" DROP CONSTRAINT "UQ_d6b94ecbe6de1e30c4fd6218399"',
    );
    await queryRunner.query('ALTER TABLE "judete" DROP COLUMN "codAuto"');
    await queryRunner.query(
      'ALTER TABLE "judete" DROP CONSTRAINT "UQ_300a9766ac3a30c1d6025e4e69a"',
    );
    await queryRunner.query('ALTER TABLE "judete" DROP COLUMN "codSiruta"');
    await queryRunner.query('ALTER TABLE "uat" DROP COLUMN "updatedAt"');
    await queryRunner.query('ALTER TABLE "uat" DROP COLUMN "createdAt"');
    await queryRunner.query('ALTER TABLE "uat" DROP CONSTRAINT "UQ_77275b17492312fceb2b5bdbf37"');
    await queryRunner.query('ALTER TABLE "uat" DROP COLUMN "codSiruta"');
    await queryRunner.query('ALTER TABLE "uat" DROP COLUMN "judetId"');
    await queryRunner.query('ALTER TABLE "localitati" DROP COLUMN "updatedAt"');
    await queryRunner.query('ALTER TABLE "localitati" DROP COLUMN "createdAt"');
    await queryRunner.query(
      'ALTER TABLE "localitati" DROP CONSTRAINT "UQ_16cbe45135b5d71c4fa76cfe91c"',
    );
    await queryRunner.query('ALTER TABLE "localitati" DROP COLUMN "codSiruta"');
    await queryRunner.query('ALTER TABLE "localitati" DROP COLUMN "judetId"');
    await queryRunner.query('ALTER TABLE "tipuri_client" DROP COLUMN "updatedAt"');
    await queryRunner.query('ALTER TABLE "tipuri_client" DROP COLUMN "createdAt"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "isActive"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "lastName"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "firstName"');
    await queryRunner.query(
      'ALTER TABLE "judete" ADD "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "judete" ADD "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP',
    );
    await queryRunner.query('ALTER TABLE "judete" ADD "cod_auto" character varying(2)');
    await queryRunner.query(
      'ALTER TABLE "judete" ADD CONSTRAINT "judete_cod_auto_key" UNIQUE ("cod_auto")',
    );
    await queryRunner.query('ALTER TABLE "judete" ADD "cod_siruta" character varying(10)');
    await queryRunner.query(
      'ALTER TABLE "judete" ADD CONSTRAINT "judete_cod_siruta_key" UNIQUE ("cod_siruta")',
    );
    await queryRunner.query(
      'ALTER TABLE "uat" ADD "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "uat" ADD "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP',
    );
    await queryRunner.query('ALTER TABLE "uat" ADD "cod_siruta" character varying(10)');
    await queryRunner.query(
      'ALTER TABLE "uat" ADD CONSTRAINT "uat_cod_siruta_key" UNIQUE ("cod_siruta")',
    );
    await queryRunner.query(
      'ALTER TABLE "localitati" ADD "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "localitati" ADD "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP',
    );
    await queryRunner.query('ALTER TABLE "localitati" ADD "cod_siruta" character varying(10)');
    await queryRunner.query(
      'ALTER TABLE "localitati" ADD CONSTRAINT "localitati_cod_siruta_key" UNIQUE ("cod_siruta")',
    );
    await queryRunner.query(
      'ALTER TABLE "tipuri_client" ADD "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "tipuri_client" ADD "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP',
    );
    await queryRunner.query('DROP INDEX "public"."IDX_17022daf3f885f7d35423e9971"');
    await queryRunner.query('DROP INDEX "public"."IDX_178199805b901ccd220ab7740e"');
    await queryRunner.query('DROP TABLE "role_permissions"');
    await queryRunner.query('DROP INDEX "public"."IDX_b23c65e50a758245a33ee35fda"');
    await queryRunner.query('DROP INDEX "public"."IDX_87b8888186ca9769c960e92687"');
    await queryRunner.query('DROP TABLE "user_roles"');
    await queryRunner.query('DROP TABLE "puncte_colectare"');
    await queryRunner.query('DROP TABLE "clienti"');
    await queryRunner.query('DROP TABLE "contracte"');
    await queryRunner.query('DROP TABLE "servicii_contractate"');
    await queryRunner.query('DROP TABLE "servicii"');
    await queryRunner.query('DROP TABLE "date_istorice"');
    await queryRunner.query('DROP TABLE "categorii_deseuri"');
    await queryRunner.query('DROP TABLE "predictii_cantitati"');
    await queryRunner.query('DROP TABLE "profiles"');
    await queryRunner.query('DROP TABLE "roles"');
    await queryRunner.query('DROP TABLE "permissions"');
    await queryRunner.query(
      'ALTER TABLE "uat" ADD CONSTRAINT "uat_judet_id_fkey" FOREIGN KEY ("judet_id") REFERENCES "judete"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "localitati" ADD CONSTRAINT "localitati_judet_id_fkey" FOREIGN KEY ("judet_id") REFERENCES "judete"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }
}
