import { Injectable } from '@nestjs/common';
import { isEmpty, isMongoId, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { CategoryService } from '../core/product/category/category.service';

@Injectable()
@ValidatorConstraint({async: true })
export class IdCategoryExist implements ValidatorConstraintInterface {

  constructor(private readonly categoryService: CategoryService) {}

  // for async validations you must return a Promise<boolean> here
  async validate(id: string): Promise<boolean> {
    if (isEmpty(id)) return false;
    if (!isMongoId(id)) return false;
    return await this.categoryService.checkExist(id);
  }

  defaultMessage() {
    // here you can provide default error message if validation failed
    return '($property): ($value) is not exist!';
  }
}
