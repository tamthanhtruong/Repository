import { IsNotEmpty, IsString } from 'class-validator';

export class UnitProductCreateRequest {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UnitProductGetSingleRequest {
  @IsString()
  id: string;
}

export class UnitProductUpdateRequest {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UnitProductDeleteRequest {
  @IsString()
  id: string;
}
