import * as mongoose from "mongoose";
import { ProductStatusEnum } from '../../enums/enum';

export const ProductSchema = new mongoose.Schema({
  categoryId: {
    type: String,
    required: true,
    trim: true,
  } ,
  unitProductId: {
    type: String,
    required: true,
    trim: true,
  },
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
    type: String,
    enum: Object.values(ProductStatusEnum as object),
    default: ProductStatusEnum.EXIST,
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
  status: string;
  deletedAt?: number;
}
