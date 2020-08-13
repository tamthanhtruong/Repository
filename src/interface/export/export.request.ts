import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { IdUserExist } from '../../validators/user.validator';

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
  stockKeeperUserId: string;
  @IsNumber()
  @IsNotEmpty()
  stockConfirmedDate: number;
  @IsString()
  @IsNotEmpty()
  status: string;
}

export class ExportGetSingleRequest {
  @IsString()
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
  stockKeeperUserId: string;
  @IsNumber()
  @IsNotEmpty()
  stockConfirmedDate: number;
  @IsString()
  @IsNotEmpty()
  status: string;
}

export class ExportDeleteRequest {
  @IsString()
  id: string;
}
