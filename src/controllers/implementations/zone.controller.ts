
import { IZoneService } from '../../services/interfaces/zone.service.interface';
import { IZoneController } from '../interfaces/zone.controller.interface';
import { CreateZoneDto, CreateZoneResponseControllerDto } from '../../dto/zone/create.zone.dto';
import { DeleteZoneDto } from '../../dto/zone/delete.zone.dto';
import { FetchZonesResponseDTO } from '../../dto/zone/fetch.zone.dto';

export class ZoneController implements IZoneController {
  constructor(private zoneService: IZoneService) { }

  async zoneCreation(data: CreateZoneDto): Promise<CreateZoneResponseControllerDto> {
    try {
      const createdZone = await this.zoneService.createZone(data);
      return { message: 'Zone created successfully', id: createdZone._id, zone: createdZone };
    } catch (error: any) {
      if (error.message === 'Zone with the same name already exists') {
        return { message: error.message, error: true };
      }
      throw error;
    }
  }

  async fetchZones(data: any): Promise<FetchZonesResponseDTO> {
    try {
      const fetchZones = await this.zoneService.fetchZones();
      // console.log('zone.controllerrrrrr :', fetchZones);

      return { message: 'Fetch data success', fetchZones };
    } catch (error) {
      throw new Error(`Error fetching zones: ${(error as Error).message}`);
    }
  }

  async deleteZone(data: DeleteZoneDto) {
    try {
      const response = await this.zoneService.deleteZone(data);
      return { message: 'success', response };
    } catch (error) {
      throw new Error(`Error deleting zone: ${(error as Error).message}`);
    }
  }
}