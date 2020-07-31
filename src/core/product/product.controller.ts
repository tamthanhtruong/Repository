import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCreateRequest, ProductUpdateRequest } from '../../interface/product/product.request';
import { ProductResponseInterface } from '../../interface/product/product.response';
import { ProductInterface } from './product.model';

@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Post()
  async create( @Body() req: ProductCreateRequest): Promise<ProductResponseInterface> {
      return await this.service.create( req.categoryId,
                                        req.unitProductId,
                                        req.name,
                                        req.code,
                                        req.originPrice,
                                        req.price,
                                        req.image,
                                        req.information,
                                        req.evaluation,
                                        req.status);
  }

  @Get()
  async getAll(): Promise<ProductInterface[]> {
      return await this.service.getAll();
  }

  @Get(':id')
  async getSingle(@Param('id') id: string): Promise<ProductResponseInterface> {
      return await this.service.getSingle(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() req: ProductUpdateRequest): Promise<ProductResponseInterface> {
      return await this.service.update( id,
                                        req.categoryId,
                                        req.unitProductId,
                                        req.originPrice,
                                        req.price,
                                        req.image,
                                        req.information,
                                        req.evaluation,
                                        req.status);
    }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
      return await this.service.delete(id);
  }
}
