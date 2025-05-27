
import { CreateZoneDto } from '../../dto/zone/create.zone.dto';
import { DeleteZoneDto } from '../../dto/zone/delete.zone.dto';
import { IZone } from '../../models/zone.model';

export interface IZoneController {
  zoneCreation(data: CreateZoneDto): Promise<any>;
  fetchZones(data: any): Promise<{ message: string; fetchZones: IZone[] }>;
  deleteZone(data: DeleteZoneDto): Promise<{ message: string; response: IZone | null }>;
}