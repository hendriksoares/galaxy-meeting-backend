import { TravelerCreateDto } from '@dtos';
import { User, Traveler } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TravelerService {
  constructor(
    @InjectRepository(Traveler)
    public readonly travelerRepository: Repository<Traveler>,
    @InjectRepository(User)
    public readonly userRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string, user = false): Promise<Traveler> {
    return this.travelerRepository.findOne({
      where: { email },
      relations: user ? ['user'] : undefined,
    });
  }

  async findOneById(id: string, user = false): Promise<Traveler> {
    return this.travelerRepository.findOne({
      where: { id },
      relations: user ? ['user'] : undefined,
    });
  }

  async createOne(travelerCreate: TravelerCreateDto): Promise<Traveler> {
    /** create a user */
    const hash = await bcrypt.hash(travelerCreate.password, 10);
    const user = this.userRepository.create({ hash });

    const userCreated = await this.userRepository.save(user);

    /** create a traveler */
    const travaler = this.travelerRepository.create(travelerCreate);
    travaler.userId = userCreated.id;

    return this.travelerRepository.save(travaler);
  }
}
