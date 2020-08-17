import * as mongoose from 'mongoose';

// create schema Mongoose to map to Mongo collection
export const DetailExportSchema = new mongoose.Schema({
  exportId: String,
  productId: String,
  unitProductId: String,
  quantity: Number,
  price: Number,
  deletedAt: Number,
});

// Create model at Nestjs extends mongoose.Document -> Document at Mongo inject into it
// Use this model -> create Document on Mongo
export interface DetailExportInterface extends mongoose.Document {
  readonly _id: string;
  exportId: string;
  productId: string;
  unitProductId: string;
  quantity: number;
  price: number;
  deletedAt?: number;
}
