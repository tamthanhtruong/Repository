import { GatewayTimeoutException, Injectable, NotFoundException } from '@nestjs/common';
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
      detailDoc = await this.model.findById(id).exec();
    } catch(e) {
      throw new NotFoundException(` DetailInventoryID: ${id} is not exist `);
    }
    if(!detailDoc) throw new NotFoundException(` DetailInventoryID: ${id} is not exist `);
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
      const newDetail = new this.model({inventoryId, productId, unitProductId, quantity, price});
      return await newDetail.save();
    } catch(e) {
      throw new GatewayTimeoutException('DetailInventoryService: create() Query Error.');
    }
  }

  async getAll(): Promise<DetailInventoryResponseInterface[]> {
    try {
      return await this.model.find({ deletedAt: null }).exec();
    } catch(e) {
      throw new GatewayTimeoutException('DetailInventoryService: getAll() Query Error.');
    }
  }

  async getSingle(id: string): Promise<DetailInventoryResponseInterface> {
      return await this.findDetail(id);
  }

  async delete(id: string): Promise<boolean> {
    const detail = await this.findDetail(id);
    try {
      detail.deletedAt = Date.now();
      await detail.save();
      return true;
    } catch(e) {
      throw new GatewayTimeoutException('DetailInventoryService: delete() Query Error.');
    }
  }

  async getListInventory(inventoryId: string): Promise<DetailInventoryResponseInterface[]> {
    try {
      return await this.model.find({ inventoryId : inventoryId, deletedAt: null  }).exec();
    } catch(e) {
      throw new GatewayTimeoutException('DetailInventoryService: getListInventory() Query Error.');
    }
  }

  async getAllSoftDelete(): Promise<DetailInventoryResponseInterface[]> {
    try {
      return await this.model.find({ deletedAt : { $ne: null } }).exec();
    } catch (e) {
      throw new GatewayTimeoutException('DetailInventoryService: getAllSoftDelete() Query Error.');
    }
  }
}
