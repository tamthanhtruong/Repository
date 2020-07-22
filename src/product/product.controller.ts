import {
  Body,
  Controller,
  Delete,
  Get, HttpException, HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  ProductCreateRequest, ProductDeleteRequest,
  ProductGetSingleRequest,
  ProductUpdateRequest,
} from '../interface/product/product.request';
import { ProductResponseInterface } from '../interface/product/product.response';
import { ProductInterface } from './product.model';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create( @Body() req: ProductCreateRequest): Promise<ProductResponseInterface> {
    try {
      return await this.productService.create(req.categoryId, req.name, req.code, req.originPrice, req.price, req.image, req.information, req.evaluation);
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  async getAll(): Promise<ProductInterface[]> {
    try {
      return await this.productService.getAll();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Get(':id')
  async getSingle(@Body() req: ProductGetSingleRequest): Promise<ProductResponseInterface> {
    try {
      return await this.productService.getSingle(req.id);
    } catch(e) {
      throw new HttpException(`Not found productId ${req.id}`, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  async update(@Body() req: ProductUpdateRequest): Promise<ProductResponseInterface> {
    try {
      return await this.productService.update(req.id, req.originPrice, req.price, req.image, req.information, req.evaluation);
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Delete(':id')
  async delete(@Body() req: ProductDeleteRequest): Promise<boolean> {
    try {
      return await this.productService.delete(req.id);
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
