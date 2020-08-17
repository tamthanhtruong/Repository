import * as mongoose from 'mongoose';

// create schema Mongoose to map to Mongo collection
export const DetailImportSchema = new mongoose.Schema({
  importId: String,
  productId: String,
  unitProductId: String,
  quantity: Number,
  price: Number,
  deletedAt: Number,
});
// Crate model at Nestjs extends mongoose.Document -> Document at Mongo inject into it
// Use this model -> create Document on Mongo
export interface DetailImportInterface extends mongoose.Document {
  importId: string;
  productId: string;
  unitProductId: string;
  quantity: number;
  price: number;
  deletedAt?: number;
}
