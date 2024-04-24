import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from '../logger/logger.service';
import { Role } from '../role/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setContext('UserService');
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const role = await this.getRole(createUserDto.roleId);
    const user = new User(
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
    );
    user.role = role;
    this.loggerService.log('User created');
    return this.userRepository.save(user);
  }
  async findAll() {
    const users = await this.userRepository.find({ relations: ['role'] });
    return {
      users: users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role.name,
        };
      }),
    };
  }

  async findOne(id: number): Promise<User> {
    return await this.getUser(id);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getUser(id);
    if (updateUserDto.roleId) {
      user.role = await this.getRole(updateUserDto.roleId);
    }
    Object.assign(user, updateUserDto);
    this.loggerService.log('User updated');
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<any> {
    const user = await this.getUser(id);
    await this.userRepository.delete(user.id);
    this.loggerService.log('User deleted');
    return { message: 'User deleted' };
  }

  private async getRole(roleId: number): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
    });
    if (!role) {
      throw new Error('Role not found');
    }
    return role;
  }

  private async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
