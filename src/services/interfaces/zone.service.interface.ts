
import { CreateZoneDto, CreateZoneResponseDto } from '../../dto/zone/create.zone.dto';
import { DeleteZoneDto } from '../../dto/zone/delete.zone.dto';
import { ZoneDetailsDTO } from '../../dto/zone/zone-details.dto';
import { IZone } from '../../models/zone.model';

export interface IZoneService {
  createZone(dto: CreateZoneDto): Promise<CreateZoneResponseDto>;
  fetchZones(): Promise<ZoneDetailsDTO[]>;
  deleteZone(dto: DeleteZoneDto): Promise<IZone | null>;
}