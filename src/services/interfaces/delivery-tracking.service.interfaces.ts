import { IDeliveryBoy } from '../../models/delivery-boy.model';
import { UpdateOnlineStatusDTO } from '../../dto/delivery-boy/update.online.status.dto';
import { DeliveryBoyDetailsDTO } from '../../dto/delivery-boy/delivery-boy.details.dto';


export interface IDeliveryBoyTrackingService {
    updateOnlineStatus(dto: UpdateOnlineStatusDTO): Promise<{ success: boolean; data?: IDeliveryBoy; message?: string }>;
    getDeliveryBoyDetails(dto: UpdateOnlineStatusDTO): Promise<{ success: boolean; data?: DeliveryBoyDetailsDTO; message?: string }>;
    findNearestDeliveryPartners(location: { latitude: number; longitude: number }): Promise<{
        success: boolean;
        data?: DeliveryBoyDetailsDTO[];
        message?: string;
    }>;
    updateLocation(data: { deliveryBoyId: string; latitude: number; longitude: number }): Promise<{
        success: boolean;
        data?: IDeliveryBoy;
        message?: string;
    }>;
    assignOrder(data: { deliveryBoyId: string; orderId: string }): Promise<{
        success: boolean;
        data?: IDeliveryBoy;
        message?: string;
    }>;
    updateDeliveryBoyLocation(data: {
        deliveryBoyId: string;
        latitude: number;
        longitude: number;
    }): Promise<{
        success: boolean;
        message?: string;
    }>;
    completeDelivery(data: { orderId: string; deliveryBoyId: string }): Promise<any>;
}