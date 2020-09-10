import * as mongoose from 'mongoose';

export const DetailExportSchema = new mongoose.Schema({
  exportId: String,
  productId: String,
  unitProductId: String,
  quantity: Number,
  price: Number,
  deletedAt: Number,
});

export interface DetailExportInterface extends mongoose.Document {
  readonly _id: string;
  exportId: string;
  productId: string;
  unitProductId: string;
  quantity: number;
  price: number;
  deletedAt?: number;
}
