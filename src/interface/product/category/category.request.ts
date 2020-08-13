import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryCreateRequest {
  @IsString()
  @IsNotEmpty()
  name : string;

  status?: string;
}

export class CategoryGetSingleRequest {
  @IsString()
  id: string;
}

export class CategoryUpdateRequest {
  @IsString()
  name: string;

  status?: string;
}

export class CategoryDeleteRequest {
  @IsString()
  id: string;
}

