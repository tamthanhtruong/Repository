import * as mongoose from 'mongoose';

export const DetailInventorySchema = new mongoose.Schema({
  inventoryId: String,
  productId: String,
  unitProductId: String,
  quantity: Number,
  price: Number,
  deletedAt: Number,
});

export interface DetailInventoryInterface extends mongoose.Document {
  readonly _id: string;
  inventoryId: string;
  productId: string;
  unitProductId: string;
  quantity: number;
  price: number;
  deletedAt?: number;
}
