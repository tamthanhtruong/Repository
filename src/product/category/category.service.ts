import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryInterface } from './category.model';
import { CategoryResponseInterface } from '../../interface/product/category/category.response';

@Injectable()
export class CategoryService {
  constructor(@InjectModel('Category') private readonly model: Model<CategoryInterface>,) {}

  async create(name: string) {
    const newCategory = new this.model({name});
    const result = await newCategory.save();
    return result.id as string;
  }

  async getAll(): Promise<CategoryInterface[]> {
    return await this.model.find().exec();
  }

  async getSingle(id: string): Promise<CategoryResponseInterface> {
    return this.model.findById(id);
  }

  async update(id: string, name : string, status: number): Promise<CategoryResponseInterface> {
    // Find Category by id
    const category = await this.model.findById(id);
    // then update
    if(category){
      category.name = name;
      category.status = status;

      return await category.save();
    } else {
      throw new HttpException(`Not found categoryId ${id}`, HttpStatus.NOT_FOUND);
    }
  }

  async delete(id: string): Promise<boolean> {
    // Find Category by id
    const findCategory = await this.model.findById(id);
    // then add deletedAt property
    findCategory.deletedAt = Date.now();
    await findCategory.save();
    return true;
  }

  /* additional functions */
  async findId(categoryId: string): Promise<CategoryResponseInterface> {
    const categoryInfo = await this.model.findById(categoryId);
    if(!categoryInfo) throw new NotFoundException(`categoryId [${categoryId}] not exist.`);

    return categoryInfo;
  }


}
