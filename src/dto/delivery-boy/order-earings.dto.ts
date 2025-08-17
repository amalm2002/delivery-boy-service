export interface OrderEarningsDTO {
    paymentMethod: string;
    deliveryBoyId: string;
    finalTotalDistance: number;
    orderAmount: number;
    order_id: string
}

export interface OrderEarningsResponseDTO {
    success: boolean;
    message: string;
    data?: {
        earnings: number;
        totalEarnings: any;
        inHandCash: number;
    }
}