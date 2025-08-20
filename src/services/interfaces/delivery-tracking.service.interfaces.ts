import { UpdateOnlineStatusDTO, UpdateOnlineStatusResponseDto } from '../../dto/delivery-boy/update.online.status.dto';
import { DeliveryBoyDetailsDTO, GetDeliveryBoyDetailsResponseDto } from '../../dto/delivery-boy/delivery-boy.details.dto';
import { UpdateLocationDto, UpdateLocationResponseDto } from '../../dto/delivery-boy/update.location.dto';
import { FindNearestDeliveryPartnersRequestDto, FindNearestDeliveryPartnersResponseDto } from '../../dto/delivery-boy/find-nearest-delivery-partners.dto';
import { AssignOrderDTO, AssignOrderResponseDTO } from '../../dto/delivery-boy/assign-order.dto';
import { completeDeliveryDTO, completeDeliveryResponseDTO } from '../../dto/delivery-boy/complete-delivery.dto';
import { OrderEarningsDTO, OrderEarningsResponseDTO } from '../../dto/delivery-boy/order-earings.dto';


export interface IDeliveryBoyTrackingService {
    updateOnlineStatus(statusUpdate: UpdateOnlineStatusDTO): Promise<UpdateOnlineStatusResponseDto>;
    getDeliveryBoyDetails(detailsRequest: UpdateOnlineStatusDTO): Promise<GetDeliveryBoyDetailsResponseDto>;
    findNearestDeliveryPartners(location: FindNearestDeliveryPartnersRequestDto['location']): Promise<FindNearestDeliveryPartnersResponseDto>;
    updateLocation(locationUpdate: UpdateLocationDto): Promise<UpdateLocationResponseDto>;
    assignOrder(assignOrder: AssignOrderDTO): Promise<AssignOrderResponseDTO>;
    updateDeliveryBoyLocation(locationUpdate: UpdateLocationDto): Promise<UpdateLocationResponseDto>;
    completeDelivery(deliveryCompletion: completeDeliveryDTO): Promise<completeDeliveryResponseDTO>;
    orderEarnings(earningsRequest: OrderEarningsDTO): Promise<OrderEarningsResponseDTO>
}