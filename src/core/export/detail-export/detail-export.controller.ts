import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DetailExportInterface } from './detail-export.model';
import {
  DetailExportCreateRequest, DetailExportDeleteRequest, DetailExportGetDetailRequest,
  DetailExportGetSingleRequest,
} from '../../../interface/export/detail-export/detail-export.request';
import { DetailExportResponseInterface } from '../../../interface/export/detail-export/detail-export.response';
import { DetailExportService } from './detail-export.service';

@Controller('detail-export')
export class DetailExportController {
  constructor(private readonly service: DetailExportService) {
  }

  @Post()
  async create(@Body() req: DetailExportCreateRequest): Promise<DetailExportResponseInterface> {
    return await this.service.create( req.exportId, req.productId, req.unitProductId, req.quantity, req.price );
  }

  @Get()
  async getAll(): Promise<DetailExportInterface[]> {
    return await this.service.getAll();
  }

  @Get(':id')
  async getSingle(@Param() req: DetailExportGetSingleRequest) {
      return await this.service.getSingle(req.id);
  }

  @Delete(':id')
  async delete(@Param() req: DetailExportDeleteRequest): Promise<boolean> {
    return await this.service.delete(req.id);
  }

  @Get('getDetail/:id')
  async getDetail(@Param() req: DetailExportGetDetailRequest): Promise<DetailExportInterface[]> {
    return await this.service.getDetail(req.id);
  }
}
