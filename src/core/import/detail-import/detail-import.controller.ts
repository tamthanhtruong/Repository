import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DetailImportService } from './detail-import.service';
import {
  DetailImportCreateRequest,
  DetailImportDeleteRequest,
  DetailImportGetListImportRequest,
  DetailImportGetSingleRequest,
} from '../../../interface/import/detail-import/detail-import.request';
import { DetailImportResponseInterface } from '../../../interface/import/detail-import/detail-import.response';

@Controller('detail-import')
export class DetailImportController {

  constructor(private readonly service: DetailImportService) {}

  /** Create Detail-Import
   *
   * @param req
   *
   * @return DetailImportResponseInterface
   */
  @Post('create')
  async create(@Body() req: DetailImportCreateRequest): Promise<DetailImportResponseInterface> {
    return await this.service.create( req.importId, req.productId, req.unitProductId, req.quantity, req.price );
  }

  /** Get All Detail-Import
   *
   * @return DetailImportResponseInterface[]
   */
  @Get('get-all')
  async getAll(): Promise<DetailImportResponseInterface[]> {
    return await this.service.getAll();
  }

  /** Get Single Detail-Import
   *
   * @param req
   *
   * @return DetailImportResponseInterface
   */
  @Get('get-single/:id')
  async getSingle(@Param() req: DetailImportGetSingleRequest): Promise<DetailImportResponseInterface> {
      return await this.service.getSingle(req.id);
  }

  /** Soft Delete Detail-Import
   *
   * @param req
   *
   * @return boolean
   */
  @Delete('delete/:id')
  async delete(@Param() req: DetailImportDeleteRequest): Promise<boolean> {
    return await this.service.delete(req.id);
  }

  /** Get List Import
   *
   * @param req
   *
   * @return DetailImportResponseInterface[]
   */
  @Get('get-list-import/:id')
  async getListImport(@Param() req: DetailImportGetListImportRequest): Promise<DetailImportResponseInterface[]>  {
    return await this.service.getListImport(req.id);
  }

  /** Get All Soft-Delete-Detail-Import
   *
   * @return DetailImportResponseInterface[]
   */
  @Get('get-all-soft-delete')
  async getAllSoftDelete(): Promise<DetailImportResponseInterface[]> {
    return await this.service.getAllSoftDelete();
  }
}
