import { DeliveryBoyDto } from "./update.location.dto";

export interface UpdateOnlineStatusDTO {
  deliveryBoyId: string;
  isOnline?: boolean;
}


export interface UpdateOnlineStatusResponseDto {
  status?: string;
  success?: boolean;
  data?: DeliveryBoyDto;
  message?: string;
}
export interface UpdateOnlineStatusResponseDTO {
  success?: boolean;
  response?: DeliveryBoyDto | null;
  message?: string;
}
