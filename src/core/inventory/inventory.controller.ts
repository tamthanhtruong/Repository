import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InventoryCreateRequest, InventoryUpdateRequest } from '../../interface/inventory/inventory.request';
import { InventoryResponseInterface } from '../../interface/inventory/inventory.response';
import { InventoryInterface } from './inventory.model';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly service: InventoryService) {
  }

  @Post()
  async create(@Body() req: InventoryCreateRequest): Promise<InventoryResponseInterface> {
    return await this.service.create(req.invoiceNumber, req.note, req.createdUserId, req.status);
  }

  @Get()
  async getAll(): Promise<InventoryInterface[]> {
    return await this.service.getAll();
  }

  @Get(':id')
  async getSingle(@Param('id') id: string): Promise<InventoryResponseInterface> {
      return await this.service.getSingle(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() req: InventoryUpdateRequest): Promise<InventoryResponseInterface> {
    return await this.service.update(id, req.invoiceNumber,req.note,req.createdUserId,req.status);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return await this.service.delete(id);
  }
}
