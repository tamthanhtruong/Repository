import { Injectable } from '@nestjs/common';
import { isEmpty, isMongoId, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { RoleService } from '../core/user/role/role.service';

@Injectable()
@ValidatorConstraint({async: true })
export class IdRoleExist implements ValidatorConstraintInterface {

  constructor(private readonly roleService: RoleService) {}

  async validate(id: string): Promise<boolean> {
    if (isEmpty(id)) return false;
    if (!isMongoId(id)) return false;
    return await this.roleService.checkExist(id);
  }

  defaultMessage() {
    return '($property): ($value) is not exist!';
  }
}
