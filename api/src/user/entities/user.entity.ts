import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  Unique,
  ManyToOne,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { Event } from '../../event/entities/event.entity';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['name', 'email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  private password: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Role)
  @JoinColumn()
  role: Role;

  @OneToMany(() => Event, (event) => event.user)
  events: Event[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    //const isMatch = await bcrypt.compare(password, hash);
    const saltOrRounds = 10;
    this.password = await bcrypt.hash(this.password, saltOrRounds);
  }

  public setPassword(password: string) {
    this.password = password;
    if (this.password) {
      this.hashPassword();
    }
  }

  public getPassword(): string {
    return this.password;
  }

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.setPassword(password);
  }
}
