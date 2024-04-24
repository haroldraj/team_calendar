import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post(':userId')
  create(
    @Param('userId') userId: number,
    @Body() createEventDto: CreateEventDto,
  ) {
    createEventDto.userId = userId;
    return this.eventService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':userId')
  findByUserId(@Param('userId') userId: string) {
    return this.eventService.findByUserId(+userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, UpdateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
