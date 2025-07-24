import { DeliveryBoyDto } from "./update.location.dto";

export interface UpdateDetailsDto {
  deliveryBoyId: string;
  name?: string;
  panCard?: { number: string; images: string[] };
  license?: { number: string; images: string[] };
  bankDetails?: { accountNumber: string; ifscCode: string; bankName?: string; branch?: string };
  profileImage?: string;
}

export interface UpdateDetailsResponseDTO {
  success?: boolean;
  message?: string;
  error?: string;
  data?: DeliveryBoyDto
}