/* eslint-disable */
import { Galaxy, Planet, Traveler } from '@entities';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class populateDatabase9608112577902 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      const galaxyRepository = queryRunner.connection.getRepository(Galaxy);
      const planetRepository = queryRunner.connection.getRepository(Planet);
      const travelerRepository = queryRunner.connection.getRepository(Traveler);

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
          conferenceLink: 'https://www.google.com/search?&q=andromeda',
        }),
        planetRepository.create({
          name: 'andromeda b',
          galaxyId: galaxies[0].id,
          conferenceLink: 'https://www.google.com/search?&q=andromeda',
        }),
        planetRepository.create({
          name: 'andromeda c',
          galaxyId: galaxies[0].id,
          conferenceLink: 'https://www.google.com/search?&q=andromeda',
        }),
        planetRepository.create({
          name: 'centaurus a',
          galaxyId: galaxies[1].id,
          conferenceLink: 'https://www.google.com/search?&q=centaurus',
        }),
        planetRepository.create({
          name: 'centaurus b',
          galaxyId: galaxies[1].id,
          conferenceLink: 'https://www.google.com/search?&q=centaurus',
        }),
        planetRepository.create({
          name: 'centaurus c',
          galaxyId: galaxies[1].id,
          conferenceLink: 'https://www.google.com/search?&q=centaurus',
        }),
        planetRepository.create({
          name: 'venus',
          galaxyId: galaxies[2].id,
          conferenceLink: 'https://www.google.com/search?&q=via+lactea',
        }),
        planetRepository.create({
          name: 'terra',
          galaxyId: galaxies[2].id,
          conferenceLink: 'https://www.google.com/search?&q=via+lactea',
        }),
        planetRepository.create({
          name: 'marte',
          galaxyId: galaxies[2].id,
          conferenceLink: 'https://www.google.com/search?&q=via+lactea',
        }),
      ];
      await queryRunner.manager.save(inputPlanets);
    } catch (err) {
      await queryRunner.rollbackTransaction();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
