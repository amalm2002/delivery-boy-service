
import { IDeliveryBoyService } from '../../services/interfaces/delivery-boy.service.interface';
import { IDeliveryBoyController } from '../interfaces/delivery-boy.controller.interface';
import { CreateDeliveryBoyDto, CreateDeliveryBoyResponseDTO } from '../../dto/delivery-boy/create.delivery-boy.dto';
import { UpdateDetailsDto, UpdateDetailsResponseDTO } from '../../dto/delivery-boy/update.details.dto';
import { UpdateVehicleDto, UpdateVehicleResponseDTO } from '../../dto/delivery-boy/update.vehicle.dto';
import { UpdateZoneDto, UpdateZoneResponseDTO } from '../../dto/delivery-boy/update.zone.dto';
import { VerifyDocumentsDto, VerifyDocumentsResponseDTO } from '../../dto/delivery-boy/verify.documents.dto';
import { GetRejectedDocumentControllerResponseDTO, GetRejectedDocumentDTO, RejectDocumentsDto, RejectDocumentsResponseDTO } from '../../dto/delivery-boy/reject.documents.dto';
import { UpdateLocationDto, UpdateLocationResponseDto } from '../../dto/delivery-boy/update.location.dto';
import { GetAllDeliveryBoysResponseDTO } from '../../dto/delivery-boy/get-all-delivery-boys.dto';
import { UpdateOnlineStatusDTO, UpdateOnlineStatusResponseDTO } from '../../dto/delivery-boy/update.online.status.dto';
import { FetchDeliveryBoyDTO } from '../../dto/delivery-boy/fetch-delivery-boy.dto';
import { AddRidePaymentRuleDTO, AddRidePaymentRuleResponseDTO } from '../../dto/delivery-boy/ride-payment-rule.dto';

export class DeliveryBoyController implements IDeliveryBoyController {
  constructor(private deliveryBoyService: IDeliveryBoyService) { }

  async register(data: CreateDeliveryBoyDto): Promise<CreateDeliveryBoyResponseDTO> {
    try {
      return await this.deliveryBoyService.registerDeliveryBoy(data);
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  async updateLocation(data: UpdateLocationDto): Promise<UpdateLocationResponseDto> {
    try {
      return await this.deliveryBoyService.updateLocation(data);
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  async updateDetails(data: UpdateDetailsDto): Promise<UpdateDetailsResponseDTO> {
    try {
      return await this.deliveryBoyService.updateDetails(data);
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  async updateVehicle(data: UpdateVehicleDto): Promise<UpdateVehicleResponseDTO> {
    try {
      return await this.deliveryBoyService.updateVehicle(data);
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  async updateZone(data: UpdateZoneDto): Promise<UpdateZoneResponseDTO> {
    try {
      return await this.deliveryBoyService.updateZone(data);
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  async getAllDeliveryBoys(data: void): Promise<GetAllDeliveryBoysResponseDTO> {
    try {
      const fetchDeliveryBoys = await this.deliveryBoyService.getAllDeliveryBoys();
      return { message: 'success', fetchDeliveryBoys };
    } catch (error) {
      throw new Error(`Error fetching delivery boys: ${(error as Error).message}`);
    }
  }

  async getAllDeliveryBoy(data: void): Promise<GetAllDeliveryBoysResponseDTO> {
    try {
      const fetchDeliveryBoys = await this.deliveryBoyService.getAllDeliveryBoy();
      return { message: 'success', fetchDeliveryBoys };
    } catch (error) {
      throw new Error(`Error fetching delivery boys: ${(error as Error).message}`);
    }
  }

  async updateDeliveryBoyStatus(data: FetchDeliveryBoyDTO): Promise<UpdateOnlineStatusResponseDTO> {
    try {
      const response = await this.deliveryBoyService.updateDeliveryBoyStatus(data);
      return { message: 'success', response };
    } catch (error) {
      throw new Error(`Error updating delivery boy status: ${(error as Error).message}`);
    }
  }

  async fetchDeliveryBoyDetails(data: FetchDeliveryBoyDTO): Promise<UpdateOnlineStatusResponseDTO> {
    try {
      const response = await this.deliveryBoyService.fetchDeliveryBoyDetails(data);
      return { message: 'success', response };
    } catch (error) {
      throw new Error(`Error fetching delivery boy details: ${(error as Error).message}`);
    }
  }

  async verifyDocuments(data: VerifyDocumentsDto): Promise<VerifyDocumentsResponseDTO> {
    try {
      const result = await this.deliveryBoyService.verifyDocuments(data);
      return { message: 'success', response: result };
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  async rejectDocuments(data: RejectDocumentsDto): Promise<RejectDocumentsResponseDTO> {
    try {
      const result = await this.deliveryBoyService.rejectDocuments(data);
      return { message: 'success', result };
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  async getRejectedDocuments(data: GetRejectedDocumentDTO): Promise<GetRejectedDocumentControllerResponseDTO> {
    try {
      const fetchRejectedDocs = await this.deliveryBoyService.getRejectedDocuments(data);
      return { message: 'success', fetchRejectedDocs };
    } catch (error) {
      throw new Error(`Error fetching rejected documents: ${(error as Error).message}`);
    }
  }

  async addRidePaymentRule(data: AddRidePaymentRuleDTO): Promise<AddRidePaymentRuleResponseDTO> {
    try {
      const response = await this.deliveryBoyService.addRidePaymentRule(data)
      return response
    } catch (error) {
      throw new Error(`Error add ride payment rule: ${(error as Error).message}`);
    }
  }
}