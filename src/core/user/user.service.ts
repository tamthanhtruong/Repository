import { GatewayTimeoutException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserInterface } from './user.model';
import { UserResponseInterface } from '../../interface/user/user.response';

@Injectable()
export class UserService {

  constructor(@InjectModel('users') private readonly model: Model<UserInterface>,) {}

  /* Additional functions */
  async findUser(id: string): Promise<UserInterface> {
    let userDoc;
    try {
      userDoc = await this.model.findById(id).exec();
    } catch(e) {
      throw new NotFoundException(` UserID: ${id} is not exist `);
    }
    if(!userDoc) throw new NotFoundException(` UserID: ${id} is not exist `);
    return userDoc;
  }

  async checkExist(id: string): Promise<boolean> {
    return await this.model.exists({ _id : id});
  }

  /* Main functions */
  async create(roleId: string,
               account: string,
               password: string,
               name: string,
               sex: string,
               email: string,
               dateOfBirth: string,
               address: string,
               phone: string,
               status: string ): Promise<UserResponseInterface> {
    try {
      const newUser = new this.model({roleId, account, password, name, sex, email, dateOfBirth, address, phone, status});
      return await newUser.save();
    } catch(e) {
      throw new GatewayTimeoutException('UserService: create() Query Error.');
    }
  }

  async getAll(): Promise<UserResponseInterface[]> {
    try {
      return await this.model.find({ deletedAt: null }).exec();
    } catch(e) {
      throw new GatewayTimeoutException('UserService: getAll() Query Error.');
    }
  }

  async getAllActive(): Promise<UserResponseInterface[]> {
    try {
      return await this.model.find({ status: 'Active' }).exec();
    } catch(e) {
      throw new GatewayTimeoutException('UserService: getAllActive() Query Error.');
    }
  }

  async getAllInactive(): Promise<UserResponseInterface[]> {
    try {
      return await this.model.find({ status: 'Inactive' }).exec();
    } catch(e) {
      throw new GatewayTimeoutException('UserService: getAllInactive() Query Error.');
    }
  }

  async getAllMale(): Promise<UserResponseInterface[]> {
    try {
      return await this.model.find({ sex: 'Male' }).exec();
    } catch(e) {
      throw new GatewayTimeoutException('UserService: getAllMale() Query Error.');
    }
  }

  async getAllFemale(): Promise<UserResponseInterface[]> {
    try {
      return await this.model.find({ sex: 'Female' }).exec();
    } catch(e) {
      throw new GatewayTimeoutException('UserService: getAllFemale() Query Error.');
    }
  }

  async getAllMaleActive(): Promise<UserResponseInterface[]> {
    try {
      return await this.model.find({ sex: 'Male', status: 'Active' }).exec();
    } catch(e) {
      throw new GatewayTimeoutException('UserService: getAllMaleActive() Query Error.');
    }
  }

  async getAllFemaleActive(): Promise<UserResponseInterface[]> {
    try {
      return await this.model.find({ sex: 'Female', status: 'Active' }).exec();
    } catch(e) {
      throw new GatewayTimeoutException('UserService: getAllFemaleActive() Query Error.');
    }
  }

  async getAllMaleInactive(): Promise<UserResponseInterface[]> {
    try {
      return await this.model.find({ sex: 'Male', status: 'Inactive' }).exec();
    } catch(e) {
      throw new GatewayTimeoutException('UserService: getAllMaleInactive() Query Error.');
    }
  }

  async getAllFemaleInactive(): Promise<UserResponseInterface[]> {
    try {
      return await this.model.find({ sex: 'Female', status: 'Inactive' }).exec();
    } catch(e) {
      throw new GatewayTimeoutException('UserService: getAllFemaleInactive() Query Error.');
    }
  }

  async getSingle(id: string): Promise<UserResponseInterface> {
      return await this.findUser(id);
  }

  async update( id:string,
                roleId:string,
                account:string,
                password:string,
                name:string,
                sex:string,
                email:string,
                dateOfBirth:string,
                address:string,
                phone:string,
                status?:string ): Promise<UserResponseInterface> {

    const user = await this.findUser(id);
    try {
      user.roleId = roleId;
      user.account = account;
      user.password = password;
      user.name = name;
      user.sex = sex;
      user.email = email;
      user.dateOfBirth = dateOfBirth;
      user.address = address;
      user.phone = phone;
      user.status = status;
      user.updatedAt = Date.now();

      return await user.save();
    } catch(e) {
      throw new GatewayTimeoutException('UserService: update() Query Error.');
    }
  }

  async delete(id: string): Promise<boolean> {
    const user = await this.findUser(id);
    try {
      user.deletedAt = Date.now();
      await user.save();
      return true;
    } catch(e) {
      throw new GatewayTimeoutException('UserService: delete() Query Error.');
    }
  }

  async getAllSoftDelete(): Promise<UserResponseInterface[]> {
    try {
      return await this.model.find({ deletedAt : { $ne: null } }).exec();
    } catch (e) {
      throw new GatewayTimeoutException('UserService: getAllSoftDelete() Query Error.');
    }
  }
}
