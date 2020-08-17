import { Injectable } from '@nestjs/common';
import { isEmpty, isMongoId, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { InventoryService } from '../core/inventory/inventory.service';

@Injectable()
@ValidatorConstraint({async: true })
export class IdInventoryExist implements ValidatorConstraintInterface {

  constructor(private readonly inventoryService: InventoryService) {}

  // for async validations you must return a Promise<boolean> here
  async validate(id: string): Promise<boolean> {
    if (isEmpty(id)) return false;
    if (!isMongoId(id)) return false;
    return await this.inventoryService.checkExist(id);
  }

  defaultMessage() {
    // here you can provide default error message if validation failed
    return '($property): ($value) is not exist!';
  }
}
