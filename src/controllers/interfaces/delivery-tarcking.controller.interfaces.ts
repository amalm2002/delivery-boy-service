import { UpdateOnlineStatusDTO } from '../../dto/delivery-boy/update.online.status.dto';

export interface IDeliveryTrackingController {
    updateOnlineStatus(data: UpdateOnlineStatusDTO): Promise<any>;
    getDeliveryBoyDetails(data: UpdateOnlineStatusDTO): Promise<any>;
    findNearestDeliveryPartners(data: { location: { latitude: number; longitude: number } }): Promise<any>;
    updateLocation(data: { deliveryBoyId: string; latitude: number; longitude: number }): Promise<any>;
    assignOrder(data: { deliveryBoyId: string; orderId: string }): Promise<any>;
    updateDeliveryBoyLocation(data: { deliveryBoyId: string; latitude: number; longitude: number }): Promise<any>
    completeDelivery(data: { orderId: string; deliveryBoyId: string }): Promise<any>;
}