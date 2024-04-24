import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsEndDateAfterStartDate implements ValidatorConstraintInterface {
  validate(end: Date, args: ValidationArguments) {
    const item = args.object as CreateEventDto;
    const endDate = new Date(end);
    const startDate = new Date(item.start);
    if (endDate instanceof Date && startDate instanceof Date) {
      return endDate.getTime() > startDate.getTime();
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return 'End date must be after start date';
  }
}

export function IsEndDateAfterStartDateValidation(
  validationOptions?: ValidationOptions,
) {
  return function (object: NonNullable<any>, propertyName: string) {
    registerDecorator({
      name: 'IsEndDateAfterStartDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsEndDateAfterStartDate,
    });
  };
}

export class CreateEventDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Date is required' })
  start: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'Date is required' })
  @IsEndDateAfterStartDateValidation({})
  end: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  //@ApiProperty()
  //@IsNotEmpty({ message: 'User is required' })
  userId: number;

  @ApiProperty()
  title: string;

 // @ApiProperty()
  //@IsNotEmpty({ message: 'Type is required' })
  typeId: number;
}
