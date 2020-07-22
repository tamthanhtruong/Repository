import * as mongoose from "mongoose";
import { ProductTypeEnum } from '../enum';

// Khai báo data cho mongoose
export const ProductSchema = new mongoose.Schema({
  // category: CategorySchema,
  categoryId: {
    type: String,
    required: true,
    trim: String,
  } ,
  // category: String,
  unitProduct: String,
  name: String,
  code: String,
  originPrice: Number,
  price: Number,
  image: String,
  information: String,
  evaluation: String,
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
  status: {
    type: Number,
    enum: Object.values(ProductTypeEnum as object),
    default: ProductTypeEnum.EXIST,
  },
  deletedAt: Number,
});

export interface ProductInterface extends mongoose.Document {
  readonly _id: string;
  categoryId: string;
  unitProductId: string;
  name: string;
  code: string;
  originPrice: number;
  price: number;
  image: string;
  information: string;
  evaluation: string;
  updatedAt?: number;
  createdAt?: number;
  status: number;
  deletedAt?: number;
}
