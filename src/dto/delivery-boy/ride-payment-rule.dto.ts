export interface AddRidePaymentRuleDTO {
    KM: number;
    ratePerKm: number;
    vehicleType: string;
    isActive: boolean;
}

export interface AddRidePaymentRuleResponseDTO {
    success?: boolean;
    message?: string;
    data?: any
}