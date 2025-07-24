import { DeliveryBoyDetailsDTO } from "./delivery-boy.details.dto";

export interface AssignOrderDTO {
    deliveryBoyId: string;
    orderId: string;
}


export interface AssignOrderResponseDTO {
    status?:string
    success?: boolean;
    message?: string;
    data?: DeliveryBoyDetailsDTO;
}