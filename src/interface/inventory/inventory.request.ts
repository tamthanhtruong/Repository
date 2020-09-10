import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { IdUserExist } from '../../validators/user.validator';
import { IdInventoryExist } from '../../validators/inventory.validator';

export class InventoryCreateRequest {
  @IsNumber()
  @IsNotEmpty()
  invoiceNumber: number;

  @IsString()
  @IsNotEmpty()
  note: string;

  @Validate(IdUserExist)
  createdUserId: string;

  @IsString()
  @IsNotEmpty()
  status:  string;
}
export class InventoryGetSingleRequest {
  @Validate(IdInventoryExist)
  id: string;
}

export class InventoryUpdateRequest {
  @IsNumber()
  @IsNotEmpty()
  invoiceNumber: number;

  @IsString()
  @IsNotEmpty()
  note: string;

  @Validate(IdUserExist)
  createdUserId: string;

  @IsString()
  @IsNotEmpty()
  status:  string;
}

export class InventoryDeleteRequest {
  @Validate(IdInventoryExist)
  id: string;
}
