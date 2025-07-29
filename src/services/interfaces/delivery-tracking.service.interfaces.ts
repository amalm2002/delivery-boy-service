import { IDeliveryBoy } from '../../models/delivery-boy.model';
import { UpdateOnlineStatusDTO, UpdateOnlineStatusResponseDto } from '../../dto/delivery-boy/update.online.status.dto';
import { DeliveryBoyDetailsDTO, GetDeliveryBoyDetailsResponseDto } from '../../dto/delivery-boy/delivery-boy.details.dto';
import { UpdateLocationDto, UpdateLocationResponseDto } from '../../dto/delivery-boy/update.location.dto';
import { FindNearestDeliveryPartnersRequestDto, FindNearestDeliveryPartnersResponseDto } from '../../dto/delivery-boy/find-nearest-delivery-partners.dto';
import { AssignOrderDTO, AssignOrderResponseDTO } from '../../dto/delivery-boy/assign-order.dto';
import { completeDeliveryDTO, completeDeliveryResponseDTO } from '../../dto/delivery-boy/complete-delivery.dto';


export interface IDeliveryBoyTrackingService {
    updateOnlineStatus(dto: UpdateOnlineStatusDTO): Promise<UpdateOnlineStatusResponseDto>;
    getDeliveryBoyDetails(dto: UpdateOnlineStatusDTO): Promise<GetDeliveryBoyDetailsResponseDto>;
    findNearestDeliveryPartners(location: FindNearestDeliveryPartnersRequestDto['location']): Promise<FindNearestDeliveryPartnersResponseDto>;
    updateLocation(data: UpdateLocationDto): Promise<UpdateLocationResponseDto>;
    assignOrder(data: AssignOrderDTO): Promise<AssignOrderResponseDTO>;
    updateDeliveryBoyLocation(data: UpdateLocationDto): Promise<UpdateLocationResponseDto>;
    completeDelivery(data: completeDeliveryDTO): Promise<completeDeliveryResponseDTO>;
    orderEarnings(data: { paymentMethod: string, deliveryBoyId: string, finalTotalDistance: number;orderAmount:number }): Promise<any>
}