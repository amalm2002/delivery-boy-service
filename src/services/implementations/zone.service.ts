
import { IZoneRepository } from '../../repositories/interfaces/zone.repository.interface';
import { IZoneService } from '../interfaces/zone.service.interface';
import { CreateZoneDto, CreateZoneResponseDto } from '../../dto/zone/create.zone.dto';
import { DeleteZoneDto } from '../../dto/zone/delete.zone.dto';
import { ZoneDetailsDTO } from '../../dto/zone/zone-details.dto';
import { Zone } from '../../dto/zone/fetch.zone.dto';

export class ZoneService implements IZoneService {
  constructor(
    private readonly _zoneRepository: IZoneRepository
  ) { }

  async createZone(newZone: CreateZoneDto): Promise<CreateZoneResponseDto> {
    const existingZone = await this._zoneRepository.findByName(newZone.name);
    if (existingZone) {
      throw new Error('Zone with the same name already exists');
    }

    const formattedCoordinates = newZone.coordinates.map(coord => ({
      latitude: coord[0],
      longitude: coord[1],
    }));

    return await this._zoneRepository.createZone({
      name: newZone.name,
      coordinates: formattedCoordinates,
    });
  }

  async fetchZones(): Promise<ZoneDetailsDTO[]> {
    const zones = await this._zoneRepository.getAllZones();

    return zones.map(zone => ({
      _id: zone._id.toString(),
      name: zone.name,
      coordinates: zone.coordinates.map(coord => ({
        latitude: coord.latitude,
        longitude: coord.longitude,
      })),
    }));
  }

  async deleteZone(zoneToDelete: DeleteZoneDto): Promise<Zone | null> {
    return await this._zoneRepository.deleteZone(zoneToDelete.id);
  }
}