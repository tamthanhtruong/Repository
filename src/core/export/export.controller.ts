import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ExportCreateRequest, ExportUpdateRequest } from '../../interface/export/export.request';
import { ExportResponseInterface } from '../../interface/export/export.response';
import { ExportService } from './export.service';
import { ExportInterface } from './export.model';

@Controller('export')
export class ExportController {
  constructor(private readonly service: ExportService) {}

  @Post()
  async create(@Body() req: ExportCreateRequest): Promise<ExportResponseInterface> {
    return await this.service.create( req.receiverId,
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
  async getAll(): Promise<ExportInterface[]> {
    return await this.service.getAll();
  }

  @Get(':id')
  async getSingle(@Param('id') id: string): Promise<ExportResponseInterface> {
      return await this.service.getSingle(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() req: ExportUpdateRequest) {
    return await this.service.update( id,
                                      req.receiverId,
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
