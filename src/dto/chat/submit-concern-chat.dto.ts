export interface SubmitConcernDTO {
    deliveryBoyId: string;
    selectedOption: {
        _id?: string;
        title: string;
        description?: string;
        category?: string;
        isActive?: boolean;
        responseMessage?: string
    } | null;
    reason: string;
    description: string;
}

export interface SubmitConcernResponseDTO {
    success: boolean;
    message: string;
    concernId?: string;
}