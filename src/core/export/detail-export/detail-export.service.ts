import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async create( exportId: string, productId: string, unitProductId: string, quantity: number, price: number): Promise<DetailExportResponseInterface> {
    // Check Export is existing
    await this.exportService.findId(exportId);
    // Check Product is existing
    await this.productService.findId(productId);
    // Check Unit-Product is existing
    await this.unitProductService.findId(unitProductId);
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
    return this.model.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    // Find detail-export document by id
    const findDetail =  await this.model.findById(id);
    if (!findDetail) throw new HttpException(`Not findDetail ${id} in DB`, HttpStatus.NOT_FOUND);

    await this.model.deleteOne({_id: id}).exec();
    return true;
  }

  async getDetail(exportId: string): Promise<DetailExportInterface[]> {
    // Check export is existing
    await this.exportService.findId(exportId);

    return await this.model.find({ exportId : exportId }).exec();
  }
}
