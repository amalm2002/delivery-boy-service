import { CreateDeliveryBoyDto, CreateDeliveryBoyResponseDTO } from '../../dto/delivery-boy/create.delivery-boy.dto';
import { UpdateLocationDto, UpdateLocationResponseDto } from '../../dto/delivery-boy/update.location.dto';
import { UpdateDetailsDto, UpdateDetailsResponseDTO } from '../../dto/delivery-boy/update.details.dto';
import { UpdateVehicleDto, UpdateVehicleResponseDTO } from '../../dto/delivery-boy/update.vehicle.dto';
import { UpdateZoneDto, UpdateZoneResponseDTO } from '../../dto/delivery-boy/update.zone.dto';
import { VerifyDocumentsDto, VerifyDocumentsResponseDTO } from '../../dto/delivery-boy/verify.documents.dto';
import {
  GetRejectedDocumentControllerResponseDTO,
  GetRejectedDocumentDTO,
  RejectDocumentsDto,
  RejectDocumentsResponseDTO
} from '../../dto/delivery-boy/reject.documents.dto';
import { GetAllDeliveryBoysResponseDTO } from '../../dto/delivery-boy/get-all-delivery-boys.dto';
import { UpdateOnlineStatusDTO, UpdateOnlineStatusResponseDTO } from '../../dto/delivery-boy/update.online.status.dto';
import { FetchDeliveryBoyDTO } from '../../dto/delivery-boy/fetch-delivery-boy.dto';
import { AddRidePaymentRuleDTO, AddRidePaymentRuleResponseDTO } from '../../dto/delivery-boy/ride-payment-rule.dto';

export interface IDeliveryBoyController {
  register(data: CreateDeliveryBoyDto): Promise<CreateDeliveryBoyResponseDTO>;
  updateLocation(data: UpdateLocationDto): Promise<UpdateLocationResponseDto>;
  updateDetails(data: UpdateDetailsDto): Promise<UpdateDetailsResponseDTO>;
  updateVehicle(data: UpdateVehicleDto): Promise<UpdateVehicleResponseDTO>;
  updateZone(data: UpdateZoneDto): Promise<UpdateZoneResponseDTO>;
  getAllDeliveryBoys(data: void): Promise<GetAllDeliveryBoysResponseDTO>;
  getAllDeliveryBoy(data: void): Promise<GetAllDeliveryBoysResponseDTO>;
  updateDeliveryBoyStatus(data: FetchDeliveryBoyDTO): Promise<UpdateOnlineStatusResponseDTO>;
  fetchDeliveryBoyDetails(data: FetchDeliveryBoyDTO): Promise<UpdateOnlineStatusResponseDTO>;
  verifyDocuments(data: VerifyDocumentsDto): Promise<VerifyDocumentsResponseDTO>;
  rejectDocuments(data: RejectDocumentsDto): Promise<RejectDocumentsResponseDTO>;
  getRejectedDocuments(data: GetRejectedDocumentDTO): Promise<GetRejectedDocumentControllerResponseDTO>;
  addRidePaymentRule(data: AddRidePaymentRuleDTO): Promise<AddRidePaymentRuleResponseDTO>

  getRidePaymentRules(data: void): Promise<any>;
  updateRidePaymentRule(data: { id: string; KM: number; ratePerKm: number; vehicleType: string; isActive: boolean }): Promise<any>;
  blockRidePaymentRule(data: { id: string; vehicleType: string }): Promise<any>;
  unblockRidePaymentRule(data: { id: string }): Promise<any>;
  checkTheInHandCashLimit(data: { deliveryBoyId: string }): Promise<any>
  updatedeliveryBoyEarnings(data: { deliveryBoyId: string, amount: number, date: Date, paid: boolean, paymentId: string }): Promise<any>
}