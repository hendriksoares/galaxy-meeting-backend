/* eslint-disable */
import { Galaxy, Planet } from '@entities';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class populateDatabase1608112577902 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      const galaxyRepository = queryRunner.connection.getRepository(Galaxy);
      const planetRepository = queryRunner.connection.getRepository(Planet);

      const inputsGalaxy = [
        galaxyRepository.create({
          name: 'andromeda',
          order: 0,
        }),
        galaxyRepository.create({
          name: 'centauros',
          order: 1,
        }),
        galaxyRepository.create({
          name: 'via lactea',
          order: 2,
        }),
      ];
      const galaxies = await queryRunner.manager.save(inputsGalaxy);

      const inputPlanets = [
        planetRepository.create({
          name: 'andromeda a',
          galaxyId: galaxies[0].id,
        }),
        planetRepository.create({
          name: 'andromeda b',
          galaxyId: galaxies[0].id,
        }),
        planetRepository.create({
          name: 'andromeda c',
          galaxyId: galaxies[0].id,
        }),
        planetRepository.create({
          name: 'centaurus a',
          galaxyId: galaxies[1].id,
        }),
        planetRepository.create({
          name: 'centaurus b',
          galaxyId: galaxies[2].id,
        }),
        planetRepository.create({
          name: 'centaurus c',
          galaxyId: galaxies[1].id,
        }),
        planetRepository.create({
          name: 'venus',
          galaxyId: galaxies[2].id,
        }),
        planetRepository.create({
          name: 'terra',
          galaxyId: galaxies[2].id,
        }),
        planetRepository.create({
          name: 'marte',
          galaxyId: galaxies[2].id,
        }),
      ];
      await queryRunner.manager.save(inputPlanets);

    } catch (err) {
      await queryRunner.rollbackTransaction();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
