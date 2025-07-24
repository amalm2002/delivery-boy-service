import { DeliveryBoyDetailsDTO } from "./delivery-boy.details.dto";

export interface FindNearestDeliveryPartnersRequestDto {
    location: {
        latitude: number;
        longitude: number;
    };
}


export interface FindNearestDeliveryPartnersResponseDto {
    success?: boolean;
    message?: string;
    data?: DeliveryBoyDetailsDTO[];
}