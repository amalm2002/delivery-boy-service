import { IDeliveryRate } from "../../models/delivery-rate.model";

export interface GetRideratePaymentRuleDTO {
    success?: boolean
    message?: string
    data?: IDeliveryRate[]
}

export interface UpdateRidePaymentRuleDTO {
    id: string;
    KM: number;
    ratePerKm: number;
    vehicleType: string;
    isActive: boolean
}

export interface UpdateRidePaymentRuleResponseDTO {
    success: boolean;
    message?: string;
    data?: IDeliveryRate
}

export interface BlockRidePaymentRuleDTO {
    id: string;
    vehicleType: string;
}

export interface UnblockRidePaymentRuleDTO {
    id: string;
}