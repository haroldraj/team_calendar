import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Event } from '../../event/entities/event.entity';

@Entity()
@Unique(['name'])
export class TypeAction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Event, (event) => event.type)
  events: Event[];
}
