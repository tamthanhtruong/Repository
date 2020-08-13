import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@Injectable()
@ValidatorConstraint({async: true })
export class IdInventoryExist implements ValidatorConstraintInterface {

  // for async validations you must return a Promise<boolean> here
  async validate(id: string): Promise<boolean> {
    return id.length == 24;
  }

  defaultMessage() {
    // here you can provide default error message if validation failed
    return '($property): ($value) is not exist!';
  }
}
