import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ExportCreateRequest, ExportDeleteRequest,
  ExportGetSingleRequest,
  ExportUpdateRequest,
} from '../../interface/export/export.request';
import { ExportResponseInterface } from '../../interface/export/export.response';
import { ExportService } from './export.service';
import { DetailExportService } from './detail-export/detail-export.service';
import {
  DetailExportCreateRequest, DetailExportDeleteRequest, DetailExportGetListExportRequest,
  DetailExportGetSingleRequest,
} from '../../interface/export/detail-export/detail-export.request';
import { DetailExportResponseInterface } from '../../interface/export/detail-export/detail-export.response';

@Controller('export')
export class ExportController {
  constructor( private readonly service: ExportService,
               private readonly detailExportService: DetailExportService ) {}

  /*---------- Export Service Code ----------*/
  /** Create Export
   *
   * @param req
   *
   * @return ExportResponseInterface
   */
  @Post('create')
  async create(@Body() req: ExportCreateRequest): Promise<ExportResponseInterface> {
    return await this.service.create( req.receiver,
                                      req.invoiceNumber,
                                      req.note,
                                      req.createdUserId,
                                      req.accountantUserId,
                                      req.accConfirmedDate,
                                      req.stockKeeperUserId,
                                      req.stockConfirmedDate,
                                      req.status);
  }

  /** Get All Export
   *
   * @return ExportResponseInterface[]
   */
  @Get('get-all')
  async getAll(): Promise<ExportResponseInterface[]> {
    return await this.service.getAll();
  }

  /** Get All Lock Export
   *
   * @return ExportResponseInterface[]
   */
  @Get('get-all-lock')
  async getAllLock(): Promise<ExportResponseInterface[]> {
    return await this.service.getAllLock();
  }

  /** Get All Open Export
   *
   * @return ExportResponseInterface[]
   */
  @Get('get-all-open')
  async getAllOpen(): Promise<ExportResponseInterface[]> {
    return await this.service.getAllOpen();
  }

  /** Get All Paid Export
   *
   * @return ExportResponseInterface[]
   */
  @Get('get-all-paid')
  async getAllPaid(): Promise<ExportResponseInterface[]> {
    return await this.service.getAllPaid();
  }

  /** Get All Exported Export
   *
   * @return ExportResponseInterface[]
   */
  @Get('get-all-exported')
  async getAllExported(): Promise<ExportResponseInterface[]> {
    return await this.service.getAllExported();
  }

  /** Get Single Export
   *
   * @param req
   *
   * @return ExportResponseInterface
   */
  @Get('get-single/:id')
  async getSingle(@Param() req: ExportGetSingleRequest): Promise<ExportResponseInterface> {
      return await this.service.getSingle(req.id);
  }

  /** Update Export
   *
   * @param id
   * @param req
   *
   * @return ExportResponseInterface
   */
  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() req: ExportUpdateRequest): Promise<ExportResponseInterface>{
    return await this.service.update( id,
                                      req.receiver,
                                      req.invoiceNumber,
                                      req.note,
                                      req.createdUserId,
                                      req.accountantUserId,
                                      req.accConfirmedDate,
                                      req.stockKeeperUserId,
                                      req.stockConfirmedDate,
                                      req.status);
  }
  /** Soft Delete Export
   *
   * @param req
   *
   * @return boolean
   */
  @Delete('delete/:id')
  async delete(@Param() req: ExportDeleteRequest): Promise<boolean> {
    return await this.service.delete(req.id);
  }

  /** Get All Soft-Delete-Export
   *
   * @return ExportResponseInterface[]
   */
  @Get('get-all-soft-delete')
  async getAllSoftDelete(): Promise<ExportResponseInterface[]> {
    return await this.service.getAllSoftDelete();
  }



  /*---------- Detail-Export Service Code ----------*/
  /** Create Detail-Export
   *
   * @param req
   *
   * @return DetailExportResponseInterface
   */
  @Post('detail-export/create')
  async createDetailExport(@Body() req: DetailExportCreateRequest): Promise<DetailExportResponseInterface> {
    return await this.detailExportService.create( req.exportId, req.productId, req.unitProductId, req.quantity, req.price );
  }

  /** Get All Detail-Export
   *
   * @return DetailExportResponseInterface[]
   */
  @Get('detail-export/get-all')
  async getAllDetailExport(): Promise<DetailExportResponseInterface[]> {
    return await this.detailExportService.getAll();
  }

  /** Get Single Detail-Export
   *
   * @param req
   *
   * @return DetailExportResponseInterface
   */
  @Get('detail-export/get-single/:id')
  async getSingleDetailExport(@Param() req: DetailExportGetSingleRequest): Promise<DetailExportResponseInterface> {
    return await this.detailExportService.getSingle(req.id);
  }

  /** Soft Delete Detail-Export
   *
   * @param req
   *
   * @return boolean
   */
  @Delete('detail-export/delete/:id')
  async deleteDetailExport(@Param() req: DetailExportDeleteRequest): Promise<boolean> {
    return await this.detailExportService.delete(req.id);
  }

  /** Get List Export
   *
   * @param req
   *
   * @return DetailExportResponseInterface[]
   */
  @Get('detail-export/get-list-export/:id')
  async getListExportDetailExport(@Param() req: DetailExportGetListExportRequest): Promise<DetailExportResponseInterface[]> {
    return await this.detailExportService.getListExport(req.id);
  }

  /** Get All Soft-Delete-Detail-Export
   *
   * @return DetailExportResponseInterface[]
   */
  @Get('detail-export/get-all-soft-delete')
  async getAllSoftDeleteDetailExport(): Promise<DetailExportResponseInterface[]> {
    return await this.detailExportService.getAllSoftDelete();
  }
}

