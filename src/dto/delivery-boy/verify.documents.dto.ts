import { DeliveryBoyDto } from "./update.location.dto";

export interface VerifyDocumentsDto {
  deliveryBoyId: string;
}

export interface VerifyDocumentsResponseDTO {
  message?: string;
  response?: DeliveryBoyDto | { message: string };
  error?: string;
}