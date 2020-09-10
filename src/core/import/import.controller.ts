import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ImportService } from './import.service';
import {
  ImportCreateRequest, ImportDeleteRequest,
  ImportGetSingleRequest,
  ImportUpdateRequest,
} from '../../interface/import/import.request';
import { ImportResponseInterface } from '../../interface/import/import.response';

@Controller('import')
export class ImportController {
  constructor(private readonly service: ImportService) {}

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
}
