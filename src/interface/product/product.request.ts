import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { IdCategoryExist } from '../../validators/category.validator';
import { IdUnitProductExist } from '../../validators/unit-product.validator';

export class ProductCreateRequest {
  @IsString()
  @IsNotEmpty()
  @Validate(IdCategoryExist)
  categoryId: string;
  @IsString()
  @IsNotEmpty()
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
  @IsString()
  id: string;
}

export class ProductUpdateRequest {
  @IsString()
  @IsNotEmpty()
  categoryId: string;
  @IsString()
  @IsNotEmpty()
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
  @IsString()
  id: string;
}
