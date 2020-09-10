import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  CategoryCreateRequest, CategoryDeleteRequest,
  CategoryGetSingleRequest,
  CategoryUpdateRequest,
} from '../../../interface/product/category/category.request';
import { CategoryResponseInterface } from '../../../interface/product/category/category.response';

@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  /** Create Category
   *
   * @param req
   *
   * @return CategoryResponseInterface
   */
  @Post('create')
  async create(@Body() req: CategoryCreateRequest): Promise<CategoryResponseInterface> {
    return await this.service.create(req.name, req.status);
  }

  /** Get All Category
   *
   * @return CategoryResponseInterface[]
   */
  @Get('get-all')
  async getAll(): Promise<CategoryResponseInterface[]> {
    return await this.service.getAll();
  }

  /** Get Single Category
   *
   * @param req
   *
   * @return CategoryResponseInterface
   */
  @Get('get-single/:id')
  async getSingle(@Param() req: CategoryGetSingleRequest): Promise<CategoryResponseInterface> {
    return await this.service.getSingle(req.id);
  }

  /** Update Category
   *
   * @param id
   * @param req
   *
   * @return CategoryResponseInterface
   */
  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() req: CategoryUpdateRequest): Promise<CategoryResponseInterface> {
    return await this.service.update(id, req.name, req.status);
  }

  /** Soft Delete Category
   *
   * @param req
   *
   * @return boolean
   */
  @Delete('delete/:id')
  async delete(@Param() req: CategoryDeleteRequest): Promise<boolean> {
    return await this.service.delete(req.id);
  }

  /** Get All Soft-Delete-Category
   *
   * @return CategoryResponseInterface[]
   */
  @Get('get-all-soft-delete')
  async getAllSoftDelete(): Promise<CategoryResponseInterface[]> {
    return await this.service.getAllSoftDelete();
  }
}
