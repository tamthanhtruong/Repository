import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { IdUserExist } from '../../validators/user.validator';

export class ImportCreateRequest {
  @IsString()
  @IsNotEmpty()
  shipper: string;
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
  @Validate(IdUserExist)
  accountantUserId: string;
  @IsNumber()
  @IsNotEmpty()
  accConfirmedDate: number;
  @IsString()
  @IsNotEmpty()
  @Validate(IdUserExist)
  stockkeeperUserId: string;
  @IsNumber()
  @IsNotEmpty()
  stockConfirmedDate: number;

  status?: string;
}

export class ImportGetSingleRequest {
  @IsString()
  id: string;
}

export class ImportUpdateRequest {
  @IsString()
  @IsNotEmpty()
  shipper: string;
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
  @Validate(IdUserExist)
  accountantUserId: string;
  @IsNumber()
  @IsNotEmpty()
  accConfirmedDate: number;
  @IsString()
  @IsNotEmpty()
  @Validate(IdUserExist)
  stockkeeperUserId: string;
  @IsNumber()
  @IsNotEmpty()
  stockConfirmedDate: number;
  @IsString()
  @IsNotEmpty()
  status: string;
}

export class ImportDeleteRequest {
  @IsString()
  id: string;
}
