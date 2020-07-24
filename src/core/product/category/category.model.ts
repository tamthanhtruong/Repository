import * as mongoose from 'mongoose';
import { CategoryTypeEnum } from '../../../enum';

// Khai báo data cho mongoose
export const CategorySchema = new mongoose.Schema({
  name: String,
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
  status: {
    type: Number,
    enum: Object.values(CategoryTypeEnum as object),
    default: CategoryTypeEnum.EXIST,
  },
  deletedAt: Number,
});

// tạo mô hình để lấy category
export interface CategoryInterface extends mongoose.Document {
  readonly _id: string;
  name: string;
  createdAt?: number;
  updatedAt?: number;
  status: number;
  deletedAt?: number;
}
