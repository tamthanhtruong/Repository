import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { IdUserExist } from '../../validators/user.validator';
import { IdExportExist } from '../../validators/export.validator';

export class ExportCreateRequest {
  @IsString()
  @IsNotEmpty()
  receiver: string;

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

export class ExportGetSingleRequest {
  @Validate(IdExportExist)
  id: string;
}

export class ExportUpdateRequest {
  @IsString()
  @IsNotEmpty()
  receiver: string;

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

export class ExportDeleteRequest {
  @Validate(IdExportExist)
  id: string;
}
