import { Injectable } from '@nestjs/common';
import { CreateTypeActionDto } from './dto/create-type-action.dto';
import { UpdateTypeActionDto } from './dto/update-type-action.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeAction } from './entities/type-action.entity';
import { Repository } from 'typeorm';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class TypeActionService {
  constructor(
    @InjectRepository(TypeAction)
    private typeActionRepository: Repository<TypeAction>,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setContext('TypeActionService');
  }
  create(createTypeActionDto: CreateTypeActionDto): Promise<TypeAction> {
    this.loggerService.log('Create typeAction');
    const typeAction = this.typeActionRepository.create(createTypeActionDto);
    return this.typeActionRepository.save(typeAction);
  }

  async findAll() {
    const actions = await this.typeActionRepository.find();
    return {
      actions: actions.map((action) => {
        return {
          id: action.id,
          name: action.name,
        };
      }),
    };
  }

  findOne(id: number): Promise<TypeAction> {
    return this.getTypeAction(id);
  }

  async update(id: number, updateTypeActionDto: UpdateTypeActionDto) {
    const typeAction = await this.getTypeAction(id);
    Object.assign(typeAction, updateTypeActionDto);
    this.loggerService.log('TypeAction updated');
    return this.typeActionRepository.save(typeAction);
  }

  async remove(id: number) {
    const typeAction = await this.getTypeAction(id);
    await this.typeActionRepository.delete(typeAction.id);
    this.loggerService.log('TypeAction deleted');
    return { message: 'TypeAction deleted' };
  }

  private async getTypeAction(id: number): Promise<TypeAction> {
    const typeAction = await this.typeActionRepository.findOneBy({ id });
    if (!typeAction) {
      throw new Error('TypeAction not found');
    }
    return typeAction;
  }
}
