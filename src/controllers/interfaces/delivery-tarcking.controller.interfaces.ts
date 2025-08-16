import { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js';
import { AssignOrderDTO, AssignOrderResponseDTO } from '../../dto/delivery-boy/assign-order.dto';
import { completeDeliveryDTO, completeDeliveryResponseDTO } from '../../dto/delivery-boy/complete-delivery.dto';
import { GetDeliveryBoyDetailsResponseDto } from '../../dto/delivery-boy/delivery-boy.details.dto';
import { FindNearestDeliveryPartnersRequestDto, FindNearestDeliveryPartnersResponseDto } from '../../dto/delivery-boy/find-nearest-delivery-partners.dto';
import { UpdateLocationDto, UpdateLocationResponseDto } from '../../dto/delivery-boy/update.location.dto';
import { UpdateOnlineStatusDTO, UpdateOnlineStatusResponseDto } from '../../dto/delivery-boy/update.online.status.dto';

export interface IDeliveryTrackingController {
    updateOnlineStatus(data: UpdateOnlineStatusDTO): Promise<UpdateOnlineStatusResponseDto>;
    getDeliveryBoyDetails(data: UpdateOnlineStatusDTO): Promise<GetDeliveryBoyDetailsResponseDto>;
    findNearestDeliveryPartners(data: FindNearestDeliveryPartnersRequestDto): Promise<FindNearestDeliveryPartnersResponseDto>;
    updateLocation(data: UpdateLocationDto): Promise<UpdateLocationResponseDto>;
    assignOrder(call: ServerUnaryCall<AssignOrderDTO, AssignOrderResponseDTO>, callback: sendUnaryData<AssignOrderResponseDTO>): Promise<void>
    updateDeliveryBoyLocation(data: UpdateLocationDto): Promise<UpdateLocationResponseDto>
    completeDelivery(data: completeDeliveryDTO): Promise<completeDeliveryResponseDTO>;
    orderEarnings(data: { paymentMethod: string, deliveryBoyId: string, finalTotalDistance: number, orderAmount: number, order_id: string }): Promise<any>
}