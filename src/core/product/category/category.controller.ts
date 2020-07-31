import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryCreateRequest, CategoryUpdateRequest } from '../../../interface/product/category/category.request';
import { CategoryInterface } from './category.model';
import { CategoryResponseInterface } from '../../../interface/product/category/category.response';

@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Post()
  async create(@Body() req: CategoryCreateRequest): Promise<CategoryResponseInterface> {
    return await this.service.create(req.name, req.status);
  }

  @Get()
  async getAll(): Promise<CategoryInterface[]> {
    return await this.service.getAll();
  }

  @Get(':id')
  async getSingle(@Param('id') id: string): Promise<CategoryResponseInterface> {
      return await this.service.getSingle(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() req: CategoryUpdateRequest): Promise<CategoryResponseInterface> {
    return await this.service.update(id, req.name, req.status);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return await this.service.delete(id);
  }
}
