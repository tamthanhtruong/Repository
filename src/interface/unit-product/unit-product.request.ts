import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { IdUnitProductExist } from '../../validators/unit-product.validator';

export class UnitProductCreateRequest {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UnitProductGetSingleRequest {
  @Validate(IdUnitProductExist)
  id: string;
}

export class UnitProductUpdateRequest {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UnitProductDeleteRequest {
  @Validate(IdUnitProductExist)
  id: string;
}
