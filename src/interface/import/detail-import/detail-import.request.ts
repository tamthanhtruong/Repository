import { IsNotEmpty, IsNumber, Validate } from 'class-validator';
import { IdUnitProductExist } from '../../../validators/unit-product.validator';
import { IdImportExist } from '../../../validators/import.validator';
import { IdProductExist } from '../../../validators/product.validator';
import { IdDetailImportExist } from '../../../validators/detail-import.validator';

export class DetailImportCreateRequest {

  @Validate(IdImportExist)
  importId: string;

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

export class DetailImportGetSingleRequest {
  @Validate(IdDetailImportExist)
  id: string;
}

export class DetailImportDeleteRequest {
  @Validate(IdDetailImportExist)
  id: string;
}

export class DetailImportGetListImportRequest {
  @Validate(IdImportExist)
  id: string;
}
