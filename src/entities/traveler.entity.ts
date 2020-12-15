import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('TRAVELER')
export class Traveler {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: number;
  @Column({ name: 'NICKNAME' })
  nickname: string;
  @Column({ name: 'EMAIL', unique: true })
  email: string;
  @Column({ name: 'AVATAR' })
  avatar: string;

  @Column({ name: 'USER_ID ' })
  userId: string;

  /** voyager has a user system */
  @OneToOne(() => User, (user) => user.traveler)
  @JoinColumn({ name: 'USER_ID ' })
  user: User;
}
