import { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js';
import { AssignOrderDTO, AssignOrderResponseDTO } from '../../dto/delivery-boy/assign-order.dto';
import { completeDeliveryDTO, completeDeliveryResponseDTO } from '../../dto/delivery-boy/complete-delivery.dto';
import { GetDeliveryBoyDetailsResponseDto } from '../../dto/delivery-boy/delivery-boy.details.dto';
import { FindNearestDeliveryPartnersRequestDto, FindNearestDeliveryPartnersResponseDto } from '../../dto/delivery-boy/find-nearest-delivery-partners.dto';
import { UpdateLocationDto, UpdateLocationResponseDto } from '../../dto/delivery-boy/update.location.dto';
import { UpdateOnlineStatusDTO, UpdateOnlineStatusResponseDto } from '../../dto/delivery-boy/update.online.status.dto';
import { OrderEarningsDTO, OrderEarningsResponseDTO } from '../../dto/delivery-boy/order-earings.dto';

export interface IDeliveryTrackingController {
    updateOnlineStatus(statusUpdate: UpdateOnlineStatusDTO): Promise<UpdateOnlineStatusResponseDto>;
    getDeliveryBoyDetails(detailsRequest: UpdateOnlineStatusDTO): Promise<GetDeliveryBoyDetailsResponseDto>;
    findNearestDeliveryPartners(locationQuery: FindNearestDeliveryPartnersRequestDto): Promise<FindNearestDeliveryPartnersResponseDto>;
    updateLocation(locationUpdate: UpdateLocationDto): Promise<UpdateLocationResponseDto>;
    assignOrder(call: ServerUnaryCall<AssignOrderDTO, AssignOrderResponseDTO>, callback: sendUnaryData<AssignOrderResponseDTO>): Promise<void>
    updateDeliveryBoyLocation(locationUpdate: UpdateLocationDto): Promise<UpdateLocationResponseDto>
    completeDelivery(deliveryCompletion: completeDeliveryDTO): Promise<completeDeliveryResponseDTO>;
    orderEarnings(earningsRequest: OrderEarningsDTO): Promise<OrderEarningsResponseDTO>
}