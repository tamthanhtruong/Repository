import { GatewayTimeoutException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleInterface } from './role.model';
import { RoleResponseInterface } from '../../../interface/user/role/role.response';

@Injectable()
export class RoleService {

  constructor(@InjectModel('roles') private readonly model: Model<RoleInterface>) {}

  /* Additional functions */
  async findRole(id: string): Promise<RoleInterface> {
    let roleDoc;
    try {
      roleDoc = await this.model.findById(id).exec();
    } catch(e) {
      throw new NotFoundException(` RoleID: ${id} is not exist `);
    }
    if(!roleDoc) throw new NotFoundException(` RoleID: ${id} is not exist `);
    return roleDoc;
  }

  async checkExist(id: string): Promise<boolean> {
    return await this.model.exists({ _id : id});
  }

  /* Main functions */
  async create(name: string, description: string, status: string): Promise<RoleResponseInterface> {
    try {
      const newRole = new this.model({name, description, status});
      return await newRole.save();
    } catch(e) {
      throw new GatewayTimeoutException('RoleService: create() Query Error.');
    }
  }

  async getAll(): Promise<RoleResponseInterface[]> {
    try {
      return await this.model.find({ deletedAt: null }).exec();
    } catch(e) {
      throw new GatewayTimeoutException('RoleService: getAll() Query Error.');
    }
  }

  async getAllActive(): Promise<RoleResponseInterface[]> {
    try {
      return await this.model.find({ status: 'Active' }).exec();
    } catch(e) {
      throw new GatewayTimeoutException('RoleService: getAllActive() Query Error.');
    }
  }

  async getAllInactive(): Promise<RoleResponseInterface[]> {
    try {
      return await this.model.find({ status: 'Inactive' }).exec();
    } catch(e) {
      throw new GatewayTimeoutException('RoleService: getAllInactive() Query Error.');
    }
  }

  async getSingle(id: string): Promise<RoleResponseInterface> {
      return await this.findRole(id);
  }

  async update(id: string, name:string, description: string, status: string): Promise<RoleResponseInterface> {
    const role = await this.findRole(id);
    try {
      role.name = name;
      role.description = description;
      role.status = status;
      role.updatedAt = Date.now();

      return await role.save();
    } catch(e) {
      throw new GatewayTimeoutException('RoleService: update() Query Error.');
    }
  }

  async delete(id: string): Promise<boolean> {
    const role = await this.findRole(id);
    try {
      role.deletedAt = Date.now();
      await role.save();
      return true;
    } catch(e) {
      throw new GatewayTimeoutException('RoleService: delete() Query Error.');
    }
  }

  async getAllSoftDelete(): Promise<RoleResponseInterface[]> {
    try {
      return await this.model.find({ deletedAt : { $ne: null } }).exec();
    } catch(e) {
      throw new GatewayTimeoutException('RoleService: getAllSoftDelete() Query Error.');
    }
  }
}
