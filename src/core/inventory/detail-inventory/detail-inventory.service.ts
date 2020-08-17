import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DetailInventoryInterface } from './detail-inventory.model';
import { DetailInventoryResponseInterface } from '../../../interface/inventory/detail-inventory/detail-inventory.response';

@Injectable()
export class DetailInventoryService {

  constructor(@InjectModel('detail-inventories') private readonly model: Model<DetailInventoryInterface>,) {}

  /* Additional functions */
  async findDetail(id: string): Promise<DetailInventoryInterface> {
    let detailDoc;
    try {
      // Find Detail-Inventory document by id
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
  async create( inventoryId: string,
                productId: string,
                unitProductId: string,
                quantity: number,
                price: number ): Promise<DetailInventoryResponseInterface> {

    try {
      // Create new inventory document
      const newDetail = new this.model({inventoryId, productId, unitProductId, quantity, price});
      return await newDetail.save();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getAll(): Promise<DetailInventoryInterface[]> {
    try {
      // Find documents
      return await this.model.find().exec();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getSingle(id: string): Promise<DetailInventoryResponseInterface> {
      // Find detail-inventory document by id
      return await this.findDetail(id);
  }

  async delete(id: string): Promise<boolean> {
    // Check inventory is existing
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

  async getDetailInventory(inventoryId: string): Promise<DetailInventoryInterface[]> {
    try {
      // Then find documents that same inventoryId
      return await this.model.find({ inventoryId : inventoryId }).exec();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }
}
