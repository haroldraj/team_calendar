import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { LoggerService } from '../logger/logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User])],
  exports: [RoleService],
  controllers: [RoleController],
  providers: [RoleService, LoggerService],
})
export class RoleModule {}
