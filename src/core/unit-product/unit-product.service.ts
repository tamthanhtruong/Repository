import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UnitProductInterface } from './unit-product.model';
import { Model } from 'mongoose';
import { UnitProductResponseInterface } from '../../interface/unit-product/unit-product.response';

@Injectable()
export class UnitProductService {
  constructor(@InjectModel('Unit-Product') private readonly model: Model<UnitProductInterface>) {}

  async create(name: string): Promise<UnitProductResponseInterface> {
    const newUnit = new this.model(name);
    return await newUnit.save();
  }

  async getAll(): Promise<UnitProductResponseInterface[]> {
    return this.model.find().exec();
  }

  async getSingle(id: string): Promise<UnitProductResponseInterface>  {
    return this.model.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    // Finds a single document by id
    const unitProduct = await this.model.findById(id);
    if(!unitProduct){
      throw new HttpException(`Not found unitProductId ${id}`, HttpStatus.NOT_FOUND);
    }
    unitProduct.deletedAt = Date.now();
    await unitProduct.save();
    return true;
  }

  /* additional functions */
  async findId(id: string) {
    const unitProductInfo = await this.model.findById(id);
    if(!unitProductInfo) throw new NotFoundException(`unitProduct [${id}] not exist.`);

    return unitProductInfo;
    // return this.model.findById(model => model._id === id); // error at _id
  }
}
