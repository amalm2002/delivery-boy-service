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
import { UpdateOnlineStatusResponseDTO } from '../../dto/delivery-boy/update.online.status.dto';
import { FetchDeliveryBoyDTO } from '../../dto/delivery-boy/fetch-delivery-boy.dto';
import { AddRidePaymentRuleDTO, AddRidePaymentRuleResponseDTO } from '../../dto/delivery-boy/ride-payment-rule.dto';
import { BlockRidePaymentRuleDTO, GetRideratePaymentRuleDTO, UnblockRidePaymentRuleDTO, UpdateRidePaymentRuleDTO, UpdateRidePaymentRuleResponseDTO } from '../../dto/delivery-boy/ride-payment.dto';
import { CheckTheInHandCashLimitDTO, CheckTheInHandCashLimitResponseDTO, UpdatedeliveryBoyEarningsDTO, UpdatedeliveryBoyEarningsResponseDTO } from '../../dto/delivery-boy/earnings-section.dto';
import { DeliveryBoyReviewResponseDTO, UserReviewDTO } from '../../dto/delivery-boy/user-review.dto';
import { GetDeliveryBoyChartDataDTO, GetDeliveryBoyChartDataRequestDTO } from '../../dto/delivery-boy/get-delivery-boy-chart.dto';
import { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js';

export interface IDeliveryBoyController {
  register(newDeliveryBoy: CreateDeliveryBoyDto): Promise<CreateDeliveryBoyResponseDTO>;
  updateLocation(locationUpdate: UpdateLocationDto): Promise<UpdateLocationResponseDto>;
  updateDetails(detailsUpdate: UpdateDetailsDto): Promise<UpdateDetailsResponseDTO>;
  updateVehicle(vehicleUpdate: UpdateVehicleDto): Promise<UpdateVehicleResponseDTO>;
  updateZone(zoneUpdate: UpdateZoneDto): Promise<UpdateZoneResponseDTO>;
  getAllDeliveryBoys(data: void): Promise<GetAllDeliveryBoysResponseDTO>;
  getAllDeliveryBoy(data: void): Promise<GetAllDeliveryBoysResponseDTO>;
  updateDeliveryBoyStatus(fetchRequest: FetchDeliveryBoyDTO): Promise<UpdateOnlineStatusResponseDTO>;
  fetchDeliveryBoyDetailsGrpc(
    call: ServerUnaryCall<FetchDeliveryBoyDTO, UpdateOnlineStatusResponseDTO>,
    callback: sendUnaryData<UpdateOnlineStatusResponseDTO>
  ): Promise<void>
  fetchDeliveryBoyDetails(fetchRequest: FetchDeliveryBoyDTO): Promise<UpdateOnlineStatusResponseDTO>;
  verifyDocuments(verification: VerifyDocumentsDto): Promise<VerifyDocumentsResponseDTO>;
  rejectDocuments(rejection: RejectDocumentsDto): Promise<RejectDocumentsResponseDTO>;
  getRejectedDocuments(query: GetRejectedDocumentDTO): Promise<GetRejectedDocumentControllerResponseDTO>;
  addRidePaymentRule(rule: AddRidePaymentRuleDTO): Promise<AddRidePaymentRuleResponseDTO>
  getRidePaymentRules(data: void): Promise<GetRideratePaymentRuleDTO>;
  updateRidePaymentRule(ruleUpdate: UpdateRidePaymentRuleDTO): Promise<UpdateRidePaymentRuleResponseDTO>;
  blockRidePaymentRule(rule: BlockRidePaymentRuleDTO): Promise<UpdateRidePaymentRuleResponseDTO>;
  unblockRidePaymentRule(rule: UnblockRidePaymentRuleDTO): Promise<UpdateRidePaymentRuleResponseDTO>;
  checkTheInHandCashLimit(checkRequest: CheckTheInHandCashLimitDTO): Promise<CheckTheInHandCashLimitResponseDTO>
  updatedeliveryBoyEarnings(earningsUpdate: UpdatedeliveryBoyEarningsDTO): Promise<UpdatedeliveryBoyEarningsResponseDTO>
  clearInHandCashOnDeliveryBoy(clearRequest: UpdatedeliveryBoyEarningsDTO): Promise<UpdatedeliveryBoyEarningsResponseDTO>
  userReviewFordeliveryBoy(review: UserReviewDTO): Promise<DeliveryBoyReviewResponseDTO>
  getDeliveryBoyReview(query: UserReviewDTO): Promise<DeliveryBoyReviewResponseDTO>
  deleteDeliveryBoyReview(deleteRequest: UserReviewDTO): Promise<DeliveryBoyReviewResponseDTO>
  getDeliveryBoyChartData(chartRequest: GetDeliveryBoyChartDataRequestDTO): Promise<GetDeliveryBoyChartDataDTO>;
}