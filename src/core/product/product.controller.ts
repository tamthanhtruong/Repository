import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  ProductCreateRequest, ProductDeleteRequest,
  ProductGetSingleRequest,
  ProductUpdateRequest,
} from '../../interface/product/product.request';
import { ProductResponseInterface } from '../../interface/product/product.response';

@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  /** Create Product
   *
   * @param req
   *
   * @return ProductResponseInterface
   */
  @Post('create')
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

  /** Get All Product
   *
   * @return ProductResponseInterface[]
   */
  @Get('get-all')
  async getAll(): Promise<ProductResponseInterface[]> {
    return await this.service.getAll();
  }

  /** Get All Exist Product
   *
   * @return ProductResponseInterface[]
   */
  @Get('get-all-exist')
  async getAllExist(): Promise<ProductResponseInterface[]> {
    return await this.service.getAllExist();
  }

  /** Get All No_exist Product
   *
   * @return ProductResponseInterface[]
   */
  @Get('get-all-no_exist')
  async getAllNoExist(): Promise<ProductResponseInterface[]> {
    return await this.service.getAllNoExist();
  }

  /** Get Single Product
   *
   * @param req
   *
   * @return ProductResponseInterface
   */
  @Get('get-single/:id')
  async getSingle(@Param() req: ProductGetSingleRequest): Promise<ProductResponseInterface> {
      return await this.service.getSingle(req.id);
  }

  /** Update Product
   *
   * @param id
   * @param req
   *
   * @return ProductResponseInterface
   */
  @Patch('update/:id')
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

  /** Soft Delete Product
   *
   * @param req
   *
   * @return boolean
   */
  @Delete('delete/:id')
  async delete(@Param() req: ProductDeleteRequest): Promise<boolean> {
    return await this.service.delete(req.id);
  }

  /** Get All Soft-Delete-Product
   *
   * @return ProductResponseInterface[]
   */
  @Get('get-all-soft-delete')
  async getAllSoftDelete(): Promise<ProductResponseInterface[]> {
    return await this.service.getAllSoftDelete();
  }
}
