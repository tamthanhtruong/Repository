import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DetailExportInterface } from './detail-export.model';
import { DetailExportResponseInterface } from '../../../interface/export/detail-export/detail-export.response';

@Injectable()
export class DetailExportService {

  constructor(@InjectModel('detail-exports') private readonly model: Model<DetailExportInterface>,) {}

  /* Additional functions */
  async findDetail(id: string): Promise<DetailExportInterface> {
    let detailDoc;
    try {
      // Find Product document by id
      detailDoc = await this.model.findById(id).exec();
    } catch(e) {
      throw new NotFoundException(` DetailID: ${id} is not exist `); // 404
    }
    if(!detailDoc) throw new NotFoundException(` DetailID: ${id} is not exist `); // 404

    return detailDoc;
  }

  async checkExist(id: string): Promise<boolean> {
    return await this.model.exists({ _id : id});
  }

  /* Main functions */
  async create(
                exportId: string,
                productId: string,
                unitProductId: string,
                quantity: number,
                price: number): Promise<DetailExportResponseInterface> {

    try {
      // Create new export document
      const newDetail = new this.model({exportId, productId, unitProductId, quantity, price});
      return await newDetail.save();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getAll(): Promise<DetailExportInterface[]> {
    try {
      // Find documents
      return await this.model.find().exec();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getSingle(id: string): Promise<DetailExportResponseInterface> {
      // Find detail-export document by id
      return await this.findDetail(id);
  }

  async delete(id: string): Promise<boolean> {
    // Check export is existing
    const detail = await this.findDetail(id);
    try {
      // Add deletedAt field
      detail.deletedAt = Date.now();
      await detail.save();
      return true;
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getDetailExport(exportId: string): Promise<DetailExportInterface[]> {
    try {
      // Then find documents that same exportId
      return await this.model.find({ exportId : exportId }).exec();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }
}
