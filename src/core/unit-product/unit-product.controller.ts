import { UnitProductService } from './unit-product.service';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UnitProductResponseInterface } from '../../interface/unit-product/unit-product.response';

@Controller('unit-product')
export class UnitProductController {
  constructor(private readonly service: UnitProductService) {}

  @Post()
  async create(@Body() name: string): Promise<UnitProductResponseInterface> {
      return await this.service.create(name);
  }

  @Get()
  async getAll(): Promise<UnitProductResponseInterface[]> {
      return await this.service.getAll();
  }

  @Get(':id')
  async getSingle(@Param('id') id: string): Promise<UnitProductResponseInterface> {
      return await this.service.getSingle(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body('name') name: string): Promise<UnitProductResponseInterface> {
    return await this.service.update(id, name);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
      return await this.service.delete(id);
  }
}
