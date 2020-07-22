import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryCreateRequest, CategoryUpdateRequest } from '../../interface/product/category/category.request';
import { CategoryInterface } from './category.model';
import { CategoryResponseInterface } from '../../interface/product/category/category.response';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() req: CategoryCreateRequest) {
    const generateID = await this.categoryService.create(req.name);
    return {id: generateID};
  }

  @Get()
  async getAll(): Promise<CategoryInterface[]> {
    return await this.categoryService.getAll();
  }

  @Get(':id')
  async getSingle(@Param('id') id: string): Promise<CategoryResponseInterface> {
    return await this.categoryService.getSingle(id);
  }

  @Patch(':id')
  async update(@Body() req: CategoryUpdateRequest): Promise<CategoryResponseInterface> {
    return await this.categoryService.update(req.id, req.name, req.status);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return await this.categoryService.delete(id);
  }
}
