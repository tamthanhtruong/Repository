import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { IdProductExist } from '../../../validators/product.validator';
import { IdUnitProductExist } from '../../../validators/unit-product.validator';
import { IdInventoryExist } from '../../../validators/inventory.validator';

export class DetailInventoryCreateRequest {
  @IsString()
  @IsNotEmpty()
  @Validate(IdInventoryExist)
  inventoryId: string;
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

export class DetailInventoryGetSingleRequest {
  @IsString()
  id: string;
}

export class DetailInventoryDeleteRequest {
  @IsString()
  id: string;
}

export class DetailInventoryGetDetailRequest {
  @IsString()
  id: string;
}
