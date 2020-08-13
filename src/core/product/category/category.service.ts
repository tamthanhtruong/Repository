import { HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryInterface } from './category.model';
import { CategoryResponseInterface } from '../../../interface/product/category/category.response';

@Injectable()
export class CategoryService {
  constructor(@InjectModel('Category') private readonly model: Model<CategoryInterface>,) {}

  /* Additional functions */
  async findCategory(id: string): Promise<CategoryInterface> {
    let categoryDoc;
    try {
      // Find Category document by id
      categoryDoc = await this.model.findById(id).exec();
    } catch(e) {
      throw new NotFoundException(` CategoryID: ${id} is not exist `); // 404
    }
    if(!categoryDoc)  throw new NotFoundException(` CategoryID: ${id} is not exist `); // 404

    return categoryDoc;
  }

  // async checkExist(id: string): Promise<boolean> {
  //   // const categoryDoc = await this.model.findById(id).exec();
  //   return true;
  // }

  /* Main functions */
  async create(name: string, status: string): Promise<CategoryResponseInterface> {
    try {
      // Create the new category
      const newCategory = new this.model({name, status});
      return await newCategory.save();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN); //403
    }
  }

  async getAll(): Promise<CategoryInterface[]> {
    try {
      // Find documents
      return await this.model.find().exec();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getSingle(id: string): Promise<CategoryResponseInterface> {
      // Finds a single document by id
      return await this.findCategory(id);
  }

  async update(id: string, name : string, status: string): Promise<CategoryResponseInterface> {
    // Find Category document by id
    const category = await this.findCategory(id);
    try {
      // Then update
      category.name = name;
      category.status = status;
      category.updatedAt = Date.now();

      return await category.save();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async delete(id: string): Promise<boolean> {
    // Find Category document by id
    const category = await this.findCategory(id);
    try {
      // Add deletedAt field
      category.deletedAt = Date.now();
      await category.save();
      return true;
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }
}
