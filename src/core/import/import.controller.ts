import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ImportService } from './import.service';
import { ImportCreateRequest, ImportUpdateRequest } from '../../interface/import/import.request';
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
  async getSingle(@Param('id') id: string): Promise<ImportResponseInterface> {
    try {
      return await this.service.getSingle(id);
    } catch(e) {
      throw new HttpException(`Not found importId ${id}`, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  async update(@Body() req: ImportUpdateRequest): Promise<ImportResponseInterface> {
    return await this.service.update( req.id,
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
  async delete(@Param('id') id: string): Promise<boolean> {
    return await this.service.delete(id);
  }
}
