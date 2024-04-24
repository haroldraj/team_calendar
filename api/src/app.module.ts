import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { RoleModule } from './role/role.module';
import { TypeActionModule } from './type-action/type-action.module';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Role } from './role/entities/role.entity';
import { Event } from './event/entities/event.entity';
import { TypeAction } from './type-action/entities/type-action.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    UserModule,
    EventModule,
    RoleModule,
    TypeActionModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      //host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'team_calendar',
      entities: [User, Role, Event, TypeAction],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
