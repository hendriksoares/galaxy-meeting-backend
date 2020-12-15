import { MigrationInterface, QueryRunner } from 'typeorm';

export class addVoyager1608064309818 implements MigrationInterface {
  name = 'addVoyager1608064309818';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "VOYAGER" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "NICKNAME" character varying NOT NULL, "EMAIL" character varying NOT NULL, "AVATAR" character varying NOT NULL, CONSTRAINT "UQ_aa46f5c862f6bcdf5f31b54c751" UNIQUE ("EMAIL"), CONSTRAINT "PK_1e9b93247bbcb7ca574fcbb51b1" PRIMARY KEY ("ID"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "VOYAGER"`);
  }
}
