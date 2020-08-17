import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { IdRoleExist } from '../../../validators/role.validator';

export class RoleCreateRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  status?: string;
}

export class RoleGetSingleRequest {
  @Validate(IdRoleExist)
  id: string;
}

export class RoleUpdateRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}

export class RoleDeleteRequest {
  @Validate(IdRoleExist)
  id: string;
}
