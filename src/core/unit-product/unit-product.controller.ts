import { UnitProductService } from './unit-product.service';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { UnitProductResponseInterface } from '../../interface/unit-product/unit-product.response';

@Controller('unit-product')
export class UnitProductController {
  constructor(private readonly service: UnitProductService) {}

  @Post()
  async create(@Body() name: string): Promise<UnitProductResponseInterface> {
    try {
      return await this.service.create(name);
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  async getAll(): Promise<UnitProductResponseInterface[]> {
    try{
      return await this.service.getAll();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Get(':id')
  async getSingle(@Param('id') id: string): Promise<UnitProductResponseInterface> {
    try {
      return await this.service.getSingle(id);
    } catch(e) {
      throw new HttpException(`Not found Unit-Product ${id}`, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    try {
      return await this.service.delete(id);
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
