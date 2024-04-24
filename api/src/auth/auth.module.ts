import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { LoggerService } from '../logger/logger.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import {RoleService} from "../role/role.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '43200s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LoggerService, RoleService],
  exports: [AuthService],
})
export class AuthModule {}
