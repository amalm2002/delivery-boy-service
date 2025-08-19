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
  register(data: CreateDeliveryBoyDto): Promise<CreateDeliveryBoyResponseDTO>;
  updateLocation(data: UpdateLocationDto): Promise<UpdateLocationResponseDto>;
  updateDetails(data: UpdateDetailsDto): Promise<UpdateDetailsResponseDTO>;
  updateVehicle(data: UpdateVehicleDto): Promise<UpdateVehicleResponseDTO>;
  updateZone(data: UpdateZoneDto): Promise<UpdateZoneResponseDTO>;
  getAllDeliveryBoys(data: void): Promise<GetAllDeliveryBoysResponseDTO>;
  getAllDeliveryBoy(data: void): Promise<GetAllDeliveryBoysResponseDTO>;
  updateDeliveryBoyStatus(data: FetchDeliveryBoyDTO): Promise<UpdateOnlineStatusResponseDTO>;
  fetchDeliveryBoyDetailsGrpc(
    call: ServerUnaryCall<FetchDeliveryBoyDTO, UpdateOnlineStatusResponseDTO>,
    callback: sendUnaryData<UpdateOnlineStatusResponseDTO>
  ): Promise<void>
  fetchDeliveryBoyDetails(data: FetchDeliveryBoyDTO): Promise<UpdateOnlineStatusResponseDTO>;
  verifyDocuments(data: VerifyDocumentsDto): Promise<VerifyDocumentsResponseDTO>;
  rejectDocuments(data: RejectDocumentsDto): Promise<RejectDocumentsResponseDTO>;
  getRejectedDocuments(data: GetRejectedDocumentDTO): Promise<GetRejectedDocumentControllerResponseDTO>;
  addRidePaymentRule(data: AddRidePaymentRuleDTO): Promise<AddRidePaymentRuleResponseDTO>
  getRidePaymentRules(data: void): Promise<GetRideratePaymentRuleDTO>;
  updateRidePaymentRule(data: UpdateRidePaymentRuleDTO): Promise<UpdateRidePaymentRuleResponseDTO>;
  blockRidePaymentRule(data: BlockRidePaymentRuleDTO): Promise<UpdateRidePaymentRuleResponseDTO>;
  unblockRidePaymentRule(data: UnblockRidePaymentRuleDTO): Promise<UpdateRidePaymentRuleResponseDTO>;
  checkTheInHandCashLimit(data: CheckTheInHandCashLimitDTO): Promise<CheckTheInHandCashLimitResponseDTO>
  updatedeliveryBoyEarnings(data: UpdatedeliveryBoyEarningsDTO): Promise<UpdatedeliveryBoyEarningsResponseDTO>
  clearInHandCashOnDeliveryBoy(data: UpdatedeliveryBoyEarningsDTO): Promise<UpdatedeliveryBoyEarningsResponseDTO>
  userReviewFordeliveryBoy(data: UserReviewDTO): Promise<DeliveryBoyReviewResponseDTO>
  getDeliveryBoyReview(data: UserReviewDTO): Promise<DeliveryBoyReviewResponseDTO>
  deleteDeliveryBoyReview(data: UserReviewDTO): Promise<DeliveryBoyReviewResponseDTO>
  getDeliveryBoyChartData(data: GetDeliveryBoyChartDataRequestDTO): Promise<GetDeliveryBoyChartDataDTO>;
}