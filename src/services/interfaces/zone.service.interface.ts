
import { CreateZoneDto } from '../../dto/zone/create.zone.dto';
import { DeleteZoneDto } from '../../dto/zone/delete.zone.dto';
import { IZone } from '../../models/zone.model';

export interface IZoneService {
  createZone(dto: CreateZoneDto): Promise<IZone>;
  fetchZones(): Promise<IZone[]>;
  deleteZone(dto: DeleteZoneDto): Promise<IZone | null>;
}