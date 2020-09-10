import { Injectable } from '@nestjs/common';
import { isEmpty, isMongoId, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { DetailImportService } from '../core/import/detail-import/detail-import.service';

@Injectable()
@ValidatorConstraint({async: true })
export class IdDetailImportExist implements ValidatorConstraintInterface {

  constructor(private readonly detailImportService: DetailImportService) {}

  async validate(id: string): Promise<boolean> {
    if (isEmpty(id)) return false;
    if (!isMongoId(id)) return false;
    return await this.detailImportService.checkExist(id);
  }

  defaultMessage() {
    return '($property): ($value) is not exist!';
  }
}
