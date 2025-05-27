import mongoose from 'mongoose';
import { ISchema } from './interfaces/schema.interface';

export interface IZone extends ISchema {
  name: string;
  coordinates: { latitude: number; longitude: number }[];
}

const CoordinateSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const ZoneSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    coordinates: [CoordinateSchema],
  },
  { timestamps: true }
);

export const Zone = mongoose.model<IZone>('Zone', ZoneSchema);