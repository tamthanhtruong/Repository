import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { IdRoleExist } from '../../validators/role.validator';
import { IdUserExist } from '../../validators/user.validator';

export class UserCreateRequest {

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
  @Validate(IdUserExist)
  id: string;
}

export class UserUpdateRequest {

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
  @Validate(IdUserExist)
  id: string;
}
