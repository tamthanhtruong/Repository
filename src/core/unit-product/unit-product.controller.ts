import { UnitProductService } from './unit-product.service';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UnitProductResponseInterface } from '../../interface/unit-product/unit-product.response';
import {
  UnitProductCreateRequest, UnitProductDeleteRequest, UnitProductGetSingleRequest, UnitProductUpdateRequest,
} from '../../interface/unit-product/unit-product.request';

@Controller('unit-product')
export class UnitProductController {
  constructor(private readonly service: UnitProductService) {}

  /** Create Unit-Product
   *
   * @param req
   *
   * @return UnitProductResponseInterface
   */
  @Post('create')
  async create( @Body() req: UnitProductCreateRequest ): Promise<UnitProductResponseInterface> {
    return await this.service.create(req.name);
  }

  /** Get All Unit-Product
   *
   * @return UnitProductResponseInterface[]
   */
  @Get('get-all')
  async getAll(): Promise<UnitProductResponseInterface[]> {
      return await this.service.getAll();
  }

  /** Get Single Unit-Product
   *
   * @param req
   *
   * @return UnitProductResponseInterface
   */
  @Get('get-single/:id')
  async getSingle(@Param() req: UnitProductGetSingleRequest): Promise<UnitProductResponseInterface> {
    return await this.service.getSingle(req.id);
  }


  /** Update Unit-Product
   *
   * @param id
   * @param req
   *
   * @return UnitProductResponseInterface
   */
  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() req: UnitProductUpdateRequest): Promise<UnitProductResponseInterface> {
    return await this.service.update(id, req.name);
  }

  /** Soft Delete Unit-Product
   *
   * @param req
   *
   * @return boolean
   */
  @Delete('delete/:id')
  async delete(@Param() req: UnitProductDeleteRequest): Promise<boolean> {
      return await this.service.delete(req.id);
  }

  /** Get All Soft-Delete-Unit-Product
   *
   * @return UnitProductResponseInterface[]
   */
  @Get('get-all-soft-delete')
  async getAllSoftDelete(): Promise<UnitProductResponseInterface[]> {
    return await this.service.getAllSoftDelete();
  }
}
