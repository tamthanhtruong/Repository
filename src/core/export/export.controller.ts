import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ExportCreateRequest, ExportDeleteRequest,
  ExportGetSingleRequest,
  ExportUpdateRequest,
} from '../../interface/export/export.request';
import { ExportResponseInterface } from '../../interface/export/export.response';
import { ExportService } from './export.service';

@Controller('export')
export class ExportController {
  constructor(private readonly service: ExportService) {}

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
}
