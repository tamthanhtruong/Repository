import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UnitProductService } from '../../unit-product/unit-product.service';
import { ProductService } from '../../product/product.service';
import { DetailExportInterface } from './detail-export.model';
import { ExportService } from '../export.service';
import { DetailExportResponseInterface } from '../../../interface/export/detail-export/detail-export.response';

@Injectable()
export class DetailExportService {
  constructor(@InjectModel('detail-exports') private readonly model: Model<DetailExportInterface>,
              private readonly exportService: ExportService,
              private readonly productService: ProductService,
              private readonly unitProductService: UnitProductService) {}

  /* Additional functions */
  async findDetail(id: string): Promise<DetailExportInterface> {
    let detailDoc;
    try {
      // Find Detail-Export document by id
      detailDoc = await this.model.findById(id).exec();
    } catch(error) {
      throw new NotFoundException('Could not find product.'); // 404
    }
    if(!detailDoc) {
      throw new NotFoundException('Could not find product.'); // 404
    }
    return detailDoc;
  }

  /* Main function */
  async create( exportId: string, productId: string, unitProductId: string, quantity: number, price: number): Promise<DetailExportResponseInterface> {
    // Check Export is existing
    await this.exportService.findExport(exportId);
    // Check Product is existing
    await this.productService.findProduct(productId);
    // Check Unit-Product is existing
    await this.unitProductService.findUnitProduct(unitProductId);
    // Create new export document
    const newDetail = new this.model({exportId, productId, unitProductId, quantity, price});
    return await newDetail.save();
  }

  async getAll(): Promise<DetailExportInterface[]> {
    // Find documents
    return await this.model.find().exec();
  }

  async getSingle(id: string): Promise<DetailExportResponseInterface> {
    // Find detail-export document by id
    return this.findDetail(id);
  }

  async delete(id: string): Promise<boolean> {
    // Check export is existing
    await this.findDetail(id);
    // Then delete
    await this.model.deleteOne({_id: id}).exec();
    return true;
  }

  async getDetail(exportId: string): Promise<DetailExportInterface[]> {
    // Check export is existing
    await this.exportService.findExport(exportId);
    // Then find documents that same exportId
    return await this.model.find({ exportId : exportId }).exec();
  }
}
