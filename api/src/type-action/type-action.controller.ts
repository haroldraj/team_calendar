import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TypeActionService } from './type-action.service';
import { CreateTypeActionDto } from './dto/create-type-action.dto';
import { UpdateTypeActionDto } from './dto/update-type-action.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('type-action')
@Controller('type-action')
export class TypeActionController {
  constructor(private readonly typeActionService: TypeActionService) {}

  @Post()
  create(@Body() createTypeActionDto: CreateTypeActionDto) {
    return this.typeActionService.create(createTypeActionDto);
  }

  @Get()
  findAll() {
    return this.typeActionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeActionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTypeActionDto: UpdateTypeActionDto,
  ) {
    return this.typeActionService.update(+id, updateTypeActionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeActionService.remove(+id);
  }
}
