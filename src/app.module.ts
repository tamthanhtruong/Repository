import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './core/product/product.module';
import { CategoryModule } from './core/product/category/category.module';
import { UnitProductModule } from './core/unit-product/unit-product.module';
@Module({
  imports: [ProductModule, CategoryModule, UnitProductModule, MongooseModule.forRoot('mongodb+srv://tam:5jZl42DhSE5FIe7i@cluster0-r8k78.mongodb.net/sale?retryWrites=true&w=majority'),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
