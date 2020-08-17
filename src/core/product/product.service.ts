import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductInterface } from './product.model';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ProductResponseInterface } from '../../interface/product/product.response';

@Injectable()
export class ProductService {

  constructor(@InjectModel('Product') private readonly model: Model<ProductInterface>,) {}

  /* Additional functions */
  async findProduct(id: string): Promise<ProductInterface> {
    let productDoc;
    try {
      // Find Product document by id
      productDoc = await this.model.findById(id).exec();
    } catch(e) {
      throw new NotFoundException(` ProductID: ${id} is not exist `); // 404
    }
    if(!productDoc) throw new NotFoundException(` ProductID: ${id} is not exist `); // 404

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

    // Create the new product
    try {
      const newProduct = new this.model({categoryId, unitProductId, name, code, originPrice, price, image, information, evaluation, status});
      return await newProduct.save();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getAll(): Promise<ProductInterface[]> {
    try {
      return await this.model.find().exec();
    } catch (e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getSingle(id: string): Promise<ProductResponseInterface> {
      // Finds a single document by id
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
                status: string) {

    // Find product document by id
    const product = await this.findProduct(id);
    try {
      // Then update
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
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async delete(id: string): Promise<boolean> {
    // Find product document by id
    const product = await this.findProduct(id);
    try {
      // Add deletedAt field
      product.deletedAt = Date.now();
      await product.save();
      return true;
    } catch (e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }
}
