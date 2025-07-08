
import { IDeliveryBoyService } from '../../services/interfaces/delivery-boy.service.interface';
import { IDeliveryBoyController } from '../interfaces/delivery-boy.controller.interface';
import { CreateDeliveryBoyDto } from '../../dto/delivery-boy/create.delivery-boy.dto';
import { UpdateDetailsDto } from '../../dto/delivery-boy/update.details.dto';
import { UpdateVehicleDto } from '../../dto/delivery-boy/update.vehicle.dto';
import { UpdateZoneDto } from '../../dto/delivery-boy/update.zone.dto';
import { VerifyDocumentsDto } from '../../dto/delivery-boy/verify.documents.dto';
import { RejectDocumentsDto } from '../../dto/delivery-boy/reject.documents.dto';
import { IDeliveryBoy } from '../../models/delivery-boy.model';
import { UpdateLocationDto } from '../../dto/delivery-boy/update.location.dto';

export class DeliveryBoyController implements IDeliveryBoyController {
  constructor(private deliveryBoyService: IDeliveryBoyService) {}

  async register(data: CreateDeliveryBoyDto) {
    try {
      return await this.deliveryBoyService.registerDeliveryBoy(data);
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  async updateLocation(data: UpdateLocationDto) {
    try {
      return await this.deliveryBoyService.updateLocation(data);
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  async updateDetails(data: UpdateDetailsDto) {
    try {
      return await this.deliveryBoyService.updateDetails(data);
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  async updateVehicle(data: UpdateVehicleDto) {
    try {
      return await this.deliveryBoyService.updateVehicle(data);
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  async updateZone(data: UpdateZoneDto) {
    try {
      return await this.deliveryBoyService.updateZone(data);
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  async getAllDeliveryBoys(data: any) {
    try {
      const fetchDeliveryBoys = await this.deliveryBoyService.getAllDeliveryBoys();
      console.log('fetch the all delivery boy :',fetchDeliveryBoys);
      
      return { message: 'success', fetchDeliveryBoys };
    } catch (error) {
      throw new Error(`Error fetching delivery boys: ${(error as Error).message}`);
    }
  }
  async getAllDeliveryBoy(data: any) {
    try {
      const fetchDeliveryBoys = await this.deliveryBoyService.getAllDeliveryBoy();
      console.log('fetch the all delivery boy :',fetchDeliveryBoys);
      
      return { message: 'success', fetchDeliveryBoys };
    } catch (error) {
      throw new Error(`Error fetching delivery boys: ${(error as Error).message}`);
    }
  }

  async updateDeliveryBoyStatus(data: { id: string }) {
    try {
      const response = await this.deliveryBoyService.updateDeliveryBoyStatus(data.id);
      return { message: 'success', response };
    } catch (error) {
      throw new Error(`Error updating delivery boy status: ${(error as Error).message}`);
    }
  }

  async fetchDeliveryBoyDetails(data: { id: string }) {
    try {
      console.log('delivery-boy controller data :',data);
      
      const response = await this.deliveryBoyService.fetchDeliveryBoyDetails(data.id);
      console.log('delivery-boy controller :',response);
      
      return { message: 'success', response };
    } catch (error) {
      throw new Error(`Error fetching delivery boy details: ${(error as Error).message}`);
    }
  }

  async verifyDocuments(data: VerifyDocumentsDto) {
    try {
      const result = await this.deliveryBoyService.verifyDocuments(data);
      return { message: 'success', response: result };
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  async rejectDocuments(data: RejectDocumentsDto) {
    try {
      const result = await this.deliveryBoyService.rejectDocuments(data);
      return { message: 'success', result };
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  async getRejectedDocuments(data: { id: string }) {
    try {
      const fetchRejectedDocs = await this.deliveryBoyService.getRejectedDocuments(data.id);
      console.log('fetch rejected docs :',fetchRejectedDocs);
      
      return { message: 'success', fetchRejectedDocs };
    } catch (error) {
      throw new Error(`Error fetching rejected documents: ${(error as Error).message}`);
    }
  }
}