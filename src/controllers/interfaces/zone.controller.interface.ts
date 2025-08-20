
import { FetchZonesResponseDTO, Zone } from '../../dto/zone/fetch.zone.dto';
import { CreateZoneDto, CreateZoneResponseControllerDto } from '../../dto/zone/create.zone.dto';
import { DeleteZoneDto } from '../../dto/zone/delete.zone.dto';

export interface IZoneController {
  zoneCreation(newZone: CreateZoneDto): Promise<CreateZoneResponseControllerDto>;
  fetchZones(data: void): Promise<FetchZonesResponseDTO>;
  deleteZone(zoneToDelete: DeleteZoneDto): Promise<{ message: string; response: Zone | null }>;
}