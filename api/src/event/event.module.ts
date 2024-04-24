import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { LoggerService } from '../logger/logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { User } from '../user/entities/user.entity';
import { TypeAction } from '../type-action/entities/type-action.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, User, TypeAction])],
  controllers: [EventController],
  providers: [EventService, LoggerService],
})
export class EventModule {}
