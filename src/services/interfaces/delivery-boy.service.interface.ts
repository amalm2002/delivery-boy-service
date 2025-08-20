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
import { GetDeliveryBoyChartDataDTO, GetDeliveryBoyChartDataRequestDTO } from '../../dto/delivery-boy/get-delivery-boy-chart.dto';

export interface IDeliveryBoyService {
  registerDeliveryBoy(newDeliveryBoy: CreateDeliveryBoyDto): Promise<CreateDeliveryBoyResponseDTO>;
  updateLocation(locationUpdate: UpdateLocationDto): Promise<UpdateLocationResponseDto>;
  updateDetails(detailsUpdate: UpdateDetailsDto): Promise<UpdateDetailsResponseDTO>;
  updateVehicle(vehicleUpdate: UpdateVehicleDto): Promise<UpdateVehicleResponseDTO>;
  updateZone(zoneUpdate: UpdateZoneDto): Promise<UpdateZoneResponseDTO>;
  getAllDeliveryBoys(): Promise<Partial<DeliveryBoyDto>[]>;
  getAllDeliveryBoy(): Promise<Partial<DeliveryBoyDto>[]>;
  updateDeliveryBoyStatus(fetchRequest: FetchDeliveryBoyDTO): Promise<DeliveryBoyDto | null>;
  fetchDeliveryBoyDetails(fetchRequest: FetchDeliveryBoyDTO): Promise<DeliveryBoyDto | null>;
  verifyDocuments(verification: VerifyDocumentsDto): Promise<DeliveryBoyDto | { message: string }>;
  rejectDocuments(rejection: RejectDocumentsDto): Promise<DeliveryBoyDto | { message: string }>;
  getRejectedDocuments(query: GetRejectedDocumentDTO): Promise<GetRejectedDocumentServiceResponseDTO>;
  addRidePaymentRule(rule: AddRidePaymentRuleDTO): Promise<AddRidePaymentRuleResponseDTO>
  getRideratePaymentRule(data: void): Promise<GetRideratePaymentRuleDTO>
  updateRidePaymentRule(ruleUpdate: UpdateRidePaymentRuleDTO): Promise<UpdateRidePaymentRuleResponseDTO>;
  blockRidePaymentRule(rule: BlockRidePaymentRuleDTO): Promise<UpdateRidePaymentRuleResponseDTO>;
  unblockRidePaymentRule(rule: UnblockRidePaymentRuleDTO): Promise<UpdateRidePaymentRuleResponseDTO>;
  checkTheInHandCashLimit(checkRequest: CheckTheInHandCashLimitDTO): Promise<CheckTheInHandCashLimitResponseDTO>
  updatedeliveryBoyEarnings(earningsUpdate: UpdatedeliveryBoyEarningsDTO): Promise<UpdatedeliveryBoyEarningsResponseDTO>
  clearInHandCashOnDeliveryBoy(clearRequest: UpdatedeliveryBoyEarningsDTO): Promise<UpdatedeliveryBoyEarningsResponseDTO>
  userReviewForDeliveryBoy(review: UserReviewDTO): Promise<DeliveryBoyReviewResponseDTO>
  getDeliveryBoyReview(query: UserReviewDTO): Promise<DeliveryBoyReviewResponseDTO>
  deleteDeliveryBoyReview(deleteRequest: UserReviewDTO): Promise<DeliveryBoyReviewResponseDTO>
  getDeliveryBoyChartData(chartRequest: GetDeliveryBoyChartDataRequestDTO): Promise<GetDeliveryBoyChartDataDTO>;
}