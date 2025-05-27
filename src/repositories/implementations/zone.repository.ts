
import { Zone, IZone } from '../../models/zone.model';
import { IZoneRepository } from '../interfaces/zone.repository.interface';
import mongoose from 'mongoose';

export class ZoneRepository implements IZoneRepository {
  async findByName(name: string): Promise<IZone | null> {
    return await Zone.findOne({ name });
  }

  async createZone(data: { name: string; coordinates: { latitude: number; longitude: number }[] }): Promise<IZone> {
    const zone = new Zone(data);
    return await zone.save();
  }

  async getAllZones(): Promise<IZone[]> {
    return await Zone.find();
  }

  async deleteZone(id: string): Promise<IZone | null> {
    return await Zone.findByIdAndDelete(id);
  }

  async findById(id: string): Promise<IZone | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await Zone.findById(id);
  }
}