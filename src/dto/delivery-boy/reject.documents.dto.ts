import { DeliveryBoyDto } from "./update.location.dto";

export interface RejectDocumentsDto {
  deliveryBoyId: string;
  rejectionReason: string;
}

export interface RejectDocumentsResponseDTO {
  message?: string;
  result?: DeliveryBoyDto | { message: string };
  error?: string;
}

export interface GetRejectedDocumentDTO {
  id: string
}

export interface GetRejectedDocumentControllerResponseDTO {
  message?: string;
  fetchRejectedDocs: {
    success: boolean;
    data?: Partial<DeliveryBoyDto>;
    message?: string
  }
}
export interface GetRejectedDocumentServiceResponseDTO {
  success: boolean;
  data?: Partial<DeliveryBoyDto>;
  message?: string
}