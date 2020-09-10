import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { IdUserExist } from '../../validators/user.validator';
import { IdImportExist } from '../../validators/import.validator';

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

  @Validate(IdUserExist)
  createdUserId: string;

  @Validate(IdUserExist)
  accountantUserId: string;

  @IsNumber()
  @IsNotEmpty()
  accConfirmedDate: number;

  @Validate(IdUserExist)
  stockKeeperUserId: string;

  @IsNumber()
  @IsNotEmpty()
  stockConfirmedDate: number;

  status?: string;
}

export class ImportGetSingleRequest {
  @Validate(IdImportExist)
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

  @Validate(IdUserExist)
  createdUserId: string;

  @Validate(IdUserExist)
  accountantUserId: string;

  @IsNumber()
  @IsNotEmpty()
  accConfirmedDate: number;

  @Validate(IdUserExist)
  stockKeeperUserId: string;

  @IsNumber()
  @IsNotEmpty()
  stockConfirmedDate: number;

  @IsString()
  @IsNotEmpty()
  status: string;
}

export class ImportDeleteRequest {
  @Validate(IdImportExist)
  id: string;
}
