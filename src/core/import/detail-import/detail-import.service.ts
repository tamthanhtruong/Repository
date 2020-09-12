import { GatewayTimeoutException, Injectable, NotFoundException } from '@nestjs/common';
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
      detailDoc = await this.model.findById(id).exec();
    } catch(e) {
      throw new NotFoundException(` DetailImportID: ${id} is not exist `);
    }
    if(!detailDoc) throw new NotFoundException(` DetailImportID: ${id} is not exist `);
    return detailDoc;
  }

  async checkExist(id: string): Promise<boolean> {
    return await this.model.exists({ _id : id});
  }

  /* Main functions */
  async create( importId: string,
                productId: string,
                unitProductId: string,
                quantity: number,
                price: number ): Promise<DetailImportResponseInterface> {
    try {
      const newDetail = new this.model({importId, productId, unitProductId, quantity, price});
      return await newDetail.save();
    } catch(e) {
      throw new GatewayTimeoutException('DetailImportService: create() Query Error.');
    }
  }

  async getAll(): Promise<DetailImportResponseInterface[]> {
    try {
      return await this.model.find({ deletedAt: null }).exec();
    } catch(e) {
      throw new GatewayTimeoutException('DetailImportService: getAll() Query Error.');
    }
  }

  async getSingle(id: string): Promise<DetailImportResponseInterface> {
      return await this.findDetail(id);
  }

  async delete(id: string): Promise<boolean> {
    const detail = await this.findDetail(id);
    try {
      detail.deletedAt = Date.now();
      await detail.save();
      return true;
    } catch(e) {
      throw new GatewayTimeoutException('DetailImportService: delete() Query Error.');
    }
  }

  async getListImport(importId: string): Promise<DetailImportResponseInterface[]> {
    try {
      return await this.model.find({ importId : importId , deletedAt: null }).exec();
    } catch(e) {
      throw new GatewayTimeoutException('DetailImportService: getListImport() Query Error.');
    }
  }

  async getAllSoftDelete(): Promise<DetailImportResponseInterface[]> {
    try {
      return await this.model.find({ deletedAt : { $ne: null } }).exec();
    } catch (e) {
      throw new GatewayTimeoutException('DetailImportService: getAllSoftDelete() Query Error.');
    }
  }
}
