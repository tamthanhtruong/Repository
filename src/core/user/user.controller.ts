import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateRequest, UserUpdateRequest } from '../../interface/user/user.request';
import { UserResponseInterface } from '../../interface/user/user.response';
import { UserInterface } from './user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() req: UserCreateRequest): Promise<UserResponseInterface> {
    return await this.userService.create( req.roleId,
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

  @Get()
  async getAll(): Promise<UserInterface[]> {
    return await this.userService.getAll();
  }

  @Get(':id')
  async getSingle(@Param('id') id: string): Promise<UserResponseInterface> {
      return await this.userService.getSingle(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() req: UserUpdateRequest): Promise<UserResponseInterface> {
    return await this.userService.update( id,
                                          req.roleId,
                                          req.account,
                                          req.password,
                                          req.name,
                                          req.sex,
                                          req.email,
                                          req.dateOfBirth,
                                          req.address,
                                          req.phone,
                                          req.status);}

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return await this.userService.delete(id);
  }
}
