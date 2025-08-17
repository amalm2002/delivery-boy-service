export interface VerifyConcernDTO {
    id: string;
    newStatus: 'approved' | 'rejected';
    rejectionReason?: string;
    zoneId?: string;
    zoneName?: string;
    deliveryBoyId?: string
}


export interface VerifyConcernResponseDTO {
    success: boolean;
    message: string;
    data?: any
}