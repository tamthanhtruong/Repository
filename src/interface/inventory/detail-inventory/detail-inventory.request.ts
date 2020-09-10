import { IsNotEmpty, IsNumber, Validate } from 'class-validator';
import { IdProductExist } from '../../../validators/product.validator';
import { IdUnitProductExist } from '../../../validators/unit-product.validator';
import { IdInventoryExist } from '../../../validators/inventory.validator';
import { IdDetailInventoryExist } from '../../../validators/detail-inventory.validator';

export class DetailInventoryCreateRequest {

  @Validate(IdInventoryExist)
  inventoryId: string;

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

export class DetailInventoryGetSingleRequest {
  @Validate(IdDetailInventoryExist)
  id: string;
}

export class DetailInventoryDeleteRequest {
  @Validate(IdDetailInventoryExist)
  id: string;
}

export class DetailInventoryGetListInventoryRequest {
  @Validate(IdInventoryExist)
  id: string;
}
