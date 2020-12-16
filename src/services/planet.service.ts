import { Planet, Traveler } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TravelerService } from '@services';

@Injectable()
export class PlanetService {
  constructor(
    @InjectRepository(Planet)
    private readonly planetRepository: Repository<Planet>,
    private readonly travelerService: TravelerService,
  ) {}
  /**
   * a method to planet conference join
   */
  async join(planetId: string, travelerId: string): Promise<Traveler> {
    const traveler = await this.travelerService.findOneById(travelerId);
    if (!traveler) {
      throw { code: 'TRAVELER_NOTFOUND' };
    }
    const planet = await this.findOneById(planetId);
    if (!planet) {
      throw { code: 'PLANET_NOTFOUND' };
    }
    /** upadate taveler planet */
    return this.travelerService.updatePlanet(traveler, planetId);
  }

  async findOneById(id: string): Promise<Planet> {
    return this.planetRepository.findOne({ id });
  }
}
