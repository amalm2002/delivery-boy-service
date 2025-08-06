export interface IChatController {
    getChatState(data: { deliveryBoyId: string }): Promise<{ success: boolean; data?: any; message?: string }>;
    saveChatState(data: { deliveryBoyId: string; state: any }): Promise<{ success: boolean; data?: any; message?: string }>;
    clearChatState(data: { deliveryBoyId: string }): Promise<{ success: boolean; message?: string }>;
    submitConcern(data: {
        deliveryBoyId: string;
        selectedOption: { _id?: string; title: string; description?: string; category?: string; isActive?: boolean; responseMessage?: string } | null;
        reason: string;
        description: string;
    }): Promise<any>;
    submitZoneChangeRequest(data: { deliveryBoyId: string; concernId: string; zoneId: string; zoneName: string; reason: string; description: string }): Promise<any>;
    getAllConcerns(data: void): Promise<any>
    verifyTheConcern(data: any): Promise<any>
    getDeliveryBoyConcerns(data: { deliveryBoyId: string }): Promise<any>
}