import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Planet } from './planet.entity';
import { User } from './user.entity';

@Entity('TRAVELER')
export class Traveler {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: string;
  @Column({ name: 'NICKNAME' })
  nickname: string;
  @Column({ name: 'EMAIL', unique: true })
  email: string;
  @Column({ name: 'AVATAR' })
  avatar: string;
  @Column({ name: 'USER_ID ' })
  userId: string;
  @Column({ name: 'PLANET_ID ', nullable: true })
  planetId?: string;

  /** traveler has a user system */
  @OneToOne(() => User, (user) => user.traveler)
  @JoinColumn({ name: 'USER_ID ' })
  user: User;

  /** traveler was in a planet */
  @ManyToOne(() => Planet, (planet) => planet.travelers)
  @JoinColumn({ name: 'PLANET_ID ' })
  planet: User;
}
