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
      detailDoc = await this.model.findById(id).exec();
    } catch(e) {
      throw new NotFoundException(` DetailExportID: ${id} is not exist `);
    }
    if(!detailDoc) throw new NotFoundException(` DetailExportID: ${id} is not exist `);
    return detailDoc;
  }

  async checkExist(id: string): Promise<boolean> {
    return await this.model.exists({ _id : id});
  }

  /* Main functions */
  async create( exportId: string,
                productId: string,
                unitProductId: string,
                quantity: number,
                price: number): Promise<DetailExportResponseInterface> {

    try {
      const newDetail = new this.model({exportId, productId, unitProductId, quantity, price});
      return await newDetail.save();
    } catch(e) {
      throw new HttpException('Server Error.',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAll(): Promise<DetailExportResponseInterface[]> {
    try {
      return await this.model.find({ deletedAt: null }).exec();
    } catch(e) {
      throw new HttpException('Server Error.',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getSingle(id: string): Promise<DetailExportResponseInterface> {
      return await this.findDetail(id);
  }

  async delete(id: string): Promise<boolean> {
    const detail = await this.findDetail(id);
    try {
      detail.deletedAt = Date.now();
      await detail.save();
      return true;
    } catch(e) {
      throw new HttpException('Server Error.',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getListExport(exportId: string): Promise<DetailExportResponseInterface[]> {
    try {
      return await this.model.find({ exportId : exportId, deletedAt: null }).exec();
    } catch(e) {
      throw new HttpException('Server Error.',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllSoftDelete(): Promise<DetailExportResponseInterface[]> {
    try {
      return await this.model.find({ deletedAt : { $ne: null } }).exec();
    } catch (e) {
      throw new HttpException('Server Error.',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
