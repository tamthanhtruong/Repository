import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ImportService } from './import.service';
import {
  ImportCreateRequest, ImportDeleteRequest,
  ImportGetSingleRequest,
  ImportUpdateRequest,
} from '../../interface/import/import.request';
import { ImportResponseInterface } from '../../interface/import/import.response';
import { ImportInterface } from './import.model';

@Controller('import')
export class ImportController {
  constructor(private readonly service: ImportService) {}

  @Post()
  async create(@Body() req: ImportCreateRequest): Promise<ImportResponseInterface> {
    return await this.service.create( req.shipper,
                                      req.invoiceNumber,
                                      req.note,
                                      req.createdUserId,
                                      req.accountantUserId,
                                      req.accConfirmedDate,
                                      req.stockkeeperUserId,
                                      req.stockConfirmedDate,
                                      req.status);
  }

  @Get()
  async getAll(): Promise<ImportInterface[]> {
    return await this.service.getAll();
  }

  @Get(':id')
  async getSingle(@Param() req: ImportGetSingleRequest): Promise<ImportResponseInterface> {
      return await this.service.getSingle(req.id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() req: ImportUpdateRequest): Promise<ImportResponseInterface> {
    return await this.service.update( id,
                                      req.shipper,
                                      req.invoiceNumber,
                                      req.note,
                                      req.createdUserId,
                                      req.accountantUserId,
                                      req.accConfirmedDate,
                                      req.stockkeeperUserId,
                                      req.stockConfirmedDate,
                                      req.status);
  }

  @Delete(':id')
  async delete(@Param() req: ImportDeleteRequest): Promise<boolean> {
    return await this.service.delete(req.id);
  }
}
