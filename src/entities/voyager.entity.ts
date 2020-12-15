import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('VOYAGER')
export class Voyager {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: number;
  @Column({ name: 'NICKNAME' })
  nickname: string;
  @Column({ name: 'EMAIL', unique: true })
  email: string;
  @Column({ name: 'AVATAR' })
  avatar: string;
}
