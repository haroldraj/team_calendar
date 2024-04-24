import { Module } from '@nestjs/common';
import { TypeActionService } from './type-action.service';
import { TypeActionController } from './type-action.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService } from '../logger/logger.service';
import { TypeAction } from './entities/type-action.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeAction])],
  controllers: [TypeActionController],
  providers: [TypeActionService, LoggerService],
})
export class TypeActionModule {}
