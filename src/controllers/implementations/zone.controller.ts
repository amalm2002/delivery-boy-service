
import { IZoneService } from '../../services/interfaces/zone.service.interface';
import { IZoneController } from '../interfaces/zone.controller.interface';
import { CreateZoneDto, CreateZoneResponseControllerDto } from '../../dto/zone/create.zone.dto';
import { DeleteZoneDto } from '../../dto/zone/delete.zone.dto';
import { FetchZonesResponseDTO, Zone } from '../../dto/zone/fetch.zone.dto';

export class ZoneController implements IZoneController {
  constructor(
    private readonly _zoneService: IZoneService
  ) { }

  async zoneCreation(newZone: CreateZoneDto): Promise<CreateZoneResponseControllerDto> {
    try {
      const createdZone = await this._zoneService.createZone(newZone);
      return { message: 'Zone created successfully', id: createdZone._id, zone: createdZone };
    } catch (error: any) {
      if (error.message === 'Zone with the same name already exists') {
        return { message: error.message, error: true };
      }
      throw error;
    }
  }

  async fetchZones(data: void): Promise<FetchZonesResponseDTO> {
    try {
      const fetchZones = await this._zoneService.fetchZones();
      return { message: 'Fetch data success', fetchZones };
    } catch (error) {
      throw new Error(`Error fetching zones: ${(error as Error).message}`);
    }
  }

  async deleteZone(zoneToDelete: DeleteZoneDto): Promise<{ message: string; response: Zone | null }> {
    try {
      const response = await this._zoneService.deleteZone(zoneToDelete);
      return { message: 'success', response };
    } catch (error) {
      throw new Error(`Error deleting zone: ${(error as Error).message}`);
    }
  }
}