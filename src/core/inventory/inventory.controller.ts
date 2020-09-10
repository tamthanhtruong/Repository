import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {
  InventoryCreateRequest, InventoryDeleteRequest,
  InventoryGetSingleRequest,
  InventoryUpdateRequest,
} from '../../interface/inventory/inventory.request';
import { InventoryResponseInterface } from '../../interface/inventory/inventory.response';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly service: InventoryService) {
  }

  /** Create Inventory
   *
   * @param req
   *
   * @return InventoryResponseInterface
   */
  @Post('create')
  async create(@Body() req: InventoryCreateRequest): Promise<InventoryResponseInterface> {
    return await this.service.create(req.invoiceNumber, req.note, req.createdUserId, req.status);
  }

  /** Get All Inventory
   *
   * @return InventoryResponseInterface[]
   */
  @Get('get-all')
  async getAll(): Promise<InventoryResponseInterface[]> {
    return await this.service.getAll();
  }

  /** Get Single Inventory
   *
   * @param req
   *
   * @return InventoryResponseInterface
   */
  @Get('get-single/:id')
  async getSingle(@Param() req: InventoryGetSingleRequest): Promise<InventoryResponseInterface> {
      return await this.service.getSingle(req.id);
  }

  /** Update Inventory
   *
   * @param id
   * @param req
   *
   * @return InventoryResponseInterface
   */
  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() req: InventoryUpdateRequest): Promise<InventoryResponseInterface> {
    return await this.service.update(id, req.invoiceNumber,req.note,req.createdUserId,req.status);
  }

  /** Soft Delete Inventory
   *
   * @param req
   *
   * @return boolean
   */
  @Delete('delete/:id')
  async delete(@Param() req: InventoryDeleteRequest): Promise<boolean> {
    return await this.service.delete(req.id);
  }

  /** Get All Soft-Delete-Inventory
   *
   * @return InventoryResponseInterface[]
   */
  @Get('get-all-soft-delete')
  async getAllSoftDelete(): Promise<InventoryResponseInterface[]> {
    return await this.service.getAllSoftDelete();
  }
}
