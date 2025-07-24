import { DeliveryBoyDto } from "./update.location.dto";

export interface UpdateZoneDto {
  deliveryBoyId: string;
  zone: string;
}

export interface UpdateZoneResponseDTO {
  success?: boolean;
  message?: string;
  error?: string;
  data?: DeliveryBoyDto
}