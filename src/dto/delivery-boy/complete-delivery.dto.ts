import { DeliveryBoyDto } from "./update.location.dto";

export interface completeDeliveryDTO {
    orderId: string;
    deliveryBoyId: string;
}

export interface completeDeliveryResponseDTO {
    success: boolean;
    data?: DeliveryBoyDto;
    message?: string;
}