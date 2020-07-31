import { Injectable, NotFoundException } from '@nestjs/common';
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
    } catch(error) {
      throw new NotFoundException('Could not find category.'); // 404
    }
    if(!categoryDoc) {
      throw new NotFoundException('Could not find category.'); // 404
    }
    return categoryDoc;
  }

  /* Main function */
  async create(name: string, status: string): Promise<CategoryResponseInterface> {
    // Create the new category
    const newCategory = new this.model({name, status});
    return await newCategory.save();
  }

  async getAll(): Promise<CategoryInterface[]> {
    // Find documents
    return await this.model.find().exec();
  }

  async getSingle(id: string): Promise<CategoryResponseInterface> {
    // Finds a single document by id
    return await this.findCategory(id);
  }

  async update(id: string, name : string, status: string): Promise<CategoryResponseInterface> {
    // Find Category document by id
    const category = await this.findCategory(id);
    // Then update
    category.name = name;
    category.status = status;
    category.updatedAt = Date.now();

    return await category.save();
  }

  async delete(id: string): Promise<boolean> {
    // Find Category document by id
    const category = await this.findCategory(id);
    // Add deletedAt field
    category.deletedAt = Date.now();
    await category.save();
    return true;
  }
}
