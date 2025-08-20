
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
import { UpdateOnlineStatusResponseDTO } from '../../dto/delivery-boy/update.online.status.dto';
import { FetchDeliveryBoyDTO } from '../../dto/delivery-boy/fetch-delivery-boy.dto';
import { AddRidePaymentRuleDTO, AddRidePaymentRuleResponseDTO } from '../../dto/delivery-boy/ride-payment-rule.dto';
import { BlockRidePaymentRuleDTO, GetRideratePaymentRuleDTO, UnblockRidePaymentRuleDTO, UpdateRidePaymentRuleDTO, UpdateRidePaymentRuleResponseDTO } from '../../dto/delivery-boy/ride-payment.dto';
import { CheckTheInHandCashLimitDTO, CheckTheInHandCashLimitResponseDTO, UpdatedeliveryBoyEarningsDTO, UpdatedeliveryBoyEarningsResponseDTO } from '../../dto/delivery-boy/earnings-section.dto';
import { DeliveryBoyReviewResponseDTO, UserReviewDTO } from '../../dto/delivery-boy/user-review.dto';
import { GetDeliveryBoyChartDataDTO, GetDeliveryBoyChartDataRequestDTO } from '../../dto/delivery-boy/get-delivery-boy-chart.dto';
import { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js';

export class DeliveryBoyController implements IDeliveryBoyController {
  constructor(private readonly _deliveryBoyService: IDeliveryBoyService) { }

  async register(newDeliveryBoy: CreateDeliveryBoyDto): Promise<CreateDeliveryBoyResponseDTO> {
    try {
      return await this._deliveryBoyService.registerDeliveryBoy(newDeliveryBoy);
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  async updateLocation(locationUpdate: UpdateLocationDto): Promise<UpdateLocationResponseDto> {
    try {
      return await this._deliveryBoyService.updateLocation(locationUpdate);
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  async updateDetails(detailsUpdate: UpdateDetailsDto): Promise<UpdateDetailsResponseDTO> {
    try {
      return await this._deliveryBoyService.updateDetails(detailsUpdate);
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  async updateVehicle(vehicleUpdate: UpdateVehicleDto): Promise<UpdateVehicleResponseDTO> {
    try {
      return await this._deliveryBoyService.updateVehicle(vehicleUpdate);
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  async updateZone(zoneUpdate: UpdateZoneDto): Promise<UpdateZoneResponseDTO> {
    try {
      return await this._deliveryBoyService.updateZone(zoneUpdate);
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  async getAllDeliveryBoys(data: void): Promise<GetAllDeliveryBoysResponseDTO> {
    try {
      const fetchDeliveryBoys = await this._deliveryBoyService.getAllDeliveryBoys();
      return { message: 'success', fetchDeliveryBoys };
    } catch (error) {
      throw new Error(`Error fetching delivery boys: ${(error as Error).message}`);
    }
  }

  async getAllDeliveryBoy(data: void): Promise<GetAllDeliveryBoysResponseDTO> {
    try {
      const fetchDeliveryBoys = await this._deliveryBoyService.getAllDeliveryBoy();
      return { message: 'success', fetchDeliveryBoys };
    } catch (error) {
      throw new Error(`Error fetching delivery boys: ${(error as Error).message}`);
    }
  }

  async updateDeliveryBoyStatus(fetchRequest: FetchDeliveryBoyDTO): Promise<UpdateOnlineStatusResponseDTO> {
    try {
      const response = await this._deliveryBoyService.updateDeliveryBoyStatus(fetchRequest);
      return { message: 'success', response };
    } catch (error) {
      throw new Error(`Error updating delivery boy status: ${(error as Error).message}`);
    }
  }

  async fetchDeliveryBoyDetailsGrpc(call: ServerUnaryCall<FetchDeliveryBoyDTO, UpdateOnlineStatusResponseDTO>, callback: sendUnaryData<UpdateOnlineStatusResponseDTO>): Promise<void> {
    try {
      const data = call.request
      const response = await this._deliveryBoyService.fetchDeliveryBoyDetails(data);
      const returnResponse = { message: 'success', response }
      return callback(null, returnResponse)
    } catch (error) {
      callback(null, { message: (error as Error).message })
    }
  }

  async fetchDeliveryBoyDetails(fetchRequest: FetchDeliveryBoyDTO): Promise<UpdateOnlineStatusResponseDTO> {
    try {
      const response = await this._deliveryBoyService.fetchDeliveryBoyDetails(fetchRequest);
      return { message: 'success', response };
    } catch (error) {
      throw new Error(`Error fetching delivery boy details: ${(error as Error).message}`);
    }
  }

  async verifyDocuments(verification: VerifyDocumentsDto): Promise<VerifyDocumentsResponseDTO> {
    try {
      const result = await this._deliveryBoyService.verifyDocuments(verification);
      return { message: 'success', response: result };
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  async rejectDocuments(rejection: RejectDocumentsDto): Promise<RejectDocumentsResponseDTO> {
    try {
      const result = await this._deliveryBoyService.rejectDocuments(rejection);
      return { message: 'success', result };
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  async getRejectedDocuments(query: GetRejectedDocumentDTO): Promise<GetRejectedDocumentControllerResponseDTO> {
    try {
      const fetchRejectedDocs = await this._deliveryBoyService.getRejectedDocuments(query);
      return { message: 'success', fetchRejectedDocs };
    } catch (error) {
      throw new Error(`Error fetching rejected documents: ${(error as Error).message}`);
    }
  }

  async addRidePaymentRule(rule: AddRidePaymentRuleDTO): Promise<AddRidePaymentRuleResponseDTO> {
    try {
      const response = await this._deliveryBoyService.addRidePaymentRule(rule)
      return response
    } catch (error) {
      throw new Error(`Error add ride payment rule: ${(error as Error).message}`);
    }
  }

  async getRidePaymentRules(data: void): Promise<GetRideratePaymentRuleDTO> {
    try {
      const response = await this._deliveryBoyService.getRideratePaymentRule(data)
      return response
    } catch (error) {
      throw new Error(`Error get ride rate payment rule: ${(error as Error).message}`);
    }
  }

  async updateRidePaymentRule(ruleUpdate: UpdateRidePaymentRuleDTO): Promise<UpdateRidePaymentRuleResponseDTO> {
    try {
      const response = await this._deliveryBoyService.updateRidePaymentRule(ruleUpdate);
      return response;
    } catch (error) {
      throw new Error(`Error updating ride rate payment rule: ${(error as Error).message}`);
    }
  }

  async blockRidePaymentRule(rule: BlockRidePaymentRuleDTO): Promise<UpdateRidePaymentRuleResponseDTO> {
    try {
      const response = await this._deliveryBoyService.blockRidePaymentRule(rule);
      return response;
    } catch (error) {
      throw new Error(`Error blocking ride rate payment rule: ${(error as Error).message}`);
    }
  }

  async unblockRidePaymentRule(rule: UnblockRidePaymentRuleDTO): Promise<UpdateRidePaymentRuleResponseDTO> {
    try {
      const response = await this._deliveryBoyService.unblockRidePaymentRule(rule);
      return response;
    } catch (error) {
      throw new Error(`Error unblocking ride rate payment rule: ${(error as Error).message}`);
    }
  }

  async checkTheInHandCashLimit(checkRequest: CheckTheInHandCashLimitDTO): Promise<CheckTheInHandCashLimitResponseDTO> {
    try {
      const response = await this._deliveryBoyService.checkTheInHandCashLimit(checkRequest)
      return response
    } catch (error) {
      throw new Error(`Error on check the InHandCashLimit : ${(error as Error).message}`);
    }
  }

  async updatedeliveryBoyEarnings(earningsUpdate: UpdatedeliveryBoyEarningsDTO): Promise<UpdatedeliveryBoyEarningsResponseDTO> {
    try {
      const response = await this._deliveryBoyService.updatedeliveryBoyEarnings(earningsUpdate)
      return response
    } catch (error) {
      throw new Error(`Error on update delivery-boy earings payment : ${(error as Error).message}`);
    }
  }

  async clearInHandCashOnDeliveryBoy(clearRequest: UpdatedeliveryBoyEarningsDTO): Promise<UpdatedeliveryBoyEarningsResponseDTO> {
    try {
      const response = await this._deliveryBoyService.clearInHandCashOnDeliveryBoy(clearRequest)
      return response
    } catch (error) {
      throw new Error(`Error on update delivery-boy earings payment : ${(error as Error).message}`);
    }
  }

  async userReviewFordeliveryBoy(review: UserReviewDTO): Promise<DeliveryBoyReviewResponseDTO> {
    try {
      const response = await this._deliveryBoyService.userReviewForDeliveryBoy(review)
      return response
    } catch (error) {
      throw new Error(`Error on user review on delivery-boy  : ${(error as Error).message}`);
    }
  }

  async getDeliveryBoyReview(query: UserReviewDTO): Promise<DeliveryBoyReviewResponseDTO> {
    try {
      const response = await this._deliveryBoyService.getDeliveryBoyReview(query)
      return response
    } catch (error) {
      throw new Error(`Error on get the review on delivery-boy  : ${(error as Error).message}`);
    }
  }

  async deleteDeliveryBoyReview(deleteRequest: UserReviewDTO): Promise<DeliveryBoyReviewResponseDTO> {
    try {
      const response = await this._deliveryBoyService.deleteDeliveryBoyReview(deleteRequest)
      return response
    } catch (error) {
      throw new Error(`Error on get the review on delivery-boy  : ${(error as Error).message}`);
    }
  }

  async getDeliveryBoyChartData(chartRequest: GetDeliveryBoyChartDataRequestDTO): Promise<GetDeliveryBoyChartDataDTO> {
    try {
      const response = await this._deliveryBoyService.getDeliveryBoyChartData(chartRequest);
      return response;
    } catch (error) {
      console.log('Error in getDeliveryBoyChartData:', error);
      return { error: true, message: (error as Error).message };
    }
  }

}