import { Injectable } from '@nestjs/common';
import { isEmpty, isMongoId, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ExportService } from '../core/export/export.service';

@Injectable()
@ValidatorConstraint({async: true })
export class IdExportExist implements ValidatorConstraintInterface {

  constructor(private readonly exportService: ExportService) {}

  async validate(id: string): Promise<boolean> {
    if (isEmpty(id)) return false;
    if (!isMongoId(id)) return false;
    return await this.exportService.checkExist(id);
  }

  defaultMessage() {
    return '($property): ($value) is not exist!';
  }
}
