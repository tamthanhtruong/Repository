import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UnitProductInterface } from './unit-product.model';
import { Model } from 'mongoose';
import { UnitProductResponseInterface } from '../../interface/unit-product/unit-product.response';

@Injectable()
export class UnitProductService {
  constructor(@InjectModel('Unit-Product') private readonly model: Model<UnitProductInterface>) {}

  /* Additional functions */
  async findUnitProduct(id: string): Promise<UnitProductInterface> {
    let unitDoc;
    try {
      // Find Unit-product document by id
      unitDoc = await this.model.findById(id).exec();
    } catch(e) {
      throw new NotFoundException(` UnitProductID: ${id} is not exist `); // 404
    }
    if(!unitDoc) throw new NotFoundException(` UnitProductID: ${id} is not exist `); // 404

    return unitDoc;
  }

  /* Main functions */
  async create(name: string): Promise<UnitProductResponseInterface> {

    try {
      // Create the new unit-product
      const newUnit = new this.model({name});
      return await newUnit.save();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getAll(): Promise<UnitProductResponseInterface[]> {
    try {
      // Find documents
      return await this.model.find().exec();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getSingle(id: string): Promise<UnitProductResponseInterface> {
      // Finds a single document by id
      return await this.findUnitProduct(id);
  }

  async update(id: string, name: string): Promise<UnitProductResponseInterface> {
    // Find unit-product document by id
    const unitProduct = await this.findUnitProduct(id);
    try {
      // Then update
      unitProduct.name = name;
      unitProduct.updatedAt = Date.now();

      return await unitProduct.save();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async delete(id: string): Promise<boolean> {
    // Find unit-product document by id
    const unitProduct = await this.findUnitProduct(id);
    try {
      // Add deletedAt field
      unitProduct.deletedAt = Date.now();
      await unitProduct.save();
      return true;
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }
}
