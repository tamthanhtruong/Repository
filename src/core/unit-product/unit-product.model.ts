import * as mongoose from 'mongoose';

export const UnitProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: String,
  },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
  deletedAt: Number,
});

export interface UnitProductInterface extends mongoose.Document {
  readonly _id: string;
  name: string;
  updatedAt?: number;
  createdAt?: number;
  deletedAt?: number;
}
