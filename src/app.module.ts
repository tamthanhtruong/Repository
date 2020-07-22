import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './product/category/category.module';
@Module({
  imports: [ProductModule, CategoryModule, MongooseModule.forRoot('mongodb+srv://tam:5jZl42DhSE5FIe7i@cluster0-r8k78.mongodb.net/sale?retryWrites=true&w=majority'),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
