import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
    } catch(e) {
      throw new NotFoundException(` DetailID: ${id} is not exist `); // 404
    }
    if(!detailDoc) throw new NotFoundException(` DetailID: ${id} is not exist `); // 404

    return detailDoc;
  }

  /* Main functions */
  async create( importId: string, productId: string, unitProductId: string, quantity: number, price: number): Promise<DetailImportResponseInterface> {
    // Check Import is existing
    await this.importService.findImport(importId);
    // Check Product is existing
    await this.productService.findProduct(productId);
    // Check Unit-Product is existing
    await this.unitProductService.findUnitProduct(unitProductId);
    try {
      // Create new import document
      const newDetail = new this.model({importId, productId, unitProductId, quantity, price});
      return await newDetail.save();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getAll(): Promise<DetailImportInterface[]> {
    try {
      // Find documents
      return await this.model.find().exec();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getSingle(id: string): Promise<DetailImportResponseInterface> {
      // Find detail-import document by id
      return await this.findDetail(id);
  }

  async delete(id: string): Promise<boolean> {
    // Check import is existing
    await this.findDetail(id);
    try {
      // Then delete
      await this.model.deleteOne({_id: id}).exec();
      return true;
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getDetail(importId: string): Promise<DetailImportInterface[]> {
    // Check Import is existing
    await this.importService.findImport(importId);

    try {
      // Then find documents that same importId
      return await this.model.find({ importId : importId }).exec();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }
}
