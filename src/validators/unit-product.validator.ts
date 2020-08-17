import { Injectable } from '@nestjs/common';
import { isEmpty, isMongoId, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UnitProductService } from '../core/unit-product/unit-product.service';

@Injectable()
@ValidatorConstraint({async: true })
export class IdUnitProductExist implements ValidatorConstraintInterface {

  constructor(private readonly unitProductService: UnitProductService) {}

  // for async validations you must return a Promise<boolean> here
  async validate(id: string): Promise<boolean> {
    if (isEmpty(id)) return false;
    if (!isMongoId(id)) return false;
    return await this.unitProductService.checkExist(id);
  }

  defaultMessage() {
    // here you can provide default error message if validation failed
    return '($property): ($value) is not exist!';
  }
}
