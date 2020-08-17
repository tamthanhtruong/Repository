import * as mongoose from 'mongoose';

// create schema Mongoose to map to Mongo collection
export const DetailInventorySchema = new mongoose.Schema({
  inventoryId: String,
  productId: String,
  unitProductId: String,
  quantity: Number,
  price: Number,
  deletedAt: Number,
});

// Create model at Nestjs extends mongoose.Document -> Document at Mongo inject into it
// Use this model -> create Document on Mongo
export interface DetailInventoryInterface extends mongoose.Document {
  readonly _id: string;
  inventoryId: string;
  productId: string;
  unitProductId: string;
  quantity: number;
  price: number;
  deletedAt?: number;
}
