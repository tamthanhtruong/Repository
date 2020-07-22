import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductInterface } from './product.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryService } from './category/category.service';
import { ProductResponseInterface } from '../interface/product/product.response';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private readonly model: Model<ProductInterface>,
              private readonly categoryService: CategoryService,) {}


  async create(
    categoryId: string,
    name: string,
    code: string,
    originPrice: number,
    price: number,
    image: string,
    information: string,
    evaluation: string): Promise<ProductResponseInterface> {

    // Check Category is existing
    const categoryInfo = await this.categoryService.findId(categoryId);
    // Create the new product
    const newProduct = new this.model({categoryId, name, code, originPrice, price, image, information, evaluation});
    return await newProduct.save();
  }

  async getAll(): Promise<ProductInterface[]> {
    // Find documents
    return await this.model.find().exec();
  }

  async getSingle(id: string): Promise<ProductResponseInterface> {
    // Finds a single document by id
    return this.model.findById(id);
  }

  async update(id: string, originPrice: number, price: number, image: string, information: string, evaluation: string): Promise<ProductResponseInterface> {
    // Finds a single document by its _id field.
    const findProduct = await this.model.findById(id);
    // then update
    if (findProduct) {
      findProduct.originPrice = originPrice;
      findProduct.price = price;
      findProduct.image = image;
      findProduct.information = information;
      findProduct.evaluation = evaluation;

      return await findProduct.save();
    } else {
      throw new HttpException(`Not found productId ${id}`, HttpStatus.NOT_FOUND);
    }
  }

  async delete(id: string): Promise<boolean> {
    // Finds a single document by id
    const findProduct = await this.model.findById(id);
    if (findProduct){
      // Add deleteAt argument
      findProduct.deletedAt = Date.now();
      await findProduct.save();
      return true;
    } else {
      throw new HttpException(`Not found productId ${id}`, HttpStatus.NOT_FOUND);
    }
  }


}
