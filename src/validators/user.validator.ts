import { Injectable } from '@nestjs/common';
import { isEmpty, isMongoId, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UserService } from '../core/user/user.service';

@Injectable()
@ValidatorConstraint({async: true })
export class IdUserExist implements ValidatorConstraintInterface {

  constructor(private readonly userService: UserService) {}

  async validate(id: string): Promise<boolean> {
    if (isEmpty(id)) return false;
    if (!isMongoId(id)) return false;
    return await this.userService.checkExist(id);
  }

  defaultMessage() {
    return '($property): ($value) is not exist!';
  }
}
