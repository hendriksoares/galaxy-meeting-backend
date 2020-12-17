import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Galaxy } from './galaxy.entity';
import { Traveler } from './traveler.entity';

@Entity('PLANET')
export class Planet {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: string;

  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'GALAXY_ID ' })
  galaxyId: string;

  @Column({ name: 'CONFERENCE_LINK' })
  conferenceLink: string;

  /** a planet has many travelers */
  @OneToMany(() => Traveler, (traveler) => traveler.planet)
  travelers: Traveler[];

  /** planet was in a galaxy */
  @ManyToOne(() => Galaxy, (galaxy) => galaxy.planets)
  @JoinColumn({ name: 'GALAXY_ID ' })
  galaxy: Galaxy;
}
