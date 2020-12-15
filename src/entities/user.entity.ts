import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Traveler } from './traveler.entity';

@Entity('USER')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: string;

  @Column({ name: 'HASH' })
  hash: string;

  @Column({ name: 'IS_ACTIVE', default: false })
  isActive: boolean;

  /** user system has a voyager */
  @OneToOne(() => User, (user) => user.traveler)
  traveler: Traveler;
}
