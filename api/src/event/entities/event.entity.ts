import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeAction } from '../../type-action/entities/type-action.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @Column()
  description: string;

  @Column()
  title: string;

  @ManyToOne(() => TypeAction)
  @JoinColumn()
  type: TypeAction;

  @ManyToOne(() => User, (user) => user.events)
  user: User;
}
