import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @ApiProperty()
  @IsStrongPassword({}, { message: 'Password is too weak' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Role is required' })
  roleId: number;
}
