import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LoggerService } from '../logger/logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [UserController],
  providers: [UserService, LoggerService],
})
export class UserModule {}
