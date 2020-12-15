import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTraveler1608073213145 implements MigrationInterface {
  name = 'addTraveler1608073213145';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "USER" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "HASH" character varying NOT NULL, "IS_ACTIVE" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_7bd88703fe65993187a84f8e5ce" PRIMARY KEY ("ID"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "TRAVELER" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "NICKNAME" character varying NOT NULL, "EMAIL" character varying NOT NULL, "AVATAR" character varying NOT NULL, "USER_ID " uuid NOT NULL, CONSTRAINT "UQ_dadb70eb4b54d37707f4a5dbe20" UNIQUE ("EMAIL"), CONSTRAINT "REL_fa2ef19265b114f84da0953664" UNIQUE ("USER_ID "), CONSTRAINT "PK_c3e873f582db85ede0d0a4a927c" PRIMARY KEY ("ID"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "TRAVELER" ADD CONSTRAINT "FK_fa2ef19265b114f84da09536642" FOREIGN KEY ("USER_ID ") REFERENCES "USER"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "TRAVELER" DROP CONSTRAINT "FK_fa2ef19265b114f84da09536642"`,
    );
    await queryRunner.query(`DROP TABLE "TRAVELER"`);
    await queryRunner.query(`DROP TABLE "USER"`);
  }
}
