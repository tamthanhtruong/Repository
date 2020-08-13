import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DetailImportService } from './detail-import.service';
import {
  DetailImportCreateRequest, DetailImportDeleteRequest, DetailImportGetDetailRequest,
  DetailImportGetSingleRequest,
} from '../../../interface/import/detail-import/detail-import.request';
import { DetailImportResponseInterface } from '../../../interface/import/detail-import/detail-import.response';
import { DetailImportInterface } from './detail-import.model';

@Controller('detail-import')
export class DetailImportController {
  constructor(private readonly service: DetailImportService) {
  }

  @Post()
  async create(@Body() req: DetailImportCreateRequest): Promise<DetailImportResponseInterface> {
    return await this.service.create( req.importId, req.productId, req.unitProductId, req.quantity, req.price );
  }

  @Get()
  async getAll(): Promise<DetailImportInterface[]> {
    return await this.service.getAll();
  }

  @Get(':id')
  async getSingle(@Param() req: DetailImportGetSingleRequest) {
      return await this.service.getSingle(req.id);
  }

  @Delete(':id')
  async delete(@Param() req: DetailImportDeleteRequest): Promise<boolean> {
    return await this.service.delete(req.id);
  }

  @Get('getDetail/:id')
  async getDetail(@Param() req: DetailImportGetDetailRequest): Promise<DetailImportInterface[]>  {
    return await this.service.getDetail(req.id);
  }
}
