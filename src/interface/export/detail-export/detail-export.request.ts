import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { IdProductExist } from '../../../validators/product.validator';
import { IdUnitProductExist } from '../../../validators/unit-product.validator';
import { IdExportExist } from '../../../validators/export.validator';

export class DetailExportCreateRequest {
  @IsString()
  @IsNotEmpty()
  @Validate(IdExportExist)
  exportId: string;
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

export class DetailExportGetSingleRequest {
  @IsString()
  id: string;
}

export class DetailExportDeleteRequest {
  @IsString()
  id: string;
}

export class DetailExportGetDetailRequest {
  @IsString()
  id: string;
}
