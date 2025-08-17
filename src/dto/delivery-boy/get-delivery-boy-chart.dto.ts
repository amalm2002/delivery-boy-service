export interface GetDeliveryBoyChartDataDTO {
    message: string;
    response?: { _id: string; name: string; completedDeliveries: number; totalEarnings: number }[];
    error?: boolean;
}

export interface GetDeliveryBoyChartDataRequestDTO {
    startDate?: string;
    endDate?: string
}