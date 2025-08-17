
import { CreateZoneDto, CreateZoneResponseDto } from '../../dto/zone/create.zone.dto';
import { DeleteZoneDto } from '../../dto/zone/delete.zone.dto';
import { Zone } from '../../dto/zone/fetch.zone.dto';
import { ZoneDetailsDTO } from '../../dto/zone/zone-details.dto';

export interface IZoneService {
  createZone(dto: CreateZoneDto): Promise<CreateZoneResponseDto>;
  fetchZones(): Promise<ZoneDetailsDTO[]>;
  deleteZone(dto: DeleteZoneDto): Promise<Zone | null>;
}