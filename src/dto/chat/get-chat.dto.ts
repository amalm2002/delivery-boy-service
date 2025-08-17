export interface ChatState {
    deliveryBoyId: string;
    messages: {
        id: string;
        text: string;
        isBot: boolean;
        timestamp: string;
        options?: string[];
        showForm?: boolean;
        showZoneSelection?: boolean;
    }[];
    currentStep: 'welcome' | 'menu' | 'concern' | 'zones' | 'completed';
    selectedOption: {
        _id?: string;
        title: string;
        description?: string;
        category?: string;
        isActive?: boolean;
        responseMessage?: string;
    } | null;
    concernForm: {
        reason: string;
        description: string;
        isActive: boolean;
    };
    selectedZone: string;
    concernId?: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface GetChatDTO {
    deliveryBoyId: string
}

export interface GetChatResponseDTO {
    success: boolean;
    data?: ChatState | null;
    message?: string
}