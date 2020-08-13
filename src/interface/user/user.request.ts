import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { IdRoleExist } from '../../validators/role.validator';

export class UserCreateRequest {
  @IsString()
  @IsNotEmpty()
  @Validate(IdRoleExist)
  roleId: string;
  @IsString()
  @IsNotEmpty()
  account: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  sex: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  dateOfBirth: string;
  @IsString()
  @IsNotEmpty()
  address: string;
  @IsString()
  @IsNotEmpty()
  phone: string;

  status?: string;
}

export class UserGetSingleRequest {
  @IsString()
  id: string;
}

export class UserUpdateRequest {
  @IsString()
  @IsNotEmpty()
  @Validate(IdRoleExist)
  roleId: string;
  @IsString()
  @IsNotEmpty()
  account: string;
  @IsString()
  @IsNotEmpty()
  password: string;

  name?: string;

  sex?: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  dateOfBirth?: string;

  @IsString()
  @IsNotEmpty()
  address: string;
  @IsString()
  @IsNotEmpty()
  phone: string;

  status?: string;
}

export class UserDeleteRequest {
  @IsString()
  id: string;
}
