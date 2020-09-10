import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryInterface } from './category.model';
import { CategoryResponseInterface } from '../../../interface/product/category/category.response';

@Injectable()
export class CategoryService {

  constructor(@InjectModel('categories') private readonly model: Model<CategoryInterface>,) {}

  /* Additional functions */
  async findCategory(id: string): Promise<CategoryInterface> {
    let categoryDoc;
    try {
      categoryDoc = await this.model.findById(id).exec();
    } catch(e) {
      throw new NotFoundException(` CategoryID: ${id} is not exist `);
    }
    if(!categoryDoc) throw new NotFoundException(` CategoryID: ${id} is not exist `);
    return categoryDoc;
  }

  async checkExist(id: string): Promise<boolean> {
    return await this.model.exists({ _id : id});
  }

  /* Main functions */
  async create(name: string, status: string): Promise<CategoryResponseInterface> {
    try {
      const newCategory = new this.model({name, status});
      return await newCategory.save();
    } catch(e) {
      throw new HttpException('Server Error.',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAll(): Promise<CategoryResponseInterface[]> {
    try {
      return await this.model.find({ deletedAt: null }).exec();
    } catch(e) {
      throw new HttpException('Server Error.',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getSingle(id: string): Promise<CategoryResponseInterface> {
      return await this.findCategory(id);
  }

  async update(id: string, name : string, status: string): Promise<CategoryResponseInterface> {
    const category = await this.findCategory(id);
    try {
      category.name = name;
      category.status = status;
      category.updatedAt = Date.now();

      return await category.save();
    } catch(e) {
      throw new HttpException('Server Error.',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string): Promise<boolean> {
    const category = await this.findCategory(id);
    try {
      category.deletedAt = Date.now();
      await category.save();
      return true;
    } catch(e) {
      throw new HttpException('Server Error.',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllSoftDelete(): Promise<CategoryResponseInterface[]> {
    try {
      return await this.model.find({ deletedAt : { $ne: null } }).exec();
    } catch (e) {
      throw new HttpException('Server Error.',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
