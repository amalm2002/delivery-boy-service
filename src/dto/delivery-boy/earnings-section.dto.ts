export interface CheckTheInHandCashLimitDTO {
    deliveryBoyId: string;
}

export interface CheckTheInHandCashLimitResponseDTO {
    success: boolean;
    message: string;
}

export interface UpdatedeliveryBoyEarningsDTO {
    deliveryBoyId: string;
    amount: number;
    date: Date;
    paid: boolean;
    paymentId: string;
}

export interface UpdatedeliveryBoyEarningsResponseDTO {
    success: boolean;
    message?: string;
    data?: {
        completeAmount: number;
        monthlyAmount: number;
        inHandCash: number;
        amountToPayDeliveryBoy?: number;
        earnings?: any
    }
}