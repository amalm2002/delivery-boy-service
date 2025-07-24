import { DeliveryBoyDto } from "./update.location.dto";

export interface GetAllDeliveryBoysResponseDTO {
    message?: string;
    fetchDeliveryBoys?:Partial<DeliveryBoyDto>[]
}