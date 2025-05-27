
import { IZoneRepository } from '../../repositories/interfaces/zone.repository.interface';
import { IZoneService } from '../interfaces/zone.service.interface';
import { CreateZoneDto } from '../../dto/zone/create.zone.dto';
import { DeleteZoneDto } from '../../dto/zone/delete.zone.dto';
import { IZone } from '../../models/zone.model';

export class ZoneService implements IZoneService {
  constructor(private zoneRepository: IZoneRepository) {}

  async createZone(dto: CreateZoneDto): Promise<IZone> {
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

  async fetchZones(): Promise<IZone[]> {
    return await this.zoneRepository.getAllZones();
  }

  async deleteZone(dto: DeleteZoneDto): Promise<IZone | null> {
    return await this.zoneRepository.deleteZone(dto.id);
  }
}