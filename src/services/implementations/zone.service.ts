
import { IZoneRepository } from '../../repositories/interfaces/zone.repository.interface';
import { IZoneService } from '../interfaces/zone.service.interface';
import { CreateZoneDto, CreateZoneResponseDto } from '../../dto/zone/create.zone.dto';
import { DeleteZoneDto } from '../../dto/zone/delete.zone.dto';
import { IZone } from '../../models/zone.model';
import { ZoneDetailsDTO } from '../../dto/zone/zone-details.dto';

export class ZoneService implements IZoneService {
  constructor(private zoneRepository: IZoneRepository) { }

  async createZone(dto: CreateZoneDto): Promise<CreateZoneResponseDto> {
    const existingZone = await this.zoneRepository.findByName(dto.name);
    if (existingZone) {
      throw new Error('Zone with the same name already exists');
    }

    const formattedCoordinates = dto.coordinates.map(coord => ({
      latitude: coord[0],
      longitude: coord[1],
    }));

    return await this.zoneRepository.createZone({
      name: dto.name,
      coordinates: formattedCoordinates,
    });
  }

  async fetchZones(): Promise<ZoneDetailsDTO[]> {
    const zones = await this.zoneRepository.getAllZones();

    return zones.map(zone => ({
      _id: zone._id.toString(),
      name: zone.name,
      coordinates: zone.coordinates.map(coord => ({
        latitude: coord.latitude,
        longitude: coord.longitude,
      })),
    }));
  }

  async deleteZone(dto: DeleteZoneDto): Promise<IZone | null> {
    return await this.zoneRepository.deleteZone(dto.id);
  }
}