import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {
  RoleCreateRequest,
  RoleDeleteRequest,
  RoleGetSingleRequest,
  RoleUpdateRequest,
} from '../../../interface/user/role/role.request';
import { RoleService } from './role.service';
import { RoleResponseInterface } from '../../../interface/user/role/role.response';
import { RoleInterface } from './role.model';

@Controller('role')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @Post()
  async create(@Body() req: RoleCreateRequest ): Promise<RoleResponseInterface> {
    return await this.service.create(req.name, req.description, req.status);
  }

  @Get()
  async getAll(): Promise<RoleInterface[]> {
    return await this.service.getAll();
  }

  @Get(':id')
  async getSingle(@Param() req: RoleGetSingleRequest): Promise<RoleResponseInterface> {
      return await this.service.getSingle(req.id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() req: RoleUpdateRequest ): Promise<RoleResponseInterface> {
    return await this.service.update(id, req.name, req.description, req.status);
  }

  @Delete(':id')
  async delete(@Param() req: RoleDeleteRequest): Promise<boolean> {
    return await this.service.delete(req.id);
  }
}
