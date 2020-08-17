import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoleInterface } from './role.model';
import { Model } from 'mongoose';
import { RoleResponseInterface } from '../../../interface/user/role/role.response';

@Injectable()
export class RoleService {

  constructor(@InjectModel('roles') private readonly model: Model<RoleInterface>) {}

  /* additional functions */
  async findRole(id: string): Promise<RoleInterface> {
    let roleDoc;
    try {
      // Find Role document by id
      roleDoc = await this.model.findById(id).exec();
    } catch(e) {
      throw new NotFoundException(` RoleID: ${id} is not exist `); // 404
    }
    if(!roleDoc) throw new NotFoundException(` RoleID: ${id} is not exist `); // 404

    return roleDoc;
  }

  async checkExist(id: string): Promise<boolean> {
    return await this.model.exists({ _id : id});
  }

  /* Main functions */
  async create(name: string, description: string, status: string): Promise<RoleResponseInterface> {
    try {
      // Create the new role
      const newRole = new this.model({name, description, status});
      return await newRole.save();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getAll(): Promise<RoleInterface[]> {
    try {
      // Find documents
      return await this.model.find().exec();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getSingle(id: string): Promise<RoleResponseInterface> {
      // Finds a single document by id
      return await this.findRole(id);
  }

  async update(id: string, name:string, description: string, status: string): Promise<RoleResponseInterface> {
    // Find role document by id
    const role = await this.findRole(id);
    try {
      // Then update
      role.name = name;
      role.description = description;
      role.status = status;
      role.updatedAt = Date.now();

      return await role.save();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async delete(id: string): Promise<boolean> {
    // Find role document by id
    const role = await this.findRole(id);
    try {
      // Add deletedAt property
      role.deletedAt = Date.now();
      await role.save();
      return true;
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }
}
