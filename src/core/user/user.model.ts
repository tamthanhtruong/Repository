import * as mongoose from 'mongoose';
import { UserSexEnum, UserStatusEnum } from '../../enums/enum';

export const UserSchema = new mongoose.Schema({
  roleId: {
    type: String,
    required: true,
    trim: String,
  },
  account: String,
  password: String,
  name: String,
  sex: { type: String, trim: true, enum: Object.values(UserSexEnum as object) },
  email: String,
  dateOfBirth: String,
  address: String,
  phone: String,
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
  status: { type: String, enum: Object.values(UserStatusEnum as object), default: UserStatusEnum.ACTIVE },
  deletedAt: Number,
});

export interface UserInterface extends mongoose.Document {
  readonly _id: string;
  roleId: string,
  account: string;
  password: string;
  name: string;
  sex: string;
  email: string;
  dateOfBirth: string;
  address: string;
  phone: string;
  createdAt?: number;
  updatedAt?: number;
  status: string;
  deletedAt?: number;
}
