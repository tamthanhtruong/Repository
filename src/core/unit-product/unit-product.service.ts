import { GatewayTimeoutException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UnitProductInterface } from './unit-product.model';
import { UnitProductResponseInterface } from '../../interface/unit-product/unit-product.response';

@Injectable()
export class UnitProductService {

  constructor(@InjectModel('unit-products') private readonly model: Model<UnitProductInterface>) {}

  /* Additional functions */
  async findUnitProduct(id: string): Promise<UnitProductInterface> {
    let unitDoc;
    try {
      unitDoc =  await this.model.findById(id).exec();
    } catch(e) {
      throw new NotFoundException(` UnitProductID: ${id} is not exist `);
    }
    if(!unitDoc) throw new NotFoundException(` UnitProductID: ${id} is not exist `);
    return unitDoc;
  }

  async checkExist(id: string): Promise<boolean> {
    return await this.model.exists({ _id : id});
  }

  /* Main functions */
  async create(name: string): Promise<UnitProductResponseInterface> {
    try {
      const newUnit = new this.model({name});
      return await newUnit.save();
    } catch(e) {
      throw new GatewayTimeoutException('UnitProductService: create() Query Error.');
    }
  }

  async getAll(): Promise<UnitProductResponseInterface[]> {
    try {
      return await this.model.find({ deletedAt: null }).exec();
    } catch(e) {
      throw new GatewayTimeoutException('UnitProductService: getAll() Query Error.');
    }
  }

  async getSingle(id: string): Promise<UnitProductResponseInterface> {
      return await this.findUnitProduct(id);
  }

  async update(id: string, name: string): Promise<UnitProductResponseInterface> {
    const unitProduct = await this.findUnitProduct(id);
    try {
      unitProduct.name = name;
      unitProduct.updatedAt = Date.now();
      return await unitProduct.save();
    } catch(e) {
      throw new GatewayTimeoutException('UnitProductService: update() Query Error.');
    }
  }

  async delete(id: string): Promise<boolean> {
    const unitProduct = await this.findUnitProduct(id);
    try {
      unitProduct.deletedAt = Date.now();
      await unitProduct.save();
      return true;
    } catch(e) {
      throw new GatewayTimeoutException('UnitProductService: delete() Query Error.');
    }
  }

  async getAllSoftDelete(): Promise<UnitProductResponseInterface[]> {
    try {
      return await this.model.find({ deletedAt : { $ne: null } }).exec();
    } catch (e) {
      throw new GatewayTimeoutException('UnitProductService: getAllSoftDelete() Query Error.');
    }
  }
}
