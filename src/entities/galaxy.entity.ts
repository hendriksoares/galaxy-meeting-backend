import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Planet } from './planet.entity';

@Entity('GALAXY')
export class Galaxy {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: string;

  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'ORDER', unique: true })
  order: number;

  /** a galaxa has many planets */
  @OneToMany(() => Planet, (planet) => planet.galaxy)
  planets: Planet[];
}
