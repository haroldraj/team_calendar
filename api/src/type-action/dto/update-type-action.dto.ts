import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeActionDto } from './create-type-action.dto';

export class UpdateTypeActionDto extends PartialType(CreateTypeActionDto) {}
