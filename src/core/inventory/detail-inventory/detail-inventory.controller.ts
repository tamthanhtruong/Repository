import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  DetailInventoryCreateRequest,
  DetailInventoryDeleteRequest,
  DetailInventoryGetListInventoryRequest,
  DetailInventoryGetSingleRequest,
} from '../../../interface/inventory/detail-inventory/detail-inventory.request';
import { DetailInventoryResponseInterface } from '../../../interface/inventory/detail-inventory/detail-inventory.response';
import { DetailInventoryService } from './detail-inventory.service';

@Controller('detail-inventory')
export class DetailInventoryController {
  constructor(private readonly service: DetailInventoryService) {}

  /** Create Detail-Inventory
   *
   * @param req
   *
   * @return DetailInventoryResponseInterface
   */
  @Post('create')
  async create(@Body() req: DetailInventoryCreateRequest): Promise<DetailInventoryResponseInterface> {
    return await this.service.create( req.inventoryId, req.productId, req.unitProductId, req.quantity, req.price );
  }

  /** Get All Detail-Inventory
   *
   * @return DetailInventoryResponseInterface[]
   */
  @Get('get-all')
  async getAll(): Promise<DetailInventoryResponseInterface[]> {
    return await this.service.getAll();
  }

  /** Get Single Detail-Inventory
   *
   * @param req
   *
   * @return DetailInventoryResponseInterface
   */
  @Get('get-single/:id')
  async getSingle(@Param() req: DetailInventoryGetSingleRequest): Promise<DetailInventoryResponseInterface> {
      return await this.service.getSingle(req.id);
  }

  /** Soft Delete Detail-Inventory
   *
   * @param req
   *
   * @return boolean
   */
  @Delete('delete/:id')
  async delete(@Param() req: DetailInventoryDeleteRequest): Promise<boolean> {
    return await this.service.delete(req.id);
  }

  /** Get List Inventory
   *
   * @param req
   *
   * @return DetailInventoryResponseInterface
   */
  @Get('get-list-inventory/:id')
  async getListInventory(@Param() req: DetailInventoryGetListInventoryRequest): Promise<DetailInventoryResponseInterface[]> {
    return await this.service.getListInventory(req.id);
  }

  /** Get All Soft-Delete-Detail-Inventory
   *
   * @return DetailInventoryResponseInterface[]
   */
  @Get('get-all-soft-delete')
  async getAllSoftDelete(): Promise<DetailInventoryResponseInterface[]> {
    return await this.service.getAllSoftDelete();
  }
}
