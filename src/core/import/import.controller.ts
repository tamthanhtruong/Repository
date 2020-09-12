import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ImportService } from './import.service';
import {
  ImportCreateRequest, ImportDeleteRequest,
  ImportGetSingleRequest,
  ImportUpdateRequest,
} from '../../interface/import/import.request';
import { ImportResponseInterface } from '../../interface/import/import.response';
import {
  DetailImportCreateRequest, DetailImportDeleteRequest, DetailImportGetListImportRequest,
  DetailImportGetSingleRequest,
} from '../../interface/import/detail-import/detail-import.request';
import { DetailImportResponseInterface } from '../../interface/import/detail-import/detail-import.response';
import { DetailImportService } from './detail-import/detail-import.service';

@Controller('import')
export class ImportController {
  constructor( private readonly service: ImportService,
               private readonly detailImportService: DetailImportService ) {}

  /*---------- Import Service Code ----------*/
  /** Create Import
   *
   * @param req
   *
   * @return ImportResponseInterface
   */
  @Post('create')
  async create(@Body() req: ImportCreateRequest): Promise<ImportResponseInterface> {
    return await this.service.create( req.shipper,
                                      req.invoiceNumber,
                                      req.note,
                                      req.createdUserId,
                                      req.accountantUserId,
                                      req.accConfirmedDate,
                                      req.stockKeeperUserId,
                                      req.stockConfirmedDate,
                                      req.status);
  }

  /** Get All Import
   *
   * @return ImportResponseInterface[]
   */
  @Get('get-all')
  async getAll(): Promise<ImportResponseInterface[]> {
    return await this.service.getAll();
  }

  /** Get All Lock Import
   *
   * @return ImportResponseInterface[]
   */
  @Get('get-all-lock')
  async getAllLock(): Promise<ImportResponseInterface[]> {
    return await this.service.getAllLock();
  }

  /** Get All Open Import
   *
   * @return ImportResponseInterface[]
   */
  @Get('get-all-open')
  async getAllOpen(): Promise<ImportResponseInterface[]> {
    return await this.service.getAllOpen();
  }

  /** Get All Paid Import
   *
   * @return ImportResponseInterface[]
   */
  @Get('get-all-paid')
  async getAllPaid(): Promise<ImportResponseInterface[]> {
    return await this.service.getAllPaid();
  }

  /** Get All Imported Import
   *
   * @return ImportResponseInterface[]
   */
  @Get('get-all-imported')
  async getAllImported(): Promise<ImportResponseInterface[]> {
    return await this.service.getAllImported();
  }

  /** Get Single Import
   *
   * @param req
   *
   * @return ImportResponseInterface
   */
  @Get('get-single/:id')
  async getSingle(@Param() req: ImportGetSingleRequest): Promise<ImportResponseInterface> {
      return await this.service.getSingle(req.id);
  }

  /** Update Import
   *
   * @param id
   * @param req
   *
   * @return ImportResponseInterface
   */
  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() req: ImportUpdateRequest): Promise<ImportResponseInterface> {
    return await this.service.update( id,
                                      req.shipper,
                                      req.invoiceNumber,
                                      req.note,
                                      req.createdUserId,
                                      req.accountantUserId,
                                      req.accConfirmedDate,
                                      req.stockKeeperUserId,
                                      req.stockConfirmedDate,
                                      req.status);
  }

  /** Soft Delete Import
   *
   * @param req
   *
   * @return boolean
   */
  @Delete('delete/:id')
  async delete(@Param() req: ImportDeleteRequest): Promise<boolean> {
    return await this.service.delete(req.id);
  }

  /** Get All Soft-Delete-Import
   *
   * @return ImportResponseInterface[]
   */
  @Get('get-all-soft-delete')
  async getAllSoftDelete(): Promise<ImportResponseInterface[]> {
    return await this.service.getAllSoftDelete();
  }


  /*---------- Detail-Import Service Code ----------*/
  /** Create Detail-Import
   *
   * @param req
   *
   * @return DetailImportResponseInterface
   */
  @Post('detail-import/create')
  async createDetailImport(@Body() req: DetailImportCreateRequest): Promise<DetailImportResponseInterface> {
    return await this.detailImportService.create( req.importId, req.productId, req.unitProductId, req.quantity, req.price );
  }

  /** Get All Detail-Import
   *
   * @return DetailImportResponseInterface[]
   */
  @Get('detail-import/get-all')
  async getAllDetailImport(): Promise<DetailImportResponseInterface[]> {
    return await this.detailImportService.getAll();
  }

  /** Get Single Detail-Import
   *
   * @param req
   *
   * @return DetailImportResponseInterface
   */
  @Get('detail-import/get-single/:id')
  async getSingleDetailImport(@Param() req: DetailImportGetSingleRequest): Promise<DetailImportResponseInterface> {
    return await this.detailImportService.getSingle(req.id);
  }

  /** Soft Delete Detail-Import
   *
   * @param req
   *
   * @return boolean
   */
  @Delete('detail-import/delete/:id')
  async deleteDetailImport(@Param() req: DetailImportDeleteRequest): Promise<boolean> {
    return await this.detailImportService.delete(req.id);
  }

  /** Get List Import
   *
   * @param req
   *
   * @return DetailImportResponseInterface[]
   */
  @Get('detail-import/get-list-import/:id')
  async getListImportDetailImport(@Param() req: DetailImportGetListImportRequest): Promise<DetailImportResponseInterface[]>  {
    return await this.detailImportService.getListImport(req.id);
  }

  /** Get All Soft-Delete-Detail-Import
   *
   * @return DetailImportResponseInterface[]
   */
  @Get('detail-import/get-all-soft-delete')
  async getAllSoftDeleteDetailImport(): Promise<DetailImportResponseInterface[]> {
    return await this.detailImportService.getAllSoftDelete();
  }
}
