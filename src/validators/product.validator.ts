import { Injectable } from '@nestjs/common';
import { isEmpty, isMongoId, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ProductService } from '../core/product/product.service';

@Injectable()
@ValidatorConstraint({async: true })
export class IdProductExist implements ValidatorConstraintInterface {

  constructor(private readonly productService: ProductService) {}

  async validate(id: string): Promise<boolean> {
    if (isEmpty(id)) return false;
    if (!isMongoId(id)) return false;
    return await this.productService.checkExist(id);
  }

  defaultMessage() {
    return '($property): ($value) is not exist!';
  }
}
