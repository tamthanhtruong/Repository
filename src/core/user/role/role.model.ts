import * as mongoose from 'mongoose';
import { RoleStatusEnum } from '../../../enums/enum';

export const RoleSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
  status: { type: String, enum: Object.values(RoleStatusEnum as object), default: RoleStatusEnum.ACTIVE },
  deletedAt: Number,
});

export interface RoleInterface extends mongoose.Document {
  readonly _id: string;
  name: string;
  description: string;
  createdAt?: number;
  updatedAt?: number;
  status: string;
  deletedAt?: number;
}
