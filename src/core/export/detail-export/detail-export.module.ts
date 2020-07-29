import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from '../../product/product.module';
import { UnitProductModule } from '../../unit-product/unit-product.module';
import { DetailExportSchema } from './detail-export.model';
import { ExportModule } from '../export.module';
import { DetailExportController } from './detail-export.controller';
import { DetailExportService } from './detail-export.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'detail-exports', schema: DetailExportSchema}]), ExportModule, ProductModule, UnitProductModule],
  controllers: [DetailExportController],
  providers: [DetailExportService],
  exports: [DetailExportService],
})
export class DetailExportModule {}
