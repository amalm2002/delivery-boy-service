import { DeliveryBoyDto } from "./update.location.dto";

export interface UpdateVehicleDto {
  deliveryBoyId: string;
  vehicle: 'bike' | 'scooter' | 'cycle';
}


export interface UpdateVehicleResponseDTO {
  success?: boolean;
  message?: string;
  error?: string;
  data?: DeliveryBoyDto
}