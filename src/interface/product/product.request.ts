import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { IdCategoryExist } from '../../validators/category.validator';
import { IdUnitProductExist } from '../../validators/unit-product.validator';
import { IdProductExist } from '../../validators/product.validator';

export class ProductCreateRequest {

  @Validate(IdCategoryExist)
  categoryId: string;

  @Validate(IdUnitProductExist)
  unitProductId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumber()
  @IsNotEmpty()
  originPrice: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  information: string;

  @IsString()
  @IsNotEmpty()
  evaluation: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}

export class ProductGetSingleRequest {
  @Validate(IdProductExist)
  id: string;
}

export class ProductUpdateRequest {

  @Validate(IdCategoryExist)
  categoryId: string;

  @Validate(IdUnitProductExist)
  unitProductId: string;

  @IsNumber()
  @IsNotEmpty()
  originPrice: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  information: string;

  @IsString()
  @IsNotEmpty()
  evaluation: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}

export class ProductDeleteRequest {
  @Validate(IdProductExist)
  id: string;
}
