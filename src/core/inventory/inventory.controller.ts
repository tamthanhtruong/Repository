import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {
  InventoryCreateRequest, InventoryDeleteRequest,
  InventoryGetSingleRequest,
  InventoryUpdateRequest,
} from '../../interface/inventory/inventory.request';
import { InventoryResponseInterface } from '../../interface/inventory/inventory.response';
import { InventoryService } from './inventory.service';
import { DetailInventoryService } from './detail-inventory/detail-inventory.service';
import {
  DetailInventoryCreateRequest, DetailInventoryDeleteRequest, DetailInventoryGetListInventoryRequest,
  DetailInventoryGetSingleRequest,
} from '../../interface/inventory/detail-inventory/detail-inventory.request';
import { DetailInventoryResponseInterface } from '../../interface/inventory/detail-inventory/detail-inventory.response';

@Controller('inventory')
export class InventoryController {
  constructor( private readonly service: InventoryService,
              private readonly detailInventoryService: DetailInventoryService ) {
  }

  /*---------- Inventory Service Code ----------*/
  /** Create Inventory
   *
   * @param req
   *
   * @return InventoryResponseInterface
   */
  @Post('create')
  async create(@Body() req: InventoryCreateRequest): Promise<InventoryResponseInterface> {
    return await this.service.create(req.invoiceNumber, req.note, req.createdUserId);
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
    return await this.service.update(id, req.invoiceNumber,req.note,req.createdUserId);
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

  /*---------- Detail-Inventory Service Code ----------*/
  /** Create Detail-Inventory
   *
   * @param req
   *
   * @return DetailInventoryResponseInterface
   */
  @Post('detail-inventory/create')
  async createDetailInventory(@Body() req: DetailInventoryCreateRequest): Promise<DetailInventoryResponseInterface> {
    return await this.detailInventoryService.create( req.inventoryId, req.productId, req.unitProductId, req.quantity, req.price );
  }

  /** Get All Detail-Inventory
   *
   * @return DetailInventoryResponseInterface[]
   */
  @Get('detail-inventory/get-all')
  async getAllDetailInventory(): Promise<DetailInventoryResponseInterface[]> {
    return await this.detailInventoryService.getAll();
  }

  /** Get Single Detail-Inventory
   *
   * @param req
   *
   * @return DetailInventoryResponseInterface
   */
  @Get('detail-inventory/get-single/:id')
  async getSingleDetailInventory(@Param() req: DetailInventoryGetSingleRequest): Promise<DetailInventoryResponseInterface> {
    return await this.detailInventoryService.getSingle(req.id);
  }

  /** Soft Delete Detail-Inventory
   *
   * @param req
   *
   * @return boolean
   */
  @Delete('detail-inventory/delete/:id')
  async deleteDetailInventory(@Param() req: DetailInventoryDeleteRequest): Promise<boolean> {
    return await this.detailInventoryService.delete(req.id);
  }

  /** Get List Inventory
   *
   * @param req
   *
   * @return DetailInventoryResponseInterface
   */
  @Get('detail-inventory/get-list-inventory/:id')
  async getListInventoryDetailInventory(@Param() req: DetailInventoryGetListInventoryRequest): Promise<DetailInventoryResponseInterface[]> {
    return await this.detailInventoryService.getListInventory(req.id);
  }

  /** Get All Soft-Delete-Detail-Inventory
   *
   * @return DetailInventoryResponseInterface[]
   */
  @Get('detail-inventory/get-all-soft-delete')
  async getAllSoftDeleteDetailInventory(): Promise<DetailInventoryResponseInterface[]> {
    return await this.detailInventoryService.getAllSoftDelete();
  }
}
