import * as mongoose from 'mongoose';
import { CategoryStatusEnum } from '../../../enums/enum';

// Khai báo data cho mongoose
export const CategorySchema = new mongoose.Schema({
  name: String,
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
  status: {
    type: String,
    enum: Object.values(CategoryStatusEnum as object),
    default: CategoryStatusEnum.EXIST,
  },
  deletedAt: Number,
});

// tạo mô hình để lấy category
export interface CategoryInterface extends mongoose.Document {
  readonly _id: string;
  name: string;
  createdAt?: number;
  updatedAt?: number;
  status: string;
  deletedAt?: number;
}
