
import { Document, ObjectId } from 'mongoose';

export interface ISchema extends Document {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}