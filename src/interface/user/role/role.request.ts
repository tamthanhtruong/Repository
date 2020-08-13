import { IsNotEmpty, IsString } from 'class-validator';

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
  @IsString()
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
  @IsString()
  id: string;
}
