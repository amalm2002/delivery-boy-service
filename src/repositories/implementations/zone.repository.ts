import { Zone, IZone } from '../../models/zone.model';
import { IZoneRepository } from '../interfaces/zone.repository.interface';
import { BaseRepository } from './base.repository';

export class ZoneRepository extends BaseRepository<IZone> implements IZoneRepository {
  constructor() {
    super(Zone);
  }

  async findByName(name: string): Promise<IZone | null> {
    return await this.model.findOne({ name }).exec();
  }

  async createZone(data: { name: string; coordinates: { latitude: number; longitude: number }[] }): Promise<IZone> {
    const zone = new Zone(data);
    return await zone.save();
  }

  async getAllZones(): Promise<IZone[]> {
    return await this.model.find().exec();
  }

  async deleteZone(id: string): Promise<IZone | null> {
    return await this.model.findByIdAndDelete(id).exec();
  }

}