import { CreateDeliveryBoyDto, CreateDeliveryBoyResponseDTO } from '../../dto/delivery-boy/create.delivery-boy.dto';
import { DeliveryBoyDto, UpdateLocationDto, UpdateLocationResponseDto } from '../../dto/delivery-boy/update.location.dto';
import { UpdateDetailsDto, UpdateDetailsResponseDTO } from '../../dto/delivery-boy/update.details.dto';
import { UpdateVehicleDto, UpdateVehicleResponseDTO } from '../../dto/delivery-boy/update.vehicle.dto';
import { UpdateZoneDto, UpdateZoneResponseDTO } from '../../dto/delivery-boy/update.zone.dto';
import { VerifyDocumentsDto } from '../../dto/delivery-boy/verify.documents.dto';
import { GetRejectedDocumentDTO, GetRejectedDocumentServiceResponseDTO, RejectDocumentsDto } from '../../dto/delivery-boy/reject.documents.dto';
import { FetchDeliveryBoyDTO } from '../../dto/delivery-boy/fetch-delivery-boy.dto';
import { AddRidePaymentRuleDTO, AddRidePaymentRuleResponseDTO } from '../../dto/delivery-boy/ride-payment-rule.dto';
import { BlockRidePaymentRuleDTO, GetRideratePaymentRuleDTO, UnblockRidePaymentRuleDTO, UpdateRidePaymentRuleDTO, UpdateRidePaymentRuleResponseDTO } from '../../dto/delivery-boy/ride-payment.dto';
import { CheckTheInHandCashLimitDTO, CheckTheInHandCashLimitResponseDTO, UpdatedeliveryBoyEarningsDTO, UpdatedeliveryBoyEarningsResponseDTO } from '../../dto/delivery-boy/earnings-section.dto';
import { DeliveryBoyReviewResponseDTO, UserReviewDTO } from '../../dto/delivery-boy/user-review.dto';

export interface IDeliveryBoyService {
  registerDeliveryBoy(dto: CreateDeliveryBoyDto): Promise<CreateDeliveryBoyResponseDTO>;
  updateLocation(dto: UpdateLocationDto): Promise<UpdateLocationResponseDto>;
  updateDetails(dto: UpdateDetailsDto): Promise<UpdateDetailsResponseDTO>;
  updateVehicle(dto: UpdateVehicleDto): Promise<UpdateVehicleResponseDTO>;
  updateZone(dto: UpdateZoneDto): Promise<UpdateZoneResponseDTO>;
  getAllDeliveryBoys(): Promise<Partial<DeliveryBoyDto>[]>;
  getAllDeliveryBoy(): Promise<Partial<DeliveryBoyDto>[]>;
  updateDeliveryBoyStatus(data: FetchDeliveryBoyDTO): Promise<DeliveryBoyDto | null>;
  fetchDeliveryBoyDetails(data: FetchDeliveryBoyDTO): Promise<DeliveryBoyDto | null>;
  verifyDocuments(dto: VerifyDocumentsDto): Promise<DeliveryBoyDto | { message: string }>;
  rejectDocuments(dto: RejectDocumentsDto): Promise<DeliveryBoyDto | { message: string }>;
  getRejectedDocuments(data: GetRejectedDocumentDTO): Promise<GetRejectedDocumentServiceResponseDTO>;
  addRidePaymentRule(data: AddRidePaymentRuleDTO): Promise<AddRidePaymentRuleResponseDTO>
  getRideratePaymentRule(data: void): Promise<GetRideratePaymentRuleDTO>
  updateRidePaymentRule(data: UpdateRidePaymentRuleDTO): Promise<UpdateRidePaymentRuleResponseDTO>;
  blockRidePaymentRule(data: BlockRidePaymentRuleDTO): Promise<UpdateRidePaymentRuleResponseDTO>;
  unblockRidePaymentRule(data: UnblockRidePaymentRuleDTO): Promise<UpdateRidePaymentRuleResponseDTO>;
  checkTheInHandCashLimit(data: CheckTheInHandCashLimitDTO): Promise<CheckTheInHandCashLimitResponseDTO>
  updatedeliveryBoyEarnings(data: UpdatedeliveryBoyEarningsDTO): Promise<UpdatedeliveryBoyEarningsResponseDTO>
  clearInHandCashOnDeliveryBoy(data: UpdatedeliveryBoyEarningsDTO): Promise<UpdatedeliveryBoyEarningsResponseDTO>
  userReviewForDeliveryBoy(data: UserReviewDTO): Promise<DeliveryBoyReviewResponseDTO>
  getDeliveryBoyReview(data: UserReviewDTO): Promise<DeliveryBoyReviewResponseDTO>
  deleteDeliveryBoyReview(data: UserReviewDTO): Promise<DeliveryBoyReviewResponseDTO>
}