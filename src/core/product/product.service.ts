import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductInterface } from './product.model';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ProductResponseInterface } from '../../interface/product/product.response';

@Injectable()
export class ProductService {

  constructor(@InjectModel('products') private readonly model: Model<ProductInterface>,) {}

  /* Additional functions */
  async findProduct(id: string): Promise<ProductInterface> {
    let productDoc;
    try {
      productDoc = await this.model.findById(id).exec();
    } catch(e) {
      throw new NotFoundException(` ProductID: ${id} is not exist `);
    }
    if(!productDoc) throw new NotFoundException(` ProductID: ${id} is not exist `);
    return productDoc;
  }

  async checkExist(id: string): Promise<boolean> {
    return await this.model.exists({ _id : id});
  }

  /* Main functions */
  async create( categoryId: string,
                unitProductId: string,
                name: string,
                code: string,
                originPrice: number,
                price: number,
                image: string,
                information: string,
                evaluation: string,
                status: string ): Promise<ProductResponseInterface> {

    try {
      const newProduct = new this.model({categoryId, unitProductId, name, code, originPrice, price, image, information, evaluation, status});
      return await newProduct.save();
    } catch(e) {
      throw new HttpException('Server Error.',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAll(): Promise<ProductResponseInterface[]> {
    try {
      return await this.model.find({ deletedAt: null }).exec();
    } catch(e) {
      throw new HttpException('Server Error.',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getSingle(id: string): Promise<ProductResponseInterface> {
      return await this.findProduct(id);
  }

  async update( id: string,
                categoryId: string,
                unitProductId: string,
                originPrice: number,
                price: number,
                image: string,
                information: string,
                evaluation: string,
                status: string): Promise<ProductResponseInterface> {

    const product = await this.findProduct(id);
    try {
      product.categoryId = categoryId;
      product.unitProductId = unitProductId;
      product.originPrice = originPrice;
      product.price = price;
      product.image = image;
      product.information = information;
      product.evaluation = evaluation;
      product.status = status;
      product.updatedAt = Date.now();

      return await product.save();
    } catch (e) {
      throw new HttpException('Server Error.',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string): Promise<boolean> {
    const product = await this.findProduct(id);
    try {
      product.deletedAt = Date.now();
      await product.save();
      return true;
    } catch (e) {
      throw new HttpException('Server Error.',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllSoftDelete(): Promise<ProductResponseInterface[]> {
    try {
      return await this.model.find({ deletedAt : { $ne: null } }).exec();
    } catch (e) {
      throw new HttpException('Server Error.',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
