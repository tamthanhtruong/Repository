import { Injectable } from '@nestjs/common';
import { isEmpty, isMongoId, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { DetailInventoryService } from '../core/inventory/detail-inventory/detail-inventory.service';

@Injectable()
@ValidatorConstraint({async: true })
export class IdDetailInventoryExist implements ValidatorConstraintInterface {

  constructor(private readonly detailInventoryService: DetailInventoryService) {}

  async validate(id: string): Promise<boolean> {
    if (isEmpty(id)) return false;
    if (!isMongoId(id)) return false;
    return await this.detailInventoryService.checkExist(id);
  }

  defaultMessage() {
    return '($property): ($value) is not exist!';
  }
}
