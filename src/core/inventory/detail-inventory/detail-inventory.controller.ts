import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DetailInventoryInterface } from './detail-inventory.model';
import { DetailInventoryCreateRequest } from '../../../interface/inventory/detail-inventory/detail-inventory.request';
import { DetailInventoryResponseInterface } from '../../../interface/inventory/detail-inventory/detail-inventory.response';
import { DetailInventoryService } from './detail-inventory.service';

@Controller('detail-inventory')
export class DetailInventoryController {
  constructor(private readonly service: DetailInventoryService) {
  }

  @Post()
  async create(@Body() req: DetailInventoryCreateRequest): Promise<DetailInventoryResponseInterface> {
    return await this.service.create( req.inventoryId, req.productId, req.unitProductId, req.quantity, req.price );
  }

  @Get()
  async getAll(): Promise<DetailInventoryInterface[]> {
    return await this.service.getAll();
  }

  @Get(':id')
  async getSingle(@Param('id') id: string) {
      return await this.service.getSingle(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return await this.service.delete(id);
  }

  @Get('getDetail/:exportId')
  async getDetail(@Param('exportId') exportId: string) {
    return await this.service.getDetail(exportId);
  }
}
