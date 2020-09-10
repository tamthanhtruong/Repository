import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  DetailExportCreateRequest,
  DetailExportDeleteRequest,
  DetailExportGetListExportRequest,
  DetailExportGetSingleRequest,
} from '../../../interface/export/detail-export/detail-export.request';
import { DetailExportResponseInterface } from '../../../interface/export/detail-export/detail-export.response';
import { DetailExportService } from './detail-export.service';

@Controller('detail-export')
export class DetailExportController {
  constructor(private readonly service: DetailExportService) {
  }

  /** Create Detail-Export
   *
   * @param req
   *
   * @return DetailExportResponseInterface
   */
  @Post('create')
  async create(@Body() req: DetailExportCreateRequest): Promise<DetailExportResponseInterface> {
    return await this.service.create( req.exportId, req.productId, req.unitProductId, req.quantity, req.price );
  }

  /** Get All Detail-Export
   *
   * @return DetailExportResponseInterface[]
   */
  @Get('get-all')
  async getAll(): Promise<DetailExportResponseInterface[]> {
    return await this.service.getAll();
  }

  /** Get Single Detail-Export
   *
   * @param req
   *
   * @return DetailExportResponseInterface
   */
  @Get('get-single/:id')
  async getSingle(@Param() req: DetailExportGetSingleRequest): Promise<DetailExportResponseInterface> {
      return await this.service.getSingle(req.id);
  }

  /** Soft Delete Detail-Export
   *
   * @param req
   *
   * @return boolean
   */
  @Delete('delete/:id')
  async delete(@Param() req: DetailExportDeleteRequest): Promise<boolean> {
    return await this.service.delete(req.id);
  }

  /** Get List Export
   *
   * @param req
   *
   * @return DetailExportResponseInterface[]
   */
  @Get('get-list-export/:id')
  async getListExport(@Param() req: DetailExportGetListExportRequest): Promise<DetailExportResponseInterface[]> {
    return await this.service.getListExport(req.id);
  }

  /** Get All Soft-Delete-Detail-Export
   *
   * @return DetailExportResponseInterface[]
   */
  @Get('get-all-soft-delete')
  async getAllSoftDelete(): Promise<DetailExportResponseInterface[]> {
    return await this.service.getAllSoftDelete();
  }
}
