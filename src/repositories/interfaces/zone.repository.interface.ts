
import { IZone } from '../../models/zone.model';

export interface IZoneRepository {
  findByName(name: string): Promise<IZone | null>;
  createZone(data: { name: string; coordinates: { latitude: number; longitude: number }[] }): Promise<IZone>;
  getAllZones(): Promise<IZone[]>;
  deleteZone(id: string): Promise<IZone | null>;
  findById(id: string): Promise<IZone | null>;
}