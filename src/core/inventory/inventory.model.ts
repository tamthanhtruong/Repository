import * as mongoose from 'mongoose';
import { InventoryStatusEnum } from '../../enums/enum';

export const InventorySchema = new mongoose.Schema({
  invoiceNumber: Number,
  invoiceDate: { type: Number, default: Date.now },
  note: String,
  createdUserId: String,
  createdDate: { type: Number, default: Date.now },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
  status: { type: String, enum: Object.values(InventoryStatusEnum as object), default: InventoryStatusEnum.LOCK},
  deletedAt: Number,
});

export interface InventoryInterface extends mongoose.Document {
  readonly _id: string;
  invoiceNumber: number;
  invoiceDate?:  number;
  note: string;
  createdUserId: string;
  createdDate?: number;
  createdAt?:  number;
  updatedAt?: number;
  status:  string;
  deletedAt?: number;
}
