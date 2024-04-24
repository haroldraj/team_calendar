import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTypeActionDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
}
