import { MigrationInterface, QueryRunner } from 'typeorm';

export class addGalaxyPlanet1608079284212 implements MigrationInterface {
  name = 'addGalaxyPlanet1608079284212';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "PLANET" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "NAME" character varying NOT NULL, "GALAXY_ID " uuid NOT NULL, CONSTRAINT "PK_f0a6d776845444a09aa393f47f8" PRIMARY KEY ("ID"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "GALAXY" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "NAME" character varying NOT NULL, "ORDER" integer NOT NULL, CONSTRAINT "UQ_86352bc6f5659875bdaff651b12" UNIQUE ("ORDER"), CONSTRAINT "PK_7326f1d867178f87518995cd53c" PRIMARY KEY ("ID"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "TRAVELER" ADD "PLANET_ID " uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "TRAVELER" ADD CONSTRAINT "FK_0b604dabae5eccd35d73873128a" FOREIGN KEY ("PLANET_ID ") REFERENCES "PLANET"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "PLANET" ADD CONSTRAINT "FK_fa60fa6f50929fa2b3ea342d86c" FOREIGN KEY ("GALAXY_ID ") REFERENCES "GALAXY"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "PLANET" DROP CONSTRAINT "FK_fa60fa6f50929fa2b3ea342d86c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TRAVELER" DROP CONSTRAINT "FK_0b604dabae5eccd35d73873128a"`,
    );
    await queryRunner.query(`ALTER TABLE "TRAVELER" DROP COLUMN "PLANET_ID "`);
    await queryRunner.query(`DROP TABLE "GALAXY"`);
    await queryRunner.query(`DROP TABLE "PLANET"`);
  }
}
