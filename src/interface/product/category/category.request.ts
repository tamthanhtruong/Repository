import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { IdCategoryExist } from '../../../validators/category.validator';

export class CategoryCreateRequest {
  @IsString()
  @IsNotEmpty()
  name : string;

  status?: string;
}

export class CategoryGetSingleRequest {
  @Validate(IdCategoryExist)
  id: string;
}

export class CategoryUpdateRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  status?: string;
}

export class CategoryDeleteRequest {
  @Validate(IdCategoryExist)
  id: string;
}

