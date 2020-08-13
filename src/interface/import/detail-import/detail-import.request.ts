import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { IdUnitProductExist } from '../../../validators/unit-product.validator';
import { IdImportExist } from '../../../validators/import.validator';
import { IdProductExist } from '../../../validators/product.validator';

export class DetailImportCreateRequest {
  @IsString()
  @IsNotEmpty()
  @Validate(IdImportExist)
  importId: string;
  @IsString()
  @IsNotEmpty()
  @Validate(IdProductExist)
  productId: string;
  @IsString()
  @IsNotEmpty()
  @Validate(IdUnitProductExist)
  unitProductId: string;
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class DetailImportGetSingleRequest {
  @IsString()
  id: string;
}

export class DetailImportDeleteRequest {
  @IsString()
  id: string;
}

export class DetailImportGetDetailRequest {
  @IsString()
  id: string;
}
