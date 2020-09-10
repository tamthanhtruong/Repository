import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import {
  UserCreateRequest,
  UserDeleteRequest,
  UserGetSingleRequest,
  UserUpdateRequest,
} from '../../interface/user/user.request';
import { UserResponseInterface } from '../../interface/user/user.response';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  /** Create User
   *
   * @param req
   *
   * @return UserResponseInterface
   */
  @Post('create')
  async create(@Body() req: UserCreateRequest): Promise<UserResponseInterface> {
    return await this.service.create( req.roleId,
                                      req.account,
                                      req.password,
                                      req.name,
                                      req.sex,
                                      req.email,
                                      req.dateOfBirth,
                                      req.address,
                                      req.phone,
                                      req.status);
  }

  /** Get All User
   *
   * @return UserResponseInterface[]
   */
  @Get('get-all')
  async getAll(): Promise<UserResponseInterface[]> {
    return await this.service.getAll();
  }

  /** Get Single User
   *
   * @param req
   *
   * @return UserResponseInterface
   */
  @Get('get-single/:id')
  async getSingle(@Param() req: UserGetSingleRequest): Promise<UserResponseInterface> {
      return await this.service.getSingle(req.id);
  }

  /** Update User
   *
   * @param id
   * @param req
   *
   * @return UserResponseInterface
   */
  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() req: UserUpdateRequest): Promise<UserResponseInterface> {
    return await this.service.update( id,
                                      req.roleId,
                                      req.account,
                                      req.password,
                                      req.name,
                                      req.sex,
                                      req.email,
                                      req.dateOfBirth,
                                      req.address,
                                      req.phone,
                                      req.status);
  }

  /** Soft Delete User
   *
   * @param req
   *
   * @return boolean
   */
  @Delete('delete/:id')
  async delete(@Param() req: UserDeleteRequest): Promise<boolean> {
    return await this.service.delete(req.id);
  }

  /** Get All Soft-Delete-User
   *
   * @return UserResponseInterface[]
   */
  @Get('get-all-soft-delete')
  async getAllSoftDelete(): Promise<UserResponseInterface[]> {
    return await this.service.getAllSoftDelete();
  }
}
