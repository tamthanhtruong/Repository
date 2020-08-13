import { UnitProductService } from './unit-product.service';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UnitProductResponseInterface } from '../../interface/unit-product/unit-product.response';
import {
  UnitProductCreateRequest, UnitProductDeleteRequest, UnitProductGetSingleRequest, UnitProductUpdateRequest,
} from '../../interface/unit-product/unit-product.request';

@Controller('unit-product')
export class UnitProductController {
  constructor(private readonly service: UnitProductService) {}

  @Post()
  async create( @Body() req: UnitProductCreateRequest ): Promise<UnitProductResponseInterface> {
    return await this.service.create(req.name);
  }

  @Get()
  async getAll(): Promise<UnitProductResponseInterface[]> {
      return await this.service.getAll();
  }

  @Get(':id')
  async getSingle(@Param() req: UnitProductGetSingleRequest): Promise<UnitProductResponseInterface> {
    return await this.service.getSingle(req.id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() req: UnitProductUpdateRequest): Promise<UnitProductResponseInterface> {
    return await this.service.update(id, req.name);
  }

  @Delete(':id')
  async delete(@Param() req: UnitProductDeleteRequest): Promise<boolean> {
      return await this.service.delete(req.id);
  }
}
