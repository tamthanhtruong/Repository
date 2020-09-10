import { Injectable } from '@nestjs/common';
import { isEmpty, isMongoId, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ImportService } from '../core/import/import.service';

@Injectable()
@ValidatorConstraint({async: true })
export class IdImportExist implements ValidatorConstraintInterface {

  constructor(private readonly importService: ImportService) {}

  async validate(id: string): Promise<boolean> {
    if (isEmpty(id)) return false;
    if (!isMongoId(id)) return false;
    return await this.importService.checkExist(id);
  }

  defaultMessage() {
    return '($property): ($value) is not exist!';
  }
}
