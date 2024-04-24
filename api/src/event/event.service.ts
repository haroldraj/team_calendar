import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerService } from '../logger/logger.service';
import { Event } from './entities/event.entity';
import { User } from '../user/entities/user.entity';
import { TypeAction } from '../type-action/entities/type-action.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(TypeAction)
    private typeActionRepository: Repository<TypeAction>,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setContext('EventService');
  }

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const user = await this.getUser(createEventDto.userId);
    const type = await this.getTypeAction(createEventDto.typeId);
    const event = this.eventRepository.create({
      ...createEventDto,
      user,
      type,
    });
    this.loggerService.log('Event created');
    return this.eventRepository.save(event);
  }

  async findAll() {
    const events = await this.eventRepository.find({
      relations: ['user', 'type'],
    });
    return {
      events: events.map((event) => {
        return {
          id: event.id,
          description: event.description,
          title: event.user.name,
          type: event.type.name,
          start: event.start,
          end: event.end,
        };
      }),
    };
  }

  findOne(id: number): Promise<Event> {
    return this.getEvent(id);
  }

  async update(id: number, updateActionDto: UpdateEventDto) {
    const action = await this.getEvent(id);
    if (updateActionDto.userId) {
      action.user = await this.getUser(updateActionDto.userId);
    }
    if (updateActionDto.typeId) {
      action.type = await this.getTypeAction(updateActionDto.typeId);
    }
    Object.assign(action, updateActionDto);
    this.loggerService.log('Event updated');
    return this.eventRepository.save(action);
  }

  async findByUserId(userId: number) {
    const user = await this.getUser(userId);

    const events = await this.eventRepository.find({
      where: { user },
      relations: ['type'],
    });
    return {
      events: events.map((event) => {
        return {
          id: event.id,
          description: event.description,
          title: event.title,
          start: event.start,
          end: event.end,
        };
      }),
    };
  }

  async remove(id: number) {
    const action = await this.getEvent(id);
    await this.eventRepository.delete(action.id);
    this.loggerService.log('Event deleted');
    return { message: 'Event deleted' };
  }

  private async getEvent(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: {
        id,
      },
      relations: ['user', 'type'],
    });
    if (!event) {
      throw new Error('Event not found');
    }
    return event;
  }

  private async getUser(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  private async getTypeAction(typeActionId: number): Promise<TypeAction> {
    const typeAction = await this.typeActionRepository.findOne({
      where: { id: typeActionId },
    });
    if (!typeAction) {
      throw new Error('TypeAction not found');
    }
    return typeAction;
  }
}
