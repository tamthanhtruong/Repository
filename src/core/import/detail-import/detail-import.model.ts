import * as mongoose from 'mongoose';

export const DetailImportSchema = new mongoose.Schema({
  importId: String,
  productId: String,
  unitProductId: String,
  quantity: Number,
  price: Number,
  deletedAt: Number,
});

export interface DetailImportInterface extends mongoose.Document {
  importId: string;
  productId: string;
  unitProductId: string;
  quantity: number;
  price: number;
  deletedAt?: number;
}
