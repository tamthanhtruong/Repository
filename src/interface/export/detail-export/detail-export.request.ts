import { IsNotEmpty, IsNumber, Validate } from 'class-validator';
import { IdProductExist } from '../../../validators/product.validator';
import { IdUnitProductExist } from '../../../validators/unit-product.validator';
import { IdExportExist } from '../../../validators/export.validator';
import { IdDetailExportExist } from '../../../validators/detail-export.validator';

export class DetailExportCreateRequest {

  @Validate(IdExportExist)
  exportId: string;

  @Validate(IdProductExist)
  productId: string;

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
  @Validate(IdDetailExportExist)
  id: string;
}

export class DetailExportDeleteRequest {
  @Validate(IdDetailExportExist)
  id: string;
}

export class DetailExportGetListExportRequest {
  @Validate(IdExportExist)
  id: string;
}
