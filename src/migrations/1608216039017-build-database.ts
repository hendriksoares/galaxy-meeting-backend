import {MigrationInterface, QueryRunner} from "typeorm";

export class buildDatabase1608216039017 implements MigrationInterface {
    name = 'buildDatabase1608216039017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "GALAXY" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "NAME" character varying NOT NULL, "ORDER" integer NOT NULL, CONSTRAINT "UQ_86352bc6f5659875bdaff651b12" UNIQUE ("ORDER"), CONSTRAINT "PK_7326f1d867178f87518995cd53c" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE TABLE "PLANET" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "NAME" character varying NOT NULL, "GALAXY_ID " uuid NOT NULL, "CONFERENCE_LINK" character varying NOT NULL, CONSTRAINT "PK_f0a6d776845444a09aa393f47f8" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE TABLE "USER" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "HASH" character varying NOT NULL, "IS_ACTIVE" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_7bd88703fe65993187a84f8e5ce" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE TABLE "TRAVELER" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "NICKNAME" character varying NOT NULL, "EMAIL" character varying NOT NULL, "AVATAR" character varying NOT NULL, "USER_ID " uuid NOT NULL, "PLANET_ID " uuid, CONSTRAINT "UQ_dadb70eb4b54d37707f4a5dbe20" UNIQUE ("EMAIL"), CONSTRAINT "REL_fa2ef19265b114f84da0953664" UNIQUE ("USER_ID "), CONSTRAINT "PK_c3e873f582db85ede0d0a4a927c" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`ALTER TABLE "PLANET" ADD CONSTRAINT "FK_fa60fa6f50929fa2b3ea342d86c" FOREIGN KEY ("GALAXY_ID ") REFERENCES "GALAXY"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TRAVELER" ADD CONSTRAINT "FK_fa2ef19265b114f84da09536642" FOREIGN KEY ("USER_ID ") REFERENCES "USER"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TRAVELER" ADD CONSTRAINT "FK_0b604dabae5eccd35d73873128a" FOREIGN KEY ("PLANET_ID ") REFERENCES "PLANET"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TRAVELER" DROP CONSTRAINT "FK_0b604dabae5eccd35d73873128a"`);
        await queryRunner.query(`ALTER TABLE "TRAVELER" DROP CONSTRAINT "FK_fa2ef19265b114f84da09536642"`);
        await queryRunner.query(`ALTER TABLE "PLANET" DROP CONSTRAINT "FK_fa60fa6f50929fa2b3ea342d86c"`);
        await queryRunner.query(`DROP TABLE "TRAVELER"`);
        await queryRunner.query(`DROP TABLE "USER"`);
        await queryRunner.query(`DROP TABLE "PLANET"`);
        await queryRunner.query(`DROP TABLE "GALAXY"`);
    }

}
