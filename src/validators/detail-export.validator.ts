import { Injectable } from '@nestjs/common';
import { isEmpty, isMongoId, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { DetailExportService } from '../core/export/detail-export/detail-export.service';

@Injectable()
@ValidatorConstraint({async: true })
export class IdDetailExportExist implements ValidatorConstraintInterface {

  constructor(private readonly detailExportService: DetailExportService) {}

  async validate(id: string): Promise<boolean> {
    if (isEmpty(id)) return false;
    if (!isMongoId(id)) return false;
    return await this.detailExportService.checkExist(id);
  }

  defaultMessage() {
    return '($property): ($value) is not exist!';
  }
}
