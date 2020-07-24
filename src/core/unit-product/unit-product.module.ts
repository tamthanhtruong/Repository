import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UnitProductController } from './unit-product.controller';
import { UnitProductService } from './unit-product.service';
import { UnitProductSchema } from './unit-product.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Unit-Product', schema: UnitProductSchema}]),],
  controllers: [UnitProductController],
  providers: [UnitProductService],
  exports: [UnitProductService],
})
export class UnitProductModule {}
