export interface SubmitZoneChangeRequestDTO {
    deliveryBoyId: string;
    concernId: string;
    zoneId: string;
    zoneName: string;
    reason: string;
    description: string;
}

export interface SubmitZoneChangeRequestResponseDTO {
    success: boolean;
    message: string;
}