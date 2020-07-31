import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoleInterface } from './role.model';
import { Model } from 'mongoose';
import { RoleResponseInterface } from '../../../interface/user/role/role.response';

@Injectable()
export class RoleService {
  constructor(@InjectModel('roles') private readonly model: Model<RoleInterface>) {
  }

  /* additional functions */
  async findRole(id: string): Promise<RoleInterface> {
    let roleDoc;
    try {
      // Find Role document by id
      roleDoc = await this.model.findById(id).exec();
    } catch(error) {
      throw new NotFoundException('Could not find role.'); // 404
    }
    if(!roleDoc) {
      throw new NotFoundException('Could not find role.'); // 404
    }
    return roleDoc;
  }

  /* Main function */
  async create(name: string, description: string, status: string): Promise<RoleResponseInterface> {
    // Create the new role
    const newRole = new this.model({name, description, status});
    return await newRole.save();
  }

  async getAll(): Promise<RoleInterface[]> {
    // Find documents
    return await this.model.find().exec();
  }

  async getSingle(id: string): Promise<RoleResponseInterface> {
    // Finds a single document by id
    return this.findRole(id);
  }

  async update(id: string, name:string, description: string, status: string): Promise<RoleResponseInterface> {
    // Find role document by id
    const role = await this.findRole(id);
    // Then update
    role.name = name;
    role.description = description;
    role.status = status;
    role.updatedAt = Date.now();

    return await role.save();
  }

  async delete(id: string): Promise<boolean> {
    // Find role document by id
    const role = await this.findRole(id);
    // Add deletedAt property
    role.deletedAt = Date.now();
    await role.save();
    return true;
  }
}
