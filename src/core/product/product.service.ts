import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductInterface } from './product.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryService } from './category/category.service';
import { ProductResponseInterface } from '../../interface/product/product.response';
import { UnitProductService } from '../unit-product/unit-product.service';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private readonly model: Model<ProductInterface>,
              private readonly categoryService: CategoryService,
              private readonly unitProductService: UnitProductService) {}

  /* Additional functions */
  async findProduct(id: string): Promise<ProductInterface> {
    let productDoc;
    try {
      // Find Product document by id
      productDoc = await this.model.findById(id).exec();
    } catch(error) {
      throw new NotFoundException('Could not find product.'); // 404
    }
    if(!productDoc) {
      throw new NotFoundException('Could not find product.'); // 404
    }
    return productDoc;
  }

  /* Main function */
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

    // Check Category is existing
    await this.categoryService.findCategory(categoryId);
    // Check Unit-Product is existing
    await this.unitProductService.findUnitProduct(unitProductId);
    // Create the new product
    const newProduct = new this.model({categoryId, unitProductId, name, code, originPrice, price, image, information, evaluation, status});
    return await newProduct.save();
  }

  async getAll(): Promise<ProductInterface[]> {
    // Find documents
    return await this.model.find().exec();
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
                status: string): Promise<ProductResponseInterface> {

    // Find product document by id
    const product = await this.findProduct(id);
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
  }

  async delete(id: string): Promise<boolean> {
    // Find product document by id
    const product = await this.findProduct(id);
    // Add deletedAt field
    product.deletedAt = Date.now();
    await product.save();
    return true;
  }
}
