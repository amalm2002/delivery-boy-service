export interface GetDeliveryBoyChartDataDTO {
    message: string;
    response?: { _id: string; name: string; completedDeliveries: number; totalEarnings: number }[];
    error?: boolean;
}