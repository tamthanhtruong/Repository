import { Injectable } from '@nestjs/common';
import { isEmpty, isMongoId, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { CategoryService } from '../core/product/category/category.service';

@Injectable()
@ValidatorConstraint({async: true })
export class IdCategoryExist implements ValidatorConstraintInterface {

  constructor(private readonly categoryService: CategoryService) {}

  async validate(id: string): Promise<boolean> {
    if (isEmpty(id)) return false;
    if (!isMongoId(id)) return false;
    return await this.categoryService.checkExist(id);
  }

  defaultMessage() {
    return '($property): ($value) is not exist!';
  }
}
