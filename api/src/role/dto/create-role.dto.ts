import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
}
