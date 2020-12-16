import { Galaxy } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GalaxyService {
  constructor(
    @InjectRepository(Galaxy)
    public readonly galaxyRepository: Repository<Galaxy>,
  ) {}
  /**
   * a method to return all galaxies with your planets anda travelers
   */
  async getAll(): Promise<Galaxy[]> {
    const galaxies = this.galaxyRepository.find({
      relations: ['planets', 'planets.travelers'],
    });
    return galaxies;
  }
}
