import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DetailImportInterface } from './detail-import.model';
import { Model } from 'mongoose';
import { DetailImportResponseInterface } from '../../../interface/import/detail-import/detail-import.response';

@Injectable()
export class DetailImportService {

  constructor(@InjectModel('detail-imports') private readonly model: Model<DetailImportInterface>,) {}

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

  async checkExist(id: string): Promise<boolean> {
    return await this.model.exists({ _id : id});
  }

  /* Main functions */
  async create(
                importId: string,
                productId: string,
                unitProductId: string,
                quantity: number,
                price: number ): Promise<DetailImportResponseInterface> {
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

  async getDetailImport(importId: string): Promise<DetailImportInterface[]> {
    try {
      // Find documents that same importId
      return await this.model.find({ importId : importId }).exec();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }
}
