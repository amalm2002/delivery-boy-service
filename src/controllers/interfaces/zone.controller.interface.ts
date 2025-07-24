
import { FetchZonesResponseDTO } from '../../dto/zone/fetch.zone.dto';
import { CreateZoneDto, CreateZoneResponseControllerDto } from '../../dto/zone/create.zone.dto';
import { DeleteZoneDto } from '../../dto/zone/delete.zone.dto';
import { IZone } from '../../models/zone.model';

export interface IZoneController {
  zoneCreation(data: CreateZoneDto): Promise<CreateZoneResponseControllerDto>;
  fetchZones(data: void): Promise<FetchZonesResponseDTO>;
  deleteZone(data: DeleteZoneDto): Promise<{ message: string; response: IZone | null }>;
}