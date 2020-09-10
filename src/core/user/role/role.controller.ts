import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {
  RoleCreateRequest,
  RoleDeleteRequest,
  RoleGetSingleRequest,
  RoleUpdateRequest,
} from '../../../interface/user/role/role.request';
import { RoleService } from './role.service';
import { RoleResponseInterface } from '../../../interface/user/role/role.response';

@Controller('role')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  /** Create Role
   *
   * @param req
   *
   * @return RoleResponseInterface
   */
  @Post('create')
  async create(@Body() req: RoleCreateRequest ): Promise<RoleResponseInterface> {
    return await this.service.create(req.name, req.description, req.status);
  }

  /** Get All Role
   *
   * @return RoleResponseInterface[]
   */
  @Get('get-all')
  async getAll(): Promise<RoleResponseInterface[]> {
    return await this.service.getAll();
  }

  /** Get Single Role
   *
   * @param req
   *
   * @return RoleResponseInterface
   */
  @Get('get-single/:id')
  async getSingle(@Param() req: RoleGetSingleRequest): Promise<RoleResponseInterface> {
      return await this.service.getSingle(req.id);
  }

  /** Update Role
   *
   * @param id
   * @param req
   *
   * @return RoleResponseInterface
   */
  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() req: RoleUpdateRequest ): Promise<RoleResponseInterface> {
    return await this.service.update(id, req.name, req.description, req.status);
  }

  /** Soft Delete Role
   *
   * @param req
   *
   * @return boolean
   */
  @Delete('delete/:id')
  async delete(@Param() req: RoleDeleteRequest): Promise<boolean> {
    return await this.service.delete(req.id);
  }

  /** Get All Soft-Delete-Role
   *
   * @return RoleResponseInterface[]
   */
  @Get('get-all-soft-delete')
  async getAllSoftDelete(): Promise<RoleResponseInterface[]> {
    return await this.service.getAllSoftDelete();
  }
}
