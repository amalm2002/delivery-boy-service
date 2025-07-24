import { DeliveryBoyDto } from "./update.location.dto";

export interface CreateDeliveryBoyDto {
  mobile: string;
}

export interface CreateDeliveryBoyResponseDTO {
  success?: boolean;
  message?: string;
  deliveryBoyName?: string;
  mobile?: string;
  token?: string;
  _id?: string;
  isOnline?: boolean;
  isVerified?: boolean;
  refreshToken?: string;
  isActive?: boolean;
  isRejected?: boolean;
  deliveryBoy?: DeliveryBoyDto;
  role?: string;
  rejectionReason?: string;
  missingFields?: string;
  error?: string;
}