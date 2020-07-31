import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DetailImportInterface } from './detail-import.model';
import { Model } from 'mongoose';
import { DetailImportResponseInterface } from '../../../interface/import/detail-import/detail-import.response';
import { ImportService } from '../import.service';
import { UnitProductService } from '../../unit-product/unit-product.service';
import { ProductService } from '../../product/product.service';

@Injectable()
export class DetailImportService {
  constructor(@InjectModel('detail-imports') private readonly model: Model<DetailImportInterface>,
                                                    private readonly importService: ImportService,
                                                    private readonly productService: ProductService,
                                                    private readonly unitProductService: UnitProductService) {}

  /* Additional functions */
  async findDetail(id: string): Promise<DetailImportInterface> {
    let detailDoc;
    try {
      // Find Detail-Import document by id
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
  async create( importId: string, productId: string, unitProductId: string, quantity: number, price: number): Promise<DetailImportResponseInterface> {
    // Check Import is existing
    await this.importService.findImport(importId);
    // Check Product is existing
    await this.productService.findProduct(productId);
    // Check Unit-Product is existing
    await this.unitProductService.findUnitProduct(unitProductId);
    // Create new import document
    const newDetail = new this.model({importId, productId, unitProductId, quantity, price});
    return await newDetail.save();
  }

  async getAll(): Promise<DetailImportInterface[]> {
    // Find documents
    return await this.model.find().exec();
  }

  async getSingle(id: string): Promise<DetailImportResponseInterface> {
    // Find detail-import document by id
    return await this.findDetail(id);
  }

  async delete(id: string): Promise<boolean> {
    // Check import is existing
    await this.findDetail(id);
    // Then delete
    await this.model.deleteOne({_id: id}).exec();
    return true;
  }

  async getDetail(importId: string): Promise<DetailImportInterface[]> {
    // Check Import is existing
    await this.importService.findImport(importId);
    // Then find documents that same importId
    return await this.model.find({ importId : importId }).exec();
  }
}
