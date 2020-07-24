import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './product.model';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CategoryModule } from './category/category.module';
import { UnitProductModule } from '../unit-product/unit-product.module';

// @Module() là Decorator
@Module({
  imports: [MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}]), CategoryModule, UnitProductModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
