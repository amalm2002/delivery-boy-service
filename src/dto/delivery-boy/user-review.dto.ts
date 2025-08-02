export interface UserReviewDTO {
    deliveryBoyId?: string;
    rating?: number;
    comment?: string;
    orderId: string;
    userId: string;
    createdAt?: Date;
    isEdit: boolean
    userName?: string;
}

export interface ReviewDTO {
    userId: string;
    orderId: string;
    rating: number;
    comment?: string;
    createdAt: Date;
}

export interface DeliveryBoyReviewResponseDTO {
    success: boolean;
    message: string;
    data?: {
        deliveryBoyId: string;
        review: ReviewDTO;
    };
}