import { UserInterface } from './user.model';
import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoleService } from './role/role.service';
import { UserResponseInterface } from '../../interface/user/user.response';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private readonly model: Model<UserInterface>,
              private readonly roleService: RoleService) {}

  /* Additional functions */
  async findUser(id: string): Promise<UserInterface> {
    let userDoc;
    try {
      // Find User document by id
      userDoc = await this.model.findById(id).exec();
    } catch(e) {
      throw new NotFoundException(` UserID: ${id} is not exist `); // 404
    }
    if(!userDoc) throw new NotFoundException(` UserID: ${id} is not exist `); // 404

    return userDoc;
  }

  /* Main functions */
  async create(roleId, account, password, name, sex, email, dateOfBirth, address, phone, status): Promise<UserResponseInterface> {
    // Check roleId is existing
    await this.roleService.findRole(roleId);
    try {
      // Create the new user
      const newUser = new this.model({roleId, account, password, name, sex, email, dateOfBirth, address, phone, status});
      return await newUser.save();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getAll(): Promise<UserInterface[]> {
    try {
      // Find documents
      return await this.model.find().exec();
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async getSingle(id: string): Promise<UserResponseInterface> {
      // Finds a single document by id
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
                status?:string): Promise<UserResponseInterface> {

    //Find user document by id
    const user = await this.findUser(id);

    try {
      // Then update
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
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }

  async delete(id: string): Promise<boolean> {
    // Find user document by id
    const user = await this.findUser(id);
    try {
      // Add deletedAt field
      user.deletedAt = Date.now();
      await user.save();
      return true;
    } catch(e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);//403
    }
  }
}
