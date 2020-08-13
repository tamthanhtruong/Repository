import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { IdUserExist } from '../../validators/user.validator';

export class InventoryCreateRequest {
  @IsNumber()
  @IsNotEmpty()
  invoiceNumber: number;
  @IsString()
  @IsNotEmpty()
  note: string;
  @IsString()
  @IsNotEmpty()
  @Validate(IdUserExist)
  createdUserId: string;
  @IsString()
  @IsNotEmpty()
  status:  string;
}
export class InventoryGetSingleRequest {
  @IsString()
  id: string;
}

export class InventoryUpdateRequest {
  @IsNumber()
  @IsNotEmpty()
  invoiceNumber: number;
  @IsString()
  @IsNotEmpty()
  note: string;
  @IsString()
  @IsNotEmpty()
  @Validate(IdUserExist)
  createdUserId: string;
  @IsString()
  @IsNotEmpty()
  status:  string;
}

export class InventoryDeleteRequest {
  @IsString()
  id: string;
}
